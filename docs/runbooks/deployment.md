# Deployment Runbook

## Pre-Deployment Checklist

Before deploying, verify that all of the following conditions are met:

- [ ] **All CI checks pass** — Lint (HTMLHint), Test (JS syntax + CSS validation), Security Scan (Trivy), and Build (Docker) jobs complete successfully in GitHub Actions.
- [ ] **Docker image built successfully** — The build job produces the `my-calculator:latest` and `my-calculator:<sha>` image tags without errors.
- [ ] **No CRITICAL/HIGH vulnerabilities** — Trivy filesystem scan and Trivy image scan report zero CRITICAL or HIGH vulnerabilities. Review the GitHub Security tab for details.
- [ ] **Code reviewed and approved** — All changes have been reviewed and approved via pull request.
- [ ] **No uncommitted changes** — The working tree is clean (`git status` shows no uncommitted changes).
- [ ] **`.env` file is not committed** — Verify `.env` is in `.gitignore` and no real secrets are in the repository.

## Pipeline Stages

The CI/CD pipeline consists of 6 stages, running sequentially:

| # | Stage | Description |
|---|-------|-------------|
| 1 | **lint** | HTML validation with HTMLHint + asset reference check |
| 2 | **test** | HTMLHint validation + JavaScript syntax check (`node --check`) + CSS non-empty validation |
| 3 | **security-scan** | Trivy filesystem scan + secret detection |
| 4 | **build** | Docker image build + Trivy image scan + artifact upload |
| 5 | **deploy-staging** | SSH-based deployment to staging server |
| 6 | **deploy-production** | SSH-based deployment to production server (manual approval) |

## Required GitHub Secrets

The deployment jobs require the following GitHub Secrets to be configured in the repository settings (**Settings → Secrets and variables → Actions**):

| Secret Name | Description |
|---|---|
| `SSH_KEY` | SSH private key for accessing the deployment server |
| `SSH_HOST` | Hostname or IP address of the deployment server |
| `SSH_USER` | SSH username for the deployment server |

## Deployment Process

### Staging Deployment

Staging deployment is **fully automatic** on push to the `main` or `master` branch.

**What happens:**

1. GitHub Actions triggers the CI/CD pipeline.
2. The **lint**, **test**, **security-scan**, and **build** jobs run sequentially.
3. Once the build completes, the **deploy-staging** job executes the following SSH-based deployment process:
   1. Checks out code to get `docker-compose.yml`.
   2. Downloads the Docker image artifact from GitHub Actions.
   3. Loads the Docker image locally.
   4. Sets up the SSH key from GitHub Secrets (`SSH_KEY`, `SSH_HOST`, `SSH_USER`).
   5. Copies the Docker image tar and `docker-compose.yml` to the server via SCP.
   6. Deploys via SSH using `docker compose up -d --force-recreate` (zero-downtime).
   7. Runs a health check **on the server** via SSH: `curl -sf http://localhost:8080/`.
   8. Cleans up unused Docker images on the server.
   9. Removes the SSH key (cleanup with `if: always()`).

**To verify staging deployment:**

```bash
# SSH to the staging server, then verify the container is running
docker compose ps

# Check that the site responds with HTTP 200
curl -sf http://localhost:8080/

# Check container logs for errors
docker compose logs --tail=50 calculator-web
```

### Production Deployment

Production deployment requires **manual approval** via GitHub Environment protection rules. The deployment process is identical to staging, but is gated behind a manual review step.

**Steps:**

1. Ensure the staging deployment is verified and healthy.
2. Navigate to the **GitHub Actions** tab in the repository.
3. Select the workflow run that was triggered by the push to `main`/`master`.
4. The **deploy-production** job will be in a "Waiting" state with a review required.
5. Click **Review deployments** → select **production** → click **Approve and deploy**.
6. The job executes the same SSH-based deployment process as staging:
   1. Checks out code to get `docker-compose.yml`.
   2. Downloads the Docker image artifact from GitHub Actions.
   3. Loads the Docker image locally.
   4. Sets up the SSH key from GitHub Secrets (`SSH_KEY`, `SSH_HOST`, `SSH_USER`).
   5. Copies the Docker image tar and `docker-compose.yml` to the server via SCP.
   6. Deploys via SSH using `docker compose up -d --force-recreate` (zero-downtime).
   7. Runs a health check **on the server** via SSH: `curl -sf http://localhost:8080/`.
   8. Cleans up unused Docker images on the server.
   9. Removes the SSH key (cleanup with `if: always()`).

**Zero-downtime deployment:**

Use `--force-recreate` to roll the container without downtime. **Do not** run `docker compose down` followed by `docker compose up` — this causes a brief outage.

```bash
# ✅ Correct — zero-downtime recreation
docker compose up -d --force-recreate

# ❌ Incorrect — causes downtime
docker compose down && docker compose up -d
```

## Release Process

