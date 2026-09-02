# Assets Directory

This directory holds all shared stylesheets, page-specific styles, JavaScript entry points, and the reusable Header component for the **My Calculator** web application — a static HTML multi-page calculator site. Every HTML page in the project references files from this directory to render its UI and wire up interactivity.

## Table of Contents

- [Directory Structure](#directory-structure)
- [Stylesheets](#stylesheets)
  - [`app.css`](#assetsstylesappcss)
  - [`home.css`](#assetsstyleshomecss)
  - [`about.css`](#assetsstylesaboutcss)
  - [`gallery.css`](#assetsstylesgallerycss)
  - [`asd.css`](#assetsstylesasdcss)
  - [`cvxz.css`](#assetsstylescvxzcss)
  - [`nnn.css`](#assetsstylesnnncss)
  - [`qwe.css`](#assetsstylesqwecss)
- [Scripts](#scripts)
  - [`components/Header.js`](#assetsscriptscomponentsheaderjs)
  - [`home.js`](#assetsscriptshomejs)
  - [`about.js`](#assetsscriptsaboutjs)
  - [`gallery.js`](#assetsscriptsgalleryjs)
  - [`asd.js`](#assetsscriptsasdjs)
  - [`cvxz.js`](#assetsscriptscvxzjs)
  - [`nnn.js`](#assetsscriptsnnnjs)
  - [`qwe.js`](#assetsscriptsqwejs)
- [Generated Images](#generated-images)
- [Naming Conventions](#naming-conventions)
- [Loading Order](#loading-order)
- [Sub-Project Assets](#sub-project-assets)
  - [`basics-10-function-refactoring/assets/`](#basics-10-function-refactoringassets)
  - [`uyt/assets/`](#uytassets)
  - [`xpy/assets/`](#xpyassets)
  - [Shared Root References](#shared-root-references)
- [Known Issues](#known-issues)

---

## Directory Structure

```
assets/
├── README.md
├── generated/              # Generated images (hero, product photos)
├── scripts/
│   ├── components/
│   │   └── Header.js       # Reusable header component (shared across all pages)
│   ├── about.js            # Entry point for about.html
│   ├── asd.js              # Entry point for asd.html
│   ├── cvxz.js             # Entry point for cvxz.html
│   ├── gallery.js          # Entry point for gallery.html (includes modal logic)
│   ├── home.js             # Entry point for index.html (landing page)
│   ├── nnn.js              # Entry point for nnn.html
│   └── qwe.js              # Entry point for qwe.html
└── styles/
    ├── app.css             # Global styles (reset, header, calculator layout)
    ├── about.css           # Page styles for about.html
    ├── asd.css             # Page styles for asd.html
    ├── cvxz.css            # Page styles for cvxz.html
    ├── gallery.css         # Page styles for gallery.html (cards + modal)
    ├── home.css            # Page styles for index.html (landing page sections)
    ├── nnn.css             # Page styles for nnn.html
    └── qwe.css             # Page styles for qwe.html
```

---

## Stylesheets

All CSS files live under `assets/styles/`. The global stylesheet (`app.css`) is loaded on every page; each page then loads its own matching stylesheet for page-specific styling.

| File | Serves | Type |
|------|--------|------|
| `app.css` | All pages | Global / shared |
| `home.css` | `index.html` | Page-specific (landing page) |
| `about.css` | `about.html` | Page-specific |
| `asd.css` | `asd.html` | Page-specific |
| `cvxz.css` | `cvxz.html` | Page-specific |
| `gallery.css` | `gallery.html` | Page-specific |
| `nnn.css` | `nnn.html` | Page-specific |
| `qwe.css` | `qwe.html` | Page-specific |

---

### `assets/styles/app.css`

**Serves:** Every HTML page in the project (global stylesheet).

**Key selectors and what they style:**

| Selector | Description |
|----------|-------------|
| `*` | Universal box-sizing reset: `box-sizing: border-box` |
| `html` | Sets `font-family: 'Roboto', open-sans` |
| `body` | Zeroes margin (`margin: 0`) |
| `header` | Dark blue background (`#023d6d`), white text, centered, `box-shadow: 0 2px 8px rgba(0,0,0,0.26)`, full width |
| `header nav` | Top margin spacing (`margin-top: 0.5rem`) |
| `header nav a` | Bordered pill-shaped nav links — white text, `1px solid white` border, `border-radius: 5px`, hover effect via `transition: background 0.2s` |
| `header nav a:hover` | Semi-transparent white background (`rgba(255,255,255,0.2)`) |
| `#calculator`, `#results` | Calculator and results sections — `40rem` width, `max-width: 90%`, `1px solid #023d6d` border, `border-radius: 10px`, auto-centered |
| `#results` | Centered text alignment |
| `#calculator input` | Large input field — `font-size: 3rem`, centered text, `2px solid #023d6d` border, `10rem` width, block display |
| `#calculator input:focus` | Removes outline (`outline: none`) |
| `#calculator button` | Calculator buttons — `#023d6d` background, white text, `1px solid #023d6d` border, pointer cursor |
| `#calculator button:hover`, `#calculator button:active` | Hover/active state — background and border change to `#084f88` |
| `#calc-actions button` | Action button sizing — `width: 4rem` |
| `#calc-actions` | Top margin (`margin-top: 1rem`) and centered text |

---

### `assets/styles/home.css`

**Serves:** `index.html` (landing page).

**Key selectors and what they style:**

| Selector | Description |
|----------|-------------|
| `:root` | Defines CSS custom properties with `--pa-*` prefix (see table below) |

**`--pa-*` custom property palette:**

| Variable | Value | Description |
|----------|-------|-------------|
| `--pa-teal` | `#0a7c5a` | Primary teal |
| `--pa-teal-dark` | `#065c42` | Teal hover |
| `--pa-accent` | `#f5a623` | Warm accent |
| `--pa-accent-dark` | `#d4881a` | Accent hover |
| `--pa-bg` | `#faf6f0` | Light background |
| `--pa-text` | `#2d2d2d` | Dark text |
| `--pa-muted` | `#6b6b6b` | Muted text |
| `--pa-white` | `#ffffff` | White |
| `--pa-border` | `#eeeeee` | Border color |
| `--pa-shadow` | `0 2px 8px rgba(0,0,0,0.08)` | Card shadow |
| `--pa-shadow-hover` | `0 8px 24px rgba(0,0,0,0.15)` | Card hover shadow |
| `--pa-radius` | `12px` | Standard border radius |
| `--pa-radius-sm` | `8px` | Small border radius |
| `--pa-max-width` | `1200px` | Content max width |
| `--pa-transition` | `0.25s ease` | Default transition |
| `body` | Landing page background (`var(--pa-bg)`), text color, `line-height: 1.6` |
| `#cart-count` | Cart badge — accent background, white text, pill-shaped (`border-radius: 999px`), inline-block |
| `#hero`, `#features`, `#products`, `#testimonials`, `#newsletter`, `#footer` | Shared section layout — `max-width: 1200px`, auto margins, responsive padding (`3rem` default, `4rem` on `min-width: 769px`) |
| `#features h2`, `#products h2`, `#testimonials h2` | Section headings — centered, `2rem`, bold; `::after` pseudo-element creates accent underline |
| `#btn-shop`, `#btn-learn`, `#btn-subscribe`, `.btn-add-cart` | Shared button base — `font-weight: 600`, `0.9rem 2rem` padding, rounded, transition on background/transform/border/shadow |
| `#btn-shop`, `.btn-add-cart` | Primary filled teal button — `var(--pa-teal)` background, hover darkens to `var(--pa-teal-dark)` with `translateY(-2px)` lift |
| `#btn-learn` | Secondary outline button — transparent background, teal border/text, hover fills teal |
| `#hero` | Flexbox layout — `align-items: center`, `justify-content: space-between`, `3rem` gap |
| `#hero .hero-text` | Flex column — `flex: 1 1 50%` |
| `#hero .hero-image-wrap` | Flex column — `flex: 1 1 45%`, centered |
| `#hero h1` | Hero headline — `2.5rem`, bold, `line-height: 1.2` |
| `#hero .hero-subheadline` | Subheadline — `1.15rem`, muted color |
| `#hero .hero-actions` | Action button row — flex, wrap, `1rem` gap |
| `#hero-image` | Hero image — `max-width: 100%`, auto height, rounded |
| `#features .features-grid` | Feature card grid — `repeat(auto-fit, minmax(220px, 1fr))`, `1.5rem` gap |
| `.feature-card` | Feature card — white background, rounded, shadow, hover lift (`translateY(-4px)`) |
| `.feature-card .feature-icon` | Icon — `2.5rem` font size |
| `#products .products-grid` | Product card grid — `repeat(auto-fit, minmax(240px, 1fr))`, `1.5rem` gap |
| `.product-card` | Product card — white background, border, rounded, flex column, hover lift |
| `.product-img` | Product image — `100%` width, `200px` height, `object-fit: cover` |
| `.product-card .product-body` | Card body — `1.25rem` padding, flex column |
| `.product-card .price` | Price — `1.3rem`, bold, accent color |
| `.btn-add-cart` | Add-to-cart button — full width, block display |
| `#testimonials .testimonials-grid` | Testimonial card grid — `repeat(auto-fit, minmax(280px, 1fr))`, `1.5rem` gap |
| `.testimonial-card` | Testimonial card — white, rounded, shadow, hover lift |
| `.testimonial-card .stars` | Star rating — accent color, `1.1rem`, letter-spaced |
| `.testimonial-card blockquote` | Quote — italic, `1rem` |
| `.testimonial-card .testimonial-name` | Name — bold, teal color |
| `#newsletter` | Newsletter section — teal background, white text, rounded, centered |
| `#newsletter h2` | Newsletter heading — white, `2rem`, accent underline `::after` |
| `#newsletter .newsletter-form` | Form — flex, centered, `1rem` gap, `max-width: 500px` |
| `#newsletter-email` | Email input — flex grow, padded, rounded, focus ring |
| `#btn-subscribe` | Subscribe button — accent background, white text, hover darkens |
| `#footer` | Footer — dark background (`var(--pa-text)`), white text, centered, full width |
| `#footer .footer-links` | Footer link list — flex, centered, wrap, `1.5rem` gap, no list-style |
| `#footer .footer-links a:hover` | Footer link hover — accent color |

**Responsive — `@media (max-width: 768px)`:**

- `#hero` stacks vertically (`flex-direction: column`), centered text, reduced gap
- `#hero h1` shrinks to `1.8rem`
- Section headings shrink to `1.6rem`
- Newsletter form stacks vertically (`flex-direction: column`), inputs and button go full width
- Footer links tighten gap to `1rem`

---

### `assets/styles/about.css`

**Serves:** `about.html`.

**Key selectors and what they style:**

| Selector | Description |
|----------|-------------|
| `#about-content` | Centered, bordered card — `40rem` width, `max-width: 90%`, `1px solid #023d6d` border, `border-radius: 10px`, `2rem` padding, centered text |
| `#about-content h2` | Section heading — `#023d6d` color, no top margin |
| `#about-content p` | Body paragraph — `1.1rem`, `line-height: 1.6` |
| `#about-actions` | Action button container — `margin-top: 2rem` |
| `#btn-home` | Gray button — background `#6c757d`, hover `#5a6268`, `1rem 2rem` padding, `5px` border-radius |
| `#btn-start` | Dark blue button — background `#023d6d`, hover `#084f88`, `1rem 2rem` padding, `5px` border-radius |
| `#btn-uyt` | Orange button — background `#fd7e14`, hover `#e56b0a`, left margin `1rem` |
| `#about-info` | Info section — bordered card, `1.5rem` padding, `#023d6d` color |
| `#about-info h3` | Info heading — centered, `#023d6d` color |
| `#about-info ul` | Unstyled list — `list-style: none`, no padding/margin |
| `#about-info li` | List items — `#f0f4f8` background, `0.75rem 1rem` padding, `5px` border-radius, `1px solid #023d6d` border, bold text |
| `#about-info li:last-child` | Removes bottom margin on last item |

---

### `assets/styles/gallery.css`

**Serves:** `gallery.html`.

**Key selectors and what they style:**

| Selector | Description |
|----------|-------------|
| `#gallery-intro` | Intro section — centered, bordered card, `40rem` width, `max-width: 90%` |
| `#gallery-intro h2` | Intro heading — `#023d6d` color |
| `#gallery-intro p` | Intro paragraph — `1.1rem`, `line-height: 1.6` |
| `#gallery-grid` | CSS grid — `repeat(auto-fill, minmax(15rem, 1fr))`, `1.5rem` gap, `max-width: 60rem`, auto-centered |
| `.gallery-card` | Clickable card — `#f0f4f8` background, `1px solid #023d6d` border, `border-radius: 10px`, pointer cursor, transition on transform/box-shadow |
| `.gallery-card:hover` | Hover lift — `translateY(-4px)`, `box-shadow: 0 4px 12px rgba(0,0,0,0.15)` |
| `.card-icon` | Card icon — `2rem` font size, `#023d6d` color, bold |
| `.card-title` | Card title — `#023d6d` color |
| `.card-desc` | Card description — `0.95rem`, `line-height: 1.5`, `#333` color |
| `.card-link` | Blue link button — `#023d6d` background, white text, `5px` border-radius, hover `#084f88` |
| `.modal-overlay` | Modal overlay — `position: fixed`, `inset: 0`, flex-centered, `rgba(0,0,0,0.5)` background, `z-index: 1000` |
| `.modal-overlay.hidden` | Hides modal — `display: none` |
| `.modal-content` | Modal content — white background, `border-radius: 10px`, `2rem` padding, `max-width: 25rem`, `90%` width, centered text, `#023d6d` color |
| `.modal-close` | Close button — absolute positioned (top-right), no background/border, `1.5rem` font, pointer cursor |
| `#modal-link` | Modal link button — `#023d6d` background, white text, `5px` border-radius, hover `#084f88` |

**Responsive — `@media (max-width: 600px)`:**

- `#gallery-grid` switches to single column (`grid-template-columns: 1fr`)

---

### `assets/styles/asd.css`

**Serves:** `asd.html`.

Follows the same structural pattern as `about.css` but uses `#asd-*` ID selectors.

| Selector | Description |
|----------|-------------|
| `#asd-content` | Centered, bordered card — `40rem` width, `max-width: 90%`, `#023d6d` border, `10px` border-radius |
| `#asd-content h2` | Section heading — `#023d6d` color |
| `#asd-content p` | Body paragraph — `1.1rem`, `line-height: 1.6` |
| `#asd-actions` | Action button container — `margin-top: 2rem` |
| `#btn-home` | Gray button — background `#6c757d`, hover `#5a6268` |
| `#btn-start` | Blue button — background `#023d6d`, hover `#084f88` |
| `#btn-about` | Green button — background `#28a745`, hover `#218838` |
| `#asd-info` | Info section — bordered card, `1.5rem` padding |
| `#asd-info h3` | Info heading — centered, `#023d6d` color |
| `#asd-info ul` | Unstyled list — `list-style: none`, no padding/margin |
| `#asd-info li` | List items — `#f0f4f8` background, `1px solid #023d6d` border, bold text |
| `#asd-info li:last-child` | Removes bottom margin on last item |

---

### `assets/styles/cvxz.css`

**Serves:** `cvxz.html`.

Follows the same structural pattern as `about.css` but uses `#cvxz-*` ID selectors.

| Selector | Description |
|----------|-------------|
| `#cvxz-content` | Centered, bordered card — `40rem` width, `max-width: 90%`, `#023d6d` border, `10px` border-radius |
| `#cvxz-content h2` | Section heading — `#023d6d` color |
| `#cvxz-content p` | Body paragraph — `1.1rem`, `line-height: 1.6` |
| `#cvxz-actions` | Action button container — `margin-top: 2rem` |
| `#btn-home` | Gray button — background `#6c757d`, hover `#5a6268` |
| `#btn-start` | Blue button — background `#023d6d`, hover `#084f88` |
| `#btn-uyt` | Orange button — background `#fd7e14`, hover `#e56b0a` |
| `#cvxz-info` | Info section — bordered card, `1.5rem` padding |
| `#cvxz-info h3` | Info heading — centered, `#023d6d` color |
| `#cvxz-info ul` | Unstyled list — `list-style: none`, no padding/margin |
| `#cvxz-info li` | List items — `#f0f4f8` background, `1px solid #023d6d` border, bold text |
| `#cvxz-info li:last-child` | Removes bottom margin on last item |

---

### `assets/styles/nnn.css`

**Serves:** `nnn.html`.

Follows the same structural pattern as `about.css` but uses `#nnn-*` ID selectors.

| Selector | Description |
|----------|-------------|
| `#nnn-content` | Centered, bordered card — `40rem` width, `max-width: 90%`, `#023d6d` border, `10px` border-radius |
| `#nnn-content h2` | Section heading — `#023d6d` color |
| `#nnn-content p` | Body paragraph — `1.1rem`, `line-height: 1.6` |
| `#nnn-actions` | Action button container — `margin-top: 2rem` |
| `#btn-home` | Gray button — background `#6c757d`, hover `#5a6268` |
| `#btn-start` | Blue button — background `#023d6d`, hover `#084f88` |
| `#btn-uyt` | Orange button — background `#fd7e14`, hover `#e56b0a` |
| `#nnn-info` | Info section — bordered card, `1.5rem` padding |
| `#nnn-info h3` | Info heading — centered, `#023d6d` color |
| `#nnn-info ul` | Unstyled list — `list-style: none`, no padding/margin |
| `#nnn-info li` | List items — `#f0f4f8` background, `1px solid #023d6d` border, bold text |
| `#nnn-info li:last-child` | Removes bottom margin on last item |

---

### `assets/styles/qwe.css`

**Serves:** `qwe.html`.

Follows the same structural pattern as `about.css` but uses `#qwe-*` ID selectors.

| Selector | Description |
|----------|-------------|
| `#qwe-content` | Centered, bordered card — `40rem` width, `max-width: 90%`, `#023d6d` border, `10px` border-radius |
| `#qwe-content h2` | Section heading — `#023d6d` color |
| `#qwe-content p` | Body paragraph — `1.1rem`, `line-height: 1.6` |
| `#qwe-actions` | Action button container — `margin-top: 2rem` |
| `#btn-home` | Gray button — background `#6c757d`, hover `#5a6268` |
| `#btn-start` | Blue button — background `#023d6d`, hover `#084f88` |
| `#btn-uyt` | Orange button — background `#fd7e14`, hover `#e56b0a` |
| `#qwe-info` | Info section — bordered card, `1.5rem` padding |
| `#qwe-info h3` | Info heading — centered, `#023d6d` color |
| `#qwe-info ul` | Unstyled list — `list-style: none`, no padding/margin |
| `#qwe-info li` | List items — `#f0f4f8` background, `1px solid #023d6d` border, bold text |
| `#qwe-info li:last-child` | Removes bottom margin on last item |

---

## Scripts

All JavaScript files live under `assets/scripts/`. The shared Header component (`components/Header.js`) is loaded on every page; each page then loads its own matching entry-point script.

| File | Serves | Type |
|------|--------|------|
| `components/Header.js` | All pages | Shared component |
| `home.js` | `index.html` | Entry point (landing page) |
| `about.js` | `about.html` | Entry point |
| `asd.js` | `asd.html` | Entry point |
| `cvxz.js` | `cvxz.html` | Entry point |
| `gallery.js` | `gallery.html` | Entry point (includes modal logic) |
| `nnn.js` | `nnn.html` | Entry point |
| `qwe.js` | `qwe.html` | Entry point |

---

### `assets/scripts/components/Header.js`

**Serves:** All HTML pages (shared component, loaded via `<script defer>`).

A reusable header component that provides consistent navigation across every page. Exposes three global functions:

| Function | Description |
|----------|-------------|
| `createHeader(title, navLinks)` | Creates and returns a `<header>` `HTMLElement` containing an `<h1>` with the given title and, optionally, a `<nav>` with anchor links built from the `navLinks` array (`{ label, href }`). |
| `renderHeader(containerId, title, navLinks)` | Finds a container element by its ID, calls `createHeader()`, and appends the resulting header to that container. Logs an error if the container is not found. |
| `replaceHeader(title, navLinks)` | Replaces an existing `<header>` element in the document with a newly created header. If no `<header>` exists, prepends the new header to `<body>`. |

The file also exports all three functions via `module.exports` for Node.js environments:

```js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createHeader, renderHeader, replaceHeader };
}
```

JSDoc comments are included for all three functions, documenting parameters and return types.

---

### `assets/scripts/home.js`

**Serves:** `index.html` (landing page).

On `DOMContentLoaded`, calls `renderHeader()` to inject the header into the `#header-container` element:

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

Nav links: Home, About, ASD, Basic Calculator, XPY Calculator, Gallery.

---

### `assets/scripts/about.js`

**Serves:** `about.html`.

On `DOMContentLoaded`, calls `renderHeader()` with the title `'About My Calculator'` and nav links to Home, About, ASD, Basic Calculator, and XPY Calculator.

---

### `assets/scripts/gallery.js`

**Serves:** `gallery.html`.

On `DOMContentLoaded`, calls `renderHeader()` with the title `'Calculator Gallery'` and the same nav links as `home.js` (Home, About, ASD, Basic Calculator, XPY Calculator, Gallery).

Additionally, wires up gallery card interactivity:

1. **Card click:** Selects all `.gallery-card` elements and attaches click listeners. When a card is clicked, the handler reads the following from the clicked card:
   - `data-calc` attribute (calculator identifier)
   - `.card-title` text content
   - `.card-desc` text content
   - `.card-link` `href` attribute

   These values populate the modal elements `#modal-title`, `#modal-desc`, and `#modal-link`. The modal is then shown by removing the `hidden` class from `#modal-overlay`.

2. **Close modal (`closeModal()`):** Adds the `hidden` class back to `#modal-overlay`, hiding the modal.

3. **Close triggers:**
   - `#modal-close` button click
   - Overlay click (clicking outside `.modal-content`)
   - `Escape` key press

4. **Propagation stop:** Clicks on `.modal-content` call `event.stopPropagation()` to prevent the overlay click handler from firing when interacting with modal content.

---

### `assets/scripts/asd.js`

**Serves:** `asd.html`.

On `DOMContentLoaded`, calls `renderHeader()` with the title `'ASD Calculator'` and nav links.

---

### `assets/scripts/cvxz.js`

**Serves:** `cvxz.html`.

On `DOMContentLoaded`, calls `renderHeader()` with the title `'CVXZ Calculator'`. Also declares a `const TYU = 'TYU'` constant at the top of the file.

---

### `assets/scripts/nnn.js`

**Serves:** `nnn.html`.

On `DOMContentLoaded`, calls `renderHeader()` with the title `'NNN Calculator'` and nav links.

---

### `assets/scripts/qwe.js`

**Serves:** `qwe.html`.

On `DOMContentLoaded`, calls `renderHeader()` with the title `'QWE Calculator'` and nav links including a QWE link. Also declares a `const TYU = 'TYU'` constant at the top of the file.

---

## Generated Images

The `assets/generated/` directory is intended to hold generated image assets referenced by `index.html` (the landing page). The following files are referenced in the HTML:

| File | Used In | Description |
|------|---------|-------------|
| `hero-pets.jpg` | Hero section (`#hero`, `#hero-image`) | Main hero image — "Happy pet with premium accessories" |
| `product-1.jpg` | Product card 1 (`#products`) | "Cozy round pet bed in warm terracotta" |
| `product-2.jpg` | Product card 2 (`#products`) | "Adjustable pet harness in teal and orange" |
| `product-3.jpg` | Product card 3 (`#products`) | "Ceramic pet food bowl in cream and sage" |
| `product-4.jpg` | Product card 4 (`#products`) | "Interactive pet toy set with rope, ball and wand" |

> **Note:** This directory is currently empty — images have not yet been generated. The landing page will still render, but image placeholders or broken image icons will appear until the assets are placed here.

---

## Naming Conventions

The project follows a consistent naming scheme across HTML, CSS, and JavaScript files:

1. **Page-matched file names:** Each HTML page has a matching CSS file and JS file named after the page. For example, `about.html` → `about.css` + `about.js`. The landing page (`index.html`) uses `home.css` and `home.js`.

2. **Global stylesheet first:** `app.css` is the global/shared stylesheet loaded on every page **before** the page-specific stylesheet. It owns the reset, font, header, and calculator layout styles.

3. **Shared component first:** `Header.js` in `components/` is the shared component loaded on every page **before** the page-specific script. It defines the `createHeader`, `renderHeader`, and `replaceHeader` functions that page scripts call.

4. **Deferred execution:** All scripts use the `defer` attribute and listen for the `DOMContentLoaded` event before executing. This ensures the DOM is fully parsed before any script runs.

5. **Page-specific ID selectors:** Page-specific CSS uses `#page-name-*` ID selectors to scope styles to each page. For example, `about.css` uses `#about-content`, `#about-actions`, `#about-info`; `asd.css` uses `#asd-content`, `#asd-actions`, `#asd-info`.

6. **Primary brand color:** The primary brand color is `#023d6d` (dark blue), used for headers, borders, buttons, and text accents. The hover variant is `#084f88`.

7. **Landing page palette:** The landing page (`home.css`) uses a separate `--pa-*` CSS custom property palette with a teal primary (`#0a7c5a`) and warm accent (`#f5a623`), distinct from the dark blue used on calculator pages.
---

## Loading Order

Every HTML page in the project follows the same standard load order in the `<head>`:

```html
<!-- 1. Global stylesheet (shared across all pages) -->
<link rel="stylesheet" href="assets/styles/app.css" />

<!-- 2. Page-specific stylesheet -->
<link rel="stylesheet" href="assets/styles/{page}.css" />

<!-- 3. Shared Header component (defines createHeader, renderHeader, replaceHeader) -->
<script src="assets/scripts/components/Header.js" defer></script>

<!-- 4. Page-specific entry-point script (calls renderHeader on DOMContentLoaded) -->
<script src="assets/scripts/{page}.js" defer></script>
```

**Order rationale:**

1. **`app.css`** loads first to provide the global reset, font, header, and calculator layout styles.
2. **Page CSS** loads second so page-specific rules can override or extend global styles.
3. **`Header.js`** loads third (with `defer`) so its functions are available in the global scope before the page script runs.
4. **Page JS** loads last (with `defer`) and calls `renderHeader()` on `DOMContentLoaded`.

All scripts use the `defer` attribute, which guarantees execution order matches the order of the `<script>` tags in the HTML, and that the DOM is fully parsed before any script executes.

---

## Sub-Project Assets

The repository also contains self-contained sub-projects, each with its own `assets/` directory. These sub-projects are independent calculator applications that may also reference the root `assets/` directory for shared styles and components.

### `basics-10-function-refactoring/assets/`

Contains its own copy of the shared assets needed for the basic four-function calculator:

| File | Description |
|------|-------------|
| `app.css` | Global styles for the basic calculator |
| `home.css` | Landing page styles (`#home-content`, `#home-actions`, `#btn-start`, `#features`) |
| `vendor.js` | Wires DOM elements to JS variables (`userInput`, `addBtn`, `subtractBtn`, `multiplyBtn`, `divideBtn`, `currentResultOutput`, `currentCalculationOutput`) and provides `outputResult(result, text)` function |
| `app.js` | Implements the four-function calculator (add, subtract, multiply, divide) with a calculation log (`logEntry` array). Uses `calculation(calculationType)` dispatcher pattern |
| `home.js` | Entry point for `home.html`. Calls `replaceHeader('Welcome to My Calculator', [])` (uses `replaceHeader`, not `renderHeader`) |
| `components/Header.js` | Copy of the shared Header component |

### `uyt/assets/`

Contains assets for the **UYT (U Yield T)** calculator:

| File | Description |
|------|-------------|
| `uyt.css` | Page styles (`#uyt-calculator`, `#uyt-inputs` with three inputs, `#multiply-symbol`, `#divide-symbol`, `#uyt-actions` with calculate/clear buttons) |
| `uyt.js` | Calculator logic with JSDoc. `calculateUYT(u, y, t)` returns `(u * y) / t` with divide-by-zero protection. `handleCalculate()` parses inputs, validates, calls calculate. `handleClear()` resets. Enter key triggers calculation. Renders header with 5 nav links |

### `xpy/assets/`

Contains assets for the **XPY (X Power Y)** calculator:

| File | Description |
|------|-------------|
| `xpy.css` | Page styles (`#xpy-calculator`, `#xpy-inputs` with two inputs, `#power-symbol`, `#xpy-actions`) |
| `xpy.js` | Calculator logic with JSDoc. `calculateXPY(base, exponent)` returns `Math.pow(base, exponent)`. `handleCalculate()` and `handleClear()` follow same pattern as UYT. Enter key triggers calculation. Renders header with 5 nav links |

### Shared Root References

These sub-projects reference the root `assets/` directory for shared styles and components via relative paths. For example, a sub-project HTML page at `basics-10-function-refactoring/index.html` would reference:

```html
<link rel="stylesheet" href="../assets/styles/app.css" />
<script src="../assets/scripts/components/Header.js" defer></script>
```

This allows sub-projects to inherit the global header styles and the reusable Header component without duplicating them, while maintaining their own page-specific CSS and JS files locally.

> **Note:** The `uyt/` and `xpy/` sub-projects reference root `../assets/styles/app.css` and `../assets/scripts/components/Header.js`. The `basics-10-function-refactoring/` sub-project has its own local copies of `app.css` and `components/Header.js` and loads `vendor.js` → `Header.js` → `app.js` (no page-specific CSS, just `app.css`).

---

## Known Issues

- **`sdssa.html`** references `assets/styles/sdssa.css` and `assets/scripts/sdssa.js`, but neither file exists in the `assets/` directory. The page will render with unstyled content and no header rendering script.









