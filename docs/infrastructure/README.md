# Infrastructure Documentation

## Architecture Overview

My Calculator is a static HTML/CSS/JS website served by **nginx** inside a Docker container. The nginx server listens on port **8080** and serves static files from `/usr/share/nginx/html`. A dedicated health endpoint at `/health` returns a `200 OK` with a JSON body containing status, timestamp, and uptime, enabling monitoring and container orchestration health checks. The full stack includes four services: the web server, an nginx Prometheus exporter, Prometheus, and Grafana.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        Docker Compose Stack                              │
│                                                                          │
│  ┌─────────────────────────────┐    ┌─────────────────────────────┐      │
│  │  web (nginx:1.27-alpine)    │    │  nginx-exporter             │      │
│  │  Port: 8080                 │    │  (nginx/nginx-prometheus-   │      │
│  │  Root: /usr/share/nginx/html│    │   exporter:1.3.0)           │      │
│  │  /health  → JSON status     │    │  Port: 9113                 │      │
│  │  /ready   → JSON readiness  │    │  Scrapes: web:8080          │      │
│  │  /stub_status → nginx stats │────│          /stub_status       │      │
│  └─────────────────────────────┘    └──────────────┬──────────────┘      │
│           │                                         │                    │
│           │ Host Port 8080                          │                    │
│           ▼                                         ▼                    │
│     External Access                          ┌──────────────────┐        │
│     http://localhost:8080                    │  prometheus      │        │
│                                              │  (prom/prometheus│        │
│                                              │   :v2.54.1)      │        │
│                                              │  Port: 9090      │        │
│                                              │  Scrapes:        │        │
│                                              │   nginx-exporter │        │
│                                              │   :9113/metrics  │        │
│                                              │   prometheus     │        │
│                                              │   :9090/metrics  │        │
│                                              └────────┬─────────┘        │
│                                                       │                  │
│                                                       ▼                  │
│                                              ┌──────────────────┐        │
│                                              │  grafana         │        │
│                                              │  (grafana/grafana│        │
│                                              │   :11.2.0)       │        │
│                                              │  Port: 3000      │        │
│                                              │  Datasource:     │        │
│                                              │   Prometheus     │        │
│                                              └────────┬─────────┘        │
│                                                       │                  │
│                                                       ▼                  │
│                                              Host Port 3000             │
│                                              http://localhost:3000      │
└──────────────────────────────────────────────────────────────────────────┘

Data Flow:
  web /stub_status → nginx-exporter → prometheus → grafana
  web /health      → prometheus (scrape job: my-calculator-health)
```

## Docker Setup

### Dockerfile

The Dockerfile uses the pinned base image `nginx:1.27-alpine` (never `:latest` in production). Key features:

- **Base image**: `nginx:1.27-alpine` — pinned to a specific version for reproducibility
- **curl installed**: Required for the Docker `HEALTHCHECK` probe
- **Custom nginx config**: Copied to `/etc/nginx/nginx.conf` (listens on port 8080 for non-root operation)
- **Static files**: Copied into `/usr/share/nginx/html/` (`.dockerignore` ensures only HTML/CSS/JS/assets are included)
- **Non-root user**: Runs as the built-in `nginx` user for security
- **Exposed port**: 8080
- **Healthcheck**: Runs `curl -f http://localhost:8080/health` every 30s with 3 retries

### docker-compose.yml

The `docker-compose.yml` defines four services:

#### web

| Property | Value |
|----------|-------|
| Service name | `web` |
| Container name | `my-calculator` |
| Port mapping | `8080:8080` |
| Restart policy | `unless-stopped` |
| Env file | `.env` |
| Volume mount | `./:/usr/share/nginx/html:ro` (read-only, for live editing during development) |
| Healthcheck | `curl -f http://localhost:8080/health` (30s interval, 3s timeout, 3 retries, 5s start period) |

#### nginx-exporter

| Property | Value |
|----------|-------|
| Service name | `nginx-exporter` |
| Container name | `nginx-exporter` |
| Image | `nginx/nginx-prometheus-exporter:1.3.0` |
| Port mapping | `9113:9113` |
| Scrape URI | `http://web:8080/stub_status` |
| Depends on | `web` (healthy) |
| Restart policy | `unless-stopped` |

#### prometheus

