# Contributing to My Calculator

[← Back to README](README.md)

Thank you for your interest in contributing to **My Calculator**! This project is a lightweight, browser-based calculator suite built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step. Whether you're fixing a bug, adding a new calculator, or improving documentation, your contributions are welcome.

For an overview of the project, see the [README](README.md).

## Code of Conduct

All contributors are expected to be respectful and constructive in their interactions. Treat others with courtesy, provide helpful feedback, and focus on the substance of the work. Disrespectful or disruptive behavior will not be tolerated.

## Getting Started

There is no build step — the project is entirely static. To get a local copy up and running:

```bash
# Clone the repository
git clone https://github.com/your-username/my-calculator.git

# Navigate into the project directory
cd my-calculator

# Install dev tooling (optional — only needed for development tooling)
yarn install
```

Then run the project locally using one of these options:

**Option A — Open the file directly:**

```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

**Option B — Serve locally (recommended for correct relative paths):**

```bash
python3 -m http.server 8000

# Then open your browser to:
# http://localhost:8000
```

> **Note:** There is no build step, no bundler, and no transpilation. All HTML, CSS, and JavaScript files are served as-is.

## Project Structure

The project follows a flat structure with root-level HTML pages and an `assets/` directory for shared styles and scripts. Self-contained calculator subdirectories (`basics-10-function-refactoring/`, `xpy/`, `uyt/`) each have their own `assets/` folder.

```
my-calculator/
├── index.html              # Landing page
├── about.html              # About page
├── asx.html                # About (ASx) page
├── gallery.html            # Gallery of all calculators
├── *.html                  # Other informational pages
├── assets/
│   ├── styles/             # Shared (app.css) and page-specific CSS
│   └── scripts/            # Page scripts and shared components/
│       └── components/
│           └── Header.js   # Reusable header component
├── basics-10-function-refactoring/  # Basic 4-function calculator
├── xpy/                   # XPY (X^Y) calculator
└── uyt/                   # UYT (U×Y÷T) calculator
```

For the full directory tree, see [Project Structure](README.md#project-structure) in the README. For architectural details, see [docs/architecture.md](docs/architecture.md).

## Coding Conventions

### HTML

- Use **semantic HTML5** elements (`<header>`, `<section>`, `<nav>`, `<article>`, etc.).
- Every page **must** include `<div id="header-container"></div>` as the mount point for the shared header component.
- Load CSS with `<link>` tags — shared `app.css` first, then the page-specific stylesheet.
- Load scripts with the `defer` attribute. `Header.js` must load first, then the page-specific script.
- Include the standard meta tags in `<head>`:

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="ie=edge" />
```

- Load Google Fonts (Roboto 400, 700) via a `<link>` tag on every page.

### CSS

- Follow the existing **color scheme**:

| Token | Value | Usage |
|---|---|---|
| Primary | `#023d6d` (dark blue) | Header background, borders, button background, text color |
| Hover | `#084f88` | Button hover/active state, card link hover |
| Card background | `#f0f4f8` | Gallery cards, feature list items |

- Use `box-sizing: border-box` on all elements (already set in `app.css`).
- Page-specific styles go in a **dedicated file** (e.g., `home.css`, `gallery.css`, `xpy.css`) in `assets/styles/`.
- **Don't inline styles** — all CSS belongs in stylesheet files.
- Use the Roboto font family (loaded via Google Fonts).

### JavaScript

- Use **vanilla JavaScript (ES6+)** only — no frameworks or libraries.
- Use `const` and `let`, **not** `var`. (Note: some legacy files use `var` — new code should use `const`/`let`.)
- Call `renderHeader()` inside a `DOMContentLoaded` listener, wrapped in a `typeof renderHeader === 'function'` guard:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'Page Title', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' }
    ]);
  }
});
```

- Add **JSDoc comments** to all functions using `/** ... */` blocks with `@param` and `@returns` tags. Match the style used in `basics-10-function-refactoring/assets/scripts/app.js` and `vendor.js`:

```javascript
/**
 * Calculates X raised to the power of Y.
 *
 * @param {number} base - The base value.
 * @param {number} exponent - The exponent value.
 * @returns {number} The result of base ^ exponent.
 */
function calculateXPY(base, exponent) {
  return Math.pow(base, exponent);
}
```

### Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Variables and functions | camelCase | `currentResult`, `handleCalculate` |
| CSS class names | kebab-case | `gallery-card`, `card-title` |
| HTML IDs | kebab-case | `header-container`, `btn-calculate` |
| Filenames | lowercase with hyphens | `home.css`, `gallery.js`, `basics-10-function-refactoring/` |

## Adding a New Calculator Page

This section expands on the [Adding a New Calculator](README.md#adding-a-new-calculator) guide in the README with more detail.

1. **Create an HTML file** in the project root (or a subdirectory for self-contained calculators). Include the standard page structure:

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <meta http-equiv="X-UA-Compatible" content="ie=edge" />
       <title>New Calculator - My Calculator</title>
       <link
         href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap"
         rel="stylesheet"
       />
       <link rel="stylesheet" href="assets/styles/app.css" />
       <link rel="stylesheet" href="assets/styles/newcalc.css" />
       <script src="assets/scripts/components/Header.js" defer></script>
       <script src="assets/scripts/newcalc.js" defer></script>
     </head>
     <body>
       <div id="header-container"></div>

       <section id="calculator">
         <!-- Calculator inputs and buttons -->
       </section>

       <section id="results">
         <h2 id="current-calculation">0</h2>
         <h2>Result: <span id="current-result">0</span></h2>
       </section>
     </body>
   </html>
   ```

