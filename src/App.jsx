// src/App.jsx
// Complete version with Protected Routes and all pages

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import { ProductProvider } from './context/ProductContext';
import { Toaster } from 'react-hot-toast';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import ForgotPassword from './pages/public/ForgotPassword';
import Pricing from './pages/public/Pricing';

// Auth Pages
import TikTokCallback from './pages/auth/TikTokCallback';

// Seller Pages
import Dashboard from './pages/seller/Dashboard';
import AIChat from './pages/seller/AIChat';
import Products from './pages/seller/Products';
import ProductAdd from './pages/seller/ProductAdd';
import ProductEdit from './pages/seller/ProductEdit';
import Orders from './pages/seller/Orders';
import OrderDetail from './pages/seller/OrderDetail';
import DescriptionGenerator from './pages/seller/DescriptionGenerator';
import ImageGenerator from './pages/seller/ImageGenerator';
import Analytics from './pages/seller/Analytics';
import TrendAnalysis from './pages/seller/TrendAnalysis';
import Profile from './pages/seller/Profile';
import Settings from './pages/seller/Settings';
import ConnectMarketplace from './pages/seller/ConnectMarketplace';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import UserDetail from './pages/admin/UserDetail';
import ContentManagement from './pages/admin/ContentManagement';
import PlatformAnalytics from './pages/admin/PlatformAnalytics';
import SubscriptionManagement from './pages/admin/SubscriptionManagement';
import PaymentManagement from './pages/admin/PaymentManagement';
import SystemSettings from './pages/admin/SystemSettings';
import AdminLogs from './pages/admin/AdminLogs';

// Layouts
import SellerLayout from './components/layout/SellerLayout';
import AdminLayout from './components/layout/AdminLayout';

/**
 * Protected Route Component
 * Redirects to login if not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

/**
 * Admin Route Component
 * Redirects to dashboard if not admin
 */
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return isAdmin ? children : <Navigate to="/seller/dashboard" replace />;
};

/**
 * Seller Pages with Layout Wrapper
 */
const SellerPages = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    navigate(`/seller/${pageId}`);
  };

  return (
    <Routes>
      <Route path="dashboard" element={
        <SellerLayout currentPage="dashboard" onNavigate={handleNavigate}>
          <Dashboard onNavigate={handleNavigate} />
        </SellerLayout>
      } />
      <Route path="ai-chat" element={
        <SellerLayout currentPage="ai-chat" onNavigate={handleNavigate}>
          <AIChat />
        </SellerLayout>
      } />
      <Route path="products" element={
        <SellerLayout currentPage="products" onNavigate={handleNavigate}>
          <Products onNavigate={handleNavigate} />
        </SellerLayout>
      } />
      <Route path="products/add" element={
        <SellerLayout currentPage="products" onNavigate={handleNavigate}>
          <ProductAdd onNavigate={handleNavigate} />
        </SellerLayout>
      } />
      <Route path="products/edit/:id" element={
        <SellerLayout currentPage="products" onNavigate={handleNavigate}>
          <ProductEdit onNavigate={handleNavigate} />
        </SellerLayout>
      } />
      <Route path="orders" element={
        <SellerLayout currentPage="orders" onNavigate={handleNavigate}>
          <Orders onNavigate={handleNavigate} />
        </SellerLayout>
      } />
      <Route path="orders/:id" element={
        <SellerLayout currentPage="orders" onNavigate={handleNavigate}>
          <OrderDetail onNavigate={handleNavigate} />
        </SellerLayout>
      } />
      <Route path="description-generator" element={
        <SellerLayout currentPage="description-generator" onNavigate={handleNavigate}>
          <DescriptionGenerator />
        </SellerLayout>
      } />
      <Route path="image-generator" element={
        <SellerLayout currentPage="image-generator" onNavigate={handleNavigate}>
          <ImageGenerator />
        </SellerLayout>
      } />
      <Route path="analytics" element={
        <SellerLayout currentPage="analytics" onNavigate={handleNavigate}>
          <Analytics />
        </SellerLayout>
      } />
      <Route path="trend-analysis" element={
        <SellerLayout currentPage="analytics" onNavigate={handleNavigate}>
          <TrendAnalysis />
        </SellerLayout>
      } />
      <Route path="profile" element={
        <SellerLayout currentPage="profile" onNavigate={handleNavigate}>
          <Profile />
        </SellerLayout>
      } />
      <Route path="settings" element={
        <SellerLayout currentPage="settings" onNavigate={handleNavigate}>
          <Settings />
        </SellerLayout>
      } />
      <Route path="connect" element={
        <SellerLayout currentPage="connect" onNavigate={handleNavigate}>
          <ConnectMarketplace />
        </SellerLayout>
      } />
      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/seller/dashboard" replace />} />
    </Routes>
  );
};

