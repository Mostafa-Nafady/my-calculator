# Deployment Runbook

## Pre-Deployment Checklist

Before deploying, verify that all of the following conditions are met:

- [ ] **All CI checks pass** — Lint (HTMLHint), Security Scan (Trivy), and Build (Docker) jobs complete successfully in GitHub Actions.
- [ ] **Docker image built successfully** — The build job produces the `my-calculator:latest` and `my-calculator:<sha>` image tags without errors.
- [ ] **No CRITICAL/HIGH vulnerabilities** — Trivy filesystem scan and Trivy image scan report zero CRITICAL or HIGH vulnerabilities. Review the GitHub Security tab for details.
- [ ] **Code reviewed and approved** — All changes have been reviewed and approved via pull request.
- [ ] **No uncommitted changes** — The working tree is clean (`git status` shows no uncommitted changes).
- [ ] **`.env` file is not committed** — Verify `.env` is in `.gitignore` and no real secrets are in the repository.

## Deployment Process

### Staging Deployment

Staging deployment is **fully automatic** on push to the `main` or `master` branch.

**What happens:**

1. GitHub Actions triggers the CI/CD pipeline.
2. The **lint**, **security-scan**, and **build** jobs run sequentially.
3. Once the build completes, the **deploy-staging** job downloads the Docker image artifact, loads it, and deploys to the staging server.
4. A verification step checks that the staging deployment is healthy.

**To verify staging deployment:**

```bash
# On the staging server, verify the container is running
docker compose ps

# Check that the site responds with HTTP 200
curl -sf http://localhost:8080/

# Check container logs for errors
docker compose logs --tail=50 calculator-web
```

### Production Deployment

Production deployment requires **manual approval** via GitHub Environment protection rules.

**Steps:**

1. Ensure the staging deployment is verified and healthy.
2. Navigate to the **GitHub Actions** tab in the repository.
3. Select the workflow run that was triggered by the push to `main`/`master`.
4. The **deploy-production** job will be in a "Waiting" state with a review required.
5. Click **Review deployments** → select **production** → click **Approve and deploy**.
6. The job downloads the Docker image artifact, loads it, and deploys to the production server.
7. A verification step checks that the production deployment is healthy.

**Zero-downtime deployment:**

Use `--force-recreate` to roll the container without downtime. **Do not** run `docker compose down` followed by `docker compose up` — this causes a brief outage.

```bash
# ✅ Correct — zero-downtime recreation
docker compose up -d --force-recreate

# ❌ Incorrect — causes downtime
docker compose down && docker compose up -d
```

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

