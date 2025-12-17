// src/App.jsx
// Main App component with routing

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import { ProductProvider } from './context/ProductContext';
import { Toaster } from 'react-hot-toast';

// Public pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import ForgotPassword from './pages/public/ForgotPassword';
import PricingPage from './pages/public/PricingPage';

// Seller pages
import Dashboard from './pages/seller/Dashboard';
import Products from './pages/seller/Products';
import Orders from './pages/seller/Orders';
import AIChat from './pages/seller/AIChat';
import Analytics from './pages/seller/Analytics';
import Settings from './pages/seller/Settings';
import DescriptionGenerator from './pages/seller/DescriptionGenerator';
import ImageGenerator from './pages/seller/ImageGenerator';

// Admin pages (if any)
import AdminDashboard from './pages/admin/AdminDashboard';

// Auth callback pages
import TikTokCallback from './pages/auth/TikTokCallback';
import ShopeeCallback from './pages/auth/ShopeeCallback';
import LazadaCallback from './pages/auth/LazadaCallback';

// Layout components
import SellerLayout from './components/layout/SellerLayout';
import AdminLayout from './components/layout/AdminLayout';

// Protected Route wrapper
import { ProtectedRoute } from './components/common/ProtectedRoute';

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
              {/* =================== PUBLIC ROUTES =================== */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/pricing" element={<PricingPage />} />

              {/* =================== AUTH CALLBACK ROUTES =================== */}
              {/* TikTok Shop OAuth callback */}
              <Route 
                path="/auth/tiktok/callback" 
                element={
                  <ProtectedRoute>
                    <TikTokCallback />
                  </ProtectedRoute>
                } 
              />
              
              {/* Shopee OAuth callback */}
              <Route 
                path="/auth/shopee/callback" 
                element={
                  <ProtectedRoute>
                    <ShopeeCallback />
                  </ProtectedRoute>
                } 
              />
              
              {/* Lazada OAuth callback */}
              <Route 
                path="/auth/lazada/callback" 
                element={
                  <ProtectedRoute>
                    <LazadaCallback />
                  </ProtectedRoute>
                } 
              />

              {/* =================== SELLER ROUTES =================== */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <SellerLayout>
                      <Dashboard />
                    </SellerLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <SellerLayout>
                      <Products />
                    </SellerLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <SellerLayout>
                      <Orders />
                    </SellerLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/ai-chat"
                element={
                  <ProtectedRoute>
                    <SellerLayout>
                      <AIChat />
                    </SellerLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <SellerLayout>
                      <Analytics />
                    </SellerLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/description-generator"
                element={
                  <ProtectedRoute>
                    <SellerLayout>
                      <DescriptionGenerator />
                    </SellerLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/image-generator"
                element={
                  <ProtectedRoute>
                    <SellerLayout>
                      <ImageGenerator />
                    </SellerLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SellerLayout>
                      <Settings />
                    </SellerLayout>
                  </ProtectedRoute>
                }
              />

              {/* Settings sub-routes */}
              <Route
                path="/settings/marketplace"
                element={
                  <ProtectedRoute>
                    <SellerLayout>
                      <Settings activeTab="marketplace" />
                    </SellerLayout>
                  </ProtectedRoute>
                }
              />

              {/* =================== ADMIN ROUTES =================== */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* =================== 404 NOT FOUND =================== */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ProductProvider>
        </OrderProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
