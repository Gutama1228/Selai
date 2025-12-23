// src/pages/admin/UserDetail.jsx
import React from 'react';
import { ArrowLeft, Mail, Phone, Store, Calendar } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const UserDetail = ({ userId, onNavigate }) => {
  // Mock user data
  const user = {
    id: userId || '1',
    email: 'seller@test.com',
    name: 'Demo Seller',
    phone: '081234567890',
    storeName: 'Demo Shop',
    role: 'seller',
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '2024-12-09',
    stats: {
      products: 15,
      orders: 47,
      revenue: 12500000
    }
  };

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
          <p className="text-gray-600 mt-1">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Informasi User</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-semibold">{user.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Phone</div>
                  <div className="font-semibold">{user.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Store className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Store Name</div>
                  <div className="font-semibold">{user.storeName}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Member Since</div>
                  <div className="font-semibold">{user.createdAt}</div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Statistik</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{user.stats.products}</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{user.stats.orders}</div>
                <div className="text-sm text-gray-600">Orders</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  Rp {(user.stats.revenue / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-gray-600">Revenue</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Role</span>
                <Badge variant="info">{user.role}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <Badge variant="success">{user.status}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Login</span>
                <span className="text-sm">{user.lastLogin}</span>
              </div>
            </div>
          </Card>

          <div className="space-y-2">
            <Button variant="outline" fullWidth>Edit User</Button>
            <Button variant="danger" fullWidth>Suspend User</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
