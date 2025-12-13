// src/services/supabase.js
// Supabase client configuration and authentication helpers

import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test connection (optional - for debugging)
if (import.meta.env.DEV) {
  supabase
    .from('user_profiles')
    .select('count')
    .limit(1)
    .then(({ error }) => {
      if (error) {
        console.warn('⚠️ Supabase connection test failed:', error.message);
      } else {
        console.log('✅ Supabase connected successfully!');
      }
    });
}

// ================================
// AUTHENTICATION HELPER FUNCTIONS
// ================================

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
        data: userData // Additional user metadata
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
 * Sign out current user
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
 * Get current authenticated user
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
  
  // Check from user metadata
  if (user.user_metadata?.role === 'admin') return true;
  
  // Check from app metadata (set by database trigger)
  if (user.app_metadata?.role === 'admin') return true;
  
  // Check from email (temporary - for development)
  const adminEmails = ['admin@seller.com', 'gutama@admin.com'];
  if (adminEmails.includes(user.email)) return true;
  
  return false;
};

/**
 * Reset password
 */
export const resetPassword = async (email) => {
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
 * Update password
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
 * Update user metadata
 */
export const updateUserMetadata = async (metadata) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: metadata
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Update user metadata error:', error);
    return { data: null, error: error.message };
  }
};

export default supabase;
