import React, { useState } from 'react';
import { BarChart3, MessageSquare, ShoppingBag, Package, Edit, Image, TrendingUp, Settings } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import Header from './Header';
import Sidebar from '../common/Sidebar';
import Footer from './Footer';

/**
 * Seller Layout Component
 * Main layout for seller dashboard pages
 */
const SellerLayout = ({ children, currentPage, onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { orders } = useOrders();

  // Calculate real pending orders count
  const pendingOrdersCount = orders.filter(
    order => order.status === 'pending' || order.status === 'processing'
  ).length;

  // Menu items for seller
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3
    },
    {
      id: 'ai-chat',
      label: 'AI Chat Assistant',
      icon: MessageSquare,
      badge: 'AI'
    },
    {
      id: 'products',
      label: 'Produk Saya',
      icon: ShoppingBag
    },
    {
      id: 'orders',
      label: 'Pesanan',
      icon: Package,
      count: pendingOrdersCount > 0 ? pendingOrdersCount : undefined // Only show if there are pending orders
    },
    {
      id: 'description-generator',
      label: 'Generator Deskripsi',
      icon: Edit,
      badge: 'AI'
    },
    {
      id: 'image-generator',
      label: 'Generator Gambar',
      icon: Image,
      badge: 'AI'
    },
    {
      id: 'analytics',
      label: 'Analytics & Trend',
      icon: TrendingUp
    },
    {
      id: 'settings',
      label: 'Pengaturan',
      icon: Settings
    }
  ];

  // No logo for sidebar - logo is in Header
  const logo = null;

  const sidebarFooter = (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-semibold text-gray-700">AI Assistant Online</span>
      </div>
      <p className="text-xs text-gray-600">
        Butuh bantuan? Klik AI Chat!
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <Header 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          menuItems={menuItems}
          currentPage={currentPage}
          onNavigate={onNavigate}
          logo={logo}
          footer={sidebarFooter}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer variant="simple" />
    </div>
  );
};

export default SellerLayout;
