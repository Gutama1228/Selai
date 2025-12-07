import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * StatsCard Component
 * Display statistics with icon and trend
 */
const StatsCard = ({ 
  title, 
  value, 
  icon: Icon,
  trend,
  trendValue,
  color = 'purple',
  onClick
}) => {
  const colorClasses = {
    purple: 'from-purple-500 to-pink-500',
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    orange: 'from-orange-500 to-red-500',
    yellow: 'from-yellow-500 to-orange-500',
    pink: 'from-pink-500 to-rose-500'
  };

  const gradient = colorClasses[color] || colorClasses.purple;
  const clickable = onClick ? 'cursor-pointer hover:shadow-xl' : '';

  return (
    <div 
      className={`bg-gradient-to-r ${gradient} text-white rounded-xl shadow-lg p-6 transition-all ${clickable}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm opacity-90 mb-1">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
        </div>
        
        {Icon && (
          <div className="bg-white bg-opacity-20 p-3 rounded-lg">
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {trend !== undefined && (
        <div className="flex items-center gap-1 text-sm">
          {trend >= 0 ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="font-semibold">
            {Math.abs(trend)}%
          </span>
          {trendValue && (
            <span className="opacity-90 ml-1">{trendValue}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatsCard;
