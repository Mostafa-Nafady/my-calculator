/**
 * YTER Calculator
 * Calculates Y multiplied by E raised to the power of R
 */

const yInput = document.getElementById('input-y');
const eInput = document.getElementById('input-e');
const rInput = document.getElementById('input-r');
const calculateBtn = document.getElementById('btn-calculate');
const clearBtn = document.getElementById('btn-clear');
const currentCalculation = document.getElementById('current-calculation');
const currentResult = document.getElementById('current-result');

let defaultResult = 0;
let currentY = 0;
let currentE = 0;
let currentR = 0;

/**
 * Calculates Y multiplied by E raised to the power of R
 * @param {number} y - The Y value (multiplier)
 * @param {number} e - The base value (E)
 * @param {number} r - The exponent (R)
 * @returns {number} The result of y * (e ^ r)
 */
function calculateYTER(y, e, r) {
  return y * Math.pow(e, r);
}

/**
 * Updates the calculation display
 * @param {number} y - The Y value
 * @param {number} e - The E value
 * @param {number} r - The R value
 * @param {number} result - The calculated result
 */
function updateCalculationDisplay(y, e, r, result) {
  currentCalculation.textContent = `${y} × (${e} ^ ${r})`;
  currentResult.textContent = result;
}

/**
 * Handles the calculate button click
 */
function handleCalculate() {
  const y = parseFloat(yInput.value);
  const e = parseFloat(eInput.value);
  const r = parseFloat(rInput.value);

  if (isNaN(y) || isNaN(e) || isNaN(r)) {
    alert('Please enter valid numbers for Y, E, and R.');
    return;
  }

  currentY = y;
  currentE = e;
  currentR = r;
  defaultResult = calculateYTER(y, e, r);

  updateCalculationDisplay(y, e, r, defaultResult);
}

/**
 * Handles the clear button click
 */
function handleClear() {
  yInput.value = '';
  eInput.value = '';
  rInput.value = '';
  currentY = 0;
  currentE = 0;
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

eInput.addEventListener('keypress', (event) => {
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
      { label: 'YTER Calculator', href: 'index.html' }
    ]);
  }
});

