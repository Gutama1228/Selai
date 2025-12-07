import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Loading Component
 * Display loading state with spinner
 */
const Loading = ({ 
  fullScreen = false, 
  text = 'Memuat...', 
  size = 'md' 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const spinnerSize = sizes[size] || sizes.md;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        <div className="text-center">
          <Loader2 className={`${spinnerSize} text-purple-500 animate-spin mx-auto mb-4`} />
          {text && (
            <p className="text-gray-600 font-medium">{text}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center">
        <Loader2 className={`${spinnerSize} text-purple-500 animate-spin mx-auto mb-2`} />
        {text && (
          <p className="text-gray-600 text-sm">{text}</p>
        )}
      </div>
    </div>
  );
};

export default Loading;
