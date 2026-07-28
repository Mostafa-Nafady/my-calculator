/**
 * Gallery Page Script
 * Renders the calculator gallery grid, filter buttons, and integrates the
 * shared Header component. Mirrors the conventions used in home.js and
 * components/Header.js (vanilla DOM APIs, no build step).
 */

/**
 * Catalog of calculators displayed in the gallery.
 * Each entry maps to a card rendered into #gallery-grid.
 * @type {Array<{id: string, title: string, description: string, icon: string, category: string, href: string}>}
 */
const CALCULATORS = [
  {
    id: 'basic-calculator',
    title: 'Basic Calculator',
    description: 'A clean 10-function refactored calculator covering the everyday arithmetic operations.',
    icon: '🔢',
    category: 'Basic',
    href: 'basics-10-function-refactoring/index.html'
  },
  {
    id: 'xpy-calculator',
    title: 'XPY Calculator',
    description: 'Scientific-style calculator for x^y style exponentiation and related power operations.',
    icon: '🧮',
    category: 'Scientific',
    href: 'xpy/index.html'
  },
  {
    id: 'uyt-calculator',
    title: 'UYT Calculator',
    description: 'Specialized UYT calculator for unit-yield transformations and tailored inputs.',
    icon: '📐',
    category: 'Specialized',
    href: 'uyt/index.html'
  },
  {
    id: 'tyo-calculator',
    title: 'TYO Calculator',
    description: 'Specialized TYO calculator for tabular yield outputs and structured reporting.',
    icon: '📊',
    category: 'Specialized',
    href: 'tyo/index.html'
  },
  {
    id: 'asd-calculator',
    title: 'ASD Calculator',
    description: 'Specialized ASD calculator focused on adaptive scenario-driven computations.',
    icon: '🧠',
    category: 'Specialized',
    href: 'asd.html'
  },
  {
    id: 'aswd-calculator',
    title: 'ASWD Calculator',
    description: 'Specialized ASWD calculator for advanced settings with weighted distributions.',
    icon: '⚙️',
    category: 'Specialized',
    href: 'aswd.html'
  }
];

/**
 * Filter categories shown as buttons above the gallery grid.
 * The first entry ('All') is the default active filter.
 * @type {string[]}
 */
const FILTER_CATEGORIES = ['All', 'Basic', 'Scientific', 'Specialized'];

/**
 * Builds a single gallery card element from a calculator entry.
 * Uses createElement exclusively (no innerHTML) for safety.
 * @param {{id: string, title: string, description: string, icon: string, category: string, href: string}} calculator
 * @returns {HTMLElement} The constructed card element
 */
function createGalleryCard(calculator) {
  const card = document.createElement('div');
  card.className = 'gallery-card';
  card.dataset.category = calculator.category;
  card.dataset.id = calculator.id;

  const icon = document.createElement('span');
  icon.className = 'gallery-card-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = calculator.icon;

  const category = document.createElement('span');
  category.className = 'gallery-card-category';
  category.textContent = calculator.category;

  const title = document.createElement('h3');
  title.textContent = calculator.title;

  const description = document.createElement('p');
  description.textContent = calculator.description;

  const link = document.createElement('a');
  link.href = calculator.href;
  link.textContent = 'Open Calculator';

  card.appendChild(icon);
  card.appendChild(category);
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(link);

  return card;
}

/**
 * Renders all calculator cards into the #gallery-grid container.
 * Replaces any existing children to keep the grid in sync with CALCULATORS.
 */
function renderGalleryCards() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) {
    console.error("Container with ID 'gallery-grid' not found");
    return;
  }

  // Clear existing cards before re-rendering
  grid.replaceChildren();

  CALCULATORS.forEach((calculator) => {
    const card = createGalleryCard(calculator);
    grid.appendChild(card);
  });
}

/**
 * Renders the filter buttons into the #filter-list container.
 * The first button ('All') is marked active by default.
 */
