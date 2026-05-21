// Render the Header component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'Welcome to My Calculator', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'ASD', href: 'asd.html' },
      { label: 'Basic Calculator', href: 'basics/index.html' },
      { label: 'ADDOP', href: 'addop.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' },
      { label: 'UYT Calculator', href: 'uyt/index.html' }
    ]);
  }
});






