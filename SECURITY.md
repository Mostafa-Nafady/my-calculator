# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue
in this project, please report it responsibly.

### How to Report

1. **Do NOT open a public GitHub issue** for security vulnerabilities.
2. Email the project maintainers directly with a description of the
   vulnerability, steps to reproduce, and any proof-of-concept code.
3. Include the affected version and, if known, the specific file or component.

### Response Timeline

| Milestone                  | Target Time |
| -------------------------- | ----------- |
| Acknowledgment of report   | 48 hours    |
| Initial assessment         | 7 days      |
| Fix or mitigation released | 30 days     |

You will receive updates throughout the remediation process. If the
vulnerability is declined (e.g., not reproducible or out of scope), we will
explain why.

## Security Measures

The following security practices are in place for this project:

- **Docker non-root user** — Container images run as an unprivileged user
  (UID 1001), never as root.
- **Trivy scanning in CI** — Container images are scanned for known
  vulnerabilities (HIGH and CRITICAL) in every CI pipeline run. Builds fail
  if critical vulnerabilities are detected.
- **CodeQL analysis** — GitHub CodeQL performs semantic code analysis on
  every pull request and push to detect security vulnerabilities in source
  code.
- **Secret scanning** — GitHub secret scanning is enabled to detect
  accidentally committed credentials (API keys, tokens, etc.).
- **Dependency review** — Pull requests are checked for vulnerable
  dependencies before merge.
- **Least-privilege CI permissions** — GitHub Actions workflows use
  minimal `permissions` declarations (read-only by default).

## Secret Management

- **Never commit `.env` files.** The `.gitignore` file excludes `.env`,
  `.env.local`, `.env.*.local`, `.env.production`, and `.env.development`
  from version control.
- **Use `.env.example` as a template.** Copy it to `.env` and fill in real
  values locally. The example file contains only placeholder values.
- **Rotate exposed secrets immediately.** If a secret is accidentally
  committed or otherwise exposed, treat it as compromised. Generate a new
  value, update all environments, and revoke the old secret.
- **Generate strong secrets.** Use a cryptographically secure method to
  generate secrets:

  ```bash
  # Generate a 256-bit hex secret (recommended for JWT_SECRET)
  openssl rand -hex 32
  ```

- **Do not hardcode secrets in source code.** Read all secrets from
  environment variables at runtime.

