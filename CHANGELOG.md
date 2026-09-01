# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-08-31

### Added

- Comprehensive project documentation: README.md with project overview, setup instructions, scripts reference, Docker deployment, CI/CD pipeline, architecture, and known issues
- Architecture overview document (`docs/architecture.md`) covering page map, shared Header component, asset organization, calculator logic, design system, deployment architecture, and CI/CD flow
- Header component API reference (`docs/components.md`) documenting `createHeader`, `renderHeader`, and `replaceHeader` functions with parameter tables, usage patterns, and per-page navigation configurations
- CI/CD pipeline with GitHub Actions (`.github/workflows/ci.yml`):
  - **Lint job** — HTMLHint + Stylelint + Prettier format check
  - **Security scan job** — Trivy filesystem scan (HIGH, CRITICAL severity) + TruffleHog secret detection
  - **Build & push job** — Docker image build and push to GitHub Container Registry (GHCR) with `:latest` and `:<commit-sha>` tags
  - Concurrency cancellation for in-progress runs on the same ref
- Dependabot configuration (`.github/dependabot.yml`) for weekly updates (Monday 03:00 ET) across npm, Docker, and GitHub Actions ecosystems
- Multi-stage Dockerfile:
  - Builder stage (`node:20-alpine`) — runs `npm ci` for future build tooling support
  - Production stage (`nginx:1.27-alpine`) — serves static files via Nginx with health check
- `docker-compose.yml` for local containerized development (host port 8080 → container port 80, `unless-stopped` restart policy, health check)
- `nginx.conf` with:
  - Gzip compression for text, CSS, JavaScript, SVG, and font files
  - Static asset caching (1 year, `immutable` cache-control header)
  - HTML no-cache headers (`no-cache, no-store, must-revalidate`)
  - SPA fallback via `try_files $uri $uri/ /index.html`
- `.env.example` environment variable template with `JWT_SECRET` placeholder
- `.gitignore` for Node.js dependencies, environment files, build output, logs, editor files, and OS files
- `.dockerignore` to exclude `node_modules/`, `.git/`, `.env`, `*.md`, `Dockerfile`, `docker-compose.yml`, `.github/`, and other non-production files from Docker builds
- Project foundation in `package.json`:
  - Scripts: `start`, `dev`, `lint`, `lint:fix`, `format`, `format:check`, `test`, `build`
  - Dev dependencies: `htmlhint`, `prettier`, `serve`, `stylelint`, `stylelint-config-standard`
- ASD Calculator page (`asd.html`) with feature cards, how-to steps, and call-to-action section
- ASD page styling (`assets/styles/asd.css`) with responsive grid layout, feature cards with hover effects, and numbered step counter design
- UYT Calculator link added to ASD page navigation

### Changed

- Updated ASD page content and structure with feature cards, how-to steps, and CTA section
- Enhanced ASD page styling with responsive grid layout, feature cards, and step counter design
- Updated ASD script navigation to include UYT Calculator link

### Notes

- Initial project imported from GitHub with multiple calculator variants:
  - **Basic Calculator** (`basics-10-function-refactoring/`) — addition, subtraction, multiplication, division with running results and operation logging
  - **XPY Calculator** (`xpy/`) — X raised to the power of Y using `Math.pow()`
  - **UYT Calculator** (`uyt/`) — U multiplied by Y, divided by T with divide-by-zero protection
  - **ASD Calculator** (`asd.html`) — advanced scientific calculator landing page
  - **ADDOP Calculator** (`addop.html`) — additional operations landing page
  - **ASDSFSF Calculator** (`ASDSFSF.html`) — specialized calculations landing page
- Basic calculator refactored with function-based architecture in `basics-10-function-refactoring/` using `vendor.js` (DOM references) and `app.js` (calculation logic)
- Shared `Header.js` component provides reusable navigation across all pages with `createHeader`, `renderHeader`, and `replaceHeader` functions

