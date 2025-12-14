import React, { useState } from 'react';
import { ShoppingBag, Plus, Check, AlertCircle, ExternalLink } from 'lucide-react';

const MarketplaceConnection = () => {
  const [connectedPlatforms, setConnectedPlatforms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const platforms = [
    {
      id: 'shopee',
      name: 'Shopee',
      icon: '🛍️',
      color: 'from-orange-500 to-orange-600',
      description: 'Marketplace terbesar di Indonesia',
      tutorial: 'https://open.shopee.com/',
      fields: [
        { name: 'partnerId', label: 'Partner ID', type: 'text' },
        { name: 'partnerKey', label: 'Partner Key', type: 'password' },
        { name: 'shopId', label: 'Shop ID', type: 'text' }
      ]
    },
    {
      id: 'tokopedia',
      name: 'Tokopedia',
      icon: '🟢',
      color: 'from-green-500 to-green-600',
      description: 'Platform e-commerce lokal terpercaya',
      tutorial: 'https://partner.tiktokshop.com/',
      fields: [
        { name: 'appKey', label: 'App Key', type: 'text' },
        { name: 'appSecret', label: 'App Secret', type: 'password' }
      ]
    },
    {
      id: 'lazada',
      name: 'Lazada',
      icon: '🔵',
      color: 'from-blue-500 to-blue-600',
      description: 'Regional marketplace terkemuka',
      tutorial: 'https://open.lazada.com/',
      fields: [
        { name: 'appKey', label: 'App Key', type: 'text' },
        { name: 'appSecret', label: 'App Secret', type: 'password' }
      ]
    },
    {
      id: 'tiktok',
      name: 'TikTok Shop',
      icon: '⚫',
      color: 'from-gray-800 to-gray-900',
      description: 'Social commerce terpopuler',
      tutorial: 'https://partner.tiktokshop.com/',
      fields: [
        { name: 'appKey', label: 'App Key', type: 'text' },
        { name: 'appSecret', label: 'App Secret', type: 'password' }
      ]
    }
  ];

  const [formData, setFormData] = useState({});

  const handleConnect = (platform) => {
    setSelectedPlatform(platform);
    setShowModal(true);
    setFormData({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Connecting to', selectedPlatform.name, formData);
    setConnectedPlatforms([...connectedPlatforms, selectedPlatform.id]);
    setShowModal(false);
  };

  const isConnected = (platformId) => connectedPlatforms.includes(platformId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Hubungkan Toko Online Anda
          </h1>
          <p className="text-gray-600">
            Kelola semua marketplace dalam satu dashboard dengan AI
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">
              Cara Mendapatkan API Keys
            </h3>
            <p className="text-blue-800 text-sm mb-3">
              Setiap marketplace memiliki developer portal untuk mendapatkan API keys. 
              Klik "Panduan Setup" pada setiap platform untuk instruksi lengkap.
            </p>
            <div className="flex gap-3 text-sm">
              <span className="text-blue-700">⏱️ Waktu setup: 5-15 menit per platform</span>
              <span className="text-blue-700">🔒 Data Anda aman dan terenkripsi</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platforms.map((platform) => {
            const connected = isConnected(platform.id);
            
            return (
              <div
                key={platform.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`bg-gradient-to-r ${platform.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{platform.icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold">{platform.name}</h3>
                        <p className="text-white/80 text-sm">{platform.description}</p>
                      </div>
                    </div>
                    {connected && (
                      <div className="bg-white/20 backdrop-blur px-3 py-1 rounded-full flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-medium">Terhubung</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {connected ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-green-600">
                        <Check className="w-5 h-5" />
                        <span className="font-medium">Akun berhasil terhubung</span>
                      </div>
                      <div className="flex gap-3">
                        <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                          Sinkronkan Data
                        </button>
                        <button className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                          Putuskan Koneksi
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                          Sinkronisasi produk otomatis
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                          Kelola pesanan dalam satu tempat
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                          Update stok real-time
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                          Analisis penjualan dengan AI
                        </li>
                      </ul>
                      
                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => handleConnect(platform)}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2 font-medium"
                        >
                          <Plus className="w-5 h-5" />
                          Hubungkan
                        </button>
                        <a
                          href={platform.tutorial}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Panduan
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {showModal && selectedPlatform && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{selectedPlatform.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Hubungkan {selectedPlatform.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Masukkan API credentials Anda
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {selectedPlatform.fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={formData[field.name] || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                      placeholder={`Masukkan ${field.label}`}
                    />
                  </div>
                ))}

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Catatan:</strong> Data API keys Anda akan disimpan dengan enkripsi 
                    untuk keamanan maksimal.
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium"
                  >
                    Hubungkan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceConnection;
