# Assets — The Unconventional Calculator

## Overview

This directory holds the scripts and styles for the basic calculator sub-project located at `/basics-10-function-refactoring/`. It is a self-contained four-function calculator (addition, subtraction, multiplication, division) with a calculation log. All JavaScript and CSS required to run the calculator live here; there are no external runtime dependencies beyond the Google Fonts Roboto stylesheet loaded in `index.html`.

## Directory Structure

```text
assets/
├── scripts/
│   ├── components/
│   │   └── Header.js
│   ├── app.js
│   ├── home.js
│   └── vendor.js
└── styles/
    ├── app.css
    └── home.css
```

## Scripts

### vendor.js

DOM bridge script that connects HTML elements to JavaScript. It queries the DOM on load and exposes the following global references:

| Variable | Element ID | Description |
|---|---|---|
| `userInput` | `#input-number` | Numeric input field |
| `addBtn` | `#btn-add` | Addition button (+) |
| `subtractBtn` | `#btn-subtract` | Subtraction button (−) |
| `multiplyBtn` | `#btn-multiply` | Multiplication button (*) |
| `divideBtn` | `#btn-divide` | Division button (/) |
| `currentResultOutput` | `#current-result` | Result display element |
| `currentCalculationOutput` | `#current-calculation` | Calculation description element |

It also defines `outputResult(result, text)`, which updates the result and calculation display by setting `textContent` on the two output elements.

> **This file must be loaded before `app.js`**, because `app.js` references the globals and the `outputResult` function defined here.

### app.js

Core calculator logic. Maintains the following state variables:

| Variable | Initial Value | Description |
|---|---|---|
| `currentResult` | `0` | Running result of all calculations |
| `initialResult` | `undefined` | Snapshot of `currentResult` before each operation |
| `operatorType` | `undefined` | Symbol for the current operation (+, -, *, /) |
| `inputUser` | value from `userInput` at load time | Current user-entered operand |
| `description` | `undefined` | Human-readable calculation description string |
| `logEntry` | `[]` | Array of log entry objects |

Key functions:

- **`grtUserInput()`** — returns the current value from the `userInput` field.
- **`calculationDescrip(str1, str2, str3)`** — concatenates three strings into a calculation description string.
- **`output()`** — calls `outputResult()` (from `vendor.js`) with `currentResult` and `description`, then logs the `logEntry` array to the console.
- **`writeLog(operation, result)`** — creates a log entry object `{ operation, result, operand }` and pushes it to `logEntry`, then calls `output()`.
- **`calculation(calculationType)`** — main calculation dispatcher. Accepts `"ADD"`, `"SUBT"`, `"MULTI"`, or `"DIVID"`. Reads user input, validates it (returns early if not a valid integer), saves `initialResult`, performs the arithmetic operation on `currentResult`, sets `operatorType` (+, -, *, /), builds the description string, and writes to the log.
- **`add()`**, **`subtract()`**, **`multiplication()`**, **`division()`** — wrapper functions that call `calculation()` with the respective type.

Event listeners are attached to `addBtn`, `subtractBtn`, `multiplyBtn`, and `divideBtn`.

On `DOMContentLoaded`, calls `renderHeader('header-container', 'The Unconventional Calculator', [...])` with nav links to Home, About, Basic Calculator, and XPY Calculator:

```js
renderHeader('header-container', 'The Unconventional Calculator', [
  { label: 'Home', href: '../index.html' },
  { label: 'About', href: '../about.html' },
  { label: 'Basic Calculator', href: 'index.html' },
  { label: 'XPY Calculator', href: '../xpy/index.html' }
]);
```

### home.js

Page script for `home.html`. On `DOMContentLoaded`, calls `replaceHeader('Welcome to My Calculator', [])` with an empty nav array (no navigation links on this page):

```js
document.addEventListener('DOMContentLoaded', () => {
  if (typeof replaceHeader === 'function') {
    replaceHeader('Welcome to My Calculator', []);
  }
});
```

### components/Header.js

Identical copy of the shared Header component. Exports `createHeader()`, `renderHeader()`, and `replaceHeader()`. See the main [assets/README.md](../../assets/README.md) for full component documentation.

## Styles

### app.css

Global stylesheet for the basic calculator. Identical to the root-level `app.css`. Sets:

- `box-sizing: border-box` on all elements
- `font-family: 'Roboto', open-sans` on `html`
- `body` margin reset to `0`
- Header styling — `#023d6d` background, white text, centered, box-shadow
- Nav link styling — white text, bordered, rounded, hover transition
- `#calculator` and `#results` sections — `40rem` width, `#023d6d` border, rounded corners
- Calculator input — `3rem` font-size, `10rem` width, centered, `#023d6d` border
- Calculator buttons — `#023d6d` background, hover state `#084f88`
- `#calc-actions` — centered button row with `4rem` button width

### home.css

Page-specific styles for `home.html`. Styles:

- `#home-content` — centered card with `#023d6d` border, `2rem` padding
- `#home-actions` — top margin spacing
- `#btn-start` — inline-block button with `#023d6d` background, hover state `#084f88`, rounded corners
- `#features` — card section with flexbox list layout (`display: flex`, `flex-wrap: wrap`, `justify-content: center`, `gap: 1rem`)

## Script Loading Order

The scripts in `index.html` are loaded with `defer` so they execute in order after DOM parsing. The load order is critical:

1. **`vendor.js`** (defer) — must load first to expose DOM references (`userInput`, `addBtn`, etc.) and the `outputResult()` function.
2. **`components/Header.js`** (defer) — provides `renderHeader()` used by `app.js` on `DOMContentLoaded`.
3. **`app.js`** (defer) — core logic; depends on both `vendor.js` and `Header.js`.

```html
<script src="assets/scripts/vendor.js" defer></script>
<script src="assets/scripts/components/Header.js" defer></script>
<script src="assets/scripts/app.js" defer></script>
```

All scripts use `defer` so they execute in order after DOM parsing.

## Calculation Flow

The following steps describe the end-to-end calculation flow:

1. **User input** — The user enters a number in `#input-number` and clicks an operation button (+, -, *, /).
2. **Event listener** — The button's event listener calls the corresponding wrapper function (`add` / `subtract` / `multiplication` / `division`).
3. **Dispatch** — The wrapper calls `calculation(calculationType)` with `"ADD"`, `"SUBT"`, `"MULTI"`, or `"DIVID"`.
4. **Calculate** — `calculation()` reads and validates the input (returns early if not a valid integer), saves the initial result, performs the arithmetic, builds a description string, and calls `writeLog()`.
5. **Log** — `writeLog()` creates a log entry object and calls `output()`.
6. **Display** — `output()` calls `outputResult()` from `vendor.js` to update the DOM display.

