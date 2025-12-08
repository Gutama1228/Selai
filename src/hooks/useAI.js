// src/hooks/useAI.js
import { useState } from 'react';
import { 
  chatWithAI, 
  generateProductDescription,
  generateImageSuggestions,
  analyzeTrends,
  optimizeProductTitle,
  suggestPricing
} from '../services/claude';
import toast from 'react-hot-toast';

/**
 * Custom hook for AI features
 * Provides easy access to AI functions with loading states
 */
export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Chat with AI Assistant
   */
  const chat = async (message, conversationHistory = []) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: chatError } = await chatWithAI(message, conversationHistory);
      
      if (chatError) {
        setError(chatError);
        toast.error('Gagal menghubungi AI');
        return { success: false, error: chatError };
      }
      
      return { success: true, data };
    } catch (err) {
      const errorMsg = err.message || 'Terjadi kesalahan';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Generate product description
   */
  const generateDescription = async (productInfo) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: genError } = await generateProductDescription(productInfo);
      
      if (genError) {
        setError(genError);
        toast.error('Gagal generate deskripsi');
        return { success: false, error: genError };
      }
      
      toast.success('Deskripsi berhasil di-generate! ✨');
      return { success: true, data };
    } catch (err) {
      const errorMsg = err.message || 'Terjadi kesalahan';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Generate image suggestions
   */
  const generateImageIdeas = async (productInfo) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: genError } = await generateImageSuggestions(productInfo);
      
      if (genError) {
        setError(genError);
        toast.error('Gagal generate saran foto');
        return { success: false, error: genError };
      }
      
      toast.success('Saran foto berhasil di-generate! 📸');
      return { success: true, data };
    } catch (err) {
      const errorMsg = err.message || 'Terjadi kesalahan';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Analyze market trends
   */
  const analyzeMarketTrends = async (category, keywords = [], platform = '') => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: analysisError } = await analyzeTrends(category, keywords, platform);
      
      if (analysisError) {
        setError(analysisError);
        toast.error('Gagal analisis trend');
        return { success: false, error: analysisError };
      }
      
      toast.success('Analisis trend berhasil! 📊');
      return { success: true, data };
    } catch (err) {
      const errorMsg = err.message || 'Terjadi kesalahan';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Optimize product title
   */
  const optimizeTitle = async (currentTitle, category, keywords = []) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: optError } = await optimizeProductTitle(currentTitle, category, keywords);
      
      if (optError) {
        setError(optError);
        toast.error('Gagal optimize judul');
        return { success: false, error: optError };
      }
      
      toast.success('Judul berhasil di-optimize! 💡');
      return { success: true, data };
    } catch (err) {
      const errorMsg = err.message || 'Terjadi kesalahan';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Suggest pricing
   */
  const getPricingSuggestion = async (productInfo, competitorPrices = []) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: priceError } = await suggestPricing(productInfo, competitorPrices);
      
      if (priceError) {
        setError(priceError);
        toast.error('Gagal mendapatkan saran harga');
        return { success: false, error: priceError };
      }
      
      toast.success('Saran harga berhasil di-generate! 💰');
      return { success: true, data };
    } catch (err) {
      const errorMsg = err.message || 'Terjadi kesalahan';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    chat,
    generateDescription,
    generateImageIdeas,
    analyzeMarketTrends,
    optimizeTitle,
    getPricingSuggestion
  };
};

export default useAI;
