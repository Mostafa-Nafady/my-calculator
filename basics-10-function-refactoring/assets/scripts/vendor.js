/**
 * Vendor module for the Basic 4-Function Calculator.
 * Declares DOM element references and the outputResult helper function.
 * Must be loaded before app.js.
 */

/** The number input field (`#input-number`). */
const userInput = document.getElementById('input-number');

/** The add button (`#btn-add`). */
const addBtn = document.getElementById('btn-add');

/** The subtract button (`#btn-subtract`). */
const subtractBtn = document.getElementById('btn-subtract');

/** The multiply button (`#btn-multiply`). */
const multiplyBtn = document.getElementById('btn-multiply');

/** The divide button (`#btn-divide`). */
const divideBtn = document.getElementById('btn-divide');

/** Element displaying the current result (`#current-result`). */
const currentResultOutput = document.getElementById('current-result');

/** Element displaying the calculation description (`#current-calculation`). */
const currentCalculationOutput = document.getElementById('current-calculation');

/**
 * Renders the calculation result and description to the DOM.
 * Sets `currentResultOutput.textContent` to the result value and
 * `currentCalculationOutput.textContent` to the description text.
 * @param {number|string} result - The calculation result to display.
 * @param {string} text - The calculation description text to display.
 */
function outputResult(result, text) {
  currentResultOutput.textContent = result;
  currentCalculationOutput.textContent = text;
}

