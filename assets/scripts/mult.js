// Render the Header component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'MULT Calculator', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'MULT', href: 'mult.html' },
      { label: 'ASD', href: 'asd.html' },
      { label: 'ADDOP', href: 'addop.html' },
      { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' }
    ]);
  }

  // Set up the multiplication calculator
  setupMultCalculator();
});

/**
 * Sets up the multiplication calculator functionality
 */
function setupMultCalculator() {
  const num1Input = document.getElementById('num1');
  const num2Input = document.getElementById('num2');
  const calculateBtn = document.getElementById('btn-calculate');
  const resultValue = document.getElementById('result-value');

  if (!calculateBtn || !num1Input || !num2Input || !resultValue) {
    return;
  }

  calculateBtn.addEventListener('click', () => {
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);

    if (isNaN(num1) || isNaN(num2)) {
      resultValue.textContent = 'Please enter valid numbers';
      resultValue.style.color = '#dc3545';
      return;
    }

    const result = num1 * num2;
    resultValue.textContent = result;
    resultValue.style.color = '#28a745';
  });

  // Allow Enter key to trigger calculation
  num1Input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      calculateBtn.click();
    }
  });

  num2Input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      calculateBtn.click();
    }
  });
}

