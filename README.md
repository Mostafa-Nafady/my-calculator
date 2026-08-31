# My Calculator

A web-based calculator application featuring multiple calculator variants including basic arithmetic, scientific functions, power operations (XPY), yield calculations (UYT), and more.

## Features

- **Basic Calculator** — Addition, subtraction, multiplication, division
- **XPY Calculator** — X power Y operations
- **UYT Calculator** — Yield calculations
- **ASD Calculator** — Advanced scientific calculations
- **ADDOP Calculator** — Additional operations
- **ASDSFSF Calculator** — Specialized calculations

## Tech Stack

- HTML5
- CSS3 (with responsive design)
- Vanilla JavaScript (ES6+)
- Nginx (production serving)
- Docker (containerization)

## Project Structure

```
my-calculator/
├── index.html              # Home page
├── about.html              # About page
├── asd.html                # ASD Calculator page
├── addop.html              # ADDOP Calculator page
├── ASDSFSF.html            # ASDSFSF Calculator page
├── assets/
│   ├── scripts/            # JavaScript files
│   │   ├── components/      # Reusable components (Header.js)
│   │   ├── home.js
│   │   ├── about.js
│   │   ├── asd.js
│   │   └── addop.js
│   └── styles/             # CSS stylesheets
│       ├── app.css         # Global styles
│       ├── home.css
│       ├── about.css
│       ├── asd.css
│       └── addop.css
├── basics-10-function-refactoring/  # Basic calculator
├── uyt/                    # UYT calculator
├── xpy/                    # XPY calculator
├── Dockerfile              # Container definition
├── docker-compose.yml      # Local development orchestration
├── nginx.conf              # Nginx server configuration
├── package.json            # Project metadata and scripts
└── .github/
    ├── workflows/ci.yml    # CI/CD pipeline
    └── dependabot.yml      # Dependency updates
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ (for development tooling)
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

## CI/CD Pipeline

The project includes a GitHub Actions CI/CD pipeline (`.github/workflows/ci.yml`) that:

1. **Lint** — Runs HTMLHint, Stylelint, and Prettier format checks
2. **Security Scan** — Runs Trivy vulnerability scanner and TruffleHog secret detection
3. **Build & Push** — Builds the Docker image and pushes to GHCR (on push to main only)

Dependency updates are managed by Dependabot (`.github/dependabot.yml`) for npm, Docker, and GitHub Actions.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start local dev server on port 3000 |
| `npm run lint` | Run HTML and CSS linters |
| `npm run lint:fix` | Auto-fix CSS linting issues |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check formatting without modifying files |
| `npm test` | Run tests (placeholder) |
| `npm run build` | Build the project (no-op for static site) |

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Description |
|----------|-------------|
| `JWT_SECRET` | Secret key for signing auth tokens |

## License

MIT

