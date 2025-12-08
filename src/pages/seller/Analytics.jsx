import React from 'react';
import { TrendingUp, DollarSign, Package, ShoppingCart } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { useOrders } from '../../hooks/useOrders';
import Card from '../../components/common/Card';
import StatsCard from '../../components/seller/StatsCard';
import AnalyticsChart from '../../components/admin/AnalyticsChart';
import { formatCurrency } from '../../utils/formatters';

const Analytics = () => {
  const { getStatistics: getProductStats } = useProducts();
  const { getStatistics: getOrderStats, getMonthlyRevenue } = useOrders();

  const productStats = getProductStats();
  const orderStats = getOrderStats();
  const revenueData = getMonthlyRevenue(6);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Monitoring performa bisnis Anda</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(orderStats.totalRevenue)}
          icon={DollarSign}
          color="green"
          trend={12.5}
          trendValue="vs bulan lalu"
        />

        <StatsCard
          title="Total Pesanan"
          value={orderStats.total}
          icon={ShoppingCart}
          color="blue"
          trend={8.3}
          trendValue="vs bulan lalu"
        />

        <StatsCard
          title="Produk Aktif"
          value={productStats.active}
          icon={Package}
          color="purple"
          trend={5.2}
          trendValue="vs bulan lalu"
        />

        <StatsCard
          title="Avg Order Value"
          value={formatCurrency(orderStats.averageOrderValue)}
          icon={TrendingUp}
          color="orange"
          trend={-2.1}
          trendValue="vs bulan lalu"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Revenue 6 Bulan Terakhir"
          data={revenueData}
          type="line"
          dataKey="revenue"
          xAxisKey="month"
          color="#10b981"
        />

        <AnalyticsChart
          title="Jumlah Pesanan per Bulan"
          data={revenueData}
          type="bar"
          dataKey="orders"
          xAxisKey="month"
          color="#8b5cf6"
        />
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">📦 Status Produk</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Produk Aktif</span>
              <span className="font-bold text-green-600">{productStats.active}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Stok Rendah</span>
              <span className="font-bold text-orange-600">{productStats.lowStock}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Stok Habis</span>
              <span className="font-bold text-red-600">{productStats.outOfStock}</span>
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <span className="text-gray-600 font-semibold">Total Produk</span>
              <span className="font-bold text-gray-900">{productStats.total}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-gray-900 mb-4">🛒 Status Pesanan</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Pending</span>
              <span className="font-bold text-yellow-600">{orderStats.pending}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Processing</span>
              <span className="font-bold text-blue-600">{orderStats.processing}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Shipped</span>
              <span className="font-bold text-purple-600">{orderStats.shipped}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Delivered</span>
              <span className="font-bold text-green-600">{orderStats.delivered}</span>
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <span className="text-gray-600 font-semibold">Total Pesanan</span>
              <span className="font-bold text-gray-900">{orderStats.total}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">💰 Revenue Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Revenue Bulan Ini</div>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(orderStats.monthRevenue)}
            </div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Revenue Hari Ini</div>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(orderStats.todayRevenue)}
            </div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(orderStats.totalRevenue)}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
