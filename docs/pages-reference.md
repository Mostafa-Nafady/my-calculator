# Pages Reference

[← Back to README](../README.md)

This document is a per-page reference covering every HTML page in the **My Calculator** project. For each page it lists the file location, `<title>` tag, associated CSS and JavaScript files (in load order), key DOM elements, and a summary of script behavior. Use this as a quick lookup when you need to find which assets a page uses or how its DOM is structured.

## Page Inventory

| Page | HTML File | CSS File(s) | JS File(s) | Type |
|---|---|---|---|---|
| Home | `index.html` | `app.css`, `home.css` | `Header.js`, `home.js` | Landing page |
| About | `about.html` | `app.css`, `about.css` | `Header.js`, `about.js` | Informational |
| About (ASx) | `asx.html` | `app.css`, `asx.css` | `Header.js`, `asx.js` | Informational |
| Gallery | `gallery.html` | `app.css`, `gallery.css` | `Header.js`, `gallery.js` | Interactive gallery |
| ASD Calculator | `asd.html` | `app.css`, `asd.css` | `Header.js`, `asd.js` | Informational |
| QWE Calculator | `qwe.html` | `app.css`, `qwe.css` | `Header.js`, `qwe.js` | Informational |
| CVXZ Calculator | `cvxz.html` | `app.css`, `cvxz.css` | `Header.js`, `cvxz.js` | Informational |
| NNN Calculator | `nnn.html` | `app.css`, `nnn.css` | `Header.js`, `nnn.js` | Informational |
| SDSSA Calculator | `sdssa.html` | `app.css`, `sdssa.css` | `Header.js`, `sdssa.js` | Informational |
| Basic Calculator | `basics-10-function-refactoring/index.html` | `app.css`, `home.css` | `vendor.js`, `Header.js`, `app.js` | Functional calculator |
| XPY Calculator | `xpy/index.html` | `app.css`, `xpy.css` | `Header.js`, `xpy.js` | Functional calculator |
| UYT Calculator | `uyt/index.html` | `app.css`, `uyt.css` | `Header.js`, `uyt.js` | Functional calculator |

## Per-Page Details

### Home (`index.html`)

- **Purpose**: Landing page with links to all calculators and a features list.
- **Location**: Project root
- **CSS**: `assets/styles/app.css` (shared), `assets/styles/home.css` (page-specific)
- **Scripts**: `assets/scripts/components/Header.js` (defer), `assets/scripts/home.js` (defer)
- **Key DOM elements**:
  - `<div id="header-container">` — mount point for shared header
  - `<section id="home-content">` — main content area with heading, description, and action buttons
  - `<div id="home-actions">` — container for calculator link buttons:
    - `#btn-start` → `basics-10-function-refactoring/index.html` (Start Calculating)
    - `#btn-xpy` → `xpy/index.html` (XPY Calculator)
    - `#btn-uyt` → `uyt/index.html` (UYT Calculator)
    - `#btn-asd` → `asd.html` (ASD Calculator)
    - `#btn-qwe` → `qwe.html` (QWE Calculator)
    - `#btn-asx` → `asx.html` (ASx About)
  - `<section id="features">` — features list with `<h3>Features</h3>` and a `<ul>` listing all supported operations
- **Script behavior**: `home.js` calls `renderHeader('header-container', 'Welcome to My Calculator', [...])` on `DOMContentLoaded` with nav links: Home, About, ASD, Basic Calculator, XPY Calculator, Gallery.
- **Title tag**: `Home - My Calculator`

### About (`about.html`)

- **Purpose**: Project overview and description page.
- **Location**: Project root
- **CSS**: `assets/styles/app.css`, `assets/styles/about.css`
- **Scripts**: `assets/scripts/components/Header.js` (defer), `assets/scripts/about.js` (defer)
- **Key DOM elements**:
  - `<div id="header-container">`
  - `<section id="about-content">` — heading "About My Calculator", two descriptive paragraphs, action buttons
  - `<div id="about-actions">` — links: `#btn-home` → `index.html`, `#btn-start` → basics calculator, `#btn-uyt` → UYT calculator
  - `<section id="about-info">` — "Why Choose My Calculator?" heading with a `<ul>` feature list
