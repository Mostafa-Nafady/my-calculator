# Architecture

[← Back to README](../README.md)

This document explains the technical architecture of the **My Calculator** project. It is intended for developers who want to understand how the codebase is organized or who plan to extend it with new calculators and pages.

## Overview

My Calculator is a **browser-based calculator suite** built with vanilla HTML, CSS, and JavaScript. There is:

- **No server** — all files are served as static assets.
- **No bundler** — no Webpack, Rollup, Vite, or similar build step.
- **No framework** — no React, Vue, Angular, or other UI framework.
- **No dependencies** — no npm packages required at runtime (only a `package.json` for development tooling).

Each page is a standalone `.html` file. Pages are linked via plain `<a href>` tags. The project can be opened directly in a browser by loading `index.html`, or served from any static file server (e.g., `python3 -m http.server 8000`, GitHub Pages, Netlify).

## Three-Layer Architecture

Every page follows the same three-layer structure: HTML for structure, CSS for presentation, and JavaScript for behavior. This separation is maintained consistently across all pages and sub-applications.

### Layer 1: HTML Structure

Each page is a standalone `.html` file with a standard structure:

- `<!DOCTYPE html>` declaration with `<html lang="en">`
- `<head>` containing:
  - Meta tags (`charset`, `viewport`, `X-UA-Compatible`)
  - Google Fonts link (Roboto 400, 700)
  - CSS `<link>` tags (shared `app.css` first, then page-specific stylesheet)
  - `<script>` tags with `defer` attribute (Header.js first, then page script)
- `<body>` containing:
  - `<div id="header-container"></div>` — mount point for the shared header
  - Page-specific `<section>` elements for content

Example from `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Home - My Calculator</title>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="assets/styles/app.css" />
    <link rel="stylesheet" href="assets/styles/home.css" />
    <script src="assets/scripts/components/Header.js" defer></script>
    <script src="assets/scripts/home.js" defer></script>
  </head>
  <body>
    <div id="header-container"></div>

    <section id="home-content">
      <!-- Page-specific content -->
    </section>
  </body>
</html>
```

