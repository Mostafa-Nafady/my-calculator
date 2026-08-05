/**
 * Pinguin Store — Home Page Logic
 * Handles product rendering, category filtering, and cart functionality.
 * Depends on: Header.js (provides renderHeader)
 */

// ---------------------------------------------------------------------------
// 1. Product Data
// ---------------------------------------------------------------------------
const products = [
  { id: 1,  name: 'Arctic Hoodie',        category: 'Hoodies',     price: 49.99 },
  { id: 2,  name: 'Emperor Penguin Hoodie', category: 'Hoodies',   price: 54.99 },
  { id: 3,  name: 'Penguin T-Shirt',      category: 'T-Shirts',    price: 19.99 },
  { id: 4,  name: 'Waddle Tee',           category: 'T-Shirts',    price: 22.99 },
  { id: 5,  name: 'Snowflake Beanie',     category: 'Accessories', price: 14.99 },
  { id: 6,  name: 'Penguin Scarf',        category: 'Accessories', price: 17.99 },
  { id: 7,  name: 'Ice Cap Sunglasses',   category: 'Accessories', price: 12.99 },
  { id: 8,  name: 'Penguin Mug',          category: 'Mugs',        price: 9.99  },
  { id: 9,  name: 'Glacier Travel Mug',   category: 'Mugs',        price: 16.99 },
  { id: 10, name: 'Chilly Penguin Tee',   category: 'T-Shirts',    price: 24.99 }
];

// ---------------------------------------------------------------------------
// 2. Cart State
// ---------------------------------------------------------------------------
let cart = [];

// ---------------------------------------------------------------------------
// 3. Category Rendering
// ---------------------------------------------------------------------------
/**
 * Extracts unique categories from the products array and renders
 * category filter chips (including an "All" option) into #category-chips.
 */
function renderCategoryChips() {
  const container = document.getElementById('category-chips');
  if (!container) return;

  // Build a list of unique categories
  const categories = [...new Set(products.map(p => p.category))];

  // "All" chip — active by default
  const allChip = document.createElement('button');
  allChip.className = 'category-chip active';
  allChip.setAttribute('data-category', 'All');
  allChip.textContent = 'All';
  container.appendChild(allChip);

  // One chip per category
  categories.forEach(cat => {
    const chip = document.createElement('button');
    chip.className = 'category-chip';
    chip.setAttribute('data-category', cat);
    chip.textContent = cat;
    container.appendChild(chip);
  });
}

// ---------------------------------------------------------------------------
// 4. Product Rendering
// ---------------------------------------------------------------------------
/**
 * Renders product cards into #product-grid, optionally filtered by category.
 * @param {string} category — category name or "All" to show every product
 */
function renderProducts(category) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  // Filter products (or show all)
  const filtered = category === 'All'
    ? products
    : products.filter(p => p.category === category);

  // Clear existing content
  grid.innerHTML = '';

  // Build a card for each product
  filtered.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card';

    // Product image (placeholder)
    const img = document.createElement('img');
    img.className = 'product-image';
    img.src = `https://via.placeholder.com/300x200/023d6d/ffffff?text=${encodeURIComponent(product.name)}`;
    img.alt = product.name;
    card.appendChild(img);

    // Card body
    const body = document.createElement('div');
    body.className = 'product-body';

    const name = document.createElement('h3');
    name.className = 'product-name';
    name.textContent = product.name;
    body.appendChild(name);

    const cat = document.createElement('p');
    cat.className = 'product-category';
    cat.textContent = product.category;
    body.appendChild(cat);

    const price = document.createElement('p');
    price.className = 'product-price';
    price.textContent = `$${product.price.toFixed(2)}`;
    body.appendChild(price);

    const addBtn = document.createElement('button');
    addBtn.className = 'btn-add';
    addBtn.textContent = 'Add to Cart';
    addBtn.setAttribute('data-id', product.id);
    body.appendChild(addBtn);

    card.appendChild(body);
    grid.appendChild(card);
  });
}