- **Script behavior**: `about.js` calls `renderHeader('header-container', 'About My Calculator', [...])` with nav links: Home, About, ASD, Basic Calculator, XPY Calculator.
- **Title tag**: `About - My Calculator`

### About — ASx (`asx.html`)

- **Purpose**: Secondary about page (confirmed as an "About" page, not related to Australian Securities Exchange).
- **Location**: Project root
- **CSS**: `assets/styles/app.css`, `assets/styles/asx.css`
- **Scripts**: `assets/scripts/components/Header.js` (defer), `assets/scripts/asx.js` (defer)
- **Key DOM elements**:
  - `<div id="header-container">`
  - `<section id="asx-content">` — heading "About ASx", two descriptive paragraphs, action buttons
  - `<div id="asx-actions">` — links: `#btn-home` → `index.html`, `#btn-start` → basics calculator, `#btn-uyt` → UYT calculator
  - `<section id="asx-info">` — "Why Choose My Calculator?" heading with a `<ul>` feature list
- **Script behavior**: `asx.js` calls `renderHeader('header-container', 'Welcome to My Calculator', [...])` with nav links: Home, About, ASx, ASD, Basic Calculator, XPY Calculator, Gallery.
- **Title tag**: `ASx - My Calculator`

### Gallery (`gallery.html`)

- **Purpose**: Interactive card grid for browsing all calculators, with a modal overlay for quick summaries.
- **Location**: Project root
- **CSS**: `assets/styles/app.css`, `assets/styles/gallery.css`
- **Scripts**: `assets/scripts/components/Header.js` (defer), `assets/scripts/gallery.js` (defer)
- **Key DOM elements**:
  - `<div id="header-container">`
  - `<section id="gallery-intro">` — heading "Calculator Gallery" and description
  - `<section id="gallery-grid">` — CSS Grid container with 5 `.gallery-card` articles:
    - Basic Calculator (data-calc="Basic Calculator", icon "+/−", link → basics calculator)
    - XPY Calculator (data-calc="XPY Calculator", icon "x^y", link → xpy calculator)
    - UYT Calculator (data-calc="UYT Calculator", icon "U→T", link → uyt calculator)
    - ASD Calculator (data-calc="ASD Calculator", icon "ASD", link → `asd.html`)
    - QWE Calculator (data-calc="QWE Calculator", icon "QWE", link → `qwe.html`)
  - Each card has: `.card-icon`, `.card-title` (h3), `.card-desc` (p), `.card-link` (a)
  - `<div id="modal-overlay" class="modal-overlay hidden">` — modal overlay with:
    - `<div class="modal-content">` — modal content container
    - `<button id="modal-close" class="modal-close">` — close button (×)
    - `<h3 id="modal-title">` — modal title (populated dynamically)
    - `<p id="modal-desc">` — modal description (populated dynamically)
    - `<a id="modal-link">` — modal link (populated dynamically)
- **Script behavior**: `gallery.js` calls `renderHeader()` on `DOMContentLoaded` with nav links: Home, About, ASD, Basic Calculator, XPY Calculator, Gallery. Then wires up card click → modal open, modal close via close button / overlay click / Escape key, and stops propagation on `.modal-content` clicks.
- **Title tag**: `Gallery - My Calculator`

### ASD Calculator (`asd.html`)

- **Purpose**: Informational page describing the ASD Calculator (no calculation logic).
- **Location**: Project root
- **CSS**: `assets/styles/app.css`, `assets/styles/asd.css`
- **Scripts**: `assets/scripts/components/Header.js` (defer), `assets/scripts/asd.js` (defer)
- **Key DOM elements**:
  - `<div id="header-container">`
  - `<section id="asd-content">` — heading "ASD Calculator", two descriptive paragraphs, action buttons
  - `<div id="asd-actions">` — links: `#btn-home` → `index.html`, `#btn-start` → basics calculator, `#btn-about` → `about.html`
  - `<section id="asd-info">` — "ASD Calculator Features" heading with a `<ul>` feature list (Advanced arithmetic operations, Scientific calculation support, Precision mathematical functions, Fast and responsive design, Easy to use interface, Free to use)