Releases are managed via the **Release workflow** (`.github/workflows/release.yml`), which automates semantic versioning and changelog generation.

**Triggering a release:**

1. Navigate to the **GitHub Actions** tab in the repository.
2. Select the **Release** workflow in the left sidebar.
3. Click **Run workflow**.
4. Choose the version type: `patch`, `minor`, or `major`.
5. Click **Run workflow** to start the release.

**What the workflow does:**

1. Generates a changelog from git commits, categorized by conventional commit prefixes.
2. Determines the new semantic version number based on the selected version type.
3. Creates and pushes a git tag (e.g., `v1.2.3`).
4. Creates a GitHub Release with the generated changelog as the release body.

**Commit conventions:**

| Commit Prefix | Version Bump |
|---|---|
| `feat:` | MINOR |
| `fix:` | PATCH |
| `BREAKING CHANGE` | MAJOR |

## Security

All GitHub Actions used in the CI/CD pipeline are pinned to full 40-character commit SHAs for supply chain security. Version tags are included in comments for readability and traceability. This prevents supply chain attacks where a compromised action tag could be silently moved to malicious code.

## Troubleshooting CI/CD Failures

### Lint Job Failures

- **HTMLHint errors**: Check `.htmlhintrc` for configured rules. Common issues: missing `<!DOCTYPE>`, duplicate IDs, unclosed tags.
- **Missing referenced files**: Check that all CSS/JS files referenced in HTML exist at the expected paths.

### Test Job Failures

- **JavaScript syntax errors**: Run `node --check <file>` locally to find syntax issues.
- **Empty CSS files**: Ensure all CSS files have content.

### Security Scan Failures

- **Trivy vulnerabilities**: Review the SARIF report in the GitHub Security tab. Update base images or add justified ignores to `.trivyignore`.
- **Secret detection**: Ensure no secrets are committed. The `.env` file should be in `.gitignore`.

### Build Failures

- **Docker build errors**: Check Dockerfile syntax. Ensure all `COPY` source files exist.
- **Trivy image scan**: Review vulnerabilities in the built image. Update nginx base image or add ignores.

### Deployment Failures

- **SSH connection refused**: Verify `SSH_HOST`, `SSH_USER`, and `SSH_KEY` secrets are set correctly.
- **Health check failed**: SSH to the server and check `docker compose ps` and `docker compose logs calculator-web`.
- **Permission denied**: Ensure the SSH key has appropriate permissions on the server.

## Rollback Procedure

If a deployment introduces issues, follow these steps to roll back to the previous working version:

1. **Identify the previous working image tag:**

   ```bash
   git log --oneline -10
   ```

   Look for the last commit that was known to be stable. Note the commit SHA.

2. **Check out the previous version and rebuild:**

   ```bash
   git checkout <previous-sha>
   docker compose build
   ```

3. **Restart with the previous image:**

   ```bash
   docker compose up -d --force-recreate
   ```

4. **Verify the rollback:**

   ```bash
   curl -sf http://localhost:8080/
   ```

   Confirm the response is HTTP 200 and the expected content is served.

5. **If the rollback fails:**

   ```bash
   # Stop the container and investigate
   docker compose down

   # Check logs for errors
   docker compose logs calculator-web

   # Verify nginx configuration syntax
   docker compose exec calculator-web nginx -t
   ```

   If the issue cannot be resolved, escalate to the infrastructure team and consider deploying from a known-good Docker image artifact stored in GitHub Actions (retained for 7 days).

## Post-Deployment Verification

After every deployment (staging or production), perform the following checks:

### Health Check

```bash
# Verify the site responds with HTTP 200
curl -sf http://localhost:8080/
```

### Container Status

```bash
# Check that the container is running and healthy
docker compose ps
```

The output should show the `calculator-web` container with a status of `Up (healthy)`.

### Log Review

```bash
# Check the last 50 lines of container logs for errors
docker compose logs --tail=50 calculator-web
```

Look for:
- nginx startup errors
- 404 or 500 HTTP status codes
- Permission denied errors
- Health check failures

### Page Verification

Verify that all pages load correctly:

```bash
# Main pages
curl -sf http://localhost:8080/                    # index.html
curl -sf http://localhost:8080/about.html
curl -sf http://localhost:8080/addop.html
curl -sf http://localhost:8080/asd.html
curl -sf http://localhost:8080/ASDSFSF.html
curl -sf http://localhost:8080/zzz.html

# Subdirectory pages
curl -sf http://localhost:8080/basics-10-function-refactoring/
curl -sf http://localhost:8080/uyt/
curl -sf http://localhost:8080/xpy/

# Static assets
curl -sf http://localhost:8080/assets/styles/app.css
curl -sf http://localhost:8080/assets/scripts/home.js
```

### Nginx Configuration Check

```bash
# Verify nginx configuration is valid
docker compose exec calculator-web nginx -t
```

Expected output:

```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```



