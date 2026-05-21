/**
 * TYO Calculator
 * Calculates T multiplied by Y and divided by O
 */

const tInput = document.getElementById('input-t');
const yInput = document.getElementById('input-y');
const oInput = document.getElementById('input-o');
const calculateBtn = document.getElementById('btn-calculate');
const clearBtn = document.getElementById('btn-clear');
const currentCalculation = document.getElementById('current-calculation');
const currentResult = document.getElementById('current-result');

let defaultResult = 0;
let currentT = 0;
let currentY = 0;
let currentO = 0;

/**
 * Calculates T multiplied by Y and divided by O
 * @param {number} t - The T value
 * @param {number} y - The Y value (multiplier)
 * @param {number} o - The O value (divisor)
 * @returns {number} The result of (t * y) / o
 */
function calculateTYO(t, y, o) {
  if (o === 0) {
    throw new Error('Cannot divide by zero');
  }
  return (t * y) / o;
}

/**
 * Updates the calculation display
 * @param {number} t - The T value
 * @param {number} y - The Y value
 * @param {number} o - The O value
 * @param {number} result - The calculated result
 */
function updateCalculationDisplay(t, y, o, result) {
  currentCalculation.textContent = `(${t} × ${y}) ÷ ${o}`;
  currentResult.textContent = result;
}

/**
 * Handles the calculate button click
 */
function handleCalculate() {
  const t = parseFloat(tInput.value);
  const y = parseFloat(yInput.value);
  const o = parseFloat(oInput.value);

  if (isNaN(t) || isNaN(y) || isNaN(o)) {
    alert('Please enter valid numbers for T, Y, and O.');
    return;
  }

  if (o === 0) {
    alert('Cannot divide by zero. Please enter a non-zero value for O.');
    return;
  }

  currentT = t;
  currentY = y;
  currentO = o;
  
  try {
    defaultResult = calculateTYO(t, y, o);
    updateCalculationDisplay(t, y, o, defaultResult);
  } catch (error) {
    alert(error.message);
  }
}

/**
 * Handles the clear button click
 */
function handleClear() {
  tInput.value = '';
  yInput.value = '';
  oInput.value = '';
  currentT = 0;
  currentY = 0;
  currentO = 0;
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

yInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleCalculate();
  }
});

oInput.addEventListener('keypress', (event) => {
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
      { label: 'TYO Calculator', href: 'index.html' }
    ]);
  }
});



