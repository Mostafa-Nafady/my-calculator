# Components

[← Back to README](../README.md)

This document is a reference for all JavaScript components in the **My Calculator** project. It covers the shared `Header.js` component (used on every page) and every page-specific script, including their functions, state variables, event listeners, and `renderHeader` call details. For a per-page HTML/CSS/JS overview, see [Pages Reference](pages-reference.md). For architectural context, see [Architecture](architecture.md).

## Shared Header Component

**File:** `assets/scripts/components/Header.js`

A reusable header component that renders a `<header>` element with a title `<h1>` and an optional `<nav>` of links into a container div. Used on every page. The component is written in vanilla JavaScript with JSDoc annotations and is loaded first via a `<script defer>` tag on every page.

### Function Reference

| Function | Signature | Description |
|---|---|---|
| `createHeader` | `createHeader(title, navLinks = [])` | Creates and returns a `<header>` DOM element with an `<h1>` title and optional `<nav>` of links. Does not attach it to the document. |
| `renderHeader` | `renderHeader(containerId, title, navLinks = [])` | Finds a container element by its ID and appends a `<header>` element containing an `<h1>` title and an optional `<nav>` of links. Logs an error to the console if the container is not found. |
| `replaceHeader` | `replaceHeader(title, navLinks = [])` | Replaces the existing `<header>` element with a new one, or inserts at the beginning of `<body>` if no header exists. |

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | The title text to display in the `<h1>` element. |
| `navLinks` | `Array<{label: string, href: string}>` | `[]` | Optional array of navigation link objects. Each object has a `label` (link text) and `href` (link URL). |
| `containerId` | `string` | — | The DOM ID of the container element to append the header to. (`renderHeader` only.) |

### Module Export Pattern

The component uses a CommonJS-compatible guard so it can be required in Node.js (e.g., for testing) without breaking browser execution:

```javascript
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createHeader, renderHeader, replaceHeader };
}
```

### Usage Example

Page scripts call `renderHeader` inside a `DOMContentLoaded` listener, wrapped in a type-check guard to prevent runtime errors if `Header.js` fails to load:

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

### Duplicate Copy

An identical copy of `Header.js` exists at `basics-10-function-refactoring/assets/scripts/components/Header.js`. This allows the basic calculator subdirectory to operate as a self-contained sub-application with its own local asset paths. Both files are functionally identical.

## Page-Specific Scripts

### Root-Level Scripts

The following scripts live in `assets/scripts/` and are loaded (alongside `Header.js`) on root-level pages. Most are header-only scripts with no state or custom functions; `gallery.js` is the exception with full modal interactivity.

#### Summary Table

| Script | File Path | Header Title | State Variables | Custom Functions |
|---|---|---|---|---|
| `home.js` | `assets/scripts/home.js` | Welcome to My Calculator | None | None |
| `about.js` | `assets/scripts/about.js` | About My Calculator | None | None |
| `asx.js` | `assets/scripts/asx.js` | Welcome to My Calculator | None | None |
| `asd.js` | `assets/scripts/asd.js` | ASD Calculator | None | None |
| `qwe.js` | `assets/scripts/qwe.js` | QWE Calculator | `const TYU = 'TYU'` (unused) | None |
| `cvxz.js` | `assets/scripts/cvxz.js` | CVXZ Calculator | `const TYU = 'TYU'` (unused) | None |
| `nnn.js` | `assets/scripts/nnn.js` | NNN Calculator | None | None |
| `sdssa.js` | `assets/scripts/sdssa.js` | — (empty file) | None | None |
| `gallery.js` | `assets/scripts/gallery.js` | Calculator Gallery | None | `closeModal()` |

---

#### home.js

**File:** `assets/scripts/home.js`

- **Purpose:** Renders the header on the home page.
- **State variables:** None.
- **Custom functions:** None.
- **Event listeners:** `DOMContentLoaded` → calls `renderHeader`.
- **`renderHeader` call:**

```javascript
renderHeader('header-container', 'Welcome to My Calculator', [
  { label: 'Home', href: 'index.html' },
  { label: 'About', href: 'about.html' },
  { label: 'ASD', href: 'asd.html' },
  { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
  { label: 'XPY Calculator', href: 'xpy/index.html' },
  { label: 'Gallery', href: 'gallery.html' }
]);
```

---

#### about.js

**File:** `assets/scripts/about.js`

- **Purpose:** Renders the header on the About page.
- **State variables:** None.
- **Custom functions:** None.
- **Event listeners:** `DOMContentLoaded` → calls `renderHeader`.
- **`renderHeader` call:**