The `<div id="header-container"></div>` is the mount point for the shared header component (see [Shared Header Component](#shared-header-component) below).

### Layer 2: CSS Styling

Two stylesheets are loaded per page:

1. **`assets/styles/app.css`** — shared global styles including:
   - `box-sizing: border-box` reset on all elements
   - `font-family: 'Roboto'` on `html`
   - `body { margin: 0 }`
   - Header styles: `background: #023d6d`, `color: white`, `padding: 1rem`, `text-align: center`, `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26)`
   - Nav link styles: white text, `border: 1px solid white`, `border-radius: 5px`, hover `background: rgba(255, 255, 255, 0.2)`
   - Calculator section styles (`#calculator`, `#results`): `width: 40rem`, `max-width: 90%`, `border: 1px solid #023d6d`, `border-radius: 10px`, `padding: 1rem`, `color: #023d6d`
   - Input styles: `font-size: 3rem`, `border: 2px solid #023d6d`, `width: 10rem`, centered
   - Button styles: `background: #023d6d`, `color: white`, hover `background: #084f88`

2. **Page-specific stylesheet** (e.g., `home.css`, `gallery.css`, `xpy.css`, `uyt.css`) — styles unique to that page's layout and content.

```html
<link rel="stylesheet" href="assets/styles/app.css" />
<link rel="stylesheet" href="assets/styles/home.css" />
```

> **Note:** The basic calculator subdirectory (`basics-10-function-refactoring/`) maintains its own local copy of `app.css` at `basics-10-function-refactoring/assets/styles/app.css` so it can operate as a self-contained sub-application.

**Color scheme:**

| Token | Value | Usage |
|---|---|---|
| Primary | `#023d6d` (dark blue) | Header background, borders, button background, text color |
| Hover | `#084f88` | Button hover/active state, card link hover |
| Card background | `#f0f4f8` | Gallery cards, feature list items |

### Layer 3: JavaScript Behavior

Two scripts are loaded per page, both with the `defer` attribute:

1. **`components/Header.js`** — the shared header component (loaded first).
2. **Page-specific script** (e.g., `home.js`, `xpy.js`) — loaded second; calls `renderHeader()` on `DOMContentLoaded`.

```html
<script src="assets/scripts/components/Header.js" defer></script>
<script src="assets/scripts/home.js" defer></script>
```

> **Note:** The basic calculator loads three scripts: `vendor.js`, then `Header.js`, then `app.js`. See [Basic Calculator](#basic-calculator-basics-10-function-refactoring) for details.

## Shared Header Component

Located at `assets/scripts/components/Header.js`. It provides a consistent header (title + navigation) across all pages without duplicating HTML. The component is written in vanilla JavaScript with JSDoc annotations.

### Exported Functions

| Function | Signature | Description |
|---|---|---|
| `createHeader` | `createHeader(title, navLinks = [])` | Creates and returns a `<header>` DOM element with an `<h1>` title and optional `<nav>` of links. Does not attach it to the document. |
| `renderHeader` | `renderHeader(containerId, title, navLinks = [])` | Finds a container element by its ID and appends a `<header>` element containing an `<h1>` title and an optional `<nav>` of links. Logs an error to the console if the container is not found. |
| `replaceHeader` | `replaceHeader(title, navLinks = [])` | Replaces the existing `<header>` element with a new one, or inserts at the beginning of `<body>` if no header exists. |

**`createHeader` source:**

```javascript
function createHeader(title, navLinks = []) {
  const header = document.createElement('header');

  // Create title element
  const titleElement = document.createElement('h1');
  titleElement.textContent = title;
  header.appendChild(titleElement);

  // Create navigation if links are provided
  if (navLinks.length > 0) {
    const nav = document.createElement('nav');

    navLinks.forEach(link => {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.label;
      nav.appendChild(anchor);
    });

    header.appendChild(nav);
  }

  return header;
}
```

**`renderHeader` source:**

```javascript
function renderHeader(containerId, title, navLinks = []) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID '${containerId}' not found`);
    return;
  }

  const header = createHeader(title, navLinks);
  container.appendChild(header);
}
```

**`replaceHeader` source:**

```javascript
function replaceHeader(title, navLinks = []) {
  const existingHeader = document.querySelector('header');
  const header = createHeader(title, navLinks);

  if (existingHeader) {
    existingHeader.replaceWith(header);
  } else {
    // If no header exists, insert at the beginning of body
    document.body.insertBefore(header, document.body.firstChild);
  }
}
```

### Usage

Each page's script calls `renderHeader` on `DOMContentLoaded`, passing a page-specific title and navigation array. The call is wrapped in a type-check guard to prevent runtime errors if `Header.js` fails to load:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'Welcome to My Calculator', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'ASD', href: 'asd.html' },
      { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' },
      { label: 'Gallery', href: 'gallery.html' }
    ]);
  }
});
```

### Module Export

The component uses a CommonJS-compatible export guard so it can be required in Node.js (e.g., for testing) while still working as a plain browser script:

```javascript
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createHeader, renderHeader, replaceHeader };
}
```

### Duplicate Copy

A duplicate copy of `Header.js` exists at:

```
basics-10-function-refactoring/assets/scripts/components/Header.js
```

This is an identical copy that allows the basic calculator subdirectory to load the header component using a relative path (`assets/scripts/components/Header.js`) without referencing the parent directory (`../assets/scripts/components/Header.js`).

## Script Loading & Execution Order

All `<script>` tags in the project use the `defer` attribute. The `defer` attribute guarantees that scripts execute **in document order** after the HTML has been fully parsed but before the `DOMContentLoaded` event fires.

### Standard Pages (Two Scripts)

1. `Header.js` executes first, defining `createHeader`, `renderHeader`, and `replaceHeader` on the global scope.
2. The page-specific script executes second and can safely call `renderHeader`.

```html
<script src="assets/scripts/components/Header.js" defer></script>
<script src="assets/scripts/home.js" defer></script>
```

### Basic Calculator (Three Scripts)

The basic calculator uses a special three-script order:

```html
<script src="assets/scripts/vendor.js" defer></script>
<script src="assets/scripts/components/Header.js" defer></script>
<script src="assets/scripts/app.js" defer></script>
```

1. `vendor.js` — declares DOM element references and the `outputResult` helper function.
2. `Header.js` — defines the header component functions.
3. `app.js` — the calculation engine; references the DOM constants and `outputResult` from `vendor.js`.

