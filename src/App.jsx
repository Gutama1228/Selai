import React, { useState, useEffect } from 'react';
import { MessageSquare, Image, TrendingUp, Users, Settings, BarChart3, ShoppingBag, Sparkles, Menu, X, Plus, Edit, Trash2, Eye, FileText, Bell, DollarSign, Package, CheckCircle, Shield, Database, Activity, Layers, Globe, LogIn, UserPlus, LogOut, Home, Zap, Target, Award, Lock, ChevronRight, Star, Clock, MapPin, CreditCard, Tag, Filter, Send } from 'lucide-react';

const SellerAIPlatform = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [products, setProducts] = useState([
    { id: 1, name: 'Sepatu Running Nike', platform: 'Shopee', price: 850000, stock: 45, sales: 245, revenue: 208250000, status: 'active', image: '📦', category: 'Fashion' },
    { id: 2, name: 'Tas Kulit Premium', platform: 'Tokopedia', price: 1200000, stock: 23, sales: 180, revenue: 216000000, status: 'active', image: '👜', category: 'Aksesoris' },
    { id: 3, name: 'Jam Tangan Smart', platform: 'Lazada', price: 950000, stock: 67, sales: 320, revenue: 304000000, status: 'active', image: '⌚', category: 'Elektronik' },
    { id: 4, name: 'Headphone Wireless', platform: 'TikTok Shop', price: 450000, stock: 12, sales: 156, revenue: 70200000, status: 'low_stock', image: '🎧', category: 'Elektronik' },
  ]);

  const [orders, setOrders] = useState([
    { id: 1, orderNo: 'ORD-001', customer: 'Budi Santoso', product: 'Sepatu Running Nike', qty: 2, total: 1700000, status: 'pending', date: '2024-12-05', platform: 'Shopee' },
    { id: 2, orderNo: 'ORD-002', customer: 'Siti Nurhaliza', product: 'Tas Kulit Premium', qty: 1, total: 1200000, status: 'processing', date: '2024-12-05', platform: 'Tokopedia' },
    { id: 3, orderNo: 'ORD-003', customer: 'Ahmad Rizki', product: 'Jam Tangan Smart', qty: 1, total: 950000, status: 'shipped', date: '2024-12-04', platform: 'Lazada' },
    { id: 4, orderNo: 'ORD-004', customer: 'Dewi Lestari', product: 'Headphone Wireless', qty: 3, total: 1350000, status: 'delivered', date: '2024-12-03', platform: 'TikTok Shop' },
  ]);

  const [allUsers, setAllUsers] = useState([
    { id: 1, name: 'Ahmad Seller', email: 'ahmad@email.com', role: 'seller', status: 'active', joined: '2024-01-15', products: 24, sales: 1250000000 },
    { id: 2, name: 'Siti Merchant', email: 'siti@email.com', role: 'seller', status: 'active', joined: '2024-02-20', products: 18, sales: 890000000 },
  ]);

  const ADMIN_EMAILS = ['admin@sellerai.com', 'owner@sellerai.com'];

  const handleLogin = (email, password) => {
    const isAdmin = ADMIN_EMAILS.includes(email.toLowerCase());
    const userData = {
      name: email.split('@')[0],
      email: email,
      role: isAdmin ? 'admin' : 'seller'
    };
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentView('app');
    setCurrentPage(isAdmin ? 'admin-dashboard' : 'dashboard');
  };

  const handleRegister = (name, email, password) => {
    const userData = {
      name: name,
      email: email,
      role: 'seller'
    };
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentView('app');
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView('landing');
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
          messages: [{ role: 'user', content: `Kamu adalah AI assistant untuk seller online shop di Indonesia. Pertanyaan: ${chatInput}` }]
        })
      });
      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.content[0].text }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Maaf, terjadi kesalahan.' }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">SellerAI Pro</h1>
              <p className="text-xs text-gray-500">AI-Powered Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentView('login')} className="px-4 py-2 text-gray-700 hover:text-purple-600 font-semibold transition flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Masuk
            </button>
            <button onClick={() => setCurrentView('register')} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition font-semibold shadow-lg">
              Daftar Gratis
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              🚀 Platform #1 untuk Seller Indonesia
            </div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Platform AI Terbaik untuk <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Seller Online Shop</span>
            </h1>
            <p className="text-xl text-gray-600">
              Tingkatkan penjualan di Shopee, Tokopedia, Lazada, dan TikTok Shop dengan teknologi AI terdepan!
            </p>
            <div className="flex items-center gap-4">
              <button onClick={() => setCurrentView('register')} className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:opacity-90 transition font-bold shadow-xl flex items-center gap-2 text-lg">
                Mulai Gratis Sekarang
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-gray-700">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" />
                <span className="font-semibold text-gray-700">1,247+ Seller</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b">
                  <Sparkles className="w-8 h-8 text-purple-500" />
                  <div>
                    <div className="font-bold text-gray-800">AI Assistant</div>
                    <div className="text-sm text-gray-500">Online 24/7</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">Bagaimana cara meningkatkan penjualan?</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">Saya rekomendasikan: Optimasi judul, gunakan hashtag trending! 🚀</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Fitur Lengkap untuk Seller</h2>
          <p className="text-xl text-gray-600">Semua yang Anda butuhkan dalam satu platform</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: MessageSquare, title: 'AI Chat', desc: 'Konsultasi 24/7', color: 'from-blue-500 to-blue-600' },
            { icon: Edit, title: 'Generator Deskripsi', desc: 'Deskripsi otomatis', color: 'from-purple-500 to-purple-600' },
            { icon: Image, title: 'AI Image', desc: 'Saran foto produk', color: 'from-pink-500 to-pink-600' },
            { icon: TrendingUp, title: 'Analisis Trend', desc: 'Prediksi pasar', color: 'from-green-500 to-green-600' },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-100">
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">Siap Meningkatkan Penjualan?</h2>
          <p className="text-xl text-white/90 mb-8">Bergabung dengan 1,247+ seller sukses!</p>
          <button onClick={() => setCurrentView('register')} className="px-12 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-50 transition font-bold shadow-xl text-lg">
            Daftar Sekarang - GRATIS!
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">© 2024 SellerAI Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );

  const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Selamat Datang!</h2>
            <p className="text-gray-600 mt-2">Masuk ke akun Anda</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              onClick={() => handleLogin(email, password)}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition font-bold shadow-lg"
            >
              Masuk
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Belum punya akun?{' '}
              <button onClick={() => setCurrentView('register')} className="text-purple-600 font-semibold hover:underline">
                Daftar
              </button>
            </p>
            <button onClick={() => setCurrentView('landing')} className="mt-4 text-gray-500 text-sm hover:text-gray-700">
              ← Kembali ke Home
            </button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Demo:</strong> Email apapun = Seller. "admin@sellerai.com" = Admin.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Daftar Sekarang</h2>
            <p className="text-gray-600 mt-2">Mulai tingkatkan penjualan!</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nama</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              onClick={() => handleRegister(name, email, password)}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition font-bold shadow-lg"
            >
              Daftar Gratis
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Sudah punya akun?{' '}
              <button onClick={() => setCurrentView('login')} className="text-purple-600 font-semibold hover:underline">
                Masuk
              </button>
            </p>
            <button onClick={() => setCurrentView('landing')} className="mt-4 text-gray-500 text-sm hover:text-gray-700">
              ← Kembali ke Home
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DashboardPage = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: ShoppingBag, label: 'Produk Terjual', value: '901', color: 'from-blue-500 to-blue-600' },
          { icon: DollarSign, label: 'Revenue', value: 'Rp 798M', color: 'from-green-500 to-green-600' },
          { icon: Package, label: 'Pesanan', value: '47', color: 'from-purple-500 to-purple-600' },
          { icon: TrendingUp, label: 'Rating', value: '4.8/5', color: 'from-orange-500 to-orange-600' },
        ].map((stat, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${stat.color} text-white p-6 rounded-xl shadow-lg`}>
            <stat.icon className="w-8 h-8 mb-4 opacity-80" />
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm opacity-90">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const AIChatPage = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">AI Chat Assistant</h1>
      <div className="bg-white rounded-xl shadow-lg h-[600px] flex flex-col">
        <div className="p-6 border-b bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-xl">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            <div>
              <div className="font-bold text-lg">AI Assistant</div>
              <div className="text-sm opacity-90">Siap membantu 24/7</div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {chatMessages.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-500" />
              <p className="text-lg font-semibold">Mulai percakapan dengan AI</p>
            </div>
          ) : (
            chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-lg shadow-md ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-white text-gray-800'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
              placeholder="Ketik pertanyaan..."
              className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isGenerating}
            />
            <button
              onClick={sendChatMessage}
              disabled={isGenerating}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition font-semibold"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductsPage = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Produk Saya</h1>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Tambah Produk
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Produk</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Platform</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Harga</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Stok</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Terjual</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{p.image}</span>
                    <span className="font-semibold">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{p.platform}</td>
                <td className="px-6 py-4">Rp {p.price.toLocaleString()}</td>
                <td className="px-6 py-4">{p.stock}</td>
                <td className="px-6 py-4">{p.sales}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Eye className="w-5 h-5" /></button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><Edit className="w-5 h-5" /></button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const OrdersPage = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Pesanan</h1>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">No. Order</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Produk</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Total</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{o.orderNo}</td>
                <td className="px-6 py-4">{o.customer}</td>
                <td className="px-6 py-4">{o.product}</td>
                <td className="px-6 py-4">Rp {o.total.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    o.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    o.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                    o.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Eye className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const AdminDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: Users, label: 'Total Users', value: '1,247', color: 'from-blue-500 to-blue-600' },
          { icon: DollarSign, label: 'Revenue', value: 'Rp 4.25M', color: 'from-green-500 to-green-600' },
          { icon: Package, label: 'Total Produk', value: '8,934', color: 'from-purple-500 to-purple-600' },
          { icon: Activity, label: 'Uptime', value: '99.9%', color: 'from-orange-500 to-orange-600' },
        ].map((stat, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${stat.color} text-white p-6 rounded-xl shadow-lg`}>
            <stat.icon className="w-8 h-8 mb-4 opacity-80" />
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm opacity-90">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const AdminUsers = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Kelola Pengguna</h1>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Nama</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Email</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Role</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{u.name}</td>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${u.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">{u.status}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><Edit className="w-5 h-5" /></button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPage = () => {
    if (user?.role === 'admin') {
      if (currentPage === 'admin-dashboard') return <AdminDashboard />;
      if (currentPage === 'admin-users') return <AdminUsers />;
    }
    if (currentPage === 'dashboard') return <DashboardPage />;
    if (currentPage === 'ai-chat') return <AIChatPage />;
    if (currentPage === 'products') return <ProductsPage />;
    if (currentPage === 'orders') return <OrdersPage />;
    return <DashboardPage />;
  };

  if (currentView === 'landing') return <LandingPage />;
  if (currentView === 'login') return <LoginPage />;
  if (currentView === 'register') return <RegisterPage />;

  const menuItems = user?.role === 'admin' ? [
    { id: 'admin-dashboard', icon: Activity, label: 'Dashboard' },
    { id: 'admin-users', icon: Users, label: 'Kelola Pengguna' },
    { id: 'admin-content', icon: FileText, label: 'Konten Website' },
  ] : [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'ai-chat', icon: MessageSquare, label: 'AI Chat' },
    { id: 'products', icon: ShoppingBag, label: 'Produk' },
    { id: 'orders', icon: Package, label: 'Pesanan' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-lg border-b sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">SellerAI Pro</h1>
                <p className="text-xs text-gray-500">{user?.role === 'admin' ? 'Admin Panel' : 'Seller Dashboard'}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-sm">
              <div className="font-semibold">{user?.name}</div>
              <div className="text-gray-500 text-xs">{user?.email}</div>
            </div>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} lg:w-64 bg-white shadow-xl transition-all overflow-hidden border-r`}>
          <div className="p-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-semibold text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default SellerAIPlatform;
