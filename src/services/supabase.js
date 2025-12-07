// src/services/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// AUTHENTICATION FUNCTIONS
// ==========================================

/**
 * Sign in with email and password
 */
export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Sign up with email and password
 */
export const signUp = async (email, password, userData = {}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.name || '',
          phone: userData.phone || '',
          store_name: userData.storeName || '',
          ...userData
        }
      }
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Sign out
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;

    return { error: null };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error: error.message };
  }
};

/**
 * Get current session
 */
export const getSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) throw error;

    return { session, error: null };
  } catch (error) {
    console.error('Get session error:', error);
    return { session: null, error: error.message };
  }
};

/**
 * Get current user
 */
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) throw error;

    return { user, error: null };
  } catch (error) {
    console.error('Get current user error:', error);
    return { user: null, error: error.message };
  }
};

/**
 * Update user profile
 */
export const updateProfile = async (updates) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: updates
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Update profile error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Update user email
 */
export const updateEmail = async (newEmail) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      email: newEmail
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Update email error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Update user password
 */
export const updatePassword = async (newPassword) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Update password error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Reset password for email
 */
export const resetPasswordForEmail = async (email) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Reset password error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Subscribe to auth state changes
 */
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
};

/**
 * Check if user is admin
 */
export const isAdmin = (user) => {
  if (!user) return false;
  
  const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [
    'admin@sellerai.com',
    'owner@sellerai.com'
  ];
  
  return adminEmails.includes(user.email?.toLowerCase());
};

/**
 * Sign in with OAuth provider
 */
export const signInWithOAuth = async (provider) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider, // 'google', 'github', etc.
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('OAuth sign in error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Verify OTP
 */
export const verifyOTP = async (email, token, type = 'email') => {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Verify OTP error:', error);
    return { data: null, error: error.message };
  }
};

// ==========================================
// ADMIN FUNCTIONS
// ==========================================

/**
 * Get all users (Admin only)
 */
export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) throw error;

    return { data: data.users, error: null };
  } catch (error) {
    console.error('Get all users error:', error);
    return { data: [], error: error.message };
  }
};

/**
 * Delete user (Admin only)
 */
export const deleteUser = async (userId) => {
  try {
    const { data, error } = await supabase.auth.admin.deleteUser(userId);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Delete user error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Update user metadata (Admin only)
 */
export const updateUserMetadata = async (userId, metadata) => {
  try {
    const { data, error } = await supabase.auth.admin.updateUserById(
      userId,
      { user_metadata: metadata }
    );

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Update user metadata error:', error);
    return { data: null, error: error.message };
  }
};

export default supabase;
