import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  getUserProducts, 
  getProduct, 
  addProduct, 
  updateProduct, 
  deleteProduct,
  bulkUpdateProducts
} from '../services/vercelKV';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load products when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadProducts();
    } else {
      setProducts([]);
    }
  }, [isAuthenticated, user]);

  /**
   * Load all products for current user
   */
  const loadProducts = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await getUserProducts(user.id);
      
      if (fetchError) {
        setError(fetchError);
        toast.error('Gagal memuat produk');
        return;
      }
      
      setProducts(data || []);
    } catch (err) {
      console.error('Load products error:', err);
      setError(err.message);
      toast.error('Terjadi kesalahan saat memuat produk');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get single product by ID
   */
  const getProductById = async (productId) => {
    if (!user?.id) return null;
    
    try {
      const { data, error } = await getProduct(user.id, productId);
      
      if (error) {
        toast.error('Gagal memuat detail produk');
        return null;
      }
      
      return data;
    } catch (err) {
      console.error('Get product error:', err);
      toast.error('Terjadi kesalahan');
      return null;
    }
  };

  /**
   * Create new product
   */
  const createProduct = async (productData) => {
    if (!user?.id) {
      toast.error('Silakan login terlebih dahulu');
      return { success: false };
    }
    
    try {
      setLoading(true);
      
      const { data, error } = await addProduct(user.id, productData);
      
      if (error) {
        toast.error('Gagal menambahkan produk');
        return { success: false, error };
      }
      
      // Update local state
      setProducts(prev => [data, ...prev]);
      
      toast.success('Produk berhasil ditambahkan! 🎉');
      return { success: true, data };
    } catch (err) {
      console.error('Create product error:', err);
      toast.error('Terjadi kesalahan saat menambahkan produk');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update existing product
   */
  const editProduct = async (productId, updates) => {
    if (!user?.id) {
      toast.error('Silakan login terlebih dahulu');
      return { success: false };
    }
    
    try {
      setLoading(true);
      
      const { data, error } = await updateProduct(user.id, productId, updates);
      
      if (error) {
        toast.error('Gagal mengupdate produk');
        return { success: false, error };
      }
      
      // Update local state
      setProducts(prev => prev.map(p => p.id === productId ? data : p));
      
      toast.success('Produk berhasil diupdate! ✅');
      return { success: true, data };
    } catch (err) {
      console.error('Update product error:', err);
      toast.error('Terjadi kesalahan saat mengupdate produk');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete product
   */
  const removeProduct = async (productId) => {
    if (!user?.id) {
      toast.error('Silakan login terlebih dahulu');
      return { success: false };
    }
    
    try {
      setLoading(true);
      
      const { data, error } = await deleteProduct(user.id, productId);
      
      if (error) {
        toast.error('Gagal menghapus produk');
        return { success: false, error };
      }
      
      // Update local state
      setProducts(prev => prev.filter(p => p.id !== productId));
      
      toast.success('Produk berhasil dihapus! 🗑️');
      return { success: true };
    } catch (err) {
      console.error('Delete product error:', err);
      toast.error('Terjadi kesalahan saat menghapus produk');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Bulk update products
   */
  const bulkUpdate = async (productUpdates) => {
    if (!user?.id) {
      toast.error('Silakan login terlebih dahulu');
      return { success: false };
    }
    
    try {
      setLoading(true);
      
      const { data, error } = await bulkUpdateProducts(user.id, productUpdates);
      
      if (error) {
        toast.error('Gagal mengupdate produk');
        return { success: false, error };
      }
      
      // Update local state
      setProducts(data);
      
      toast.success(`${productUpdates.length} produk berhasil diupdate! ✅`);
      return { success: true, data };
    } catch (err) {
      console.error('Bulk update error:', err);
      toast.error('Terjadi kesalahan saat mengupdate produk');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get products by status
   */
  const getProductsByStatus = (status) => {
    return products.filter(p => p.status === status);
  };

  /**
   * Get products by platform
   */
  const getProductsByPlatform = (platform) => {
    return products.filter(p => p.platform === platform);
  };

  /**
   * Get low stock products
   */
  const getLowStockProducts = (threshold = 10) => {
    return products.filter(p => p.stock <= threshold);
  };

  /**
   * Search products
   */
  const searchProducts = (query) => {
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.category?.toLowerCase().includes(lowerQuery) ||
      p.platform?.toLowerCase().includes(lowerQuery)
    );
  };

  /**
   * Get statistics
   */
  const getStatistics = () => {
    return {
      total: products.length,
      active: products.filter(p => p.status === 'active').length,
      inactive: products.filter(p => p.status === 'inactive').length,
      lowStock: products.filter(p => p.stock <= 10).length,
      outOfStock: products.filter(p => p.stock === 0).length,
      totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
      totalSales: products.reduce((sum, p) => sum + (p.sales || 0), 0)
    };
  };

  const value = {
    products,
    loading,
    error,
    loadProducts,
    getProductById,
    createProduct,
    editProduct,
    removeProduct,
    bulkUpdate,
    getProductsByStatus,
    getProductsByPlatform,
    getLowStockProducts,
    searchProducts,
    getStatistics
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  
  return context;
};

export default ProductContext;