```javascript
renderHeader('header-container', 'About My Calculator', [
  { label: 'Home', href: 'index.html' },
  { label: 'About', href: 'about.html' },
  { label: 'ASD', href: 'asd.html' },
  { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
  { label: 'XPY Calculator', href: 'xpy/index.html' }
]);
```

---

#### asx.js

**File:** `assets/scripts/asx.js`

- **Purpose:** Renders the header on the ASx About page.
- **State variables:** None.
- **Custom functions:** None.
- **Event listeners:** `DOMContentLoaded` → calls `renderHeader`.
- **`renderHeader` call:**

```javascript
renderHeader('header-container', 'Welcome to My Calculator', [
  { label: 'Home', href: 'index.html' },
  { label: 'About', href: 'about.html' },
  { label: 'ASx', href: 'asx.html' },
  { label: 'ASD', href: 'asd.html' },
  { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
  { label: 'XPY Calculator', href: 'xpy/index.html' },
  { label: 'Gallery', href: 'gallery.html' }
]);
```

---

#### asd.js

**File:** `assets/scripts/asd.js`

- **Purpose:** Renders the header on the ASD Calculator informational page.
- **State variables:** None.
- **Custom functions:** None.
- **Event listeners:** `DOMContentLoaded` → calls `renderHeader`.
- **`renderHeader` call:**

```javascript
renderHeader('header-container', 'ASD Calculator', [
  { label: 'Home', href: 'index.html' },
  { label: 'About', href: 'about.html' },
  { label: 'ASD', href: 'asd.html' },
  { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
  { label: 'XPY Calculator', href: 'xpy/index.html' }
]);
```

---

#### qwe.js

**File:** `assets/scripts/qwe.js`

- **Purpose:** Renders the header on the QWE Calculator informational page.
- **State variables:**

| Variable | Type | Value | Notes |
|---|---|---|---|
| `TYU` | `const string` | `'TYU'` | Unused constant. |

- **Custom functions:** None.
- **Event listeners:** `DOMContentLoaded` → calls `renderHeader`.
- **`renderHeader` call:**

```javascript
renderHeader('header-container', 'QWE Calculator', [
  { label: 'Home', href: 'index.html' },
  { label: 'About', href: 'about.html' },
  { label: 'ASD', href: 'asd.html' },
  { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
  { label: 'XPY Calculator', href: 'xpy/index.html' },
  { label: 'QWE', href: 'qwe.html' }
]);
```

---

#### cvxz.js

**File:** `assets/scripts/cvxz.js`

- **Purpose:** Renders the header on the CVXZ Calculator informational page.
- **State variables:**

| Variable | Type | Value | Notes |
|---|---|---|---|
| `TYU` | `const string` | `'TYU'` | Unused constant. |

- **Custom functions:** None.
- **Event listeners:** `DOMContentLoaded` → calls `renderHeader`.
- **`renderHeader` call:**

```javascript
renderHeader('header-container', 'CVXZ Calculator', [
  { label: 'Home', href: 'index.html' },
  { label: 'About', href: 'about.html' },
  { label: 'ASD', href: 'asd.html' },
  { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
  { label: 'XPY Calculator', href: 'xpy/index.html' }
]);
```

---

#### nnn.js

**File:** `assets/scripts/nnn.js`

- **Purpose:** Renders the header on the NNN Calculator informational page.
- **State variables:** None.
- **Custom functions:** None.
- **Event listeners:** `DOMContentLoaded` → calls `renderHeader`.
- **`renderHeader` call:**

```javascript
renderHeader('header-container', 'NNN Calculator', [
  { label: 'Home', href: 'index.html' },
  { label: 'About', href: 'about.html' },
  { label: 'ASD', href: 'asd.html' },
  { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
  { label: 'XPY Calculator', href: 'xpy/index.html' }
]);
```

---

#### sdssa.js

**File:** `assets/scripts/sdssa.js`

- **Purpose:** Intended to render the header on the SDSSA Calculator page, but the file is currently empty (0 bytes). The header will not render on this page.
- **State variables:** None.
- **Custom functions:** None.
- **Event listeners:** None.
- **`renderHeader` call:** None (file is empty).
- **Known issue:** The `#header-container` div on `sdssa.html` remains empty because this script contains no code. The header will not render until the script is implemented.

---

#### gallery.js

**File:** `assets/scripts/gallery.js`

- **Purpose:** Renders the header and wires up interactive gallery card and modal behavior.
- **State variables:** None (all DOM references are local to the `DOMContentLoaded` handler).
- **Custom functions:**

| Function | Signature | Description |
|---|---|---|
| `closeModal` | `closeModal()` | Hides the modal overlay by adding the `hidden` class. |

