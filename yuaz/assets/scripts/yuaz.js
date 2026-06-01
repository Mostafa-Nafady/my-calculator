/**
 * YUAZ Calculator
 * Calculates Y multiplied by U and added to A then divided by Z
 */

const yInput = document.getElementById('input-y');
const uInput = document.getElementById('input-u');
const aInput = document.getElementById('input-a');
const zInput = document.getElementById('input-z');
const calculateBtn = document.getElementById('btn-calculate');
const clearBtn = document.getElementById('btn-clear');
const currentCalculation = document.getElementById('current-calculation');
const currentResult = document.getElementById('current-result');

let defaultResult = 0;
let currentY = 0;
let currentU = 0;
let currentA = 0;
let currentZ = 0;

/**
 * Calculates Y multiplied by U and added to A then divided by Z
 * @param {number} y - The Y value
 * @param {number} u - The U value
 * @param {number} a - The A value
 * @param {number} z - The Z value (divisor)
 * @returns {number} The result of (y * u + a) / z
 */
function calculateYUAZ(y, u, a, z) {
  if (z === 0) {
    throw new Error('Cannot divide by zero');
  }
  return (y * u + a) / z;
}

/**
 * Updates the calculation display
 * @param {number} y - The Y value
 * @param {number} u - The U value
 * @param {number} a - The A value
 * @param {number} z - The Z value
 * @param {number} result - The calculated result
 */
function updateCalculationDisplay(y, u, a, z, result) {
  currentCalculation.textContent = `(${y} × ${u} + ${a}) ÷ ${z}`;
  currentResult.textContent = result;
}

/**
 * Handles the calculate button click
 */
function handleCalculate() {
  const y = parseFloat(yInput.value);
  const u = parseFloat(uInput.value);
  const a = parseFloat(aInput.value);
  const z = parseFloat(zInput.value);

  if (isNaN(y) || isNaN(u) || isNaN(a) || isNaN(z)) {
    alert('Please enter valid numbers for Y, U, A, and Z.');
    return;
  }

  if (z === 0) {
    alert('Cannot divide by zero. Please enter a non-zero value for Z.');
    return;
  }

  currentY = y;
  currentU = u;
  currentA = a;
  currentZ = z;
  
  try {
    defaultResult = calculateYUAZ(y, u, a, z);
    updateCalculationDisplay(y, u, a, z, defaultResult);
  } catch (error) {
    alert(error.message);
  }
}

/**
 * Handles the clear button click
 */
function handleClear() {
  yInput.value = '';
  uInput.value = '';
  aInput.value = '';
  zInput.value = '';
  currentY = 0;
  currentU = 0;
  currentA = 0;
  currentZ = 0;
  defaultResult = 0;
  currentCalculation.textContent = '0';
  currentResult.textContent = '0';
}

// Event listeners
calculateBtn.addEventListener('click', handleCalculate);
clearBtn.addEventListener('click', handleClear);

// Allow Enter key to trigger calculation
yInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleCalculate();
  }
});

uInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleCalculate();
  }
});

aInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleCalculate();
  }
});

zInput.addEventListener('keypress', (event) => {
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
      { label: 'YUAZ Calculator', href: 'index.html' }
    ]);
  }
});
