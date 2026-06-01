/**
 * HHH Component
 * A reusable header component for the calculator application
 */

/**
 * Creates a header element with title and optional navigation
 * @param {string} title - The title to display in the header
 * @param {Array<{label: string, href: string}>} [navLinks] - Optional navigation links
 * @returns {HTMLElement} The header element
 */
function createHHH(title, navLinks = []) {
  const hhh = document.createElement('header');
  
  // Create title element
  const titleElement = document.createElement('h1');
  titleElement.textContent = title;
  hhh.appendChild(titleElement);
  
  // Create navigation if links are provided
  if (navLinks.length > 0) {
    const nav = document.createElement('nav');
    
    navLinks.forEach(link => {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.label;
      nav.appendChild(anchor);
    });
    
    hhh.appendChild(nav);
  }
  
  return hhh;
}

/**
 * Renders the header into a container element
 * @param {string} containerId - The ID of the container element
 * @param {string} title - The title to display
 * @param {Array<{label: string, href: string}>} [navLinks] - Optional navigation links
 */
function renderHHH(containerId, title, navLinks = []) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID '${containerId}' not found`);
    return;
  }
  
  const hhh = createHHH(title, navLinks);
  container.appendChild(hhh);
}

/**
 * Replaces an existing header element with the component header
 * @param {string} title - The title to display
 * @param {Array<{label: string, href: string}>} [navLinks] - Optional navigation links
 */
function replaceHHH(title, navLinks = []) {
  const existingHHH = document.querySelector('header');
  const hhh = createHHH(title, navLinks);
  
  if (existingHHH) {
    existingHHH.replaceWith(hhh);
  } else {
    // If no header exists, insert at the beginning of body
    document.body.insertBefore(hhh, document.body.firstChild);
  }
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createHHH, renderHHH, replaceHHH };
}
