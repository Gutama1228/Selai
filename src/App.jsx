import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import ForgotPassword from './pages/public/ForgotPassword';
import Pricing from './pages/public/Pricing';

// Seller Pages
import SellerDashboard from './pages/seller/Dashboard';
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
import SellerSettings from './pages/seller/Settings';
import Profile from './pages/seller/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import UserDetail from './pages/admin/UserDetail';
import ContentManagement from './pages/admin/ContentManagement';
import PaymentManagement from './pages/admin/PaymentManagement';
import SubscriptionManagement from './pages/admin/SubscriptionManagement';
import PlatformAnalytics from './pages/admin/PlatformAnalytics';
import SystemSettings from './pages/admin/SystemSettings';
import AdminLogs from './pages/admin/AdminLogs';

// Layouts
import SellerLayout from './components/layout/SellerLayout';
import AdminLayout from './components/layout/AdminLayout';

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Public Only Route (redirect if logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/admin" : "/dashboard"} replace />;
  }
  
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <OrderProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/pricing" element={<Pricing />} />
              
              <Route path="/login" element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              } />
              
              <Route path="/register" element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              } />
              
              <Route path="/forgot-password" element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              } />

              {/* Seller Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <SellerLayout />
                </ProtectedRoute>
              }>
                <Route index element={<SellerDashboard />} />
                <Route path="ai-chat" element={<AIChat />} />
                <Route path="products" element={<Products />} />
                <Route path="products/add" element={<ProductAdd />} />
                <Route path="products/edit/:id" element={<ProductEdit />} />
                <Route path="orders" element={<Orders />} />
                <Route path="orders/:id" element={<OrderDetail />} />
                <Route path="description-generator" element={<DescriptionGenerator />} />
                <Route path="image-generator" element={<ImageGenerator />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="trend-analysis" element={<TrendAnalysis />} />
                <Route path="settings" element={<SellerSettings />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="users/:id" element={<UserDetail />} />
                <Route path="content" element={<ContentManagement />} />
                <Route path="payments" element={<PaymentManagement />} />
                <Route path="subscriptions" element={<SubscriptionManagement />} />
                <Route path="analytics" element={<PlatformAnalytics />} />
                <Route path="settings" element={<SystemSettings />} />
                <Route path="logs" element={<AdminLogs />} />
              </Route>

              {/* 404 Page */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </OrderProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

// Import useAuth hook
import { useAuth } from './hooks/useAuth';

export default App;