- **`renderHeader` call:**

```javascript
renderHeader('header-container', 'Calculator Gallery', [
  { label: 'Home', href: 'index.html' },
  { label: 'About', href: 'about.html' },
  { label: 'ASD', href: 'asd.html' },
  { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
  { label: 'XPY Calculator', href: 'xpy/index.html' },
  { label: 'Gallery', href: 'gallery.html' }
]);
```

- **DOMContentLoaded handler steps:**
  1. Calls `renderHeader('header-container', 'Calculator Gallery', [...])` with the nav links shown above.
  2. Queries modal elements: `modalOverlay` (`#modal-overlay`), `modalTitle` (`#modal-title`), `modalDesc` (`#modal-desc`), `modalLink` (`#modal-link`), `modalClose` (`#modal-close`).
  3. Queries all `.gallery-card` elements and attaches click listeners that:
     - Ignore clicks on `.card-link` (returns early).
     - Read the `data-calc` attribute and `.card-title` / `.card-desc` / `.card-link` content from the clicked card.
     - Populate the modal title, description, and link href.
     - Remove the `hidden` class from `modalOverlay` to show the modal.
  4. Attaches click listener to `modalClose` → `closeModal()`.
  5. Attaches click listener to `modalOverlay` → closes the modal only when the overlay itself (not `.modal-content`) is clicked.
  6. Attaches click listener to `.modal-content` → `event.stopPropagation()` to prevent the overlay close handler from firing.
  7. Attaches `keydown` listener on `document` → closes the modal on `Escape` key.

- **Event listeners:**

| Element | Event | Handler | Description |
|---|---|---|---|
| `.gallery-card` (each) | `click` | anonymous | Opens modal with card data (ignores `.card-link` clicks). |
| `modalClose` | `click` | `closeModal` | Closes the modal. |
| `modalOverlay` | `click` | anonymous | Closes modal only when the overlay itself is clicked. |
| `.modal-content` | `click` | anonymous | Calls `event.stopPropagation()` to prevent overlay close. |
| `document` | `keydown` | anonymous | Closes modal on `Escape` key. |

### Basic Calculator Scripts

The basic calculator (`basics-10-function-refactoring/`) loads three scripts in order: `vendor.js` (DOM references), `Header.js` (shared header), and `app.js` (calculation engine). The `vendor.js` file must load before `app.js` because `app.js` references the DOM constants and `outputResult` function declared in `vendor.js`.

#### vendor.js

**File:** `basics-10-function-refactoring/assets/scripts/vendor.js`

- **Purpose:** Declares DOM element references and the `outputResult` helper function. Must load before `app.js`.
- **DOM element constants (all `const`):**

| Variable | Selector | Description |
|---|---|---|
| `userInput` | `#input-number` | The number input field. |
| `addBtn` | `#btn-add` | The add button. |
| `subtractBtn` | `#btn-subtract` | The subtract button. |
| `multiplyBtn` | `#btn-multiply` | The multiply button. |
| `divideBtn` | `#btn-divide` | The divide button. |
| `currentResultOutput` | `#current-result` | Element displaying the current result. |
| `currentCalculationOutput` | `#current-calculation` | Element displaying the calculation description. |

- **Functions:**

| Function | Signature | Description |
|---|---|---|
| `outputResult` | `outputResult(result, text)` | Sets `currentResultOutput.textContent = result` and `currentCalculationOutput.textContent = text`. |

---

#### app.js

**File:** `basics-10-function-refactoring/assets/scripts/app.js`

- **Purpose:** The calculation engine for the basic 4-function calculator. Maintains state, handles arithmetic operations, and logs entries.
- **State variables:**

| Variable | Type | Initial Value | Description |
|---|---|---|---|
| `defaultResult` | `const` | `0` | Initial/default result value. |
| `initialResult` | `let` | `undefined` | Stores the result before the current operation (for description building). |
| `operatorType` | `let` | `undefined` | The operator symbol for the current operation (`+`, `-`, `*`, `/`). |
| `currentResult` | `let` | `defaultResult` (`0`) | The running calculation result. |
| `inputUser` | `let` | `grtUserInput()` | The current user input value (string from the input field). |
| `description` | `let` | `undefined` | The calculation description string (e.g., `"0+5"`). |
| `logEntry` | `let` | `[]` | Array of log entry objects. |

- **Functions:**

