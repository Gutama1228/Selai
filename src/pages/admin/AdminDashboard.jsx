import React from 'react';
import { Activity, Users, DollarSign, ShoppingBag } from 'lucide-react';
import Card from '../../components/common/Card';
import StatsCard from '../../components/seller/StatsCard';

const AdminDashboard = () => {
  return (
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
        <StatsCard
          title="Total Pengguna"
          value="1,247"
          icon={Users}
          color="blue"
          trend={15.3}
          trendValue="vs bulan lalu"
        />
        <StatsCard
          title="Total Revenue"
          value="Rp 4.25M"
          icon={DollarSign}
          color="green"
          trend={22.5}
          trendValue="vs bulan lalu"
        />
        <StatsCard
          title="Total Produk"
          value="8,934"
          icon={ShoppingBag}
          color="purple"
          trend={8.7}
          trendValue="vs bulan lalu"
        />
        <StatsCard
          title="Server Uptime"
          value="99.9%"
          icon={Activity}
          color="orange"
          trend={0.1}
          trendValue="this month"
        />
      </div>

      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Panel Admin</h2>
        <p className="text-gray-600 mb-4">
          Anda memiliki akses penuh ke seluruh sistem. Gunakan menu di sebelah kiri untuk mengelola platform.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            ⚠️ <strong>Catatan:</strong> Beberapa halaman admin masih dalam development. 
            Fitur utama sudah tersedia di menu Kelola Pengguna dan Kelola Konten.
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="font-bold text-gray-900 mb-3">🔥 Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">
              Lihat User Baru
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">
              Monitor Transaksi
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">
              Check System Logs
            </button>
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-gray-900 mb-3">📊 Platform Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Active Sellers</span>
              <span className="font-semibold">1,182</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Products Listed</span>
              <span className="font-semibold">8,934</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Orders Today</span>
              <span className="font-semibold">87</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-gray-900 mb-3">⚡ System Status</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Database</span>
              <span className="text-green-600 font-semibold">● Online</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">API</span>
              <span className="text-green-600 font-semibold">● Healthy</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Storage</span>
              <span className="text-green-600 font-semibold">● Normal</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
