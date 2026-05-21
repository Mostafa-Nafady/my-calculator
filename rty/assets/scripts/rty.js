/**
 * RTY Calculator
 * Calculates R multiplied by Y and divided by T
 */

const rInput = document.getElementById('input-r');
const yInput = document.getElementById('input-y');
const tInput = document.getElementById('input-t');
const calculateBtn = document.getElementById('btn-calculate');
const clearBtn = document.getElementById('btn-clear');
const currentCalculation = document.getElementById('current-calculation');
const currentResult = document.getElementById('current-result');

let defaultResult = 0;
let currentR = 0;
let currentY = 0;
let currentT = 0;

/**
 * Calculates R multiplied by Y and divided by T
 * @param {number} r - The R value
 * @param {number} y - The Y value (multiplier)
 * @param {number} t - The T value (divisor)
 * @returns {number} The result of (r * y) / t
 */
function calculateRTY(r, y, t) {
  if (t === 0) {
    throw new Error('Cannot divide by zero');
  }
  return (r * y) / t;
}

/**
 * Updates the calculation display
 * @param {number} r - The R value
 * @param {number} y - The Y value
 * @param {number} t - The T value
 * @param {number} result - The calculated result
 */
function updateCalculationDisplay(r, y, t, result) {
  currentCalculation.textContent = `(${r} × ${y}) ÷ ${t}`;
  currentResult.textContent = result;
}

/**
 * Handles the calculate button click
 */
function handleCalculate() {
  const r = parseFloat(rInput.value);
  const y = parseFloat(yInput.value);
  const t = parseFloat(tInput.value);

  if (isNaN(r) || isNaN(y) || isNaN(t)) {
    alert('Please enter valid numbers for R, Y, and T.');
    return;
  }

  if (t === 0) {
    alert('Cannot divide by zero. Please enter a non-zero value for T.');
    return;
  }

  currentR = r;
  currentY = y;
  currentT = t;
  
  try {
    defaultResult = calculateRTY(r, y, t);
    updateCalculationDisplay(r, y, t, defaultResult);
  } catch (error) {
    alert(error.message);
  }
}

/**
 * Handles the clear button click
 */
function handleClear() {
  rInput.value = '';
  yInput.value = '';
  tInput.value = '';
  currentR = 0;
  currentY = 0;
  currentT = 0;
  defaultResult = 0;
  currentCalculation.textContent = '0';
  currentResult.textContent = '0';
}

// Event listeners
calculateBtn.addEventListener('click', handleCalculate);
clearBtn.addEventListener('click', handleClear);

// Allow Enter key to trigger calculation
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

tInput.addEventListener('keypress', (event) => {
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
      { label: 'RTY Calculator', href: 'index.html' }
    ]);
  }
});

