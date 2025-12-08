import React, { useState } from 'react';
import { User, Mail, Phone, Store, Save } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { updateProfile } from '../../services/supabase';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.user_metadata?.full_name || '',
    phone: user?.user_metadata?.phone || '',
    store_name: user?.user_metadata?.store_name || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await updateProfile(formData);

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

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Saya</h1>
        <p className="text-gray-600 mt-1">Kelola informasi profile Anda</p>
      </div>

      <Card>
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
            {formData.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{formData.full_name || 'User'}</h3>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={user?.email || ''}
            leftIcon={<Mail className="w-5 h-5" />}
            disabled
            helperText="Email tidak bisa diubah"
          />

          <Input
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
            value={formData.full_name}
            onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
            leftIcon={<User className="w-5 h-5" />}
          />

          <Input
            label="Nomor Telepon"
            type="tel"
            placeholder="08xx-xxxx-xxxx"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            leftIcon={<Phone className="w-5 h-5" />}
          />

          <Input
            label="Nama Toko"
            placeholder="Nama toko Anda"
            value={formData.store_name}
            onChange={(e) => setFormData(prev => ({ ...prev, store_name: e.target.value }))}
            leftIcon={<Store className="w-5 h-5" />}
          />

          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              leftIcon={<Save className="w-5 h-5" />}
              loading={loading}
            >
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
