import React from 'react';

/**
 * Reusable Card Component
 * Flexible container with optional header and footer
 */
const Card = ({ 
  children,
  title,
  subtitle,
  headerAction,
  footer,
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  ...props 
}) => {
  
  // Variant styles
  const variants = {
    default: 'bg-white border border-gray-200',
    gradient: 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200',
    primary: 'bg-gradient-to-br from-purple-500 to-pink-500 text-white',
    success: 'bg-gradient-to-br from-green-500 to-green-600 text-white',
    warning: 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white',
    danger: 'bg-gradient-to-br from-red-500 to-red-600 text-white',
    dark: 'bg-gray-800 text-white border border-gray-700'
  };
  
  // Padding styles
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  // Hover effect
  const hoverClass = hover ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : '';
  
  const cardClasses = `
    rounded-xl shadow-lg transition-all duration-200
    ${variants[variant] || variants.default}
    ${hoverClass}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  const bodyPadding = paddings[padding] || paddings.md;

  return (
    <div className={cardClasses} {...props}>
      {(title || subtitle || headerAction) && (
        <div className={`border-b ${variant === 'default' ? 'border-gray-200' : 'border-white/20'} ${bodyPadding}`}>
          <div className="flex items-start justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-bold">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className={`text-sm mt-1 ${variant === 'default' ? 'text-gray-500' : 'opacity-80'}`}>
                  {subtitle}
                </p>
              )}
            </div>
            {headerAction && (
              <div className="ml-4">
                {headerAction}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className={bodyPadding}>
        {children}
      </div>
      
      {footer && (
        <div className={`border-t ${variant === 'default' ? 'border-gray-200' : 'border-white/20'} ${bodyPadding}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