`vendor.js` must load before `app.js` because `app.js` references the DOM element constants (`userInput`, `addBtn`, etc.) and calls `outputResult()` defined in `vendor.js`.

### Type-Check Guard Pattern

As an additional safety guard, each page script wraps its `renderHeader` call in a type check:

```javascript
if (typeof renderHeader === 'function') {
  renderHeader(/* ... */);
}
```

This prevents runtime errors if `Header.js` fails to load for any reason.

## Calculator Implementations

### Basic Calculator (`basics-10-function-refactoring/`)

A 4-function arithmetic calculator (addition, subtraction, multiplication, division). It uses a two-script `vendor.js` → `app.js` split pattern.

#### `vendor.js` — DOM References & Output Helper

Declares `const` references to DOM elements and defines the `outputResult` function:

```javascript
const userInput = document.getElementById('input-number');
const addBtn = document.getElementById('btn-add');
const subtractBtn = document.getElementById('btn-subtract');
const multiplyBtn = document.getElementById('btn-multiply');
const divideBtn = document.getElementById('btn-divide');

const currentResultOutput = document.getElementById('current-result');
const currentCalculationOutput = document.getElementById('current-calculation');

function outputResult(result, text) {
  currentResultOutput.textContent = result;
  currentCalculationOutput.textContent = text;
}
```

#### `app.js` — Calculation Engine

Maintains state via module-level variables:

```javascript
const defaultResult = 0;
let initialResult;
let operatorType;
let currentResult = defaultResult;
let inputUser = grtUserInput();
let description;
let logEntry = [];
```

**Functions:**

| Function | Description |
|---|---|
| `grtUserInput()` | Returns `userInput.value` (the current input field value). |
| `calculationDescrip(str1, str2, str3)` | Concatenates three string arguments and returns the result as a description string. |
| `output()` | Calls `outputResult(currentResult, description)` to update the DOM, then `console.log(logEntry)`. |
| `writeLog(operation, result)` | Creates a log entry object `{ operation, result, operand }`, pushes it to the `logEntry` array, then calls `output()`. |
| `calculation(calculationType)` | Main dispatch function. Reads user input, validates it, updates `currentResult` based on the operation type, builds the description, and calls `writeLog()`. |
| `add()` | Wrapper that calls `calculation("ADD")`. |
| `subtract()` | Wrapper that calls `calculation("SUBT")`. |
| `multiplication()` | Wrapper that calls `calculation("MULTI")`. |
| `division()` | Wrapper that calls `calculation("DIVID")`. |

**Supported operations:**

| Operation Code | Arithmetic | Operator Symbol |
|---|---|---|
| `ADD` | `currentResult += parseInt(inputUser)` | `+` |
| `SUBT` | `currentResult -= parseInt(inputUser)` | `-` |
| `MULTI` | `currentResult *= parseInt(inputUser)` | `*` |
| `DIVID` | `currentResult /= parseInt(inputUser)` | `/` |

**Input validation:** `calculation()` checks if `parseInt(inputUser)` is falsy and returns early if invalid:

```javascript
function calculation(calculationType){
  inputUser = grtUserInput();
  if(!parseInt(inputUser)){
    return;
  }
  // ... operation dispatch
}
```

**Event listeners** are attached directly to the button elements:

```javascript
addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiplication);
divideBtn.addEventListener('click', division);
```

### XPY Calculator (`xpy/`)

A self-contained exponentiation calculator. Single script `xpy.js` with JSDoc comments.

**State variables:**

```javascript
let defaultResult = 0;
let currentBase = 0;
let currentExponent = 0;
```

**Functions:**

| Function | Description |
|---|---|
| `calculateXPY(base, exponent)` | Returns `Math.pow(base, exponent)`. |
| `updateCalculationDisplay(base, exponent, result)` | Updates DOM: sets calculation text to `` `${base} ^ ${exponent}` `` and result text. |
| `handleCalculate()` | Parses inputs with `parseFloat`, validates with `isNaN` (alerts on invalid), calls `calculateXPY`, updates display. |
| `handleClear()` | Resets input fields, state variables, and display to defaults. |

```javascript
function calculateXPY(base, exponent) {
  return Math.pow(base, exponent);
}
```

