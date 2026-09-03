# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue in this project, please report it responsibly.

### How to Report

1. **Email**: Send details to **security@example.com**
2. **Do NOT** open a public GitHub issue for security vulnerabilities.
3. Include the following in your report:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

| Milestone                          | Target              |
|------------------------------------|---------------------|
| Initial acknowledgment             | Within 48 hours     |
| Preliminary assessment             | Within 5 business days |
| Fix or mitigation provided         | Within 30 days      |
| Public disclosure (if applicable)  | Within 90 days of report |

### Disclosure Policy

- We follow a **90-day responsible disclosure** timeline.
- We will coordinate with you on the public disclosure date.
- We may request an extension if the fix requires significant changes.
- We will credit reporters in release notes unless anonymity is requested.

## Scope

The following are **in scope** for vulnerability reports:

- **Application code**: HTML, JavaScript, and CSS files in the repository
- **Infrastructure configuration**: Dockerfile, docker-compose.yml, CI/CD pipeline definitions
- **Docker images**: Base images and build configurations used by the project
- **CI/CD pipeline**: GitHub Actions workflows and related configuration
- **Dependency management**: Dependabot, CodeQL, Trivy, and Snyk configurations

The following are **out of scope**:

- Vulnerabilities in third-party services not controlled by this project
- Social engineering attacks
- Physical security attacks
- Denial of Service (DoS) attacks against the hosted site
- Reports from automated scanners without manual verification

## Security Measures

This project implements the following security measures:

### Dependency & Supply Chain Security

| Tool         | Purpose                                      | Configuration File            |
|--------------|----------------------------------------------|-------------------------------|
| **Dependabot** | Automated dependency updates for npm, Docker, and GitHub Actions | `.github/dependabot.yml`      |
| **CodeQL**   | Semantic code analysis for JavaScript        | `.github/codeql-config.yml`   |
| **Trivy**    | Container image and filesystem vulnerability scanning | `.trivyignore`                |
| **Snyk**     | Dependency and container vulnerability monitoring | `.snyk`                       |

### Secret Management

- **`.gitignore`**: Prevents secrets (`.env`, API keys, credentials) from being committed to the repository.
- **`.env.example`**: Provides a template for environment variables without exposing real values.
- **`.env`**: Local environment file excluded from version control.

### CI/CD Security

- GitHub Actions workflows run security scans on every pull request.
- Docker images are scanned before deployment.
- CodeQL analysis runs on push and pull request events.

## Contact

For security-related questions or to report a vulnerability:

- **Email**: security@example.com
- **Response Time**: Within 48 hours

For general questions or bug reports (non-security), please open a GitHub issue.

---

_This security policy is reviewed and updated regularly. Last updated: 2026-09-03._

