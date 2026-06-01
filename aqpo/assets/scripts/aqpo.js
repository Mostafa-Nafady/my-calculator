/**
 * AQPO Calculator
 * Calculates A multiplied by Q plus O (A * Q + O)
 */

const inputA = document.getElementById('input-a');
const inputQ = document.getElementById('input-q');
const inputO = document.getElementById('input-o');
const calculateBtn = document.getElementById('btn-calculate');
const clearBtn = document.getElementById('btn-clear');
const currentCalculation = document.getElementById('current-calculation');
const currentResult = document.getElementById('current-result');

let defaultResult = 0;
let currentA = 0;
let currentQ = 0;
let currentO = 0;

/**
 * Calculates A multiplied by Q plus O
 * @param {number} a - The first value (A)
 * @param {number} q - The second value (Q)
 * @param {number} o - The third value (O)
 * @returns {number} The result of (A * Q) + O
 */
function calculateAQPO(a, q, o) {
  return (a * q) + o;
}

/**
 * Updates the calculation display
 * @param {number} a - The first value
 * @param {number} q - The second value
 * @param {number} o - The third value
 * @param {number} result - The calculated result
 */
function updateCalculationDisplay(a, q, o, result) {
  currentCalculation.textContent = `${a} * ${q} + ${o}`;
  currentResult.textContent = result;
}

/**
 * Handles the calculate button click
 */
function handleCalculate() {
  const a = parseFloat(inputA.value);
  const q = parseFloat(inputQ.value);
  const o = parseFloat(inputO.value);

  if (isNaN(a) || isNaN(q) || isNaN(o)) {
    alert('Please enter valid numbers for all values.');
    return;
  }

  currentA = a;
  currentQ = q;
  currentO = o;
  defaultResult = calculateAQPO(a, q, o);

  updateCalculationDisplay(a, q, o, defaultResult);
}

/**
 * Handles the clear button click
 */
function handleClear() {
  inputA.value = '';
  inputQ.value = '';
  inputO.value = '';
  currentA = 0;
  currentQ = 0;
  currentO = 0;
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

inputQ.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleCalculate();
  }
});

inputO.addEventListener('keypress', (event) => {
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
      { label: 'AQPO Calculator', href: 'index.html' }
    ]);
  }
});
