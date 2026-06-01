/**
 * YYRT Calculator
 * Calculates Y yielding R and T
 */

const yInput = document.getElementById('input-y');
const rInput = document.getElementById('input-r');
const calculateBtn = document.getElementById('btn-calculate');
const clearBtn = document.getElementById('btn-clear');
const currentCalculation = document.getElementById('current-calculation');
const currentResult = document.getElementById('current-result');

let defaultResult = 0;
let currentY = 0;
let currentR = 0;

/**
 * Calculates Y yielding R and T
 * @param {number} y - The Y value
 * @param {number} r - The R value
 * @returns {number} The result of y * r
 */
function calculateYYRT(y, r) {
  return y * r;
}

/**
 * Updates the calculation display
 * @param {number} y - The Y value
 * @param {number} r - The R value
 * @param {number} result - The calculated result
 */
function updateCalculationDisplay(y, r, result) {
  currentCalculation.textContent = `${y} * ${r}`;
  currentResult.textContent = result;
}

/**
 * Handles the calculate button click
 */
function handleCalculate() {
  const y = parseFloat(yInput.value);
  const r = parseFloat(rInput.value);

  if (isNaN(y) || isNaN(r)) {
    alert('Please enter valid numbers for both Y and R.');
    return;
  }

  currentY = y;
  currentR = r;
  defaultResult = calculateYYRT(y, r);

  updateCalculationDisplay(y, r, defaultResult);
}

/**
 * Handles the clear button click
 */
function handleClear() {
  yInput.value = '';
  rInput.value = '';
  currentY = 0;
  currentR = 0;
  defaultResult = 0;
  currentCalculation.textContent = '0';
  currentResult.textContent = '0';
}

// Event listeners
calculateBtn.addEventListener('click', handleCalculate);
clearBtn.addEventListener('click', handleClear);

// Allow Enter key to trigger calculation
yInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleCalculate();
  }
});

rInput.addEventListener('keypress', (event) => {
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
      { label: 'UYT Calculator', href: '../uyt/index.html' },
      { label: 'YYRT Calculator', href: 'index.html' }
    ]);
  }
});
