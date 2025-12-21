// src/App.jsx
// Minimal version - only using existing files

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import { ProductProvider } from './context/ProductContext';
import { Toaster } from 'react-hot-toast';

// Import only existing pages
// TikTok callback will be created
import TikTokCallback from './pages/auth/TikTokCallback';

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
              {/* Temporary landing page */}
              <Route 
                path="/" 
                element={
                  <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-gray-800 mb-4">
                        Selai 🍓
                      </h1>
                      <p className="text-2xl text-gray-600 mb-8">
                        Platform AI untuk Seller Online Shop
                      </p>
                      <p className="text-gray-500">
                        Website sedang dalam pengembangan...
                      </p>
                    </div>
                  </div>
                } 
              />

              {/* TikTok OAuth callback route */}
              <Route 
                path="/auth/tiktok/callback" 
                element={<TikTokCallback />} 
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