function renderFilterButtons() {
  const filterList = document.getElementById('filter-list');
  if (!filterList) {
    console.error("Container with ID 'filter-list' not found");
    return;
  }

  filterList.replaceChildren();

  FILTER_CATEGORIES.forEach((category, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter-btn';
    button.textContent = category;
    button.dataset.filter = category;

    if (index === 0) {
      button.classList.add('active');
    }

    button.addEventListener('click', () => {
      handleFilterClick(category);
    });

    filterList.appendChild(button);
  });
}

/**
 * Handles a filter button click: updates active state, filters cards,
 * and toggles the empty-state message when no cards match.
 * @param {string} category - The category to filter by, or 'All' to show everything
 */
function handleFilterClick(category) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach((button) => {
    button.classList.toggle('active', button.dataset.filter === category);
  });

  const cards = document.querySelectorAll('.gallery-card');
  let visibleCount = 0;

  cards.forEach((card) => {
    const matches = category === 'All' || card.dataset.category === category;
    card.style.display = matches ? '' : 'none';
    if (matches) {
      visibleCount += 1;
    }
  });

  toggleEmptyState(visibleCount === 0);
}

/**
 * Shows or hides the #gallery-empty element based on whether any cards are visible.
 * @param {boolean} isEmpty - True when no cards match the current filter
 */
function toggleEmptyState(isEmpty) {
  const empty = document.getElementById('gallery-empty');
  if (!empty) {
    return;
  }

  if (isEmpty) {
    if (!empty.textContent) {
      empty.textContent = 'No calculators match this filter.';
    }
    empty.style.display = '';
  } else {
    empty.style.display = 'none';
  }
}

/**
 * Builds and inserts the dynamic DOM scaffolding required by the gallery:
 * the filter section (#gallery-filters > #filter-list) and the empty-state
 * container (#gallery-empty). These elements are not present in gallery.html
 * and must be created at runtime so the rest of the rendering pipeline
 * (renderFilterButtons, toggleEmptyState) can find their targets.
 *
 * Uses createElement exclusively (no innerHTML) for safety.
 * Idempotent: skips creation if the elements already exist or if the
 * required #gallery-grid anchor is missing.
 */
function createGalleryStructure() {
  const grid = document.getElementById('gallery-grid');
  if (!grid || !grid.parentNode) {
    console.error("Container with ID 'gallery-grid' not found; cannot build gallery structure.");
    return;
  }

  // Build the filter section: <section id="gallery-filters">
  //   <h2>Filter by Category</h2>
  //   <ul id="filter-list"></ul>
  // </section>
  if (!document.getElementById('gallery-filters')) {
    const filtersSection = document.createElement('section');
    filtersSection.id = 'gallery-filters';

    const filtersHeading = document.createElement('h2');
    filtersHeading.textContent = 'Filter by Category';
    filtersSection.appendChild(filtersHeading);

    const filterList = document.createElement('ul');
    filterList.id = 'filter-list';
    filtersSection.appendChild(filterList);

    // Insert the filter section immediately before #gallery-grid
    grid.parentNode.insertBefore(filtersSection, grid);
  }

  // Build the empty-state container: <div id="gallery-empty"><p>...</p></div>
  // Hidden by default; toggleEmptyState() reveals it when no cards match.
  if (!document.getElementById('gallery-empty')) {
    const emptyState = document.createElement('div');
    emptyState.id = 'gallery-empty';
    emptyState.style.display = 'none';

    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No calculators match this filter.';
    emptyState.appendChild(emptyMessage);

    // Insert the empty-state container immediately after #gallery-grid
    grid.parentNode.insertBefore(emptyState, grid.nextSibling);
  }
}

// Render the Header component and gallery content when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'Calculator Gallery', [
      { label: 'Home', href: 'index.html' },
      { label: 'Gallery', href: 'gallery.html' },
      { label: 'About', href: 'about.html' },
      { label: 'ASD', href: 'asd.html' },
      { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' }
    ]);
  }

  createGalleryStructure();
  renderFilterButtons();
  renderGalleryCards();
});

// Export functions for use in other scripts (matches Header.js pattern)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CALCULATORS,
    FILTER_CATEGORIES,
    createGalleryCard,
    createGalleryStructure,
    renderGalleryCards,
    renderFilterButtons,
    handleFilterClick,
    toggleEmptyState
  };
}





