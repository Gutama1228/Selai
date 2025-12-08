import React from 'react';
import { Check, ArrowLeft } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { SUBSCRIPTION_PLANS } from '../../utils/constants';

const Pricing = ({ onNavigateToRegister, onNavigateToHome }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onNavigateToHome}
          className="flex items-center gap-2 text-white mb-8 hover:underline"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Home
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Pilih Paket Langganan
          </h1>
          <p className="text-xl text-white opacity-90">
            Tingkatkan bisnis dengan fitur yang tepat untuk Anda
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {Object.values(SUBSCRIPTION_PLANS).map(plan => (
            <div key={plan.id} className="relative">
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                    ⭐ PALING POPULER
                  </div>
                </div>
              )}

              <Card className={`h-full ${plan.popular ? 'ring-4 ring-yellow-400 shadow-2xl' : ''}`}>
                {/* Plan Header */}
                <div className="text-center mb-6 pt-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-1">
                    <span className="text-4xl font-bold text-purple-600">
                      Rp {(plan.priceMonthly / 1000).toFixed(0)}K
                    </span>
                    <span className="text-gray-600">/bulan</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    atau Rp {(plan.priceYearly / 1000).toFixed(0)}K/tahun (hemat 2 bulan!)
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  fullWidth
                  onClick={onNavigateToRegister}
                  className={plan.popular ? 'shadow-lg hover:shadow-xl' : ''}
                >
                  {plan.popular ? '🚀 Mulai Sekarang' : 'Pilih Paket'}
                </Button>
              </Card>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white/90 backdrop-blur">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Pertanyaan yang Sering Diajukan
            </h3>
            
            <div className="space-y-4">
              {[
                {
                  q: 'Apakah saya bisa upgrade atau downgrade paket?',
                  a: 'Ya! Anda bisa upgrade atau downgrade paket kapan saja. Perubahan akan berlaku di periode billing berikutnya.'
                },
                {
                  q: 'Bagaimana cara pembayaran?',
                  a: 'Kami menerima transfer bank, e-wallet, dan kartu kredit. Pembayaran aman dan terenkripsi.'
                },
                {
                  q: 'Apakah ada free trial?',
                  a: 'Ya! Semua paket mendapatkan free trial 7 hari. Tidak perlu kartu kredit untuk mendaftar.'
                },
                {
                  q: 'Bisakah saya cancel kapan saja?',
                  a: 'Tentu! Tidak ada kontrak jangka panjang. Anda bisa cancel kapan saja tanpa penalty.'
                }
              ].map((faq, idx) => (
                <div key={idx} className="border-b pb-4 last:border-0">
                  <div className="font-semibold text-gray-900 mb-2">{faq.q}</div>
                  <div className="text-gray-600">{faq.a}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12 text-white">
          <p className="text-lg mb-4">Dipercaya oleh 1000+ seller di Indonesia</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span>Money-back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span>Instant Activation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
