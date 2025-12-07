import React, { useState } from 'react';
import { MoreVertical, Edit, Trash2, Ban, CheckCircle } from 'lucide-react';
import Badge from '../common/Badge';

/**
 * UserTable Component
 * Display users in table format with actions
 */
const UserTable = ({ users = [], onEdit, onDelete, onToggleStatus }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <p className="text-gray-500">Belum ada data pengguna</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Pengguna
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Bergabung
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {user.user_metadata?.full_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {user.user_metadata?.full_name || 'User'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.user_metadata?.store_name || '-'}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={user.role === 'admin' ? 'warning' : 'info'}>
                    {user.role === 'admin' ? '👑 Admin' : '🛍️ Seller'}
                  </Badge>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={user.banned_until ? 'danger' : 'success'}>
                    {user.banned_until ? 'Suspended' : 'Aktif'}
                  </Badge>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.created_at 
                    ? new Date(user.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })
                    : '-'
                  }
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="relative inline-block">
                    <button
                      onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {selectedUser === user.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-10">
                        <button
                          onClick={() => {
                            onEdit?.(user);
                            setSelectedUser(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>

                        {user.role !== 'admin' && (
                          <>
                            <button
                              onClick={() => {
                                onToggleStatus?.(user);
                                setSelectedUser(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                            >
                              {user.banned_until ? (
                                <>
                                  <CheckCircle className="w-4 h-4" />
                                  Aktifkan
                                </>
                              ) : (
                                <>
                                  <Ban className="w-4 h-4" />
                                  Suspend
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => {
                                onDelete?.(user);
                                setSelectedUser(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                              Hapus
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
