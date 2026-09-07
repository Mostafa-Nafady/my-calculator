# Security Policy

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue in this project, please report it responsibly.

### How to Report

- **Email**: security@example.com
- **Do NOT open a public GitHub issue** for security vulnerabilities

Please include the following in your report:

1. A description of the vulnerability and its potential impact
2. Steps to reproduce the issue
3. Any proof-of-concept code or screenshots
4. Your suggested fix (if any)

### Responsible Disclosure Timeline

| Milestone | Timeline |
|-----------|----------|
| Acknowledgment of report | Within 48 hours |
| Initial assessment and triage | Within 5 business days |
| Fix or mitigation | Within 90 days (depending on severity and complexity) |
| Public disclosure | After fix is released, or after 90 days if no fix is available |

We are committed to working with you to understand and resolve the issue. We will keep you informed of progress throughout the process.

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | ✅ Yes    |

Only the latest version of the application is actively maintained and receives security updates.

## Security Measures

### CI/CD Pipeline Security

The CI/CD pipeline (`.github/workflows/ci.yml`) includes multiple security scanning stages:

- **Trivy filesystem scan**: Scans all repository files for known vulnerabilities at `CRITICAL` and `HIGH` severity levels. Runs on every push and pull request. The pipeline fails if vulnerabilities are found.
- **Trivy container scan**: Scans the built Docker image for vulnerabilities at `CRITICAL` and `HIGH` severity levels. Runs after the image is built. The pipeline fails if vulnerabilities are found.
- **TruffleHog secret detection**: Scans the repository for verified secrets (API keys, tokens, private keys, etc.) using the `--only-verified` flag to minimize false positives. Runs on every push and pull request.

### Environment Variable Management

- The `.env` file is **gitignored** and never committed to the repository
- `.env.example` is the template file — copy it to `.env` and fill in real values:
  ```bash
  cp .env.example .env
  ```
- Secrets are injected at runtime via the `env_file` directive in `docker-compose.yml`

### Docker Security

- **Non-root user**: The Docker container runs as the built-in `nginx` user, not as root. This limits the potential impact of a container compromise.
- **Pinned base image**: The Dockerfile uses `nginx:1.27-alpine` (a specific version tag), never `:latest`. This ensures reproducible builds and prevents unexpected changes from upstream image updates.
- **Minimal image**: Alpine-based images are smaller and have a reduced attack surface compared to full Linux distributions.
- **Read-only volume mount**: In development, the project directory is mounted read-only (`:ro`), preventing the container from modifying host files.

### Dependency Monitoring

- **Dependabot**: Automatically monitors Docker base images and GitHub Actions for known vulnerabilities. Creates pull requests with updates when newer, patched versions are available. Checks run weekly.

### Health Monitoring

- **Health endpoint**: The `/health` endpoint (returning `200 ok`) enables monitoring and quick detection of outages. Docker's built-in healthcheck probes this endpoint every 30 seconds with 3 retries.
- **Prometheus scrape config**: The monitoring configuration (`monitoring/prometheus.yml`) scrapes the health endpoint, and alerting rules (`monitoring/alerts.yml`) fire a `SiteDown` alert if the health check fails for 2 minutes.

