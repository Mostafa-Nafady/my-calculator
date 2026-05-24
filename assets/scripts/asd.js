// Calculator State
let currentValue = '0';
let previousValue = '';
let operator = null;
let shouldResetDisplay = false;

// DOM Elements
const display = document.getElementById('display');

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Render header
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'ASD Calculator', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'ASD', href: 'asd.html' },
      { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' }
    ]);
  }

  // Add event listeners to all calculator buttons
  document.querySelectorAll('.calc-btn').forEach(button => {
    button.addEventListener('click', handleButtonClick);
  });
});

// Handle button clicks
function handleButtonClick(event) {
  const button = event.target;
  const action = button.dataset.action;
  const value = button.dataset.value;

  switch (action) {
    case 'number':
      handleNumber(value);
      break;
    case 'operator':
      handleOperator(value);
      break;
    case 'equals':
      handleEquals();
      break;
    case 'clear':
      handleClear();
      break;
    case 'decimal':
      handleDecimal();
      break;
  }

  updateDisplay();
}

// Handle number button press
function handleNumber(value) {
  if (shouldResetDisplay) {
    currentValue = value;
    shouldResetDisplay = false;
  } else {
    if (currentValue === '0' && value !== '0') {
      currentValue = value;
    } else if (currentValue !== '0') {
      currentValue += value;
    }
  }
}

// Handle operator button press
function handleOperator(value) {
  if (operator && !shouldResetDisplay) {
    calculate();
  }
  previousValue = currentValue;
  operator = value;
  shouldResetDisplay = true;
}

// Handle equals button press
function handleEquals() {
  if (operator && previousValue) {
    calculate();
    operator = null;
  }
}

// Handle clear button press
function handleClear() {
  currentValue = '0';
  previousValue = '';
  operator = null;
  shouldResetDisplay = false;
}

// Handle decimal button press
function handleDecimal() {
  if (shouldResetDisplay) {
    currentValue = '0.';
    shouldResetDisplay = false;
  } else if (!currentValue.includes('.')) {
    currentValue += '.';
  }
}

// Perform calculation
function calculate() {
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  let result;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) {
        currentValue = 'Error';
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  // Handle floating point precision
  currentValue = parseFloat(result.toFixed(10)).toString();
  previousValue = '';
  shouldResetDisplay = true;
}

// Update the display
function updateDisplay() {
  display.textContent = currentValue;
}


