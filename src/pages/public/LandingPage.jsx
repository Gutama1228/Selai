import React from 'react';
import { Sparkles, MessageSquare, Edit, Image, TrendingUp, Users, Star, ChevronRight, CheckCircle, Zap, Shield, Headphones } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Footer from '../../components/layout/Footer';

/**
 * Landing Page Component
 * Main homepage with full introduction
 */
const LandingPage = ({ onNavigateToLogin, onNavigateToRegister }) => {
  
  const features = [
    {
      icon: MessageSquare,
      title: 'AI Chat Assistant',
      description: 'Konsultasi strategi penjualan 24/7 dengan AI yang cerdas',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Edit,
      title: 'Generator Deskripsi',
      description: 'Buat deskripsi produk menarik & SEO-friendly otomatis',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Image,
      title: 'Generator Gambar AI',
      description: 'Dapatkan saran foto produk profesional dengan AI',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: TrendingUp,
      title: 'Analisis Trend',
      description: 'Prediksi trend pasar dan rekomendasi produk real-time',
      color: 'from-green-500 to-green-600'
    }
  ];

  const stats = [
    { value: '1,247+', label: 'Seller Aktif' },
    { value: '4.9/5', label: 'Rating' },
    { value: '50K+', label: 'Produk Terjual' },
    { value: '24/7', label: 'AI Support' }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Rp 99K',
      period: '/bulan',
      description: 'Cocok untuk pemula yang baru mulai',
      features: [
        '10 AI Requests per hari',
        'Basic Analytics',
        'Email Support',
        '1 Toko',
        'Export Data (PDF)',
        'Product Management'
      ],
      popular: false,
      color: 'border-gray-200'
    },
    {
      name: 'Professional',
      price: 'Rp 299K',
      period: '/bulan',
      description: 'Paling populer untuk seller profesional',
      features: [
        'Unlimited AI Requests',
        'Advanced Analytics',
        'Priority Support',
        '5 Toko',
        'Export Data (PDF, Excel)',
        'Trend Analysis',
        'Auto Sync Marketplace',
        'Bulk Upload'
      ],
      popular: true,
      color: 'border-purple-500'
    },
    {
      name: 'Enterprise',
      price: 'Rp 999K',
      period: '/bulan',
      description: 'Untuk bisnis skala besar',
      features: [
        'Unlimited Everything',
        '24/7 Dedicated Support',
        'Unlimited Toko',
        'Custom Integration',
        'API Access',
        'White Label Option',
        'Dedicated Account Manager',
        'Custom AI Training'
      ],
      popular: false,
      color: 'border-gray-200'
    }
  ];

  const testimonials = [
    {
      name: 'Ahmad Rizki',
      role: 'Seller Shopee',
      avatar: '👨',
      rating: 5,
      text: 'SellerAI Pro benar-benar membantu meningkatkan penjualan saya 300%! AI chat assistant-nya sangat membantu dalam memberikan strategi yang tepat.'
    },
    {
      name: 'Siti Nurhaliza',
      role: 'Seller Tokopedia',
      avatar: '👩',
      rating: 5,
      text: 'Generator deskripsi produknya luar biasa! Sekarang saya bisa upload produk 10x lebih cepat dengan deskripsi yang profesional.'
    },
    {
      name: 'Budi Santoso',
      role: 'Seller Multi Platform',
      avatar: '👨‍💼',
      rating: 5,
      text: 'Fitur analisis trend-nya sangat akurat. Saya bisa tahu produk apa yang akan trending sebelum kompetitor. Highly recommended!'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                SellerAI Pro
              </h1>
              <p className="text-xs text-gray-500">AI-Powered Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onNavigateToLogin}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Masuk
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onNavigateToRegister}
            >
              Daftar Gratis
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fadeIn">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              🚀 Platform #1 untuk Seller Indonesia
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Platform AI Terbaik untuk{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Seller Online Shop
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Tingkatkan penjualan di Shopee, Tokopedia, Lazada, dan TikTok Shop dengan teknologi AI terdepan. Otomatis, cepat, dan powerful!
            </p>
            
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={onNavigateToRegister}
                rightIcon={<ChevronRight className="w-5 h-5" />}
              >
                Mulai Gratis Sekarang
              </Button>
              <Button
                variant="outline"
                size="lg"
              >
                Lihat Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Demo Card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-white rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b">
                  <Sparkles className="w-8 h-8 text-purple-500" />
                  <div>
                    <div className="font-bold text-gray-800">AI Assistant</div>
                    <div className="text-sm text-gray-500">Online 24/7</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">Bagaimana cara meningkatkan penjualan?</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">Saya rekomendasikan: Optimasi judul, gunakan hashtag trending! 🚀</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Fitur Lengkap untuk Seller</h2>
          <p className="text-xl text-gray-600">Semua yang Anda butuhkan dalam satu platform</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              hover
              className="text-center"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Harga Terjangkau</h2>
          <p className="text-xl text-gray-600">Pilih paket yang sesuai dengan kebutuhan Anda</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`
                bg-white rounded-2xl p-8 shadow-xl border-2 ${plan.color}
                ${plan.popular ? 'transform scale-105' : ''}
                relative
              `}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold">
                    🔥 Paling Populer
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-purple-600">{plan.price}</span>
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                variant={plan.popular ? 'primary' : 'outline'}
                fullWidth
                size="lg"
                onClick={onNavigateToRegister}
              >
                Pilih Paket
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Apa Kata Mereka?</h2>
          <p className="text-xl text-gray-600">Testimoni dari seller yang sudah merasakan manfaatnya</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} padding="lg" className="text-center">
              <div className="text-6xl mb-4">{testimonial.avatar}</div>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
              <div className="font-bold text-gray-900">{testimonial.name}</div>
              <div className="text-sm text-gray-500">{testimonial.role}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            Siap Meningkatkan Penjualan Anda?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Bergabung dengan 1,247+ seller yang sudah sukses meningkatkan penjualan mereka!
          </p>
          <Button
            variant="secondary"
            size="xl"
            onClick={onNavigateToRegister}
          >
            Daftar Sekarang - GRATIS! 🚀
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer variant="full" />
    </div>
  );
};

export default LandingPage;