- **Script behavior**: `asd.js` calls `renderHeader('header-container', 'ASD Calculator', [...])` with nav links: Home, About, ASD, Basic Calculator, XPY Calculator.
- **Title tag**: `ASD - My Calculator`

### QWE Calculator (`qwe.html`)

- **Purpose**: Informational page describing the QWE Calculator (no calculation logic).
- **Location**: Project root
- **CSS**: `assets/styles/app.css`, `assets/styles/qwe.css`
- **Scripts**: `assets/scripts/components/Header.js` (defer), `assets/scripts/qwe.js` (defer)
- **Key DOM elements**:
  - `<div id="header-container">`
  - `<section id="qwe-content">` — heading "QWE Calculator", two descriptive paragraphs, action buttons
  - `<div id="qwe-actions">` — links: `#btn-home` → `index.html`, `#btn-start` → basics calculator, `#btn-uyt` → UYT calculator
  - `<section id="qwe-info">` — "QWE Calculator Features" heading with a `<ul>` feature list
- **Script behavior**: `qwe.js` declares an unused `const TYU = 'TYU'` at the top, then calls `renderHeader('header-container', 'QWE Calculator', [...])` with nav links: Home, About, ASD, Basic Calculator, XPY Calculator, QWE.
- **Title tag**: `QWE - My Calculator`

### CVXZ Calculator (`cvxz.html`)

- **Purpose**: Informational page describing the CVXZ Calculator (no calculation logic).
- **Location**: Project root
- **CSS**: `assets/styles/app.css`, `assets/styles/cvxz.css`
- **Scripts**: `assets/scripts/components/Header.js` (defer), `assets/scripts/cvxz.js` (defer)
- **Key DOM elements**:
  - `<div id="header-container">`
  - `<section id="cvxz-content">` — heading "CVXZ Calculator", two descriptive paragraphs, action buttons
  - `<div id="cvxz-actions">` — links: `#btn-home` → `index.html`, `#btn-start` → basics calculator, `#btn-uyt` → UYT calculator
  - `<section id="cvxz-info">` — "CVXZ Calculator Features" heading with a `<ul>` feature list
- **Script behavior**: `cvxz.js` declares an unused `const TYU = 'TYU'` at the top, then calls `renderHeader('header-container', 'CVXZ Calculator', [...])` with nav links: Home, About, ASD, Basic Calculator, XPY Calculator.
- **Title tag**: `CVXZ - My Calculator`

### NNN Calculator (`nnn.html`)

- **Purpose**: Informational page describing the NNN Calculator (no calculation logic).
- **Location**: Project root
- **CSS**: `assets/styles/app.css`, `assets/styles/nnn.css`
- **Scripts**: `assets/scripts/components/Header.js` (defer), `assets/scripts/nnn.js` (defer)
- **Key DOM elements**:
  - `<div id="header-container">`
  - `<section id="nnn-content">` — heading "NNN Calculator", two descriptive paragraphs, action buttons
  - `<div id="nnn-actions">` — links: `#btn-home` → `index.html`, `#btn-start` → basics calculator, `#btn-uyt` → UYT calculator
  - `<section id="nnn-info">` — "NNN Calculator Features" heading with a `<ul>` feature list
- **Script behavior**: `nnn.js` calls `renderHeader('header-container', 'NNN Calculator', [...])` with nav links: Home, About, ASD, Basic Calculator, XPY Calculator.
- **Title tag**: `NNN - My Calculator`

### SDSSA Calculator (`sdssa.html`)

