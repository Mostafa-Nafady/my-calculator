# Infrastructure Documentation

## Overview

**my-calculator** is a static HTML/CSS/JS calculator website served by nginx inside a Docker container. There is no build step — static files are copied directly into the nginx document root and served as-is on port 8080. The project uses a GitHub Actions CI/CD pipeline with five stages (lint, security-scan, build, deploy-staging, deploy-production) and implements defense-in-depth security measures including Trivy scanning, CodeQL analysis, Dependabot, and Snyk.

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          GitHub Repository                              │
│                   (static HTML/CSS/JS source files)                     │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               │  push to main/master, PR, or manual dispatch
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        GitHub Actions CI/CD                             │
│                                                                         │
│   ┌─────────┐    ┌───────────────┐    ┌─────────┐    ┌────────┐        │
│   │  Lint   │───▶│ Security Scan │───▶│  Build  │───▶│ Deploy │        │
│   │HTMLHint │    │    Trivy      │    │ Docker  │    │Staging │        │
│   └─────────┘    │    + Secret   │    │ Buildx  │    │ (auto) │        │
│                  └───────────────┘    │ + Scan  │    └───┬────┘        │
│                                       └─────────┘        │             │
│                                                          ▼             │
│                                                    ┌──────────┐        │
│                                                    │  Deploy  │        │
│                                                    │Production│        │
│                                                    │ (manual) │        │
│                                                    └──────────┘        │
└─────────────────────────────────────────────────────────────────────────┘
                               │
                               │  Docker image: my-calculator:<sha>
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        Docker Container                                 │
│                                                                         │
│   ┌───────────────────────────────────────────────────────────────┐     │
│   │                    nginx:1.27-alpine                          │     │
│   │                                                               │     │
│   │   ┌─────────────────────────────────────────────────────┐     │     │
│   │   │              nginx (port 8080)                       │     │     │
│   │   │                                                     │     │     │
│   │   │   /usr/share/nginx/html/                            │     │     │
│   │   │   ├── index.html          ├── about.html            │     │     │
│   │   │   ├── addop.html          ├── asd.html              │     │     │
│   │   │   ├── ASDSFSF.html        ├── zzz.html             │     │     │
│   │   │   ├── assets/             ├── basics-10-function-   │     │     │
│   │   │   │   ├── scripts/        │   refactoring/          │     │     │
│   │   │   │   └── styles/         ├── uyt/                  │     │     │
│   │   │   │                       └── xpy/                  │     │     │
│   │   │                                                     │     │     │
│   │   │   Features:                                         │     │     │
│   │   │   • Gzip compression                                │     │     │
│   │   │   • Security headers (X-Frame-Options, etc.)       │     │     │
│   │   │   • Cache: assets 1yr immutable, HTML no-cache     │     │     │
│   │   │   • try_files fallback to index.html               │     │     │
│   │   │   • Custom 404 page                                 │     │     │
│   │   │   • Runs as non-root user (nginx)                   │     │     │
│   │   │   • HEALTHCHECK via wget                            │     │     │
│   │   └─────────────────────────────────────────────────────┘     │     │
│   └───────────────────────────────────────────────────────────────┘     │
│                                                                         │
│   Resource Limits: 256M memory, 0.5 CPU                                 │
│   Volume: ./logs → /var/log/nginx                                       │
└─────────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
                        http://localhost:8080
```

## Technology Stack

| Component | Technology | Version / Purpose |
|-----------|-----------|-------------------|
| Web Server | nginx | 1.27-alpine — serves static files on port 8080 |
| Container Runtime | Docker | Builds and runs the nginx container |
| Container Orchestration | Docker Compose | Local and server deployment configuration |
| CI/CD | GitHub Actions | 5-job pipeline: lint → security-scan → build → deploy-staging → deploy-production |
| Linting | HTMLHint | HTML validation and asset reference checking |
| Vulnerability Scanning | Trivy | Filesystem scan + Docker image scan (CRITICAL/HIGH) |
| Code Analysis | CodeQL | Semantic security analysis for JavaScript/HTML |
| Dependency Monitoring | Dependabot | Weekly checks for Docker, GitHub Actions, and npm updates |
| Vulnerability Scanning | Snyk | Additional scanning with `high` severity threshold |
| Base Image | nginx:1.27-alpine | Alpine-based minimal nginx image |
| Runtime User | nginx | Non-root container execution |

## File Structure

### Container & Server Configuration

| File | Description |
|------|-------------|
| `Dockerfile` | Builds the Docker image from `nginx:1.27-alpine`. Copies all HTML files and asset directories into `/usr/share/nginx/html/`, sets up non-root `nginx` user, exposes port 8080, and defines a `HEALTHCHECK` using `wget`. |
| `docker-compose.yml` | Defines the `calculator-web` service. Maps port `8080:8080`, sets `NODE_ENV=production`, configures `restart: unless-stopped`, healthcheck, resource limits (256M memory / 0.5 CPU), and mounts `./logs` to `/var/log/nginx`. |
| `.dockerignore` | Excludes unnecessary files (`.git`, `node_modules`, `docs`, `logs`, `.env`) from the Docker build context to reduce image size and build time. |
| `nginx.conf` | Custom nginx configuration. Listens on port 8080, runs as `nginx` user, enables gzip compression, sets cache headers (assets: 1 year immutable, HTML: no-cache), adds security headers (`X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`), configures `try_files` fallback to `index.html`, and defines a custom 404 page. |

### CI/CD Pipeline

| File | Description |
|------|-------------|
| `.github/workflows/ci.yml` | GitHub Actions workflow with 5 jobs: **lint** (HTMLHint + asset reference check), **security-scan** (Trivy filesystem SARIF scan + secret scan), **build** (Docker Buildx image build + Trivy image scan + artifact upload), **deploy-staging** (auto-deploy on push to main/master), **deploy-production** (manual approval required). Triggers on push to main/master, pull requests, and manual dispatch. |
| `.htmlhintrc` | HTMLHint configuration file. Defines rules for HTML validation such as tag pairing, attribute requirements, and doctype enforcement. |

### Security Configuration

| File | Description |
|------|-------------|
| `.trivyignore` | Lists CVE IDs to suppress in Trivy scans. Used for vulnerabilities that have been triaged and accepted or have no available fix. |
| `.snyk` | Snyk configuration file. Sets vulnerability scanning parameters including severity threshold (`high`) and standard exclusions. |
| `SECURITY.md` | Security policy document. Defines supported versions, vulnerability reporting process, response timelines, security measures, disclosure policy, and incident response procedures. |
| `.github/dependabot.yml` | Dependabot configuration. Monitors Docker base images, GitHub Actions, and npm packages for updates on a weekly cadence. |
| `.github/codeql-config.yml` | CodeQL analysis configuration. Specifies which paths to include or exclude from semantic code analysis. |

### Environment & Repository

| File | Description |
|------|-------------|
| `.gitignore` | Specifies files and directories to exclude from version control, including `.env`, `node_modules/`, `logs/`, and Docker build artifacts. |
| `.env.example` | Template environment file with placeholder values. Provides documentation for required environment variables without exposing real secrets. |

## Local Development

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (v24.0 or later recommended)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.20 or later recommended)

### Running Locally

```bash
# Clone the repository (if not already done)
git clone https://github.com/daytona/my-calculator.git
cd my-calculator

