// Render the Header component and add interactive demo when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'AER Component Showcase', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'ASD', href: 'asd.html' },
      { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' }
    ]);
  }

  // Toggle the visibility of the alert element when the button is clicked
  const toggleButton = document.querySelector('#aer-buttons button');
  const alertElement = document.getElementById('aer-alert');
  if (toggleButton && alertElement) {
    toggleButton.addEventListener('click', () => {
      const isHidden = alertElement.style.display === 'none';
      alertElement.style.display = isHidden ? 'block' : 'none';
    });
  }
});