// ---------------------------------------------------------------------------
// 5. Cart Functions
// ---------------------------------------------------------------------------
/**
 * Adds a product to the cart (or increments its quantity if already present).
 * @param {number} productId — id of the product to add
 */
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
  }

  updateCartUI();
}

/**
 * Removes a product entirely from the cart.
 * @param {number} productId — id of the product to remove
 */
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

/**
 * Re-renders the cart panel contents and updates the count badge / total.
 */
function updateCartUI() {
  const cartCount  = document.getElementById('cart-count');
  const cartTotal  = document.getElementById('cart-total');
  const cartItems  = document.getElementById('cart-items');

  // Total quantity across all items
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  // Total price across all items
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartCount) cartCount.textContent = totalItems;
  if (cartTotal) cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;

  if (!cartItems) return;

  // Clear existing cart items
  cartItems.innerHTML = '';

  // Empty state
  if (cart.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'cart-empty';
    empty.textContent = 'Your cart is empty';
    cartItems.appendChild(empty);
    return;
  }

  // Render each cart item
  cart.forEach(item => {
    const li = document.createElement('li');
    li.className = 'cart-item';

    const name = document.createElement('span');
    name.className = 'cart-item-name';
    name.textContent = item.name;
    li.appendChild(name);

    const qty = document.createElement('span');
    qty.className = 'cart-item-qty';
    qty.textContent = `x${item.quantity}`;
    li.appendChild(qty);

    const price = document.createElement('span');
    price.className = 'cart-item-price';
    price.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
    li.appendChild(price);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'cart-item-remove';
    removeBtn.textContent = '×';
    removeBtn.setAttribute('data-id', item.id);
    li.appendChild(removeBtn);

    cartItems.appendChild(li);
  });
}

// ---------------------------------------------------------------------------
// 6. Event Listeners
// ---------------------------------------------------------------------------
/**
 * Wires up all interactive elements on the page.
 */
function setupEventListeners() {
  // --- Category filter chips (delegation) ---
  const chipsContainer = document.getElementById('category-chips');
  if (chipsContainer) {
    chipsContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.category-chip');
      if (!chip) return;

      // Toggle active state
      chipsContainer.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      // Re-render products for the selected category
      renderProducts(chip.getAttribute('data-category'));
    });
  }

  // --- Add-to-cart (event delegation on the product grid) ---
  const productGrid = document.getElementById('product-grid');
  if (productGrid) {
    productGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-add');
      if (!btn) return;
      const id = parseInt(btn.getAttribute('data-id'), 10);
      addToCart(id);
    });
  }

  // --- Remove from cart (event delegation on the cart items list) ---
  const cartItemsEl = document.getElementById('cart-items');
  if (cartItemsEl) {
    cartItemsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.cart-item-remove');
      if (!btn) return;
      const id = parseInt(btn.getAttribute('data-id'), 10);
      removeFromCart(id);
    });
  }

  // --- Cart panel toggle ---
  const cartToggle = document.getElementById('cart-toggle');
  const cartPanel  = document.getElementById('cart-panel');
  if (cartToggle && cartPanel) {
    cartToggle.addEventListener('click', () => {
      cartPanel.classList.toggle('open');
    });
  }

  // --- Cart panel close ---
  const cartClose = document.getElementById('cart-close');
  if (cartClose && cartPanel) {
    cartClose.addEventListener('click', () => {
      cartPanel.classList.remove('open');
    });
  }

  // --- Checkout ---
  const cartCheckout = document.getElementById('cart-checkout');
  if (cartCheckout) {
    cartCheckout.addEventListener('click', () => {
      alert('Checkout functionality coming soon!');
      cart = [];
      updateCartUI();
    });
  }
}

// ---------------------------------------------------------------------------
// 7. Initialization
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Render the site header
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'Pinguin Store', [
      { label: 'Home',  href: 'index.html' },
      { label: 'About', href: 'about.html' }
    ]);
  }

  // Render category chips, products, and initial cart state
  renderCategoryChips();
  renderProducts('All');
  updateCartUI();

  // Wire up all interactivity
  setupEventListeners();
});
