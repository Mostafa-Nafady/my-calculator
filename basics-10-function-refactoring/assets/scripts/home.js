// Render the Header component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof replaceHeader === 'function') {
    replaceHeader('Welcome to My Calculator', []);
  }
});

