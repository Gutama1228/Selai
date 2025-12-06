import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { ORDER_STATUS } from '../../utils/constants';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Loading from '../../components/common/Loading';
import Modal from '../../components/common/Modal';

/**
 * Orders Page
 * View and manage all orders
 */
const Orders = () => {
  const {
    orders,
    loading,
    updateStatus,
    searchOrders,
    getOrdersByStatus,
    getStatistics
  } = useOrders();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const stats = getStatistics();

  // Status icons
  const statusIcons = {
    pending: Clock,
    paid: CheckCircle,
    processing: Package,
    shipped: Truck,
    delivered: CheckCircle,
    cancelled: XCircle,
    returned: XCircle
  };

  // Filter orders
  const getFilteredOrders = () => {
    let filtered = orders;

    if (searchQuery) {
      filtered = searchOrders(searchQuery);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(o => o.status === filterStatus);
    }

    return filtered;
  };

  const filteredOrders = getFilteredOrders();

  // Handle view order detail
  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  // Handle update order status
  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdatingStatus(true);
    await updateStatus(orderId, newStatus);
    setUpdatingStatus(false);
    
    // Update selected order if modal is open
    if (selectedOrder && selectedOrder.id === orderId) {
      const updated = orders.find(o => o.id === orderId);
      setSelectedOrder(updated);
    }
  };

  // Export orders
  const handleExport = () => {
    const csv = [
      ['No Order', 'Tanggal', 'Customer', 'Produk', 'Qty', 'Total', 'Status', 'Platform'].join(','),
      ...filteredOrders.map(o => [
        o.orderNo,
        formatDate(o.createdAt || o.date),
        o.customer,
        o.product,
        o.qty || o.quantity,
        o.total,
        o.status,
        o.platform
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pesanan-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <Loading fullScreen text="Memuat pesanan..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pesanan</h1>
          <p className="text-gray-600 mt-1">{orders.length} total pesanan</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={handleExport}
        >
          Export
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card padding="sm" className="bg-gray-50">
          <div className="text-xs text-gray-600 mb-1">Total</div>
          <div className="text-xl font-bold text-gray-900">{stats.total}</div>
        </Card>
        <Card padding="sm" className="bg-yellow-50">
          <div className="text-xs text-yellow-700 mb-1">Pending</div>
          <div className="text-xl font-bold text-yellow-600">{stats.pending}</div>
        </Card>
        <Card padding="sm" className="bg-orange-50">
          <div className="text-xs text-orange-700 mb-1">Processing</div>
          <div className="text-xl font-bold text-orange-600">{stats.processing}</div>
        </Card>
        <Card padding="sm" className="bg-blue-50">
          <div className="text-xs text-blue-700 mb-1">Shipped</div>
          <div className="text-xl font-bold text-blue-600">{stats.shipped}</div>
        </Card>
        <Card padding="sm" className="bg-green-50">
          <div className="text-xs text-green-700 mb-1">Delivered</div>
          <div className="text-xl font-bold text-green-600">{stats.delivered}</div>
        </Card>
        <Card padding="sm" className="bg-red-50">
          <div className="text-xs text-red-700 mb-1">Cancelled</div>
          <div className="text-xl font-bold text-red-600">{stats.cancelled}</div>
        </Card>
        <Card padding="sm" className="bg-purple-50">
          <div className="text-xs text-purple-700 mb-1">Revenue</div>
          <div className="text-lg font-bold text-purple-600">{formatCurrency(stats.totalRevenue).replace('Rp ', 'Rp')}</div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Cari berdasarkan no order, customer, atau produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>
          <div className="md:w-64">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Sudah Dibayar</option>
              <option value="processing">Sedang Diproses</option>
              <option value="shipped">Sedang Dikirim</option>
              <option value="delivered">Sudah Diterima</option>
              <option value="cancelled">Dibatalkan</option>
              <option value="returned">Dikembalikan</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {searchQuery || filterStatus !== 'all' ? 'Tidak ada pesanan yang sesuai' : 'Belum ada pesanan'}
            </h3>
            <p className="text-gray-600">
              {searchQuery || filterStatus !== 'all' ? 'Coba ubah filter atau kata kunci pencarian' : 'Pesanan akan muncul di sini'}
            </p>
          </div>
        </Card>
      ) : (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">No Order</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Tanggal</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Produk</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Platform</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const StatusIcon = statusIcons[order.status] || Package;
                  const statusConfig = ORDER_STATUS[order.status.toUpperCase()] || ORDER_STATUS.PENDING;
                  
                  return (
                    <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{order.orderNo}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{formatDate(order.createdAt || order.date)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{order.customer}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-xs truncate">{order.product}</div>
                        <div className="text-xs text-gray-500">Qty: {order.qty || order.quantity}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-green-600">{formatCurrency(order.total)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="info" size="sm">{order.platform}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <StatusIcon className={`w-4 h-4 ${statusConfig.textColor}`} />
                          <Badge
                            variant={
                              order.status === 'delivered' ? 'success' :
                              order.status === 'shipped' ? 'info' :
                              order.status === 'processing' ? 'warning' :
                              order.status === 'cancelled' ? 'danger' :
                              'default'
                            }
                            size="sm"
                          >
                            {statusConfig.label}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Eye className="w-4 h-4" />}
                          onClick={() => handleViewDetail(order)}
                        >
                          Detail
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Order Detail Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="Detail Pesanan"
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Order Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">No Order</div>
                <div className="font-bold text-gray-900">{selectedOrder.orderNo}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Tanggal</div>
                <div className="font-semibold text-gray-900">{formatDate(selectedOrder.createdAt || selectedOrder.date)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Platform</div>
                <Badge variant="info">{selectedOrder.platform}</Badge>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Status</div>
                <Badge
                  variant={
                    selectedOrder.status === 'delivered' ? 'success' :
                    selectedOrder.status === 'shipped' ? 'info' :
                    selectedOrder.status === 'processing' ? 'warning' :
                    'default'
                  }
                >
                  {ORDER_STATUS[selectedOrder.status.toUpperCase()]?.label || selectedOrder.status}
                </Badge>
              </div>
            </div>

            <hr />

            {/* Customer Info */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Informasi Customer</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-semibold text-gray-900">{selectedOrder.customer}</div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Produk</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-semibold text-gray-900 mb-1">{selectedOrder.product}</div>
                <div className="text-sm text-gray-600">Jumlah: {selectedOrder.qty || selectedOrder.quantity} pcs</div>
              </div>
            </div>

            {/* Total */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">Total Pembayaran</span>
                <span className="text-2xl font-bold text-purple-600">{formatCurrency(selectedOrder.total)}</span>
              </div>
            </div>

            {/* Update Status */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Update Status</h3>
              <div className="flex flex-wrap gap-2">
                {['processing', 'shipped', 'delivered', 'cancelled'].map(status => (
                  <Button
                    key={status}
                    variant={selectedOrder.status === status ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedOrder.id, status)}
                    disabled={updatingStatus || selectedOrder.status === status}
                    loading={updatingStatus}
                  >
                    {ORDER_STATUS[status.toUpperCase()]?.label || status}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders;
