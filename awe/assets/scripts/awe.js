/**
 * AWE Calculator
 * Calculates AWE (Average Weighted something)
 */

const valueAInput = document.getElementById('input-value-a');
const valueBInput = document.getElementById('input-value-b');
const calculateBtn = document.getElementById('btn-calculate');
const clearBtn = document.getElementById('btn-clear');
const currentCalculation = document.getElementById('current-calculation');
const currentResult = document.getElementById('current-result');

let defaultResult = 0;
let currentValueA = 0;
let currentValueB = 0;

/**
 * Calculates AWE (Average of A and B)
 * @param {number} valueA - The first value
 * @param {number} valueB - The second value
 * @returns {number} The average of valueA and valueB
 */
function calculateAWE(valueA, valueB) {
  return (valueA + valueB) / 2;
}

/**
 * Updates the calculation display
 * @param {number} valueA - The first value
 * @param {number} valueB - The second value
 * @param {number} result - The calculated result
 */
function updateCalculationDisplay(valueA, valueB, result) {
  currentCalculation.textContent = `( ${valueA} + ${valueB} ) / 2`;
  currentResult.textContent = result;
}

/**
 * Handles the calculate button click
 */
function handleCalculate() {
  const valueA = parseFloat(valueAInput.value);
  const valueB = parseFloat(valueBInput.value);

  if (isNaN(valueA) || isNaN(valueB)) {
    alert('Please enter valid numbers for both values.');
    return;
  }

  currentValueA = valueA;
  currentValueB = valueB;
  defaultResult = calculateAWE(valueA, valueB);

  updateCalculationDisplay(valueA, valueB, defaultResult);
}

/**
 * Handles the clear button click
 */
function handleClear() {
  valueAInput.value = '';
  valueBInput.value = '';
  currentValueA = 0;
  currentValueB = 0;
  defaultResult = 0;
  currentCalculation.textContent = '0';
  currentResult.textContent = '0';
}

// Event listeners
calculateBtn.addEventListener('click', handleCalculate);
clearBtn.addEventListener('click', handleClear);

// Allow Enter key to trigger calculation
valueAInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleCalculate();
  }
});

valueBInput.addEventListener('keypress', (event) => {
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
      { label: 'UYT Calculator', href: '../uyt/index.html' }
    ]);
  }
});