| Property | Value |
|----------|-------|
| Service name | `prometheus` |
| Container name | `prometheus` |
| Image | `prom/prometheus:v2.54.1` |
| Port mapping | `9090:9090` |
| Volumes | `prometheus.yml` (config), `alerts.yml` (rules), `prometheus-data` (TSDB) |
| Depends on | `nginx-exporter` |
| Restart policy | `unless-stopped` |

#### grafana

| Property | Value |
|----------|-------|
| Service name | `grafana` |
| Container name | `grafana` |
| Image | `grafana/grafana:11.2.0` |
| Port mapping | `3000:3000` |
| Volumes | `grafana-data` (persistence), provisioning config, dashboard JSON |
| Environment | `GF_SECURITY_ADMIN_PASSWORD=admin`, `GF_USERS_ALLOW_SIGN_UP=false` |
| Depends on | `prometheus` |
| Restart policy | `unless-stopped` |

> **Note**: In production, remove the read-only volume mount to use the files baked into the image.

### nginx.conf

The nginx configuration file:

- Listens on port **8080** (enables non-root operation, since ports below 1024 require root)
- Sets the document root to `/usr/share/nginx/html`
- Serves `index.html` by default
- Uses `try_files` for clean URL handling (returns 404 for missing files)
- Defines a `/health` endpoint that returns `200` with a JSON body `{"status":"ok","timestamp":"...","uptime":N}` and `Content-Type: application/json`
- Defines a `/ready` endpoint that returns `200` with a JSON body `{"status":"ready"}` for readiness probes
- Defines a `/stub_status` endpoint that serves the nginx `stub_status` module output (active connections, accepts, handled, requests, reading, writing, waiting)
- Uses a structured JSON access log format (`json_combined`) with `escape=json` and 11 fields including a `request_id` correlation ID, logging to stdout for Docker capture

### Common Commands

```bash
# Start the container in detached mode
docker compose up -d

# Rebuild the image and start in detached mode
docker compose up -d --build

# Build the image manually
docker build -t my-calculator .
```

## CI/CD Pipeline

The CI/CD pipeline is defined in `.github/workflows/ci.yml` and consists of four stages:

### Stage 1: Security Check

Runs on every push and pull request to `main`:

- **Trivy filesystem scan**: Scans the entire repository for vulnerabilities at `CRITICAL` and `HIGH` severity levels. Fails the pipeline if any are found.
- **TruffleHog secret detection**: Scans for verified secrets (API keys, tokens, credentials) using `--only-verified` flag to reduce false positives.

### Stage 2: Build

Depends on the security check passing:

- **Docker Buildx**: Builds the Docker image using `docker/build-push-action@v6`
- **Trivy container scan**: Scans the built image for vulnerabilities at `CRITICAL` and `HIGH` severity. Fails the pipeline if any are found.

### Stage 3: Deploy to Staging

Runs only on pushes to `main` (after build passes):

- Logs in to GitHub Container Registry (GHCR) using `GITHUB_TOKEN`
- Builds and pushes the image with two tags:
  - `ghcr.io/<owner>/<repo>:staging`
  - `ghcr.io/<owner>/<repo>:sha-<commit-sha>`
- Outputs the image digest for traceability

### Stage 4: Deploy to Production

Runs only on pushes to `main` (after staging deployment passes):

- **Requires manual approval**: The `production` environment must have required reviewers configured in GitHub Settings → Environments → production
- Pulls the `:staging` image from GHCR
- Retags it as `:latest`
- Pushes the `:latest` tag to GHCR

### Dependabot

Dependabot is configured to check for updates weekly:

- **Docker** base image dependencies
- **GitHub Actions** versions used in workflows

## Monitoring

The monitoring stack consists of four services that work together to collect, store, and visualize metrics:

1. **web** — nginx serves `/health`, `/ready`, and `/stub_status` endpoints
2. **nginx-exporter** — sidecar that scrapes `/stub_status` and exposes Prometheus-format metrics on port 9113
3. **prometheus** — scrapes the exporter and stores metrics in a time-series database on port 9090
4. **grafana** — visualizes Prometheus metrics via auto-provisioned dashboards on port 3000

### Health Endpoints

#### /health

Returns a JSON object with status, timestamp, and uptime:

```bash
curl http://localhost:8080/health
```

```json
{"status":"ok","timestamp":"2026-01-15T10:30:00+00:00","uptime":42}
```

