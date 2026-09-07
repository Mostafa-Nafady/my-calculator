# my-calculator

**Version 1.0.0** · MIT License

A web-based calculator with multiple calculator modes. The site is a static HTML/CSS/JS application served by nginx inside a Docker container, available at [http://localhost:8080](http://localhost:8080) when running locally.

## Features

The calculator supports multiple modes, all accessible from the home page:

| Mode | Description | Path |
| --- | --- | --- |
| Basic Calculator | Addition, subtraction, multiplication, division | `basics-10-function-refactoring/index.html` |
| XPY Calculator | X Power Y | `xpy/index.html` |
| UYT Calculator | U Yield T | `uyt/index.html` |
| ASD Calculator | — | `asd.html` |
| QWE Calculator | — | `qwe.html` |
| AWQ Calculator | — | `awq.html` |

## Quick Start

### Using Docker (recommended)

```bash
# Start the development server with live reload
docker compose up
# Site available at http://localhost:8080
```

### Using npm

```bash
npm start        # runs: docker compose up
npm run build    # runs: docker build -t my-calculator .
npm run serve    # runs: npx serve .
```

### Health Check

```bash
curl http://localhost:8080/health
# Expected output: ok
```

## Project Structure

```
.
├── index.html                              # Home page with links to all calculator modes
├── about.html                              # About page
├── gallery.html                            # Gallery page
├── asd.html                                # ASD calculator page
├── qwe.html                                # QWE calculator page
├── awq.html                                # AWQ calculator page
├── basics-10-function-refactoring/         # Basic calculator sub-project
├── xpy/                                    # XPY calculator sub-project
├── uyt/                                    # UYT calculator sub-project
├── assets/
│   ├── scripts/
│   │   ├── home.js                         # Home page logic
│   │   ├── app.js                          # Core calculator logic
│   │   └── components/
│   │       └── Header.js                   # Shared header component
│   └── styles/
│       ├── app.css                         # Global styles
│       └── home.css                        # Home page styles
├── Dockerfile                              # Docker build (nginx:1.27-alpine)
├── docker-compose.yml                      # Docker Compose configuration
├── nginx.conf                              # nginx server config (port 8080, /health endpoint)
├── .github/workflows/ci.yml                # CI/CD pipeline
├── monitoring/
│   ├── prometheus.yml                      # Prometheus scrape configuration
│   └── alerts.yml                          # Prometheus alerting rules
└── docs/                                   # Additional documentation
```

## Docker Setup

- **Base image:** `nginx:1.27-alpine` (pinned, never `:latest`)
- **Runs as:** non-root `nginx` user
- **Port:** 8080
- **Health endpoint:** `/health` returns `200 'ok'`
- **Healthcheck:** `curl -f http://localhost:8080/health` (30s interval, 3 retries)
- **Volume mount:** project directory mounted read-only for live editing during development

## CI/CD Pipeline

The pipeline (`.github/workflows/ci.yml`) has 4 stages:

1. **Security check** — Trivy filesystem scan + TruffleHog secret detection
2. **Build** — Docker image build + Trivy container scan
3. **Deploy to staging** — Push to GHCR with `:staging` and `:sha-<commit>` tags (main branch only)
4. **Deploy to production** — Retag staging as `:latest` (main branch only, requires manual approval)

## Monitoring

- **Prometheus scrape config** (`monitoring/prometheus.yml`) monitors the `/health` endpoint
- **Alerting rules** (`monitoring/alerts.yml`):
  - `SiteDown` — critical, fires after 2 minutes of failed health checks
  - `HighResponseTime` — warning, fires when 95th percentile response time exceeds 2 seconds for 5 minutes

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `JWT_SECRET` | Secret used for signing auth tokens. Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |

## Documentation

- [Security Policy](SECURITY.md) — Vulnerability reporting and security measures
- [Infrastructure Documentation](docs/infrastructure/README.md) — Architecture, Docker, CI/CD, and monitoring details
- [Operations Runbook](docs/runbooks/operations.md) — Deployment, health checks, troubleshooting, and rollback procedures
- [CHANGELOG](CHANGELOG.md) — Release history

## License

MIT