# Build and start the container
docker compose up --build
```

The website will be available at **http://localhost:8080**.

### Stopping the Container

```bash
# Stop and remove containers (preserves volumes)
docker compose down
```

### Viewing Logs

```bash
# View all container logs
docker compose logs calculator-web

# Follow logs in real-time
docker compose logs -f calculator-web

# View last 50 lines
docker compose logs --tail=50 calculator-web
```

### Rebuilding After Changes

```bash
# Rebuild image and restart in background
docker compose up --build -d
```

## CI/CD Pipeline

### Overview

The CI/CD pipeline consists of 5 jobs that run sequentially with dependencies:

```
lint ──▶ security-scan ──▶ build ──▶ deploy-staging ──▶ deploy-production
```

| # | Job | Purpose | Duration |
|---|-----|---------|----------|
| 1 | **Lint** | Runs HTMLHint on all HTML files and verifies that all locally referenced CSS/JS files exist. | ~5 min |
| 2 | **Security Scan** | Runs Trivy filesystem scan (SARIF output uploaded to GitHub Security tab) and Trivy secret scan on the repository. Fails on CRITICAL/HIGH secrets. | ~10 min |
| 3 | **Build** | Builds the Docker image using Docker Buildx with layer caching, runs Trivy image scan (fails on CRITICAL/HIGH vulnerabilities), and uploads the image as a GitHub artifact. | ~15 min |
| 4 | **Deploy to Staging** | Downloads the Docker image artifact, loads it, and deploys to the staging server. Runs automatically on push to main/master. | ~10 min |
| 5 | **Deploy to Production** | Downloads the Docker image artifact, loads it, and deploys to the production server. **Requires manual approval** via GitHub Environment protection. | ~10 min |

### Triggers

The pipeline runs on:

- **Push** to `main` or `master` branch
- **Pull request** targeting `main` or `master`
- **Manual dispatch** via GitHub Actions tab ("Run workflow" button)

> **Note:** Deploy jobs (staging and production) only run on push to `main`/`master`, not on pull requests.

### Environments

| Environment | Deployment Trigger | Approval Required |
|-------------|-------------------|-------------------|
| **Staging** | Automatic on push to main/master | No |
| **Production** | After staging deployment completes | Yes — manual approval via GitHub Environment protection rules |

### Concurrency

The pipeline uses concurrency groups to cancel in-progress runs when a new commit is pushed to the same branch. This prevents overlapping deployments and conserves CI resources.

## Security

This project implements defense-in-depth security across the entire stack:

| Layer | Measure | Details |
|-------|---------|---------|
| **Container** | Non-root execution | Container runs as the `nginx` user, not root. |
| **Container** | Minimal base image | `nginx:1.27-alpine` provides a small attack surface. |
| **Container** | Resource limits | 256M memory / 0.5 CPU cap prevents resource exhaustion. |
| **Network** | Security headers | `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy` set on all responses. |
| **Network** | Non-privileged port | nginx listens on port 8080, not port 80. |
| **CI/CD** | Trivy filesystem scan | Scans source code for vulnerabilities, uploads SARIF to GitHub Security tab. |
| **CI/CD** | Trivy image scan | Scans built Docker image for CRITICAL/HIGH vulnerabilities. Build fails if found. |
| **CI/CD** | Trivy secret scan | Scans for exposed secrets, fails on CRITICAL/HIGH findings. |
| **CI/CD** | CodeQL analysis | Semantic code analysis for JavaScript/HTML vulnerabilities. |
| **CI/CD** | Snyk scanning | Additional vulnerability scanning with `high` severity threshold. |
| **Dependencies** | Dependabot | Weekly automated checks for Docker, GitHub Actions, and npm dependency updates. |
| **Deployment** | Environment protection | Production deployments require manual approval from designated reviewers. |
| **Secrets** | `.env` protection | `.env` files are gitignored; `.env.example` provides a template with placeholder values only. |

For the full security policy, including vulnerability reporting procedures and response timelines, see [SECURITY.md](../../SECURITY.md).

