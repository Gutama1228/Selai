// src/App.jsx
// Fixed version - using proper LandingPage component

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import { ProductProvider } from './context/ProductContext';
import { Toaster } from 'react-hot-toast';

// Import existing pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import TikTokCallback from './pages/auth/TikTokCallback';
import ConnectMarketplace from './pages/seller/ConnectMarketplace';

// Wrapper component untuk handle navigation di LandingPage
function LandingPageWrapper() {
  const navigate = useNavigate();
  
  return (
    <LandingPage 
      onNavigateToLogin={() => navigate('/login')}
      onNavigateToRegister={() => navigate('/register')}
    />
  );
}

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
              {/* Landing Page - using proper component */}
              <Route 
                path="/" 
                element={<LandingPageWrapper />} 
              />

              {/* Auth Routes */}
              <Route 
                path="/login" 
                element={<LoginPage />} 
              />
              
              <Route 
                path="/register" 
                element={<RegisterPage />} 
              />

              {/* TikTok OAuth callback route */}
              <Route 
                path="/auth/tiktok/callback" 
                element={<TikTokCallback />} 
              />

              {/* Connect Marketplace page */}
              <Route 
                path="/connect" 
                element={<ConnectMarketplace />} 
              />

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
