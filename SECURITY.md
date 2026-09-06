# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

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
  non-root user (`nginx`). No shell access, minimal attack surface.
- **Trivy filesystem and image scanning** — CI pipeline scans both the source
  code filesystem and the built Docker image for HIGH and CRITICAL
  vulnerabilities. Builds fail on unpatched critical CVEs.
- **CodeQL analysis** — Semantic code analysis runs on every push and pull
  request to detect security vulnerabilities in JavaScript/HTML.
- **Dependabot** — Automated dependency update monitoring for Docker base
  images, GitHub Actions, and npm packages with weekly cadence.
- **Snyk configuration** — Additional vulnerability scanning configured with a
  `high` severity threshold and standard exclusions.
- **GitHub environment protection** — Production deployments require manual
  approval via GitHub Environments with required reviewers.
- **Security headers in nginx** — The nginx configuration sets
  `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`,
  `Strict-Transport-Security`, `Referrer-Policy`, and `Content-Security-Policy`
  headers on all responses.
- **Secret management** — `.env` files are gitignored; `.env.example` provides
  a template with placeholder values. No real secrets are committed.

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

