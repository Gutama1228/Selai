import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  supabase, 
  signIn, 
  signUp, 
  signOut, 
  getCurrentUser,
  getSession,
  isAdmin as checkIsAdmin,
  onAuthStateChange
} from '../services/supabase';
import toast from 'react-hot-toast';

// Create Auth Context
const AuthContext = createContext({});

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Initialize auth state
  useEffect(() => {
    initializeAuth();
    
    // Subscribe to auth changes
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      console.log('Auth event:', event);
      handleAuthChange(session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  /**
   * Initialize authentication
   */
  const initializeAuth = async () => {
    try {
      setLoading(true);
      
      // Get current session
      const { session: currentSession } = await getSession();
      
      if (currentSession) {
        await handleAuthChange(currentSession);
      }
    } catch (error) {
      console.error('Initialize auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle auth state changes
   */
  const handleAuthChange = async (session) => {
    if (session) {
      const currentUser = session.user;
      setSession(session);
      setUser(currentUser);
      setIsAuthenticated(true);
      setIsAdmin(checkIsAdmin(currentUser));
    } else {
      setSession(null);
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
    setLoading(false);
  };

  /**
   * Login function
   */
  const login = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await signIn(email, password);
      
      if (error) {
        toast.error(error);
        return { success: false, error };
      }
      
      toast.success('Login berhasil! Selamat datang kembali 👋');
      return { success: true, data };
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Terjadi kesalahan saat login');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register function
   */
  const register = async (email, password, userData = {}) => {
    try {
      setLoading(true);
      const { data, error } = await signUp(email, password, userData);
      
      if (error) {
        toast.error(error);
        return { success: false, error };
      }
      
      toast.success('Registrasi berhasil! Silakan cek email untuk verifikasi 📧');
      return { success: true, data };
    } catch (error) {
      console.error('Register error:', error);
      toast.error('Terjadi kesalahan saat registrasi');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout function
   */
  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await signOut();
      
      if (error) {
        toast.error(error);
        return { success: false, error };
      }
      
      // Clear all state
      setUser(null);
      setSession(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      
      toast.success('Logout berhasil! Sampai jumpa lagi 👋');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Terjadi kesalahan saat logout');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Refresh user data
   */
  const refreshUser = async () => {
    try {
      const { user: currentUser } = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setIsAdmin(checkIsAdmin(currentUser));
      }
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  };

  // Context value
  const value = {
    user,
    session,
    loading,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;
