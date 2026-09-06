# Troubleshooting Runbook

## Common Issues

### Container Won't Start

**Symptoms:** `docker compose up` exits with an error, or the container status shows `Exited`.

**Troubleshooting steps:**

1. **Check for port conflicts** — another process may already be using port 8080:

   ```bash
   lsof -i :8080
   # or
   ss -tlnp | grep 8080
   ```

   If another process is using port 8080, either stop that process or change the port mapping in `docker-compose.yml`.

2. **Check nginx configuration syntax:**

   ```bash
   docker compose exec calculator-web nginx -t
   ```

   If the container won't start at all, test the config by running nginx in a temporary container:

   ```bash
   docker run --rm -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf nginx:1.27-alpine nginx -t
   ```

3. **Check container logs:**

   ```bash
   docker compose logs calculator-web
   ```

   Common errors:
   - `bind() to 0.0.0.0:8080 failed (98: Address already in use)` — port conflict
   - `host not found in upstream` — DNS resolution issue
   - `permission denied` — file ownership or permission issue

4. **Check resource limits** — if the container is OOM-killed, increase the memory limit in `docker-compose.yml`:

   ```bash
   docker inspect calculator-web | grep -i oom
   ```

---

### 403 Forbidden

**Symptoms:** Browser or `curl` returns HTTP 403 Forbidden when accessing the site.

**Troubleshooting steps:**

1. **Check file permissions** in the nginx document root:

   ```bash
   docker compose exec calculator-web ls -la /usr/share/nginx/html/
   ```

   Files should be readable by the `nginx` user. If permissions are incorrect, the Dockerfile's `chown` step may have failed.

2. **Verify the nginx user has read access:**

   ```bash
   docker compose exec calculator-web ls -la /usr/share/nginx/html/
   ```

   Expected output should show files owned by `nginx:nginx` with read permissions (`r--r--r--` or better).

3. **Check the nginx configuration** for incorrect `root` or `deny` directives:

   ```bash
   docker compose exec calculator-web cat /etc/nginx/nginx.conf
   ```

   The `root` directive should point to `/usr/share/nginx/html`.

4. **Rebuild the image** if permissions are persistently wrong:

   ```bash
   docker compose up --build -d
   ```

---

### 404 Not Found

**Symptoms:** Browser or `curl` returns HTTP 404 when accessing a specific page or asset.

**Troubleshooting steps:**

1. **Check that the file exists inside the container:**

   ```bash
   docker compose exec calculator-web ls /usr/share/nginx/html/
   ```

   Verify that the expected HTML files (`index.html`, `about.html`, `addop.html`, `asd.html`, `ASDSFSF.html`, `zzz.html`) and directories (`assets/`, `basics-10-function-refactoring/`, `uyt/`, `xpy/`) are present.

2. **Check file paths match COPY instructions in the Dockerfile:**

   ```bash
   # Verify the Dockerfile copies all required files
   cat Dockerfile
   ```

   Ensure every HTML file and asset directory has a corresponding `COPY` instruction.

3. **Check the URL path** — nginx is case-sensitive on Linux. `ASDSFSF.html` must be accessed with the exact casing:

   ```bash
   # ✅ Correct
   curl http://localhost:8080/ASDSFSF.html

   # ❌ Incorrect (will 404)
   curl http://localhost:8080/asdsfsf.html
   ```

4. **Check the `try_files` fallback** — the nginx config falls back to `index.html` for unknown paths. If you're getting a 404 instead of the fallback, verify the `try_files` directive in `nginx.conf`.

---

### Health Check Failing

**Symptoms:** `docker compose ps` shows the container as `Up (unhealthy)` or the health check keeps restarting the container.

**Troubleshooting steps:**

1. **Verify wget is available in the container:**

   ```bash
   docker compose exec calculator-web which wget
   ```

   The `nginx:1.27-alpine` image includes `wget` by default. If it's missing, the image may have been modified.

2. **Check that port 8080 is listening inside the container:**

   ```bash
   docker compose exec calculator-web wget -q -O- http://localhost:8080/
   ```

   If this returns HTML content, nginx is running and responding. If it fails, nginx may not have started correctly.

3. **Check the health check command** in `docker-compose.yml`:

   ```yaml
   healthcheck:
     test: ["CMD", "wget", "--spider", "-q", "http://localhost:8080/"]
   ```

   Ensure the command matches and there are no typos.

4. **Check the start period** — the container has a 10-second start period. If nginx takes longer to start, increase `start_period` in `docker-compose.yml`.

5. **Review container logs** for startup errors:

   ```bash
   docker compose logs calculator-web
   ```

---

### CI Pipeline Failing

**Symptoms:** One or more jobs in the GitHub Actions CI/CD pipeline fail.

**Troubleshooting by job:**

#### Lint Job Fails

