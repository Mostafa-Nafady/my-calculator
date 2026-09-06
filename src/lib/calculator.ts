/**
 * Pure TypeScript calculator utility functions.
 *
 * These functions mirror the inline logic found in the Astro calculator pages
 * (calculator.astro, xpy.astro, uyt.astro) but are extracted as standalone,
 * testable, side-effect-free utilities.
 */

/**
 * Add two numbers.
 * @param a - First operand
 * @param b - Second operand
 * @returns The sum of a and b
 */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * Subtract the second number from the first.
 * @param a - The minuend
 * @param b - The subtrahend
 * @returns The difference a - b
 */
export function subtract(a: number, b: number): number {
  return a - b;
}

/**
 * Multiply two numbers.
 * @param a - First factor
 * @param b - Second factor
 * @returns The product a * b
 */
export function multiply(a: number, b: number): number {
  return a * b;
}

/**
 * Divide the first number by the second.
 * @param a - The dividend
 * @param b - The divisor
 * @returns The quotient a / b
 * @throws {Error} When b is zero (division by zero)
 */
export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

/**
 * Raise a base to the power of an exponent (X^Y).
 * @param base - The base (X)
 * @param exponent - The exponent (Y)
 * @returns base raised to the power of exponent
 */
export function power(base: number, exponent: number): number {
  return Math.pow(base, exponent);
}

/**
 * Calculate (U * Y) / T.
 * @param u - Value U
 * @param y - Multiplier Y
 * @param t - Divisor T
 * @returns The result of (U * Y) / T
 * @throws {Error} When t is zero (division by zero)
 */
export function uytCalculate(u: number, y: number, t: number): number {
  if (t === 0) {
    throw new Error('Cannot divide by zero');
  }
  return (u * y) / t;
}

