// Render the Header component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'Percentage Calculator', [
      { label: 'Home', href: '../index.html' },
      { label: 'About', href: '../about.html' },
      { label: 'Percentage Calculator', href: 'index.html' },
      { label: 'Basic Calculator', href: '../basics-10-function-refactoring/index.html' },
      { label: 'XPY Calculator', href: '../xpy/index.html' }
    ]);
  }

  // Get DOM elements
  const inputValue = document.getElementById('input-value');
  const inputTotal = document.getElementById('input-total');
  const btnCalculate = document.getElementById('btn-calculate');
  const btnClear = document.getElementById('btn-clear');
  const currentCalculation = document.getElementById('current-calculation');
  const currentResult = document.getElementById('current-result');

  // Calculate function: (value * percentage) / 100
  function calculate() {
    const value = parseFloat(inputValue.value);
    const total = parseFloat(inputTotal.value);

    if (isNaN(value) || isNaN(total)) {
      currentCalculation.textContent = 'Please enter valid numbers';
      currentResult.textContent = '0';
      return;
    }

    if (total === 0) {
      currentCalculation.textContent = 'Total cannot be zero';
      currentResult.textContent = '0';
      return;
    }

    const result = (value / total) * 100;
    currentCalculation.textContent = `${value} / ${total} * 100`;
    currentResult.textContent = result.toFixed(2);
  }

  // Clear function to reset inputs and result
  function clear() {
    inputValue.value = '';
    inputTotal.value = '';
    currentCalculation.textContent = '0';
    currentResult.textContent = '0';
  }

  // Handle button click events
  btnCalculate.addEventListener('click', calculate);
  btnClear.addEventListener('click', clear);

  // Allow Enter key to trigger calculation
  inputValue.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      calculate();
    }
  });

  inputTotal.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      calculate();
    }
  });
});
