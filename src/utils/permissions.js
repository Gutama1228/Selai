// src/utils/permissions.js
// Permission and access control utilities

import { ADMIN_EMAILS } from './constants';

/**
 * Check if user is admin
 */
export const isAdmin = (user) => {
  if (!user || !user.email) return false;
  return ADMIN_EMAILS.includes(user.email.toLowerCase());
};

/**
 * Check if user is seller
 */
export const isSeller = (user) => {
  if (!user) return false;
  return !isAdmin(user);
};

/**
 * Check if user can access admin panel
 */
export const canAccessAdmin = (user) => {
  return isAdmin(user);
};

/**
 * Check if user can manage users
 */
export const canManageUsers = (user) => {
  return isAdmin(user);
};

/**
 * Check if user can edit content
 */
export const canEditContent = (user) => {
  return isAdmin(user);
};

/**
 * Check if user can view analytics
 */
export const canViewAnalytics = (user) => {
  return user !== null; // All authenticated users can view their own analytics
};

/**
 * Check if user can view platform analytics
 */
export const canViewPlatformAnalytics = (user) => {
  return isAdmin(user);
};

/**
 * Check if user can delete product
 */
export const canDeleteProduct = (user, product) => {
  if (!user || !product) return false;
  return user.id === product.userId || isAdmin(user);
};

/**
 * Check if user can edit product
 */
export const canEditProduct = (user, product) => {
  if (!user || !product) return false;
  return user.id === product.userId || isAdmin(user);
};

/**
 * Check if user can delete order
 */
export const canDeleteOrder = (user, order) => {
  if (!user || !order) return false;
  return user.id === order.userId || isAdmin(user);
};

/**
 * Check if user can edit order
 */
export const canEditOrder = (user, order) => {
  if (!user || !order) return false;
  return user.id === order.userId || isAdmin(user);
};

/**
 * Check if user can use AI features
 */
export const canUseAI = (user) => {
  return user !== null; // All authenticated users
};

/**
 * Check if user can export data
 */
export const canExportData = (user) => {
  return user !== null; // All authenticated users
};

/**
 * Get user permissions object
 */
export const getUserPermissions = (user) => {
  return {
    isAdmin: isAdmin(user),
    isSeller: isSeller(user),
    canAccessAdmin: canAccessAdmin(user),
    canManageUsers: canManageUsers(user),
    canEditContent: canEditContent(user),
    canViewAnalytics: canViewAnalytics(user),
    canViewPlatformAnalytics: canViewPlatformAnalytics(user),
    canUseAI: canUseAI(user),
    canExportData: canExportData(user)
  };
};

/**
 * Check if user has permission
 */
export const hasPermission = (user, permission) => {
  const permissions = getUserPermissions(user);
  return permissions[permission] || false;
};

/**
 * Require admin permission (throws error if not admin)
 */
export const requireAdmin = (user) => {
  if (!isAdmin(user)) {
    throw new Error('Admin access required');
  }
};

/**
 * Require authentication (throws error if not authenticated)
 */
export const requireAuth = (user) => {
  if (!user) {
    throw new Error('Authentication required');
  }
};

export default {
  isAdmin,
  isSeller,
  canAccessAdmin,
  canManageUsers,
  canEditContent,
  canViewAnalytics,
  canViewPlatformAnalytics,
  canDeleteProduct,
  canEditProduct,
  canDeleteOrder,
  canEditOrder,
  canUseAI,
  canExportData,
  getUserPermissions,
  hasPermission,
  requireAdmin,
  requireAuth
};
