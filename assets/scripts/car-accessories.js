// Render the Header component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'AutoGear — Premium Car Accessories', [
      { label: 'Home', href: 'index.html' },
      { label: 'Car Accessories', href: 'car-accessories.html' },
      { label: 'About', href: 'about.html' },
      { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' }
    ]);
  }

  // --- Add to Cart counter enhancement ---
  var cartCount = 0;
  var cartCountEl = document.getElementById('cart-count');
  var addCartButtons = document.querySelectorAll('.btn-add-cart');

  addCartButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      cartCount++;
      if (cartCountEl) {
        cartCountEl.textContent = cartCount;
      }

      // Brief visual feedback on the clicked button
      var originalText = button.textContent;
      button.textContent = '✓ Added!';
      button.style.background = '#28a745';
      button.style.borderColor = '#28a745';
      setTimeout(function () {
        button.textContent = originalText;
        button.style.background = '';
        button.style.borderColor = '';
      }, 1200);
    });
  });
});