/**
 * Admin Pages with Layout Wrapper
 */
const AdminPages = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('admin-dashboard');

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    navigate(`/admin/${pageId.replace('admin-', '')}`);
  };

  return (
    <Routes>
      <Route path="dashboard" element={
        <AdminLayout currentPage="admin-dashboard" onNavigate={handleNavigate}>
          <AdminDashboard />
        </AdminLayout>
      } />
      <Route path="users" element={
        <AdminLayout currentPage="admin-users" onNavigate={handleNavigate}>
          <UserManagement />
        </AdminLayout>
      } />
      <Route path="users/:id" element={
        <AdminLayout currentPage="admin-users" onNavigate={handleNavigate}>
          <UserDetail />
        </AdminLayout>
      } />
      <Route path="content" element={
        <AdminLayout currentPage="admin-content" onNavigate={handleNavigate}>
          <ContentManagement />
        </AdminLayout>
      } />
      <Route path="analytics" element={
        <AdminLayout currentPage="admin-analytics" onNavigate={handleNavigate}>
          <PlatformAnalytics />
        </AdminLayout>
      } />
      <Route path="subscriptions" element={
        <AdminLayout currentPage="admin-subscriptions" onNavigate={handleNavigate}>
          <SubscriptionManagement />
        </AdminLayout>
      } />
      <Route path="payments" element={
        <AdminLayout currentPage="admin-payments" onNavigate={handleNavigate}>
          <PaymentManagement />
        </AdminLayout>
      } />
      <Route path="settings" element={
        <AdminLayout currentPage="admin-settings" onNavigate={handleNavigate}>
          <SystemSettings />
        </AdminLayout>
      } />
      <Route path="logs" element={
        <AdminLayout currentPage="admin-logs" onNavigate={handleNavigate}>
          <AdminLogs />
        </AdminLayout>
      } />
      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

/**
 * Public Pages Wrappers with Navigation
 */
const LandingPageWrapper = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/admin/dashboard" : "/seller/dashboard"} replace />;
  }

  return (
    <LandingPage 
      onNavigateToLogin={() => navigate('/login')}
      onNavigateToRegister={() => navigate('/register')}
    />
  );
};

const LoginPageWrapper = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/admin/dashboard" : "/seller/dashboard"} replace />;
  }

  return (
    <LoginPage 
      onNavigateToRegister={() => navigate('/register')}
      onNavigateToHome={() => navigate('/')}
      onNavigateToForgotPassword={() => navigate('/forgot-password')}
    />
  );
};

const RegisterPageWrapper = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/admin/dashboard" : "/seller/dashboard"} replace />;
  }

  return (
    <RegisterPage 
      onNavigateToLogin={() => navigate('/login')}
      onNavigateToHome={() => navigate('/')}
    />
  );
};

/**
 * Main App Component
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OrderProvider>
          <ProductProvider>
            {/* Toast notifications */}
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
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />

            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPageWrapper />} />
              <Route path="/login" element={<LoginPageWrapper />} />
              <Route path="/register" element={<RegisterPageWrapper />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/pricing" element={<Pricing />} />

              {/* Auth Callbacks */}
              <Route path="/auth/tiktok/callback" element={<TikTokCallback />} />

              {/* Protected Seller Routes */}
              <Route path="/seller/*" element={
                <ProtectedRoute>
                  <SellerPages />
                </ProtectedRoute>
              } />

              {/* Protected Admin Routes */}
              <Route path="/admin/*" element={
                <AdminRoute>
                  <AdminPages />
                </AdminRoute>
              } />

              {/* Catch all - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ProductProvider>
        </OrderProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
