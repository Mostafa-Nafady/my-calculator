# my-calculator

A web-based calculator suite with multiple calculator types: basic arithmetic, XPY power, UYT yield, ASX stock returns, ASD, ADDOP, and ASDSFSF.

## Project Structure

```
my-calculator/
├── index.html              # Home page
├── about.html              # About page
├── asd.html                # ASD calculator page
├── addop.html              # ADDOP calculator page
├── asx.html                # ASX Stock calculator page
├── ASDSFSF.html            # ASDSFSF calculator page
├── assets/                 # Shared scripts and styles (see assets/README.md)
├── basics-10-function-refactoring/  # Basic four-function calculator
├── uyt/                    # UYT (U Yield T) calculator
├── xpy/                    # XPY (X Power Y) calculator
├── README.md
└── package-lock.json
```

## Assets Documentation

Each sub-project and the root project have an `assets/` directory containing scripts and styles. The root `assets/` directory also includes a shared `Header` component used across all pages.

- [assets/README.md](assets/README.md) — Main shared assets (scripts, styles, Header component)
- [basics-10-function-refactoring/assets/README.md](basics-10-function-refactoring/assets/README.md) — Basic calculator assets
- [uyt/assets/README.md](uyt/assets/README.md) — UYT calculator assets
- [xpy/assets/README.md](xpy/assets/README.md) — XPY calculator assets

## Calculators

- **Basic Calculator** (basics-10-function-refactoring/) — Four-function arithmetic: add, subtract, multiply, divide
- **XPY Calculator** (xpy/) — Computes X raised to the power of Y
- **UYT Calculator** (uyt/) — Computes (U × Y) ÷ T
- **ASX Stock Calculator** (asx.html) — Calculates stock returns, dividends, and return percentage for ASX-listed shares
- **ASD Calculator** (asd.html) — Advanced arithmetic and scientific calculations page
- **ADDOP Calculator** (addop.html) — Advanced addition operations page
- **ASDSFSF Calculator** (ASDSFSF.html) — Advanced arithmetic and scientific calculations page

## Technology

- Vanilla HTML, CSS, and JavaScript — no build tools or frameworks
- Roboto font loaded from Google Fonts
- All scripts loaded with the `defer` attribute

## Getting Started

1. Open `index.html` in a web browser.
2. No build step or server is required.
3. Navigate to different calculators via the home page buttons or the header navigation.

