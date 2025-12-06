import React, { useState } from 'react';
import { Activity, Users, FileText, CreditCard, DollarSign, BarChart3, Shield, Database } from 'lucide-react';
import Header from './Header';
import Sidebar from '../common/Sidebar';
import Footer from './Footer';

/**
 * Admin Layout Component
 * Main layout for admin dashboard pages
 */
const AdminLayout = ({ children, currentPage, onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Menu items for admin
  const menuItems = [
    {
      id: 'admin-dashboard',
      label: 'Dashboard',
      icon: Activity
    },
    {
      id: 'admin-users',
      label: 'Kelola Pengguna',
      icon: Users
    },
    {
      id: 'admin-content',
      label: 'Kelola Konten',
      icon: FileText
    },
    {
      id: 'admin-subscriptions',
      label: 'Langganan',
      icon: CreditCard,
      count: 856 // Active subscriptions
    },
    {
      id: 'admin-payments',
      label: 'Pembayaran',
      icon: DollarSign
    },
    {
      id: 'admin-analytics',
      label: 'Analytics Platform',
      icon: BarChart3
    },
    {
      id: 'admin-settings',
      label: 'Pengaturan Sistem',
      icon: Shield
    },
    {
      id: 'admin-logs',
      label: 'System Logs',
      icon: Database
    }
  ];

  const logo = (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
        <span className="text-white text-xl">👑</span>
      </div>
      <div>
        <h1 className="text-lg font-bold text-gray-900">SellerAI Pro</h1>
        <p className="text-xs text-red-600 font-semibold">Admin Panel</p>
      </div>
    </div>
  );

  const sidebarFooter = (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-lg border border-red-200">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="w-4 h-4 text-red-600" />
        <span className="text-xs font-bold text-red-700">Admin Access</span>
      </div>
      <p className="text-xs text-gray-600">
        Full system control enabled
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

export default AdminLayout;
