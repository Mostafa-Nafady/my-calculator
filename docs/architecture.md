# Architecture Overview

This document describes the architecture of the My Calculator project — a static, vanilla HTML/CSS/JS multi-page website with no build step and no backend server.

## Overview

My Calculator is a **static multi-page website**. There is:

- **No SPA framework** — no React, Vue, or Angular
- **No build tool** — no Webpack, Vite, or Babel; files are served as-is
- **No backend server** — no Node.js, Express, or database; purely client-side

Each calculator variant is a self-contained HTML page with its own CSS and JS. The production runtime is **Nginx** serving static files from a **Docker** container.

## Page Map

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Landing page with links to all calculator variants |
| About | `about.html` | Project description and feature highlights |
| ASD Calculator | `asd.html` | Advanced scientific calculator landing page (feature cards, how-to steps, CTA) |
| ADDOP Calculator | `addop.html` | Additional operations landing page |
| ASDSFSF Calculator | `ASDSFSF.html` | Specialized calculations landing page |
| Basic Calculator | `basics-10-function-refactoring/index.html` | Functional calculator (+, -, *, /) with running results |
| Basic Sub-Home | `basics-10-function-refactoring/home.html` | Alternate home page for the basic calculator sub-site |
| XPY Calculator | `xpy/index.html` | Functional X power Y calculator |
| UYT Calculator | `uyt/index.html` | Functional (U × Y) ÷ T calculator |

## Shared Header Component

All pages use a reusable header component located at `assets/scripts/components/Header.js` (a copy also exists at `basics-10-function-refactoring/assets/scripts/components/Header.js`).

The component provides three functions:

| Function | Signature | Description |
|----------|-----------|-------------|
| `createHeader` | `(title, navLinks = [])` | Creates and returns a `<header>` DOM element |
| `renderHeader` | `(containerId, title, navLinks = [])` | Appends a header into a container by ID |
| `replaceHeader` | `(title, navLinks = [])` | Replaces existing `<header>` or prepends to `<body>` |

The `navLinks` parameter is an array of `{ label: string, href: string }` objects.

### Integration Pattern

Each page follows this pattern:

1. Includes a `<div id="header-container"></div>` placeholder in the HTML
2. Includes `Header.js` via `<script src="..." defer></script>`
3. Includes a page-specific script (e.g., `home.js`) via `<script src="..." defer></script>`
4. The page script calls `renderHeader()` (or `replaceHeader()`) on `DOMContentLoaded`

Example from `assets/scripts/home.js`:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'Welcome to My Calculator', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'ASD', href: 'asd.html' },
      { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' }
    ]);
  }
});
```

Each page configures its own navigation links, so the header is customized per page while sharing the same component code.

## Asset Organization

The project uses a **two-tier asset structure**:

### Root-Level Assets (`assets/`)

Shared across top-level pages (index, about, asd, addop, ASDSFSF):

- `assets/scripts/components/Header.js` — shared header component
- `assets/scripts/home.js` — home page header initialization
- `assets/scripts/about.js` — about page header initialization
- `assets/scripts/asd.js` — ASD page header initialization
- `assets/scripts/addop.js` — ADDOP page header initialization
- `assets/styles/app.css` — global design system (colors, fonts, layout primitives)
- `assets/styles/home.css` — home page styles
- `assets/styles/about.css` — about page styles
- `assets/styles/asd.css` — ASD page styles
- `assets/styles/addop.css` — ADDOP page styles

### Sub-Site Assets

Each calculator sub-directory has its own self-contained `assets/` folder:

- **`basics-10-function-refactoring/assets/`** — `app.js` (calculator logic), `vendor.js` (DOM refs), `home.js` (sub-home header init), `components/Header.js` (header copy), `styles/app.css`, `styles/home.css`
- **`xpy/assets/`** — `scripts/xpy.js` (XPY logic), `styles/xpy.css`
- **`uyt/assets/`** — `scripts/uyt.js` (UYT logic), `styles/uyt.css`

Sub-site pages reference root assets with relative paths:

```html
<link rel="stylesheet" href="../assets/styles/app.css" />
<script src="../assets/scripts/components/Header.js" defer></script>
```

## Calculator Logic

Three of the calculator variants are fully functional. The other three (ASD, ADDOP, ASDSFSF) are landing/informational pages.

### Basic Calculator

**Files:** `basics-10-function-refactoring/assets/scripts/vendor.js` + `app.js`

`vendor.js` defines DOM element references and an output helper:

```javascript
const userInput = document.getElementById('input-number');
const addBtn = document.getElementById('btn-add');
const subtractBtn = document.getElementById('btn-subtract');
const multiplyBtn = document.getElementById('btn-multiply');
const divideBtn = document.getElementById('btn-divide');
const currentResultOutput = document.getElementById('current-result');
const currentCalculationOutput = document.getElementById('current-calculation');