- **Purpose**: Informational page describing the SDSSA Calculator for statistical data analysis (no calculation logic).
- **Location**: Project root
- **CSS**: `assets/styles/app.css`, `assets/styles/sdssa.css`
- **Scripts**: `assets/scripts/components/Header.js` (defer), `assets/scripts/sdssa.js` (defer) — **Note**: `sdssa.js` is referenced in the HTML but the file is currently empty (0 bytes) on disk. The header will not render on this page.
- **Key DOM elements**:
  - `<div id="header-container">`
  - `<section id="sdssa-content">` — heading "SDSSA Calculator", two descriptive paragraphs, action buttons
  - `<div id="sdssa-actions">` — links: `#btn-home` → `index.html`, `#btn-start` → basics calculator, `#btn-about` → `about.html`
  - `<section id="sdssa-info">` — "SDSSA Calculator Features" heading with a `<ul>` feature list (Statistical data analysis, Scientific calculation support, Data sampling functions, Precision mathematical functions, Fast and responsive design, Easy to use interface, Free to use)
- **Script behavior**: `sdssa.js` is empty — no `renderHeader()` call is made, so the `#header-container` div remains empty on this page.
- **Title tag**: `SDSSA - My Calculator`

### Basic Calculator (`basics-10-function-refactoring/index.html`)

- **Purpose**: 4-function arithmetic calculator (addition, subtraction, multiplication, division).
- **Location**: `basics-10-function-refactoring/` subdirectory (self-contained)
- **CSS**: `assets/styles/app.css` (local copy), `assets/styles/home.css`
- **Scripts** (loaded in this order, all with `defer`):
  1. `assets/scripts/vendor.js` — DOM element references and `outputResult()` helper
  2. `assets/scripts/components/Header.js` — shared header component (local copy)
  3. `assets/scripts/app.js` — calculation engine
- **Key DOM elements**:
  - `<div id="header-container">`
  - `<section id="calculator">` — calculator input area:
    - `<input type="number" id="input-number">` — number input field
    - `<div id="calc-actions">` — button container:
      - `<button id="btn-add">` — addition (+)
      - `<button id="btn-subtract">` — subtraction (−)
      - `<button id="btn-multiply">` — multiplication (*)
      - `<button id="btn-divide">` — division (/)
  - `<section id="results">` — results display:
    - `<h2 id="current-calculation">` — calculation expression display (e.g., "0+5")
    - `<h2>Result: <span id="current-result">` — numeric result display
- **Script behavior**: `vendor.js` defines `const` references for all DOM elements and the `outputResult(result, text)` function. `app.js` maintains calculator state (`currentResult`, `logEntry[]`, etc.), defines `calculation(type)` dispatch function, wrapper functions (`add`, `subtract`, `multiplication`, `division`), and attaches click event listeners to the four operation buttons. Also calls `renderHeader('header-container', 'The Unconventional Calculator', [...])` on `DOMContentLoaded` with nav links: Home, About, Basic Calculator, XPY Calculator.
- **Title tag**: `Calculator - My Calculator`

### XPY Calculator (`xpy/index.html`)

- **Purpose**: Exponentiation calculator — calculates X raised to the power of Y (X^Y).
- **Location**: `xpy/` subdirectory
- **CSS**: `../assets/styles/app.css` (shared from root), `assets/styles/xpy.css` (page-specific)
- **Scripts**: `../assets/scripts/components/Header.js` (defer, shared from root), `assets/scripts/xpy.js` (defer)
- **Key DOM elements**:
  - `<div id="header-container">`
  - `<section id="xpy-calculator">` — calculator area:
    - `<h2>XPY (X Power Y) Calculator</h2>` and description
    - `<div id="xpy-inputs">` — input container:
      - `<input type="number" id="input-base" placeholder="Base (X)">`
      - `<span id="power-symbol">^</span>`
      - `<input type="number" id="input-exponent" placeholder="Exponent (Y)">`
    - `<div id="xpy-actions">` — button container:
      - `<button id="btn-calculate">` — Calculate
      - `<button id="btn-clear">` — Clear
  - `<section id="results">` — results display:
    - `<h2 id="current-calculation">` — expression display (e.g., "2 ^ 3")
    - `<h2>Result: <span id="current-result">` — numeric result
