# My Calculator

A web-based calculator application featuring multiple calculator variants (basic arithmetic, XPY, UYT, ASD, ARQ, ASDD, AQE, and more). Built with vanilla HTML, CSS, and JavaScript — no build step required.

## Features

- **Multiple calculator types** available from the home page:
  - Basic arithmetic
  - XPY
  - UYT
  - ASD
  - ASD New
  - ARQ
  - ASWD
  - ASDD
  - AQE
- **Component-based architecture** with a reusable `Header` component shared across pages
- **No build step** — open any HTML file directly in a browser or serve statically
- **Containerized deployment** with Docker and Docker Compose
- **CI/CD pipeline** with HTML validation, Docker builds, and security scanning

## Project Structure

```
my-calculator/
├── index.html              # Home page with calculator links
├── about.html              # About page
├── aqe.html                # AQE calculator
├── arq.html                # ARQ calculator
├── asd.html                # ASD calculator
├── asd-new.html            # ASD New calculator
├── asdd.html               # ASDD calculator
├── aswd.html               # ASWD calculator
├── cvxz.html               # CVXZ calculator
├── nnn.html                # NNN calculator
├── sdssa.html              # SDSSA calculator
├── assets/
│   ├── scripts/            # JavaScript files for each page
│   │   └── components/     # Reusable components (Header.js)
│   └── styles/             # CSS files for each page
├── basics-10-function-refactoring/  # Refactored calculator variant
├── uyt/                    # UYT calculator
├── xpy/                    # XPY calculator
├── Dockerfile              # Container definition
├── docker-compose.yml      # Local development orchestration
├── .dockerignore           # Build context exclusions
├── .github/
│   └── workflows/
│       ├── ci.yml          # CI/CD pipeline
│       └── dependabot.yml  # Dependency update automation
└── .env.example            # Environment variable template
```

## Getting Started

### Prerequisites

- **Docker** and **Docker Compose** (for containerized deployment)
- Any modern web browser (for local development without Docker)

### Local Development (without Docker)

Simply open `index.html` in a web browser, or serve the project with any static file server:

```bash
# Option 1: Python's built-in HTTP server
python3 -m http.server 8080

# Option 2: npx serve
npx serve .
```

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

### Docker Deployment

Build and run with Docker Compose:

```bash
docker compose up -d --build
```

Access the application at [http://localhost:8080](http://localhost:8080).

To stop the container:

```bash
docker compose down
```

### Docker (standalone)

Build the image:

```bash
docker build -t my-calculator .
```

Run the container:

```bash
docker run -p 8080:80 my-calculator
```

Access the application at [http://localhost:8080](http://localhost:8080).

## CI/CD

The project uses a GitHub Actions pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). The pipeline triggers on pushes to `main` and on pull requests.

### Pipeline Stages

1. **HTML Validation** — Validates all HTML files using [html5validator](https://github.com/svenkreiss/html5validator) to ensure standards compliance.
2. **Docker Build** — Builds the Docker image and runs [Trivy](https://github.com/aquasecurity/trivy) vulnerability scans on both the built image and the source code.
3. **Push & Deploy** — On merge to `main`, pushes the Docker image to the [GitHub Container Registry (GHCR)](https://ghcr.io) for deployment.

## Security

- **Environment variables** are managed via a `.env` file, which is never committed to the repository (see [`.gitignore`](.gitignore)).
- Use [`.env.example`](.env.example) as a template for the required variables — copy it to `.env` and fill in your values.
- **Trivy scans** run in CI on every push and pull request to detect known vulnerabilities in both the Docker image and the source code.
- **Dependabot** monitors GitHub Actions and Docker base images for security updates and new versions, automatically opening pull requests when updates are available.

## License

MIT License (or TBD — update this section once a license file is added to the repository).

