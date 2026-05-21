// Render the Header component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'Basic Calculator', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'ADDOP', href: 'addop.html' },
      { label: 'ASD', href: 'asd.html' },
      { label: 'Basic Calculator', href: 'basics/index.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' },
      { label: 'UYT Calculator', href: 'uyt/index.html' }
    ]);
  }
});

// Calculator logic
(function () {
  const input = document.getElementById('input');
  const results = document.getElementById('results');
  const calcActions = document.getElementById('calc-actions');

  let currentInput = '';
  let previousInput = '';
  let operator = null;
  let shouldResetInput = false;

  function updateDisplay() {
    input.value = currentInput;
  }

  function calculate(a, b, op) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    switch (op) {
      case '+':
        return numA + numB;
      case '-':
        return numA - numB;
      case '*':
        return numA * numB;
      case '/':
        if (numB === 0) {
          return 'Error';
        }
        return numA / numB;
      default:
        return numB;
    }
  }

  function handleNumber(value) {
    if (shouldResetInput) {
      currentInput = '';
      shouldResetInput = false;
    }
    currentInput += value;
    updateDisplay();
  }

  function handleOperator(op) {
    if (currentInput === '' && previousInput === '') return;

    if (currentInput !== '' && previousInput !== '' && operator !== null) {
      const result = calculate(previousInput, currentInput, operator);
      previousInput = String(result);
      currentInput = '';
    } else if (currentInput !== '') {
      previousInput = currentInput;
      currentInput = '';
    }

    operator = op;
    shouldResetInput = true;
  }

  function handleEquals() {
    if (previousInput === '' || currentInput === '' || operator === null) return;

    const result = calculate(previousInput, currentInput, operator);
    results.textContent = previousInput + ' ' + operator + ' ' + currentInput + ' = ' + result;
    currentInput = String(result);
    previousInput = '';
    operator = null;
    shouldResetInput = true;
    updateDisplay();
  }

  function handleClear() {
    currentInput = '';
    previousInput = '';
    operator = null;
    results.textContent = '';
    updateDisplay();
  }

  function handleDelete() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  }

  calcActions.addEventListener('click', function (e) {
    const button = e.target.closest('button');
    if (!button) return;

    const value = button.getAttribute('data-value');

    switch (value) {
      case 'C':
        handleClear();
        break;
      case 'DEL':
        handleDelete();
        break;
      case '=':
        handleEquals();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        handleOperator(value);
        break;
      default:
        handleNumber(value);
        break;
    }
  });
})();



