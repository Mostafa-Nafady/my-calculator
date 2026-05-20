/**
 * UIY Calculator
 * Multiplies or divides two numbers (Y1 and Y2)
 */

const inputY1 = document.getElementById('input-y1');
const inputY2 = document.getElementById('input-y2');
const btnMultiply = document.getElementById('btn-multiply');
const btnDivide = document.getElementById('btn-divide');
const btnClear = document.getElementById('btn-clear');
const currentCalculation = document.getElementById('current-calculation');
const currentResult = document.getElementById('current-result');

let defaultResult = 0;
let currentY1 = 0;
let currentY2 = 0;
let lastOperation = null;

/**
 * Calculates Y1 multiplied or divided by Y2
 * @param {number} y1 - The first number
 * @param {number} y2 - The second number
 * @param {string} operation - Either 'multiply' or 'divide'
 * @returns {number} The result of the operation
 */
function calculateY1Y2(y1, y2, operation) {
  if (operation === 'multiply') {
    return y1 * y2;
  } else if (operation === 'divide') {
    return y1 / y2;
  }
  return 0;
}

/**
 * Updates the calculation display
 * @param {number} y1 - The first number
 * @param {number} y2 - The second number
 * @param {string} operation - The operation performed
 * @param {number} result - The calculated result
 */
function updateCalculationDisplay(y1, y2, operation, result) {
  const operator = operation === 'multiply' ? '×' : '÷';
  currentCalculation.textContent = `${y1} ${operator} ${y2}`;
  currentResult.textContent = result;
}

/**
 * Handles the multiply button click
 */
function handleMultiply() {
  const y1 = parseFloat(inputY1.value);
  const y2 = parseFloat(inputY2.value);

  if (isNaN(y1) || isNaN(y2)) {
    alert('Please enter valid numbers for both inputs.');
    return;
  }

  currentY1 = y1;
  currentY2 = y2;
  lastOperation = 'multiply';
  defaultResult = calculateY1Y2(y1, y2, 'multiply');

  updateCalculationDisplay(y1, y2, 'multiply', defaultResult);
}

/**
 * Handles the divide button click
 */
function handleDivide() {
  const y1 = parseFloat(inputY1.value);
  const y2 = parseFloat(inputY2.value);

  if (isNaN(y1) || isNaN(y2)) {
    alert('Please enter valid numbers for both inputs.');
    return;
  }

  if (y2 === 0) {
    alert('Cannot divide by zero.');
    return;
  }

  currentY1 = y1;
  currentY2 = y2;
  lastOperation = 'divide';
  defaultResult = calculateY1Y2(y1, y2, 'divide');

  updateCalculationDisplay(y1, y2, 'divide', defaultResult);
}

/**
 * Handles the clear button click
 */
function handleClear() {
  inputY1.value = '';
  inputY2.value = '';
  currentY1 = 0;
  currentY2 = 0;
  defaultResult = 0;
  lastOperation = null;
  currentCalculation.textContent = '0';
  currentResult.textContent = '0';
}

// Event listeners
btnMultiply.addEventListener('click', handleMultiply);
btnDivide.addEventListener('click', handleDivide);
btnClear.addEventListener('click', handleClear);

// Allow Enter key to trigger the last operation
inputY1.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    if (lastOperation === 'multiply') {
      handleMultiply();
    } else if (lastOperation === 'divide') {
      handleDivide();
    }
  }
});

inputY2.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    if (lastOperation === 'multiply') {
      handleMultiply();
    } else if (lastOperation === 'divide') {
      handleDivide();
    }
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
      { label: 'UIY Calculator', href: 'index.html' }
    ]);
  }
});

