import React, { useState } from 'react';
import { MessageSquare, Image, TrendingUp, Users, Settings, BarChart3, ShoppingBag, Sparkles, Menu, X, Plus, Edit, Trash2, Eye, FileText, Bell, DollarSign, Package, AlertCircle, CheckCircle, Clock, Shield, Database, Activity, Layers, Globe } from 'lucide-react';

const SellerAIPlatform = () => {
  const [user, setUser] = useState({ role: 'seller', name: 'Ahmad Seller', email: 'ahmad@email.com' });
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  
  // Seller Data
  const [products, setProducts] = useState([
    { id: 1, name: 'Sepatu Running Nike', platform: 'Shopee', price: 850000, stock: 45, sales: 245, revenue: 208250000, status: 'active', image: '📦' },
    { id: 2, name: 'Tas Kulit Premium', platform: 'Tokopedia', price: 1200000, stock: 23, sales: 180, revenue: 216000000, status: 'active', image: '👜' },
    { id: 3, name: 'Jam Tangan Smart', platform: 'Lazada', price: 950000, stock: 67, sales: 320, revenue: 304000000, status: 'active', image: '⌚' },
    { id: 4, name: 'Headphone Wireless', platform: 'TikTok Shop', price: 450000, stock: 12, sales: 156, revenue: 70200000, status: 'low_stock', image: '🎧' },
  ]);

  // Admin Data
  const [allUsers, setAllUsers] = useState([
    { id: 1, name: 'Ahmad Seller', email: 'ahmad@email.com', role: 'seller', status: 'active', joined: '2024-01-15', products: 24, sales: 1250000000 },
    { id: 2, name: 'Siti Merchant', email: 'siti@email.com', role: 'seller', status: 'active', joined: '2024-02-20', products: 18, sales: 890000000 },
    { id: 3, name: 'Budi Toko', email: 'budi@email.com', role: 'seller', status: 'active', joined: '2024-03-10', products: 32, sales: 1560000000 },
    { id: 4, name: 'Rina Shop', email: 'rina@email.com', role: 'seller', status: 'suspended', joined: '2024-01-05', products: 15, sales: 450000000 },
    { id: 5, name: 'Admin User', email: 'admin@sellerai.com', role: 'admin', status: 'active', joined: '2023-12-01', products: 0, sales: 0 },
  ]);

  const [websiteContent, setWebsiteContent] = useState({
    heroTitle: 'Platform AI Terbaik untuk Seller Indonesia',
    heroDesc: 'Tingkatkan penjualan online shop Anda dengan teknologi AI terdepan',
    features: [
      { id: 1, title: 'AI Chat Assistant', desc: 'Konsultasi strategi penjualan 24/7', icon: '💬', active: true },
      { id: 2, title: 'Generator Deskripsi', desc: 'Buat deskripsi produk otomatis', icon: '✍️', active: true },
      { id: 3, title: 'Analisis Trend', desc: 'Prediksi trend pasar real-time', icon: '📊', active: true },
      { id: 4, title: 'Image Generator', desc: 'Generate gambar produk dengan AI', icon: '🎨', active: true },
    ],
    pricing: [
      { id: 1, name: 'Starter', price: 99000, features: ['10 AI Requests/hari', 'Basic Support', '1 Toko'], active: true },
      { id: 2, name: 'Professional', price: 299000, features: ['Unlimited AI Requests', 'Priority Support', '5 Toko', 'Advanced Analytics'], active: true },
      { id: 3, name: 'Enterprise', price: 999000, features: ['Unlimited Everything', '24/7 Dedicated Support', 'Unlimited Toko', 'Custom Integration'], active: true },
    ]
  });

  const [systemStats, setSystemStats] = useState({
    totalUsers: 1247,
    activeUsers: 1089,
    totalRevenue: 4250000000,
    totalProducts: 8934,
    aiRequests: 45678,
    serverUptime: 99.9,
    activeSubscriptions: 856,
    cancelledSubscriptions: 23,
  });

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'user', message: 'User baru mendaftar: Dewi Shop', time: '5 menit lalu', read: false },
    { id: 2, type: 'payment', message: 'Pembayaran berhasil dari Ahmad Seller - Rp 299.000', time: '15 menit lalu', read: false },
    { id: 3, type: 'alert', message: 'Server load mencapai 85%', time: '1 jam lalu', read: true },
    { id: 4, type: 'system', message: 'Backup database completed successfully', time: '2 jam lalu', read: true },
  ]);

  // Menu Items
  const sellerMenuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'ai-chat', icon: MessageSquare, label: 'AI Chat Assistant' },
    { id: 'description-generator', icon: Edit, label: 'Deskripsi Produk AI' },
    { id: 'image-generator', icon: Image, label: 'Generator Gambar AI' },
    { id: 'products', icon: ShoppingBag, label: 'Produk Saya' },
    { id: 'orders', icon: Package, label: 'Pesanan' },
    { id: 'analytics', icon: TrendingUp, label: 'Analisis & Trend' },
    { id: 'settings', icon: Settings, label: 'Pengaturan' },
  ];

  const adminMenuItems = [
    { id: 'admin-dashboard', icon: Activity, label: 'Dashboard Admin' },
    { id: 'admin-users', icon: Users, label: 'Kelola Pengguna' },
    { id: 'admin-content', icon: FileText, label: 'Kelola Konten Website' },
    { id: 'admin-payments', icon: DollarSign, label: 'Manajemen Pembayaran' },
    { id: 'admin-analytics', icon: BarChart3, label: 'Analytics Platform' },
    { id: 'admin-notifications', icon: Bell, label: 'Notifikasi Sistem' },
    { id: 'admin-database', icon: Database, label: 'Database Management' },
    { id: 'admin-settings', icon: Shield, label: 'Pengaturan Sistem' },
  ];

  const menuItems = user.role === 'admin' ? adminMenuItems : sellerMenuItems;

  // AI Functions
  const generateAIDescription = async (productName, platform) => {
    setIsGenerating(true);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `Buatkan deskripsi produk yang menarik untuk "${productName}" yang akan dijual di platform ${platform}. Sertakan:
1. Judul yang catchy dan SEO-friendly
2. Deskripsi detail dengan bullet points
3. Spesifikasi produk
4. Call to action yang persuasif
5. 5-10 hashtag yang relevan

Format dalam bahasa Indonesia yang persuasif dan mudah dibaca.`
          }]
        })
      });
      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      return 'Maaf, terjadi kesalahan saat generate deskripsi. Silakan coba lagi.';
    } finally {
      setIsGenerating(false);
    }
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMsg = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsGenerating(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            { role: 'user', content: `Kamu adalah AI assistant untuk seller online shop di Indonesia. Berikan saran yang actionable dan relevan. Pertanyaan: ${chatInput}` }
          ]
        })
      });
      const data = await response.json();
      const aiMsg = { role: 'assistant', content: data.content[0].text };
      setChatMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Maaf, terjadi kesalahan. Silakan coba lagi.' }]);
    } finally {
      setIsGenerating(false);
    }
  };

  // SELLER PAGES
  const DashboardPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">Selamat datang kembali, {user.name}! 👋</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">AI Powered</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition">
          <div className="flex items-center justify-between mb-4">
            <ShoppingBag className="w-10 h-10 opacity-80" />
            <span className="text-sm opacity-80">Total</span>
          </div>
          <div className="text-3xl font-bold mb-1">901</div>
          <div className="text-sm opacity-90">Produk Terjual Bulan Ini</div>
          <div className="mt-3 text-xs opacity-75">↑ 12% dari bulan lalu</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-10 h-10 opacity-80" />
            <span className="text-sm opacity-80">Revenue</span>
          </div>
          <div className="text-3xl font-bold mb-1">Rp 798.45M</div>
          <div className="text-sm opacity-90">Total Pendapatan</div>
          <div className="mt-3 text-xs opacity-75">↑ 25% dari bulan lalu</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition">
          <div className="flex items-center justify-between mb-4">
            <Package className="w-10 h-10 opacity-80" />
            <span className="text-sm opacity-80">Pesanan</span>
          </div>
          <div className="text-3xl font-bold mb-1">47</div>
          <div className="text-sm opacity-90">Menunggu Diproses</div>
          <div className="mt-3 text-xs opacity-75">Segera proses!</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-10 h-10 opacity-80" />
            <span className="text-sm opacity-80">Rating</span>
          </div>
          <div className="text-3xl font-bold mb-1">4.8/5</div>
          <div className="text-sm opacity-90">Rating Toko</div>
          <div className="mt-3 text-xs opacity-75">986 ulasan positif</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Produk Terlaris</h2>
          <div className="space-y-3">
            {products.slice(0, 4).map((product, idx) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg hover:shadow-md transition border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{product.image}</div>
                  <div>
                    <div className="font-semibold text-gray-800">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.platform}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{product.sales} terjual</div>
                  <div className="text-sm text-gray-500">Rp {(product.revenue / 1000000).toFixed(1)}M</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Fitur AI Tersedia</h2>
          <div className="space-y-3">
            {[
              { icon: MessageSquare, title: 'AI Chat Assistant', desc: 'Konsultasi strategi penjualan', page: 'ai-chat', color: 'from-blue-500 to-blue-600' },
              { icon: Edit, title: 'Deskripsi Produk AI', desc: 'Generate deskripsi otomatis', page: 'description-generator', color: 'from-purple-500 to-purple-600' },
              { icon: Image, title: 'Generator Gambar', desc: 'Buat gambar produk dengan AI', page: 'image-generator', color: 'from-pink-500 to-pink-600' },
              { icon: TrendingUp, title: 'Analisis Trend', desc: 'Prediksi trend pasar', page: 'analytics', color: 'from-green-500 to-green-600' },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg hover:shadow-md transition cursor-pointer border border-gray-100"
                   onClick={() => setCurrentPage(feature.page)}>
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} text-white rounded-lg flex items-center justify-center shadow-lg`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{feature.title}</div>
                  <div className="text-sm text-gray-500">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const AIChatPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">AI Chat Assistant</h1>
          <p className="text-gray-500 mt-1">Tanyakan apapun tentang strategi penjualan Anda</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg h-[600px] flex flex-col">
        <div className="p-6 border-b bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-xl">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            <div>
              <div className="font-bold text-lg">AI Assistant</div>
              <div className="text-sm opacity-90">Siap membantu bisnis Anda 24/7</div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {chatMessages.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-500" />
              <p className="text-lg font-semibold mb-2">Mulai percakapan dengan AI</p>
              <p className="text-sm mb-4">Tanyakan tentang:</p>
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto text-left">
                <div className="p-3 bg-white rounded-lg shadow-sm">📊 Analisis penjualan</div>
                <div className="p-3 bg-white rounded-lg shadow-sm">💡 Ide produk baru</div>
                <div className="p-3 bg-white rounded-lg shadow-sm">🎯 Strategi marketing</div>
                <div className="p-3 bg-white rounded-lg shadow-sm">📈 Optimasi harga</div>
              </div>
            </div>
          ) : (
            chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-lg shadow-md ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))
          )}
          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 p-4 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <span className="ml-2 text-sm text-gray-500">AI sedang berpikir...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-white rounded-b-xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendChatMessage()}
              placeholder="Ketik pertanyaan Anda... (Enter untuk kirim)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isGenerating}
            />
            <button
              onClick={sendChatMessage}
              disabled={isGenerating || !chatInput.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition font-semibold shadow-lg"
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const DescriptionGeneratorPage = () => {
    const [productName, setProductName] = useState('');
    const [platform, setPlatform] = useState('Shopee');
    const [generatedDesc, setGeneratedDesc] = useState('');

    const handleGenerate = async () => {
      if (!productName.trim()) return;
      const desc = await generateAIDescription(productName, platform);
      setGeneratedDesc(desc);
    };

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Generator Deskripsi Produk AI</h1>
          <p className="text-gray-500 mt-1">Buat deskripsi produk yang menarik dan SEO-friendly secara otomatis</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Edit className="w-6 h-6 text-purple-500" />
              Input Produk
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Produk *</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Contoh: Sepatu Running Nike Air Max 2024"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Platform Penjualan</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option>Shopee</option>
                  <option>Tokopedia</option>
                  <option>Lazada</option>
                  <option>TikTok Shop</option>
                  <option>Bukalapak</option>
                  <option>BliBli</option>
                </select>
              </div>
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !productName.trim()}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Deskripsi AI
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-green-500" />
              Hasil Generate
            </h2>
            {generatedDesc ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg max-h-[400px] overflow-y-auto whitespace-pre-wrap text-sm border border-gray-200">
                  {generatedDesc}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedDesc)}
                    className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold shadow-lg"
                  >
                    📋 Copy ke Clipboard
                  </button>
                  <button
                    onClick={() => setGeneratedDesc('')}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-semibold"
                  >
                    🔄 Reset
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-20">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="font-semibold mb-2">Deskripsi akan muncul di sini</p>
                <p className="text-sm">Masukkan nama produk dan klik Generate</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ProductsPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Produk Saya</h1>
          <p className="text-gray-500 mt-1">{products.length} produk terdaftar</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition font-semibold flex items-center gap-2 shadow-lg">
          <Plus className="w-5 h-5" />
          Tambah Produk Baru
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Produk</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Platform</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Harga</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Stok</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Terjual</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Revenue</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{product.image}</span>
                    <span className="font-semibold text-gray-800">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">{product.platform}</span>
                </td>
                <td className="px-6 py-4 text-gray-600 font-semibold">Rp {product.price.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`font-semibold ${product.stock < 20 ? 'text-red-600' : 'text-gray-600'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{product.sales}</td>
                <td className="px-6 py-4 text-green-600 font-bold">Rp {(product.revenue / 1000000).toFixed(1)}M</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {product.status === 'active' ? 'Aktif' : 'Stok Rendah'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ADMIN PAGES
  const AdminDashboardPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
          <p className="text-gray-500 mt-1">Monitoring dan kelola seluruh platform</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg shadow-lg">
          <Shield className="w-5 h-5" />
          <span className="font-semibold">Admin Mode</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-10 h-10 opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-1">{systemStats.totalUsers.toLocaleString()}</div>
          <div className="text-sm opacity-90">Total Pengguna</div>
          <div className="mt-2 text-xs opacity-75">{systemStats.activeUsers} aktif</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-10 h-10 opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-1">Rp {(systemStats.totalRevenue / 1000000000).toFixed(2)}M</div>
          <div className="text-sm opacity-90">Total Revenue Platform</div>
          <div className="mt-2 text-xs opacity-75">↑ 34% bulan ini</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Package className="w-10 h-10 opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-1">{systemStats.totalProducts.toLocaleString()}</div>
          <div className="text-sm opacity-90">Total Produk</div>
          <div className="mt-2 text-xs opacity-75">Di seluruh seller</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-10 h-10 opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-1">{systemStats.serverUptime}%</div>
          <div className="text-sm opacity-90">Server Uptime</div>
          <div className="mt-2 text-xs opacity-75">30 hari terakhir</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Statistik AI Usage</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div>
                <div className="font-semibold text-gray-800">Total AI Requests</div>
                <div className="text-sm text-gray-500">Bulan ini</div>
              </div>
              <div className="text-2xl font-bold text-purple-600">{systemStats.aiRequests.toLocaleString()}</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <div className="font-semibold text-gray-800">Active Subscriptions</div>
                <div className="text-sm text-gray-500">Pengguna berlangganan</div>
              </div>
              <div className="text-2xl font-bold text-blue-600">{systemStats.activeSubscriptions}</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div>
                <div className="font-semibold text-gray-800">Cancelled</div>
                <div className="text-sm text-gray-500">Bulan ini</div>
              </div>
              <div className="text-2xl font-bold text-red-600">{systemStats.cancelledSubscriptions}</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Notifikasi Terbaru</h2>
          <div className="space-y-3">
            {notifications.slice(0, 5).map((notif) => (
              <div key={notif.id} className={`p-4 rounded-lg border ${notif.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${notif.read ? 'bg-gray-400' : 'bg-blue-500'}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const AdminUsersPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Kelola Pengguna</h1>
          <p className="text-gray-500 mt-1">{allUsers.length} pengguna terdaftar</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition font-semibold flex items-center gap-2 shadow-lg">
          <Plus className="w-5 h-5" />
          Tambah User Baru
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <input
            type="text"
            placeholder="🔍 Cari pengguna..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">ID</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Nama</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Email</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Role</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Bergabung</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Produk</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Total Sales</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-mono text-sm text-gray-600">#{user.id}</td>
                <td className="px-6 py-4 font-semibold text-gray-800">{user.name}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    user.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role === 'admin' ? '👑 Admin' : '🛍️ Seller'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">{user.joined}</td>
                <td className="px-6 py-4 text-gray-600">{user.products}</td>
                <td className="px-6 py-4 text-green-600 font-bold">
                  {user.sales > 0 ? `Rp ${(user.sales / 1000000000).toFixed(2)}M` : '-'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {user.status === 'active' ? '✓ Active' : '✕ Suspended'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="View Details">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition" title="Edit User">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete User">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const AdminContentPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Kelola Konten Website</h1>
        <p className="text-gray-500 mt-1">Edit dan kelola semua konten yang tampil di website</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-500" />
            Hero Section
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Utama</label>
              <input
                type="text"
                value={websiteContent.heroTitle}
                onChange={(e) => setWebsiteContent({...websiteContent, heroTitle: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
              <textarea
                value={websiteContent.heroDesc}
                onChange={(e) => setWebsiteContent({...websiteContent, heroDesc: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold">
              💾 Simpan Perubahan
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Layers className="w-6 h-6 text-purple-500" />
            Fitur-Fitur
          </h2>
          <div className="space-y-3">
            {websiteContent.features.map((feature) => (
              <div key={feature.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{feature.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-800">{feature.title}</div>
                    <div className="text-sm text-gray-500">{feature.desc}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={feature.active} className="sr-only peer" readOnly />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition font-semibold flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Tambah Fitur Baru
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-green-500" />
            Paket Harga
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {websiteContent.pricing.map((plan) => (
              <div key={plan.id} className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 transition">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={plan.active} className="sr-only peer" readOnly />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 peer-focus:ring-4 peer-focus:ring-green-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-4">Rp {plan.price.toLocaleString()}</div>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold">
                  Edit Paket
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    if (user.role === 'seller') {
      switch (currentPage) {
        case 'dashboard': return <DashboardPage />;
        case 'ai-chat': return <AIChatPage />;
        case 'description-generator': return <DescriptionGeneratorPage />;
        case 'products': return <ProductsPage />;
        default: return <DashboardPage />;
      }
    } else {
      switch (currentPage) {
        case 'admin-dashboard': return <AdminDashboardPage />;
        case 'admin-users': return <AdminUsersPage />;
        case 'admin-content': return <AdminContentPage />;
        default: return <AdminDashboardPage />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b sticky top-0 z-50">
        <div className="max-w-full mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">SellerAI Pro</h1>
                <p className="text-xs text-gray-500">AI-Powered E-commerce Platform</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </div>
            <button
              onClick={() => {
                const newRole = user.role === 'seller' ? 'admin' : 'seller';
                setUser({...user, role: newRole});
                setCurrentPage(newRole === 'admin' ? 'admin-dashboard' : 'dashboard');
              }}
              className={`px-4 py-2 rounded-lg font-semibold transition shadow-lg ${
                user.role === 'admin' 
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:opacity-90' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90'
              }`}
            >
              {user.role === 'admin' ? '👑 Mode Admin' : '🛍️ Mode Seller'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-0'} lg:w-64 bg-white shadow-xl transition-all duration-300 overflow-hidden border-r`}>
          <div className="p-6 space-y-2">
            <div className="mb-4 pb-4 border-b">
              <div className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                user.role === 'admin' 
                  ? 'bg-red-50 text-red-700' 
                  : 'bg-blue-50 text-blue-700'
              }`}>
                {user.role === 'admin' ? '👑 Admin Panel' : '🛍️ Seller Dashboard'}
              </div>
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default SellerAIPlatform;
