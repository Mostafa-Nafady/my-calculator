/**
 * ASD Calculator
 * Calculates A plus S multiplied by D
 */

const aInput = document.getElementById('input-a');
const sInput = document.getElementById('input-s');
const dInput = document.getElementById('input-d');
const calculateBtn = document.getElementById('btn-calculate');
const clearBtn = document.getElementById('btn-clear');
const currentCalculation = document.getElementById('current-calculation');
const currentResult = document.getElementById('current-result');

let defaultResult = 0;
let currentA = 0;
let currentS = 0;
let currentD = 0;

/**
 * Calculates A plus S multiplied by D
 * @param {number} a - The A value
 * @param {number} s - The S value
 * @param {number} d - The D value (multiplier)
 * @returns {number} The result of a + (s * d)
 */
function calculateASD(a, s, d) {
  return a + (s * d);
}

/**
 * Updates the calculation display
 * @param {number} a - The A value
 * @param {number} s - The S value
 * @param {number} d - The D value
 * @param {number} result - The calculated result
 */
function updateCalculationDisplay(a, s, d, result) {
  currentCalculation.textContent = `${a} + (${s} × ${d})`;
  currentResult.textContent = result;
}

/**
 * Handles the calculate button click
 */
function handleCalculate() {
  const a = parseFloat(aInput.value);
  const s = parseFloat(sInput.value);
  const d = parseFloat(dInput.value);

  if (isNaN(a) || isNaN(s) || isNaN(d)) {
    alert('Please enter valid numbers for A, S, and D.');
    return;
  }

  currentA = a;
  currentS = s;
  currentD = d;
  
  defaultResult = calculateASD(a, s, d);
  updateCalculationDisplay(a, s, d, defaultResult);
}

/**
 * Handles the clear button click
 */
function handleClear() {
  aInput.value = '';
  sInput.value = '';
  dInput.value = '';
  currentA = 0;
  currentS = 0;
  currentD = 0;
  defaultResult = 0;
  currentCalculation.textContent = '0';
  currentResult.textContent = '0';
}

// Event listeners
calculateBtn.addEventListener('click', handleCalculate);
clearBtn.addEventListener('click', handleClear);

// Allow Enter key to trigger calculation
aInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleCalculate();
  }
});

sInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleCalculate();
  }
});

dInput.addEventListener('keypress', (event) => {
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
      { label: 'ASD Calculator', href: 'index.html' }
    ]);
  }
});
