import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * AnalyticsChart Component
 * Display analytics data in chart format
 */
const AnalyticsChart = ({ 
  data = [], 
  type = 'line',
  dataKey,
  xAxisKey = 'name',
  title,
  color = '#8b5cf6'
}) => {
  // Default data if empty
  const chartData = data.length > 0 ? data : [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 }
  ];

  const ChartComponent = type === 'bar' ? BarChart : LineChart;
  const DataComponent = type === 'bar' ? Bar : Line;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {title && (
        <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      )}

      <ResponsiveContainer width="100%" height={300}>
        <ChartComponent data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey={xAxisKey} 
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
          <DataComponent
            type={type === 'line' ? 'monotone' : undefined}
            dataKey={dataKey || 'value'}
            stroke={color}
            fill={color}
            strokeWidth={type === 'line' ? 2 : undefined}
            dot={type === 'line' ? { fill: color, r: 4 } : undefined}
            activeDot={type === 'line' ? { r: 6 } : undefined}
          />
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
