/**
 * ASE Calculator
 * Calculates A + S × E
 */

const inputA = document.getElementById('input-a');
const inputS = document.getElementById('input-s');
const inputE = document.getElementById('input-e');
const calculateBtn = document.getElementById('btn-calculate');
const clearBtn = document.getElementById('btn-clear');
const currentCalculation = document.getElementById('current-calculation');
const currentResult = document.getElementById('current-result');

let defaultResult = 0;
let currentA = 0;
let currentS = 0;
let currentE = 0;

/**
 * Calculates A + S × E
 * @param {number} a - The A value
 * @param {number} s - The S value
 * @param {number} e - The E value
 * @returns {number} The result of A + (S × E)
 */
function calculateASE(a, s, e) {
  return a + (s * e);
}

/**
 * Updates the calculation display
 * @param {number} a - The A value
 * @param {number} s - The S value
 * @param {number} e - The E value
 * @param {number} result - The calculated result
 */
function updateCalculationDisplay(a, s, e, result) {
  currentCalculation.textContent = `${a} + ${s} × ${e}`;
  currentResult.textContent = result;
}

/**
 * Handles the calculate button click
 */
function handleCalculate() {
  const a = parseFloat(inputA.value);
  const s = parseFloat(inputS.value);
  const e = parseFloat(inputE.value);

  if (isNaN(a) || isNaN(s) || isNaN(e)) {
    alert('Please enter valid numbers for A, S, and E.');
    return;
  }

  currentA = a;
  currentS = s;
  currentE = e;
  defaultResult = calculateASE(a, s, e);

  updateCalculationDisplay(a, s, e, defaultResult);
}

/**
 * Handles the clear button click
 */
function handleClear() {
  inputA.value = '';
  inputS.value = '';
  inputE.value = '';
  currentA = 0;
  currentS = 0;
  currentE = 0;
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

inputS.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleCalculate();
  }
});

inputE.addEventListener('keypress', (event) => {
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
      { label: 'ASE Calculator', href: 'index.html' },
      { label: 'UYT Calculator', href: '../uyt/index.html' }
    ]);
  }
});
