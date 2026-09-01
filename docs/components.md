# Header Component Reference

This document provides a complete API reference for the reusable Header component used across the My Calculator project.

## Header Component

**Location:** `assets/scripts/components/Header.js`
**Also at:** `basics-10-function-refactoring/assets/scripts/components/Header.js` (duplicate copy for the sub-site)

### Overview

A reusable vanilla JavaScript header component that creates a styled `<header>` element with a title and optional navigation links. No framework dependency — pure DOM manipulation. Included via `<script defer>` on every page.

The component creates a `<header>` containing:
- An `<h1>` element with the provided title
- A `<nav>` element with anchor links (if `navLinks` are provided)

### API

#### `createHeader(title, navLinks = [])`

Creates and returns a header DOM element. Does not attach it to the document.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | `string` | (required) | The title text displayed in an `<h1>` element |
| `navLinks` | `Array<{label: string, href: string}>` | `[]` | Optional array of navigation link objects |

**Returns:** `HTMLElement` — A `<header>` element containing the title and optional `<nav>` with anchor links.

**Example:**

```javascript
const header = createHeader('My Page', [
  { label: 'Home', href: 'index.html' },
  { label: 'About', href: 'about.html' }
]);
document.body.prepend(header);
```

---

#### `renderHeader(containerId, title, navLinks = [])`

Finds a container element by ID and appends a newly created header into it.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `containerId` | `string` | (required) | The DOM ID of the container element (e.g., `'header-container'`) |
| `title` | `string` | (required) | The title text |
| `navLinks` | `Array<{label: string, href: string}>` | `[]` | Optional navigation links |

**Returns:** `void`

**Behavior:** Logs an error to the console if the container element is not found:

```javascript
console.error(`Container with ID '${containerId}' not found`);
```

**Example:**

```javascript
renderHeader('header-container', 'Welcome', [
  { label: 'Home', href: 'index.html' }
]);
```

---

#### `replaceHeader(title, navLinks = [])`

Replaces any existing `<header>` element in the document with a new one. If no `<header>` exists, prepends the new header to `<body>`.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | `string` | (required) | The title text |
| `navLinks` | `Array<{label: string, href: string}>` | `[]` | Optional navigation links |

**Returns:** `void`

**Example:**

```javascript
replaceHeader('New Title', []);
```

### Module Export

The component checks for a CommonJS environment and exports all three functions:

```javascript
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createHeader, renderHeader, replaceHeader };
}
```

This allows the component to be used both:
- **In the browser** — via `<script>` tag (functions are available globally)
- **In Node.js** — via `require('./Header.js')` (for testing or SSR)

### Usage Pattern

Every page in the project follows this standard pattern:

1. **HTML placeholder** — Include a `<div id="header-container"></div>` in the page body
2. **Include Header.js** — Add `<script src="path/to/Header.js" defer></script>` in the `<head>`
3. **Include page script** — Add `<script src="path/to/page-script.js" defer></script>` in the `<head>`
4. **Initialize on DOMContentLoaded** — The page script calls `renderHeader()` (or `replaceHeader()`) inside a `DOMContentLoaded` event listener:

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

The `if (typeof renderHeader === 'function')` guard ensures the page doesn't throw an error if Header.js fails to load.

### Styling

The header is styled by global rules in `assets/styles/app.css`:

| Property | Value |
|----------|-------|
| `background` | `#023d6d` (dark blue) |
| `color` | `white` |
| `padding` | `1rem` |
| `text-align` | `center` |
| `box-shadow` | `0 2px 8px rgba(0, 0, 0, 0.26)` |
| `width` | `100%` |

Navigation links (`header nav a`):

| Property | Value |
|----------|-------|
| `color` | `white` |
| `text-decoration` | `none` |
| `font-size` | `1rem` |
| `padding` | `0.5rem 1rem` |
| `border` | `1px solid white` |
| `border-radius` | `5px` |
| `transition` | `background 0.2s` |

Hover state (`header nav a:hover`):

| Property | Value |
|----------|-------|
| `background` | `rgba(255, 255, 255, 0.2)` |

### Pages and Their Navigation Configurations

Each page configures its own title and navigation links. The table below shows the exact configuration used by each page (verified from source):

| Page | Script | Title | Nav Links |
|------|--------|-------|-----------|
| `index.html` | `assets/scripts/home.js` | Welcome to My Calculator | Home, About, ASD, Basic Calculator, XPY Calculator |
| `about.html` | `assets/scripts/about.js` | About My Calculator | Home, About, ASD, Basic Calculator, XPY Calculator |
| `asd.html` | `assets/scripts/asd.js` | ASD Calculator | Home, About, ASD, Basic Calculator, XPY Calculator, UYT Calculator |
| `addop.html` | `assets/scripts/addop.js` | ADDOP Calculator | Home, About, ADDOP, ASD, Basic Calculator, XPY Calculator |
| `basics-10-function-refactoring/index.html` | `basics-10-function-refactoring/assets/scripts/app.js` | The Unconventional Calculator | Home (`../index.html`), About (`../about.html`), Basic Calculator (`index.html`), XPY Calculator (`../xpy/index.html`) |
| `basics-10-function-refactoring/home.html` | `basics-10-function-refactoring/assets/scripts/home.js` | Welcome to My Calculator | *(none — uses `replaceHeader` with empty array)* |
| `xpy/index.html` | `xpy/assets/scripts/xpy.js` | My Calculator | Home (`../index.html`), About (`../about.html`), Basic Calculator (`../basics-10-function-refactoring/index.html`), XPY Calculator (`index.html`), UYT Calculator (`../uyt/index.html`) |
| `uyt/index.html` | `uyt/assets/scripts/uyt.js` | My Calculator | Home (`../index.html`), About (`../about.html`), Basic Calculator (`../basics-10-function-refactoring/index.html`), XPY Calculator (`../xpy/index.html`), UYT Calculator (`index.html`) |

> **Note:** The `basics-10-function-refactoring/home.html` page is the only page that uses `replaceHeader()` instead of `renderHeader()`. It passes an empty `navLinks` array, resulting in a header with a title but no navigation.

