/**
 * Header Component
 * A reusable header component for the calculator application
 */

/**
 * Creates a header element with title and optional navigation
 * @param {string} title - The title to display in the header
 * @param {Array<{label: string, href: string}>} [navLinks] - Optional navigation links
 * @returns {HTMLElement} The header element
 */
function createHeader(title, navLinks = [{ label: 'RTEA', href: '/rtea' }, { label: 'ASSDSFSF', href: '/assdsfsf' }, { label: 'AWXZ', href: '/awxz' }]) {
  const header = document.createElement('header');
  
  // Create title element
  const titleElement = document.createElement('h1');
  titleElement.textContent = title;
  header.appendChild(titleElement);
  
  // Create navigation if links are provided
  if (navLinks.length > 0) {
    const nav = document.createElement('nav');
    
    navLinks.forEach(link => {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.label;
      nav.appendChild(anchor);
    });
    
    header.appendChild(nav);
  }
  
  return header;
}

/**
 * Renders the header into a container element
 * @param {string} containerId - The ID of the container element
 * @param {string} title - The title to display
 * @param {Array<{label: string, href: string}>} [navLinks] - Optional navigation links
 */
function renderHeader(containerId, title, navLinks = [{ label: 'RTEA', href: '/rtea' }, { label: 'ASSDSFSF', href: '/assdsfsf' }, { label: 'AWXZ', href: '/awxz' }]) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID '${containerId}' not found`);
    return;
  }
  
  const header = createHeader(title, navLinks);
  container.appendChild(header);
}

/**
 * Replaces an existing header element with the component header
 * @param {string} title - The title to display
 * @param {Array<{label: string, href: string}>} [navLinks] - Optional navigation links
 */
function replaceHeader(title, navLinks = [{ label: 'RTEA', href: '/rtea' }, { label: 'ASSDSFSF', href: '/assdsfsf' }, { label: 'AWXZ', href: '/awxz' }]) {
  const existingHeader = document.querySelector('header');
  const header = createHeader(title, navLinks);
  
  if (existingHeader) {
    existingHeader.replaceWith(header);
  } else {
    // If no header exists, insert at the beginning of body
    document.body.insertBefore(header, document.body.firstChild);
  }
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createHeader, renderHeader, replaceHeader };
}







