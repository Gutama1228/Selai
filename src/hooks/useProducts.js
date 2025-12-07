// src/hooks/useProducts.js
import { useContext } from 'react';
import ProductContext from '../context/ProductContext';

/**
 * Custom hook to use products context
 * Provides easy access to products state and functions
 * 
 * @returns {Object} Products context value
 * @property {Array} products - List of all products
 * @property {boolean} loading - Loading state
 * @property {string|null} error - Error message if any
 * @property {Function} loadProducts - Reload all products
 * @property {Function} getProductById - Get single product by ID
 * @property {Function} createProduct - Create new product
 * @property {Function} editProduct - Update existing product
 * @property {Function} removeProduct - Delete product
 * @property {Function} bulkUpdate - Bulk update multiple products
 * @property {Function} getProductsByStatus - Filter products by status
 * @property {Function} getProductsByPlatform - Filter products by platform
 * @property {Function} getLowStockProducts - Get products with low stock
 * @property {Function} searchProducts - Search products by query
 * @property {Function} getStatistics - Get products statistics
 */
export const useProducts = () => {
  const context = useContext(ProductContext);
  
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  
  return context;
};

export default useProducts;
