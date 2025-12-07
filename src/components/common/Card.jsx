import React from 'react';

/**
 * Card Component
 * Reusable card wrapper with consistent styling
 */
const Card = ({ 
  children, 
  className = '',
  padding = 'md',
  hover = false,
  onClick
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const hoverClass = hover ? 'hover:shadow-xl transition-shadow cursor-pointer' : '';
  const clickable = onClick ? 'cursor-pointer' : '';

  return (
    <div 
      className={`bg-white rounded-xl shadow-lg ${paddingClasses[padding]} ${hoverClass} ${clickable} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
