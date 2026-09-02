# /assets — Shared Front-End Assets

## Overview

The `/assets` directory holds the shared JavaScript scripts and CSS stylesheets used by the root-level HTML pages of the **my-calculator** static website project. These pages include:

- `index.html`
- `about.html`
- `asd.html`
- `addop.html`
- `asx.html`
- `ASDSFSF.html`

Sub-projects — `basics-10-function-refactoring/`, `uyt/`, and `xpy/` — each have their own self-contained `/assets` directories and do not depend on this root-level directory for their page-specific scripts or styles. The one exception is the shared **Header component** (`components/Header.js`), which sub-projects `uyt/` and `xpy/` reference via the relative path `../assets/scripts/components/Header.js`.

## Directory Structure

```text
assets/
├── scripts/
│   ├── components/
│   │   └── Header.js
│   ├── about.js
│   ├── addop.js
│   ├── asd.js
│   ├── asx.js
│   └── home.js
└── styles/
    ├── app.css
    ├── about.css
    ├── addop.css
    ├── asd.css
    ├── asx.css
    └── home.css
```

## Scripts

All scripts are loaded via `<script defer>` tags in the `<head>` of each HTML page. The `defer` attribute ensures scripts execute after the DOM has been fully parsed.

### components/Header.js

Shared reusable header component used by every root-level page. Exports three global functions:

- `createHeader(title, navLinks)` — Creates a `<header>` element containing an `<h1>` with the provided title and, optionally, a `<nav>` with anchor links built from the `navLinks` array. Returns the `HTMLElement`.
- `renderHeader(containerId, title, navLinks)` — Finds the container element by `containerId`, calls `createHeader()`, and appends the resulting header into the container. Logs an error if the container is not found.
- `replaceHeader(title, navLinks)` — Finds an existing `<header>` element on the page and replaces it with a newly created header. If no header exists, inserts the new header at the beginning of `<body>`.

Each `navLinks` entry is an object with `label` (string) and `href` (string) properties.

The file includes a CommonJS export guard so it can also be used in Node.js environments:

```js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createHeader, renderHeader, replaceHeader };
}
```

Sub-project pages in `xpy/` and `uyt/` load this file via the relative path `../assets/scripts/components/Header.js`.

### home.js

Page script for **`index.html`**. On `DOMContentLoaded`, calls `renderHeader()` to inject the header:

```js
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'Welcome to My Calculator', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'ASD', href: 'asd.html' },
      { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' }
    ]);
  }
});
```

Nav links: Home, About, ASD, Basic Calculator, XPY Calculator.

### about.js

Page script for **`about.html`**. On `DOMContentLoaded`, calls `renderHeader()` with the title `"About My Calculator"` and the same set of nav links as `home.js` (Home, About, ASD, Basic Calculator, XPY Calculator).

### asd.js

Page script for **`asd.html`**. On `DOMContentLoaded`, calls `renderHeader()` with the title `"ASD Calculator"` and nav links to Home, About, ASD, Basic Calculator, and XPY Calculator.

### addop.js

Page script for **`addop.html`**. On `DOMContentLoaded`, calls `renderHeader()` with the title `"ADDOP Calculator"` and nav links to Home, About, ADDOP, ASD, Basic Calculator, and XPY Calculator. The ADDOP link (`addop.html`) is included in addition to the standard set.

### asx.js

Page script for **`asx.html`** (ASX Stock Calculator). On `DOMContentLoaded`, calls `renderHeader()` with the title `"ASX Stock Calculator"` and nav links to Home, About, ASD, Basic Calculator, and XPY Calculator.

The script also contains the ASX stock return calculation logic. A click listener on `#asx-calculate` reads the following input fields:

| Input ID | Description |
|---|---|
| `#asx-purchase-price` | Purchase price per share |
| `#asx-sale-price` | Sale price per share |
| `#asx-quantity` | Number of shares |
| `#asx-dividend` | Dividend per share |

All parsed values are NaN-guarded (default to `0` if `parseFloat` returns `NaN`). The script then computes:

- `totalCost` = purchase price × quantity
- `totalSale` = sale price × quantity
- `totalDividend` = dividend per share × quantity
- `capitalGain` = totalSale − totalCost
- `totalReturn` = capitalGain + totalDividend
- `returnPercentage` = (totalReturn / totalCost) × 100 (guarded against division by zero)

