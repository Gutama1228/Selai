import React from 'react';
import { Package, Calendar, DollarSign, MapPin, MoreVertical } from 'lucide-react';
import Badge from '../common/Badge';
import { ORDER_STATUS } from '../../utils/constants';

/**
 * OrderCard Component
 * Display order information in card format
 */
const OrderCard = ({ order, onView, onUpdateStatus }) => {
  const statusConfig = ORDER_STATUS[order.status?.toUpperCase()] || ORDER_STATUS.PENDING;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-900 mb-1">
            {order.orderNo || order.id}
          </h3>
          <p className="text-sm text-gray-600">
            {order.customer || 'Customer'}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant={statusConfig.color}>
            {statusConfig.label}
          </Badge>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Package className="w-4 h-4" />
          <span>{order.items?.length || 1} item</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span className="font-semibold text-gray-900">
            Rp {(order.total || 0).toLocaleString('id-ID')}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            {order.createdAt 
              ? new Date(order.createdAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })
              : 'N/A'
            }
          </span>
        </div>

        {order.platform && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{order.platform}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onView?.(order)}
          className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
        >
          Lihat Detail
        </button>
        
        {order.status === 'pending' && (
          <button
            onClick={() => onUpdateStatus?.(order, 'processing')}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
          >
            Proses
          </button>
        )}

        {order.status === 'processing' && (
          <button
            onClick={() => onUpdateStatus?.(order, 'shipped')}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
          >
            Kirim
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
