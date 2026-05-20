/**
 * TRY Calculator
 * Calculates T multiplied by R and divided by Y
 */

const tInput = document.getElementById('input-t');
const rInput = document.getElementById('input-r');
const yInput = document.getElementById('input-y');
const calculateBtn = document.getElementById('btn-calculate');
const clearBtn = document.getElementById('btn-clear');
const currentCalculation = document.getElementById('current-calculation');
const currentResult = document.getElementById('current-result');

let defaultResult = 0;
let currentT = 0;
let currentR = 0;
let currentY = 0;

/**
 * Calculates T multiplied by R and divided by Y
 * @param {number} t - The T value
 * @param {number} r - The R value (multiplier)
 * @param {number} y - The Y value (divisor)
 * @returns {number} The result of (t * r) / y
 */
function calculateTRY(t, r, y) {
  if (y === 0) {
    throw new Error('Cannot divide by zero');
  }
  return (t * r) / y;
}

/**
 * Updates the calculation display
 * @param {number} t - The T value
 * @param {number} r - The R value
 * @param {number} y - The Y value
 * @param {number} result - The calculated result
 */
function updateCalculationDisplay(t, r, y, result) {
  currentCalculation.textContent = `(${t} × ${r}) ÷ ${y}`;
  currentResult.textContent = result;
}

/**
 * Handles the calculate button click
 */
function handleCalculate() {
  const t = parseFloat(tInput.value);
  const r = parseFloat(rInput.value);
  const y = parseFloat(yInput.value);

  if (isNaN(t) || isNaN(r) || isNaN(y)) {
    alert('Please enter valid numbers for T, R, and Y.');
    return;
  }

  if (y === 0) {
    alert('Cannot divide by zero. Please enter a non-zero value for Y.');
    return;
  }

  currentT = t;
  currentR = r;
  currentY = y;
  
  try {
    defaultResult = calculateTRY(t, r, y);
    updateCalculationDisplay(t, r, y, defaultResult);
  } catch (error) {
    alert(error.message);
  }
}

/**
 * Handles the clear button click
 */
function handleClear() {
  tInput.value = '';
  rInput.value = '';
  yInput.value = '';
  currentT = 0;
  currentR = 0;
  currentY = 0;
  defaultResult = 0;
  currentCalculation.textContent = '0';
  currentResult.textContent = '0';
}

// Event listeners
calculateBtn.addEventListener('click', handleCalculate);
clearBtn.addEventListener('click', handleClear);

// Allow Enter key to trigger calculation
tInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleCalculate();
  }
});

rInput.addEventListener('keypress', (event) => {
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
      { label: 'UYT Calculator', href: '../uyt/index.html' },
      { label: 'TRY Calculator', href: 'index.html' }
    ]);
  }
});

