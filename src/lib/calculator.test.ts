import { describe, it, expect } from 'vitest';
import {
  add,
  subtract,
  multiply,
  divide,
  power,
  uytCalculate,
} from './calculator';

describe('add', () => {
  it('should return the sum of two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should return the sum of two negative numbers', () => {
    expect(add(-2, -3)).toBe(-5);
  });

  it('should handle adding a positive and a negative number', () => {
    expect(add(5, -3)).toBe(2);
  });

  it('should return the other number when adding zero', () => {
    expect(add(7, 0)).toBe(7);
    expect(add(0, 7)).toBe(7);
  });

  it('should return 0 when adding 0 + 0', () => {
    expect(add(0, 0)).toBe(0);
  });

  it('should handle floating point numbers', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });
});

describe('subtract', () => {
  it('should return the difference of two positive numbers', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  it('should return a negative result when the second number is larger', () => {
    expect(subtract(3, 7)).toBe(-4);
  });

  it('should handle subtracting a negative number (double negative)', () => {
    expect(subtract(5, -3)).toBe(8);
  });

  it('should return the same number when subtracting zero', () => {
    expect(subtract(9, 0)).toBe(9);
  });

  it('should return the negation when subtracting a number from zero', () => {
    expect(subtract(0, 5)).toBe(-5);
  });

  it('should return 0 when subtracting a number from itself', () => {
    expect(subtract(4, 4)).toBe(0);
  });

  it('should handle floating point numbers', () => {
    expect(subtract(0.5, 0.2)).toBeCloseTo(0.3);
  });
});

describe('multiply', () => {
  it('should return the product of two positive numbers', () => {
    expect(multiply(3, 4)).toBe(12);
  });

  it('should return the product of two negative numbers as positive', () => {
    expect(multiply(-3, -4)).toBe(12);
  });

  it('should return a negative product when one factor is negative', () => {
    expect(multiply(-3, 4)).toBe(-12);
    expect(multiply(3, -4)).toBe(-12);
  });

  it('should return 0 when multiplying by zero', () => {
    expect(multiply(7, 0)).toBe(0);
    expect(multiply(0, 7)).toBe(0);
  });

  it('should return the same number when multiplying by 1', () => {
    expect(multiply(6, 1)).toBe(6);
    expect(multiply(1, 6)).toBe(6);
  });

  it('should handle floating point numbers', () => {
    expect(multiply(0.1, 0.2)).toBeCloseTo(0.02);
  });
});

describe('divide', () => {
  it('should return the quotient of two positive numbers', () => {
    expect(divide(12, 4)).toBe(3);
  });

  it('should return the quotient of two negative numbers as positive', () => {
    expect(divide(-12, -4)).toBe(3);
  });

  it('should return a negative quotient when one operand is negative', () => {
    expect(divide(-12, 4)).toBe(-3);
    expect(divide(12, -4)).toBe(-3);
  });

  it('should return the same number when dividing by 1', () => {
    expect(divide(8, 1)).toBe(8);
  });

  it('should return 0 when dividing 0 by a non-zero number', () => {
    expect(divide(0, 5)).toBe(0);
  });

  it('should handle floating point results', () => {
    expect(divide(1, 3)).toBeCloseTo(0.3333333333333333);
  });

  it('should throw an Error when dividing by zero', () => {
    expect(() => divide(5, 0)).toThrow('Cannot divide by zero');
  });

  it('should throw an Error when dividing zero by zero', () => {
    expect(() => divide(0, 0)).toThrow('Cannot divide by zero');
  });

  it('should throw an Error when dividing a negative number by zero', () => {
    expect(() => divide(-5, 0)).toThrow('Cannot divide by zero');
  });
});

describe('power', () => {
  it('should return the base raised to a positive exponent', () => {
    expect(power(2, 3)).toBe(8);
  });

  it('should return 1 when the exponent is 0', () => {
    expect(power(5, 0)).toBe(1);
    expect(power(0, 0)).toBe(1);
  });

  it('should return the base when the exponent is 1', () => {
    expect(power(7, 1)).toBe(7);
  });

  it('should handle negative exponents (reciprocal)', () => {
    expect(power(2, -1)).toBe(0.5);
    expect(power(2, -2)).toBe(0.25);
  });

  it('should handle a negative base with an even exponent (positive result)', () => {
    expect(power(-2, 2)).toBe(4);
  });

  it('should handle a negative base with an odd exponent (negative result)', () => {
    expect(power(-2, 3)).toBe(-8);
  });

  it('should return 0 when the base is 0 and exponent is positive', () => {
    expect(power(0, 5)).toBe(0);
  });

  it('should handle fractional exponents', () => {
    expect(power(4, 0.5)).toBe(2);
  });

  it('should handle floating point base and exponent', () => {
    expect(power(2.5, 2)).toBeCloseTo(6.25);
  });
});

describe('uytCalculate', () => {
  it('should return (U * Y) / T for positive values', () => {
    expect(uytCalculate(2, 3, 4)).toBe(1.5);
  });

  it('should return (U * Y) / T for negative values', () => {
    expect(uytCalculate(-2, 3, 4)).toBe(-1.5);
    expect(uytCalculate(2, -3, 4)).toBe(-1.5);
    expect(uytCalculate(-2, -3, 4)).toBe(1.5);
  });

  it('should return 0 when U is 0', () => {
    expect(uytCalculate(0, 5, 3)).toBe(0);
  });

  it('should return 0 when Y is 0', () => {
    expect(uytCalculate(5, 0, 3)).toBe(0);
  });

  it('should handle a negative divisor T', () => {
    expect(uytCalculate(6, 2, -3)).toBe(-4);
  });

  it('should handle floating point results', () => {
    expect(uytCalculate(1, 1, 3)).toBeCloseTo(0.3333333333333333);
  });

  it('should throw an Error when T is 0', () => {
    expect(() => uytCalculate(5, 3, 0)).toThrow('Cannot divide by zero');
  });

  it('should throw an Error when T is 0 even if U or Y is 0', () => {
    expect(() => uytCalculate(0, 5, 0)).toThrow('Cannot divide by zero');
    expect(() => uytCalculate(5, 0, 0)).toThrow('Cannot divide by zero');
  });

  it('should throw an Error when all inputs are 0', () => {
    expect(() => uytCalculate(0, 0, 0)).toThrow('Cannot divide by zero');
  });
});