**Features:**
- Calculate and Clear buttons
- Enter key support on both `baseInput` and `exponentInput`
- Input validation: alerts if either field is `NaN`

### UYT Calculator (`uyt/`)

A self-contained calculator computing (U × Y) ÷ T. Single script `uyt.js` with JSDoc comments.

**State variables:**

```javascript
let defaultResult = 0;
let currentU = 0;
let currentY = 0;
let currentT = 0;
```

**Functions:**

| Function | Description |
|---|---|
| `calculateUYT(u, y, t)` | Returns `(u * y) / t`. Throws `Error('Cannot divide by zero')` if `t === 0`. |
| `updateCalculationDisplay(u, y, t, result)` | Updates DOM: sets calculation text to `` `(${u} × ${y}) ÷ ${t}` `` and result text. |
| `handleCalculate()` | Parses inputs with `parseFloat`, validates with `isNaN`, checks for `t === 0`, wraps `calculateUYT` in try/catch. |
| `handleClear()` | Resets input fields, state variables, and display to defaults. |

```javascript
function calculateUYT(u, y, t) {
  if (t === 0) {
    throw new Error('Cannot divide by zero');
  }
  return (u * y) / t;
}
```

**Features:**
- Calculate and Clear buttons
- Enter key support on all three inputs (`uInput`, `yInput`, `tInput`)
- Input validation: alerts on `NaN` values and on divide-by-zero
- Defensive try/catch around `calculateUYT` call

### Gallery Page (`gallery.html` + `gallery.js`)

An interactive card grid with a modal overlay for browsing all calculators.

`gallery.js` wires up interactivity inside a `DOMContentLoaded` listener:

- **Card click → opens modal:** Clicking a `.gallery-card` element opens the modal overlay (`#modal-overlay`). The modal is populated with the card's title (`.card-title`), description (`.card-desc`), and link (`.card-link`), plus the `data-calc` attribute as a fallback.
- **Card link clicks ignored:** If the click target has the `card-link` class, the handler returns early so the anchor navigates normally.
- **Modal close methods:**
  - `#modal-close` button click → calls `closeModal()`
  - Overlay click (outside `.modal-content`) → calls `closeModal()`
  - `Escape` key → calls `closeModal()`
- **`closeModal()`** adds the `hidden` class to `#modal-overlay`:
  ```javascript
  function closeModal() {
    modalOverlay.classList.add('hidden');
  }
  ```
- **`.modal-content` click** propagation is stopped via `event.stopPropagation()` to prevent accidental overlay close when clicking inside the modal.

## Informational Pages

The following pages are **informational/content-only** — they display descriptive text, feature lists, and action links but contain no calculation logic:

| Page | HTML File | Script File | Notes |
|---|---|---|---|
| ASD Calculator | `asd.html` | `asd.js` | Calls `renderHeader()` only |
| QWE Calculator | `qwe.html` | `qwe.js` | Declares unused `const TYU = 'TYU'`; calls `renderHeader()` |
| CVXZ Calculator | `cvxz.html` | `cvxz.js` | Declares unused `const TYU = 'TYU'`; calls `renderHeader()` |
| NNN Calculator | `nnn.html` | `nnn.js` | Calls `renderHeader()` only |
| SDSSA Calculator | `sdssa.html` | `sdssa.js` | Script file does not exist (referenced in HTML but missing from disk) |

Each informational page follows the same HTML structure: a `<div id="header-container">`, a content `<section>` with heading and description, an actions `<div>` with links, and a features `<section>` with a `<ul>` list.

## State Management

There is **no shared state management library**. Each calculator maintains its own state via module-level variables (`let`/`const` at the top of the script). State is **not persisted** — it resets on every page reload.

| Calculator | State Variables |
|---|---|
| Basic Calculator | `defaultResult`, `initialResult`, `operatorType`, `currentResult`, `inputUser`, `description`, `logEntry[]` |
| XPY Calculator | `defaultResult`, `currentBase`, `currentExponent` |
| UYT Calculator | `defaultResult`, `currentU`, `currentY`, `currentT` |

The `logEntry` array in the Basic Calculator stores a history of calculation objects with `{ operation, result, operand }` fields, but this history is only logged to the console — it is not displayed in the UI or persisted.

