# my-calculator

A web-based calculator application with multiple calculator variants and a product landing page. Built with vanilla HTML, CSS, and JavaScript — no build tools or frameworks required.

## Features

- **Basic Calculator** — addition, subtraction, multiplication, and division
- **XPY Calculator** — X Power Y exponentiation
- **UYT Calculator** — U Yield T calculations
- **ASD Calculator** — specialized calculator variant
- **QWE Calculator** — specialized calculator variant
- **APC Product Landing Page** — product showcase and landing page

## Project Structure

```
my-calculator/
├── index.html              # Home page
├── about.html              # About page
├── apc.html                # APC product landing page
├── asd.html                # ASD calculator
├── cvxz.html               # CVXZ calculator
├── nnn.html                # NNN calculator
├── qwe.html                # QWE calculator
├── sdssa.html              # SDSSA calculator
├── assets/
│   ├── styles/             # CSS stylesheets
│   └── scripts/            # JavaScript files
│       └── components/     # Reusable components (Header.js)
├── basics-10-function-refactoring/  # Basic calculator
├── uyt/                    # UYT calculator
├── xpy/                    # XPY calculator
├── Dockerfile              # Container definition
├── docker-compose.yml      # Docker Compose configuration
├── nginx.conf              # Nginx server configuration
└── .github/workflows/      # CI/CD pipelines
```

## Getting Started

There are two ways to run this project locally:

### Option 1: Open Directly in a Browser

Simply open `index.html` in your preferred web browser. No server or build step is required.

### Option 2: Using Docker

See the [Docker](#docker) section below for containerized deployment instructions.

## Docker

The project includes a `Dockerfile` and `docker-compose.yml` for containerized deployment using Nginx as the web server.

### Build the Image

```bash
docker build -t my-calculator .
```

### Run the Container

```bash
docker run -p 8080:80 my-calculator
```

### Or Using Docker Compose

```bash
docker compose up -d
```

### Access the Application

Once the container is running, open your browser and navigate to:

```
http://localhost:8080
```

### Stop the Container

If using Docker Compose:

```bash
docker compose down
```

If using `docker run`:

```bash
docker stop <container-id>
```

> **Security Note:** The Docker container runs as a non-root user with a read-only root filesystem for enhanced security.

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment. The workflow is defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

### Lint & Validate

- Runs on every push and pull request to the `main` branch
- Validates HTML files for proper structure (DOCTYPE, `html`, `head`, `body` tags)
- Checks the `Dockerfile` and `docker-compose.yml` for validity

### Security Scan

- Runs Trivy filesystem and configuration scans in parallel
- Results are uploaded to the GitHub Security tab as SARIF reports

### Build & Push

- Runs only on pushes to `main` (after lint and security-scan jobs pass)
- Builds the Docker image and pushes it to GitHub Container Registry (`ghcr.io`)
- Images are tagged with both `latest` and the commit SHA
- A Trivy image scan runs after the push to verify the published image

### Concurrency Control

- Outdated pipeline runs are automatically cancelled when a newer commit is pushed, conserving CI resources.

## Security

The project follows several security best practices:

- **Vulnerability Disclosure** — See [SECURITY.md](SECURITY.md) for the full vulnerability disclosure policy and reporting instructions.
- **Container Security** — The Docker container runs as a non-root user with a read-only root filesystem.
- **CI/CD Scanning** — Trivy vulnerability scanning is integrated into the CI/CD pipeline, covering filesystem, configuration, and Docker image scans.
- **Secret Management** — `.env` files are gitignored; secrets are never committed to the repository.
- **Nginx Security Headers** — The Nginx configuration includes the following security headers:
  - `X-Frame-Options` — prevents clickjacking
  - `X-Content-Type-Options` — prevents MIME-type sniffing
  - `X-XSS-Protection` — enables cross-site scripting filtering
  - `Referrer-Policy` — controls referrer information leakage
- **Dependabot** — GitHub Dependabot is enabled for automated dependency updates.

## License

No license specified. Contact the maintainer for licensing information.

