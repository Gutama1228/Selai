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
 * Reset password - Send reset email
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

// Alias for compatibility with ForgotPassword.jsx and other components
export const resetPasswordForEmail = resetPassword;

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

/**
 * Update user profile (combines metadata and database profile)
 * This is a convenience function used by Profile.jsx
 */
export const updateProfile = async (profileData) => {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) throw userError;
    if (!user) throw new Error('User not authenticated');

    // Update user metadata in auth
    const { error: metadataError } = await supabase.auth.updateUser({
      data: profileData
    });

    if (metadataError) throw metadataError;

    // Also update in database if user_profiles table exists
    try {
      const { error: dbError } = await supabase
        .from('user_profiles')
        .update(profileData)
        .eq('id', user.id);
      
      // Ignore error if table doesn't exist yet
      if (dbError && !dbError.message.includes('does not exist')) {
        console.warn('Database profile update warning:', dbError);
      }
    } catch (dbErr) {
      // Silently handle database errors
      console.warn('Database operation skipped:', dbErr);
    }

    return { data: { user }, error: null };
  } catch (error) {
    console.error('Update profile error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Verify OTP for email confirmation or password reset
 */
export const verifyOTP = async (email, token, type = 'email') => {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type // 'email' | 'sms' | 'signup' | 'recovery'
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Verify OTP error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Resend verification email
 */
export const resendVerificationEmail = async (email) => {
  try {
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Resend verification error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Sign in with OAuth provider (Google, GitHub, etc)
 */
export const signInWithProvider = async (provider) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Sign in with provider error:', error);
    return { data: null, error: error.message };
  }
};

// ================================
// ADMIN FUNCTIONS
// ================================

/**
 * Get all users (Admin only)
 * Fetches all authenticated users from Supabase Auth
 */
export const getAllUsers = async () => {
  try {
    // Note: This requires admin API or service role key
    // For now, we'll use a workaround by listing from user_profiles table
    // In production, you should use Supabase Admin API
    
    const { data, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      // Fallback: Try to get from database if admin API fails
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*');
      
      if (profileError) throw profileError;
      
      return { data: profileData, error: null };
    }

    return { data: data.users, error: null };
  } catch (error) {
    console.error('Get all users error:', error);
    // Return empty array instead of null to prevent crashes
    return { data: [], error: error.message };
  }
};

// ================================
// DATABASE HELPER FUNCTIONS
// ================================

/**
 * Get user profile from database
 */
export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Get user profile error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Update user profile in database
 */
export const updateUserProfile = async (userId, profileData) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(profileData)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Update user profile error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Create user profile in database
 */
export const createUserProfile = async (userId, profileData) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([{ id: userId, ...profileData }])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Create user profile error:', error);
    return { data: null, error: error.message };
  }
};

export default supabase;
