# XPY Calculator Assets

## Overview

This directory holds the script and style for the **XPY (X Power Y)** calculator sub-project located at `/xpy/`. The calculator computes X raised to the power of Y using `Math.pow()`, where the user enters a base (X) and an exponent (Y) and the result is displayed on the page.

## Directory Structure

```text
assets/
├── scripts/
│   └── xpy.js
└── styles/
    └── xpy.css
```

## Scripts

### xpy.js

XPY calculator logic. On load, the script queries the following DOM elements:

| Variable              | Element ID            |
|-----------------------|-----------------------|
| `baseInput`           | `#input-base`         |
| `exponentInput`       | `#input-exponent`     |
| `calculateBtn`        | `#btn-calculate`      |
| `clearBtn`            | `#btn-clear`          |
| `currentCalculation`  | `#current-calculation`|
| `currentResult`       | `#current-result`     |

State variables:

| Variable          | Initial Value |
|-------------------|---------------|
| `defaultResult`   | `0`           |
| `currentBase`     | `0`           |
| `currentExponent` | `0`           |

#### Functions

- **`calculateXPY(base, exponent)`** — Computes `Math.pow(base, exponent)`. Returns the numeric result.

- **`updateCalculationDisplay(base, exponent, result)`** — Sets `currentCalculation` text content to `"base ^ exponent"` format and `currentResult` text content to the result value.

- **`handleCalculate()`** — Reads and parses the base and exponent input values as floats. Validates the inputs: if either value is `NaN`, shows an alert (`"Please enter valid numbers for both base and exponent."`) and returns early. On success, updates `currentBase` and `currentExponent`, calls `calculateXPY()` to compute the result, and calls `updateCalculationDisplay()` to render it.

- **`handleClear()`** — Resets both input fields to empty strings, resets all state variables (`currentBase`, `currentExponent`, `defaultResult`) to `0`, and sets both display elements (`currentCalculation`, `currentResult`) to `'0'`.

#### Event Listeners

| Event              | Target            | Handler           |
|--------------------|-------------------|-------------------|
| `click`            | `calculateBtn`    | `handleCalculate` |
| `click`            | `clearBtn`        | `handleClear`     |
| `keypress` (Enter) | `baseInput`       | `handleCalculate` |
| `keypress` (Enter) | `exponentInput`   | `handleCalculate` |

#### Header Rendering

On `DOMContentLoaded`, the script calls `renderHeader()` to populate the navigation bar:

```js
renderHeader('header-container', 'My Calculator', [
  { label: 'Home', href: '../index.html' },
  { label: 'About', href: '../about.html' },
  { label: 'Basic Calculator', href: '../basics-10-function-refactoring/index.html' },
  { label: 'XPY Calculator', href: 'index.html' },
  { label: 'UYT Calculator', href: '../uyt/index.html' }
]);
```

> **Note:** `Header.js` is loaded from the parent project via the relative path `../assets/scripts/components/Header.js`. The `renderHeader` function is defined in that file and is available globally because the script tag uses the `defer` attribute.

## Styles

### xpy.css

Page-specific styles for the XPY calculator. Key selectors:

| Selector                  | Description                                                                                       |
|---------------------------|---------------------------------------------------------------------------------------------------|
| `#xpy-calculator`         | Main calculator section. 40rem width (max 90%), `#023d6d` border, 10px border-radius, centered text. |
| `#xpy-calculator h2`      | Heading inside the calculator section. `#023d6d` color.                                           |
| `#xpy-calculator p`       | Paragraph text. 1.1rem font size.                                                                 |
| `#xpy-inputs`             | Flexbox container, centered alignment, 1rem gap.                                                  |
| `#xpy-inputs input`       | Input fields. 2rem font size, 8rem width, 2px solid `#023d6d` border, 5px border-radius.         |
| `#xpy-inputs input:focus` | Removes default outline on focus.                                                                 |
| `#power-symbol`           | The `^` symbol between inputs. 2rem font size, bold weight, `#023d6d` color.                      |
| `#xpy-actions`            | Button container. Flexbox, centered, 1rem gap.                                                    |
| `#xpy-actions button`     | Buttons. `#023d6d` background, white text, 5px radius, transition on background and border-color. |
| `#xpy-actions button:hover` / `:active` | Hover/active state. `#084f88` background and border-color.                            |
| `#btn-clear`              | Override for the Clear button. `#6c757d` gray background and border-color with `!important`.      |
| `#btn-clear:hover` / `:active` | Hover/active state for Clear. `#5a6268` background and border-color with `!important`.        |

## Dependencies

The XPY calculator depends on the shared **Header component** from the parent project. The HTML at `/xpy/index.html` loads it via the relative path:

```js
../assets/scripts/components/Header.js
```

This script defines the global `renderHeader()` function used to populate the `#header-container` element with the site navigation.

The page also loads the parent project's global stylesheet:

```text
../assets/styles/app.css
```

This provides shared styles for the header and the `#results` section that displays the calculation and result.

## Input Validation

- Both inputs are parsed with `parseFloat()`. If either result is `NaN`, an alert is shown:

  > "Please enter valid numbers for both base and exponent."

- The **Enter** key triggers calculation from either the base or exponent input field, providing a keyboard-friendly workflow alongside the Calculate button.

- Unlike the UYT calculator, there is **no divide-by-zero check** since `Math.pow()` handles all numeric inputs (including negative exponents, zero, and fractional values) without throwing errors.

