/**
 * Gallery Store Page Script
 * Renders the Header component and populates the gallery grid with
 * calculator product cards from a data array.
 */

/**
 * Calculator product data used to populate the gallery cards.
 * Each entry represents a calculator available in the store.
 * @type {Array<{id: string, title: string, description: string, icon: string, href: string}>}
 */
const calculators = [
  { id: 'basic', title: 'Basic Calculator', description: 'Perform addition, subtraction, multiplication, and division with a clean, simple interface.', icon: '🧮', href: 'basics-10-function-refactoring/index.html' },
  { id: 'xpy', title: 'XPY Calculator', description: 'Calculate X raised to the power of Y with precision and ease.', icon: '🔢', href: 'xpy/index.html' },
  { id: 'uyt', title: 'UYT Calculator', description: 'Compute U Yield T values for your specialized calculations.', icon: '📊', href: 'uyt/index.html' },
  { id: 'yuaz', title: 'YUAZ Calculator', description: 'A dedicated YUAZ calculator for your unique computation needs.', icon: '🧷', href: 'yuaz/index.html' },
  { id: 'asd', title: 'ASD Calculator', description: 'Specialized ASD calculator tool for quick and accurate results.', icon: '⚙️', href: 'asd.html' },
  { id: 'ads', title: 'ADS Calculator', description: 'Compute ADS values efficiently with this focused calculator tool.', icon: '📐', href: 'ads.html' },
  { id: 'addop', title: 'ADDOP Calculator', description: 'Advanced ADDOP operations calculator for power users.', icon: '➕', href: 'addop.html' },
  { id: 'asdsfsf', title: 'ASDSFSF Calculator', description: 'The ASDSFSF calculator handles complex specialized computations.', icon: '🔬', href: 'asdsfsf.html' }
]

/**
 * Renders calculator cards into the #gallery-grid container.
 * Each card is an <article> containing an icon, title, description,
 * and a link to open the calculator.
 * @param {Array<{id: string, title: string, description: string, icon: string, href: string}>} calculators - The calculator data to render
 * @returns {void}
 */
function renderGalleryCards(calculators) {
  const grid = document.getElementById('gallery-grid')
  if (!grid) {
    console.error("Container with ID 'gallery-grid' not found")
    return
  }

  calculators.forEach(calculator => {
    // Create the card article element
    const card = document.createElement('article')
    card.className = 'gallery-card'

    // Create the icon element
    const icon = document.createElement('div')
    icon.className = 'gallery-card-icon'
    icon.textContent = calculator.icon
    card.appendChild(icon)

    // Create the title element
    const title = document.createElement('h3')
    title.className = 'gallery-card-title'
    title.textContent = calculator.title
    card.appendChild(title)

    // Create the description element
    const desc = document.createElement('p')
    desc.className = 'gallery-card-desc'
    desc.textContent = calculator.description
    card.appendChild(desc)

    // Create the open calculator button link
    const btn = document.createElement('a')
    btn.className = 'gallery-card-btn'
    btn.href = calculator.href
    btn.textContent = 'Open Calculator'
    card.appendChild(btn)

    // Append the completed card to the grid
    grid.appendChild(card)
  })
}

// Render the Header component and gallery cards when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'Calculator Gallery Store', [
      { label: 'Home', href: 'index.html' },
      { label: 'Gallery', href: 'gallery.html' },
      { label: 'About', href: 'about.html' },
      { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' }
    ]);
  }

  renderGalleryCards(calculators)
})

