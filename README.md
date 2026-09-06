# My Calculator

A modern web-based calculator application built with [Astro](https://astro.build/), a static site generator that produces fast, optimized static HTML/CSS/JS.

## Features

- **Basic Calculator** — Addition, subtraction, multiplication, and division with a running result and calculation log.
- **XPY Calculator** — Calculate X raised to the power of Y (Math.pow).
- **UYT Calculator** — Calculate (U × Y) ÷ T with divide-by-zero protection.
- **Info Pages** — ASD, ADDOP, ASDSFSF, and QWQ informational pages.
- **Responsive Design** — Clean, mobile-friendly UI using CSS custom properties (design tokens).
- **Component-Based** — Reusable `BaseLayout` and `Header` Astro components with consistent navigation.

## Tech Stack

- **Framework:** Astro v4+ (static output)
- **Language:** TypeScript
- **Styling:** Scoped CSS in `.astro` files + global design tokens in `src/styles/global.css`
- **Fonts:** Google Fonts (Roboto)

## Project Structure

```
my-calculator/
├── astro.config.mjs          # Astro configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript config (extends astro/tsconfigs/base)
├── .gitignore
├── public/
│   └── favicon.svg           # Calculator icon
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro  # HTML shell, head, header, footer
│   ├── components/
│   │   └── Header.astro      # Reusable header/nav with active page highlighting
│   ├── pages/
│   │   ├── index.astro       # Home page
│   │   ├── about.astro       # About page
│   │   ├── calculator.astro  # Basic calculator (add/subtract/multiply/divide)
│   │   ├── xpy.astro         # XPY (X power Y) calculator
│   │   ├── uyt.astro         # UYT (U yield T) calculator
│   │   ├── asd.astro         # ASD info page
│   │   ├── addop.astro       # ADDOP info page
│   │   ├── asdsfsf.astro     # ASDSFSF info page
│   │   └── qwq.astro         # QWQ info page
│   └── styles/
│       └── global.css        # Design tokens and global styles
```

## Getting Started

### Prerequisites

- Node.js 18+ (or 20+)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This starts the Astro dev server at `http://localhost:4321`.

### Build

```bash
npm run build
```

Outputs static files to `dist/`.

### Preview Production Build

```bash
npm run preview
```

### Type Check

```bash
npm run check
```

Runs `astro check` for TypeScript diagnostics.

## Pages & Routes

| Page              | Route         | Description                              |
|-------------------|---------------|------------------------------------------|
| Home              | `/`           | Landing page with links to all calculators |
| About             | `/about`      | About the project                        |
| Basic Calculator  | `/calculator` | Add, subtract, multiply, divide          |
| XPY Calculator    | `/xpy`        | X raised to the power of Y               |
| UYT Calculator    | `/uyt`        | (U × Y) ÷ T yield calculation            |
| ASD               | `/asd`        | ASD calculator info page                 |
| ADDOP             | `/addop`      | ADDOP calculator info page               |
| ASDSFSF           | `/asdsfsf`    | ASDSFSF calculator info page             |
| QWQ               | `/qwq`        | QWQ calculator info page                 |

## License

This project is free to use.

