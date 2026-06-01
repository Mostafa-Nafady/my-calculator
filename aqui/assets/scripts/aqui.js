/**
 * AQUi Calculator
 * Calculator logic for AQUi (A * Q * U * I) operation
 */

/**
 * Calculates AQUi result
 * Formula: A * Q * U * I
 * @param {number} a - The A value
 * @param {number} q - The Q value
 * @param {number} u - The U value
 * @param {number} i - The I value
 * @returns {number} The calculated result
 */
function calculateAQUi(a, q, u, i) {
  return a * q * u * i;
}

/**
 * Validates input values
 * @param {string} aValue - The A input value
 * @param {string} qValue - The Q input value
 * @param {string} uValue - The U input value
 * @param {string} iValue - The I input value
 * @returns {{valid: boolean, a: number|null, q: number|null, u: number|null, i: number|null, error: string|null}}
 */
function validateInputs(aValue, qValue, uValue, iValue) {
  if (aValue.trim() === '' || qValue.trim() === '' || uValue.trim() === '' || iValue.trim() === '') {
    return { valid: false, a: null, q: null, u: null, i: null, error: 'Please enter all four values' };
  }
  
  const a = parseFloat(aValue);
  const q = parseFloat(qValue);
  const u = parseFloat(uValue);
  const i = parseFloat(iValue);
  
  if (isNaN(a)) {
    return { valid: false, a: null, q: null, u: null, i: null, error: 'A must be a valid number' };
  }
  
  if (isNaN(q)) {
    return { valid: false, a: null, q: null, u: null, i: null, error: 'Q must be a valid number' };
  }
  
  if (isNaN(u)) {
    return { valid: false, a: null, q: null, u: null, i: null, error: 'U must be a valid number' };
  }
  
  if (isNaN(i)) {
    return { valid: false, a: null, q: null, u: null, i: null, error: 'I must be a valid number' };
  }
  
  return { valid: true, a, q, u, i, error: null };
}

/**
 * Updates the result display
 * @param {number|null} result - The calculated result or null
 */
function updateResultDisplay(result) {
  const resultElement = document.getElementById('aqui-result');
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
  const aInput = document.getElementById('aqui-a');
  const qInput = document.getElementById('aqui-q');
  const uInput = document.getElementById('aqui-u');
  const iInput = document.getElementById('aqui-i');
  
  if (!aInput || !qInput || !uInput || !iInput) {
    console.error('Input elements not found');
    return;
  }
  
  const validation = validateInputs(aInput.value, qInput.value, uInput.value, iInput.value);
  
  if (!validation.valid) {
    alert(validation.error);
    return;
  }
  
  const result = calculateAQUi(validation.a, validation.q, validation.u, validation.i);
  updateResultDisplay(result);
}

/**
 * Initializes the AQUi calculator
 */
function initAQUiCalculator() {
  const calculateBtn = document.getElementById('calculate-btn');
  
  if (calculateBtn) {
    calculateBtn.addEventListener('click', handleCalculate);
  }
  
  // Allow Enter key to trigger calculation
  const aInput = document.getElementById('aqui-a');
  const qInput = document.getElementById('aqui-q');
  const uInput = document.getElementById('aqui-u');
  const iInput = document.getElementById('aqui-i');
  
  if (aInput) {
    aInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleCalculate();
    });
  }
  
  if (qInput) {
    qInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleCalculate();
    });
  }
  
  if (uInput) {
    uInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleCalculate();
    });
  }
  
  if (iInput) {
    iInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleCalculate();
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAQUiCalculator);
} else {
  initAQUiCalculator();
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculateAQUi, validateInputs, updateResultDisplay, handleCalculate };
}
