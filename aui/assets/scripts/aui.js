/**
 * AUI Calculator JavaScript
 * Handles arithmetic calculator functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize header with navigation
  renderHeader('header-container', 'AUI Calculator', [
    { label: 'Home', href: '../index.html' }
  ]);

  // Get DOM elements
  const inputA = document.getElementById('input-a');
  const inputB = document.getElementById('input-b');
  const operationSelect = document.getElementById('operation-select');
  const btnCalculate = document.getElementById('btn-calculate');
  const btnClear = document.getElementById('btn-clear');
  const currentCalculation = document.getElementById('current-calculation');
  const currentResult = document.getElementById('current-result');

  /**
   * Performs arithmetic calculation based on selected operation
   * @param {number} a - First operand
   * @param {string} operator - The operator (+, -, *, /)
   * @param {number} b - Second operand
   * @returns {number} The result of the calculation
   */
  function calculate(a, operator, b) {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        if (b === 0) {
          return 'Error: Division by zero';
        }
        return a / b;
      default:
        return 'Error: Invalid operation';
    }
  }

  /**
   * Updates the display with current calculation and result
   */
  function updateDisplay() {
    const a = parseFloat(inputA.value);
    const b = parseFloat(inputB.value);
    const operator = operationSelect.value;

    // Update calculation display
    const operatorSymbol = operator === '*' ? '\u00D7' : operator === '/' ? '\u00F7' : operator;
    currentCalculation.textContent = `${isNaN(a) ? '?' : a} ${operatorSymbol} ${isNaN(b) ? '?' : b}`;

    // Calculate and update result if both inputs are valid
    if (!isNaN(a) && !isNaN(b)) {
      const result = calculate(a, operator, b);
      currentResult.textContent = typeof result === 'number' ? result.toFixed(2).replace(/\.00$/, '') : result;
    } else {
      currentResult.textContent = '0';
    }
  }

  /**
   * Clears all inputs and resets display
   */
  function clearInputs() {
    inputA.value = '';
    inputB.value = '';
    operationSelect.value = '+';
    currentCalculation.textContent = '0';
    currentResult.textContent = '0';
    inputA.focus();
  }

  // Event listeners
  btnCalculate.addEventListener('click', updateDisplay);
  btnClear.addEventListener('click', clearInputs);

  // Update display on input changes
  inputA.addEventListener('input', updateDisplay);
  inputB.addEventListener('input', updateDisplay);
  operationSelect.addEventListener('change', updateDisplay);

  // Allow Enter key to trigger calculation
  inputA.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      updateDisplay();
    }
  });

  inputB.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      updateDisplay();
    }
  });
});