- **Script behavior**: `xpy.js` defines `calculateXPY(base, exponent)` (returns `Math.pow`), `updateCalculationDisplay()`, `handleCalculate()` (with `isNaN` validation and `alert` on invalid input), `handleClear()`. Attaches click listeners to Calculate/Clear buttons and `keypress` Enter listeners on both inputs. Calls `renderHeader('header-container', 'My Calculator', [...])` on `DOMContentLoaded` with nav links: Home, About, Basic Calculator, XPY Calculator, UYT Calculator.
- **Title tag**: `XPY Calculator - My Calculator`

### UYT Calculator (`uyt/index.html`)

- **Purpose**: Yield calculator — calculates (U × Y) ÷ T.
- **Location**: `uyt/` subdirectory
- **CSS**: `../assets/styles/app.css` (shared from root), `assets/styles/uyt.css` (page-specific)
- **Scripts**: `../assets/scripts/components/Header.js` (defer, shared from root), `assets/scripts/uyt.js` (defer)
- **Key DOM elements**:
  - `<div id="header-container">`
  - `<section id="uyt-calculator">` — calculator area:
    - `<h2>UYT (U Yield T) Calculator</h2>` and description
    - `<div id="uyt-inputs">` — input container:
      - `<input type="number" id="input-u" placeholder="Value (U)">`
      - `<span id="multiply-symbol">×</span>`
      - `<input type="number" id="input-y" placeholder="Multiplier (Y)">`
      - `<span id="divide-symbol">÷</span>`
      - `<input type="number" id="input-t" placeholder="Divisor (T)">`
    - `<div id="uyt-actions">` — button container:
      - `<button id="btn-calculate">` — Calculate
      - `<button id="btn-clear">` — Clear
  - `<section id="results">` — results display:
    - `<h2 id="current-calculation">` — expression display (e.g., "(2 × 3) ÷ 4")
    - `<h2>Result: <span id="current-result">` — numeric result
- **Script behavior**: `uyt.js` defines `calculateUYT(u, y, t)` (returns `(u*y)/t`, throws on `t===0`), `updateCalculationDisplay()`, `handleCalculate()` (with `isNaN` validation, divide-by-zero check, try/catch), `handleClear()`. Attaches click listeners to Calculate/Clear buttons and `keypress` Enter listeners on all three inputs. Calls `renderHeader('header-container', 'My Calculator', [...])` on `DOMContentLoaded` with nav links: Home, About, Basic Calculator, XPY Calculator, UYT Calculator.
- **Title tag**: `UYT Calculator - My Calculator`

## Common Patterns

The following conventions are shared across all pages in the project:

- **Header mount point**: Every page includes `<div id="header-container"></div>` as the mount point for the shared header component rendered by `Header.js`.
- **Stylesheet order**: Every page loads `app.css` (shared global styles) first, then a page-specific stylesheet (e.g., `home.css`, `about.css`, `xpy.css`).
- **Script order**: Every page loads `Header.js` first (with `defer`), then a page-specific script (with `defer`). The basic calculator is the exception — it loads `vendor.js`, then `Header.js`, then `app.js` (all with `defer`).
- **Type-check guard**: Every page script (except `sdssa.js` which is empty) wraps its `renderHeader()` call in an `if (typeof renderHeader === 'function')` guard to prevent runtime errors if `Header.js` fails to load.
- **Root-level asset paths**: Root-level pages reference assets with `assets/styles/...` and `assets/scripts/...`.
- **Subdirectory asset paths**: Subdirectory pages (`xpy/`, `uyt/`) reference shared assets with `../assets/styles/...` and `../assets/scripts/...`.
- **Self-contained subdirectory**: The basic calculator subdirectory (`basics-10-function-refactoring/`) has its own local copy of `app.css` and `Header.js` for self-containment, so it uses relative paths (`assets/styles/...`, `assets/scripts/...`) without `../` prefixes.
- **Google Fonts**: All pages load Google Fonts (Roboto 400, 700) via a `<link>` tag from Google's CDN:

  ```html
  <link
    href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap"
    rel="stylesheet"
  />
  ```

- **Standard meta tags**: All pages include the standard meta tags in `<head>`:

  ```html
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  ```

