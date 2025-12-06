import React from 'react';
import { X, ChevronRight } from 'lucide-react';

/**
 * Reusable Sidebar Component
 * Navigation sidebar with menu items
 */
const Sidebar = ({ 
  isOpen,
  onClose,
  menuItems = [],
  currentPage,
  onNavigate,
  logo,
  footer,
  className = ''
}) => {
  
  const handleItemClick = (item) => {
    if (onNavigate) {
      onNavigate(item.id);
    }
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      onClose?.();
    }
  };
  
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:sticky top-0 left-0 z-50
          h-screen w-64
          bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto
          ${className}
        `}
      >
        {/* Logo / Header */}
        {logo && (
          <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {logo}
              <button
                onClick={onClose}
                className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
        
        {/* Menu Items */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`
                  w-full flex items-center justify-between
                  px-4 py-3 rounded-lg
                  text-sm font-semibold
                  transition-all duration-200
                  group
                  ${isActive 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  {Icon && <Icon className="w-5 h-5" />}
                  <span>{item.label}</span>
                </div>
                
                {item.badge && (
                  <span className={`
                    px-2 py-0.5 rounded-full text-xs font-bold
                    ${isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-purple-100 text-purple-600'
                    }
                  `}>
                    {item.badge}
                  </span>
                )}
                
                {item.count !== undefined && (
                  <span className={`
                    px-2 py-0.5 rounded-full text-xs font-bold
                    ${isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-200 text-gray-700'
                    }
                  `}>
                    {item.count}
                  </span>
                )}
                
                <ChevronRight 
                  className={`
                    w-4 h-4 transition-transform
                    ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                  `}
                />
              </button>
            );
          })}
        </nav>
        
        {/* Footer */}
        {footer && (
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
            {footer}
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
