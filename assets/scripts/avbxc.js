// Render the Header component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'AVBXc Calculator', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'AVBXc', href: 'avbxc.html' },
      { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' }
    ]);
  }
});

