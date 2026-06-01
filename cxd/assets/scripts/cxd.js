/**
 * CXD Calculator
 * Calculator logic for CXD (X * D) operation
 */

/**
 * Calculates CXD result
 * Formula: X * D
 * @param {number} x - The X value
 * @param {number} d - The D value
 * @returns {number} The calculated result
 */
function calculateCXD(x, d) {
  return x * d;
}

/**
 * Validates input values
 * @param {string} xValue - The X input value
 * @param {string} dValue - The D input value
 * @returns {{valid: boolean, x: number|null, d: number|null, error: string|null}}
 */
function validateInputs(xValue, dValue) {
  if (xValue.trim() === '' || dValue.trim() === '') {
    return { valid: false, x: null, d: null, error: 'Please enter both values' };
  }
  
  const x = parseFloat(xValue);
  const d = parseFloat(dValue);
  
  if (isNaN(x)) {
    return { valid: false, x: null, d: null, error: 'X must be a valid number' };
  }
  
  if (isNaN(d)) {
    return { valid: false, x: null, d: null, error: 'D must be a valid number' };
  }
  
  return { valid: true, x, d, error: null };
}

/**
 * Updates the result display
 * @param {number|null} result - The calculated result or null
 */
function updateResultDisplay(result) {
  const resultElement = document.getElementById('cxd-result');
  if (!resultElement) return;
  
  if (result !== null) {
    resultElement.textContent = result.toFixed(4).replace(/\.?0+$/, '');
    resultElement.classList.add('has-value');
  } else {
    resultElement.textContent = '—';
    resultElement.classList.remove('has-value');
  }
}

/**
 * Handles the calculate button click
 */
function handleCalculate() {
  const xInput = document.getElementById('cxd-x');
  const dInput = document.getElementById('cxd-d');
  
  if (!xInput || !dInput) {
    console.error('Input elements not found');
    return;
  }
  
  const validation = validateInputs(xInput.value, dInput.value);
  
  if (!validation.valid) {
    alert(validation.error);
    return;
  }
  
  const result = calculateCXD(validation.x, validation.d);
  updateResultDisplay(result);
}

/**
 * Initializes the CXD calculator
 */
function initCXDCalculator() {
  const calculateBtn = document.getElementById('calculate-btn');
  
  if (calculateBtn) {
    calculateBtn.addEventListener('click', handleCalculate);
  }
  
  // Allow Enter key to trigger calculation
  const xInput = document.getElementById('cxd-x');
  const dInput = document.getElementById('cxd-d');
  
  if (xInput) {
    xInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleCalculate();
    });
  }
  
  if (dInput) {
    dInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleCalculate();
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCXDCalculator);
} else {
  initCXDCalculator();
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculateCXD, validateInputs, updateResultDisplay, handleCalculate };
}
