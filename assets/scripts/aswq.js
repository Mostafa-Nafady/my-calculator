// Render the Header component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'ASWQ Calculator', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'ASWQ', href: 'aswq.html' },
      { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' }
    ]);
  }
});
