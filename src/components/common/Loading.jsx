import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Loading Component
 * Various loading styles and sizes
 */
const Loading = ({ 
  size = 'md',
  variant = 'spinner',
  text = '',
  fullScreen = false,
  overlay = false,
  color = 'purple'
}) => {
  
  // Size styles
  const sizes = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };
  
  // Color styles
  const colors = {
    purple: 'text-purple-500',
    blue: 'text-blue-500',
    green: 'text-green-500',
    red: 'text-red-500',
    gray: 'text-gray-500'
  };
  
  const spinnerSize = sizes[size] || sizes.md;
  const spinnerColor = colors[color] || colors.purple;
  
  // Spinner variant
  const SpinnerLoader = () => (
    <Loader2 className={`${spinnerSize} ${spinnerColor} animate-spin`} />
  );
  
  // Dots variant
  const DotsLoader = () => (
    <div className="flex space-x-2">
      <div className={`${spinnerSize} ${spinnerColor} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
      <div className={`${spinnerSize} ${spinnerColor} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
      <div className={`${spinnerSize} ${spinnerColor} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
    </div>
  );
  
  // Pulse variant
  const PulseLoader = () => (
    <div className={`${spinnerSize} ${spinnerColor} rounded-full animate-pulse bg-current opacity-75`}></div>
  );
  
  // Select loader variant
  const LoaderComponent = () => {
    switch (variant) {
      case 'dots':
        return <DotsLoader />;
      case 'pulse':
        return <PulseLoader />;
      default:
        return <SpinnerLoader />;
    }
  };
  
  // Container content
  const LoaderContent = () => (
    <div className="flex flex-col items-center justify-center gap-3">
      <LoaderComponent />
      {text && (
        <p className="text-sm font-medium text-gray-600 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
  
  // Full screen loading
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <LoaderContent />
      </div>
    );
  }
  
  // Overlay loading
  if (overlay) {
    return (
      <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <LoaderContent />
      </div>
    );
  }
  
  // Inline loading
  return <LoaderContent />;
};

/**
 * Loading Skeleton Component
 * For content placeholders
 */
export const Skeleton = ({ 
  width = 'w-full',
  height = 'h-4',
  variant = 'text',
  className = ''
}) => {
  const variants = {
    text: 'rounded',
    circle: 'rounded-full',
    rectangular: 'rounded-lg'
  };
  
  return (
    <div 
      className={`
        ${width} ${height} 
        ${variants[variant] || variants.text}
        bg-gray-200 animate-pulse
        ${className}
      `}
    />
  );
};

/**
 * Loading Spinner Button
 * For buttons with loading state
 */
export const ButtonSpinner = ({ size = 'sm' }) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  
  return (
    <svg 
      className={`animate-spin ${sizes[size] || sizes.sm}`}
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export default Loading;