- **Content-Type**: `application/json`
- **HTTP Status**: `200`
- **Fields**:
  - `status` — always `"ok"` when nginx is running
  - `timestamp` — current server time in ISO 8601 format
  - `uptime` — number of requests processed by the current nginx worker connection

#### /ready

Returns a JSON readiness check for container orchestration probes:

```bash
curl http://localhost:8080/ready
```

```json
{"status":"ready"}
```

- **Content-Type**: `application/json`
- **HTTP Status**: `200`
- Use this endpoint for Kubernetes readiness probes or load balancer health checks

#### /stub_status

Serves the nginx `stub_status` module output, providing raw connection metrics:

```bash
curl http://localhost:8080/stub_status
```

```
Active connections: 5
server accepts handled requests
 1234 1234 5678
Reading: 0 Writing: 1 Waiting: 4
```

The nginx-prometheus-exporter scrapes this endpoint and converts it to Prometheus-format metrics.

### Structured JSON Access Logging

nginx is configured with a structured JSON access log format (`json_combined`) that uses `escape=json` for safe encoding. Logs are written to stdout for Docker capture. The log format includes 11 fields:

| Field | nginx Variable | Description |
|-------|---------------|-------------|
| `timestamp` | `$time_iso8601` | Request timestamp in ISO 8601 format |
| `request_id` | `$request_id` | Unique correlation ID for each request (16-character hex) |
| `remote_addr` | `$remote_addr` | Client IP address |
| `method` | `$request_method` | HTTP method (GET, POST, etc.) |
| `uri` | `$request_uri` | Full request URI including query string |
| `status` | `$status` | HTTP response status code |
| `bytes_sent` | `$body_bytes_sent` | Response body size in bytes |
| `request_time` | `$request_time` | Total request processing time in seconds |
| `upstream_response_time` | `$upstream_response_time` | Upstream response time (if applicable) |
| `referer` | `$http_referer` | HTTP Referer header |
| `user_agent` | `$http_user_agent` | HTTP User-Agent header |

The `request_id` field enables end-to-end request tracing — each request receives a unique ID that can be used to correlate logs across services and troubleshoot individual requests.

To view logs:

```bash
docker compose logs web
```

Example log entry:

```json
{"timestamp":"2026-01-15T10:30:00+00:00","request_id":"a1b2c3d4e5f6a7b8","remote_addr":"172.18.0.1","method":"GET","uri":"/","status":200,"bytes_sent":1234,"request_time":0.001,"upstream_response_time":"","referer":"","user_agent":"Mozilla/5.0"}
```

### nginx-prometheus-exporter

The exporter sidecar runs alongside the web service:

- **Image**: `nginx/nginx-prometheus-exporter:1.3.0`
- **Scrape target**: `http://web:8080/stub_status`
- **Metrics port**: `9113`
- **Metrics path**: `/metrics`

The exporter converts nginx stub_status output into Prometheus-format metrics (e.g., `nginx_connections_active`, `nginx_http_requests_total`).

### Prometheus

Prometheus scrapes metrics from three targets and stores them in a time-series database:

- **Image**: `prom/prometheus:v2.54.1`
- **Port**: `9090`
- **Config file**: `monitoring/prometheus.yml`
- **Alert rules**: `monitoring/alerts.yml`
- **Lifecycle API**: Enabled (`--web.enable-lifecycle`) for config reloads without restart

#### Scrape Configuration

The Prometheus configuration (`monitoring/prometheus.yml`) defines three scrape jobs:

| Job Name | Metrics Path | Target | Purpose |
|----------|-------------|--------|---------|
| `my-calculator-health` | `/health` | `web:8080` | Health check monitoring |
| `nginx-exporter` | `/metrics` | `nginx-exporter:9113` | nginx metrics via prometheus exporter |
| `prometheus` | `/metrics` | `localhost:9090` | Prometheus self-monitoring |

All jobs use a 30-second scrape interval and evaluation interval.

#### Alerting Rules

Alerting rules are defined in `monitoring/alerts.yml`:

