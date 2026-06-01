/**
 * AST12 Component
 * A reusable calculator display component for the application
 */

import React, { useEffect, useRef } from 'react';

/**
 * Props interface for the AST12 component
 */
interface AST12Props {
  /** The display value shown in the calculator display */
  displayValue?: string;
  /** Optional CSS class name for custom styling */
  className?: string;
  /** Optional label text above the display */
  label?: string;
  /** Optional flag to indicate error state */
  isError?: boolean;
  /** Optional flag to indicate loading state */
  isLoading?: boolean;
  /** Callback fired when the display value changes */
  onValueChange?: (value: string) => void;
  /** Maximum number of digits to display */
  maxDigits?: number;
}

/**
 * Creates an AST12 display element (for non-React contexts)
 * @param {string} displayValue - The value to display
 * @param {string} [label] - Optional label text
 * @returns {HTMLElement} The display element
 */
function createAST12(displayValue: string, label?: string): HTMLElement {
  const container = document.createElement('div');
  container.className = 'ast12-component';

  if (label) {
    const labelElement = document.createElement('span');
    labelElement.className = 'ast12-component__label';
    labelElement.textContent = label;
    container.appendChild(labelElement);
  }

  const displayElement = document.createElement('div');
  displayElement.className = 'ast12-component__display';
  displayElement.textContent = displayValue;
  container.appendChild(displayElement);

  return container;
}

/**
 * Renders the AST12 component into a container element
 * @param {string} containerId - The ID of the container element
 * @param {string} displayValue - The value to display
 * @param {string} [label] - Optional label text
 */
function renderAST12(containerId: string, displayValue: string, label?: string): void {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID '${containerId}' not found`);
    return;
  }

  const ast12 = createAST12(displayValue, label);
  container.appendChild(ast12);
}

/**
 * Replaces an existing AST12 element with a new one
 * @param {string} displayValue - The value to display
 * @param {string} [label] - Optional label text
 */
function replaceAST12(displayValue: string, label?: string): void {
  const existingAST12 = document.querySelector('.ast12-component');
  const ast12 = createAST12(displayValue, label);

  if (existingAST12) {
    existingAST12.replaceWith(ast12);
  } else {
    document.body.insertBefore(ast12, document.body.firstChild);
  }
}

/**
 * AST12 Component
 * A calculator display component that shows values with optional label and states
 * 
 * @param props - Component props
 * @param props.displayValue - The value to display (default: '0')
 * @param props.className - Optional CSS class name
 * @param props.label - Optional label text above the display
 * @param props.isError - Optional flag to indicate error state
 * @param props.isLoading - Optional flag to indicate loading state
 * @param props.onValueChange - Optional callback when value changes
 * @param props.maxDigits - Maximum digits to display (default: 12)
 * @returns React element
 */
const AST12: React.FC<AST12Props> = ({
  displayValue = '0',
  className = '',
  label,
  isError = false,
  isLoading = false,
  onValueChange,
  maxDigits = 12,
}) => {
  const displayRef = useRef<HTMLDivElement>(null);

  /**
   * Format the display value based on max digits
   */
  const formatValue = (value: string): string => {
    if (value.length > maxDigits) {
      // Handle overflow by truncating with indicator
      return value.slice(0, maxDigits - 1) + '…';
    }
    return value;
  };

  /**
   * Handle keyboard events for accessibility
   * @param event - Keyboard event
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // Trigger any associated action
      if (onValueChange) {
        onValueChange(displayValue);
      }
    }
  };

  /**
   * Effect to notify parent of value changes
   */
  useEffect(() => {
    if (onValueChange) {
      onValueChange(displayValue);
    }
  }, [displayValue, onValueChange]);

  /**
   * Effect to handle loading animation
   */
  useEffect(() => {
    if (isLoading && displayRef.current) {
      displayRef.current.classList.add('ast12-component__display--loading');
    } else if (displayRef.current) {
      displayRef.current.classList.remove('ast12-component__display--loading');
    }
  }, [isLoading]);

  const formattedValue = formatValue(displayValue);

  return (
    <div
      className={`ast12-component ${className}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {label && (
        <span className="ast12-component__label" aria-hidden="true">
          {label}
        </span>
      )}
      <div
        ref={displayRef}
        className={`
          ast12-component__display
          ${isError ? 'ast12-component__display--error' : ''}
          ${isLoading ? 'ast12-component__display--loading' : ''}
        `}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label={`Calculator display: ${formattedValue}`}
        aria-invalid={isError}
      >
        <span className="ast12-component__value">{formattedValue}</span>
        {isLoading && (
          <span className="ast12-component__loading-indicator" aria-hidden="true">
            ⟳
          </span>
        )}
      </div>
      {isError && (
        <span className="ast12-component__error-message" role="alert">
          Error
        </span>
      )}
    </div>
  );
};

export default AST12;

// Named exports for granular imports
export { AST12, createAST12, renderAST12, replaceAST12 };
export type { AST12Props };
