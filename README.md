# My Calculator

My Calculator is a web-based calculator application built with vanilla HTML, CSS, and JavaScript. It provides a collection of calculator tools for basic arithmetic and specialized operations, all accessible from your browser with no installation required.

## Quick Start

1. Clone or download this repository.
2. Open `index.html` in your web browser.
3. No build step or dependencies required — it just works.

## Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `index.html` | Landing page with links to all calculators |
| About | `about.html` | Information about the project |
| Portfolio | `portfolio.html` | Showcase of all calculator tools |
| Basic Calculator | `basics-10-function-refactoring/index.html` | Addition, subtraction, multiplication, division |
| XPY Calculator | `xpy/index.html` | X raised to the power of Y |
| UYT Calculator | `uyt/index.html` | U Yield T calculations |
| TYO Calculator | `tyo/index.html` | T Yield O calculations |
| ASD Calculator | `asd.html` | Advanced mathematical operations |
| ASWD Calculator | `aswd.html` | Specialized calculations |
| CCX Calculator | `ccx.html` | Custom computation calculator |

## Project Structure

```
my-calculator/
├── index.html              # Home page
├── about.html              # About page
├── portfolio.html          # Portfolio page
├── asd.html                # ASD calculator
├── aswd.html               # ASWD calculator
├── ccx.html                # CCX calculator
├── README.md
├── assets/
│   ├── styles/
│   │   ├── app.css         # Shared styles (header, layout)
│   │   ├── home.css        # Home page styles
│   │   ├── about.css       # About page styles
│   │   └── portfolio.css   # Portfolio page styles
│   └── scripts/
│       ├── app.js          # Core calculator logic
│       ├── home.js         # Home page header rendering
│       ├── about.js        # About page header rendering
│       ├── portfolio.js    # Portfolio page header rendering
│       └── components/
│           └── Header.js   # Reusable header component
├── basics-10-function-refactoring/  # Basic calculator
├── xpy/                    # XPY calculator
├── uyt/                    # UYT calculator
└── tyo/                    # TYO calculator
```

## Technologies

- HTML5
- CSS3 (including CSS Grid and Flexbox)
- JavaScript (vanilla, no frameworks)
- Google Fonts (Roboto)

## Features

- Addition (+)
- Subtraction (-)
- Multiplication (*)
- Division (/)
- X Power Y (XPY)
- U Yield T (UYT)
- T Yield O (TYO)
- ASD Calculator
- ASWD Calculator
- CCX Calculator
- Responsive design
- Reusable header component with navigation

## Architecture

The project uses a shared `Header.js` component (`assets/scripts/components/Header.js`) that renders a consistent navigation header across all pages. Each page includes its own JavaScript file (e.g., `home.js`, `about.js`, `portfolio.js`) that calls `renderHeader()` with the appropriate title and navigation links for that page.

Page-specific CSS files provide unique styling while `app.css` provides shared base styles including the header, calculator layout, and typography.

