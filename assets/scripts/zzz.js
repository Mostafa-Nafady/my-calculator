// Render the Header component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'ZZZ Calculator', [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'ASD', href: 'asd.html' },
      { label: 'Basic Calculator', href: 'basics-10-function-refactoring/index.html' },
      { label: 'XPY Calculator', href: 'xpy/index.html' },
      { label: 'ZZZ', href: 'zzz.html' }
    ]);
  }

  // Wire up the ZZZ calculator button
  const btnCalc = document.getElementById('btn-calc');
  if (btnCalc) {
    btnCalc.addEventListener('click', () => {
      const input1 = document.getElementById('input1');
      const input2 = document.getElementById('input2');
      const results = document.getElementById('results');

      const value1 = parseFloat(input1 ? input1.value : '');
      const value2 = parseFloat(input2 ? input2.value : '');

      if (isNaN(value1) || isNaN(value2)) {
        if (results) {
          results.textContent = 'Please enter valid numbers in both fields.';
        }
        return;
      }

      const result = value1 + value2;

      if (results) {
        results.textContent = 'Result: ' + result;
      }
    });
  }
});

