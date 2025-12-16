// src/pages/auth/TikTokCallback.jsx
// Handle TikTok Shop OAuth callback

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../services/supabase';
import toast from 'react-hot-toast';

const TikTokCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    try {
      // 1. Get authorization code from URL params
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');

      // Check for errors from TikTok
      if (error) {
        throw new Error(`TikTok authorization failed: ${error}`);
      }

      // Check if code exists
      if (!code) {
        throw new Error('No authorization code received from TikTok');
      }

      // 2. Verify state (CSRF protection)
      const savedState = sessionStorage.getItem('tiktok_oauth_state');
      if (state !== savedState) {
        throw new Error('Invalid state parameter - possible CSRF attack');
      }

      setStatus('exchanging');

      // 3. Exchange authorization code for access token
      const accessTokenData = await exchangeCodeForToken(code);

      if (!accessTokenData.access_token) {
        throw new Error('Failed to get access token from TikTok');
      }

      setStatus('saving');

      // 4. Get shop information
      const shopInfo = await getShopInfo(accessTokenData.access_token);

      // 5. Save credentials to Supabase
      await saveCredentials({
        userId: user.id,
        platform: 'tiktok',
        accessToken: accessTokenData.access_token,
        refreshToken: accessTokenData.refresh_token,
        expiresIn: accessTokenData.expires_in,
        shopId: shopInfo.shop_id,
        shopName: shopInfo.shop_name
      });

      // 6. Clean up
      sessionStorage.removeItem('tiktok_oauth_state');

      setStatus('success');
      toast.success('TikTok Shop berhasil terhubung! 🎉');

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (err) {
      console.error('TikTok OAuth callback error:', err);
      setStatus('error');
      setError(err.message);
      toast.error('Gagal menghubungkan TikTok Shop');

      // Redirect back after 3 seconds
      setTimeout(() => {
        navigate('/settings/marketplace');
      }, 3000);
    }
  };

  /**
   * Exchange authorization code for access token
   */
  const exchangeCodeForToken = async (code) => {
    try {
      // TikTok Shop API endpoint
      const tokenUrl = 'https://open-api.tiktokglobalshop.com/api/v1/token/get';

      // Get App Key & Secret from environment variables
      const appKey = import.meta.env.VITE_TIKTOK_APP_KEY;
      const appSecret = import.meta.env.VITE_TIKTOK_APP_SECRET;

      if (!appKey || !appSecret) {
        throw new Error('TikTok API credentials not configured');
      }

      // Prepare request body
      const requestBody = {
        app_key: appKey,
        app_secret: appSecret,
        auth_code: code,
        grant_type: 'authorized_code'
      };

      // Make request to TikTok API
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      // Check if request was successful
      if (data.code !== 0) {
        throw new Error(data.message || 'Failed to exchange code for token');
      }

      return data.data;

    } catch (error) {
      console.error('Exchange code error:', error);
      throw error;
    }
  };

  /**
   * Get shop information using access token
   */
  const getShopInfo = async (accessToken) => {
    try {
      const shopInfoUrl = 'https://open-api.tiktokglobalshop.com/api/v1/shop/get_authorized_shop';

      const response = await fetch(`${shopInfoUrl}?access_token=${accessToken}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.code !== 0) {
        throw new Error(data.message || 'Failed to get shop info');
      }

      return data.data;

    } catch (error) {
      console.error('Get shop info error:', error);
      // Return empty object if fails (not critical)
      return {
        shop_id: null,
        shop_name: 'Unknown'
      };
    }
  };

  /**
   * Save credentials to Supabase
   */
  const saveCredentials = async (credentials) => {
    try {
      const { userId, platform, accessToken, refreshToken, expiresIn, shopId, shopName } = credentials;

      // Calculate expiry date
      const expiryDate = new Date();
      expiryDate.setSeconds(expiryDate.getSeconds() + expiresIn);

      // Check if credentials already exist
      const { data: existing } = await supabase
        .from('marketplace_connections')
        .select('*')
        .eq('user_id', userId)
        .eq('platform', platform)
        .single();

      if (existing) {
        // Update existing credentials
        const { error } = await supabase
          .from('marketplace_connections')
          .update({
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_at: expiryDate.toISOString(),
            shop_id: shopId,
            shop_name: shopName,
            status: 'connected',
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id);

        if (error) throw error;

      } else {
        // Insert new credentials
        const { error } = await supabase
          .from('marketplace_connections')
          .insert({
            user_id: userId,
            platform: platform,
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_at: expiryDate.toISOString(),
            shop_id: shopId,
            shop_name: shopName,
            status: 'connected'
          });

        if (error) throw error;
      }

      return true;

    } catch (error) {
      console.error('Save credentials error:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        {/* Processing State */}
        {status === 'processing' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mb-4 animate-spin flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Menghubungkan TikTok Shop
            </h2>
            <p className="text-gray-600">
              Sedang memproses otorisasi...
            </p>
          </div>
        )}

        {/* Exchanging Token State */}
        {status === 'exchanging' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mx-auto mb-4 animate-pulse"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Mendapatkan Access Token
            </h2>
            <p className="text-gray-600">
              Sedang berkomunikasi dengan TikTok API...
            </p>
          </div>
        )}

        {/* Saving State */}
        {status === 'saving' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full mx-auto mb-4 animate-bounce"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Menyimpan Kredensial
            </h2>
            <p className="text-gray-600">
              Hampir selesai...
            </p>
          </div>
        )}

        {/* Success State */}
        {status === 'success' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Berhasil Terhubung! 🎉
            </h2>
            <p className="text-gray-600 mb-4">
              TikTok Shop Anda berhasil terhubung dengan Selai
            </p>
            <p className="text-sm text-gray-500">
              Mengalihkan ke dashboard...
            </p>
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Gagal Terhubung
            </h2>
            <p className="text-gray-600 mb-4">
              {error || 'Terjadi kesalahan saat menghubungkan TikTok Shop'}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Silakan coba lagi atau hubungi support jika masalah berlanjut.
            </p>
            <button
              onClick={() => navigate('/settings/marketplace')}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Kembali ke Pengaturan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TikTokCallback;
