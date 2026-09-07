# Infrastructure Documentation

## Architecture Overview

My Calculator is a static HTML/CSS/JS website served by **nginx** inside a Docker container. The nginx server listens on port **8080** and serves static files from `/usr/share/nginx/html`. A dedicated health endpoint at `/health` returns a `200 OK` with the body `ok`, enabling monitoring and container orchestration health checks.

```
┌─────────────────────────────────────────────┐
│              Docker Container               │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │  nginx:1.27-alpine (non-root: nginx)  │  │
│  │                                       │  │
│  │  Port: 8080                           │  │
│  │  Root: /usr/share/nginx/html          │  │
│  │  Health: /health → 200 'ok'           │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  Healthcheck: curl -f http://localhost:8080/health │
└─────────────────────────────────────────────┘
         │
         ▼
   Host Port 8080
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

The `docker-compose.yml` defines a single service:

| Property | Value |
|----------|-------|
| Service name | `web` |
| Container name | `my-calculator` |
| Port mapping | `8080:8080` |
| Restart policy | `unless-stopped` |
| Env file | `.env` |
| Volume mount | `./:/usr/share/nginx/html:ro` (read-only, for live editing during development) |
| Healthcheck | `curl -f http://localhost:8080/health` (30s interval, 3s timeout, 3 retries, 5s start period) |

> **Note**: In production, remove the read-only volume mount to use the files baked into the image.

### nginx.conf

The nginx configuration file:

- Listens on port **8080** (enables non-root operation, since ports below 1024 require root)
- Sets the document root to `/usr/share/nginx/html`
- Serves `index.html` by default
- Uses `try_files` for clean URL handling (returns 404 for missing files)
- Defines a `/health` endpoint that returns `200 'ok'` with `Content-Type: text/plain`

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

### Prometheus Scrape Configuration

The Prometheus configuration (`monitoring/prometheus.yml`) defines two scrape jobs:

| Job Name | Metrics Path | Target | Purpose |
|----------|-------------|--------|---------|
| `my-calculator` | `/health` | `web:8080` | Health check monitoring |
| `nginx-stub` | `/stub_status` | `web:8080` | nginx metrics (requires stub_status module) |

Both jobs use a 30-second scrape interval and evaluation interval.

### Alerting Rules

Alerting rules are defined in `monitoring/alerts.yml`:

| Alert | Condition | Duration | Severity | Description |
|-------|-----------|----------|----------|-------------|
| `SiteDown` | `up{job="my-calculator"} == 0` | 2 minutes | Critical | Health check has been failing for 2 minutes |
| `HighResponseTime` | P95 latency > 2 seconds | 5 minutes | Warning | 95th percentile response time exceeds 2 seconds |

### Extending Metrics

The current setup uses the `/health` endpoint for basic uptime monitoring. For full metrics collection, consider adding:

- **nginx stub_status**: Enable the `stub_status` module in `nginx.conf` to expose connection metrics (active connections, requests handled, etc.)
- **nginx prometheus exporter**: Use a dedicated exporter sidecar container (e.g., `nginx/nginx-prometheus-exporter`) for detailed request metrics, response codes, and latency histograms

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

