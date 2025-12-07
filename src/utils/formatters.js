// src/utils/formatters.js
// Formatting utilities for currency, date, number, etc.

/**
 * Format number to Indonesian Rupiah currency
 */
export const formatCurrency = (amount, options = {}) => {
  const {
    withSymbol = true,
    withDecimal = false
  } = options;

  const formatted = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: withDecimal ? 2 : 0,
    maximumFractionDigits: withDecimal ? 2 : 0
  }).format(amount || 0);

  return withSymbol ? `Rp ${formatted}` : formatted;
};

/**
 * Format date to Indonesian locale
 */
export const formatDate = (date, format = 'long') => {
  if (!date) return '-';

  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) return '-';

  const formats = {
    short: { day: 'numeric', month: 'short', year: 'numeric' },
    long: { day: 'numeric', month: 'long', year: 'numeric' },
    full: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    datetime: { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
  };

  return dateObj.toLocaleDateString('id-ID', formats[format] || formats.long);
};

/**
 * Format relative time (e.g., "2 jam yang lalu")
 */
export const formatRelativeTime = (date) => {
  if (!date) return '-';

  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return 'Baru saja';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;
  
  return formatDate(date, 'short');
};

/**
 * Format number with thousand separator
 */
export const formatNumber = (num, decimals = 0) => {
  if (num === null || num === undefined) return '0';
  
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
};

/**
 * Format phone number to Indonesian format
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '-';
  
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format: 0812-3456-7890
  if (cleaned.length === 12) {
    return cleaned.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  
  // Format: 08123-456-789
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{5})(\d{3})(\d{3})/, '$1-$2-$3');
  }
  
  return phone;
};

/**
 * Format file size to human readable
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Format percentage
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return '0%';
  return `${formatNumber(value, decimals)}%`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Format order number
 */
export const formatOrderNumber = (orderId, prefix = 'INV') => {
  if (!orderId) return '-';
  return `${prefix}/${orderId}`;
};

/**
 * Format stock status
 */
export const formatStockStatus = (stock) => {
  if (stock === 0) return 'Habis';
  if (stock < 10) return 'Stok Rendah';
  return 'Tersedia';
};

/**
 * Format rating
 */
export const formatRating = (rating) => {
  if (!rating) return '0.0';
  return Number(rating).toFixed(1);
};

/**
 * Capitalize first letter
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Format SKU
 */
export const formatSKU = (sku) => {
  if (!sku) return '-';
  return sku.toUpperCase();
};

export default {
  formatCurrency,
  formatDate,
  formatRelativeTime,
  formatNumber,
  formatPhoneNumber,
  formatFileSize,
  formatPercentage,
  truncateText,
  formatOrderNumber,
  formatStockStatus,
  formatRating,
  capitalize,
  formatSKU
};
