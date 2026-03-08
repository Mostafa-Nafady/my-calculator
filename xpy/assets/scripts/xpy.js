/**
 * XPY Calculator
 * Calculates X raised to the power of Y
 */

const baseInput = document.getElementById('input-base');
const exponentInput = document.getElementById('input-exponent');
const calculateBtn = document.getElementById('btn-calculate');
const clearBtn = document.getElementById('btn-clear');
const currentCalculation = document.getElementById('current-calculation');
const currentResult = document.getElementById('current-result');

let defaultResult = 0;
let currentBase = 0;
let currentExponent = 0;

/**
 * Calculates X raised to the power of Y
 * @param {number} base - The base number (X)
 * @param {number} exponent - The exponent (Y)
 * @returns {number} The result of base^exponent
 */
function calculateXPY(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * Updates the calculation display
 * @param {number} base - The base number
 * @param {number} exponent - The exponent
 * @param {number} result - The calculated result
 */
function updateCalculationDisplay(base, exponent, result) {
  currentCalculation.textContent = `${base} ^ ${exponent}`;
  currentResult.textContent = result;
}

/**
 * Handles the calculate button click
 */
function handleCalculate() {
  const base = parseFloat(baseInput.value);
  const exponent = parseFloat(exponentInput.value);

  if (isNaN(base) || isNaN(exponent)) {
    alert('Please enter valid numbers for both base and exponent.');
    return;
  }

  currentBase = base;
  currentExponent = exponent;
  defaultResult = calculateXPY(base, exponent);

  updateCalculationDisplay(base, exponent, defaultResult);
}

/**
 * Handles the clear button click
 */
function handleClear() {
  baseInput.value = '';
  exponentInput.value = '';
  currentBase = 0;
  currentExponent = 0;
  defaultResult = 0;
  currentCalculation.textContent = '0';
  currentResult.textContent = '0';
}

// Event listeners
calculateBtn.addEventListener('click', handleCalculate);
clearBtn.addEventListener('click', handleClear);

// Allow Enter key to trigger calculation
baseInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleCalculate();
  }
});

exponentInput.addEventListener('keypress', (event) => {
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
      { label: 'XPY Calculator', href: 'index.html' }
    ]);
  }
});


