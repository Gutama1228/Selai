import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

/**
 * Reusable Alert Component
 * Display important messages with different variants
 */
const Alert = ({ 
  variant = 'info',
  title,
  children,
  onClose,
  icon: CustomIcon,
  className = ''
}) => {
  
  // Variant configurations
  const variants = {
    success: {
      container: 'bg-green-50 border-green-200 text-green-800',
      icon: CheckCircle,
      iconColor: 'text-green-500',
      titleColor: 'text-green-800'
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-800',
      icon: XCircle,
      iconColor: 'text-red-500',
      titleColor: 'text-red-800'
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      icon: AlertCircle,
      iconColor: 'text-yellow-500',
      titleColor: 'text-yellow-800'
    },
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: Info,
      iconColor: 'text-blue-500',
      titleColor: 'text-blue-800'
    }
  };
  
  const config = variants[variant] || variants.info;
  const Icon = CustomIcon || config.icon;
  
  return (
    <div 
      className={`
        relative flex gap-3 p-4 rounded-lg border
        ${config.container}
        ${className}
      `}
      role="alert"
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        <Icon className={`w-5 h-5 ${config.iconColor}`} />
      </div>
      
      {/* Content */}
      <div className="flex-1">
        {title && (
          <h4 className={`font-semibold mb-1 ${config.titleColor}`}>
            {title}
          </h4>
        )}
        <div className="text-sm">
          {children}
        </div>
      </div>
      
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-current hover:opacity-70 transition-opacity"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Alert;
