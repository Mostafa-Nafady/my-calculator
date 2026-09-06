# Security Policy

## Supported Versions

| Version | Supported          | Last Security Audit |
|---------|--------------------|---------------------|
| 1.x     | :white_check_mark: | 2026-09-06          |
| < 1.0   | :x:                | N/A                 |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue,
please report it responsibly.

- **Email**: security@example.com
- **Do NOT open a public GitHub issue for security vulnerabilities.**

### Response Timeline

| Stage                            | Target Time |
|----------------------------------|-------------|
| Acknowledgment of report         | 48 hours    |
| Initial assessment & triage      | 7 days      |
| Fix for critical vulnerabilities | 30 days     |
| Fix for high vulnerabilities     | 90 days     |

Please include the following in your report:

1. Description of the vulnerability
2. Steps to reproduce (proof of concept)
3. Affected versions
4. Potential impact
5. Suggested remediation (if any)

## Security Measures

This project implements defense-in-depth across the entire stack:

- **Docker containerization** — Application runs in `nginx:1.27-alpine` with a
  non-root user (`nginx`). The Dockerfile uses a multi-stage build to minimize
  attack surface. The container runs with `read_only` filesystem, `cap_drop: ALL`,
  `no-new-privileges`, and tmpfs mounts for writable directories.
- **Trivy filesystem and image scanning** — CI pipeline scans both the source
  code filesystem and the built Docker image for HIGH and CRITICAL
  vulnerabilities. Builds fail on unpatched critical CVEs.
- **CodeQL analysis** — Semantic code analysis runs on every push, pull request,
  and weekly schedule to detect security vulnerabilities in JavaScript/HTML.
- **Dependabot** — Automated dependency update monitoring for Docker base
  images, GitHub Actions, and npm packages with weekly cadence.
- **Snyk configuration** — Additional vulnerability scanning configured with a
  `high` severity threshold and standard exclusions.
- **GitHub environment protection** — Production deployments require manual
  approval via GitHub Environments with required reviewers.
- **Security headers in nginx** — The nginx configuration sets the following
  headers on all responses:
  - `X-Frame-Options: SAMEORIGIN` — Prevents clickjacking
  - `X-Content-Type-Options: nosniff` — Prevents MIME-type sniffing
  - `Referrer-Policy: strict-origin-when-cross-origin` — Controls referrer info
  - `Content-Security-Policy` — Restricts resource loading to same-origin
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` — Enforces HTTPS
  - `Permissions-Policy` — Disables camera, microphone, geolocation, payment, USB, sensors
  - `X-Download-Options: noopen` — Prevents IE from executing downloads in site context
- **Rate limiting** — nginx `limit_req` configured at 10 requests/second per IP
  with burst of 20 to mitigate brute-force and DDoS attacks.
- **Request hardening** — `client_max_body_size 1m`, `client_body_timeout 10s`,
  `client_header_timeout 10s` to prevent slowloris and oversized payload attacks.
- **Server tokens hidden** — `server_tokens off` prevents nginx version disclosure.
- **Secret management** — `.env` files are gitignored; `.env.example` provides a
  template with placeholder values. JWT secrets are rotated on detection of
  exposure. No real secrets are committed to the repository.
- **CI/CD security** — All GitHub Actions are pinned to full 40-character commit
  SHAs (not tags) to prevent supply-chain attacks via action tampering.

## Disclosure Policy

We follow a **responsible disclosure** model:

1. **Coordinated disclosure** — We work with reporters to understand,
   reproduce, and fix vulnerabilities before any public announcement.
2. **90-day disclosure deadline** — If a fix is not released within 90 days of
   the initial report, the reporter may publicly disclose the vulnerability.
   We will make every effort to remediate within this window.
3. **Coordinated release** — Security fixes are released with an advisory
   describing the vulnerability, affected versions, and remediation steps.
4. **Credit** — Reporters are credited in the advisory unless they prefer to
   remain anonymous.

## Incident Response

In the event of a security incident:

1. **Detection** — Identified via automated scans, monitoring alerts, or user
   reports.
2. **Triage** — Severity assessment (P1–P4), blast radius, affected services.
3. **Containment** — Isolate affected containers, revoke exposed credentials,
   block malicious IPs.
4. **Eradication** — Patch the vulnerability, rotate all potentially exposed
   secrets.
5. **Recovery** — Redeploy from known-good images, verify integrity.
6. **Post-mortem** — Blameless analysis with timeline, root cause, and action
   items.

## Security Audit History

### 2026-09-06 — Infrastructure Security Audit & Hardening

**Audit Scope:** Dockerfile, docker-compose.yml, nginx.conf, CI/CD workflows, .env management, Dependabot configuration.

**Findings & Remediations:**

| # | Finding | Severity | Remediation |
|---|---------|----------|-------------|
| 1 | nginx.conf missing CSP, HSTS, Permissions-Policy headers | HIGH | Added all missing security headers |
| 2 | Deprecated X-XSS-Protection header present | MEDIUM | Removed deprecated header |
| 3 | Dockerfile master process running as root | HIGH | Added USER nginx directive |
| 4 | docker-compose missing read_only, cap_drop, security_opt | HIGH | Added read_only, cap_drop: ALL, no-new-privileges, tmpfs |
| 5 | No CodeQL workflow despite SECURITY.md claiming one | MEDIUM | Created .github/workflows/codeql.yml |
| 6 | JWT_SECRET exposed in .env (not tracked by git) | LOW | Rotated secret value |
| 7 | docker-compose healthcheck using localhost (IPv6 issue) | LOW | Changed to 127.0.0.1 |
| 8 | No rate limiting or request body size limit in nginx | MEDIUM | Added limit_req_zone, client_max_body_size, timeouts |
| 9 | No pids_limit or mem_swappiness in docker-compose | LOW | Added pids_limit: 100, mem_swappiness: 0 |



