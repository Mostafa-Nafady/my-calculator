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

### Endpoints

The application exposes two health endpoints:

#### /health

Returns a JSON object with status, timestamp, and uptime:

```bash
curl http://localhost:8080/health
# Expected response (HTTP 200, Content-Type: application/json):
# {"status":"ok","timestamp":"2026-01-15T10:30:00+00:00","uptime":42}
```

- `status` — always `"ok"` when nginx is running
- `timestamp` — current server time in ISO 8601 format
- `uptime` — number of requests processed by the current nginx worker connection

#### /ready

Returns a JSON readiness check for container orchestration and load balancer probes:

```bash
curl http://localhost:8080/ready
# Expected response (HTTP 200, Content-Type: application/json):
# {"status":"ready"}
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

## Monitoring Stack

The full monitoring stack includes four services: web (nginx), nginx-exporter, Prometheus, and Grafana.

### Starting the Monitoring Stack

```bash
# Start all services (web, nginx-exporter, prometheus, grafana) in detached mode
docker compose up -d
```

### Accessing Monitoring Services

| Service | URL | Credentials |
|---------|-----|-------------|
| Web (nginx) | http://localhost:8080 | N/A |
| Prometheus | http://localhost:9090 | N/A |
| Grafana | http://localhost:3000 | `admin` / `admin` |

### Grafana Dashboard

The "My Calculator - Nginx Overview" dashboard is auto-provisioned and available immediately after startup. It includes 6 panels:

- Active Connections
- Requests/sec
- 5xx Error Rate
- Connection Types
- Site Health
- Total Requests

No manual dashboard import is required — the provisioning configuration in `monitoring/grafana/provisioning/` handles datasource and dashboard loading automatically.

### Reloading Prometheus Configuration

After editing `monitoring/prometheus.yml` or `monitoring/alerts.yml`, reload Prometheus without restarting:

```bash
curl -X POST http://localhost:9090/-/reload
```

> **Note**: This requires the `--web.enable-lifecycle` flag, which is enabled in the docker-compose configuration.

## Structured Logging

nginx is configured with a structured JSON access log format (`json_combined`) using `escape=json`. Logs are written to stdout for Docker capture. Each log entry contains 11 fields:

| Field | Description |
|-------|-------------|
| `timestamp` | Request timestamp in ISO 8601 format |
| `request_id` | Unique 16-character hex correlation ID for each request |
| `remote_addr` | Client IP address |
| `method` | HTTP method (GET, POST, etc.) |
| `uri` | Full request URI including query string |
| `status` | HTTP response status code |
| `bytes_sent` | Response body size in bytes |
| `request_time` | Total request processing time in seconds |
| `upstream_response_time` | Upstream response time (if applicable) |
| `referer` | HTTP Referer header |
| `user_agent` | HTTP User-Agent header |

### Viewing Logs

```bash
# View all web service logs (follow mode)
docker compose logs -f web

# View last 50 log lines
docker compose logs --tail=50 web
```

### Filtering Logs

**Filter by request_id** (trace a specific request):

```bash
docker compose logs web | grep "request_id"
# or filter by a specific request ID:
docker compose logs web | grep "a1b2c3d4e5f6a7b8"
```

**Filter by 5xx status codes** (find errors):

```bash
docker compose logs web | grep '"status":5'
```

**Filter by 4xx status codes** (find client errors):

```bash
docker compose logs web | grep '"status":4'
```

### Example Log Entry

```json
{"timestamp":"2026-01-15T10:30:00+00:00","request_id":"a1b2c3d4e5f6a7b8","remote_addr":"172.18.0.1","method":"GET","uri":"/","status":200,"bytes_sent":1234,"request_time":0.001,"upstream_response_time":"","referer":"","user_agent":"Mozilla/5.0"}
```

The `request_id` field enables end-to-end request tracing — use it to correlate logs across services and troubleshoot individual requests.

## Metrics

### Key Metrics

The nginx-prometheus-exporter exposes the following key metrics (scraped by Prometheus):

| Metric | Type | Description |
|--------|------|-------------|
| `nginx_connections_active` | Gauge | Current number of active client connections |
| `nginx_connections_reading` | Gauge | Connections where nginx is reading the request header |
| `nginx_connections_writing` | Gauge | Connections where nginx is writing the response back to the client |
| `nginx_connections_waiting` | Gauge | Idle long-lived connections waiting for a request |
| `nginx_http_requests_total` | Counter | Total number of HTTP requests handled by nginx |
| `up` | Gauge | Target health (1 = up, 0 = down) for each scrape job |

### Querying Metrics in Prometheus

Access the Prometheus UI at `http://localhost:9090` and use the query bar to run PromQL expressions.