| Function | Signature | Description |
|---|---|---|
| `grtUserInput` | `grtUserInput()` | Returns `userInput.value` (the current input field value). Note: function name has a typo ("grt" instead of "get"). |
| `calculationDescrip` | `calculationDescrip(str1, str2, str3)` | Concatenates three string arguments and returns the result as a description string. |
| `output` | `output()` | Calls `outputResult(currentResult, description)` to update the DOM, then `console.log(logEntry)`. |
| `writeLog` | `writeLog(operation, result)` | Creates a log entry object `{ operation, result, operand }`, pushes it to the `logEntry` array, then calls `output()`. |
| `calculation` | `calculation(calculationType)` | Main dispatch function. Reads user input, validates it (returns early if `parseInt(inputUser)` is falsy), updates `currentResult` based on the operation type, builds the description, and calls `writeLog()`. |
| `add` | `add()` | Wrapper that calls `calculation("ADD")`. |
| `subtract` | `subtract()` | Wrapper that calls `calculation("SUBT")`. |
| `multiplication` | `multiplication()` | Wrapper that calls `calculation("MULTI")`. |
| `division` | `division()` | Wrapper that calls `calculation("DIVID")`. |

- **Operation codes:**

| Code | Operator | Description |
|---|---|---|
| `ADD` | `+` | Addition |
| `SUBT` | `-` | Subtraction |
| `MULTI` | `*` | Multiplication |
| `DIVID` | `/` | Division |

- **Event listeners:**

| Element | Event | Handler |
|---|---|---|
| `addBtn` | `click` | `add` |
| `subtractBtn` | `click` | `subtract` |
| `multiplyBtn` | `click` | `multiplication` |
| `divideBtn` | `click` | `division` |

- **`renderHeader` call (on `DOMContentLoaded`):**

```javascript
renderHeader('header-container', 'The Unconventional Calculator', [
  { label: 'Home', href: '../index.html' },
  { label: 'About', href: '../about.html' },
  { label: 'Basic Calculator', href: 'index.html' },
  { label: 'XPY Calculator', href: '../xpy/index.html' }
]);
```

### XPY Calculator Script

#### xpy.js

**File:** `xpy/assets/scripts/xpy.js`

- **Purpose:** Exponentiation calculator — calculates X^Y. Already has JSDoc comments.
- **DOM element constants:**

| Variable | Selector | Description |
|---|---|---|
| `baseInput` | `#input-base` | The base number input field. |
| `exponentInput` | `#input-exponent` | The exponent input field. |
| `calculateBtn` | `#btn-calculate` | The calculate button. |
| `clearBtn` | `#btn-clear` | The clear button. |
| `currentCalculation` | `#current-calculation` | Element displaying the calculation expression. |
| `currentResult` | `#current-result` | Element displaying the result. |

- **State variables:**

| Variable | Type | Initial Value | Description |
|---|---|---|---|
| `defaultResult` | `let` | `0` | Stores the last calculated result. |
| `currentBase` | `let` | `0` | The current base value. |
| `currentExponent` | `let` | `0` | The current exponent value. |

- **Functions:**

| Function | Signature | Description |
|---|---|---|
| `calculateXPY` | `calculateXPY(base, exponent)` | Returns `Math.pow(base, exponent)`. |
| `updateCalculationDisplay` | `updateCalculationDisplay(base, exponent, result)` | Sets calculation text to `` `${base} ^ ${exponent}` `` and result text. |
| `handleCalculate` | `handleCalculate()` | Parses inputs with `parseFloat`, validates with `isNaN` (alerts on invalid), calls `calculateXPY`, updates display. |
| `handleClear` | `handleClear()` | Resets input fields, state variables, and display to defaults. |

- **Event listeners:**

| Element | Event | Handler | Condition |
|---|---|---|---|
| `calculateBtn` | `click` | `handleCalculate` | — |
| `clearBtn` | `click` | `handleClear` | — |
| `baseInput` | `keypress` | `handleCalculate` | `event.key === 'Enter'` |
| `exponentInput` | `keypress` | `handleCalculate` | `event.key === 'Enter'` |

- **`renderHeader` call (on `DOMContentLoaded`):**

```javascript
renderHeader('header-container', 'My Calculator', [
  { label: 'Home', href: '../index.html' },
  { label: 'About', href: '../about.html' },
  { label: 'Basic Calculator', href: '../basics-10-function-refactoring/index.html' },
  { label: 'XPY Calculator', href: 'index.html' },
  { label: 'UYT Calculator', href: '../uyt/index.html' }
]);
```

### UYT Calculator Script

#### uyt.js

**File:** `uyt/assets/scripts/uyt.js`

- **Purpose:** Yield calculator — calculates (U × Y) ÷ T. Already has JSDoc comments.
- **DOM element constants:**

