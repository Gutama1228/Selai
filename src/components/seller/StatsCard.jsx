import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * Stats Card Component
 * Display statistics with icon and trend
 */
const StatsCard = ({ 
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  color = 'blue',
  onClick
}) => {
  
  // Color variants
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    pink: 'from-pink-500 to-pink-600',
    indigo: 'from-indigo-500 to-indigo-600',
    yellow: 'from-yellow-500 to-yellow-600'
  };

  const gradientColor = colors[color] || colors.blue;
  const isPositiveTrend = trend === 'up';

  return (
    <div 
      className={`
        bg-gradient-to-br ${gradientColor}
        text-white p-6 rounded-xl shadow-lg
        transform hover:scale-105 transition-all duration-200
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        {Icon && (
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <Icon className="w-6 h-6" />
          </div>
        )}
        {subtitle && (
          <span className="text-sm opacity-80 font-medium">{subtitle}</span>
        )}
      </div>

      {/* Value */}
      <div className="mb-2">
        <div className="text-3xl font-bold mb-1">
          {value}
        </div>
        <div className="text-sm opacity-90 font-medium">
          {title}
        </div>
      </div>

      {/* Trend */}
      {(trend && trendValue) && (
        <div className="flex items-center gap-1 text-sm">
          {isPositiveTrend ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="opacity-90">
            {trendValue}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
