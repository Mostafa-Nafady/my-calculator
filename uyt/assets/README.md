# UYT Calculator — Assets

## Overview

This directory holds the script and style for the **UYT (U Yield T) calculator** sub-project located at `/uyt/`. The calculator computes the formula **(U × Y) ÷ T**, where:

- **U** — a value
- **Y** — a multiplier
- **T** — a divisor

## Directory Structure

```text
assets/
├── scripts/
│   └── uyt.js
└── styles/
    └── uyt.css
```

## Scripts

### uyt.js

UYT calculator logic. Queries the following DOM elements on load:

| Variable              | Element ID          |
|-----------------------|---------------------|
| `uInput`              | `#input-u`          |
| `yInput`              | `#input-y`          |
| `tInput`              | `#input-t`          |
| `calculateBtn`        | `#btn-calculate`    |
| `clearBtn`            | `#btn-clear`        |
| `currentCalculation`  | `#current-calculation` |
| `currentResult`       | `#current-result`   |

**State variables:**

| Variable         | Initial Value |
|------------------|---------------|
| `defaultResult`  | `0`           |
| `currentU`       | `0`           |
| `currentY`       | `0`           |
| `currentT`       | `0`           |

**Functions:**

- **`calculateUYT(u, y, t)`** — computes `(u * y) / t`. Throws `Error('Cannot divide by zero')` if `t` is `0`. Returns the numeric result.
- **`updateCalculationDisplay(u, y, t, result)`** — sets `currentCalculation` text content to the format `(u × y) ÷ t` and `currentResult` text content to the result value.
- **`handleCalculate()`** — reads and parses the three input values as floats. Validates input: shows an alert if any value is `NaN`, shows an alert if `T` is `0`. On success, calls `calculateUYT()` and `updateCalculationDisplay()`. Wrapped in a `try/catch` block to handle the divide-by-zero error.
- **`handleClear()`** — resets all input fields to empty strings, resets state variables (`currentU`, `currentY`, `currentT`, `defaultResult`) to `0`, and sets both display elements (`currentCalculation`, `currentResult`) to `'0'`.

**Event listeners:**

| Element          | Event    | Handler            |
|------------------|----------|--------------------|
| `calculateBtn`   | `click`  | `handleCalculate`  |
| `clearBtn`       | `click`  | `handleClear`      |
| `uInput`         | `keypress` (Enter) | `handleCalculate` |
| `yInput`         | `keypress` (Enter) | `handleCalculate` |
| `tInput`         | `keypress` (Enter) | `handleCalculate` |

**Header rendering:**

On `DOMContentLoaded`, the script calls `renderHeader()` to populate the navigation:

```js
renderHeader('header-container', 'My Calculator', [
  { label: 'Home', href: '../index.html' },
  { label: 'About', href: '../about.html' },
  { label: 'Basic Calculator', href: '../basics-10-function-refactoring/index.html' },
  { label: 'XPY Calculator', href: '../xpy/index.html' },
  { label: 'UYT Calculator', href: 'index.html' }
]);
```

> **Note:** `Header.js` is loaded from the parent project via the relative path `../assets/scripts/components/Header.js`.

## Styles

### uyt.css

Page-specific styles for the UYT calculator. Key selectors:

| Selector                          | Description                                                                 |
|-----------------------------------|-----------------------------------------------------------------------------|
| `#uyt-calculator`                 | Section container — `40rem` width, `1px solid #023d6d` border, `10px` border-radius, centered text |
| `#uyt-calculator h2`              | Heading — `#023d6d` color, no top margin                                    |
| `#uyt-calculator p`               | Paragraph text — `1.1rem` font size                                         |
| `#uyt-inputs`                     | Flexbox container — centered, `0.5rem` gap, `flex-wrap: wrap`              |
| `#uyt-inputs input`               | Input fields — `1.5rem` font size, `6rem` width, `2px solid #023d6d` border, `5px` border-radius |
| `#uyt-inputs input:focus`         | Removes default outline on focus                                            |
| `#multiply-symbol`, `#divide-symbol` | Operator symbols — `1.5rem` font size, bold, `#023d6d` color             |
| `#uyt-actions`                    | Action button container — flex, centered, `1rem` gap                       |
| `#uyt-actions button`             | Buttons — `#023d6d` background, white text, `5px` border-radius, transition on background and border-color |
| `#uyt-actions button:hover/active`| Hover/active state — `#084f88` background and border-color                 |
| `#btn-clear`                      | Clear button override — `#6c757d` gray background with `!important`        |
| `#btn-clear:hover/active`         | Clear button hover/active — `#5a6268` background with `!important`         |

## Dependencies

The UYT calculator depends on the shared **Header component** from the parent project. The HTML (`/uyt/index.html`) loads it via the relative path:

```text
../assets/scripts/components/Header.js
```

It also loads the parent project's global stylesheet:

```text
../assets/styles/app.css
```

This provides global styles for the header navigation and the `#results` section.

## Input Validation

The calculator validates user input before performing any calculation:

1. **NaN check** — All three inputs (`U`, `Y`, `T`) are parsed with `parseFloat()`. If any parsed value is `NaN`, an alert is shown:

   > "Please enter valid numbers for U, Y, and T."

2. **Divide-by-zero check** — If `T` equals `0`, an alert is shown:

   > "Cannot divide by zero. Please enter a non-zero value for T."

3. **Enter key support** — Pressing the **Enter** key in any of the three input fields triggers `handleCalculate()`, allowing keyboard-driven calculation without clicking the Calculate button.

