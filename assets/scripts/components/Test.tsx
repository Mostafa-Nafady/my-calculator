/**
 * Test Component
 * A simple reusable React component for the calculator application
 */

import React from 'react';

/**
 * Props interface for the Test component
 */
interface TestProps {
  /** The display text for the component */
  text?: string;
  /** Optional CSS class name for custom styling */
  className?: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional flag to indicate active/selected state */
  isActive?: boolean;
}

/**
 * Test Component
 * A simple reusable component that displays text with optional styling and interactivity
 * 
 * @param props - Component props
 * @param props.text - The display text (default: 'Test')
 * @param props.className - Optional CSS class name
 * @param props.onClick - Optional click handler
 * @param props.isActive - Optional active state flag
 * @returns React element
 */
const Test: React.FC<TestProps> = ({
  text = 'Test',
  className = '',
  onClick,
  isActive = false,
}) => {
  /**
   * Handle click events
   */
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  /**
   * Handle keyboard events for accessibility
   * @param event - Keyboard event
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`test-component ${className} ${isActive ? 'test-component--active' : ''}`}
      onClick={handleClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-pressed={onClick ? isActive : undefined}
    >
      <span className="test-component__text">{text}</span>
    </div>
  );
};

export default Test;

// Named exports for granular imports
export { Test };
export type { TestProps };
