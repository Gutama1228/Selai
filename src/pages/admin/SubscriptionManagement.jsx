// src/pages/admin/SubscriptionManagement.jsx
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
