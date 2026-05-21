# My Calculator

A web-based calculator project consisting of multiple calculator modules, each with its own styling and JavaScript logic. This is a static site built with vanilla HTML, CSS, and JavaScript — no frameworks or build tools required.

## Available Calculators

| Calculator | Description | Link |
|---|---|---|
| **Basic Calculator** | 10-function calculator with refactored modular code | [Open](basics-10-function-refactoring/index.html) |
| **XPY Calculator** | XPY-branded calculator | [Open](xpy/index.html) |
| **UYT Calculator** | UYT-branded calculator | [Open](uyt/index.html) |
| **ASD Calculator** | ASD calculator | [Open](asd.html) |
| **ASWD Calculator** | ASWD calculator | [Open](aswd.html) |
| **CVXZ Calculator** | CVXZ-branded calculator | [Open](cvxz/index.html) |
| **NNN Calculator** | NNN calculator | [Open](nnn.html) |
| **SDSSA Calculator** | SDSSA calculator | [Open](sdssa.html) |

## Project Structure

```
my-calculator/
├── index.html                  # Home page
├── about.html                  # About page
├── asd.html                    # ASD Calculator
├── aswd.html                   # ASWD Calculator
├── cvxz.html                   # CVXZ Calculator (entry)
├── nnn.html                    # NNN Calculator
├── sdssa.html                  # SDSSA Calculator
├── README.md                   # This file
│
├── assets/                     # Shared assets
│   ├── scripts/
│   │   ├── components/
│   │   │   └── Header.js       # Reusable header component
│   │   ├── home.js             # Home page logic
│   │   ├── about.js            # About page logic
│   │   ├── asd.js              # ASD Calculator logic
│   │   ├── cvxz.js             # CVXZ Calculator logic
│   │   ├── nnn.js              # NNN Calculator logic
│   │   └── sdssa.js            # SDSSA Calculator logic
│   └── styles/
│       ├── app.css             # Base/shared styles
│       ├── home.css            # Home page styles
│       ├── about.css           # About page styles
│       ├── asd.css             # ASD Calculator styles
│       ├── cvxz.css            # CVXZ Calculator styles
│       ├── nnn.css             # NNN Calculator styles
│       └── sdssa.css           # SDSSA Calculator styles
│
├── basics-10-function-refactoring/   # Basic Calculator module
│   ├── index.html
│   ├── home.html
│   └── assets/
│       ├── scripts/
│       │   ├── app.js            # Core calculator logic
│       │   ├── vendor.js         # Utility/helper functions
│       │   ├── home.js           # Home page logic
│       │   └── components/       # Module-specific components
│       └── styles/
│           ├── app.css           # Base styles
│           └── home.css          # Home page styles
│
├── xpy/                          # XPY Calculator module
│   ├── index.html
│   └── assets/
│       ├── scripts/
│       │   └── xpy.js
│       └── styles/
│           └── xpy.css
│
└── uyt/                          # UYT Calculator module
    ├── index.html
    └── assets/
        ├── scripts/
        │   └── uyt.js
        └── styles/
            └── uyt.css
```

### Key Files

- **`assets/scripts/components/Header.js`** — Reusable header component shared across pages.
- **`assets/scripts/home.js`** — Home page navigation and logic.
- **`assets/scripts/app.js`** — Core calculator logic used by the basic calculator module.
- **`assets/scripts/vendor.js`** — Utility and helper functions for the basic calculator.
- **`assets/styles/app.css`** — Base/shared stylesheet applied across the project.

## How to Run

This is a **static website** — no server, build step, or dependencies are required.

1. Open `index.html` in any modern web browser.
2. Navigate to any calculator from the home page.

Alternatively, you can serve the project with any static file server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js (npx)
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Technology Stack

- **HTML5** — Page structure
- **CSS3** — Styling (no preprocessors)
- **Vanilla JavaScript** — All calculator logic and interactivity
- **No frameworks, no build tools** — Pure static site

