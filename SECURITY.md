# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | ✅        |
| < 1.0   | ❌        |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please report it responsibly.

### How to Report

1. **GitHub Security Advisories** (preferred): Navigate to the repository's **Settings > Security > Advisories** and click **"New draft security advisory"**. This provides a private channel for disclosure and discussion.
2. **Email**: Alternatively, email the maintainer directly with details of the vulnerability.

### What to Include

Please provide the following in your report:

- A description of the vulnerability and the affected component
- Steps to reproduce the issue
- The potential impact of the vulnerability

### Response Timeline

| Milestone              | Target           |
|------------------------|------------------|
| Acknowledgment         | Within 48 hours  |
| Initial assessment     | Within 7 days    |
| Fix or mitigation      | Best effort based on severity |

### Disclosure Policy

We kindly request that you **do not publicly disclose** the vulnerability until a fix has been developed and released. We will coordinate with you on a publication timeline once the issue is resolved.

## Security Measures

The following security practices are in place to protect this project:

- **Docker containerization** — The application runs in a container with a non-root user and a read-only filesystem to minimize the attack surface.
- **Trivy vulnerability scanning** — The CI/CD pipeline runs Trivy filesystem, configuration, and container image scans on every commit and pull request.
- **GitHub CodeQL analysis** — Automated semantic code analysis detects potential security vulnerabilities in the codebase.
- **Dependency scanning via Dependabot** — Dependabot monitors dependencies for known vulnerabilities and opens pull requests with updates.
- **Environment variable protection** — The `.env` file is gitignored and never committed to the repository.
- **Security headers** — The nginx configuration sets `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, and `Referrer-Policy` headers on all responses.

