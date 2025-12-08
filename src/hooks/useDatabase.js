// src/hooks/useDatabase.js
import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import * as vercelKV from '../services/vercelKV';
import toast from 'react-hot-toast';

/**
 * Custom hook for database operations
 * Wrapper around Vercel KV with loading states and error handling
 */
export const useDatabase = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Get data from KV
   */
  const get = useCallback(async (key) => {
    if (!user?.id) {
      toast.error('User not authenticated');
      return { data: null, error: 'Not authenticated' };
    }

    try {
      setLoading(true);
      setError(null);
      
      const userKey = `${user.id}:${key}`;
      const data = await vercelKV.default.get(userKey);
      
      return { data, error: null };
    } catch (err) {
      const errorMsg = err.message || 'Gagal mengambil data';
      setError(errorMsg);
      console.error('Database get error:', err);
      return { data: null, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [user]);

  /**
   * Set data to KV
   */
  const set = useCallback(async (key, value, options = {}) => {
    if (!user?.id) {
      toast.error('User not authenticated');
      return { data: null, error: 'Not authenticated' };
    }

    try {
      setLoading(true);
      setError(null);
      
      const userKey = `${user.id}:${key}`;
      await vercelKV.default.set(userKey, value, options);
      
      return { data: true, error: null };
    } catch (err) {
      const errorMsg = err.message || 'Gagal menyimpan data';
      setError(errorMsg);
      console.error('Database set error:', err);
      return { data: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [user]);

  /**
   * Delete data from KV
   */
  const del = useCallback(async (key) => {
    if (!user?.id) {
      toast.error('User not authenticated');
      return { data: null, error: 'Not authenticated' };
    }

    try {
      setLoading(true);
      setError(null);
      
      const userKey = `${user.id}:${key}`;
      await vercelKV.default.del(userKey);
      
      return { data: true, error: null };
    } catch (err) {
      const errorMsg = err.message || 'Gagal menghapus data';
      setError(errorMsg);
      console.error('Database delete error:', err);
      return { data: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [user]);

  /**
   * Get cache
   */
  const getCache = useCallback(async (key) => {
    try {
      setLoading(true);
      const { data, error: cacheError } = await vercelKV.getCache(key);
      
      if (cacheError) {
        setError(cacheError);
        return { data: null, error: cacheError };
      }
      
      return { data, error: null };
    } catch (err) {
      const errorMsg = err.message || 'Gagal mengambil cache';
      setError(errorMsg);
      return { data: null, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Set cache
   */
  const setCache = useCallback(async (key, value, ttl = 3600) => {
    try {
      setLoading(true);
      const { data, error: cacheError } = await vercelKV.setCache(key, value, ttl);
      
      if (cacheError) {
        setError(cacheError);
        return { data: false, error: cacheError };
      }
      
      return { data: true, error: null };
    } catch (err) {
      const errorMsg = err.message || 'Gagal menyimpan cache';
      setError(errorMsg);
      return { data: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clear cache
   */
  const clearCache = useCallback(async (key) => {
    try {
      setLoading(true);
      const { data, error: cacheError } = await vercelKV.deleteCache(key);
      
      if (cacheError) {
        setError(cacheError);
        return { data: false, error: cacheError };
      }
      
      return { data: true, error: null };
    } catch (err) {
      const errorMsg = err.message || 'Gagal menghapus cache';
      setError(errorMsg);
      return { data: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    get,
    set,
    del,
    getCache,
    setCache,
    clearCache
  };
};

export default useDatabase;