| Alert | Condition | Duration | Severity | Description |
|-------|-----------|----------|----------|-------------|
| `SiteDown` | `up{job="my-calculator-health"} == 0` | 2 minutes | Critical | Health check has been failing for 2 minutes |
| `HighResponseTime` | P95 latency > 2 seconds | 5 minutes | Warning | 95th percentile response time exceeds 2 seconds |
| `NginxExporterDown` | `up{job="nginx-exporter"} == 0` | 2 minutes | Critical | nginx Prometheus exporter has been down for 2 minutes |
| `HighErrorRate` | 5xx error rate > 5% | 5 minutes | Warning | 5xx error rate exceeds 5% of total requests for 5 minutes |
| `HighActiveConnections` | `nginx_connections_active > 100` | 5 minutes | Warning | Active nginx connections exceed 100 for 5 minutes |
| `PrometheusDown` | `up{job="prometheus"} == 0` | 5 minutes | Critical | Prometheus has been down for 5 minutes |
| `NginxHighRequestRate` | Request rate > 100 req/s | 5 minutes | Warning | Request rate exceeds 100 requests/sec for 5 minutes |

### Grafana

Grafana provides visualization of Prometheus metrics with auto-provisioned datasources and dashboards:

- **Image**: `grafana/grafana:11.2.0`
- **Port**: `3000`
- **Default credentials**: `admin` / `admin`
- **Datasource**: Auto-provisioned from `monitoring/grafana/provisioning/datasources/datasource.yml` (points to Prometheus at `http://prometheus:9090`)
- **Dashboard provider**: Configured in `monitoring/grafana/provisioning/dashboards/dashboards.yml`
- **Dashboard JSON**: `monitoring/grafana/dashboards/nginx-overview.json`

#### Accessing Grafana

Open `http://localhost:3000` in your browser and log in with `admin` / `admin`.

#### Grafana Dashboard: "My Calculator - Nginx Overview"

The auto-provisioned dashboard contains 6 panels:

| Panel | Description |
|-------|-------------|
| Active Connections | Current active nginx connections over time |
| Requests/sec | Request rate (requests per second) |
| 5xx Error Rate | Percentage of 5xx responses |
| Connection Types | Breakdown of reading, writing, and waiting connections |
| Site Health | Up/down status of the web service |
| Total Requests | Cumulative total requests handled by nginx |

### Metrics Reference

Key metrics exposed by the nginx-prometheus-exporter and Prometheus:

| Metric | Type | Description |
|--------|------|-------------|
| `nginx_connections_active` | Gauge | Current number of active client connections |
| `nginx_connections_reading` | Gauge | Connections where nginx is reading the request header |
| `nginx_connections_writing` | Gauge | Connections where nginx is writing the response back to the client |
| `nginx_connections_waiting` | Gauge | Idle long-lived connections waiting for a request |
| `nginx_http_requests_total` | Counter | Total number of HTTP requests handled by nginx |
| `up` | Gauge | Target health (1 = up, 0 = down) for each scrape job |

## Security

### Environment Variables

- The `.env` file is **gitignored** and never committed to the repository
- `.env.example` serves as the template — copy it to `.env` and fill in real values:
  ```bash
  cp .env.example .env
  ```

### CI/CD Security Scanning

- **Trivy filesystem scan**: Runs in the `security-check` stage, scanning all repository files for known vulnerabilities at `CRITICAL` and `HIGH` severity
- **Trivy container scan**: Runs in the `build` stage, scanning the built Docker image for vulnerabilities
- **TruffleHog secret detection**: Runs in the `security-check` stage, detecting verified secrets in the codebase

### Docker Security

- **Non-root user**: The container runs as the built-in `nginx` user, not as root
- **Pinned base image**: Uses `nginx:1.27-alpine` (specific version), never `:latest`
- **Read-only volume mount**: In development, the project directory is mounted read-only (`:ro`)

### Dependency Monitoring

- **Dependabot**: Automatically checks for updates to the Docker base image and GitHub Actions, creating pull requests when newer versions are available

## Local Development

### Prerequisites

- Docker Engine (v24+ recommended)
- Docker Compose (v2+ recommended)

### Getting Started

```bash
# Start the development server with live reload via volume mount
docker compose up

# The site is now available at http://localhost:8080
```

The read-only volume mount (`./:/usr/share/nginx/html:ro`) means changes to local HTML/CSS/JS files are immediately reflected in the browser — just refresh the page. No rebuild is needed during development.

### Useful Commands

```bash
# Check if the site is healthy
curl http://localhost:8080/health
# Expected output: ok

# View live logs
docker compose logs -f

# Stop the container
docker compose down

# Rebuild and restart (after changing Dockerfile or nginx.conf)
docker compose up -d --build
```





