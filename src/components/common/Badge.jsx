import React from 'react';

/**
 * Reusable Badge Component
 * Display status, labels, or counts
 */
const Badge = ({ 
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  pill = false,
  className = ''
}) => {
  
  // Variant styles
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-purple-100 text-purple-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    dark: 'bg-gray-800 text-white'
  };
  
  // Size styles
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };
  
  // Shape
  const shape = pill ? 'rounded-full' : 'rounded';
  
  const badgeClasses = `
    inline-flex items-center gap-1.5
    font-semibold
    ${variants[variant] || variants.default}
    ${sizes[size] || sizes.md}
    ${shape}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <span className={badgeClasses}>
      {dot && (
        <span className={`
          w-1.5 h-1.5 rounded-full
          ${variant === 'success' ? 'bg-green-500' : ''}
          ${variant === 'warning' ? 'bg-yellow-500' : ''}
          ${variant === 'danger' ? 'bg-red-500' : ''}
          ${variant === 'info' ? 'bg-blue-500' : ''}
          ${variant === 'primary' ? 'bg-purple-500' : ''}
          ${variant === 'default' ? 'bg-gray-500' : ''}
        `} />
      )}
      {children}
    </span>
  );
};

export default Badge;
