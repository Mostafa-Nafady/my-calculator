// Render the Header component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'Welcome to Beach Getaway', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'Beach', href: 'beach.html' },
      { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' }
    ]);
  }
});

