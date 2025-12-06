import React, { useState } from 'react';
import { TrendingUp, DollarSign, Package, ShoppingBag, Calendar } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useOrders } from '../../context/OrderContext';
import { formatCurrency, formatCompactNumber } from '../../utils/helpers';
import StatsCard from '../../components/seller/StatsCard';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

/**
 * Analytics Page
 * View sales analytics and trends
 */
const Analytics = () => {
  const { getStatistics: getProductStats } = useProducts();
  const { getStatistics: getOrderStats, getMonthlyRevenue, getRevenueByPlatform } = useOrders();

  const [timeRange, setTimeRange] = useState('6months');

  const productStats = getProductStats();
  const orderStats = getOrderStats();
  const monthlyData = getMonthlyRevenue(timeRange === '6months' ? 6 : 12);
  const platformRevenue = getRevenueByPlatform();

  // Calculate growth rate (mock data)
  const growthRate = 25.4;
  const conversionRate = 3.2;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Trend</h1>
          <p className="text-gray-600 mt-1">Analisis penjualan dan performa toko Anda</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={timeRange === '6months' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('6months')}
          >
            6 Bulan
          </Button>
          <Button
            variant={timeRange === '12months' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('12months')}
          >
            12 Bulan
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={formatCompactNumber(orderStats.totalRevenue)}
          subtitle="Semua waktu"
          icon={DollarSign}
          color="green"
          trend="up"
          trendValue={`+${growthRate}% bulan ini`}
        />
        <StatsCard
          title="Total Pesanan"
          value={orderStats.total}
          subtitle="Semua waktu"
          icon={Package}
          color="blue"
          trend="up"
          trendValue="+12% bulan ini"
        />
        <StatsCard
          title="Produk Terjual"
          value={productStats.totalSales}
          subtitle="Semua waktu"
          icon={ShoppingBag}
          color="purple"
        />
        <StatsCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          subtitle="Pengunjung → Pembeli"
          icon={TrendingUp}
          color="orange"
        />
      </div>

      {/* Revenue Chart */}
      <Card title="Grafik Revenue" subtitle={`${timeRange === '6months' ? '6' : '12'} bulan terakhir`}>
        <div className="space-y-4">
          {monthlyData.map((data, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-16 text-sm font-semibold text-gray-600">{data.month}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 h-8 bg-gray-200 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg transition-all duration-500"
                      style={{
                        width: `${(data.revenue / Math.max(...monthlyData.map(d => d.revenue))) * 100}%`
                      }}
                    />
                  </div>
                  <div className="w-32 text-right">
                    <div className="font-bold text-gray-900">{formatCurrency(data.revenue)}</div>
                    <div className="text-xs text-gray-500">{data.orders} pesanan</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Platform Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Revenue per Platform" subtitle="Total penjualan per marketplace">
          <div className="space-y-4">
            {Object.entries(platformRevenue)
              .sort(([, a], [, b]) => b - a)
              .map(([platform, revenue], idx) => {
                const maxRevenue = Math.max(...Object.values(platformRevenue));
                const percentage = (revenue / maxRevenue) * 100;
                
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">{platform}</span>
                      <span className="font-bold text-gray-900">{formatCurrency(revenue)}</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>

        <Card title="Top Performing Products" subtitle="Produk dengan penjualan tertinggi">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-500 text-white rounded-lg flex items-center justify-center font-bold">
                  🥇
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Produk Terlaris #1</div>
                  <div className="text-sm text-gray-600">350 terjual</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">Rp 35M</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-400 text-white rounded-lg flex items-center justify-center font-bold">
                  🥈
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Produk Terlaris #2</div>
                  <div className="text-sm text-gray-600">280 terjual</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">Rp 28M</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-400 text-white rounded-lg flex items-center justify-center font-bold">
                  🥉
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Produk Terlaris #3</div>
                  <div className="text-sm text-gray-600">245 terjual</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">Rp 24.5M</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Insights */}
      <Card title="AI Insights & Recommendations" variant="gradient">
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Performa Bagus! 📈</h4>
                <p className="text-sm text-gray-600">
                  Penjualan Anda meningkat <strong>{growthRate}%</strong> dibanding bulan lalu. 
                  Pertahankan momentum dengan terus mengoptimasi listing produk.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Rekomendasi Produk 🎯</h4>
                <p className="text-sm text-gray-600">
                  Berdasarkan trend saat ini, produk <strong>Fashion & Aksesoris</strong> sedang naik daun. 
                  Pertimbangkan untuk menambah variasi di kategori ini.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Waktu Terbaik Post ⏰</h4>
                <p className="text-sm text-gray-600">
                  Data menunjukkan engagement tertinggi terjadi pada <strong>Rabu-Jumat pukul 19:00-21:00</strong>. 
                  Manfaatkan waktu ini untuk upload produk baru!
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
