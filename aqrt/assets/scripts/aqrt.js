/**
 * AQRT Calculator
 * Calculates the Arc Cotangent (arccot) of X divided by Y
 * AQRT(x, y) = arccot(x/y) = arctan(y/x)
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
 * Calculates the Arc Cotangent (AQRT) of x divided by y
 * AQRT(x, y) = arccot(x/y) = arctan(y/x)
 * 
 * Special cases:
 * - arccot(0) = π/2
 * - arccot(1) = π/4
 * - arccot(-1) = -π/4
 * - arccot(∞) = 0
 * - arccot(-∞) = π
 * 
 * @param {number} x - The numerator value
 * @param {number} y - The denominator value
 * @returns {number} The arc cotangent result in radians
 */
function calculateAQRT(x, y) {
  // Handle division by zero
  if (y === 0) {
    return x >= 0 ? 0 : Math.PI;
  }
  
  const ratio = x / y;
  
  // Handle the ratio being zero
  if (ratio === 0) {
    return Math.PI / 2; // arccot(0) = π/2
  }
  
  // Calculate arccot using atan: arccot(x) = atan(1/x) for x > 0
  // or π + atan(1/x) for x < 0
  const result = Math.atan(1 / ratio);
  
  // Adjust for negative values
  if (ratio < 0) {
    return result + Math.PI;
  }
  
  return result;
}

/**
 * Updates the calculation display
 * @param {number} x - The x value
 * @param {number} y - The y value
 * @param {number} result - The calculated result
 */
function updateCalculationDisplay(x, y, result) {
  currentCalculation.textContent = `arccot(${x} / ${y})`;
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

  if (y === 0 && x === 0) {
    alert('Cannot calculate arccot of 0/0 (undefined).');
    return;
  }

  currentX = x;
  currentY = y;
  defaultResult = calculateAQRT(x, y);

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
      { label: 'AQRT Calculator', href: 'index.html' },
      { label: 'UYT Calculator', href: '../uyt/index.html' }
    ]);
  }
});
