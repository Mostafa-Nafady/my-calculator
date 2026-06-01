/**
 * AZX Calculator
 * Calculates the Arc Tangent (arctan) of X multiplied by Y
 * AZX(x, y) = arctan(x * y)
 */

const xInput = document.getElementById('input-x');
const yInput = document.getElementById('input-y');
const calculateBtn = document.getElementById('btn-calculate');
const clearBtn = document.getElementById('btn-clear');
const currentCalculation = document.getElementById('current-calculation');
const currentResult = document.getElementById('current-result');

let defaultResult = 0;
let currentX = 0;
let currentY = 0;

/**
 * Calculates the Arc Tangent (AZX) of x multiplied by y
 * AZX(x, y) = arctan(x * y)
 * 
 * Special cases:
 * - arctan(0) = 0
 * - arctan(1) = π/4
 * - arctan(∞) = π/2
 * - arctan(-∞) = -π/2
 * 
 * @param {number} x - The first value
 * @param {number} y - The second value
 * @returns {number} The arc tangent result in radians
 */
function calculateAZX(x, y) {
  const product = x * y;
  
  // Handle the product being zero
  if (product === 0) {
    return 0; // arctan(0) = 0
  }
  
  // Calculate arctan of the product
  const result = Math.atan(product);
  
  return result;
}

/**
 * Updates the calculation display
 * @param {number} x - The x value
 * @param {number} y - The y value
 * @param {number} result - The calculated result
 */
function updateCalculationDisplay(x, y, result) {
  currentCalculation.textContent = `arctan(${x} * ${y})`;
  currentResult.textContent = result.toFixed(6);
}

/**
 * Handles the calculate button click
 */
function handleCalculate() {
  const x = parseFloat(xInput.value);
  const y = parseFloat(yInput.value);

  if (isNaN(x) || isNaN(y)) {
    alert('Please enter valid numbers for both X and Y values.');
    return;
  }

  currentX = x;
  currentY = y;
  defaultResult = calculateAZX(x, y);

  updateCalculationDisplay(x, y, defaultResult);
}

/**
 * Handles the clear button click
 */
function handleClear() {
  xInput.value = '';
  yInput.value = '';
  currentX = 0;
  currentY = 0;
  defaultResult = 0;
  currentCalculation.textContent = '0';
  currentResult.textContent = '0';
}

// Event listeners
calculateBtn.addEventListener('click', handleCalculate);
clearBtn.addEventListener('click', handleClear);

// Allow Enter key to trigger calculation
xInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleCalculate();
  }
});

yInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleCalculate();
  }
});

// Render header with navigation
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'My Calculator', [
      { label: 'Home', href: '../index.html' },
      { label: 'About', href: '../about.html' },
      { label: 'Basic Calculator', href: '../basics-10-function-refactoring/index.html' },
      { label: 'XPY Calculator', href: '../xpy/index.html' },
      { label: 'AQRT Calculator', href: '../aqrt/index.html' },
      { label: 'AZX Calculator', href: 'index.html' },
      { label: 'UYT Calculator', href: '../uyt/index.html' }
    ]);
  }
});