## Navigation Pattern

Navigation is **decentralized** — there is no central configuration file for nav links. Each page script defines its own `navLinks` array passed to `renderHeader()`:

```javascript
renderHeader('header-container', 'Page Title', [
  { label: 'Home', href: 'index.html' },
  { label: 'About', href: 'about.html' },
  // ... page-specific links
]);
```

Key characteristics:

- **Not all pages link to all other pages** — each page curates its own navigation set.
- **Relative paths differ based on page location:**
  - Root pages use paths like `index.html`, `about.html`, `asd.html`
  - Subdirectory pages (`xpy/`, `uyt/`, `basics-10-function-refactoring/`) use paths like `../index.html`, `../about.html`
- The XPY and UYT calculators reference the shared `Header.js` from the parent directory: `<script src="../assets/scripts/components/Header.js" defer></script>`
- The basic calculator uses its own local copy: `<script src="assets/scripts/components/Header.js" defer></script>`

## Styling Conventions

| Property | Value | Usage |
|---|---|---|
| Primary color | `#023d6d` (dark blue) | Header background, borders, button background, text color |
| Hover color | `#084f88` | Button hover/active state, card link hover |
| Card background | `#f0f4f8` | Gallery cards, feature list items |
| Font | Roboto (Google Fonts, 400 & 700 weights) | All text |
| Border-radius | `5px` (buttons, nav links) / `10px` (sections, cards, modal) | Consistent rounded corners |
| Box shadows | `0 2px 8px rgba(0, 0, 0, 0.26)` (header), `0 4px 12px rgba(0, 0, 0, 0.15)` (card hover) | Depth on header and interactive elements |
| Transitions | `0.2s` for background, border-color, transform, box-shadow | Smooth hover effects |

### Responsive Design

The gallery page uses CSS Grid with `auto-fill` for a responsive card layout:

```css
#gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 1.5rem;
  margin: 2rem auto;
  max-width: 60rem;
  padding: 0 1rem;
}
```

A media query at `max-width: 600px` adjusts the layout to a single column for mobile devices:

```css
@media (max-width: 600px) {
  #gallery-grid {
    grid-template-columns: 1fr;
  }
}
```

## Extending the Project

### Adding a New Calculator

To add a new calculator page (e.g., `newcalc`):

1. **Create the HTML file** — `newcalc.html` with the standard page template:

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

2. **Create the page-specific stylesheet** — `assets/styles/newcalc.css`.

3. **Create the page-specific script** — `assets/scripts/newcalc.js` with the `DOMContentLoaded` → `renderHeader` pattern:

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

4. **Add a gallery card** to `gallery.html` so users can discover the new calculator:

   ```html
   <article class="gallery-card" data-calc="New Calculator">
     <div class="card-icon">NEW</div>
     <h3 class="card-title">New Calculator</h3>
     <p class="card-desc">Description of the new calculator.</p>
     <a class="card-link" href="newcalc.html">Open Calculator</a>
   </article>
   ```

5. **Add a button or link** on `index.html` to provide quick access from the home page.

### Adding a Navigation Link to All Pages

Navigation is decentralized — each page script maintains its own `navLinks` array passed to `renderHeader()`. To add a link that appears in the header on every page, you must update **every** page script's `renderHeader` call with the new link object (e.g., `{ label: 'New Calc', href: 'newcalc.html' }`).

There is no central configuration file for navigation. This is a known limitation of the static, framework-free architecture.

**Pages requiring updates when adding a nav link:**

| Script File | Location |
|---|---|
| `home.js` | `assets/scripts/home.js` |
| `about.js` | `assets/scripts/about.js` |
| `asx.js` | `assets/scripts/asx.js` |
| `gallery.js` | `assets/scripts/gallery.js` |
| `asd.js` | `assets/scripts/asd.js` |
| `qwe.js` | `assets/scripts/qwe.js` |
| `cvxz.js` | `assets/scripts/cvxz.js` |
| `nnn.js` | `assets/scripts/nnn.js` |
| `app.js` | `basics-10-function-refactoring/assets/scripts/app.js` |
| `xpy.js` | `xpy/assets/scripts/xpy.js` |
| `uyt.js` | `uyt/assets/scripts/uyt.js` |

