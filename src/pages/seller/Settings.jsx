import React, { useState } from 'react';
import { User, Lock, Bell, Shield, Save } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { updateProfile, updatePassword } from '../../services/supabase';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user, refreshUser, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  // Profile form
  const [profileData, setProfileData] = useState({
    full_name: user?.user_metadata?.full_name || '',
    phone: user?.user_metadata?.phone || '',
    store_name: user?.user_metadata?.store_name || ''
  });

  // Password form
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const { error } = await updateProfile(profileData);
      
      if (error) {
        toast.error(error);
        return;
      }
      
      await refreshUser();
      toast.success('Profile berhasil diupdate! ✅');
    } catch (error) {
      toast.error('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Password tidak cocok');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast.error('Password minimal 8 karakter');
      return;
    }
    
    try {
      setLoading(true);
      const { error } = await updatePassword(passwordData.newPassword);
      
      if (error) {
        toast.error(error);
        return;
      }
      
      setPasswordData({ newPassword: '', confirmPassword: '' });
      toast.success('Password berhasil diubah! 🔒');
    } catch (error) {
      toast.error('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Keamanan', icon: Shield },
    { id: 'notifications', label: 'Notifikasi', icon: Bell }
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-600 mt-1">Kelola akun dan preferensi Anda</p>
      </div>

      {/* Tabs */}
      <Card padding="none">
        <div className="border-b">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
                  {profileData.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{profileData.full_name || 'User'}</h3>
                  <p className="text-gray-600">{user?.email}</p>
                  {isAdmin && (
                    <span className="inline-block mt-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                      👑 Admin
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  helperText="Email tidak bisa diubah"
                />

                <Input
                  label="Nama Lengkap"
                  placeholder="Masukkan nama lengkap"
                  value={profileData.full_name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                />

                <Input
                  label="Nomor Telepon"
                  type="tel"
                  placeholder="08xx-xxxx-xxxx"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                />

                <Input
                  label="Nama Toko"
                  placeholder="Nama toko Anda"
                  value={profileData.store_name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, store_name: e.target.value }))}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                leftIcon={<Save className="w-5 h-5" />}
                loading={loading}
              >
                Simpan Perubahan
              </Button>
            </form>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <form onSubmit={handleUpdatePassword} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Ubah Password</h3>
                
                <div className="space-y-4">
                  <Input
                    label="Password Baru"
                    type="password"
                    placeholder="Minimal 8 karakter"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    leftIcon={<Lock className="w-5 h-5" />}
                  />

                  <Input
                    label="Konfirmasi Password"
                    type="password"
                    placeholder="Ketik ulang password baru"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    leftIcon={<Lock className="w-5 h-5" />}
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                leftIcon={<Lock className="w-5 h-5" />}
                loading={loading}
              >
                Update Password
              </Button>
            </form>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Preferensi Notifikasi</h3>
              
              <div className="space-y-3">
                {[
                  { id: 'email_orders', label: 'Email untuk pesanan baru', desc: 'Terima notifikasi email saat ada pesanan baru' },
                  { id: 'email_products', label: 'Email untuk produk', desc: 'Update tentang produk yang perlu restock' },
                  { id: 'email_marketing', label: 'Email marketing', desc: 'Tips dan trik meningkatkan penjualan' },
                  { id: 'push_notifications', label: 'Push notifications', desc: 'Notifikasi real-time di browser' }
                ].map(setting => (
                  <label key={setting.id} className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 w-4 h-4 text-purple-600 rounded"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{setting.label}</div>
                      <div className="text-sm text-gray-600">{setting.desc}</div>
                    </div>
                  </label>
                ))}
              </div>

              <Button
                variant="primary"
                fullWidth
                leftIcon={<Save className="w-5 h-5" />}
                onClick={() => toast.success('Preferensi notifikasi disimpan!')}
              >
                Simpan Preferensi
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Settings;
