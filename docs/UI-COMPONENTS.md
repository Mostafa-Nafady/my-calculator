# UI Components Documentation

## 1. Overview

This project is a **multi-page web-based calculator suite** built entirely with **vanilla HTML, CSS, and JavaScript**. There is no framework (React, Vue, etc.) and no build tooling (Webpack, Vite, etc.) — every page is a static `.html` file that can be opened directly in a browser or served from any static file server.

### Tech Stack

| Technology | Details |
|---|---|
| HTML5 | Semantic markup, one file per page |
| CSS3 | Plain stylesheets, no preprocessor |
| JavaScript (ES5+) | No modules/bundlers; scripts loaded via `<script defer>` |
| Font | [Roboto](https://fonts.google.com/specimen/Roboto) from Google Fonts |
| Architecture | Shared header component injected at runtime; page-specific scripts and styles per route |

### Shared Design System

All pages share a consistent visual language:

| Token | Value |
|---|---|
| Primary color | `#023d6d` |
| Primary hover | `#084f88` |
| Card background | `#f0f4f8` |
| Card border-radius | `10px` |
| Button / link border-radius | `5px` |
| Content card max-width | `40rem` |
| Hover transition duration | `0.2s` |

---

## 2. Project Structure

```
.
├── index.html                          # Home page
├── about.html                          # About page
├── gallery.html                        # Gallery page
├── asd.html                             # ASD calculator page
├── cvxz.html                            # CVXZ calculator page
├── nnn.html                             # NNN calculator page
├── qwe.html                             # QWE calculator page
├── sdssa.html                           # SDSSA calculator page (assets missing — see Known Issues)
│
├── assets/
│   ├── styles/
│   │   ├── app.css                      # Global stylesheet (loaded by every page)
│   │   ├── home.css                     # Home page styles
│   │   ├── about.css                    # About page styles
│   │   ├── gallery.css                  # Gallery page styles
│   │   ├── asd.css                      # ASD page styles
│   │   ├── cvxz.css                     # CVXZ page styles
│   │   ├── nnn.css                      # NNN page styles
│   │   └── qwe.css                      # QWE page styles
│   └── scripts/
│       ├── components/
│       │   └── Header.js               # Shared header component
│       ├── home.js                      # Home page script
│       ├── about.js                     # About page script
│       ├── gallery.js                   # Gallery page script
│       ├── asd.js                       # ASD page script
│       ├── cvxz.js                      # CVXZ page script
│       ├── nnn.js                       # NNN page script
│       └── qwe.js                       # QWE page script
│
├── basics-10-function-refactoring/      # Sub-calculator: Basic Calculator
│   ├── index.html
│   ├── home.html
│   └── assets/
│       ├── styles/
│       │   ├── app.css                  # Duplicate of root app.css
│       │   └── home.css
│       └── scripts/
│           ├── vendor.js                # DOM references + output helper
│           ├── app.js                   # Core calculator logic
│           └── components/
│               └── Header.js            # Copy of shared header
│
├── xpy/                                 # Sub-calculator: XPY Calculator
│   ├── index.html
│   └── assets/
│       ├── styles/
│       │   └── xpy.css
│       └── scripts/
│           └── xpy.js
│
└── uyt/                                 # Sub-calculator: UYT Calculator
    ├── index.html
    └── assets/
        ├── styles/
        │   └── uyt.css
        └── scripts/
            └── uyt.js
```

---

## 3. Shared Header Component

**File:** `assets/scripts/components/Header.js`

The header component provides a reusable `<header>` element with a title and optional navigation links. It is loaded by every root-level page and by the sub-calculator pages.

### Functions

#### `createHeader(title, navLinks = [])`

Creates and returns an `<header>` `HTMLElement` containing an `<h1>` with the provided title. If `navLinks` is a non-empty array, a `<nav>` element is appended with one `<a>` per link.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Text for the `<h1>` heading |
| `navLinks` | `Array<{label: string, href: string}>` | `[]` | Optional navigation links |

**Returns:** `HTMLElement` — the constructed `<header>` element.

#### `renderHeader(containerId, title, navLinks = [])`

Finds a container element by its ID, calls `createHeader()`, and appends the resulting header into that container. If the container is not found, an error is logged to the console and the function returns early.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `containerId` | `string` | — | The DOM ID of the container to inject the header into |
| `title` | `string` | — | Text for the `<h1>` heading |
| `navLinks` | `Array<{label: string, href: string}>` | `[]` | Optional navigation links |

**Returns:** `void`

#### `replaceHeader(title, navLinks = [])`

Replaces any existing `<header>` element on the page with a newly created header. If no `<header>` exists, the new header is prepended to `document.body`.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Text for the `<h1>` heading |
| `navLinks` | `Array<{label: string, href: string}>` | `[]` | Optional navigation links |

**Returns:** `void`

### Module Export

The module uses a CommonJS export guard so it can be required in Node.js environments while still working as a plain browser script:

```js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createHeader, renderHeader, replaceHeader };
}
```

### Usage Pattern

Each HTML page loads `Header.js` with `defer` **before** its page-specific script, then calls `renderHeader` inside a `DOMContentLoaded` listener:

```html
<!-- In the <head> of every page -->
<script src="assets/scripts/components/Header.js" defer></script>
<script src="assets/scripts/home.js" defer></script>
```

```js
// Inside the page-specific script (e.g., home.js)
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

## 4. Global Styles (app.css)

**File:** `assets/styles/app.css`

This stylesheet is loaded by every page in the application. It establishes the base reset, typography, header styling, and the shared calculator card layout.

> **Note:** `basics-10-function-refactoring/assets/styles/app.css` is a byte-for-byte duplicate of the root `app.css`.

### Key Selectors

| Selector | Properties | Description |
|---|---|---|
| `*` | `box-sizing: border-box` | Universal box-sizing reset |
| `html` | `font-family: 'Roboto', open-sans` | Base font stack |
| `body` | `margin: 0` | Remove default body margin |
| `header` | `background: #023d6d; color: white; padding: 1rem; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.26); width: 100%` | Full-width primary-blue header bar |
| `header nav` | `margin-top: 0.5rem` | Spacing between title and nav |
| `header nav a` | `color: white; text-decoration: none; font-size: 1rem; padding: 0.5rem 1rem; border: 1px solid white; border-radius: 5px; transition: background 0.2s` | Nav link pills with white outline |
| `header nav a:hover` | `background: rgba(255, 255, 255, 0.2)` | Semi-transparent white hover |
| `#calculator` | `margin: 2rem auto; width: 40rem; max-width: 90%; border: 1px solid #023d6d; border-radius: 10px; padding: 1rem; color: #023d6d` | Main calculator card |
| `#calculator input` | `font-size: 3rem; border: 2px solid #023d6d; width: 10rem; padding: 0.15rem; margin: auto; display: block; color: #023d6d; text-align: center` | Large centered number input |
| `#calculator input:focus` | `outline: none` | Remove focus outline |
| `#calculator button` | `font: inherit; background: #023d6d; color: white; border: 1px solid #023d6d; padding: 1rem; cursor: pointer` | Primary blue calculator buttons |
| `#calculator button:hover, #calculator button:active` | `background: #084f88; border-color: #084f88` | Hover/active state |
| `#calc-actions button` | `width: 4rem` | Fixed-width action buttons |
| `#calc-actions` | `margin-top: 1rem; text-align: center` | Action button container |
| `#results` | `margin: 2rem auto; width: 40rem; max-width: 90%; border: 1px solid #023d6d; border-radius: 10px; padding: 1rem; color: #023d6d; text-align: center` | Centered results display card |

### Example CSS

```css
header {
  background: #023d6d;
  color: white;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  width: 100%;
}

header nav a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid white;
  border-radius: 5px;
  transition: background 0.2s;
}

header nav a:hover {
  background: rgba(255, 255, 255, 0.2);
}

#calculator {
  margin: 2rem auto;
  width: 40rem;
  max-width: 90%;
  border: 1px solid #023d6d;
  border-radius: 10px;
  padding: 1rem;
  color: #023d6d;
}
```

---

## 5. Page: Home (index.html)

**Files:** `index.html` · `assets/scripts/home.js` · `assets/styles/home.css`

The home page is the landing page for the calculator suite. It introduces the project and provides navigation buttons to each calculator.

### HTML Structure

```html
<div id="header-container"></div>

<section id="home-content">
  <h2>Welcome to My Calculator</h2>
  <p>Description of the calculator suite…</p>

  <div id="home-actions">
    <a id="btn-start" href="basics-10-function-refactoring/index.html">Basic Calculator</a>
    <a id="btn-xpy" href="xpy/index.html">XPY Calculator</a>
    <a id="btn-uyt" href="uyt/index.html">UYT Calculator</a>
    <a id="btn-asd" href="asd.html">ASD</a>
    <a id="btn-qwe" href="qwe.html">QWE</a>
  </div>
</section>

<section id="features">
  <h3>Features</h3>
  <ul>
    <li>Feature 1</li>
    <li>Feature 2</li>
    <!-- …8 feature badges total -->
  </ul>
</section>
```

### Script (`assets/scripts/home.js`)

Calls `renderHeader` with the title `'Welcome to My Calculator'` and 6 navigation links:

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

### Styles (`assets/styles/home.css`)

| Selector | Key Properties | Description |
|---|---|---|
| `#home-content` | `width: 40rem; max-width: 90%; border: 1px solid #023d6d; border-radius: 10px; padding: 2rem; text-align: center` | Main content card |
| `#btn-start` | `background: #023d6d; color: white; border-radius: 5px; transition: background 0.2s` | Primary blue button → Basic Calculator |
| `#btn-xpy` | `background: #28a745; color: white; border-radius: 5px` | Green button → XPY Calculator |
| `#btn-uyt` | `background: #fd7e14; color: white; border-radius: 5px` | Orange button → UYT Calculator |
| `#btn-asd` | `background: #6f42c1; color: white; border-radius: 5px` | Purple button → ASD page |
| `#features` | `width: 40rem; max-width: 90%; border: 1px solid #023d6d; border-radius: 10px; padding: 1.5rem` | Features section card |
| `#features ul` | `list-style: none; display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem` | Flex-wrap badge list |
| `#features li` | `background: #f0f4f8; padding: 0.5rem 1rem; border-radius: 5px; border: 1px solid #023d6d; font-weight: bold` | Feature badge items |

### Button Color Summary

| Button ID | Color | Hover Color | Target |
|---|---|---|---|
| `#btn-start` | `#023d6d` | `#084f88` | `basics-10-function-refactoring/index.html` |
| `#btn-xpy` | `#28a745` | `#218838` | `xpy/index.html` |
| `#btn-uyt` | `#fd7e14` | `#e56b0a` | `uyt/index.html` |
| `#btn-asd` | `#6f42c1` | `#5a32a3` | `asd.html` |
| `#btn-qwe` | — | — | `qwe.html` |

---

## 6. Page: About (about.html)

**Files:** `about.html` · `assets/scripts/about.js` · `assets/styles/about.css`

The about page describes the calculator project and lists key benefits.

### HTML Structure

```html
<div id="header-container"></div>

<section id="about-content">
  <h2>About My Calculator</h2>
  <p>Description paragraph 1…</p>
  <p>Description paragraph 2…</p>

  <div id="about-actions">
    <a id="btn-home" href="index.html">Home</a>
    <a id="btn-start" href="basics-10-function-refactoring/index.html">Basic Calculator</a>
    <a id="btn-uyt" href="uyt/index.html">UYT Calculator</a>
  </div>
</section>

<section id="about-info">
  <h3>Benefits</h3>
  <ul>
    <li>Benefit 1</li>
    <!-- …6 benefit items total -->
  </ul>
</section>
```

### Script (`assets/scripts/about.js`)

Calls `renderHeader` with the title `'About My Calculator'` and 5 navigation links:

```js
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'About My Calculator', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'ASD', href: 'asd.html' },
      { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' }
    ]);
  }
});
```

### Styles (`assets/styles/about.css`)

Mirrors the `home.css` pattern with the following differences:

| Selector | Key Properties | Description |
|---|---|---|
| `#about-content` | Same card pattern as `#home-content` | Main content card |
| `#btn-home` | `background: #6c757d; color: white` | Gray "back to home" button |
| `#btn-start` | `background: #023d6d` | Blue button (same as home) |
| `#btn-uyt` | `background: #fd7e14` | Orange button (same as home) |
| `#about-info li` | Stacked vertical cards (block layout, not flex) | Vertical benefit list |

---

## 7. Page: Gallery (gallery.html)

**Files:** `gallery.html` · `assets/scripts/gallery.js` · `assets/styles/gallery.css`

The gallery page displays all calculators as interactive cards in a responsive grid. Clicking a card opens a modal with details and a link to the calculator.

### HTML Structure

```html
<div id="header-container"></div>

<section id="gallery-intro">
  <h2>Calculator Gallery</h2>
  <p>Browse all available calculators…</p>
</section>

<section id="gallery-grid">
  <article class="gallery-card" data-calc="basic">
    <div class="card-icon">🧮</div>
    <h3 class="card-title">Basic Calculator</h3>
    <p class="card-desc">A simple four-function calculator.</p>
    <a class="card-link" href="basics-10-function-refactoring/index.html">Open</a>
  </article>
  <!-- Additional cards: XPY, UYT, ASD, QWE (5 total) -->
</section>

<!-- Modal -->
<div id="modal-overlay" class="modal-overlay hidden">
  <div class="modal-content">
    <button id="modal-close" class="modal-close">×</button>
    <h3 id="modal-title"></h3>
    <p id="modal-desc"></p>
    <a id="modal-link" href="#">Open Calculator</a>
  </div>
</div>
```

### Script (`assets/scripts/gallery.js`)

The script performs two tasks:

1. **Renders the header** with title `'Calculator Gallery'` and 6 nav links.
2. **Wires up gallery card interactivity** — clicking a card opens a modal populated with the card's data.

#### Modal Behavior

| Action | Result |
|---|---|
| Click a `.gallery-card` (not the `.card-link`) | Populates `#modal-title`, `#modal-desc`, `#modal-link` from the card's child elements and `data-calc` attribute; removes `hidden` class from `#modal-overlay` |
| Click `#modal-close` button | Calls `closeModal()` — adds `hidden` class back to `#modal-overlay` |
| Click `#modal-overlay` background (`event.target === modalOverlay`) | Closes modal |
| Press `Escape` key | Closes modal |
| Click inside `.modal-content` | `event.stopPropagation()` prevents modal from closing |

```js
// Card click handler
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

### Styles (`assets/styles/gallery.css`)

| Selector | Key Properties | Description |
|---|---|---|
| `#gallery-grid` | `display: grid; grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr)); gap: 1.5rem` | Responsive CSS grid |
| `.gallery-card` | `background: #f0f4f8; border: 1px solid #023d6d; border-radius: 10px; padding: 1.5rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s` | Card base style |
| `.gallery-card:hover` | `transform: translateY(-4px); box-shadow: 0 4px 12px rgba(0,0,0,0.15)` | Hover lift effect |
| `.modal-overlay` | `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center` | Full-screen modal backdrop |
| `.modal-overlay.hidden` | `display: none` | Hidden state |
| `.modal-content` | `background: white; border-radius: 10px; padding: 2rem; max-width: 25rem; position: relative` | Modal dialog card |
| `.modal-close` | `position: absolute; top: 0.5rem; right: 0.75rem; font-size: 1.5rem; cursor: pointer; border: none; background: none` | Close (×) button |
| `@media (max-width: 600px)` | `#gallery-grid { grid-template-columns: 1fr; }` | Collapses grid to single column on mobile |

---

## 8. Calculator Pages (asd, cvxz, nnn, qwe, sdssa)

These five pages follow an **identical template**. Each page has a content section, action buttons, and a feature info list.

### Shared HTML Pattern

```html
<div id="header-container"></div>

<section id="<name>-content">
  <h2><Name> Calculator</h2>
  <p>Description paragraph 1…</p>
  <p>Description paragraph 2…</p>

  <div id="<name>-actions">
    <a id="btn-home" href="index.html">Home</a>
    <a id="btn-start" href="basics-10-function-refactoring/index.html">Basic Calculator</a>
    <a id="btn-uyt" href="uyt/index.html">UYT Calculator</a>
    <!-- or <a id="btn-about" href="about.html">About</a> -->
  </div>
</section>

<section id="<name>-info">
  <h3>Features</h3>
  <ul>
    <li>Feature 1</li>
    <!-- …vertical feature list -->
  </ul>
</section>
```

### Shared Script Pattern

Each page-specific JS file calls `renderHeader` with the calculator name as the title inside a `DOMContentLoaded` listener. `cvxz.js` and `qwe.js` additionally declare a `const TYU = 'TYU'` constant at the top of the file.

### Shared CSS Pattern

Each CSS file (`asd.css`, `cvxz.css`, `nnn.css`, `qwe.css`) follows the same structure as `about.css` — a centered content card, colored action buttons, and a vertical (non-flex) feature list.

### Page Reference Table

| Page | HTML File | Script File | Style File | Header Title | Action Buttons |
|---|---|---|---|---|---|
| ASD | `asd.html` | `assets/scripts/asd.js` | `assets/styles/asd.css` | `ASD Calculator` | btn-home (gray), btn-start (blue), btn-uyt (orange) |
| CVXZ | `cvxz.html` | `assets/scripts/cvxz.js` | `assets/styles/cvxz.css` | `CVXZ Calculator` | btn-home (gray), btn-start (blue), btn-uyt (orange) |
| NNN | `nnn.html` | `assets/scripts/nnn.js` | `assets/styles/nnn.css` | `NNN Calculator` | btn-home (gray), btn-start (blue), btn-uyt (orange) |
| QWE | `qwe.html` | `assets/scripts/qwe.js` | `assets/styles/qwe.css` | `QWE Calculator` | btn-home (gray), btn-start (blue), btn-about (green) |
| SDSSA | `sdssa.html` | `assets/scripts/sdssa.js` ⚠️ | `assets/styles/sdssa.css` ⚠️ | `SDSSA Calculator` | btn-home (gray), btn-start (blue), btn-uyt (orange) |

> ⚠️ **Missing files:** `sdssa.html` references `assets/scripts/sdssa.js` and `assets/styles/sdssa.css`, but neither file exists in the repository. See [Known Issues](#14-known-issues).

### Script Details

**`assets/scripts/asd.js`** — Calls `renderHeader('header-container', 'ASD Calculator', [...])` with 5 nav links.

**`assets/scripts/cvxz.js`** — Declares `const TYU = 'TYU'` at the top, then calls `renderHeader('header-container', 'CVXZ Calculator', [...])` with 5 nav links.

**`assets/scripts/nnn.js`** — Calls `renderHeader('header-container', 'NNN Calculator', [...])` with 5 nav links.

**`assets/scripts/qwe.js`** — Declares `const TYU = 'TYU'` at the top, then calls `renderHeader('header-container', 'QWE Calculator', [...])` with 6 nav links (includes a self-referencing QWE link).

---

## 9. Sub-Calculator: Basic Calculator (basics-10-function-refactoring/)

**Directory:** `basics-10-function-refactoring/`

The Basic Calculator is a four-function calculator (add, subtract, multiply, divide) that maintains a calculation log.

### HTML Structure (`basics-10-function-refactoring/index.html`)

```html
<section id="calculator">
  <input type="number" id="input-number" />

  <div id="calc-actions">
    <button id="btn-add">+</button>
    <button id="btn-subtract">-</button>
    <button id="btn-multiply">*</button>
    <button id="btn-divide">/</button>
  </div>
</section>

<section id="results">
  <h2 id="current-calculation"></h2>
  <h2>Result: <span id="current-result"></span></h2>
</section>
```

### Scripts (loaded with `defer` in order)

#### 1. `basics-10-function-refactoring/assets/scripts/vendor.js`

Provides DOM element references and an output helper function:

| Variable | DOM Element |
|---|---|
| `userInput` | `#input-number` |
| `addBtn` | `#btn-add` |
| `subtractBtn` | `#btn-subtract` |
| `multiplyBtn` | `#btn-multiply` |
| `divideBtn` | `#btn-divide` |
| `currentResultOutput` | `#current-result` |
| `currentCalculationOutput` | `#current-calculation` |

```js
function outputResult(result, text) {
  currentResultOutput.textContent = result;
  currentCalculationOutput.textContent = text;
}
```

#### 2. `basics-10-function-refactoring/assets/scripts/components/Header.js`

A copy of the shared header component (identical to `assets/scripts/components/Header.js`).

#### 3. `basics-10-function-refactoring/assets/scripts/app.js`

Core calculator logic with the following global state and functions:

**Global State:**

| Variable | Initial Value | Description |
|---|---|---|
| `defaultResult` | `0` | Default starting result |
| `currentResult` | `0` | Current accumulated result |
| `initialResult` | `0` | Snapshot of result before operation |
| `operatorType` | — | Current operation type string |
| `inputUser` | `grtUserInput()` | Current user input (read at load time) |
| `description` | — | Human-readable calculation string |
| `logEntry` | `[]` | Array of operation log entries |

**Functions:**

| Function | Description |
|---|---|
| `grtUserInput()` | Returns `userInput.value` (note: typo — should be `getUserInput`) |
| `calculationDescrip(str1, str2, str3)` | Concatenates three strings into a description |
| `output()` | Calls `outputResult(currentResult, description)` and `console.log` |
| `writeLog(operation, result)` | Pushes a log entry object to `logEntry[]` |
| `calculation(calculationType)` | Reads input, validates with `parseInt`, performs the operation (`ADD`, `SUBT`, `MULTI`, `DIVID`) on `currentResult`, builds description, calls `writeLog` |
| `add()` | Wrapper calling `calculation('ADD')` |
| `subtract()` | Wrapper calling `calculation('SUBT')` |
| `multiplication()` | Wrapper calling `calculation('MULTI')` |
| `division()` | Wrapper calling `calculation('DIVID')` |

**Event Listeners:**

```js
addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiplication);
divideBtn.addEventListener('click', division);
```

### Styles

| File | Description |
|---|---|
| `basics-10-function-refactoring/assets/styles/app.css` | Duplicate of root `assets/styles/app.css` |
| `basics-10-function-refactoring/assets/styles/home.css` | Styles for the `home.html` variant |

### Home Variant (`basics-10-function-refactoring/home.html`)

The `home.html` file in this subdirectory uses `replaceHeader()` instead of `renderHeader()` to inject the header, since it does not have a `#header-container` div.

---

## 10. Sub-Calculator: XPY Calculator (xpy/)

**Directory:** `xpy/`

The XPY Calculator computes `base ^ exponent` (exponentiation) using `Math.pow()`.

### HTML Structure (`xpy/index.html`)

```html
<section id="xpy-calculator">
  <h2>XPY Calculator</h2>
  <p>Calculate base raised to the power of exponent.</p>

  <div id="xpy-inputs">
    <input type="number" id="input-base" placeholder="Base" />
    <span id="power-symbol">^</span>
    <input type="number" id="input-exponent" placeholder="Exponent" />
  </div>

  <div id="xpy-actions">
    <button id="btn-calculate">Calculate</button>
    <button id="btn-clear">Clear</button>
  </div>
</section>

<section id="results">
  <h2 id="current-calculation"></h2>
  <h2>Result: <span id="current-result"></span></h2>
</section>
```

### Script (`xpy/assets/scripts/xpy.js`)

Well-documented with JSDoc comments. Key functions:

| Function | Signature | Description |
|---|---|---|
| `calculateXPY` | `(base, exponent) → number` | Returns `Math.pow(base, exponent)` |
| `updateCalculationDisplay` | `(base, exponent, result) → void` | Sets `textContent` on result elements |
| `handleCalculate` | `() → void` | Parses both inputs, validates with `isNaN`, calls `calculateXPY` and `updateCalculationDisplay` |
| `handleClear` | `() → void` | Resets all inputs and result display |

**Keyboard support:** Pressing `Enter` on either `#input-base` or `#input-exponent` triggers `handleCalculate()`.

**Header:** Calls `renderHeader` with 5 nav links.

```js
/**
 * Calculates base raised to the power of exponent.
 * @param {number} base - The base value
 * @param {number} exponent - The exponent value
 * @returns {number} The result of base ^ exponent
 */
function calculateXPY(base, exponent) {
  return Math.pow(base, exponent);
}
```

### Styles (`xpy/assets/styles/xpy.css`)

| Selector | Key Properties | Description |
|---|---|---|
| `#xpy-inputs` | `display: flex; flex-direction: row; gap: 1rem; justify-content: center` | Horizontal input layout |
| `#xpy-inputs input` | `font-size: 2rem; width: 8rem; text-align: center; border: 2px solid #023d6d` | Large number inputs |
| `#power-symbol` | `font-size: 2rem; font-weight: bold; color: #023d6d` | Bold `^` symbol |
| `#xpy-actions` | `display: flex; gap: 1rem; justify-content: center` | Horizontal button layout |
| `#btn-calculate` | `background: #023d6d; color: white` | Primary blue calculate button |
| `#btn-clear` | `background: #6c757d !important; color: white` | Gray clear button (uses `!important`) |

---

## 11. Sub-Calculator: UYT Calculator (uyt/)

**Directory:** `uyt/`

The UYT Calculator computes `(u × y) ÷ t`, with division-by-zero protection.

### HTML Structure (`uyt/index.html`)

```html
<section id="uyt-calculator">
  <h2>UYT Calculator</h2>
  <p>Calculate (u × y) ÷ t.</p>

  <div id="uyt-inputs">
    <input type="number" id="input-u" placeholder="U" />
    <span id="multiply-symbol">×</span>
    <input type="number" id="input-y" placeholder="Y" />
    <span id="divide-symbol">÷</span>
    <input type="number" id="input-t" placeholder="T" />
  </div>

  <div id="uyt-actions">
    <button id="btn-calculate">Calculate</button>
    <button id="btn-clear">Clear</button>
  </div>
</section>

<section id="results">
  <h2 id="current-calculation"></h2>
  <h2>Result: <span id="current-result"></span></h2>
</section>
```

### Script (`uyt/assets/scripts/uyt.js`)

Well-documented with JSDoc comments. Key functions:

| Function | Signature | Description |
|---|---|---|
| `calculateUYT` | `(u, y, t) → number` | Returns `(u * y) / t`. **Throws `Error`** if `t === 0` |
| `updateCalculationDisplay` | `(u, y, t, result) → void` | Sets `textContent` on result elements |
| `handleCalculate` | `() → void` | Validates 3 inputs, checks `t === 0`, wraps `calculateUYT` in `try/catch` |
| `handleClear` | `() → void` | Resets all inputs and result display |

**Keyboard support:** Pressing `Enter` on any of the three inputs (`#input-u`, `#input-y`, `#input-t`) triggers `handleCalculate()`.

**Header:** Calls `renderHeader` with 5 nav links.

```js
/**
 * Calculates (u * y) / t.
 * @param {number} u - The first multiplicand
 * @param {number} y - The second multiplicand
 * @param {number} t - The divisor
 * @returns {number} The result of (u * y) / t
 * @throws {Error} When t is 0 (division by zero)
 */
function calculateUYT(u, y, t) {
  if (t === 0) {
    throw new Error('Cannot divide by zero');
  }
  return (u * y) / t;
}
```

### Styles (`uyt/assets/styles/uyt.css`)

| Selector | Key Properties | Description |
|---|---|---|
| `#uyt-inputs` | `display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center` | Wrapping input layout |
| `#uyt-inputs input` | `font-size: 1.5rem; width: 6rem; text-align: center; border: 2px solid #023d6d` | Number inputs (smaller than XPY) |
| `#multiply-symbol` | `font-size: 1.5rem; font-weight: bold; color: #023d6d` | Bold `×` symbol |
| `#divide-symbol` | `font-size: 1.5rem; font-weight: bold; color: #023d6d` | Bold `÷` symbol |
| `#uyt-actions` | `display: flex; gap: 1rem; justify-content: center` | Horizontal button layout |
| `#btn-calculate` | `background: #023d6d; color: white` | Primary blue calculate button |
| `#btn-clear` | `background: #6c757d !important; color: white` | Gray clear button (uses `!important`) |

---

## 12. Design System Reference

### Color Palette

| Token | Value | Usage |
|---|---|---|
| Primary Blue | `#023d6d` | Headers, borders, buttons, text, card outlines |
| Primary Blue Hover | `#084f88` | Button hover/active state |
| Card Background | `#f0f4f8` | Feature list items, gallery cards |
| Green | `#28a745` | XPY button, About button (normal) |
| Green Hover | `#218838` | XPY button, About button (hover) |
| Orange | `#fd7e14` | UYT button (normal) |
| Orange Hover | `#e56b0a` | UYT button (hover) |
| Purple | `#6f42c1` | ASD button (normal) |
| Purple Hover | `#5a32a3` | ASD button (hover) |
| Gray | `#6c757d` | Home/Back button, Clear button (normal) |
| Gray Hover | `#5a6268` | Home/Back button, Clear button (hover) |
| White | `#ffffff` | Header text, button text, nav link borders |
| Modal Backdrop | `rgba(0, 0, 0, 0.5)` | Gallery modal overlay background |
| Header Shadow | `rgba(0, 0, 0, 0.26)` | Header box-shadow |
| Nav Link Hover | `rgba(255, 255, 255, 0.2)` | Semi-transparent white on nav links |

### Shared Layout Patterns

| Pattern | Value | Applied To |
|---|---|---|
| Card border-radius | `10px` | `#calculator`, `#results`, `#home-content`, `#features`, `#about-content`, `.gallery-card`, `.modal-content` |
| Button / link border-radius | `5px` | All `<button>` elements, `<a>` nav links, feature badges |
| Content card max-width | `40rem` (with `max-width: 90%` fallback) | `#calculator`, `#results`, `#home-content`, `#features`, `#about-content` |
| Hover transition | `0.2s` | All buttons, nav links, gallery cards |
| Card padding | `1rem` – `2rem` | Varies by component |
| Box-sizing | `border-box` (universal) | All elements |

### Typography

| Element | Font | Size |
|---|---|---|
| Base | Roboto, open-sans | Inherited |
| `#calculator input` | Roboto (inherited) | `3rem` |
| `#xpy-inputs input` | Roboto (inherited) | `2rem` |
| `#uyt-inputs input` | Roboto (inherited) | `1.5rem` |
| `header nav a` | Roboto (inherited) | `1rem` |
| `#home-content p` | Roboto (inherited) | `1.1rem` |

---

## 13. Script Loading Pattern

Every HTML page in the project loads JavaScript files using the `defer` attribute on `<script>` tags. Scripts are always loaded in a specific order:

### Standard Page Pattern

```html
<head>
  <!-- 1. Shared header component (always first) -->
  <script src="assets/scripts/components/Header.js" defer></script>
  <!-- 2. Page-specific script (always second) -->
  <script src="assets/scripts/home.js" defer></script>
</head>
```

### Sub-Calculator Pattern (Basic Calculator)

```html
<head>
  <!-- 1. Vendor / DOM references -->
  <script src="assets/scripts/vendor.js" defer></script>
  <!-- 2. Shared header component -->
  <script src="assets/scripts/components/Header.js" defer></script>
  <!-- 3. Application logic -->
  <script src="assets/scripts/app.js" defer></script>
</head>
```

### Key Rules

1. **`defer` is always used** — This ensures scripts execute in order after the HTML document has been fully parsed.
2. **`Header.js` loads before page scripts** — The page script depends on `renderHeader` being defined globally.
3. **All page scripts wrap initialization in `DOMContentLoaded`** — Even though `defer` guarantees DOM readiness, every page script uses this listener as a defensive pattern.
4. **`typeof renderHeader === 'function'` guard** — Every page script checks that `renderHeader` exists before calling it, preventing runtime errors if `Header.js` fails to load.

```js
// Standard page script pattern
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'Page Title', [ /* nav links */ ]);
  }
});
```

---

## 14. Known Issues

### Missing Files

| Issue | Details |
|---|---|
| **`sdssa.html` references non-existent assets** | `sdssa.html` loads `assets/scripts/sdssa.js` and `assets/styles/sdssa.css`, but neither file exists in the repository. The page will render without its header or page-specific styles. |

### Code Quality Issues

| Issue | File | Details |
|---|---|---|
| **Function name typo** | `basics-10-function-refactoring/assets/scripts/app.js` | The function `grtUserInput()` is misspelled — it should be `getUserInput()`. The typo is used consistently so it works, but is confusing for maintainers. |
| **Premature DOM access** | `basics-10-function-refactoring/assets/scripts/app.js` | Line 17 calls `grtUserInput()` at module load time (`let inputUser = grtUserInput()`) before the DOM is guaranteed ready. The `defer` attribute mitigates this in practice, but the call should be moved inside a `DOMContentLoaded` listener for correctness. |
| **Redundant object initialization** | `basics-10-function-refactoring/assets/scripts/app.js` | The `writeLog` function initializes `newObject` with empty default values and then immediately overwrites them. This could be simplified by constructing the object directly. |
| **Outdated README** | `README.md` | Describes the project as having "1 HTML file, 1 styling file and 2 JS files," but the project has grown to include many pages, stylesheets, scripts, and three sub-calculator directories. The README should be updated to reflect the current project scope. |