function outputResult(result, text) {
  currentResultOutput.textContent = result;
  currentCalculationOutput.textContent = text;
}
```

`app.js` contains the calculation logic:

| Function | Description |
|----------|-------------|
| `calculation(type)` | Main dispatch function — handles `ADD`, `SUBT`, `MULTI`, `DIVID` |
| `writeLog(operation, result)` | Pushes log entry objects to the `logEntry` array |
| `calculationDescrip(str1, str2, str3)` | Builds a calculation description string |
| `grtUserInput()` | Reads the input value (note: typo in function name) |
| `output()` | Calls `outputResult()` and logs the entry array |

Key behaviors:
- Uses `parseInt()` for number parsing (truncates decimal inputs)
- Maintains a running result across operations (`currentResult` variable)
- Logs each operation as an object with `operation`, `result`, and `operand` fields
- Event listeners on `addBtn`, `subtractBtn`, `multiplyBtn`, `divideBtn`

### XPY Calculator

**File:** `xpy/assets/scripts/xpy.js`

| Function | Description |
|----------|-------------|
| `calculateXPY(base, exponent)` | Returns `Math.pow(base, exponent)` |
| `updateCalculationDisplay(base, exponent, result)` | Updates the calculation and result text |
| `handleCalculate()` | Validates inputs with `parseFloat()` + `isNaN()`, calls `calculateXPY` |
| `handleClear()` | Resets inputs and display to defaults |

Key behaviors:
- Input validation with `parseFloat()` and `isNaN()` check
- Enter key triggers calculation (keypress listener on both inputs)
- JSDoc documented

### UYT Calculator

**File:** `uyt/assets/scripts/uyt.js`

| Function | Description |
|----------|-------------|
| `calculateUYT(u, y, t)` | Computes `(u * y) / t`; throws `Error` if `t === 0` |
| `updateCalculationDisplay(u, y, t, result)` | Updates the calculation and result text |
| `handleCalculate()` | Validates inputs, checks for `t=0`, calls `calculateUYT` with try/catch |
| `handleClear()` | Resets inputs and display to defaults |

Key behaviors:
- Divide-by-zero protection (both in `calculateUYT` and `handleCalculate`)
- Input validation with `parseFloat()` and `isNaN()` check
- Enter key triggers calculation (keypress listener on all three inputs)
- JSDoc documented

## Design System

The visual design system is defined in `assets/styles/app.css`:

| Property | Value |
|----------|-------|
| Primary color | `#023d6d` (dark blue) |
| Hover color | `#084f88` |
| Font | Roboto (loaded from Google Fonts) |
| Card layout | Bordered, `border-radius: 10px`, centered, `max-width: 40rem` |
| Button border-radius | `5px` |
| Transitions | `0.2s` on background and border-color |

### Accent Colors by Calculator

| Calculator | Accent Color |
|------------|-------------|
| Basic | `#023d6d` (primary blue) |
| XPY | `#28a745` (green) |
| UYT | `#fd7e14` (orange) |
| ASD | `#6f42c1` (purple) |

## Deployment Architecture

### Docker Multi-Stage Build

The `Dockerfile` uses two stages:

| Stage | Base Image | Purpose |
|-------|-----------|---------|
| Builder | `node:20-alpine` | Runs `npm ci` (for future build tooling support) |
| Production | `nginx:1.27-alpine` | Serves static files via Nginx |

The production stage:
1. Copies `nginx.conf` to `/etc/nginx/conf.d/default.conf`
2. Copies all HTML files, `assets/`, and sub-directories into `/usr/share/nginx/html/`
3. Exposes port 80
4. Health check: `wget --spider -q http://localhost:80/`
5. Runs `nginx -g "daemon off;"`

### Nginx Configuration

The `nginx.conf` file configures:

- **Root:** `/usr/share/nginx/html`
- **Index:** `index.html`
- **Gzip:** Enabled for `text/plain`, `text/css`, `application/javascript`, `text/xml`, `application/xml`, `image/svg+xml` (min length: 256 bytes)
- **Static asset caching:** CSS, JS, images, fonts — `expires 1y` with `Cache-Control: public, immutable`
- **HTML caching:** `Cache-Control: no-cache, no-store, must-revalidate`
- **SPA fallback:** `try_files $uri $uri/ /index.html`

### docker-compose.yml

| Property | Value |
|----------|-------|
| Container name | `my-calculator` |
| Port mapping | `8080:80` (host:container) |
| Restart policy | `unless-stopped` |
| Health check | `wget --spider -q http://localhost:80/` (30s interval, 3s timeout, 3 retries) |
| Env file | `.env` |

## CI/CD Flow

The GitHub Actions pipeline (`.github/workflows/ci.yml`) runs on push and PR to `main`:

```
Push/PR to main
       │
       ├──► Job 1: Lint (parallel)
       │    ├── npm ci
       │    ├── npm run lint (HTMLHint + Stylelint)
       │    └── npm run format:check (Prettier)
       │
       ├──► Job 2: Security Scan (parallel)
       │    ├── Trivy filesystem scan (HIGH, CRITICAL)
       │    └── TruffleHog secret detection
       │
       └──► Job 3: Build & Push (after Jobs 1 + 2 pass)
            ├── Docker Buildx setup
            ├── Login to GHCR
            └── Build & push image
                 (push only on push events, not PRs)
                 Tags: :latest and :<commit-sha>
```

**Concurrency:** In-progress runs on the same ref are automatically cancelled (`cancel-in-progress: true`).

**Dependabot:** Weekly updates (Monday 03:00 ET) for npm, Docker, and GitHub Actions ecosystems.

