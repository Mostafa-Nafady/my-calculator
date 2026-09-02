/**
 * Basic 4-Function Calculator
 * Calculation engine for add, subtract, multiply, and divide operations.
 * Reads user input from the DOM, performs arithmetic, and renders results.
 */

// Render the Header component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderHeader === 'function') {
    renderHeader('header-container', 'The Unconventional Calculator', [
      { label: 'Home', href: '../index.html' },
      { label: 'About', href: '../about.html' },
      { label: 'Basic Calculator', href: 'index.html' },
      { label: 'XPY Calculator', href: '../xpy/index.html' }
    ]);
  }
});

/** The initial/default result value used to seed the calculator. */
const defaultResult = 0;

/** Stores the result before the current operation (used for description building). */
let initialResult;

/** The operator symbol for the current operation (`+`, `-`, `*`, `/`). */
let operatorType;

/** The running calculation result, initialized to the default result. */
let currentResult = defaultResult;

/** The current user input value (string from the input field). */
let inputUser= grtUserInput();

/** The calculation description string (e.g., "0+5"). */
let  description;

/** Array of log entry objects recording each operation. */
let logEntry = [];


/**
 * Returns the current value of the user input field.
 *
 * Note: The function name contains a typo ("grt" instead of "get").
 * The name is retained as-is to avoid breaking existing references.
 *
 * @returns {string} The current value from the `userInput` DOM element.
 */
function grtUserInput(){
  return userInput.value;
}

/**
 * Concatenates three string arguments into a single description string.
 *
 * @param {string} str1 - The first string segment (typically the initial result).
 * @param {string} str2 - The second string segment (typically the operator symbol).
 * @param {string} str3 - The third string segment (typically the user input).
 * @returns {string} The concatenated description string.
 */
function calculationDescrip(str1, str2, str3){
  const calcDescription = str1 + str2 + str3;
  return calcDescription;
}

/**
 * Renders the current calculation result and description to the DOM,
 * then logs the full log entry array to the console.
 */
function output( ){
  outputResult(currentResult, description);
  console.log(logEntry);
}

/**
 * Creates a log entry object and pushes it to the `logEntry` array,
 * then calls `output()` to render the updated result.
 *
 * @param {string} operation - The operation code: "ADD", "SUBT", "MULTI", or "DIVID".
 * @param {number} result - The calculation result to record.
 */
function writeLog (operation , result){
  let newObject={
    operation: "",
      result: 0,
      operand: 0 ,
  };
  newObject.operation= operation;
  newObject.result=result;
  newObject.operand=inputUser;
  logEntry.push(newObject);
  output( );
}


/**
 * Main dispatch function for all calculator operations.
 *
 * Reads the current user input, validates it (returns early if the parsed
 * integer is falsy), updates `currentResult` based on the operation type,
 * builds the calculation description, and calls `writeLog()`.
 *
 * Supported operation types:
 * - `"ADD"`   — Adds the input to the current result (operator `+`).
 * - `"SUBT"`  — Subtracts the input from the current result (operator `-`).
 * - `"MULTI"` — Multiplies the current result by the input (operator `*`).
 * - `"DIVID"` — Divides the current result by the input (operator `/`).
 *
 * @param {string} calculationType - The operation code: "ADD", "SUBT", "MULTI", or "DIVID".
 */
function calculation(calculationType){
  inputUser = grtUserInput();
  /* check for valid entry */
   if(!parseInt(inputUser)){
     return ;
   }
   
   initialResult=currentResult;
    /* ADD function condition */
 if (calculationType=== "ADD"){
   currentResult += parseInt(inputUser);
   operatorType="+";
 /* SUB function condition */
 }else if(calculationType=== "SUBT"){
 currentResult -= parseInt(inputUser);
 operatorType="-";
 /* MULT function condition */
 }else if(calculationType=== "MULTI"){
   currentResult *= parseInt(inputUser);
   operatorType="*";
   /* DIVID function condition */
 }else if(calculationType=== "DIVID"){
   currentResult /= parseInt(inputUser);
   operatorType="/";
 }
 
 description = calculationDescrip(initialResult , operatorType, inputUser);
 writeLog (calculationType , currentResult);
 
   }
   
/**
 * Wrapper that triggers the addition operation.
 */
function add(){
  calculation("ADD");
}

/**
 * Wrapper that triggers the subtraction operation.
 */
function subtract(){
  calculation("SUBT");
}

/**
 * Wrapper that triggers the multiplication operation.
 */
function multiplication(){
  calculation("MULTI");
}

/**
 * Wrapper that triggers the division operation.
 */
function division(){
  calculation("DIVID");
}

// Event listeners
addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiplication);
divideBtn.addEventListener('click', division); 










