import React from 'react';
import { 
  BarChart3, MessageSquare, ShoppingBag, Package, 
  Edit, Image, TrendingUp, Settings, LogOut,
  Activity, Users, FileText, CreditCard, DollarSign, 
  Shield, Database
} from 'lucide-react';

/**
 * Navigation Component
 * Sidebar navigation for Seller and Admin
 */
const Navigation = ({ role = 'seller', currentPage, onNavigate, onLogout }) => {
  const sellerMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'ai-chat', label: 'AI Chat', icon: MessageSquare, badge: 'AI' },
    { id: 'products', label: 'Produk', icon: ShoppingBag },
    { id: 'orders', label: 'Pesanan', icon: Package },
    { id: 'description-generator', label: 'Generator Deskripsi', icon: Edit, badge: 'AI' },
    { id: 'image-generator', label: 'Generator Gambar', icon: Image, badge: 'AI' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'trend-analysis', label: 'Analisis Trend', icon: TrendingUp, badge: 'AI' },
    { id: 'settings', label: 'Pengaturan', icon: Settings }
  ];

  const adminMenu = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: Activity },
    { id: 'admin-users', label: 'Kelola Pengguna', icon: Users },
    { id: 'admin-content', label: 'Kelola Konten', icon: FileText },
    { id: 'admin-subscriptions', label: 'Langganan', icon: CreditCard },
    { id: 'admin-payments', label: 'Pembayaran', icon: DollarSign },
    { id: 'admin-analytics', label: 'Analytics Platform', icon: BarChart3 },
    { id: 'admin-settings', label: 'Pengaturan Sistem', icon: Shield },
    { id: 'admin-logs', label: 'System Logs', icon: Database }
  ];

  const menu = role === 'admin' ? adminMenu : sellerMenu;

  return (
    <nav className="space-y-1">
      {menu.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate?.(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                isActive 
                  ? 'bg-white text-purple-600' 
                  : 'bg-purple-100 text-purple-600'
              }`}>
                {item.badge}
              </span>
            )}
          </button>
        );
      })}

      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all mt-4"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>
    </nav>
  );
};

export default Navigation;
