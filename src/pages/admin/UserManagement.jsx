import React, { useState, useEffect } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { getAllUsers } from '../../services/supabase';
import UserTable from '../../components/admin/UserTable';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import toast from 'react-hot-toast';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data } = await getAllUsers();
      setUsers(data || []);
    } catch (error) {
      toast.error('Gagal memuat data pengguna');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    toast.info(`Edit user: ${user.email} (Coming soon)`);
  };

  const handleDelete = (user) => {
    toast.info(`Delete user: ${user.email} (Coming soon)`);
  };

  const handleToggleStatus = (user) => {
    toast.info(`Toggle status: ${user.email} (Coming soon)`);
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchSearch = !searchQuery || 
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.user_metadata?.full_name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchRole = roleFilter === 'all' || 
      (roleFilter === 'admin' && user.email?.includes('admin')) ||
      (roleFilter === 'seller' && !user.email?.includes('admin'));

    return matchSearch && matchRole;
  });

  if (loading) {
    return <Loading fullScreen text="Memuat data pengguna..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Pengguna</h1>
          <p className="text-gray-600 mt-1">{users.length} pengguna terdaftar</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<UserPlus className="w-5 h-5" />}
          onClick={() => toast.info('Tambah user (Coming soon)')}
        >
          Tambah User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card padding="sm">
          <div className="text-sm text-gray-600 mb-1">Total Users</div>
          <div className="text-2xl font-bold text-gray-900">{users.length}</div>
        </Card>
        <Card padding="sm">
          <div className="text-sm text-gray-600 mb-1">Admins</div>
          <div className="text-2xl font-bold text-purple-600">
            {users.filter(u => u.email?.includes('admin')).length}
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-sm text-gray-600 mb-1">Sellers</div>
          <div className="text-2xl font-bold text-blue-600">
            {users.filter(u => !u.email?.includes('admin')).length}
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-sm text-gray-600 mb-1">Active</div>
          <div className="text-2xl font-bold text-green-600">
            {users.filter(u => !u.banned_until).length}
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Cari user berdasarkan email atau nama..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>
          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Semua Role</option>
              <option value="admin">Admin</option>
              <option value="seller">Seller</option>
            </select>
          </div>
        </div>
      </Card>

      {/* User Table */}
      <UserTable
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
};

export default UserManagement;
