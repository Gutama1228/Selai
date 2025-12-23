import React, { useState } from 'react';
import { TrendingUp, Sparkles } from 'lucide-react';
import { analyzeTrends } from '../../services/claude';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { CATEGORIES } from '../../utils/constants';
import toast from 'react-hot-toast';

const TrendAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [keywords, setKeywords] = useState('');
  const [analysis, setAnalysis] = useState('');

  const handleAnalyze = async () => {
    if (!category) {
      toast.error('Kategori wajib dipilih');
      return;
    }

    try {
      setLoading(true);
      const keywordArray = keywords ? keywords.split(',').map(k => k.trim()) : [];
      const { data } = await analyzeTrends(category, keywordArray);

      if (data?.analysis) {
        setAnalysis(data.analysis);
        toast.success('Analisis trend berhasil! 📊');
      }
    } catch (error) {
      toast.error('Gagal analisis trend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analisis Trend Pasar</h1>
        <p className="text-gray-600 mt-1">Dapatkan insight trend pasar dengan AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-purple-500" />
            <h2 className="text-xl font-bold text-gray-900">Pilih Kategori</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kategori Produk <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Pilih Kategori</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Keywords (Optional)
              </label>
              <input
                type="text"
                placeholder="Contoh: premium, murah, bestseller (pisahkan dengan koma)"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Pisahkan dengan koma untuk multiple keywords
              </p>
            </div>

            <Button
              variant="primary"
              fullWidth
              leftIcon={<Sparkles className="w-5 h-5" />}
              onClick={handleAnalyze}
              loading={loading}
            >
              Analisis Trend
            </Button>
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-2">💡 Tips Analisis</h4>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Pilih kategori yang paling relevan</li>
              <li>• Gunakan keywords spesifik</li>
              <li>• Analisis secara berkala</li>
              <li>• Gabungkan dengan data penjualan</li>
            </ul>
          </div>
        </Card>

        {/* Result */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Hasil Analisis</h2>

          {!analysis ? (
            <div className="text-center py-12 text-gray-500">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Pilih kategori dan klik Analisis untuk melihat trend</p>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 p-4 bg-gray-50 rounded-lg max-h-[600px] overflow-y-auto">
                {analysis}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="font-bold text-gray-900 mb-3">🔥 Trending Now</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Sustainable products</li>
            <li>• Smart home devices</li>
            <li>• Health & wellness</li>
            <li>• Work from home gear</li>
          </ul>
        </Card>

        <Card>
          <h3 className="font-bold text-gray-900 mb-3">📈 Rising Categories</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Eco-friendly products (+35%)</li>
            <li>• Gaming accessories (+28%)</li>
            <li>• Home fitness (+22%)</li>
            <li>• Pet supplies (+18%)</li>
          </ul>
        </Card>

        <Card>
          <h3 className="font-bold text-gray-900 mb-3">💰 Price Points</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Budget: &lt; Rp 100K</li>
            <li>• Mid-range: Rp 100-500K</li>
            <li>• Premium: Rp 500K-1M</li>
            <li>• Luxury: &gt; Rp 1M</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default TrendAnalysis;
