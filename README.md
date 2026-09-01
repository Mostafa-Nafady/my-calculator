# My Calculator

A web-based calculator application featuring multiple calculator variants including basic arithmetic, scientific functions, power operations (XPY), yield calculations (UYT), and more. Built as a static site with vanilla HTML, CSS, and JavaScript — no framework, no build step, no backend.

## Features

- **Basic Calculator** — Addition, subtraction, multiplication, division with running results and operation logging
- **XPY Calculator** — X raised to the power of Y using `Math.pow()`
- **UYT Calculator** — U multiplied by Y, divided by T with divide-by-zero protection
- **ASD Calculator** — Advanced scientific calculator landing page with feature cards and how-to guide
- **ADDOP Calculator** — Additional operations landing page
- **ASDSFSF Calculator** — Specialized calculations landing page

## Tech Stack

- HTML5
- CSS3 (with responsive design)
- Vanilla JavaScript (ES6+)
- Nginx 1.27 (production serving)
- Docker (containerization with multi-stage build)
- GitHub Actions (CI/CD)

## Project Structure

```
my-calculator/
├── index.html                    # Home page
├── about.html                    # About page
├── asd.html                      # ASD Calculator page
├── addop.html                    # ADDOP Calculator page
├── ASDSFSF.html                  # ASDSFSF Calculator page
├── assets/
│   ├── scripts/
│   │   ├── components/
│   │   │   └── Header.js         # Reusable header component
│   │   ├── home.js               # Home page header init
│   │   ├── about.js              # About page header init
│   │   ├── asd.js                # ASD page header init
│   │   └── addop.js              # ADDOP page header init
│   └── styles/
│       ├── app.css               # Global styles
│       ├── home.css              # Home page styles
│       ├── about.css             # About page styles
│       ├── asd.css               # ASD page styles
│       └── addop.css             # ADDOP page styles
├── basics-10-function-refactoring/
│   ├── index.html                # Basic calculator page
│   ├── home.html                 # Basic calculator sub-home
│   └── assets/
│       ├── scripts/
│       │   ├── app.js            # Calculator logic
│       │   ├── vendor.js         # DOM refs & outputResult()
│       │   ├── home.js           # Sub-home header init
│       │   └── components/
│       │       └── Header.js     # Header component (copy)
│       └── styles/
│           ├── app.css           # Calculator styles
│           └── home.css          # Sub-home styles
├── xpy/
│   ├── index.html                # XPY calculator page
│   └── assets/
│       ├── scripts/
│       │   └── xpy.js            # XPY calculator logic
│       └── styles/
│           └── xpy.css           # XPY styles
├── uyt/
│   ├── index.html                # UYT calculator page
│   └── assets/
│       ├── scripts/
│       │   └── uyt.js            # UYT calculator logic
│       └── styles/
│           └── uyt.css           # UYT styles
├── .github/
│   ├── workflows/
│   │   └── ci.yml                # CI/CD pipeline
│   └── dependabot.yml            # Dependency updates
├── Dockerfile                    # Multi-stage Docker build
├── docker-compose.yml            # Local Docker orchestration
├── nginx.conf                    # Nginx server configuration
├── .env.example                  # Environment variable template
├── .gitignore
├── .dockerignore
├── package.json                  # Project metadata & scripts
└── package-lock.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ (for development tooling only — linting, formatting, serving)
- [Docker](https://www.docker.com/) (for containerized deployment)

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd my-calculator
   ```

2. Install development dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The site will be available at http://localhost:3000

> **Note:** Since this is a static site, you can also open `index.html` directly in a browser without any server.

### Docker

Build and run the containerized application:

```bash
# Build and start
docker compose up -d --build

# View logs
docker compose logs -f

# Stop
docker compose down
```

The application will be available at http://localhost:8080

### Production Deployment

The Docker image is automatically built and pushed to GitHub Container Registry (GHCR) on every push to the `main` branch.

```bash
# Pull the latest image
docker pull ghcr.io/<owner>/my-calculator:latest

# Run in production
docker run -d -p 80:80 --name calculator --restart unless-stopped ghcr.io/<owner>/my-calculator:latest
```

Images are tagged with both `:latest` and `:<commit-sha>`.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start local dev server on port 3000 (`npx serve . -l 3000`) |
| `npm run dev` | Alias for `npm start` |
| `npm run lint` | Run HTMLHint and Stylelint on all HTML and CSS files |
| `npm run lint:fix` | Auto-fix CSS linting issues with Stylelint |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check formatting without modifying files |
| `npm test` | Run tests (placeholder — no tests configured) |
| `npm run build` | Build the project (no-op — static site requires no build) |

## Architecture

This is a **static multi-page website** — no SPA framework, no build step, no backend server. Each calculator variant is a self-contained HTML page with its own CSS and JS.

### Shared Header Component

All pages use a reusable header component (`assets/scripts/components/Header.js`) that provides:

| Function | Description |
|----------|-------------|
| `createHeader(title, navLinks)` | Creates and returns a `<header>` DOM element |
| `renderHeader(containerId, title, navLinks)` | Renders header into a container by ID |
| `replaceHeader(title, navLinks)` | Replaces existing `<header>` or prepends to `<body>` |

The `navLinks` parameter is an array of `{ label: string, href: string }` objects. Each page calls `renderHeader()` or `replaceHeader()` on `DOMContentLoaded` to initialize its header with page-specific navigation.

### Design System

Global styles in `assets/styles/app.css` define the visual design system:

- **Primary color:** `#023d6d` (dark blue)
- **Hover color:** `#084f88`
- **Font:** Roboto (loaded from Google Fonts)
- **Layout:** Card-based, bordered, rounded corners (10px), centered, max-width 40rem
- **Accent colors:** XPY (green `#28a745`), UYT (orange `#fd7e14`), ASD (purple `#6f42c1`)

### Asset Organization

The project uses a two-tier asset structure:

- **Root-level assets** (`assets/`): Shared across top-level pages (index, about, asd, addop, ASDSFSF)
- **Sub-site assets**: Each calculator sub-directory (`basics-10-function-refactoring/`, `xpy/`, `uyt/`) has its own self-contained `assets/` folder with page-specific scripts and styles

Sub-site pages reference root assets with relative paths (e.g., `../assets/styles/app.css`).

## Docker & Nginx

### Dockerfile

The project uses a multi-stage Docker build:

| Stage | Base Image | Purpose |
|-------|-----------|---------|
| Builder | `node:20-alpine` | Runs `npm ci` (for future build tooling support) |
| Production | `nginx:1.27-alpine` | Serves static files via Nginx |

The production stage copies `nginx.conf` and all static content into the Nginx document root, exposes port 80, and includes a health check via `wget --spider`.

### Nginx Configuration

The `nginx.conf` file configures:

- **Static file serving** from `/usr/share/nginx/html`
- **Gzip compression** for text, CSS, JavaScript, SVG, and font files
- **Static asset caching** — CSS, JS, images, and fonts cached for 1 year with `immutable` cache-control header
- **HTML no-cache** — HTML files served with `no-cache, no-store, must-revalidate`
- **SPA fallback** — `try_files $uri $uri/ /index.html`

### docker-compose.yml

Maps host port **8080** to container port **80**, with `unless-stopped` restart policy and a health check.

## CI/CD Pipeline

The project includes a GitHub Actions CI/CD pipeline (`.github/workflows/ci.yml`) with three jobs:

### 1. Lint (parallel)
- Checkout → setup Node.js 20 → `npm ci`
- Runs HTMLHint + Stylelint (`npm run lint`)
- Checks formatting with Prettier (`npm run format:check`)

### 2. Security Scan (parallel)
- **Trivy** filesystem scan (HIGH and CRITICAL severity, fails on findings)
- **TruffleHog** secret detection

### 3. Build & Push (after lint + security-scan pass)
- Sets up Docker Buildx
- Logs in to GitHub Container Registry
- Builds and pushes Docker image (pushes only on push events, not PRs)
- Tags: `ghcr.io/<repository>:latest` and `ghcr.io/<repository>:<commit-sha>`
- Uses GitHub Actions cache for layer caching

**Concurrency:** In-progress runs on the same ref are automatically cancelled.

### Dependabot

Dependency updates are managed by Dependabot (`.github/dependabot.yml`):

| Ecosystem | Schedule |
|-----------|----------|
| npm | Weekly (Monday 03:00 ET) |
| Docker | Weekly (Monday 03:00 ET) |
| GitHub Actions | Weekly (Monday 03:00 ET) |

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Description |
|----------|-------------|
| `JWT_SECRET` | Secret key for signing auth tokens (placeholder for future use — current static site does not use it) |

Generate a new secret with:
```bash
openssl rand -hex 32
```

## Known Issues

- **Missing `asdsfsf.js` and `asdsfsf.css`** — `ASDSFSF.html` references `assets/scripts/asdsfsf.js` and `assets/styles/asdsfsf.css`, but neither file exists in the repository.
- **Function name typo** — `basics-10-function-refactoring/assets/scripts/app.js` defines `grtUserInput()` instead of `getUserInput()`.
- **Decimal truncation** — The basic calculator uses `parseInt()` for number parsing, which truncates decimal inputs.
- **No tests** — `npm test` is a placeholder that always exits successfully.

## Contributing

1. Fork the repository and create a feature branch
2. Run linters before submitting a PR:
   ```bash
   npm run lint
   npm run format:check
   ```
3. Follow the existing code style (enforced by Prettier)
4. Ensure the Docker build succeeds:
   ```bash
   docker compose up -d --build
   ```
5. Submit a pull request to the `main` branch

## License

MIT


