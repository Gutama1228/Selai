import { format, formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { CURRENCY } from './constants';

// ==========================================
// CURRENCY FORMATTING
// ==========================================

/**
 * Format number to Indonesian Rupiah
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return 'Rp 0';
  
  return new Intl.NumberFormat(CURRENCY.LOCALE, {
    style: 'currency',
    currency: CURRENCY.CODE,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Format number with thousand separator
 */
export const formatNumber = (number) => {
  if (number === null || number === undefined) return '0';
  
  return new Intl.NumberFormat(CURRENCY.LOCALE).format(number);
};

/**
 * Shorten large numbers (1000 -> 1K, 1000000 -> 1M)
 */
export const formatCompactNumber = (number) => {
  if (number === null || number === undefined) return '0';
  
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1) + 'B';
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  }
  return number.toString();
};

// ==========================================
// DATE FORMATTING
// ==========================================

/**
 * Format date to Indonesian format
 */
export const formatDate = (date, formatString = 'dd MMMM yyyy') => {
  if (!date) return '-';
  
  try {
    return format(new Date(date), formatString, { locale: id });
  } catch (error) {
    console.error('Format date error:', error);
    return '-';
  }
};

/**
 * Format date with time
 */
export const formatDateTime = (date) => {
  if (!date) return '-';
  
  try {
    return format(new Date(date), 'dd MMM yyyy, HH:mm', { locale: id });
  } catch (error) {
    console.error('Format datetime error:', error);
    return '-';
  }
};

/**
 * Get relative time (e.g., "2 jam yang lalu")
 */
export const formatRelativeTime = (date) => {
  if (!date) return '-';
  
  try {
    return formatDistanceToNow(new Date(date), { 
      addSuffix: true, 
      locale: id 
    });
  } catch (error) {
    console.error('Format relative time error:', error);
    return '-';
  }
};

/**
 * Check if date is today
 */
export const isToday = (date) => {
  if (!date) return false;
  
  const today = new Date();
  const checkDate = new Date(date);
  
  return checkDate.getDate() === today.getDate() &&
         checkDate.getMonth() === today.getMonth() &&
         checkDate.getFullYear() === today.getFullYear();
};

/**
 * Check if date is this month
 */
export const isThisMonth = (date) => {
  if (!date) return false;
  
  const today = new Date();
  const checkDate = new Date(date);
  
  return checkDate.getMonth() === today.getMonth() &&
         checkDate.getFullYear() === today.getFullYear();
};

// ==========================================
// STRING FORMATTING
// ==========================================

/**
 * Truncate string with ellipsis
 */
export const truncate = (str, length = 50) => {
  if (!str) return '';
  if (str.length <= length) return str;
  
  return str.substring(0, length) + '...';
};

/**
 * Capitalize first letter
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Convert to title case
 */
export const toTitleCase = (str) => {
  if (!str) return '';
  
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Slugify string (for URLs)
 */
export const slugify = (str) => {
  if (!str) return '';
  
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Generate random string
 */
export const randomString = (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

// ==========================================
// VALIDATION
// ==========================================

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Indonesian)
 */
export const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
};

/**
 * Validate password strength
 */
export const validatePasswordStrength = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const strength = {
    isValid: password.length >= minLength,
    score: 0,
    feedback: []
  };
  
  if (password.length < minLength) {
    strength.feedback.push(`Minimal ${minLength} karakter`);
  } else {
    strength.score += 25;
  }
  
  if (hasUpperCase) strength.score += 25;
  else strength.feedback.push('Tambahkan huruf besar');
  
  if (hasLowerCase) strength.score += 25;
  else strength.feedback.push('Tambahkan huruf kecil');
  
  if (hasNumbers) strength.score += 15;
  else strength.feedback.push('Tambahkan angka');
  
  if (hasSpecialChar) strength.score += 10;
  else strength.feedback.push('Tambahkan karakter khusus');
  
  // Determine strength level
  if (strength.score >= 90) {
    strength.level = 'Sangat Kuat';
    strength.color = 'green';
  } else if (strength.score >= 70) {
    strength.level = 'Kuat';
    strength.color = 'blue';
  } else if (strength.score >= 50) {
    strength.level = 'Sedang';
    strength.color = 'yellow';
  } else {
    strength.level = 'Lemah';
    strength.color = 'red';
  }
  
  return strength;
};

// ==========================================
// ARRAY HELPERS
// ==========================================

/**
 * Group array by key
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

/**
 * Sort array by key
 */
export const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    if (order === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    } else {
      return a[key] < b[key] ? 1 : -1;
    }
  });
};

/**
 * Remove duplicates from array
 */
export const uniqueArray = (array, key = null) => {
  if (!key) {
    return [...new Set(array)];
  }
  
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

// ==========================================
// OBJECT HELPERS
// ==========================================

/**
 * Deep clone object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if object is empty
 */
export const isEmpty = (obj) => {
  if (obj === null || obj === undefined) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
};

/**
 * Pick specific keys from object
 */
export const pick = (obj, keys) => {
  return keys.reduce((result, key) => {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};

/**
 * Omit specific keys from object
 */
export const omit = (obj, keys) => {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
};

// ==========================================
// FILE HELPERS
// ==========================================

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Get file extension
 */
export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

/**
 * Check if file is image
 */
export const isImageFile = (filename) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const extension = getFileExtension(filename).toLowerCase();
  return imageExtensions.includes(extension);
};

// ==========================================
// URL HELPERS
// ==========================================

/**
 * Build query string from object
 */
export const buildQueryString = (params) => {
  const query = Object.keys(params)
    .filter(key => params[key] !== null && params[key] !== undefined)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
  
  return query ? `?${query}` : '';
};

/**
 * Parse query string to object
 */
export const parseQueryString = (queryString) => {
  const params = {};
  const searchParams = new URLSearchParams(queryString);
  
  for (const [key, value] of searchParams) {
    params[key] = value;
  }
  
  return params;
};

// ==========================================
// COLOR HELPERS
// ==========================================

/**
 * Generate random color
 */
export const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

/**
 * Get contrast color (black or white)
 */
export const getContrastColor = (hexColor) => {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  return brightness > 128 ? '#000000' : '#FFFFFF';
};

// ==========================================
// DEBOUNCE & THROTTLE
// ==========================================

/**
 * Debounce function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

/**
 * Throttle function
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// ==========================================
// CLIPBOARD
// ==========================================

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Copy to clipboard failed:', err);
    return false;
  }
};

// ==========================================
// EXPORT ALL
// ==========================================

export default {
  formatCurrency,
  formatNumber,
  formatCompactNumber,
  formatDate,
  formatDateTime,
  formatRelativeTime,
  isToday,
  isThisMonth,
  truncate,
  capitalize,
  toTitleCase,
  slugify,
  randomString,
  isValidEmail,
  isValidPhoneNumber,
  validatePasswordStrength,
  groupBy,
  sortBy,
  uniqueArray,
  deepClone,
  isEmpty,
  pick,
  omit,
  formatFileSize,
  getFileExtension,
  isImageFile,
  buildQueryString,
  parseQueryString,
  randomColor,
  getContrastColor,
  debounce,
  throttle,
  copyToClipboard
};
