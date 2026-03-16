/**
 * OOP Page Script
 * Initializes the OOP concepts page with dynamic header
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize header with navigation links
  const navLinks = [
    { label: 'Home', href: 'index.html' },
    { label: 'About', href: 'about.html' },
    { label: 'OOP', href: 'oop.html' },
    { label: 'Start Calculating', href: 'basics-10-function-refactoring/index.html' }
  ];
  
  // Render header into container
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'OOP Concepts', navLinks);
  } else {
    console.error('Header component not loaded');
  }
  
  // Add syntax highlighting effect to code block
  highlightCode();
});

/**
 * Adds simple syntax highlighting to the code display
 */
function highlightCode() {
  const codeBlock = document.querySelector('#code-display code');
  if (!codeBlock) return;
  
  let html = codeBlock.innerHTML;
  
  // Highlight keywords
  const keywords = ['class', 'constructor', 'extends', 'const', 'let', 'var', 'return', 'if', 'else'];
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
    html = html.replace(regex, `<span class="keyword">${keyword}</span>`);
  });
  
  // Highlight strings
  html = html.replace(/(['"`].*?['"`])/g, '<span class="string">$1</span>');
  
  // Highlight comments
  html = html.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>');
  
  // Highlight function names
  html = html.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, '<span class="function">$1</span>');
  
  codeBlock.innerHTML = html;
}

// Export for testing if module system is available
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { highlightCode };
}

