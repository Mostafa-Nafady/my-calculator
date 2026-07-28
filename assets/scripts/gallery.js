/**
 * Gallery items data
 * @type {Array<{id: string, title: string, description: string, icon: string, link: string}>}
 */
const galleryItems = [
  {
    id: 'basic',
    title: 'Basic Calculator',
    description: 'Perform basic arithmetic operations including addition, subtraction, multiplication, and division.',
    icon: '🧮',
    link: 'basics-10-function-refactoring/index.html'
  },
  {
    id: 'xpy',
    title: 'XPY Calculator',
    description: 'Calculate X to the power of Y with our specialized exponent calculator.',
    icon: '⚡',
    link: 'xpy/index.html'
  },
  {
    id: 'uyt',
    title: 'UYT Calculator',
    description: 'Compute U Yield T calculations for advanced financial scenarios.',
    icon: '📊',
    link: 'uyt/index.html'
  },
  {
    id: 'asd',
    title: 'ASD Calculator',
    description: 'Access the ASD specialized calculation tool for unique operations.',
    icon: '🔢',
    link: 'asd.html'
  },
  {
    id: 'addop',
    title: 'ADDOP Calculator',
    description: 'Perform advanced addition operations with precision and ease.',
    icon: '➕',
    link: 'addop.html'
  },
  {
    id: 'asdsfsf',
    title: 'ASDSFSF Calculator',
    description: 'Explore the ASDSFSF calculator for specialized computation needs.',
    icon: '🧠',
    link: 'asdsfsf.html'
  }
];

/**
 * Renders the gallery items into the #gallery-grid container
 */
function renderGallery() {
  const container = document.getElementById('gallery-grid');
  if (!container) {
    console.error("Container with ID 'gallery-grid' not found");
    return;
  }

  galleryItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'gallery-item';

    const iconElement = document.createElement('span');
    iconElement.className = 'item-icon';
    iconElement.textContent = item.icon;
    itemElement.appendChild(iconElement);

    const titleElement = document.createElement('h3');
    titleElement.textContent = item.title;
    itemElement.appendChild(titleElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = item.description;
    itemElement.appendChild(descriptionElement);

    const linkElement = document.createElement('a');
    linkElement.href = item.link;
    linkElement.textContent = 'View';
    itemElement.appendChild(linkElement);

    container.appendChild(itemElement);
  });
}

// Render the Header component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'Gallery - My Calculator', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'Gallery', href: 'gallery.html' },
      { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' }
    ]);
  }

  // Render the gallery items
  renderGallery();
});




