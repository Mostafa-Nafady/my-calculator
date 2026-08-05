/**
 * Dog Accessories Landing Page Script
 * Handles header rendering, product display, cart logic, and smooth scrolling.
 * Depends on: assets/scripts/components/Header.js (loaded with `defer` before this script)
 */

// ---------------------------------------------------------------------------
// Product Data
// ---------------------------------------------------------------------------

/**
 * Array of dog accessory product objects.
 * @typedef {Object} Product
 * @property {number} id - Unique product identifier
 * @property {string} name - Product display name
 * @property {number} price - Product price in USD
 * @property {string} emoji - Emoji used as a visual placeholder
 * @property {string} description - Short product description
 */

/** @type {Product[]} */
const products = [
  {
    id: 1,
    name: 'Premium Leather Leash',
    price: 29.99,
    emoji: '🦴',
    description: 'Handcrafted full-grain leather leash with brass hardware. Built to last a lifetime.'
  },
  {
    id: 2,
    name: 'Orthopedic Dog Bed',
    price: 89.99,
    emoji: '🛏️',
    description: 'Memory foam orthopedic bed with removable, machine-washable cover for ultimate comfort.'
  },
  {
    id: 3,
    name: 'Interactive Puzzle Toy',
    price: 19.99,
    emoji: '🧩',
    description: 'Mental stimulation puzzle feeder that keeps your dog engaged and reduces anxiety.'
  },
  {
    id: 4,
    name: 'Stainless Steel Bowl',
    price: 14.99,
    emoji: '🥣',
    description: 'Non-slip, dishwasher-safe stainless steel bowl. Rust-resistant and durable.'
  },
  {
    id: 5,
    name: 'Reflective Safety Collar',
    price: 24.99,
    emoji: '🐕',
    description: 'LED-illuminated reflective collar for nighttime walks. USB rechargeable.'
  },
  {
    id: 6,
    name: 'Portable Travel Carrier',
    price: 64.99,
    emoji: '🎒',
    description: 'Airline-approved soft-sided carrier with ventilation panels and padded shoulder strap.'
  }
];

// ---------------------------------------------------------------------------
// Cart State
// ---------------------------------------------------------------------------

/** @type {number} Tracks the number of items added to the cart. */
let cartCount = 0;

// ---------------------------------------------------------------------------
// Cart Badge
// ---------------------------------------------------------------------------

/**
 * Creates and appends a floating cart badge element to the document body.
 * The badge is positioned in the top-right corner and displays the current
 * cart count.
 * @returns {HTMLElement} The created cart badge element
 */
function createCartBadge() {
  const badge = document.createElement('div');
  badge.className = 'cart-badge';
  badge.textContent = String(cartCount);
  badge.setAttribute('aria-label', `Cart: ${cartCount} item${cartCount === 1 ? '' : 's'}`);
  badge.setAttribute('role', 'status');
  badge.setAttribute('aria-live', 'polite');
  document.body.appendChild(badge);
  return badge;
}

/**
 * Updates the cart badge text and aria-label to reflect the current cart count.
 * @param {HTMLElement} badge - The cart badge element to update
 */
function updateCartBadge(badge) {
  badge.textContent = String(cartCount);
  badge.setAttribute('aria-label', `Cart: ${cartCount} item${cartCount === 1 ? '' : 's'}`);
  // Brief scale animation to draw attention to the update
  badge.classList.add('cart-badge--pulse');
  setTimeout(() => badge.classList.remove('cart-badge--pulse'), 300);
}

// ---------------------------------------------------------------------------
// Product Rendering
// ---------------------------------------------------------------------------

/**
 * Formats a numeric price as a USD currency string (e.g., 29.99 → "$29.99").
 * @param {number} price - The price to format
 * @returns {string} The formatted price string
 */
function formatPrice(price) {
  return '$' + price.toFixed(2);
}

/**
 * Builds and returns a single product card element from a product object.
 * @param {Product} product - The product to render
 * @returns {HTMLElement} The product card element
 */
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';

  // Product image (emoji placeholder)
  const image = document.createElement('div');
  image.className = 'product-image';
  image.textContent = product.emoji;
  image.setAttribute('aria-hidden', 'true');
  card.appendChild(image);

  // Product info container
  const info = document.createElement('div');
  info.className = 'product-info';

  const name = document.createElement('div');
  name.className = 'product-name';
  name.textContent = product.name;
  info.appendChild(name);

  const desc = document.createElement('div');
  desc.className = 'product-description';
  desc.textContent = product.description;
  info.appendChild(desc);

  const price = document.createElement('div');
  price.className = 'product-price';
  price.textContent = formatPrice(product.price);
  info.appendChild(price);

  const button = document.createElement('button');
  button.className = 'add-to-cart';
  button.textContent = 'Add to Cart';
  button.setAttribute('data-product-id', String(product.id));
  button.setAttribute('aria-label', `Add ${product.name} to cart`);
  info.appendChild(button);

  card.appendChild(info);
  return card;
}

/**
 * Renders all products into the #product-grid container.
 * If the container does not exist, logs a warning and exits gracefully.
 */
function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) {
    console.warn('Element #product-grid not found; products were not rendered.');
    return;
  }

  products.forEach(product => {
    grid.appendChild(createProductCard(product));
  });
}

// ---------------------------------------------------------------------------
// Cart Event Delegation
// ---------------------------------------------------------------------------

/**
 * Attaches a delegated click listener to the product grid. When an
 * "Add to Cart" button is clicked, the cart count is incremented, the
 * badge is updated, and the button shows brief "Added!" feedback.
 * @param {HTMLElement} grid - The product grid container element
 * @param {HTMLElement} badge - The cart badge element to update
 */
function setupCartDelegation(grid, badge) {
  grid.addEventListener('click', (event) => {
    // Only respond to clicks on .add-to-cart buttons
    if (event.target.classList.contains('add-to-cart')) {
      cartCount++;
      updateCartBadge(badge);

      // Visual feedback: temporarily change button text
      const button = event.target;
      const originalText = button.textContent;
      button.textContent = 'Added!';
      button.classList.add('add-to-cart--added');
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('add-to-cart--added');
        button.disabled = false;
      }, 1000);
    }
  });
}

// ---------------------------------------------------------------------------
// Smooth Scroll
// ---------------------------------------------------------------------------

/**
 * Attaches smooth-scroll click handlers to all elements matching the given
 * selector. Clicking scrolls to the #products section smoothly.
 * @param {string} selector - CSS selector for elements to attach handlers to
 */
function setupSmoothScroll(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ---------------------------------------------------------------------------
// DOMContentLoaded — Initialize Everything
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // --- Render the Header component ---
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'Paws & Co - Dog Accessories', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'Dog Accessories', href: 'dog-accessories.html' }
    ]);
  }

  // --- Render product cards into the grid ---
  renderProducts();

  // --- Set up cart badge and delegated click handling ---
  const badge = createCartBadge();
  const grid = document.getElementById('product-grid');
  if (grid) {
    setupCartDelegation(grid, badge);
  }

  // --- Set up smooth scroll for CTA buttons ---
  setupSmoothScroll('.hero-cta');
  setupSmoothScroll('.cta-button');
});

