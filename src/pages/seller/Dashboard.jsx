import React, { useEffect, useState } from 'react';
import { ShoppingBag, DollarSign, Package, TrendingUp, AlertCircle, Link as LinkIcon, Sparkles, X } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useOrders } from '../../context/OrderContext';
import { formatCurrency } from '../../utils/helpers';
import StatsCard from '../../components/seller/StatsCard';
import ProductCard from '../../components/seller/ProductCard';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

/**
 * Seller Dashboard Page
 * Main overview page for sellers
 */
const Dashboard = ({ onNavigate }) => {
  const { products, loading: productsLoading, getStatistics: getProductStats } = useProducts();
  const { orders, loading: ordersLoading, getStatistics: getOrderStats } = useOrders();
  const [showConnectBanner, setShowConnectBanner] = useState(true);

  const productStats = getProductStats();
  const orderStats = getOrderStats();

  // Check if user has connected any marketplace
  // TODO: Replace with actual check from database/localStorage
  const hasConnectedMarketplace = false;

  // Calculate actual rating from orders/reviews (if available)
  const calculateRating = () => {
    if (!orders || orders.length === 0) return null;
    // TODO: Calculate from actual review data when implemented
    // For now, return null for new users
    return null;
  };

  const storeRating = calculateRating();

  // Top selling products (limit 4)
  const topProducts = [...products]
    .sort((a, b) => (b.sales || 0) - (a.sales || 0))
    .slice(0, 4);

  // Recent orders (limit 5)
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
    .slice(0, 5);

  // Low stock products
  const lowStockProducts = products.filter(p => p.stock <= 10 && p.stock > 0);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Selamat datang kembali! 👋</p>
        </div>
      </div>

      {/* Connect Marketplace Banner - Show if not connected */}
      {!hasConnectedMarketplace && showConnectBanner && (
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-2xl shadow-2xl">
          {/* Close Button */}
          <button
            onClick={() => setShowConnectBanner(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Content */}
          <div className="relative p-8 md:p-10">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="text-white space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-semibold">
                  <Sparkles className="w-4 h-4" />
                  Mulai Sekarang
                </div>

                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  Hubungkan Toko Anda & Kelola Semua dalam 1 Dashboard! 🚀
                </h2>

                <p className="text-white/90 text-lg">
                  Sinkronkan produk dari TikTok Shop, Shopee, Lazada, dan Tokopedia. Kelola pesanan lebih mudah dan cepat!
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => onNavigate?.('connect')}
                    leftIcon={<LinkIcon className="w-5 h-5" />}
                    className="shadow-xl hover:shadow-2xl"
                  >
                    Hubungkan Marketplace
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-white border-white/30 hover:bg-white/10"
                  >
                    Lihat Cara Kerja
                  </Button>
                </div>

                {/* Features List */}
                <div className="pt-4 space-y-2">
                  {[
                    '✅ Sinkronisasi otomatis produk & stok',
                    '✅ Kelola pesanan dari semua marketplace',
                    '✅ Update massal & hemat waktu'
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-white/90">
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Content - Visual */}
              <div className="hidden md:block">
                <div className="relative">
                  {/* Marketplace Icons */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'TikTok', icon: '⚫', color: 'from-gray-800 to-gray-900' },
                      { name: 'Shopee', icon: '🟠', color: 'from-orange-500 to-red-500' },
                      { name: 'Lazada', icon: '🔵', color: 'from-blue-500 to-blue-600' },
                      { name: 'Tokopedia', icon: '🟢', color: 'from-green-500 to-green-600' }
                    ].map((platform, idx) => (
                      <div
                        key={idx}
                        className={`bg-white/20 backdrop-blur rounded-xl p-6 text-center hover:bg-white/30 transition-all cursor-pointer transform hover:scale-105`}
                      >
                        <div className="text-4xl mb-2">{platform.icon}</div>
                        <div className="text-white font-semibold text-sm">{platform.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Produk Terjual"
          value={orderStats.total || 0}
          subtitle="Total"
          icon={ShoppingBag}
          color="blue"
          trend={orderStats.total > 0 ? "up" : undefined}
          trendValue={orderStats.total > 0 ? "+12% dari bulan lalu" : undefined}
        />
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(orderStats.totalRevenue || 0)}
          subtitle="Total"
          icon={DollarSign}
          color="green"
          trend={orderStats.totalRevenue > 0 ? "up" : undefined}
          trendValue={orderStats.totalRevenue > 0 ? "+25% dari bulan lalu" : undefined}
        />
        <StatsCard
          title="Pesanan Pending"
          value={orderStats.pending || 0}
          subtitle="Perlu Diproses"
          icon={Package}
          color="orange"
          onClick={() => onNavigate?.('orders')}
        />
        <StatsCard
          title="Rating Toko"
          value={storeRating ? `${storeRating}/5` : "Belum ada"}
          subtitle={storeRating ? `${orders.length} ulasan` : "Mulai jualan"}
          icon={TrendingUp}
          color="purple"
        />
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <Card variant="warning">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-bold text-yellow-900 mb-1">
                Peringatan Stok Rendah!
              </h3>
              <p className="text-yellow-800 text-sm mb-3">
                {lowStockProducts.length} produk memiliki stok rendah. Segera restock untuk menghindari kehabisan stok.
              </p>
              <div className="flex flex-wrap gap-2">
                {lowStockProducts.slice(0, 3).map(product => (
                  <Badge key={product.id} variant="warning" size="sm">
                    {product.name} ({product.stock} tersisa)
                  </Badge>
                ))}
                {lowStockProducts.length > 3 && (
                  <Badge variant="warning" size="sm">
                    +{lowStockProducts.length - 3} lainnya
                  </Badge>
                )}
              </div>
            </div>
            <Button
              variant="warning"
              size="sm"
              onClick={() => onNavigate?.('products')}
            >
              Lihat Semua
            </Button>
          </div>
        </Card>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card
          title="Produk Terlaris"
          subtitle={`${topProducts.length} produk`}
          headerAction={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate?.('products')}
            >
              Lihat Semua
            </Button>
          }
        >
          {productsLoading ? (
            <div className="text-center py-8 text-gray-500">Memuat data...</div>
          ) : topProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Belum ada produk. Tambahkan produk pertama Anda!
            </div>
          ) : (
            <div className="space-y-3">
              {topProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg hover:shadow-md transition border border-gray-100"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg flex items-center justify-center font-bold shadow-lg">
                    #{idx + 1}
                  </div>
                  <div className="text-3xl">{product.image || '📦'}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.platform}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{product.sales || 0} terjual</div>
                    <div className="text-sm text-gray-500">{formatCurrency(product.price)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Recent Orders */}
        <Card
          title="Pesanan Terbaru"
          subtitle={`${recentOrders.length} pesanan`}
          headerAction={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate?.('orders')}
            >
              Lihat Semua
            </Button>
          }
        >
          {ordersLoading ? (
            <div className="text-center py-8 text-gray-500">Memuat data...</div>
          ) : recentOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Belum ada pesanan
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg hover:shadow-md transition border border-gray-100"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900">{order.orderNo}</div>
                    <div className="text-sm text-gray-600 truncate">{order.customer}</div>
                    <div className="text-xs text-gray-500 mt-1">{order.product}</div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="font-bold text-green-600 mb-1">
                      {formatCurrency(order.total)}
                    </div>
                    <Badge
                      variant={
                        order.status === 'delivered' ? 'success' :
                        order.status === 'shipped' ? 'info' :
                        order.status === 'processing' ? 'warning' :
                        'default'
                      }
                      size="sm"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* AI Features Quick Access */}
      <Card title="Fitur AI Tersedia" subtitle="Tingkatkan penjualan dengan AI">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              id: 'ai-chat',
              icon: '💬',
              title: 'AI Chat',
              desc: 'Konsultasi strategi',
              color: 'from-blue-500 to-blue-600'
            },
            {
              id: 'description-generator',
              icon: '✍️',
              title: 'Generator Deskripsi',
              desc: 'Deskripsi otomatis',
              color: 'from-purple-500 to-purple-600'
            },
            {
              id: 'image-generator',
              icon: '🎨',
              title: 'Generator Gambar',
              desc: 'Saran foto produk',
              color: 'from-pink-500 to-pink-600'
            },
            {
              id: 'analytics',
              icon: '📊',
              title: 'Analisis Trend',
              desc: 'Prediksi pasar',
              color: 'from-green-500 to-green-600'
            }
          ].map((feature) => (
            <button
              key={feature.id}
              onClick={() => onNavigate?.(feature.id)}
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-lg transition border border-gray-100 text-left group"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center shadow-lg text-2xl group-hover:scale-110 transition`}>
                {feature.icon}
              </div>
              <div>
                <div className="font-semibold text-gray-900 group-hover:text-purple-600 transition">
                  {feature.title}
                </div>
                <div className="text-sm text-gray-500">{feature.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
