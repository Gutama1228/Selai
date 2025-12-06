import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  getUserOrders, 
  getOrder, 
  addOrder, 
  updateOrderStatus, 
  deleteOrder 
} from '../services/vercelKV';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const OrderContext = createContext({});

export const OrderProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load orders when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadOrders();
    } else {
      setOrders([]);
    }
  }, [isAuthenticated, user]);

  /**
   * Load all orders for current user
   */
  const loadOrders = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await getUserOrders(user.id);
      
      if (fetchError) {
        setError(fetchError);
        toast.error('Gagal memuat pesanan');
        return;
      }
      
      setOrders(data || []);
    } catch (err) {
      console.error('Load orders error:', err);
      setError(err.message);
      toast.error('Terjadi kesalahan saat memuat pesanan');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get single order by ID
   */
  const getOrderById = async (orderId) => {
    if (!user?.id) return null;
    
    try {
      const { data, error } = await getOrder(user.id, orderId);
      
      if (error) {
        toast.error('Gagal memuat detail pesanan');
        return null;
      }
      
      return data;
    } catch (err) {
      console.error('Get order error:', err);
      toast.error('Terjadi kesalahan');
      return null;
    }
  };

  /**
   * Create new order
   */
  const createOrder = async (orderData) => {
    if (!user?.id) {
      toast.error('Silakan login terlebih dahulu');
      return { success: false };
    }
    
    try {
      setLoading(true);
      
      const { data, error } = await addOrder(user.id, orderData);
      
      if (error) {
        toast.error('Gagal menambahkan pesanan');
        return { success: false, error };
      }
      
      // Update local state
      setOrders(prev => [data, ...prev]);
      
      toast.success('Pesanan berhasil ditambahkan! 🎉');
      return { success: true, data };
    } catch (err) {
      console.error('Create order error:', err);
      toast.error('Terjadi kesalahan saat menambahkan pesanan');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update order status
   */
  const updateStatus = async (orderId, newStatus) => {
    if (!user?.id) {
      toast.error('Silakan login terlebih dahulu');
      return { success: false };
    }
    
    try {
      setLoading(true);
      
      const { data, error } = await updateOrderStatus(user.id, orderId, newStatus);
      
      if (error) {
        toast.error('Gagal mengupdate status pesanan');
        return { success: false, error };
      }
      
      // Update local state
      setOrders(prev => prev.map(o => o.id === orderId ? data : o));
      
      toast.success('Status pesanan berhasil diupdate! ✅');
      return { success: true, data };
    } catch (err) {
      console.error('Update order status error:', err);
      toast.error('Terjadi kesalahan saat mengupdate status');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete order
   */
  const removeOrder = async (orderId) => {
    if (!user?.id) {
      toast.error('Silakan login terlebih dahulu');
      return { success: false };
    }
    
    try {
      setLoading(true);
      
      const { data, error } = await deleteOrder(user.id, orderId);
      
      if (error) {
        toast.error('Gagal menghapus pesanan');
        return { success: false, error };
      }
      
      // Update local state
      setOrders(prev => prev.filter(o => o.id !== orderId));
      
      toast.success('Pesanan berhasil dihapus! 🗑️');
      return { success: true };
    } catch (err) {
      console.error('Delete order error:', err);
      toast.error('Terjadi kesalahan saat menghapus pesanan');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get orders by status
   */
  const getOrdersByStatus = (status) => {
    return orders.filter(o => o.status === status);
  };

  /**
   * Get orders by platform
   */
  const getOrdersByPlatform = (platform) => {
    return orders.filter(o => o.platform === platform);
  };

  /**
   * Get orders by date range
   */
  const getOrdersByDateRange = (startDate, endDate) => {
    return orders.filter(o => {
      const orderDate = new Date(o.createdAt || o.date);
      return orderDate >= startDate && orderDate <= endDate;
    });
  };

  /**
   * Search orders
   */
  const searchOrders = (query) => {
    const lowerQuery = query.toLowerCase();
    return orders.filter(o => 
      o.orderNo?.toLowerCase().includes(lowerQuery) ||
      o.customer?.toLowerCase().includes(lowerQuery) ||
      o.product?.toLowerCase().includes(lowerQuery) ||
      o.platform?.toLowerCase().includes(lowerQuery)
    );
  };

  /**
   * Get pending orders count
   */
  const getPendingOrdersCount = () => {
    return orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
  };

  /**
   * Get statistics
   */
  const getStatistics = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const todayOrders = orders.filter(o => new Date(o.createdAt || o.date) >= today);
    const monthOrders = orders.filter(o => new Date(o.createdAt || o.date) >= thisMonth);
    
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
      totalRevenue: orders.reduce((sum, o) => sum + (o.total || 0), 0),
      todayRevenue: todayOrders.reduce((sum, o) => sum + (o.total || 0), 0),
      monthRevenue: monthOrders.reduce((sum, o) => sum + (o.total || 0), 0),
      averageOrderValue: orders.length > 0 
        ? orders.reduce((sum, o) => sum + (o.total || 0), 0) / orders.length 
        : 0
    };
  };

  /**
   * Get revenue by platform
   */
  const getRevenueByPlatform = () => {
    const platforms = {};
    
    orders.forEach(order => {
      const platform = order.platform || 'Unknown';
      if (!platforms[platform]) {
        platforms[platform] = 0;
      }
      platforms[platform] += order.total || 0;
    });
    
    return platforms;
  };

  /**
   * Get monthly revenue data (for charts)
   */
  const getMonthlyRevenue = (months = 6) => {
    const now = new Date();
    const data = [];
    
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('id-ID', { month: 'short' });
      
      const monthOrders = orders.filter(o => {
        const orderDate = new Date(o.createdAt || o.date);
        return orderDate.getMonth() === date.getMonth() && 
               orderDate.getFullYear() === date.getFullYear();
      });
      
      const revenue = monthOrders.reduce((sum, o) => sum + (o.total || 0), 0);
      
      data.push({
        month: monthName,
        revenue: revenue,
        orders: monthOrders.length
      });
    }
    
    return data;
  };

  const value = {
    orders,
    loading,
    error,
    loadOrders,
    getOrderById,
    createOrder,
    updateStatus,
    removeOrder,
    getOrdersByStatus,
    getOrdersByPlatform,
    getOrdersByDateRange,
    searchOrders,
    getPendingOrdersCount,
    getStatistics,
    getRevenueByPlatform,
    getMonthlyRevenue
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  
  return context;
};

export default OrderContext;
