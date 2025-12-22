// src/pages/auth/TikTokCallback.jsx
// Complete TikTok Shop OAuth callback with token exchange

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const TikTokCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');
  const [message, setMessage] = useState('Memproses otorisasi...');
  const [details, setDetails] = useState('');

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    try {
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      const state = searchParams.get('state');

      console.log('📥 TikTok Callback:', { code, error, state });

      // Check for errors
      if (error) {
        throw new Error(`TikTok Error: ${error}`);
      }

      if (!code) {
        throw new Error('No authorization code received');
      }

      // Verify state (CSRF protection)
      const savedState = sessionStorage.getItem('tiktok_oauth_state');
      if (state !== savedState) {
        throw new Error('Invalid state - possible security issue');
      }

      setMessage('Menukar authorization code...');
      setDetails('Sedang berkomunikasi dengan TikTok API');

      // Exchange code for access token
      const tokenData = await exchangeCodeForToken(code);

      if (!tokenData.access_token) {
        throw new Error('Failed to get access token');
      }

      console.log('✅ Access Token Received!', {
        expires_in: tokenData.expires_in,
        token_preview: tokenData.access_token.substring(0, 20) + '...'
      });

      setMessage('Menyimpan credentials...');
      setDetails('Menyimpan ke database');

      // Save to database (simplified - in production use Supabase)
      await saveCredentials(tokenData);

      // Clean up
      sessionStorage.removeItem('tiktok_oauth_state');

      setStatus('success');
      setMessage('TikTok Shop berhasil terhubung!');
      setDetails('Akun Anda siap digunakan 🎉');

      setTimeout(() => {
        navigate('/connect');
      }, 2000);

    } catch (err) {
      console.error('❌ Callback error:', err);
      setStatus('error');
      setMessage('Gagal menghubungkan TikTok Shop');
      setDetails(err.message);
      
      setTimeout(() => {
        navigate('/connect');
      }, 3000);
    }
  };

  const exchangeCodeForToken = async (code) => {
    try {
      const appKey = import.meta.env.VITE_TIKTOK_APP_KEY || '6ii0898t7scdj';
      const appSecret = import.meta.env.VITE_TIKTOK_APP_SECRET || 'd6c3e9654c3ffd1359d98c41aaad68ddf4621466';

      console.log('🔑 Exchanging code with:', {
        appKey: appKey.substring(0, 8) + '...',
        codePreview: code.substring(0, 20) + '...'
      });

      const response = await fetch('https://open-api.tiktokglobalshop.com/api/v1/token/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          app_key: appKey,
          app_secret: appSecret,
          auth_code: code,
          grant_type: 'authorized_code'
        })
      });

      const data = await response.json();
      console.log('📡 TikTok API Response:', {
        code: data.code,
        message: data.message
      });

      if (data.code !== 0) {
        throw new Error(data.message || 'Failed to exchange token');
      }

      return data.data;

    } catch (error) {
      console.error('Exchange token error:', error);
      throw error;
    }
  };

  const saveCredentials = async (tokenData) => {
    try {
      // In production, save to Supabase marketplace_connections table
      // For now, just log it
      console.log('💾 Saving credentials:', {
        access_token: tokenData.access_token.substring(0, 20) + '...',
        refresh_token: tokenData.refresh_token ? 'present' : 'none',
        expires_in: tokenData.expires_in
      });

      // TODO: Implement Supabase save
      // const { error } = await supabase
      //   .from('marketplace_connections')
      //   .insert({
      //     user_id: user.id,
      //     platform: 'tiktok',
      //     access_token: tokenData.access_token,
      //     refresh_token: tokenData.refresh_token,
      //     expires_at: new Date(Date.now() + tokenData.expires_in * 1000),
      //     status: 'connected'
      //   });

      // Simulate save delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      return true;
    } catch (error) {
      console.error('Save credentials error:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {status === 'processing' && (
          <>
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mb-4 animate-spin flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Menghubungkan TikTok Shop
            </h2>
            <p className="text-gray-600 mb-2">{message}</p>
            <p className="text-sm text-gray-500">{details}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              {message}
            </h2>
            <p className="text-gray-600 mb-4">{details}</p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Redirecting...</span>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              {message}
            </h2>
            <p className="text-gray-600 mb-4 text-sm">{details}</p>
            <p className="text-sm text-gray-500">Redirecting back...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default TikTokCallback;
