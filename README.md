# my-calculator

it is a web based calculator

The project originally started with 1 HTML file, 1 styling file, and 2 JS files — `vendor.js` connected the JS to the HTML file and `app.js` was the core JS for the calculator. Since then it has grown to include multiple calculator variants (basic, ASD, XPY, UYT, ARQ, and more), each with its own HTML entry point, styles, and scripts.

## Project Structure

```
my-calculator/
├── index.html              # Home page
├── asd.html                # ASD calculator
├── about.html              # About page
├── arq.html                # ARQ calculator
├── asd-new.html            # ASD calculator (new variant)
├── asdd.html               # ASDD calculator
├── aswd.html               # ASWD calculator
├── cvxz.html               # CVXZ calculator
├── nnn.html                # NNN calculator
├── sdssa.html              # SDSSA calculator
├── assets/
│   ├── styles/             # Shared CSS (app.css, asd.css, about.css, arq.css, …)
│   └── scripts/            # Shared JS (asd.js, home.js, about.js, components/Header.js, …)
├── basics-10-function-refactoring/
│   ├── index.html
│   ├── home.html
│   └── assets/             # Variant-specific styles & scripts
├── xpy/                    # X Power Y calculator
│   ├── index.html
│   └── assets/
├── uyt/                    # U Yield T calculator
│   ├── index.html
│   └── assets/
├── Dockerfile
├── docker-compose.yml
├── package.json
└── .github/workflows/ci.yml
```

## Development

### Prerequisites

- **Node.js 22+** — required for the `serve` and `lint` scripts

### Running locally

```bash
# Install dev dependencies
npm ci

# Start a local dev server on port 3000
npm run serve
```

Then open <http://localhost:3000> in your browser.

Alternatively, you can open `index.html` directly in a browser — no server required.

### Linting & formatting

```bash
# Run all linters (HTML, CSS, JS)
npm run lint

# Auto-format files with Prettier
npm run format
```

## Docker

The Dockerfile uses a **multi-stage build**:

| Stage | Base image | Purpose |
|-------|-----------|---------|
| Builder | `node:20-alpine` | Placeholder for future build/lint/optimization steps |
| Production | `nginx:1.27-alpine` | Serves static files via nginx |

The production stage runs as a **non-root** user, includes `curl` for health checks, and exposes port 80.

### Build & run with Docker

```bash
# Build the image
docker build -t my-calculator .

# Run the container (maps host port 3000 → container port 80)
docker run -p 3000:80 my-calculator
```

Access the app at <http://localhost:3000>.

### Docker Compose

```bash
# Start in detached mode
docker compose up -d

# Stop and remove containers
docker compose down
```

The `docker-compose.yml` also reads environment variables from `.env` (see below) and includes an optional volume mount for live development editing.

## CI/CD

The GitHub Actions pipeline is defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

**Triggers:** push or pull request to `main` or `master`.

**Concurrency:** a concurrency group cancels stale runs on the same branch.

### Jobs

| Job | Description |
|-----|-------------|
| **lint** | Sets up Node.js 22, runs `npm ci`, then `npm run lint` (HTMLHint, Stylelint, ESLint). |
| **security-scan** | Runs **Trivy** filesystem scan (CRITICAL/HIGH severity) and **TruffleHog** secret detection on the full repo history. |
| **docker-build** | Depends on `lint` and `security-scan`. Builds the Docker image with Buildx (targeting the `production` stage), then runs a **Trivy image scan** on the built image. |

## Environment Variables

1. Copy the example file:

   ```bash
   cp .env.example .env
   ```

2. Generate a JWT secret:

   ```bash
   openssl rand -hex 32
   ```

3. Edit `.env` and replace `your_jwt_secret_here` with the generated value.

> **Warning:** Never commit the real `.env` file. It is listed in `.gitignore`.

## License

MIT

