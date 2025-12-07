// src/hooks/useOrders.js
import { useContext } from 'react';
import OrderContext from '../context/OrderContext';

/**
 * Custom hook to use orders context
 * Provides easy access to orders state and functions
 * 
 * @returns {Object} Orders context value
 * @property {Array} orders - List of all orders
 * @property {boolean} loading - Loading state
 * @property {string|null} error - Error message if any
 * @property {Function} loadOrders - Reload all orders
 * @property {Function} getOrderById - Get single order by ID
 * @property {Function} createOrder - Create new order
 * @property {Function} updateStatus - Update order status
 * @property {Function} removeOrder - Delete order
 * @property {Function} getOrdersByStatus - Filter orders by status
 * @property {Function} getOrdersByPlatform - Filter orders by platform
 * @property {Function} getOrdersByDateRange - Filter orders by date range
 * @property {Function} searchOrders - Search orders by query
 * @property {Function} getPendingOrdersCount - Get count of pending orders
 * @property {Function} getStatistics - Get orders statistics
 * @property {Function} getRevenueByPlatform - Get revenue grouped by platform
 * @property {Function} getMonthlyRevenue - Get monthly revenue data for charts
 */
export const useOrders = () => {
  const context = useContext(OrderContext);
  
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  
  return context;
};

export default useOrders;
