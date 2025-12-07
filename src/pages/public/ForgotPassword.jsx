import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Alert from '../../components/common/Alert';
import { resetPasswordForEmail } from '../../services/supabase';
import { isValidEmail } from '../../utils/validation';

/**
 * ForgotPassword Page
 * Reset password via email
 */
const ForgotPassword = ({ onNavigateToLogin }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!email) {
      setError('Email wajib diisi');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Format email tidak valid');
      return;
    }

    try {
      setLoading(true);
      const { error: resetError } = await resetPasswordForEmail(email);

      if (resetError) {
        setError(resetError);
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <button
          onClick={onNavigateToLogin}
          className="flex items-center gap-2 text-white mb-6 hover:underline"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Login
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Lupa Password?
            </h1>
            <p className="text-gray-600">
              Masukkan email Anda dan kami akan mengirimkan link reset password
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <Alert variant="success" className="mb-6">
              <div>
                <strong>Email terkirim!</strong>
                <p className="mt-1">
                  Cek inbox Anda dan klik link untuk reset password.
                </p>
              </div>
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert variant="error" className="mb-6">
              {error}
            </Alert>
          )}

          {/* Form */}
          {!success && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="email"
                label="Email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-5 h-5" />}
                required
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
              >
                Kirim Link Reset
              </Button>
            </form>
          )}

          {/* Already have link */}
          {success && (
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600 mb-4">
                Sudah punya link reset?
              </p>
              <Button
                variant="outline"
                onClick={onNavigateToLogin}
                fullWidth
              >
                Kembali ke Login
              </Button>
            </div>
          )}

          {/* Divider */}
          {!success && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Ingat password?{' '}
                <button
                  onClick={onNavigateToLogin}
                  className="text-purple-600 font-semibold hover:underline"
                >
                  Login di sini
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
