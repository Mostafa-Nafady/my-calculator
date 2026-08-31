// Render the Header component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'ASD Calculator', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'ASD', href: 'asd.html' },
      { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' }
    ]);
  }

  // --- ASD Calculator logic ---
  var display = document.getElementById('asd-display');
  var calculator = document.getElementById('asd-calculator');

  // If the calculator isn't on this page, do nothing (don't throw).
  if (!calculator || !display) {
    return;
  }

  // Initialize the display value.
  var displayValue = '0';
  display.value = displayValue;

  // Helper to update the input element from the stored string.
  function updateDisplay() {
    display.value = displayValue;
  }

  // Helper to get the current number segment (the substring after the last operator).
  function getCurrentNumberSegment() {
    var match = displayValue.match(/[^+\-*/]+$/);
    return match ? match[0] : '';
  }

  // Append a digit to the display.
  function appendDigit(digit) {
    if (displayValue === '0' || displayValue === 'Error') {
      displayValue = digit;
    } else {
      displayValue += digit;
    }
    updateDisplay();
  }

  // Append a decimal point only if the current number segment doesn't already have one.
  function appendDecimal() {
    if (displayValue === 'Error') {
      displayValue = '0.';
      updateDisplay();
      return;
    }
    var segment = getCurrentNumberSegment();
    if (segment.indexOf('.') === -1) {
      // If the segment is empty (display ends with an operator), start "0."
      if (segment === '') {
        displayValue += '0.';
      } else {
        displayValue += '.';
      }
      updateDisplay();
    }
  }

  // Append an operator, replacing the last one if the display already ends with an operator.
  function appendOperator(op) {
    if (displayValue === 'Error') {
      displayValue = '0';
    }
    var lastChar = displayValue.charAt(displayValue.length - 1);
    if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
      // Replace the trailing operator with the new one.
      displayValue = displayValue.slice(0, -1) + op;
    } else {
      displayValue += op;
    }
    updateDisplay();
  }

  // Clear the display.
  function clearDisplay() {
    displayValue = '0';
    updateDisplay();
  }

  // Remove the last character; if empty, set to '0'.
  function backspace() {
    if (displayValue === 'Error') {
      displayValue = '0';
      updateDisplay();
      return;
    }
    displayValue = displayValue.slice(0, -1);
    if (displayValue === '') {
      displayValue = '0';
    }
    updateDisplay();
  }

  // Safely evaluate the expression: sanitize input, then use the Function constructor.
  function evaluate() {
    if (displayValue === 'Error' || displayValue === '') {
      return;
    }
    // Sanitize: allow only digits, operators (+ - * /), and decimal points.
    var sanitized = displayValue.replace(/[^0-9+\-*/.]/g, '');
    if (sanitized === '') {
      return;
    }
    // If the expression ends with an operator, trim it before evaluating.
    var lastChar = sanitized.charAt(sanitized.length - 1);
    if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
      sanitized = sanitized.slice(0, -1);
    }
    if (sanitized === '') {
      return;
    }
    try {
      // Use the Function constructor instead of eval on raw input.
      var result = new Function('return ' + sanitized)();
      if (result === undefined || result === null || isNaN(result)) {
        displayValue = 'Error';
      } else {
        // Convert to string; trim unnecessary trailing zeros from floats.
        displayValue = String(result);
      }
    } catch (e) {
      displayValue = 'Error';
    }
    updateDisplay();
  }

  // Wire up all buttons inside .asd-keys.
  var buttons = document.querySelectorAll('.asd-keys button');
  for (var i = 0; i < buttons.length; i++) {
    (function (btn) {
      if (!btn) return;
      btn.addEventListener('click', function () {
        var id = btn.id;

        // Digit buttons: btn-0 through btn-9.
        if (id && id.indexOf('btn-') === 0 && /^btn-\d$/.test(id)) {
          appendDigit(id.charAt(4));
          return;
        }

        switch (id) {
          case 'btn-add':
            appendOperator('+');
            break;
          case 'btn-sub':
            appendOperator('-');
            break;
          case 'btn-mul':
            appendOperator('*');
            break;
          case 'btn-div':
            appendOperator('/');
            break;
          case 'btn-decimal':
            appendDecimal();
            break;
          case 'btn-clear':
            clearDisplay();
            break;
          case 'btn-backspace':
            backspace();
            break;
          case 'btn-equals':
            evaluate();
            break;
          default:
            // Unknown button — do nothing.
            break;
        }
      });
    })(buttons[i]);
  }
});


