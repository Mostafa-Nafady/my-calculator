/**
 * ASD Calculator
 * Calculates (A × B) ÷ C
 */

const inputA = document.getElementById('input-a');
const inputB = document.getElementById('input-b');
const inputC = document.getElementById('input-c');
const calculateBtn = document.getElementById('btn-calculate');
const clearBtn = document.getElementById('btn-clear');
const currentCalculation = document.getElementById('current-calculation');
const currentResult = document.getElementById('current-result');

let defaultResult = 0;
let currentA = 0;
let currentB = 0;
let currentC = 0;

/**
 * Calculates (A × B) ÷ C
 * @param {number} a - The first number (A)
 * @param {number} b - The second number (B)
 * @param {number} c - The divisor (C)
 * @returns {number} The result of (A * B) / C
 */
function calculateASD(a, b, c) {
  return (a * b) / c;
}

/**
 * Updates the calculation display
 * @param {number} a - The first number
 * @param {number} b - The second number
 * @param {number} c - The divisor
 * @param {number} result - The calculated result
 */
function updateCalculationDisplay(a, b, c, result) {
  currentCalculation.textContent = `(${a} × ${b}) ÷ ${c}`;
  currentResult.textContent = result;
}

/**
 * Handles the calculate button click
 */
function handleCalculate() {
  const a = parseFloat(inputA.value);
  const b = parseFloat(inputB.value);
  const c = parseFloat(inputC.value);

  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    alert('Please enter valid numbers for A, B, and C.');
    return;
  }

  if (c === 0) {
    alert('C cannot be zero (division by zero).');
    return;
  }

  currentA = a;
  currentB = b;
  currentC = c;
  defaultResult = calculateASD(a, b, c);

  updateCalculationDisplay(a, b, c, defaultResult);
}

/**
 * Handles the clear button click
 */
function handleClear() {
  inputA.value = '';
  inputB.value = '';
  inputC.value = '';
  currentA = 0;
  currentB = 0;
  currentC = 0;
  defaultResult = 0;
  currentCalculation.textContent = '0';
  currentResult.textContent = '0';
}

// Event listeners
calculateBtn.addEventListener('click', handleCalculate);
clearBtn.addEventListener('click', handleClear);

// Allow Enter key to trigger calculation
inputA.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleCalculate();
  }
});

inputB.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleCalculate();
  }
});

inputC.addEventListener('keypress', (event) => {
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
      { label: 'ASD Calculator', href: 'index.html' },
      { label: 'UYT Calculator', href: '../uyt/index.html' }
    ]);
  }
});
