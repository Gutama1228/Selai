// ============================================
// src/pages/admin/AdminDashboard.jsx
// ============================================
import React from 'react';
import { Activity, Users, DollarSign, ShoppingBag } from 'lucide-react';
import Card from '../../components/common/Card';
import StatsCard from '../../components/seller/StatsCard';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-600 mt-1">Monitoring dan kelola seluruh platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Pengguna"
          value="1,247"
          icon={Users}
          color="blue"
          trend={15.3}
        />
        <StatsCard
          title="Total Revenue"
          value="Rp 4.25M"
          icon={DollarSign}
          color="green"
          trend={22.5}
        />
        <StatsCard
          title="Total Produk"
          value="8,934"
          icon={ShoppingBag}
          color="purple"
          trend={8.7}
        />
        <StatsCard
          title="Server Uptime"
          value="99.9%"
          icon={Activity}
          color="orange"
          trend={0.1}
        />
      </div>

      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Panel Admin</h2>
        <p className="text-gray-600">
          Anda memiliki akses penuh ke seluruh sistem. Gunakan menu di sebelah kiri untuk mengelola platform.
        </p>
      </Card>
    </div>
  );
};

export default AdminDashboard;

// ============================================
// src/pages/admin/AdminLogs.jsx
// ============================================
import React from 'react';
import Card from '../../components/common/Card';

const AdminLogs = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Logs</h1>
        <p className="text-gray-600 mt-1">Monitor aktivitas sistem</p>
      </div>
      <Card>
        <p className="text-gray-600">System logs feature coming soon...</p>
      </Card>
    </div>
  );
};

export default AdminLogs;

// ============================================
// src/pages/admin/PaymentManagement.jsx
// ============================================
import React from 'react';
import Card from '../../components/common/Card';

const PaymentManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Kelola Pembayaran</h1>
        <p className="text-gray-600 mt-1">Monitoring transaksi pembayaran</p>
      </div>
      <Card>
        <p className="text-gray-600">Payment management feature coming soon...</p>
      </Card>
    </div>
  );
};

export default PaymentManagement;

// ============================================
// src/pages/admin/SubscriptionManagement.jsx
// ============================================
import React from 'react';
import Card from '../../components/common/Card';

const SubscriptionManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Kelola Langganan</h1>
        <p className="text-gray-600 mt-1">Monitoring paket langganan user</p>
      </div>
      <Card>
        <p className="text-gray-600">Subscription management feature coming soon...</p>
      </Card>
    </div>
  );
};

export default SubscriptionManagement;

// ============================================
// src/pages/admin/SystemSettings.jsx
// ============================================
import React from 'react';
import Card from '../../components/common/Card';

const SystemSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pengaturan Sistem</h1>
        <p className="text-gray-600 mt-1">Konfigurasi sistem platform</p>
      </div>
      <Card>
        <p className="text-gray-600">System settings feature coming soon...</p>
      </Card>
    </div>
  );
};

export default SystemSettings;

// ============================================
// src/pages/admin/UserDetail.jsx
// ============================================
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const UserDetail = ({ userId, onNavigate }) => {
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
          <p className="text-gray-600 mt-1">User ID: {userId}</p>
        </div>
      </div>
      <Card>
        <p className="text-gray-600">User detail page coming soon...</p>
      </Card>
    </div>
  );
};

export default UserDetail;

// ============================================
// src/pages/public/Pricing.jsx
// ============================================
import React from 'react';
import { Check } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { SUBSCRIPTION_PLANS } from '../../utils/constants';

const Pricing = ({ onNavigateToRegister }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Pilih Paket Langganan
          </h1>
          <p className="text-xl text-white opacity-90">
            Tingkatkan bisnis dengan fitur yang tepat
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.values(SUBSCRIPTION_PLANS).map(plan => (
            <Card key={plan.id} className={plan.popular ? 'ring-4 ring-yellow-400' : ''}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 px-4 py-1 rounded-bl-lg rounded-tr-xl font-bold text-sm">
                  POPULER
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-purple-600 mb-1">
                  Rp {(plan.priceMonthly / 1000).toFixed(0)}K
                </div>
                <div className="text-gray-600">/bulan</div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? 'primary' : 'outline'}
                fullWidth
                onClick={onNavigateToRegister}
              >
                Pilih Paket
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
