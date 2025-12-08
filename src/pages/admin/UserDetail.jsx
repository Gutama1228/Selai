// ============================================
// src/pages/admin/SubscriptionManagement.jsx
// ============================================
import React from 'react';
import { CreditCard, Users, DollarSign, TrendingUp } from 'lucide-react';
import Card from '../../components/common/Card';
import StatsCard from '../../components/seller/StatsCard';
import Badge from '../../components/common/Badge';

const SubscriptionManagement = () => {
  // Mock data
  const subscriptions = [
    {
      id: 1,
      user: 'seller@test.com',
      plan: 'Professional',
      status: 'active',
      amount: 299000,
      nextBilling: '2024-01-15',
      startDate: '2023-12-15'
    },
    {
      id: 2,
      user: 'demo@test.com',
      plan: 'Starter',
      status: 'active',
      amount: 99000,
      nextBilling: '2024-01-10',
      startDate: '2023-12-10'
    },
    {
      id: 3,
      user: 'store@test.com',
      plan: 'Enterprise',
      status: 'cancelled',
      amount: 999000,
      nextBilling: null,
      startDate: '2023-11-01'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Kelola Langganan</h1>
        <p className="text-gray-600 mt-1">Monitoring paket langganan user</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Subscribers"
          value="847"
          icon={Users}
          color="blue"
          trend={12.3}
        />
        <StatsCard
          title="MRR"
          value="Rp 245M"
          icon={DollarSign}
          color="green"
          trend={18.5}
        />
        <StatsCard
          title="Churn Rate"
          value="3.2%"
          icon={TrendingUp}
          color="orange"
          trend={-1.2}
        />
        <StatsCard
          title="LTV"
          value="Rp 1.8M"
          icon={CreditCard}
          color="purple"
          trend={8.7}
        />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Next Billing</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {subscriptions.map(sub => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{sub.user}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{sub.plan}</td>
                  <td className="px-6 py-4 text-sm">Rp {sub.amount.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4">
                    <Badge variant={sub.status === 'active' ? 'success' : 'danger'}>
                      {sub.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {sub.nextBilling || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-purple-600 hover:text-purple-800">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default SubscriptionManagement;

// ============================================
// src/pages/admin/SystemSettings.jsx
// ============================================
import React, { useState } from 'react';
import { Save, Shield, Bell, Mail, Database } from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'SellerAI Pro',
    siteUrl: 'https://selai.vercel.app',
    supportEmail: 'support@sellerai.com',
    maxUploadSize: '5',
    sessionTimeout: '30',
    enableRegistration: true,
    enableAI: true,
    maintenanceMode: false
  });

  const handleSave = () => {
    toast.success('Pengaturan berhasil disimpan! ⚙️');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pengaturan Sistem</h1>
        <p className="text-gray-600 mt-1">Konfigurasi sistem platform</p>
      </div>

      <Card>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          General Settings
        </h3>
        <div className="space-y-4">
          <Input
            label="Site Name"
            value={settings.siteName}
            onChange={(e) => setSettings({...settings, siteName: e.target.value})}
          />
          <Input
            label="Site URL"
            value={settings.siteUrl}
            onChange={(e) => setSettings({...settings, siteUrl: e.target.value})}
          />
          <Input
            label="Support Email"
            type="email"
            leftIcon={<Mail className="w-5 h-5" />}
            value={settings.supportEmail}
            onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
          />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5" />
          System Limits
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Max Upload Size (MB)"
            type="number"
            value={settings.maxUploadSize}
            onChange={(e) => setSettings({...settings, maxUploadSize: e.target.value})}
          />
          <Input
            label="Session Timeout (minutes)"
            type="number"
            value={settings.sessionTimeout}
            onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})}
          />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Feature Toggles
        </h3>
        <div className="space-y-3">
          {[
            { key: 'enableRegistration', label: 'Enable User Registration' },
            { key: 'enableAI', label: 'Enable AI Features' },
            { key: 'maintenanceMode', label: 'Maintenance Mode' }
          ].map(toggle => (
            <label key={toggle.key} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={settings[toggle.key]}
                onChange={(e) => setSettings({...settings, [toggle.key]: e.target.checked})}
                className="w-4 h-4 text-purple-600 rounded"
              />
              <span className="font-medium text-gray-900">{toggle.label}</span>
            </label>
          ))}
        </div>
      </Card>

      <Button
        variant="primary"
        fullWidth
        leftIcon={<Save className="w-5 h-5" />}
        onClick={handleSave}
      >
        Simpan Pengaturan
      </Button>
    </div>
  );
};

export default SystemSettings;

// ============================================
// src/pages/admin/UserDetail.jsx
// ============================================
import React from 'react';
import { ArrowLeft, Mail, Phone, Store, Calendar } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const UserDetail = ({ userId, onNavigate }) => {
  // Mock user data
  const user = {
    id: userId || '1',
    email: 'seller@test.com',
    name: 'Demo Seller',
    phone: '081234567890',
    storeName: 'Demo Shop',
    role: 'seller',
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '2024-12-09',
    stats: {
      products: 15,
      orders: 47,
      revenue: 12500000
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => onNavigate?.('admin-users')}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Detail User</h1>
          <p className="text-gray-600 mt-1">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Informasi User</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-semibold">{user.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Phone</div>
                  <div className="font-semibold">{user.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Store className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Store Name</div>
                  <div className="font-semibold">{user.storeName}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Member Since</div>
                  <div className="font-semibold">{user.createdAt}</div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Statistik</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{user.stats.products}</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{user.stats.orders}</div>
                <div className="text-sm text-gray-600">Orders</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  Rp {(user.stats.revenue / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-gray-600">Revenue</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Role</span>
                <Badge variant="info">{user.role}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <Badge variant="success">{user.status}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Login</span>
                <span className="text-sm">{user.lastLogin}</span>
              </div>
            </div>
          </Card>

          <div className="space-y-2">
            <Button variant="outline" fullWidth>Edit User</Button>
            <Button variant="danger" fullWidth>Suspend User</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