Results are rendered into `#asx-result` as HTML, displayed in AUD with 2 decimal places:

```js
resultDiv.innerHTML =
  `Capital Gain/Loss: AUD ${capitalGain.toFixed(2)}<br>` +
  `Dividend Income: AUD ${totalDividend.toFixed(2)}<br>` +
  `Total Return: AUD ${totalReturn.toFixed(2)}<br>` +
  `Return Percentage: ${returnPercentage.toFixed(2)}%`;
```

## Styles

### app.css

Global stylesheet loaded by **every root-level page**. Defines foundational styles and the shared header appearance.

Key selectors:

- `*` — `box-sizing: border-box`
- `html` — `font-family: 'Roboto', open-sans`
- `body` — `margin: 0`
- `header` — `background: #023d6d`, white text, `padding: 1rem`, centered text, `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26)`, full width
- `header nav a` — white text, no underline, `1px solid white` border, `5px` border-radius, `0.2s` background transition
- `#results, #calculator` — `40rem` width, `max-width: 90%`, `1px solid #023d6d` border, `10px` border-radius, `#023d6d` text color
- `#calculator input` — `3rem` font size, `2px solid #023d6d` border, centered, `#023d6d` text color
- `#calculator button` — `#023d6d` background, white text, `1px solid #023d6d` border; hover/active state uses `#084f88`
- `#calc-actions` — `1rem` top margin, centered text; buttons set to `4rem` width

### home.css

Page-specific styles for **`index.html`**.

Key selectors:

- `#home-content` — card pattern (40rem width, #023d6d border, 10px border-radius, centered text)
- `#home-content h2`, `#home-content p` — heading and paragraph typography
- `#home-actions` — `2rem` top margin
- `#btn-start` — primary button (#023d6d background, hover #084f88)
- `#btn-xpy` — green button (#28a745 background, hover #218838)
- `#btn-uyt` — orange button (#fd7e14 background, hover #e56b0a)
- `#btn-asd` — purple button (#6f42c1 background, hover #5a32a3)
- `#features` — card pattern container
- `#features ul` — `list-style: none`, flexbox layout with `flex-wrap: wrap` and `1rem` gap
- `#features li` — `#f0f4f8` background, `1px solid #023d6d` border, `5px` border-radius, bold text

### about.css

Page-specific styles for **`about.html`**.

Key selectors:

- `#about-content` — card pattern
- `#about-content h2`, `#about-content p` — heading and paragraph typography
- `#about-actions` — `2rem` top margin
- `#btn-home` — gray button (#6c757d background, hover #5a6268)
- `#btn-start` — primary button (#023d6d background, hover #084f88)
- `#btn-uyt` — orange button (#fd7e14 background, hover #e56b0a)
- `#about-info` — card pattern container
- `#about-info ul` — `list-style: none`, no padding/margin
- `#about-info li` — `#f0f4f8` background, `1px solid #023d6d` border, `5px` border-radius, bold text, `0.75rem` bottom margin (last child has no margin)

### asd.css

Page-specific styles for **`asd.html`**.

Key selectors:

- `#asd-content` — card pattern
- `#asd-content h2`, `#asd-content p` — heading and paragraph typography
- `#asd-actions` — `2rem` top margin
- `#btn-home` — gray button (#6c757d background, hover #5a6268)
- `#btn-start` — primary button (#023d6d background, hover #084f88)
- `#btn-about` — green button (#28a745 background, hover #218838)
- `#asd-info` — card pattern container
- `#asd-info ul` — `list-style: none`, no padding/margin
- `#asd-info li` — `#f0f4f8` background, `1px solid #023d6d` border, `5px` border-radius, bold text, `0.75rem` bottom margin (last child has no margin)

### addop.css

Page-specific styles for **`addop.html`**.

Key selectors:

- `#addop-content` — card pattern
- `#addop-content h2`, `#addop-content p` — heading and paragraph typography
- `#addop-actions` — `2rem` top margin
- `#btn-home` — gray button (#6c757d background, hover #5a6268)
- `#btn-start` — primary button (#023d6d background, hover #084f88)
- `#btn-uyt` — orange button (#fd7e14 background, hover #e56b0a)
- `#addop-info` — card pattern container
- `#addop-info ul` — `list-style: none`, no padding/margin
- `#addop-info li` — `#f0f4f8` background, `1px solid #023d6d` border, `5px` border-radius, bold text, `0.75rem` bottom margin (last child has no margin)

### asx.css

Page-specific styles for **`asx.html`**.

Key selectors:

- `#asx-content` — card pattern
- `#asx-content h2`, `#asx-content p` — heading and paragraph typography
- `#asx-actions` — `2rem` top margin
- `#asx-calculator` — calculator section including input field styling, `#asx-calculate` button, and `#asx-result` display area
- `#asx-info` — card pattern container with list styling

## Shared Component: Header

Every root-level HTML page follows the same header pattern:

1. The page includes an empty container in the `<body>`:

```html
<div id="header-container"></div>
```

2. In the `<head>`, two scripts are loaded with `defer` — first `Header.js`, then the page-specific script:

```html
<script defer src="assets/scripts/components/Header.js"></script>
<script defer src="assets/scripts/home.js"></script>
```

3. On `DOMContentLoaded`, the page-specific script calls `renderHeader()` to inject the header into `#header-container`:

```js
renderHeader('header-container', 'Page Title', [
  { label: 'Home', href: 'index.html' },
  // ...
]);
```

This pattern ensures a consistent navigation header across all root-level pages. The header title and nav links are configured per-page by the page script.

Sub-projects `uyt/` and `xpy/` also use this component. Because they live one directory level deeper, they reference the shared `Header.js` via the relative path `../assets/scripts/components/Header.js`.

## Design System

All CSS files in this directory share a common set of visual design tokens:

| Token | Value | Usage |
|---|---|---|
| Primary color | `#023d6d` (dark blue) | Borders, text color, header background, primary buttons |
| Hover color | `#084f88` (lighter blue) | Button hover/active states for primary buttons |
| Font | `Roboto` (Google Fonts), fallback `open-sans` | Set on `html` element, inherited globally |
| Card width | `40rem`, `max-width: 90%` | Content containers (`#home-content`, `#about-content`, etc.) |
| Card border | `1px solid #023d6d` | All card containers |
| Card border-radius | `10px` | All card containers |
| Card text alignment | `center` | Content card sections |
| Button display | `inline-block` | All page buttons |
| Button padding | `1rem 2rem` | All page buttons |
| Button border-radius | `5px` | All page buttons |
| Button transition | `0.2s` on `background` and `border-color` | All page buttons |
| List style | `none` (no bullets) | Feature/info lists |
| List item background | `#f0f4f8` | List items in `#features`, `#about-info`, `#asd-info`, `#addop-info` |
| List item border | `1px solid #023d6d` | List items |
| List item border-radius | `5px` | List items |
| List item font weight | `bold` | List items |

Example of the card pattern used across pages:

```css
#home-content {
  margin: 2rem auto;
  width: 40rem;
  max-width: 90%;
  border: 1px solid #023d6d;
  border-radius: 10px;
  padding: 2rem;
  color: #023d6d;
  text-align: center;
}
```

Example of the button pattern:

```css
#btn-start {
  display: inline-block;
  font: inherit;
  background: #023d6d;
  color: white;
  border: 1px solid #023d6d;
  padding: 1rem 2rem;
  cursor: pointer;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.1rem;
  transition: background 0.2s, border-color 0.2s;
}
```

Example of the list pattern:

```css
#features li {
  background: #f0f4f8;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 1px solid #023d6d;
  font-weight: bold;
}
```

## Loading Convention

All JavaScript files are loaded with the `defer` attribute in the HTML `<head>`:

```html
<head>
  <script defer src="assets/scripts/components/Header.js"></script>
  <script defer src="assets/scripts/home.js"></script>
</head>
```

The `defer` attribute ensures that scripts execute in document order **after** the DOM has been fully parsed but before the `DOMContentLoaded` event fires. This guarantees that:

1. **Header.js loads first** — It is always included before the page-specific script so that the `renderHeader` function is defined and available in the global scope.
2. **Page script loads second** — By the time the page script's `DOMContentLoaded` handler fires, `renderHeader` is already defined and the DOM (including `#header-container`) is ready.

This ordering is critical: if the page script were loaded before `Header.js`, the `typeof renderHeader === 'function'` guard would fail and the header would not be rendered.

