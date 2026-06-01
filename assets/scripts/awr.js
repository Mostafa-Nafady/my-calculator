// Render the Header component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'AWR Calculator', [
      { label: 'Home', href: 'index.html' },
      { label: 'AWR', href: 'awr.html' },
      { label: 'About', href: 'about.html' }
    ]);
  }
});
