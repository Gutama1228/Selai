import React, { useState, useEffect } from 'react';
import { ShoppingBag, Check, AlertCircle, Loader2, ExternalLink } from 'lucide-react';

const ConnectMarketplace = () => {
  const [connections, setConnections] = useState({
    tiktok: false,
    shopee: false,
    lazada: false
  });
  const [loading, setLoading] = useState({});

  const platforms = [
    {
      id: 'tiktok',
      name: 'TikTok Shop',
      icon: '⚫',
      color: 'from-gray-800 to-gray-900',
      description: 'Integrasi dengan TikTok Shop & Tokopedia',
      available: true,
      features: ['Sinkronisasi produk', 'Kelola pesanan', 'Update stok otomatis']
    },
    {
      id: 'shopee',
      name: 'Shopee',
      icon: '🟠',
      color: 'from-orange-500 to-orange-600',
      description: 'Marketplace terbesar di Indonesia',
      available: false,
      features: ['Coming soon...']
    },
    {
      id: 'lazada',
      name: 'Lazada',
      icon: '🔵',
      color: 'from-blue-500 to-blue-600',
      description: 'Regional marketplace terkemuka',
      available: false,
      features: ['Coming soon...']
    }
  ];

  const handleConnect = (platformId) => {
    if (platformId === 'tiktok') {
      connectTikTok();
    } else {
      alert(`${platformId} integration coming soon!`);
    }
  };

  const connectTikTok = () => {
    try {
      setLoading({ ...loading, tiktok: true });

      // Generate random state for CSRF protection
      const state = generateRandomState();
      sessionStorage.setItem('tiktok_oauth_state', state);

      // TikTok Shop authorization URL
      const appKey = '6ii0898t7scdj'; // Your App Key
      const redirectUri = 'https://selai.vercel.app/auth/tiktok/callback';
      
      const authUrl = `https://services.tiktokshop.com/open/authorize?` +
        `app_key=${appKey}` +
        `&state=${state}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}`;

      // Redirect to TikTok authorization
      window.location.href = authUrl;

    } catch (error) {
      console.error('Connect TikTok error:', error);
      setLoading({ ...loading, tiktok: false });
      alert('Failed to connect TikTok Shop');
    }
  };

  const generateRandomState = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };

  const handleDisconnect = (platformId) => {
    if (confirm(`Disconnect ${platformId}?`)) {
      setConnections({ ...connections, [platformId]: false });
      alert(`${platformId} disconnected successfully!`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Hubungkan Marketplace
          </h1>
          <p className="text-gray-600">
            Kelola semua toko online Anda dalam satu dashboard
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">
              Cara Menghubungkan
            </h3>
            <ol className="text-blue-800 text-sm space-y-1">
              <li>1. Klik tombol "Hubungkan" pada marketplace yang ingin disambungkan</li>
              <li>2. Login dengan akun seller marketplace Anda</li>
              <li>3. Approve akses untuk Selai Platform</li>
              <li>4. Selesai! Data Anda akan otomatis tersinkronisasi</li>
            </ol>
          </div>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => {
            const isConnected = connections[platform.id];
            const isLoading = loading[platform.id];
            
            return (
              <div
                key={platform.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-r ${platform.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{platform.icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold">{platform.name}</h3>
                        <p className="text-white/80 text-sm">{platform.description}</p>
                      </div>
                    </div>
                    {isConnected && (
                      <div className="bg-white/20 backdrop-blur px-3 py-1 rounded-full flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-medium">Terhubung</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {platform.available ? (
                    <>
                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {platform.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* Action Buttons */}
                      {isConnected ? (
                        <div className="space-y-3">
                          <button
                            onClick={() => alert('Sync feature coming soon!')}
                            className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all font-medium"
                          >
                            Sinkronkan Data
                          </button>
                          <button
                            onClick={() => handleDisconnect(platform.id)}
                            className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-medium"
                          >
                            Putuskan Koneksi
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleConnect(platform.id)}
                          disabled={isLoading}
                          className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Menghubungkan...
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-5 h-5" />
                              Hubungkan
                            </>
                          )}
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 mb-4">Segera hadir!</p>
                      <div className="inline-block px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">
                        Dalam pengembangan
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Butuh Bantuan?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                📚 Dokumentasi
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Panduan lengkap cara menghubungkan dan menggunakan integrasi marketplace
              </p>
              <a
                href="#"
                className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-2"
              >
                Baca Dokumentasi
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                💬 Support
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Tim support kami siap membantu Anda 24/7
              </p>
              <a
                href="#"
                className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-2"
              >
                Hubungi Support
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectMarketplace;
