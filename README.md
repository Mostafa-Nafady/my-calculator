# My Calculator

A lightweight, browser-based calculator suite built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step.

## Features

- **Basic Calculator** — 4-function arithmetic (+, -, ×, ÷) — [basics-10-function-refactoring/index.html](basics-10-function-refactoring/index.html)
- **XPY Calculator** — X raised to the power of Y (X^Y) — [xpy/index.html](xpy/index.html)
- **UYT Calculator** — U multiplied by Y, divided by T ((U×Y)÷T) — [uyt/index.html](uyt/index.html)
- **ASD Calculator** — informational page — [asd.html](asd.html)
- **QWE Calculator** — informational page — [qwe.html](qwe.html)
- **CVXZ Calculator** — informational page — [cvxz.html](cvxz.html)
- **NNN Calculator** — informational page — [nnn.html](nnn.html)
- **SDSSA Calculator** — statistical data analysis (informational) — [sdssa.html](sdssa.html)
- **Gallery page** — browse all calculators in one place — [gallery.html](gallery.html)
- **About page** — project overview — [about.html](about.html)
- **About (ASx) page** — secondary about page — [asx.html](asx.html)

## Quick Start

There is no build step — the project is entirely static. Choose either option below.

**Option A — Open the file directly:**

```bash
# Simply open index.html in your default browser
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

**Option B — Serve locally (recommended for correct relative paths):**

```bash
# From the project root, start a simple HTTP server
python3 -m http.server 8000

# Then open your browser to:
# http://localhost:8000
```

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | index.html | Landing page with links to all calculators |
| About | about.html | Project overview and description |
| About (ASx) | asx.html | Secondary about page |
| Gallery | gallery.html | Browse all calculators with interactive cards |
| ASD Calculator | asd.html | Informational page for ASD calculator |
| QWE Calculator | qwe.html | Informational page for QWE calculator |
| CVXZ Calculator | cvxz.html | Informational page for CVXZ calculator |
| NNN Calculator | nnn.html | Informational page for NNN calculator |
| SDSSA Calculator | sdssa.html | Informational page for SDSSA calculator |
| Basic Calculator | basics-10-function-refactoring/index.html | 4-function calculator (+, -, ×, ÷) |
| XPY Calculator | xpy/index.html | X raised to the power of Y |
| UYT Calculator | uyt/index.html | U multiplied by Y, divided by T |

## Project Structure

```
my-calculator/
├── index.html              # Landing page with links to all calculators
├── about.html              # About page
├── asx.html                # About (ASx) page
├── gallery.html            # Gallery of all calculators
├── asd.html                # ASD calculator page (informational)
├── qwe.html                # QWE calculator page (informational)
├── cvxz.html               # CVXZ calculator page (informational)
├── nnn.html                # NNN calculator page (informational)
├── sdssa.html              # SDSSA calculator page (informational)
├── assets/
│   ├── styles/             # Shared (app.css) and page-specific CSS
│   │   ├── app.css         # Global styles
│   │   ├── home.css
│   │   ├── about.css
│   │   ├── asx.css
│   │   ├── gallery.css
│   │   ├── asd.css
│   │   ├── qwe.css
│   │   ├── cvxz.css
│   │   ├── nnn.css
│   │   └── sdssa.css
│   └── scripts/            # Page scripts and shared components
│       ├── home.js
│       ├── about.js
│       ├── asx.js
│       ├── gallery.js
│       ├── asd.js
│       ├── qwe.js
│       ├── cvxz.js
│       ├── nnn.js
│       ├── sdssa.js
│       └── components/
│           └── Header.js   # Reusable header component
├── basics-10-function-refactoring/  # Basic 4-function calculator
│   ├── index.html
│   └── assets/
│       ├── styles/
│       │   ├── app.css     # Local copy of global styles
│       │   └── home.css
│       └── scripts/
│           ├── app.js      # Core calculator logic
│           ├── vendor.js   # DOM element references & output helper
│           ├── home.js
│           └── components/
│               └── Header.js
├── xpy/                   # XPY (X^Y) calculator
│   ├── index.html
│   └── assets/
│       ├── styles/xpy.css
│       └── scripts/xpy.js
└── uyt/                   # UYT (U×Y÷T) calculator
    ├── index.html
    └── assets/
        ├── styles/uyt.css
        └── scripts/uyt.js
```

## Architecture

The project follows a straightforward three-layer pattern:

1. **HTML structure** — each page is a standalone `.html` file defining the document layout and content sections.
2. **CSS styling** — a shared `app.css` provides global styles (typography, layout, colors), complemented by page-specific stylesheets (e.g., `home.css`, `gallery.css`, `xpy.css`).
3. **JavaScript behavior** — page-specific scripts handle interactivity, while a shared `Header.js` component renders the navigation bar.

All `<script>` tags use the `defer` attribute and load in a specific order: `Header.js` first (so the navigation bar is available), then the page-specific script. The `Header.js` component is a vanilla JS module that dynamically renders the navigation bar into a `#header-container` div present on every page.

The `Header.js` component exposes three functions:

- **`createHeader(title, navLinks)`** — creates a header `<header>` element with a title and optional navigation links.
- **`renderHeader(containerId, title, navLinks)`** — finds a container by its ID and appends the header element to it.
- **`replaceHeader(title, navLinks)`** — replaces an existing `<header>` element (or inserts at the top of `<body>` if none exists).

For a deeper dive, see [docs/architecture.md](docs/architecture.md).

## Technologies

- **HTML5** — semantic page structure
- **CSS3** — styling and responsive layout
- **Vanilla JavaScript (ES6+)** — all interactivity, no libraries
- **Google Fonts (Roboto)** — typography

No frameworks, no dependencies, no build tools.

## Adding a New Calculator

1. **Create an HTML file** in the project root (or a subdirectory for self-contained calculators). Include the standard structure:
   - A `<div id="header-container"></div>` for the shared header
   - A `<section>` for the calculator inputs and actions
   - A `<section id="results">` for displaying output
2. **Add a page-specific CSS file** in `assets/styles/` (or the subdirectory's own `assets/styles/`).
3. **Add a page-specific JS file** in `assets/scripts/` (or the subdirectory's own `assets/scripts/`). The script should call `renderHeader('header-container', 'Page Title')` to render the navigation bar.
4. **Link the new page** from `index.html` and `gallery.html` so users can discover it.

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) for details on coding conventions, project structure, and how to add a new calculator page.

## License

This project is intended to be released under the **MIT** license. No license file exists yet — one should be added before any public distribution.



