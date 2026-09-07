# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-09-07

### Added — Stage 4.1: Monitoring & Health
- Security policy (`SECURITY.md`) with vulnerability reporting guidelines, supported versions table, and documentation of CI/CD security scanning, Docker security, and health monitoring
- Infrastructure documentation (`docs/infrastructure/README.md`) covering architecture overview, Docker setup, CI/CD pipeline details, monitoring configuration, and local development guide
- Operations runbook (`docs/runbooks/operations.md`) with deployment procedures, health check instructions, troubleshooting guides, and rollback procedures
- Prometheus alerting rules (`monitoring/alerts.yml`): `SiteDown` (critical, fires after 2 minutes of failed health checks) and `HighResponseTime` (warning, fires when P95 latency exceeds 2 seconds for 5 minutes)
- Prometheus scrape configuration (`monitoring/prometheus.yml`) with 30-second scrape interval for `/health` and `/stub_status` endpoints

### Added — Stage 3.1: CI/CD Pipeline
- GitHub Actions CI/CD pipeline (`.github/workflows/ci.yml`) with four stages: security-check (Trivy filesystem scan + TruffleHog secret detection), build (Docker Buildx + Trivy container scan), deploy-staging (push to GHCR with `:staging` and `:sha-<commit>` tags), and deploy-production (manual approval, retag as `:latest`)
- Concurrency control to cancel in-progress runs on the same branch
- Production environment protection requiring manual approval

### Added — Stage 2.1: Containerization
- `Dockerfile` using pinned `nginx:1.27-alpine` base image with non-root `nginx` user, curl for healthcheck, and `HEALTHCHECK` probing `/health` every 30 seconds
- `docker-compose.yml` with port 8080 mapping, `unless-stopped` restart policy, `.env` file injection, read-only volume mount for development, and healthcheck configuration
- `nginx.conf` listening on port 8080 with `/health` endpoint returning `200 'ok'` and `try_files` for clean URL handling

### Added — Stage 1.1: Security & Project Foundation
- `.env.example` environment variable template with `JWT_SECRET` placeholder
- `.gitignore` to prevent committing secrets and build artifacts
- Dependabot configuration for weekly Docker base image and GitHub Actions version checks

### Changed — Stage 2: Wire AWQ into Navigation
- Added AWQ calculator link to home page navigation and header component

### Added — Stage 1: Create AWQ Page Assets
- AWQ calculator page and associated assets

### Added — Gallery Page Implementation
- `gallery.html` page

### Added — Initial Release
- Web-based calculator with basic arithmetic operations (addition, subtraction, multiplication, division)
- Home page (`index.html`) with navigation to calculator modes
- Reusable header component (`assets/scripts/components/Header.js`)
- Application styles (`assets/styles/app.css`, `assets/styles/home.css`)
- `package.json` with npm scripts for Docker and local serving

