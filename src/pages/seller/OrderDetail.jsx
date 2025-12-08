import React from 'react';
import { ArrowLeft, Package, Truck, CheckCircle } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { ORDER_STATUS } from '../../utils/constants';
import { formatCurrency, formatDate } from '../../utils/formatters';

const OrderDetail = ({ orderId, onNavigate }) => {
  const { orders, updateStatus } = useOrders();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Pesanan tidak ditemukan</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => onNavigate?.('orders')}
        >
          Kembali ke Pesanan
        </Button>
      </div>
    );
  }

  const statusConfig = ORDER_STATUS[order.status?.toUpperCase()] || ORDER_STATUS.PENDING;

  const handleUpdateStatus = async (newStatus) => {
    await updateStatus(orderId, newStatus);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onNavigate?.('orders')}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{order.orderNo || order.id}</h1>
          <p className="text-gray-600 mt-1">Detail pesanan</p>
        </div>
        <Badge variant={statusConfig.color} className="text-lg px-4 py-2">
          {statusConfig.label}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi Pesanan</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Tanggal Pesanan</span>
                <span className="font-semibold">{formatDate(order.createdAt, 'datetime')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform</span>
                <span className="font-semibold">{order.platform || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Metode Pembayaran</span>
                <span className="font-semibold">{order.paymentMethod || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Metode Pengiriman</span>
                <span className="font-semibold">{order.shippingMethod || '-'}</span>
              </div>
              {order.trackingNumber && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Nomor Resi</span>
                  <span className="font-semibold">{order.trackingNumber}</span>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Items</h2>
            <div className="space-y-4">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">{item.productName}</div>
                    <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{formatCurrency(item.subtotal)}</div>
                    <div className="text-sm text-gray-600">{formatCurrency(item.price)}/item</div>
                  </div>
                </div>
              )) || (
                <div className="text-center py-4 text-gray-500">Tidak ada item</div>
              )}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Customer</h2>
            <div className="space-y-2">
              <div className="font-semibold text-gray-900">{order.customer || 'N/A'}</div>
              <div className="text-gray-600">{order.customerEmail || '-'}</div>
              <div className="text-gray-600">{order.customerPhone || '-'}</div>
              {order.address && (
                <div className="text-gray-600 mt-2">{order.address}</div>
              )}
            </div>
          </Card>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Total Pembayaran</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatCurrency(order.subtotal || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ongkir</span>
                <span>{formatCurrency(order.shipping || 0)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t font-bold text-lg">
                <span>Total</span>
                <span className="text-purple-600">{formatCurrency(order.total || 0)}</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Update Status</h3>
            <div className="space-y-2">
              {order.status === 'pending' && (
                <Button
                  variant="primary"
                  fullWidth
                  leftIcon={<Package className="w-4 h-4" />}
                  onClick={() => handleUpdateStatus('processing')}
                >
                  Proses Pesanan
                </Button>
              )}
              {order.status === 'processing' && (
                <Button
                  variant="primary"
                  fullWidth
                  leftIcon={<Truck className="w-4 h-4" />}
                  onClick={() => handleUpdateStatus('shipped')}
                >
                  Kirim Pesanan
                </Button>
              )}
              {order.status === 'shipped' && (
                <Button
                  variant="success"
                  fullWidth
                  leftIcon={<CheckCircle className="w-4 h-4" />}
                  onClick={() => handleUpdateStatus('delivered')}
                >
                  Pesanan Diterima
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