2. **Include the standard page structure**: `<!DOCTYPE html>`, `<html lang="en">`, meta tags, Google Fonts link, CSS links (`app.css` first, then page-specific), script tags with `defer` (`Header.js` first, then page script), `<div id="header-container">`, and content sections.

3. **Create a page-specific CSS file** in `assets/styles/` (e.g., `newcalc.css`). If the calculator lives in a subdirectory, place the CSS in the subdirectory's own `assets/styles/` folder.

4. **Create a page-specific JS file** in `assets/scripts/` (e.g., `newcalc.js`). The script must call `renderHeader()` on `DOMContentLoaded`:

   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
     if (typeof renderHeader === 'function') {
       renderHeader('header-container', 'New Calculator', [
         { label: 'Home', href: 'index.html' },
         { label: 'Gallery', href: 'gallery.html' }
       ]);
     }

     // Calculator logic here
   });
   ```

5. **Add JSDoc comments** to all functions in the new script. Every function should have a `/** ... */` block with `@param` and `@returns` tags as appropriate.

6. **Link the new page** from `index.html` and `gallery.html` so users can discover it. Add a button or link on the home page, and add a gallery card:

   ```html
   <article class="gallery-card" data-calc="New Calculator">
     <div class="card-icon">NEW</div>
     <h3 class="card-title">New Calculator</h3>
     <p class="card-desc">Description of the new calculator.</p>
     <a class="card-link" href="newcalc.html">Open Calculator</a>
   </article>
   ```

7. **Update the documentation**:
   - Add the page to the Pages Reference table in [docs/pages-reference.md](docs/pages-reference.md).
   - Add the script to the Components doc in [docs/components.md](docs/components.md).

### Decentralized Navigation

Navigation in this project is **decentralized** — there is no central configuration file for nav links. Each page script defines its own `navLinks` array passed to `renderHeader()`. To add a link that appears in the header on every page, you must update **every** page script's `renderHeader` call with the new link object (e.g., `{ label: 'New Calc', href: 'newcalc.html' }`).

This is a known limitation of the static, framework-free architecture. For the full list of script files that need updating, see [docs/architecture.md](docs/architecture.md#adding-a-navigation-link-to-all-pages).

## Adding a New Informational Page

Informational pages (like `about.html`, `asd.html`, `asx.html`) display descriptive text, feature lists, and action links but contain no calculation logic. The steps are simpler than adding a calculator:

1. **Create an HTML file** in the project root (e.g., `newpage.html`) with the standard page structure: meta tags, Google Fonts link, CSS links (`app.css` + page-specific), script tags with `defer` (`Header.js` + page script), `<div id="header-container">`, and content sections.

2. **Create a page-specific CSS file** in `assets/styles/` (e.g., `newpage.css`).

3. **Create a page-specific JS file** in `assets/scripts/` (e.g., `newpage.js`) that calls `renderHeader()` on `DOMContentLoaded` with the type-check guard. No calculator logic is needed.

4. **Link the new page** from `index.html` and `gallery.html`.

5. **Update the documentation** — add the page to [docs/pages-reference.md](docs/pages-reference.md) and the script to [docs/components.md](docs/components.md).

## Documentation

Keeping documentation in sync with code is essential. When making changes, update the following as needed:

| Document | When to Update |
|---|---|
| [README.md](README.md) | When adding or removing pages or features |
| [docs/pages-reference.md](docs/pages-reference.md) | For any new or changed HTML page |
| [docs/components.md](docs/components.md) | For any new or changed JavaScript file |
| [docs/architecture.md](docs/architecture.md) | If the overall architecture changes |
| [CHANGELOG.md](CHANGELOG.md) | With a description of all changes |

Additionally:

- Add **JSDoc comments** to all new JavaScript functions.
- Ensure code examples in documentation match the actual code.

## Commit Messages

Use [conventional commit](https://www.conventionalcommits.org/) format for all commit messages. Keep the subject line under 72 characters and use the imperative mood (e.g., "add" not "added").

| Type | Usage | Example |
|---|---|---|
| `feat:` | New features | `feat: add XPY calculator page` |
| `fix:` | Bug fixes | `fix: correct division-by-zero handling in UYT` |
| `docs:` | Documentation changes | `docs: update pages-reference for new calculator` |
| `refactor:` | Code refactoring | `refactor: extract calculation logic into helper function` |
| `style:` | Formatting/style changes | `style: fix indentation in app.js` |
| `chore:` | Maintenance tasks | `chore: update dev dependencies` |

Example:

```bash
git commit -m "feat: add XPY calculator page"
```

## Pull Requests

1. **Create a feature branch** from `main`:

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/new-calculator
   ```

2. **Make focused commits** with clear, conventional commit messages.

3. **Ensure all pages still load correctly** — open them in a browser or serve locally with `python3 -m http.server 8000` and verify there are no console errors.

4. **Update documentation** as needed (see [Documentation](#documentation) above).

5. **Write a clear PR description** that:
   - Summarizes the changes
   - References any related issues (e.g., `Closes #42`)
   - Lists any manual testing steps

6. **Submit the pull request** for review.

## Reporting Issues

Found a bug or have a feature idea? Please report it!

1. **Check existing issues** first to avoid duplicates.
2. **Open a new issue** and include:
   - A clear title and description
   - Steps to reproduce the issue (for bugs)
   - Expected vs. actual behavior
   - Browser and OS information (e.g., Chrome 120 on macOS 14)
   - Screenshots or error messages if applicable

For feature requests, describe the use case and what problem the feature would solve.

## License

This project is intended to be released under the **MIT** license. No license file exists yet — one should be added before any public distribution. By contributing, you agree that your contributions will be licensed under the same terms.

For more details, see the [License](README.md#license) section in the README.

