// src/context/ProductContext.jsx
// Product Context using new Platform API system with smart caching

import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../services/supabase';
import { MultiPlatformAggregator } from '../services/platformAPI';
import toast from 'react-hot-toast';

const ProductContext = createContext({});

const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

export const ProductProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasShownError = useRef(false);
  const aggregator = useRef(new MultiPlatformAggregator());

  // Load products when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadProducts();
    } else {
      setProducts([]);
      hasShownError.current = false;
    }
  }, [isAuthenticated, user?.id]);

  /**
   * Get connected accounts for user
   */
  const getConnectedAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('connected_accounts')
        .select('*')
        .eq('user_id', user.id)
        .eq('sync_status', 'active');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching connected accounts:', error);
      return [];
    }
  };

  /**
   * Check cache for products
   */
  const getCachedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('dashboard_cache')
        .select('*')
        .eq('user_id', user.id)
        .eq('cache_key', 'products')
        .single();

      if (error || !data) return null;

      // Check if cache is still valid
      const expiresAt = new Date(data.expires_at);
      if (expiresAt > new Date()) {
        console.log('✅ Using cached products');
        return data.data; // Return cached products
      }

      return null; // Cache expired
    } catch (error) {
      console.error('Error getting cached products:', error);
      return null;
    }
  };

  /**
   * Save products to cache
   */
  const saveCacheProducts = async (productsData) => {
    try {
      const expiresAt = new Date(Date.now() + CACHE_DURATION).toISOString();

      await supabase
        .from('dashboard_cache')
        .upsert({
          user_id: user.id,
          cache_key: 'products',
          data: productsData,
          expires_at: expiresAt
        }, {
          onConflict: 'user_id,cache_key'
        });

      console.log('💾 Products cached for 6 hours');
    } catch (error) {
      console.error('Error caching products:', error);
    }
  };

  /**
   * Load all products from all connected platforms
   */
  const loadProducts = async (forceRefresh = false) => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);

      // 1. Check cache first (unless force refresh)
      if (!forceRefresh) {
        const cached = await getCachedProducts();
        if (cached) {
          setProducts(cached);
          setLoading(false);
          hasShownError.current = false;
          return;
        }
      }

      // 2. Get connected accounts
      const accounts = await getConnectedAccounts();

      if (accounts.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      // 3. Fetch from all platforms
      console.log(`📡 Fetching products from ${accounts.length} platforms...`);
      const results = await aggregator.current.fetchFromAllPlatforms(
        accounts,
        'products',
        user.id
      );

      // 4. Aggregate products from all platforms
      const allProducts = [];
      results.forEach(result => {
        if (result.success && result.data) {
          const platformProducts = (result.data.products || result.data.items || []).map(product => ({
            ...product,
            platform: result.platform,
            shop_name: result.shop_name,
            // Normalize field names across platforms
            id: product.id || product.item_id || product.product_id,
            name: product.name || product.title || product.item_name,
            price: product.price || product.product_price || 0,
            stock: product.stock || product.quantity || 0,
            sales: product.sales || product.sold || 0,
            status: product.status || 'active',
            image: product.image || product.image_url || product.images?.[0]
          }));
          allProducts.push(...platformProducts);
        }
      });

      setProducts(allProducts);
      hasShownError.current = false;

      // 5. Save to cache
      await saveCacheProducts(allProducts);

      console.log(`✅ Loaded ${allProducts.length} products from ${accounts.length} platforms`);

    } catch (err) {
      console.error('Load products error:', err);
      setError(err.message);

      if (!hasShownError.current) {
        console.error('Error loading products:', err);
        hasShownError.current = true;
      }

      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get products by platform
   */
  const getProductsByPlatform = (platform) => {
    return products.filter(p => p.platform === platform);
  };

  /**
   * Get products by status
   */
  const getProductsByStatus = (status) => {
    return products.filter(p => p.status === status);
  };

  /**
   * Get low stock products
   */
  const getLowStockProducts = (threshold = 10) => {
    return products.filter(p => p.stock <= threshold && p.stock > 0);
  };

  /**
   * Search products
   */
  const searchProducts = (query) => {
    if (!query) return products;

    const lowerQuery = query.toLowerCase();
    return products.filter(p =>
      (p.name?.toLowerCase() || '').includes(lowerQuery) ||
      (p.category?.toLowerCase() || '').includes(lowerQuery) ||
      (p.platform?.toLowerCase() || '').includes(lowerQuery) ||
      (p.shop_name?.toLowerCase() || '').includes(lowerQuery)
    );
  };

  /**
   * Get statistics
   */
  const getStatistics = () => {
    const byPlatform = {};
    products.forEach(p => {
      if (!byPlatform[p.platform]) {
        byPlatform[p.platform] = {
          total: 0,
          active: 0,
          lowStock: 0,
          totalValue: 0,
          totalSales: 0
        };
      }
      byPlatform[p.platform].total++;
      if (p.status === 'active') byPlatform[p.platform].active++;
      if (p.stock <= 10) byPlatform[p.platform].lowStock++;
      byPlatform[p.platform].totalValue += (p.price * p.stock);
      byPlatform[p.platform].totalSales += (p.sales || 0);
    });

    return {
      total: products.length,
      active: products.filter(p => p.status === 'active').length,
      inactive: products.filter(p => p.status !== 'active').length,
      lowStock: products.filter(p => p.stock <= 10).length,
      outOfStock: products.filter(p => p.stock === 0).length,
      totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
      totalSales: products.reduce((sum, p) => sum + (p.sales || 0), 0),
      byPlatform
    };
  };

  /**
   * Refresh data (force refresh from API)
   */
  const refreshProducts = async () => {
    toast.loading('Memperbarui data produk...', { id: 'refresh-products' });
    await loadProducts(true); // Force refresh
    toast.success('Data produk berhasil diperbarui!', { id: 'refresh-products' });
  };

  const value = {
    products,
    loading,
    error,
    loadProducts,
    refreshProducts,
    getProductsByPlatform,
    getProductsByStatus,
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
