import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import ForgotPassword from './pages/public/ForgotPassword';

// Seller Pages
import Dashboard from './pages/seller/Dashboard';
import AIChat from './pages/seller/AIChat';
import Products from './pages/seller/Products';
import Orders from './pages/seller/Orders';
import DescriptionGenerator from './pages/seller/DescriptionGenerator';
import ImageGenerator from './pages/seller/ImageGenerator';
import Analytics from './pages/seller/Analytics';

// Layouts
import SellerLayout from './components/layout/SellerLayout';
import AdminLayout from './components/layout/AdminLayout';
import Loading from './components/common/Loading';

/**
 * Main App Component with Routing
 */
function AppContent() {
  const { user, isAuthenticated, isAdmin, loading } = useAuth();
  const [currentView, setCurrentView] = useState('landing');
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Set initial view based on auth state
  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        setCurrentView('admin');
        setCurrentPage('admin-dashboard');
      } else {
        setCurrentView('seller');
        setCurrentPage('dashboard');
      }
    } else {
      setCurrentView('landing');
    }
  }, [isAuthenticated, isAdmin]);

  // Navigation handler
  const handleNavigate = (page) => {
    setCurrentPage(page);
    
    // Auto-detect view type from page name
    if (page.startsWith('admin-')) {
      setCurrentView('admin');
    } else if (['login', 'register', 'forgot-password', 'landing'].includes(page)) {
      setCurrentView(page);
    } else {
      setCurrentView('seller');
    }
  };

  // Show loading while checking auth
  if (loading) {
    return <Loading fullScreen text="Memuat aplikasi..." />;
  }

  // Public Routes (Not Authenticated)
  if (!isAuthenticated) {
    if (currentView === 'login') {
      return (
        <LoginPage
          onNavigateToRegister={() => handleNavigate('register')}
          onNavigateToHome={() => handleNavigate('landing')}
          onNavigateToForgotPassword={() => handleNavigate('forgot-password')}
        />
      );
    }

    if (currentView === 'register') {
      return (
        <RegisterPage
          onNavigateToLogin={() => handleNavigate('login')}
          onNavigateToHome={() => handleNavigate('landing')}
        />
      );
    }

    if (currentView === 'forgot-password') {
      return (
        <ForgotPassword
          onNavigateToLogin={() => handleNavigate('login')}
        />
      );
    }

    // Default: Landing Page
    return (
      <LandingPage
        onNavigateToLogin={() => handleNavigate('login')}
        onNavigateToRegister={() => handleNavigate('register')}
      />
    );
  }

  // Admin Routes
  if (isAdmin && currentView === 'admin') {
    return (
      <AdminLayout
        currentPage={currentPage}
        onNavigate={handleNavigate}
      >
        {/* Admin Dashboard */}
        {currentPage === 'admin-dashboard' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
                <p className="text-gray-600 mt-1">Monitoring dan kelola seluruh platform</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg shadow-lg">
                <span className="text-2xl">👑</span>
                <span className="font-semibold">Admin Mode</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold mb-1">1,247</div>
                <div className="text-sm opacity-90">Total Pengguna</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold mb-1">Rp 4.25M</div>
                <div className="text-sm opacity-90">Total Revenue</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold mb-1">8,934</div>
                <div className="text-sm opacity-90">Total Produk</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold mb-1">99.9%</div>
                <div className="text-sm opacity-90">Server Uptime</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Panel Admin</h2>
              <p className="text-gray-600 mb-4">
                Anda memiliki akses penuh ke seluruh sistem. Gunakan menu di sebelah kiri untuk mengelola platform.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  ⚠️ <strong>Catatan:</strong> Halaman admin lainnya sedang dalam development. 
                  Fitur utama sudah tersedia di menu Kelola Pengguna dan Kelola Konten.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Admin Users */}
        {currentPage === 'admin-users' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Kelola Pengguna</h1>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-gray-600">Halaman kelola pengguna akan ditampilkan di sini.</p>
            </div>
          </div>
        )}

        {/* Admin Content */}
        {currentPage === 'admin-content' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Kelola Konten Website</h1>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-gray-600">Halaman kelola konten akan ditampilkan di sini.</p>
            </div>
          </div>
        )}

        {/* Other admin pages can be added here */}
      </AdminLayout>
    );
  }

  // Seller Routes (Default for authenticated non-admin users)
  return (
    <SellerLayout
      currentPage={currentPage}
      onNavigate={handleNavigate}
    >
      {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
      {currentPage === 'ai-chat' && <AIChat />}
      {currentPage === 'products' && <Products onNavigate={handleNavigate} />}
      {currentPage === 'orders' && <Orders />}
      {currentPage === 'description-generator' && <DescriptionGenerator />}
      {currentPage === 'image-generator' && <ImageGenerator />}
      {currentPage === 'analytics' && <Analytics />}
      
      {/* Settings page placeholder */}
      {currentPage === 'settings' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pengaturan</h1>
            <p className="text-gray-600 mt-1">Kelola preferensi dan akun Anda</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Informasi Akun</h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Nama</span>
                    <span className="font-semibold">{user?.user_metadata?.full_name || 'User'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Email</span>
                    <span className="font-semibold">{user?.email}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Role</span>
                    <span className="font-semibold">{isAdmin ? '👑 Admin' : '🛍️ Seller'}</span>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-sm text-gray-500">
                  💡 Halaman pengaturan lengkap sedang dalam development
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </SellerLayout>
  );
}

/**
 * Root App Component with Providers
 */
function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          <AppContent />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
