# UI Component Documentation

This document provides detailed reference material for the most complex and heavy UI components in the **my-calculator** project — a vanilla HTML/CSS/JS static website with no framework. Each section covers the component's file locations, HTML structure, JavaScript logic, and CSS styling.

## Table of Contents

1. [Header Component](#1-header-component)
2. [Gallery Cards + Modal](#2-gallery-cards--modal)
3. [Basic Calculator](#3-basic-calculator)
4. [XPY Calculator](#4-xpy-calculator)
5. [UYT Calculator](#5-uyt-calculator)
6. [Design System Reference](#6-design-system-reference)

---

## 1. Header Component

**File:** `assets/scripts/components/Header.js`

The Header component is a reusable, framework-free module that generates a `<header>` element with a title and optional navigation links. It is loaded on every page via a `<script defer>` tag and invoked inside a `DOMContentLoaded` listener.

### `createHeader(title, navLinks = [])`

Creates and returns an `<header>` HTMLElement containing an `<h1>` with the provided title. If `navLinks` is a non-empty array, a `<nav>` element is appended with one `<a>` per link.

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | `string` | Yes | — | The title to display in the header `<h1>` |
| `navLinks` | `Array<{label: string, href: string}>` | No | `[]` | Optional navigation links; each object becomes an `<a>` element |

**Returns:** `HTMLElement` — the constructed `<header>` element.

### `renderHeader(containerId, title, navLinks = [])`

Finds a container element by its ID, calls `createHeader()`, and appends the resulting header into that container. If the container is not found, logs an error to the console and returns early.

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `containerId` | `string` | Yes | — | The DOM ID of the container element to append the header into |
| `title` | `string` | Yes | — | The title to display in the header |
| `navLinks` | `Array<{label: string, href: string}>` | No | `[]` | Optional navigation links |

**Returns:** `void`

### `replaceHeader(title, navLinks = [])`

Replaces any existing `<header>` element on the page with a newly created header. If no `<header>` exists, the new header is prepended to `document.body`.

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | `string` | Yes | — | The title to display in the header |
| `navLinks` | `Array<{label: string, href: string}>` | No | `[]` | Optional navigation links |

**Returns:** `void`

### Module Export

The module uses a CommonJS export guard so it works both in the browser (as a plain `<script>` tag exposing global functions) and in Node.js (for potential testing):

```js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createHeader, renderHeader, replaceHeader };
}
```

### Usage Pattern

Each HTML page loads `Header.js` with `defer` **before** its page-specific script, then calls `renderHeader` inside a `DOMContentLoaded` listener:

```html
<script src="assets/scripts/components/Header.js" defer></script>
<script src="assets/scripts/home.js" defer></script>
```

```js
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

The `typeof renderHeader === 'function'` guard ensures the page does not throw if `Header.js` failed to load.

---

## 2. Gallery Cards + Modal

**Files:** `gallery.html` · `assets/scripts/gallery.js` · `assets/styles/gallery.css`

The gallery page displays all calculators as interactive cards in a responsive grid. Clicking a card opens a modal with details and a link to the calculator.

### HTML Structure

```html
<section id="gallery-grid">
  <article class="gallery-card" data-calc="Basic Calculator">
    <div class="card-icon">+/−</div>
    <h3 class="card-title">Basic Calculator</h3>
    <p class="card-desc">Perform addition, subtraction, multiplication, and division with a clean 10-function interface.</p>
    <a class="card-link" href="basics-10-function-refactoring/index.html">Open Calculator</a>
  </article>
  <!-- Additional cards: XPY, UYT, ASD, QWE (5 total) -->
</section>

<div id="modal-overlay" class="modal-overlay hidden">
  <div class="modal-content">
    <button id="modal-close" class="modal-close">×</button>
    <h3 id="modal-title"></h3>
    <p id="modal-desc"></p>
    <a id="modal-link" href="#">Open Calculator</a>
  </div>
</div>
```

### Gallery Cards

All 5 calculator cards rendered in the gallery grid:

| Card | data-calc | Icon | Link Target |
|---|---|---|---|
| Basic Calculator | `Basic Calculator` | `+/−` | `basics-10-function-refactoring/index.html` |
| XPY Calculator | `XPY Calculator` | `x^y` | `xpy/index.html` |
| UYT Calculator | `UYT Calculator` | `U→T` | `uyt/index.html` |
| ASD Calculator | `ASD Calculator` | `ASD` | `asd.html` |
| QWE Calculator | `QWE Calculator` | `QWE` | `qwe.html` |

### Modal Interaction Logic

The `gallery.js` script wires up the following interactions:

| Trigger | Action |
|---|---|
| Click on `.gallery-card` (not on `.card-link`) | Opens modal, populates title/desc/link from card data |
| Click on `#modal-close` button | Closes modal |
| Click on `#modal-overlay` (outside content) | Closes modal |
| Press `Escape` key | Closes modal |
| Click inside `.modal-content` | `event.stopPropagation()` prevents modal from closing |

Card click handler code:

```js
cards.forEach(function(card) {
  card.addEventListener('click', function(event) {
    if (event.target.classList.contains('card-link')) {
      return; // Let the link navigate normally
    }

    var calcName = card.getAttribute('data-calc') || '';
    var titleEl = card.querySelector('.card-title');
    var descEl = card.querySelector('.card-desc');
    var linkEl = card.querySelector('.card-link');

    modalTitle.textContent = titleEl ? titleEl.textContent : calcName;
    modalDesc.textContent = descEl ? descEl.textContent : '';
    if (linkEl) {
      modalLink.setAttribute('href', linkEl.getAttribute('href'));
    }

    modalOverlay.classList.remove('hidden');
  });
});
```

### Styles (gallery.css)

| Selector | Key Properties | Description |
|---|---|---|
| `#gallery-grid` | `display: grid; grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr)); gap: 1.5rem` | Responsive CSS grid |
| `.gallery-card` | `background: #f0f4f8; border: 1px solid #023d6d; border-radius: 10px; padding: 1.5rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s` | Card base style |
| `.gallery-card:hover` | `transform: translateY(-4px); box-shadow: 0 4px 12px rgba(0,0,0,0.15)` | Hover lift effect |
| `.modal-overlay` | `position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000` | Full-screen modal backdrop |
| `.modal-overlay.hidden` | `display: none` | Hidden state |
| `.modal-content` | `background: white; border-radius: 10px; padding: 2rem; max-width: 25rem; width: 90%; position: relative` | Modal dialog card |
| `.modal-close` | `position: absolute; top: 0.5rem; right: 0.75rem; font-size: 1.5rem; cursor: pointer; border: none; background: none` | Close (×) button |
| `@media (max-width: 600px)` | `#gallery-grid { grid-template-columns: 1fr; }` | Collapses grid to single column on mobile |

---

## 3. Basic Calculator

**Directory:** `basics-10-function-refactoring/`
**Files:** `index.html` · `assets/scripts/app.js` · `assets/scripts/vendor.js` · `assets/scripts/components/Header.js`

The Basic Calculator is a four-function calculator (add, subtract, multiply, divide) that maintains a calculation log.

### HTML Structure

```html
<section id="calculator">
  <input type="number" id="input-number" />
  <div id="calc-actions">
    <button type="button" id="btn-add">+</button>
    <button type="button" id="btn-subtract">-</button>
    <button type="button" id="btn-multiply">*</button>
    <button type="button" id="btn-divide">/</button>
  </div>
</section>
<section id="results">
  <h2 id="current-calculation">0</h2>
  <h2>Result: <span id="current-result">0</span></h2>
</section>
```

### Script Loading Order (all with `defer`)

1. `vendor.js` — DOM references + output helper
2. `components/Header.js` — Shared header component
3. `app.js` — Core calculator logic

### vendor.js — DOM References & Output Helper

Table of DOM element references:

| Variable | DOM Element |
|---|---|
| `userInput` | `#input-number` |
| `addBtn` | `#btn-add` |
| `subtractBtn` | `#btn-subtract` |
| `multiplyBtn` | `#btn-multiply` |
| `divideBtn` | `#btn-divide` |
| `currentResultOutput` | `#current-result` |
| `currentCalculationOutput` | `#current-calculation` |

Output helper function:

```js
function outputResult(result, text) {
  currentResultOutput.textContent = result;
  currentCalculationOutput.textContent = text;
}
```

### app.js — Core Calculator Logic

Global state variables:

| Variable | Initial Value | Description |
|---|---|---|
| `defaultResult` | `0` | Default starting result (const) |
| `currentResult` | `0` | Current accumulated result |
| `initialResult` | `undefined` | Snapshot of result before operation |
| `operatorType` | `undefined` | Current operation type string (+, -, *, /) |
| `inputUser` | `grtUserInput()` | Current user input (read at load time) |
| `description` | `undefined` | Human-readable calculation string |
| `logEntry` | `[]` | Array of operation log entry objects |

Functions:

| Function | Description |
|---|---|
| `grtUserInput()` | Returns `userInput.value` (note: typo — should be `getUserInput`) |
| `calculationDescrip(str1, str2, str3)` | Concatenates three strings into a description |
| `output()` | Calls `outputResult(currentResult, description)` and `console.log(logEntry)` |
| `writeLog(operation, result)` | Pushes a log entry object `{operation, result, operand}` to `logEntry[]`, then calls `output()` |
| `calculation(calculationType)` | Reads input, validates with `parseInt`, performs the operation (`ADD`, `SUBT`, `MULTI`, `DIVID`) on `currentResult`, builds description, calls `writeLog` |
| `add()` | Wrapper calling `calculation('ADD')` |
| `subtract()` | Wrapper calling `calculation('SUBT')` |
| `multiplication()` | Wrapper calling `calculation('MULTI')` |
| `division()` | Wrapper calling `calculation('DIVID')` |

Event listeners:

```js
addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiplication);
divideBtn.addEventListener('click', division);
```

### Calculation Flow

1. User enters a number in `#input-number`
2. User clicks an operation button (+, -, *, /)
3. The wrapper function calls `calculation(calculationType)`
4. `calculation()` reads the input via `grtUserInput()`, validates with `parseInt()`
5. The operation is applied to `currentResult` (add/subtract/multiply/divide)
6. A description string is built and a log entry is pushed to `logEntry[]`
7. `output()` updates the DOM via `outputResult()`

---

## 4. XPY Calculator

**Directory:** `xpy/`
**Files:** `index.html` · `assets/scripts/xpy.js` · `assets/styles/xpy.css`

The XPY Calculator computes `base ^ exponent` (exponentiation) using `Math.pow()`.

### HTML Structure

```html
<section id="xpy-calculator">
  <h2>XPY (X Power Y) Calculator</h2>
  <p>Calculate X raised to the power of Y</p>
  <div id="xpy-inputs">
    <input type="number" id="input-base" placeholder="Base (X)" />
    <span id="power-symbol">^</span>
    <input type="number" id="input-exponent" placeholder="Exponent (Y)" />
  </div>
  <div id="xpy-actions">
    <button type="button" id="btn-calculate">Calculate</button>
    <button type="button" id="btn-clear">Clear</button>
  </div>
</section>
<section id="results">
  <h2 id="current-calculation">0</h2>
  <h2>Result: <span id="current-result">0</span></h2>
</section>
```

### Script (xpy.js)

Well-documented with JSDoc comments. Key functions:

| Function | Signature | Description |
|---|---|---|
| `calculateXPY` | `(base, exponent) → number` | Returns `Math.pow(base, exponent)` |
| `updateCalculationDisplay` | `(base, exponent, result) → void` | Sets `textContent` on result elements |
| `handleCalculate` | `() → void` | Parses both inputs, validates with `isNaN`, calls `calculateXPY` and `updateCalculationDisplay` |
| `handleClear` | `() → void` | Resets all inputs and result display to defaults |

`calculateXPY` function:

```js
/**
 * Calculates X raised to the power of Y
 * @param {number} base - The base number (X)
 * @param {number} exponent - The exponent (Y)
 * @returns {number} The result of base^exponent
 */
function calculateXPY(base, exponent) {
  return Math.pow(base, exponent);
}
```

**Keyboard support:** Pressing `Enter` on either `#input-base` or `#input-exponent` triggers `handleCalculate()`.

**Header:** Calls `renderHeader` with title `'My Calculator'` and 5 nav links.

### Styles (xpy.css)

| Selector | Key Properties | Description |
|---|---|---|
| `#xpy-calculator` | `margin: 2rem auto; width: 40rem; max-width: 90%; border: 1px solid #023d6d; border-radius: 10px; padding: 2rem; text-align: center` | Main calculator card |
| `#xpy-inputs` | `display: flex; align-items: center; justify-content: center; gap: 1rem; margin: 2rem 0` | Horizontal input layout |
| `#xpy-inputs input` | `font-size: 2rem; border: 2px solid #023d6d; width: 8rem; padding: 0.5rem; text-align: center; border-radius: 5px` | Large number inputs |
| `#power-symbol` | `font-size: 2rem; font-weight: bold; color: #023d6d` | Bold `^` symbol |
| `#xpy-actions` | `display: flex; justify-content: center; gap: 1rem; margin-top: 1rem` | Horizontal button layout |
| `#xpy-actions button` | `background: #023d6d; color: white; border: 1px solid #023d6d; padding: 1rem 2rem; border-radius: 5px; font-size: 1.1rem; transition: background 0.2s, border-color 0.2s` | Primary blue calculate button |
| `#xpy-actions button:hover, #xpy-actions button:active` | `background: #084f88; border-color: #084f88` | Hover/active state |
| `#btn-clear` | `background: #6c757d !important; border-color: #6c757d !important` | Gray clear button (uses `!important`) |
| `#btn-clear:hover, #btn-clear:active` | `background: #5a6268 !important; border-color: #5a6268 !important` | Clear button hover state |

---

## 5. UYT Calculator

**Directory:** `uyt/`
**Files:** `index.html` · `assets/scripts/uyt.js` · `assets/styles/uyt.css`

The UYT Calculator computes `(u × y) ÷ t`, with division-by-zero protection.

### HTML Structure

```html
<section id="uyt-calculator">
  <h2>UYT (U Yield T) Calculator</h2>
  <p>Calculate U multiplied by Y and divided by T</p>
  <div id="uyt-inputs">
    <input type="number" id="input-u" placeholder="Value (U)" />
    <span id="multiply-symbol">×</span>
    <input type="number" id="input-y" placeholder="Multiplier (Y)" />
    <span id="divide-symbol">÷</span>
    <input type="number" id="input-t" placeholder="Divisor (T)" />
  </div>
  <div id="uyt-actions">
    <button type="button" id="btn-calculate">Calculate</button>
    <button type="button" id="btn-clear">Clear</button>
  </div>
</section>
<section id="results">
  <h2 id="current-calculation">0</h2>
  <h2>Result: <span id="current-result">0</span></h2>
</section>
```

### Script (uyt.js)

Well-documented with JSDoc comments. Key functions:

| Function | Signature | Description |
|---|---|---|
| `calculateUYT` | `(u, y, t) → number` | Returns `(u * y) / t`. **Throws `Error`** if `t === 0` |
| `updateCalculationDisplay` | `(u, y, t, result) → void` | Sets `textContent` on result elements |
| `handleCalculate` | `() → void` | Validates 3 inputs, checks `t === 0`, wraps `calculateUYT` in `try/catch` |
| `handleClear` | `() → void` | Resets all inputs and result display to defaults |

`calculateUYT` function:

```js
/**
 * Calculates U multiplied by Y and divided by T
 * @param {number} u - The U value
 * @param {number} y - The Y value (multiplier)
 * @param {number} t - The T value (divisor)
 * @returns {number} The result of (u * y) / t
 */
function calculateUYT(u, y, t) {
  if (t === 0) {
    throw new Error('Cannot divide by zero');
  }
  return (u * y) / t;
}
```

**Keyboard support:** Pressing `Enter` on any of the three inputs (`#input-u`, `#input-y`, `#input-t`) triggers `handleCalculate()`.

**Header:** Calls `renderHeader` with title `'My Calculator'` and 5 nav links.

### Styles (uyt.css)

| Selector | Key Properties | Description |
|---|---|---|
| `#uyt-calculator` | `margin: 2rem auto; width: 40rem; max-width: 90%; border: 1px solid #023d6d; border-radius: 10px; padding: 2rem; text-align: center` | Main calculator card |
| `#uyt-inputs` | `display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin: 2rem 0; flex-wrap: wrap` | Wrapping input layout |
| `#uyt-inputs input` | `font-size: 1.5rem; border: 2px solid #023d6d; width: 6rem; padding: 0.5rem; text-align: center; border-radius: 5px` | Number inputs (smaller than XPY) |
| `#multiply-symbol` | `font-size: 1.5rem; font-weight: bold; color: #023d6d` | Bold `×` symbol |
| `#divide-symbol` | `font-size: 1.5rem; font-weight: bold; color: #023d6d` | Bold `÷` symbol |
| `#uyt-actions` | `display: flex; justify-content: center; gap: 1rem; margin-top: 1rem` | Horizontal button layout |
| `#uyt-actions button` | `background: #023d6d; color: white; border: 1px solid #023d6d; padding: 1rem 2rem; border-radius: 5px; font-size: 1.1rem; transition: background 0.2s, border-color 0.2s` | Primary blue calculate button |
| `#uyt-actions button:hover, #uyt-actions button:active` | `background: #084f88; border-color: #084f88` | Hover/active state |
| `#btn-clear` | `background: #6c757d !important; border-color: #6c757d !important` | Gray clear button (uses `!important`) |
| `#btn-clear:hover, #btn-clear:active` | `background: #5a6268 !important; border-color: #5a6268 !important` | Clear button hover state |

---

## 6. Design System Reference

### Color Palette

| Token | Value | Usage |
|---|---|---|
| Primary Blue | `#023d6d` | Headers, borders, buttons, text, card outlines |
| Primary Blue Hover | `#084f88` | Button hover/active state |
| Card Background | `#f0f4f8` | Feature list items, gallery cards |
| Green | `#28a745` | XPY button (home page) |
| Green Hover | `#218838` | XPY button hover |
| Orange | `#fd7e14` | UYT button (home page) |
| Orange Hover | `#e56b0a` | UYT button hover |
| Purple | `#6f42c1` | ASD button (home page) |
| Purple Hover | `#5a32a3` | ASD button hover |
| Gray | `#6c757d` | Home/Back button, Clear button |
| Gray Hover | `#5a6268` | Home/Back button, Clear button hover |
| White | `#ffffff` | Header text, button text, nav link borders |
| Modal Backdrop | `rgba(0, 0, 0, 0.5)` | Gallery modal overlay background |
| Header Shadow | `rgba(0, 0, 0, 0.26)` | Header box-shadow |
| Nav Link Hover | `rgba(255, 255, 255, 0.2)` | Semi-transparent white on nav links |

### Shared Layout Patterns

| Pattern | Value | Applied To |
|---|---|---|
| Card border-radius | `10px` | `#calculator`, `#results`, `#xpy-calculator`, `#uyt-calculator`, `.gallery-card`, `.modal-content` |
| Button border-radius | `5px` | All `<button>` elements, `<a>` nav links, feature badges |
| Content card max-width | `40rem` (with `max-width: 90%` fallback) | All main content sections |
| Hover transition | `0.2s` | All buttons, nav links, gallery cards |
| Box-sizing | `border-box` (universal) | All elements |

### Typography

| Element | Font | Size |
|---|---|---|
| Base | Roboto, open-sans | Inherited |
| `#calculator input` (Basic) | Roboto (inherited) | `3rem` |
| `#xpy-inputs input` (XPY) | Roboto (inherited) | `2rem` |
| `#uyt-inputs input` (UYT) | Roboto (inherited) | `1.5rem` |
| `header nav a` | Roboto (inherited) | `1rem` |
| Content paragraphs | Roboto (inherited) | `1.1rem` |

