import { kv } from '@vercel/kv';

// Vercel KV is automatically configured via environment variables:
// KV_REST_API_URL and KV_REST_API_TOKEN

// ==========================================
// PRODUCTS FUNCTIONS
// ==========================================

/**
 * Get all products for a user
 */
export const getUserProducts = async (userId) => {
  try {
    const key = `products:${userId}`;
    const products = await kv.get(key);
    return { data: products || [], error: null };
  } catch (error) {
    console.error('Get products error:', error);
    return { data: [], error: error.message };
  }
};

/**
 * Get single product
 */
export const getProduct = async (userId, productId) => {
  try {
    const { data: products } = await getUserProducts(userId);
    const product = products.find(p => p.id === productId);
    return { data: product || null, error: null };
  } catch (error) {
    console.error('Get product error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Add new product
 */
export const addProduct = async (userId, product) => {
  try {
    const key = `products:${userId}`;
    const { data: products } = await getUserProducts(userId);
    
    const newProduct = {
      id: `prod_${Date.now()}`,
      ...product,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedProducts = [...products, newProduct];
    await kv.set(key, updatedProducts);
    
    return { data: newProduct, error: null };
  } catch (error) {
    console.error('Add product error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Update product
 */
export const updateProduct = async (userId, productId, updates) => {
  try {
    const key = `products:${userId}`;
    const { data: products } = await getUserProducts(userId);
    
    const updatedProducts = products.map(p => 
      p.id === productId 
        ? { ...p, ...updates, updatedAt: new Date().toISOString() }
        : p
    );
    
    await kv.set(key, updatedProducts);
    
    const updatedProduct = updatedProducts.find(p => p.id === productId);
    return { data: updatedProduct, error: null };
  } catch (error) {
    console.error('Update product error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Delete product
 */
export const deleteProduct = async (userId, productId) => {
  try {
    const key = `products:${userId}`;
    const { data: products } = await getUserProducts(userId);
    
    const updatedProducts = products.filter(p => p.id !== productId);
    await kv.set(key, updatedProducts);
    
    return { data: true, error: null };
  } catch (error) {
    console.error('Delete product error:', error);
    return { data: false, error: error.message };
  }
};

/**
 * Bulk update products
 */
export const bulkUpdateProducts = async (userId, productUpdates) => {
  try {
    const key = `products:${userId}`;
    const { data: products } = await getUserProducts(userId);
    
    const updatedProducts = products.map(product => {
      const update = productUpdates.find(u => u.id === product.id);
      return update ? { ...product, ...update, updatedAt: new Date().toISOString() } : product;
    });
    
    await kv.set(key, updatedProducts);
    return { data: updatedProducts, error: null };
  } catch (error) {
    console.error('Bulk update products error:', error);
    return { data: null, error: error.message };
  }
};

// ==========================================
// ORDERS FUNCTIONS
// ==========================================

/**
 * Get all orders for a user
 */
export const getUserOrders = async (userId) => {
  try {
    const key = `orders:${userId}`;
    const orders = await kv.get(key);
    return { data: orders || [], error: null };
  } catch (error) {
    console.error('Get orders error:', error);
    return { data: [], error: error.message };
  }
};

/**
 * Get single order
 */
export const getOrder = async (userId, orderId) => {
  try {
    const { data: orders } = await getUserOrders(userId);
    const order = orders.find(o => o.id === orderId);
    return { data: order || null, error: null };
  } catch (error) {
    console.error('Get order error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Add new order
 */
export const addOrder = async (userId, order) => {
  try {
    const key = `orders:${userId}`;
    const { data: orders } = await getUserOrders(userId);
    
    const newOrder = {
      id: `ord_${Date.now()}`,
      ...order,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedOrders = [newOrder, ...orders];
    await kv.set(key, updatedOrders);
    
    return { data: newOrder, error: null };
  } catch (error) {
    console.error('Add order error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Update order status
 */
export const updateOrderStatus = async (userId, orderId, status) => {
  try {
    const key = `orders:${userId}`;
    const { data: orders } = await getUserOrders(userId);
    
    const updatedOrders = orders.map(o => 
      o.id === orderId 
        ? { ...o, status, updatedAt: new Date().toISOString() }
        : o
    );
    
    await kv.set(key, updatedOrders);
    
    const updatedOrder = updatedOrders.find(o => o.id === orderId);
    return { data: updatedOrder, error: null };
  } catch (error) {
    console.error('Update order status error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Delete order
 */
export const deleteOrder = async (userId, orderId) => {
  try {
    const key = `orders:${userId}`;
    const { data: orders } = await getUserOrders(userId);
    
    const updatedOrders = orders.filter(o => o.id !== orderId);
    await kv.set(key, updatedOrders);
    
    return { data: true, error: null };
  } catch (error) {
    console.error('Delete order error:', error);
    return { data: false, error: error.message };
  }
};

// ==========================================
// CACHE FUNCTIONS
// ==========================================

/**
 * Set cache
 */
export const setCache = async (key, value, ttl = 3600) => {
  try {
    await kv.set(`cache:${key}`, value, { ex: ttl });
    return { data: true, error: null };
  } catch (error) {
    console.error('Set cache error:', error);
    return { data: false, error: error.message };
  }
};

/**
 * Get cache
 */
export const getCache = async (key) => {
  try {
    const value = await kv.get(`cache:${key}`);
    return { data: value, error: null };
  } catch (error) {
    console.error('Get cache error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Delete cache
 */
export const deleteCache = async (key) => {
  try {
    await kv.del(`cache:${key}`);
    return { data: true, error: null };
  } catch (error) {
    console.error('Delete cache error:', error);
    return { data: false, error: error.message };
  }
};

/**
 * Get statistics
 */
export const getStatistics = async (userId) => {
  try {
    const { data: products } = await getUserProducts(userId);
    const { data: orders } = await getUserOrders(userId);
    
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    
    const stats = {
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders,
      activeProducts: products.filter(p => p.status === 'active').length,
      lowStockProducts: products.filter(p => p.stock < 10).length
    };
    
    return { data: stats, error: null };
  } catch (error) {
    console.error('Get statistics error:', error);
    return { data: null, error: error.message };
  }
};

export default kv;