#### Example PromQL Queries

```promql
# Current active connections
nginx_connections_active

# Requests per second (over last 5 minutes)
rate(nginx_http_requests_total[5m])

# 5xx error rate as a percentage
rate(nginx_http_requests_total{status=~"5.."}[5m]) / rate(nginx_http_requests_total[5m]) * 100

# Connection breakdown (reading, writing, waiting)
nginx_connections_reading
nginx_connections_writing
nginx_connections_waiting

# Check if all scrape targets are up
up

# Check if the web service is up specifically
up{job="my-calculator-health"}
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

### Grafana Not Loading Dashboards

If the "My Calculator - Nginx Overview" dashboard does not appear in Grafana:

1. **Check that provisioning files are mounted correctly:**
   ```bash
   docker compose exec grafana ls -la /etc/grafana/provisioning/datasources/
   docker compose exec grafana ls -la /etc/grafana/provisioning/dashboards/
   docker compose exec grafana ls -la /var/lib/grafana/dashboards/
   ```
   You should see `datasource.yml`, `dashboards.yml`, and `nginx-overview.json` respectively.

2. **Check Grafana logs for provisioning errors:**
   ```bash
   docker compose logs grafana
   ```
   Look for messages like `provisioning dashboard` or errors related to file loading.

3. **Verify the datasource is configured:**
   - Navigate to **Configuration → Data Sources** in the Grafana UI
   - Confirm a Prometheus datasource exists pointing to `http://prometheus:9090`

4. **Manually restart Grafana to re-trigger provisioning:**
   ```bash
   docker compose restart grafana
   ```

### Prometheus Not Scraping Targets

If Prometheus is not collecting metrics from its targets:

1. **Check the targets page:**
   - Open `http://localhost:9090/targets` in your browser
   - Each scrape job should show `UP` in green. Red targets indicate a problem.

2. **Verify the nginx-exporter is running:**
   ```bash
   docker compose ps nginx-exporter
   ```
   If it is not running, check its logs:
   ```bash
   docker compose logs nginx-exporter
   ```

3. **Verify the web service is healthy:**
   ```bash
   docker compose ps web
   curl http://localhost:8080/health
   ```

4. **Reload Prometheus configuration:**
   ```bash
   curl -X POST http://localhost:9090/-/reload
   ```
   Then re-check the targets page.

5. **Check Prometheus logs for scrape errors:**
   ```bash
   docker compose logs prometheus
   ```

### Exporter Not Collecting Metrics

If the nginx-prometheus-exporter is running but not producing metrics:

1. **Verify the stub_status endpoint is accessible:**
   ```bash
   curl http://localhost:8080/stub_status
   ```
   You should see output like:
   ```
   Active connections: 5
   server accepts handled requests
    1234 1234 5678
   Reading: 0 Writing: 1 Waiting: 4
   ```

2. **Check the exporter's metrics endpoint directly:**
   ```bash
   curl http://localhost:9113/metrics
   ```
   You should see Prometheus-format metrics starting with `nginx_`.

3. **Check exporter logs for connection errors:**
   ```bash
   docker compose logs nginx-exporter
   ```
   Look for errors like `connection refused` or `scrape failed`.

4. **Verify the exporter can reach the web service:**
   ```bash
   docker compose exec nginx-exporter wget -qO- http://web:8080/stub_status
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




