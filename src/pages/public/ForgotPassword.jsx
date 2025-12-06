import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { isValidEmail } from '../../utils/helpers';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Alert from '../../components/common/Alert';

/**
 * Forgot Password Page Component
 * Password reset request page
 */
const ForgotPassword = ({ onNavigateToLogin }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!isValidEmail(email)) {
      setError('Format email tidak valid');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real implementation, call resetPassword from Supabase
      setSuccess(true);
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Email Terkirim!
          </h2>
          <p className="text-gray-600 mb-6">
            Kami telah mengirimkan link reset password ke email <strong>{email}</strong>. 
            Silakan cek inbox atau folder spam Anda.
          </p>
          <Button
            variant="primary"
            fullWidth
            onClick={onNavigateToLogin}
          >
            Kembali ke Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onNavigateToLogin}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Kembali ke Login</span>
        </button>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Lupa Password?</h2>
          <p className="text-gray-600 mt-2">
            Masukkan email Anda dan kami akan mengirimkan link untuk reset password
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="error" className="mb-6">
            {error}
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-5 h-5" />}
            required
            disabled={loading}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Mengirim...' : 'Kirim Link Reset'}
          </Button>
        </form>

        {/* Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Tips:</strong> Pastikan email yang Anda masukkan adalah email yang terdaftar di akun SellerAI Pro Anda.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
