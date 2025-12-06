import React, { useState } from 'react';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Alert from '../../components/common/Alert';

/**
 * Login Page Component
 * User authentication page
 */
const LoginPage = ({ onNavigateToRegister, onNavigateToHome, onNavigateToForgotPassword }) => {
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.email || !formData.password) {
      setError('Email dan password harus diisi');
      return;
    }

    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        // Login successful, redirect handled by AuthContext
        // Redirect will be handled in main App component
      } else {
        setError(result.error || 'Login gagal. Silakan coba lagi.');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center p-6">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Login Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onNavigateToHome}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Kembali ke Home</span>
        </button>

        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Selamat Datang!</h2>
          <p className="text-gray-600 mt-2">Masuk ke akun SellerAI Pro Anda</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="error" className="mb-6">
            {error}
          </Alert>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="nama@email.com"
            value={formData.email}
            onChange={handleChange}
            leftIcon={<Mail className="w-5 h-5" />}
            required
            disabled={loading}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              leftIcon={<Lock className="w-5 h-5" />}
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              onClick={onNavigateToForgotPassword}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              Lupa password?
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Atau masuk dengan</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            <span className="text-sm font-medium">Google</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
            <span className="text-sm font-medium">Facebook</span>
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Belum punya akun?{' '}
            <button
              onClick={onNavigateToRegister}
              className="text-purple-600 font-semibold hover:text-purple-700"
            >
              Daftar sekarang
            </button>
          </p>
        </div>

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>Demo Mode:</strong><br />
            • Email apapun = Login sebagai Seller<br />
            • Email "admin@sellerai.com" = Login sebagai Admin
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
