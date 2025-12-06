import React from 'react';
import { Edit, Trash2, Eye, AlertCircle, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import Badge from '../common/Badge';

/**
 * Product Card Component
 * Display product information in card format
 */
const ProductCard = ({ 
  product,
  onEdit,
  onDelete,
  onView
}) => {
  const { 
    id,
    name,
    image,
    platform,
    price,
    stock,
    sales,
    status,
    category
  } = product;

  // Status badge variant
  const getStatusVariant = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      case 'low_stock':
        return 'warning';
      case 'out_of_stock':
        return 'danger';
      default:
        return 'default';
    }
  };

  // Status label
  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'inactive':
        return 'Tidak Aktif';
      case 'low_stock':
        return 'Stok Rendah';
      case 'out_of_stock':
        return 'Stok Habis';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow overflow-hidden group">
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center overflow-hidden">
        {image && typeof image === 'string' && image.startsWith('http') ? (
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="text-6xl">{image || '📦'}</div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant={getStatusVariant(status)} size="sm">
            {getStatusLabel(status)}
          </Badge>
        </div>

        {/* Platform Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="primary" size="sm">
            {platform}
          </Badge>
        </div>

        {/* Quick Actions (visible on hover) */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onView && onView(product)}
            className="p-2 bg-white rounded-lg hover:bg-gray-100 transition"
            title="Lihat Detail"
          >
            <Eye className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => onEdit && onEdit(product)}
            className="p-2 bg-white rounded-lg hover:bg-gray-100 transition"
            title="Edit"
          >
            <Edit className="w-5 h-5 text-blue-600" />
          </button>
          <button
            onClick={() => onDelete && onDelete(product)}
            className="p-2 bg-white rounded-lg hover:bg-gray-100 transition"
            title="Hapus"
          >
            <Trash2 className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Name & Category */}
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2">
            {name}
          </h3>
          {category && (
            <p className="text-xs text-gray-500">{category}</p>
          )}
        </div>

        {/* Price */}
        <div className="mb-3">
          <div className="text-2xl font-bold text-purple-600">
            {formatCurrency(price)}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-xs text-gray-500 mb-1">Stok</div>
            <div className={`font-bold ${stock <= 10 ? 'text-red-600' : 'text-gray-900'}`}>
              {stock} pcs
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-xs text-gray-500 mb-1">Terjual</div>
            <div className="font-bold text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {sales || 0}
            </div>
          </div>
        </div>

        {/* Low Stock Warning */}
        {stock <= 10 && stock > 0 && (
          <div className="flex items-center gap-2 p-2 bg-orange-50 border border-orange-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
            <p className="text-xs text-orange-700 font-medium">
              Stok hampir habis!
            </p>
          </div>
        )}

        {stock === 0 && (
          <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <p className="text-xs text-red-700 font-medium">
              Stok habis!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