| Variable | Selector | Description |
|---|---|---|
| `uInput` | `#input-u` | The U input field. |
| `yInput` | `#input-y` | The Y input field. |
| `tInput` | `#input-t` | The T input field. |
| `calculateBtn` | `#btn-calculate` | The calculate button. |
| `clearBtn` | `#btn-clear` | The clear button. |
| `currentCalculation` | `#current-calculation` | Element displaying the calculation expression. |
| `currentResult` | `#current-result` | Element displaying the result. |

- **State variables:**

| Variable | Type | Initial Value | Description |
|---|---|---|---|
| `defaultResult` | `let` | `0` | Stores the last calculated result. |
| `currentU` | `let` | `0` | The current U value. |
| `currentY` | `let` | `0` | The current Y value. |
| `currentT` | `let` | `0` | The current T value. |

- **Functions:**

| Function | Signature | Description |
|---|---|---|
| `calculateUYT` | `calculateUYT(u, y, t)` | Returns `(u * y) / t`. Throws `Error('Cannot divide by zero')` if `t === 0`. |
| `updateCalculationDisplay` | `updateCalculationDisplay(u, y, t, result)` | Sets calculation text to `` `(${u} × ${y}) ÷ ${t}` `` and result text. |
| `handleCalculate` | `handleCalculate()` | Parses inputs with `parseFloat`, validates with `isNaN`, checks for `t === 0`, wraps `calculateUYT` in try/catch. |
| `handleClear` | `handleClear()` | Resets input fields, state variables, and display to defaults. |

- **Event listeners:**

| Element | Event | Handler | Condition |
|---|---|---|---|
| `calculateBtn` | `click` | `handleCalculate` | — |
| `clearBtn` | `click` | `handleClear` | — |
| `uInput` | `keypress` | `handleCalculate` | `event.key === 'Enter'` |
| `yInput` | `keypress` | `handleCalculate` | `event.key === 'Enter'` |
| `tInput` | `keypress` | `handleCalculate` | `event.key === 'Enter'` |

- **`renderHeader` call (on `DOMContentLoaded`):**

```javascript
renderHeader('header-container', 'My Calculator', [
  { label: 'Home', href: '../index.html' },
  { label: 'About', href: '../about.html' },
  { label: 'Basic Calculator', href: '../basics-10-function-refactoring/index.html' },
  { label: 'XPY Calculator', href: '../xpy/index.html' },
  { label: 'UYT Calculator', href: 'index.html' }
]);
```

## Script Loading Order

All scripts are loaded via `<script defer>` tags in the `<head>` of each HTML page. The `defer` attribute guarantees execution in document order after parsing.

### 2-Script Standard Pattern

Used by all root-level pages, the XPY calculator, and the UYT calculator:

```html
<script src="assets/scripts/components/Header.js" defer></script>
<script src="assets/scripts/<page>.js" defer></script>
```

`Header.js` loads first so that `renderHeader` is available when the page script's `DOMContentLoaded` handler fires.

### 3-Script Basic Calculator Pattern

The basic calculator loads an additional `vendor.js` before `Header.js`:

```html
<script src="assets/scripts/vendor.js" defer></script>
<script src="assets/scripts/components/Header.js" defer></script>
<script src="assets/scripts/app.js" defer></script>
```

`vendor.js` must load before `app.js` because `app.js` references the DOM constants (`userInput`, `addBtn`, etc.) and the `outputResult` function declared in `vendor.js`.

## Common Patterns

### DOMContentLoaded + Type-Check Guard

Every page script wraps its `renderHeader` call in a `DOMContentLoaded` listener with a type-check guard:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'Page Title', [/* nav links */]);
  }
});
```

The `typeof renderHeader === 'function'` guard prevents a `ReferenceError` if `Header.js` fails to load. If the guard fails, the page renders without a header but does not throw.

### renderHeader Call Convention

All `renderHeader` calls use the same container ID (`'header-container'`) and pass a page-specific title string and an array of `{ label, href }` objects. The nav links vary per page to highlight the current section and provide relevant cross-links.

### Event Listener Patterns

- **Button clicks:** Calculator scripts attach `click` listeners to operation buttons (`addBtn`, `calculateBtn`, etc.) that call handler functions.
- **Enter key support:** The XPY and UYT calculators attach `keypress` listeners on input fields that trigger the calculate handler when `event.key === 'Enter'`.
- **Modal interaction (gallery.js):** Uses three complementary close methods — close button click, overlay background click (with `event.target === modalOverlay` check), and `Escape` key on `document`. A `stopPropagation()` call on `.modal-content` prevents the overlay handler from firing when clicking inside the modal.

