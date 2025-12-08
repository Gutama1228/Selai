import React from 'react';
import { Users, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';
import Card from '../../components/common/Card';
import StatsCard from '../../components/seller/StatsCard';
import AnalyticsChart from '../../components/admin/AnalyticsChart';
import { formatCurrency } from '../../utils/formatters';

const PlatformAnalytics = () => {
  // Mock data - in production, this would come from API
  const platformStats = {
    totalUsers: 1247,
    totalProducts: 8934,
    totalRevenue: 4250000,
    totalOrders: 3521
  };

  const revenueData = [
    { month: 'Jul', revenue: 650000, orders: 520 },
    { month: 'Aug', revenue: 720000, orders: 580 },
    { month: 'Sep', revenue: 680000, orders: 540 },
    { month: 'Oct', revenue: 750000, orders: 610 },
    { month: 'Nov', revenue: 820000, orders: 670 },
    { month: 'Dec', revenue: 880000, orders: 720 }
  ];

  const userGrowthData = [
    { month: 'Jul', users: 850 },
    { month: 'Aug', users: 920 },
    { month: 'Sep', users: 980 },
    { month: 'Oct', users: 1050 },
    { month: 'Nov', users: 1150 },
    { month: 'Dec', users: 1247 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
        <p className="text-gray-600 mt-1">Monitoring performa seluruh platform</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={platformStats.totalUsers.toLocaleString()}
          icon={Users}
          color="blue"
          trend={15.3}
          trendValue="vs bulan lalu"
        />

        <StatsCard
          title="Total Revenue"
          value={formatCurrency(platformStats.totalRevenue)}
          icon={DollarSign}
          color="green"
          trend={22.5}
          trendValue="vs bulan lalu"
        />

        <StatsCard
          title="Total Products"
          value={platformStats.totalProducts.toLocaleString()}
          icon={ShoppingBag}
          color="purple"
          trend={8.7}
          trendValue="vs bulan lalu"
        />

        <StatsCard
          title="Total Orders"
          value={platformStats.totalOrders.toLocaleString()}
          icon={TrendingUp}
          color="orange"
          trend={12.3}
          trendValue="vs bulan lalu"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Platform Revenue"
          data={revenueData}
          type="line"
          dataKey="revenue"
          xAxisKey="month"
          color="#10b981"
        />

        <AnalyticsChart
          title="User Growth"
          data={userGrowthData}
          type="bar"
          dataKey="users"
          xAxisKey="month"
          color="#8b5cf6"
        />
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">👥 User Distribution</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Sellers</span>
              <span className="font-bold text-blue-600">1,182</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Admins</span>
              <span className="font-bold text-purple-600">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Active Today</span>
              <span className="font-bold text-green-600">387</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">New This Month</span>
              <span className="font-bold text-orange-600">143</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-gray-900 mb-4">🏪 Top Platforms</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Shopee</span>
              <span className="font-bold text-gray-900">3,245</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Tokopedia</span>
              <span className="font-bold text-gray-900">2,876</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Lazada</span>
              <span className="font-bold text-gray-900">1,543</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">TikTok Shop</span>
              <span className="font-bold text-gray-900">1,270</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-gray-900 mb-4">📊 System Health</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Uptime</span>
              <span className="font-bold text-green-600">99.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">API Calls</span>
              <span className="font-bold text-gray-900">1.2M</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Avg Response</span>
              <span className="font-bold text-blue-600">142ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Error Rate</span>
              <span className="font-bold text-red-600">0.01%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PlatformAnalytics;
