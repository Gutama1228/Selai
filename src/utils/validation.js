// src/utils/validation.js
// Form validation utilities

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Indonesian format)
 */
export const isValidPhone = (phone) => {
  // Format: 08xx-xxxx-xxxx or 08xxxxxxxxxx
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{7,10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password minimal 8 karakter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password harus mengandung huruf besar');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password harus mengandung huruf kecil');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password harus mengandung angka');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    strength: getPasswordStrength(password)
  };
};

/**
 * Get password strength
 */
export const getPasswordStrength = (password) => {
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  
  if (strength <= 1) return 'weak';
  if (strength <= 3) return 'medium';
  return 'strong';
};

/**
 * Validate required field
 */
export const isRequired = (value, fieldName = 'Field') => {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: `${fieldName} wajib diisi` };
  }
  return { isValid: true };
};

/**
 * Validate minimum length
 */
export const minLength = (value, min, fieldName = 'Field') => {
  if (value.length < min) {
    return { isValid: false, error: `${fieldName} minimal ${min} karakter` };
  }
  return { isValid: true };
};

/**
 * Validate maximum length
 */
export const maxLength = (value, max, fieldName = 'Field') => {
  if (value.length > max) {
    return { isValid: false, error: `${fieldName} maksimal ${max} karakter` };
  }
  return { isValid: true };
};

/**
 * Validate number range
 */
export const isInRange = (value, min, max, fieldName = 'Value') => {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, error: `${fieldName} harus berupa angka` };
  }
  if (num < min || num > max) {
    return { isValid: false, error: `${fieldName} harus antara ${min} dan ${max}` };
  }
  return { isValid: true };
};

/**
 * Validate URL format
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate image file
 */
export const isValidImage = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!validTypes.includes(file.type)) {
    return { isValid: false, error: 'Format file harus JPG, PNG, atau WebP' };
  }
  
  if (file.size > maxSize) {
    return { isValid: false, error: 'Ukuran file maksimal 5MB' };
  }
  
  return { isValid: true };
};

/**
 * Validate price/amount
 */
export const isValidPrice = (price) => {
  const num = Number(price);
  if (isNaN(num) || num < 0) {
    return { isValid: false, error: 'Harga harus berupa angka positif' };
  }
  return { isValid: true };
};

/**
 * Validate stock quantity
 */
export const isValidStock = (stock) => {
  const num = Number(stock);
  if (isNaN(num) || num < 0 || !Number.isInteger(num)) {
    return { isValid: false, error: 'Stok harus berupa angka bulat positif' };
  }
  return { isValid: true };
};

/**
 * Validate SKU format
 */
export const isValidSKU = (sku) => {
  // SKU format: alphanumeric, dashes, underscores
  const skuRegex = /^[A-Za-z0-9_-]+$/;
  
  if (!skuRegex.test(sku)) {
    return { isValid: false, error: 'SKU hanya boleh mengandung huruf, angka, dash, dan underscore' };
  }
  
  if (sku.length < 3 || sku.length > 50) {
    return { isValid: false, error: 'SKU harus antara 3-50 karakter' };
  }
  
  return { isValid: true };
};

/**
 * Validate form data
 */
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.entries(rules).forEach(([field, validators]) => {
    const value = data[field];
    
    for (const validator of validators) {
      const result = validator(value, field);
      if (!result.isValid) {
        errors[field] = result.error;
        break; // Stop at first error for this field
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Sanitize input (remove HTML tags)
 */
export const sanitizeInput = (input) => {
  if (!input) return '';
  return input.replace(/<[^>]*>/g, '').trim();
};

/**
 * Validate date
 */
export const isValidDate = (date) => {
  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime());
};

/**
 * Validate future date
 */
export const isFutureDate = (date) => {
  const dateObj = new Date(date);
  const now = new Date();
  return dateObj > now;
};

/**
 * Validate credit card number (Luhn algorithm)
 */
export const isValidCreditCard = (cardNumber) => {
  const digits = cardNumber.replace(/\D/g, '');
  
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }
  
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

export default {
  isValidEmail,
  isValidPhone,
  validatePassword,
  getPasswordStrength,
  isRequired,
  minLength,
  maxLength,
  isInRange,
  isValidUrl,
  isValidImage,
  isValidPrice,
  isValidStock,
  isValidSKU,
  validateForm,
  sanitizeInput,
  isValidDate,
  isFutureDate,
  isValidCreditCard
};