- **HTMLHint errors:** Check the HTMLHint output in the GitHub Actions logs. Common issues include unclosed tags, missing attributes, and invalid HTML structure. Fix the reported issues in the HTML files.
- **Asset reference check:** The lint job verifies that all locally referenced CSS/JS files exist. If a referenced file is missing, the log will show `WARNING: Referenced file not found`. Add the missing file or remove the reference.

#### Security Scan Job Fails

- **Trivy filesystem vulnerabilities:** Review the SARIF results in the GitHub Security tab. If vulnerabilities are found, update the affected dependencies or base image. If a vulnerability is a false positive or has no fix, add the CVE ID to `.trivyignore`.
- **Trivy secret scan:** The scan detected a secret in the repository. Remove the secret, rotate it if it was ever valid, and ensure `.env` is in `.gitignore`. Never commit real credentials.

#### Build Job Fails

- **Docker build error:** Check the Docker build logs in GitHub Actions. Common issues include missing files referenced in `COPY` instructions, syntax errors in `Dockerfile`, or network issues pulling the base image.
- **Trivy image scan:** The built Docker image has CRITICAL or HIGH vulnerabilities. Update the base image (`nginx:1.27-alpine`) to a newer version or add accepted CVE IDs to `.trivyignore`.

#### Deploy Job Fails

- **Artifact download failure:** The Docker image artifact may have expired (retained for 7 days). Re-run the workflow to rebuild the image.
- **Deployment script error:** Check the deploy job logs. The deployment scripts are placeholders — replace them with actual deployment commands for your infrastructure.

---

### Docker Build Failing

**Symptoms:** `docker compose build` or `docker build` fails locally or in CI.

**Troubleshooting steps:**

1. **Check `.dockerignore` for over-exclusion:**

   ```bash
   cat .dockerignore
   ```

   Ensure that required files (HTML, CSS, JS, `nginx.conf`) are not being excluded. If a file is listed in `.dockerignore`, it won't be available for `COPY` instructions in the `Dockerfile`.

2. **Verify all COPY source files exist:**

   ```bash
   # Check that all files referenced in Dockerfile COPY instructions exist
   ls -la index.html about.html addop.html asd.html ASDSFSF.html zzz.html
   ls -d assets/ basics-10-function-refactoring/ uyt/ xpy/
   ls -la nginx.conf
   ```

3. **Check nginx.conf syntax:**

   ```bash
   # Test nginx config before building
   docker run --rm -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf nginx:1.27-alpine nginx -t
   ```

4. **Check Docker disk space:**

   ```bash
   docker system df
   ```

   If disk space is low, clean up unused resources:

   ```bash
   docker system prune -a
   ```

5. **Check Docker Buildx cache** (CI only):

   The CI pipeline uses GitHub Actions cache (`type=gha`). If the cache is corrupted, clear it by running the workflow with cache disabled, or use the `--no-cache` flag locally:

   ```bash
   docker compose build --no-cache
   ```

## Log Locations

| Log Type | Location | Access Method |
|----------|----------|---------------|
| **Container logs** | Docker container stdout/stderr | `docker compose logs calculator-web` |
| **nginx access log** | Inside container: `/var/log/nginx/access.log` | `docker compose exec calculator-web cat /var/log/nginx/access.log` |
| **nginx access log** | On host: `./logs/access.log` | `cat logs/access.log` (via volume mount) |
| **nginx error log** | Inside container: `/var/log/nginx/error.log` | `docker compose exec calculator-web cat /var/log/nginx/error.log` |
| **nginx error log** | On host: `./logs/error.log` | `cat logs/error.log` (via volume mount) |
| **GitHub Actions logs** | GitHub repository Actions tab | Navigate to Actions → select workflow run → click on failed job |

> **Note:** The `./logs` directory is created automatically by the Docker volume mount. If it doesn't exist, Docker creates it on container start.

## Useful Commands

```bash
# Check container status
docker compose ps

# Follow logs in real-time
docker compose logs -f calculator-web

# Test nginx configuration
docker compose exec calculator-web nginx -t

# Shell into the container
docker compose exec calculator-web sh

# Restart the container
docker compose restart calculator-web

# Stop and remove containers
docker compose down

# Rebuild and start in background
docker compose up --build -d

# List Docker images
docker image ls

# Cleanup unused Docker resources
docker system prune

# Test the site from inside the container
docker compose exec calculator-web wget -q -O- http://localhost:8080/

# Check container resource usage
docker stats calculator-web

# Inspect container details (network, volumes, env)
docker inspect calculator-web

# Force recreate container (zero-downtime restart)
docker compose up -d --force-recreate

# View nginx configuration inside the container
docker compose exec calculator-web cat /etc/nginx/nginx.conf

# Check which files are served by nginx
docker compose exec calculator-web ls -la /usr/share/nginx/html/
```

