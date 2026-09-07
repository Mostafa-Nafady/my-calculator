# Operations Runbook

## Deployment

### Local Deployment

To build and deploy the application locally:

```bash
# Build the image and start the container in detached mode
docker compose up -d --build
```

This command:
1. Builds the Docker image from the `Dockerfile` using the `nginx:1.27-alpine` base image
2. Starts the container in detached mode (`-d`)
3. Maps port 8080 on the host to port 8080 in the container
4. Mounts the project directory read-only for live editing during development

### CI/CD Deployment

The CI/CD pipeline (`.github/workflows/ci.yml`) handles staging and production deployments:

| Stage | Trigger | Image Tags | Environment |
|-------|---------|------------|-------------|
| Security check | Every push/PR to `main` | N/A (scan only) | N/A |
| Build | After security check passes | `my-calculator:latest` (local) | N/A |
| Deploy to staging | Push to `main` | `ghcr.io/<owner>/<repo>:staging`, `ghcr.io/<owner>/<repo>:sha-<commit>` | `staging` |
| Deploy to production | Push to `main` (after staging) | `ghcr.io/<owner>/<repo>:latest` | `production` (requires manual approval) |

#### GHCR Image Tags

- **`:staging`** — Always points to the latest image pushed from the `main` branch. Used for staging environment deployments.
- **`:sha-<commit>`** — Immutable tag tied to a specific Git commit SHA. Used for rollback and traceability. Example: `:sha-abc1234`.
- **`:latest`** — Points to the current production image. Updated only after manual approval in the `production` environment.

## Health Checks

### Endpoint

The application exposes a health endpoint at `/health`:

```bash
curl http://localhost:8080/health
# Expected response: ok (HTTP 200)
```

### Docker Healthcheck

The Docker container includes a built-in healthcheck configured in both the `Dockerfile` and `docker-compose.yml`:

| Parameter | Value |
|-----------|-------|
| Test | `curl -f http://localhost:8080/health` |
| Interval | 30 seconds |
| Timeout | 3 seconds |
| Retries | 3 |
| Start period | 5 seconds |

The healthcheck runs every 30 seconds. If it fails 3 consecutive times (approximately 90 seconds), the container is marked as unhealthy. Docker will restart the container if the restart policy is set to `unless-stopped` (which it is).

### Checking Container Health

```bash
# View container status including health
docker compose ps

# Inspect health check results
docker inspect --format='{{json .State.Health}}' my-calculator | jq
```

## Troubleshooting

### Site Not Responding

If the site is not loading at `http://localhost:8080`:

1. **Check if the container is running:**
   ```bash
   docker compose ps
   ```
   Look for the `web` service with status `Up`. If it shows `Exited` or `Restarting`, proceed to step 2.

2. **Check container logs:**
   ```bash
   docker compose logs web
   ```
   Look for nginx error messages, such as:
   - `bind() to 0.0.0.0:8080 failed` — port already in use (see "Port Conflicts" below)
   - `permission denied` — file permission issue (see "Permission Issues" below)
   - `host not found in upstream` — DNS resolution issue

3. **Verify nginx.conf is correct:**
   ```bash
   docker compose exec web nginx -t
   ```
   This tests the nginx configuration for syntax errors. If it fails, review `/home/daytona/my-calculator/nginx.conf`.

4. **Restart the container:**
   ```bash
   docker compose restart web
   ```

### Health Check Failing

If the health check at `/health` is returning errors:

1. **Test the health endpoint from inside the container:**
   ```bash
   docker exec my-calculator curl -f http://localhost:8080/health
   ```
   If this returns `ok`, the issue may be with the host-to-container port mapping. If it fails, nginx may not be running or the config is incorrect.

2. **Check if nginx is running inside the container:**
   ```bash
   docker exec my-calculator nginx -s status
   # or
   docker exec my-calculator ps aux | grep nginx
   ```

3. **Verify the nginx configuration:**
   ```bash
   docker exec my-calculator nginx -t
   ```

4. **Check if the /health location block exists in nginx.conf:**
   ```bash
   docker exec my-calculator grep -A3 'location = /health' /etc/nginx/nginx.conf
   ```

### Port Conflicts

If port 8080 is already in use on the host:

1. **Check what is using port 8080:**
   ```bash
   lsof -i :8080
   # or
   ss -tlnp | grep 8080
   ```

2. **Stop the conflicting process:**
   ```bash
   kill <PID>
   ```

3. **Alternatively, change the port mapping in `docker-compose.yml`:**
   ```yaml
   ports:
     - "9090:8080"  # Map host port 9090 to container port 8080
   ```
   Then access the site at `http://localhost:9090`.

### Permission Issues

If nginx cannot read the static files:

1. **Ensure the nginx user can read the document root:**
   ```bash
   docker exec my-calculator ls -la /usr/share/nginx/html/
   ```
   Files should be readable by the `nginx` user.

2. **Fix permissions if needed:**
   ```bash
   # On the host, ensure files are world-readable
   chmod -R a+r ./
   ```

3. **Check the nginx user:**
   ```bash
   docker exec my-calculator id nginx
   ```

## Rollback Procedure

If a deployment introduces issues, follow these steps to roll back to a previous version:

### Step 1: Identify the Previous Image

List available images in GHCR, sorted by creation date:

```bash
docker images ghcr.io/<owner>/<repo> --format "table {{.Tag}}\t{{.CreatedAt}}"
```

Identify the `:sha-<previous-sha>` tag from before the problematic deployment.

### Step 2: Pull the Previous Image

```bash
docker pull ghcr.io/<owner>/<repo>:sha-<previous-sha>
```

### Step 3: Retag and Deploy

```bash
# Retag the previous image for local deployment
docker tag ghcr.io/<owner>/<repo>:sha-<previous-sha> my-calculator:rollback

# Deploy the rollback image
docker compose up -d
```

> **Note**: To use the rollback tag, update `docker-compose.yml` to reference `my-calculator:rollback` under the `image` key, or build from the image directly.

### Step 4: Verify the Rollback

```bash
# Check the health endpoint
curl http://localhost:8080/health
# Expected: ok

# Check the container is running
docker compose ps

# Check logs for errors
docker compose logs --tail=50 web
```

### Rollback in Production (GHCR)

To roll back the production `:latest` tag to a previous version:

```bash
# Login to GHCR
echo $GITHUB_TOKEN | docker login ghcr.io -u <username> --password-stdin

# Pull the previous image
docker pull ghcr.io/<owner>/<repo>:sha-<previous-sha>

# Retag as :latest and push
docker tag ghcr.io/<owner>/<repo>:sha-<previous-sha> ghcr.io/<owner>/<repo>:latest
docker push ghcr.io/<owner>/<repo>:latest
```

## Emergency Contacts

| Role | Name | Contact | Notes |
|------|------|---------|-------|
| DevOps Team | _TBD_ | _TBD_ | General infrastructure issues |
| On-Call Engineer | _TBD_ | _TBD_ | After-hours emergencies |
| Infrastructure Lead | _TBD_ | _TBD_ | Escalation for critical incidents |

> **Note**: Fill in the contact information above with your team's details. Keep this table updated when team members change.

