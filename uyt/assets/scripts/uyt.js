/**
 * UYT Calculator
 * Calculates U multiplied by Y and divided by T
 */

const uInput = document.getElementById('input-u');
const yInput = document.getElementById('input-y');
const tInput = document.getElementById('input-t');
const calculateBtn = document.getElementById('btn-calculate');
const clearBtn = document.getElementById('btn-clear');
const currentCalculation = document.getElementById('current-calculation');
const currentResult = document.getElementById('current-result');

let defaultResult = 0;
let currentU = 0;
let currentY = 0;
let currentT = 0;

/**
 * Calculates U multiplied by Y and divided by T
 * @param {number} u - The U value
 * @param {number} y - The Y value (multiplier)
 * @param {number} t - The T value (divisor)
 * @returns {number} The result of (u * y) / t
 */
function calculateUYT(u, y, t) {
  if (t === 0) {
    throw new Error('Cannot divide by zero');
  }
  return (u * y) / t;
}

/**
 * Updates the calculation display
 * @param {number} u - The U value
 * @param {number} y - The Y value
 * @param {number} t - The T value
 * @param {number} result - The calculated result
 */
function updateCalculationDisplay(u, y, t, result) {
  currentCalculation.textContent = `(${u} × ${y}) ÷ ${t}`;
  currentResult.textContent = result;
}

/**
 * Handles the calculate button click
 */
function handleCalculate() {
  const u = parseFloat(uInput.value);
  const y = parseFloat(yInput.value);
  const t = parseFloat(tInput.value);

  if (isNaN(u) || isNaN(y) || isNaN(t)) {
    alert('Please enter valid numbers for U, Y, and T.');
    return;
  }

  if (t === 0) {
    alert('Cannot divide by zero. Please enter a non-zero value for T.');
    return;
  }

  currentU = u;
  currentY = y;
  currentT = t;
  
  try {
    defaultResult = calculateUYT(u, y, t);
    updateCalculationDisplay(u, y, t, defaultResult);
  } catch (error) {
    alert(error.message);
  }
}

/**
 * Handles the clear button click
 */
function handleClear() {
  uInput.value = '';
  yInput.value = '';
  tInput.value = '';
  currentU = 0;
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
uInput.addEventListener('keypress', (event) => {
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
      { label: 'UYT Calculator', href: 'index.html' }
    ]);
  }
});

