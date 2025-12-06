import React, { useState } from 'react';
import { Menu, X, Bell, User, LogOut, Settings, ChevronDown, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';

/**
 * Header Component
 * Navigation header for authenticated users
 */
const Header = ({ onToggleSidebar, sidebarOpen = true }) => {
  const { user, isAdmin, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  // Mock notifications
  const notifications = [
    { id: 1, title: 'Pesanan Baru', message: 'Ada pesanan baru dari Ahmad', time: '5 menit lalu', unread: true },
    { id: 2, title: 'Stok Rendah', message: 'Headphone Wireless stok tinggal 5', time: '1 jam lalu', unread: true },
    { id: 3, title: 'Pembayaran Berhasil', message: 'Pembayaran Rp 299.000 diterima', time: '2 jam lalu', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Toggle Sidebar Button */}
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo / App Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                SellerAI Pro
              </h1>
              <p className="text-xs text-gray-500">
                {isAdmin ? 'Admin Panel' : 'Seller Dashboard'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-20">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900">Notifikasi</h3>
                      {unreadCount > 0 && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                          {unreadCount} baru
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notif => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer ${
                          notif.unread ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {notif.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-gray-900">{notif.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200 text-center">
                    <button className="text-sm text-purple-600 font-semibold hover:text-purple-700">
                      Lihat Semua Notifikasi
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 sm:gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-semibold text-gray-900">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                </div>
                <div className="text-xs text-gray-500">
                  {isAdmin ? '👑 Admin' : '🛍️ Seller'}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-20">
                  <div className="p-4 border-b border-gray-200">
                    <div className="font-semibold text-gray-900">
                      {user?.user_metadata?.full_name || 'User'}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{user?.email}</div>
                    <div className="mt-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                        isAdmin 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {isAdmin ? '👑 Admin' : '🛍️ Seller'}
                      </span>
                    </div>
                  </div>

                  <div className="py-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition text-left text-gray-700">
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">Profil Saya</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition text-left text-gray-700">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm font-medium">Pengaturan</span>
                    </button>
                  </div>

                  <div className="p-2 border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition text-left text-red-600 rounded-lg"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
