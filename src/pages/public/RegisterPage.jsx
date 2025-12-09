import React, { useState } from 'react';
import { UserPlus, Mail, Lock, User, Eye, EyeOff, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { validatePassword, isValidEmail } from '../../utils/validation'; // FIXED: Import dari validation.js
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const RegisterPage = ({ onNavigateToLogin, onNavigateToHome }) => {
  const { register, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    storeName: ''
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(null);

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });
    
    if (password) {
      const validation = validatePassword(password);
      setPasswordStrength(validation);
    } else {
      setPasswordStrength(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Nama lengkap wajib diisi';
    }

    if (!formData.email) {
      newErrors.email = 'Email wajib diisi';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await register(formData.email, formData.password, {
      full_name: formData.name,
      phone: formData.phone,
      store_name: formData.storeName
    });

    if (result.success) {
      // Navigation will be handled by App.jsx based on auth state
    }
  };

  const getStrengthColor = () => {
    if (!passwordStrength) return '';
    switch (passwordStrength.strength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  const getStrengthText = () => {
    if (!passwordStrength) return '';
    switch (passwordStrength.strength) {
      case 'weak': return 'Lemah';
      case 'medium': return 'Sedang';
      case 'strong': return 'Kuat';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <button
          onClick={onNavigateToHome}
          className="flex items-center gap-2 text-white mb-6 hover:underline"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Home
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Daftar Sekarang
            </h1>
            <p className="text-gray-600">
              Mulai tingkatkan penjualan dengan AI
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nama Lengkap"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
              leftIcon={<User className="w-5 h-5" />}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="nama@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              leftIcon={<Mail className="w-5 h-5" />}
              required
            />

            <div>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimal 8 karakter"
                value={formData.password}
                onChange={handlePasswordChange}
                error={errors.password}
                leftIcon={<Lock className="w-5 h-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                }
                required
              />

              {/* Password Strength Indicator */}
              {passwordStrength && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Kekuatan Password:</span>
                    <span className={`text-xs font-semibold ${
                      passwordStrength.strength === 'weak' ? 'text-red-600' :
                      passwordStrength.strength === 'medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${getStrengthColor()}`}
                      style={{
                        width: passwordStrength.strength === 'weak' ? '33%' :
                               passwordStrength.strength === 'medium' ? '66%' : '100%'
                      }}
                    />
                  </div>
                  {passwordStrength.errors.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {passwordStrength.errors.map((error, idx) => (
                        <li key={idx} className="text-xs text-red-600 flex items-center gap-1">
                          <XCircle className="w-3 h-3" />
                          {error}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <Input
              label="Nomor Telepon (Opsional)"
              type="tel"
              placeholder="08xx-xxxx-xxxx"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <Input
              label="Nama Toko (Opsional)"
              placeholder="Nama toko Anda"
              value={formData.storeName}
              onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
            >
              Daftar Sekarang
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-600">atau</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{' '}
              <button
                onClick={onNavigateToLogin}
                className="text-purple-600 font-semibold hover:underline"
              >
                Login di sini
              </button>
            </p>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-white mt-6 opacity-90">
          Dengan mendaftar, Anda menyetujui{' '}
          <a href="#" className="underline">Syarat & Ketentuan</a>
          {' '}dan{' '}
          <a href="#" className="underline">Kebijakan Privasi</a> kami
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
