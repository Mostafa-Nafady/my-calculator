// Render the Header component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'AAA Calculator', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'ASD', href: 'asd.html' },
      { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' }
    ]);
  }

  // Get references to calculator elements
  const inputX = document.getElementById('input-x');
  const inputY = document.getElementById('input-y');
  const btnAdd = document.getElementById('btn-add');
  const btnSubtract = document.getElementById('btn-subtract');
  const btnMultiply = document.getElementById('btn-multiply');
  const btnDivide = document.getElementById('btn-divide');
  const resultText = document.getElementById('result-text');

  /**
   * Reads and validates the two input values
   * @returns {{x: number, y: number}|null} The parsed values or null if invalid
   */
  const getInputValues = () => {
    if (!inputX || !inputY) return null;

    const xRaw = inputX.value.trim();
    const yRaw = inputY.value.trim();

    if (xRaw === '' || yRaw === '') return null;

    const x = parseFloat(xRaw);
    const y = parseFloat(yRaw);

    if (isNaN(x) || isNaN(y)) return null;

    return { x, y };
  };

  /**
   * Displays the result text
   * @param {string} text - The text to display
   */
  const displayResult = (text) => {
    if (resultText) {
      resultText.textContent = text;
    }
  };

  // Add button click listeners
  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      const values = getInputValues();
      if (!values) {
        displayResult('Result: Please enter valid numbers');
        return;
      }
      const result = values.x + values.y;
      displayResult(`Result: ${result}`);
    });
  }

  if (btnSubtract) {
    btnSubtract.addEventListener('click', () => {
      const values = getInputValues();
      if (!values) {
        displayResult('Result: Please enter valid numbers');
        return;
      }
      const result = values.x - values.y;
      displayResult(`Result: ${result}`);
    });
  }

  if (btnMultiply) {
    btnMultiply.addEventListener('click', () => {
      const values = getInputValues();
      if (!values) {
        displayResult('Result: Please enter valid numbers');
        return;
      }
      const result = values.x * values.y;
      displayResult(`Result: ${result}`);
    });
  }

  if (btnDivide) {
    btnDivide.addEventListener('click', () => {
      const values = getInputValues();
      if (!values) {
        displayResult('Result: Please enter valid numbers');
        return;
      }
      if (values.y === 0) {
        displayResult('Result: Cannot divide by zero');
        return;
      }
      const result = values.x / values.y;
      displayResult(`Result: ${result}`);
    });
  }
});

