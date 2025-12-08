import React, { useState } from 'react';
import { Camera, Sparkles, Copy } from 'lucide-react';
import { generateImageSuggestions } from '../../services/claude';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import { CATEGORIES } from '../../utils/constants';
import { copyToClipboard } from '../../utils/helpers';
import toast from 'react-hot-toast';

const ImageGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [suggestions, setSuggestions] = useState('');

  const handleGenerate = async () => {
    if (!productName) {
      toast.error('Nama produk wajib diisi');
      return;
    }

    try {
      setLoading(true);
      const { data } = await generateImageSuggestions({
        name: productName,
        category: category
      });

      if (data?.suggestions) {
        setSuggestions(data.suggestions);
        toast.success('Saran foto berhasil di-generate! 📸');
      }
    } catch (error) {
      toast.error('Gagal generate saran foto');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(suggestions);
    if (success) {
      toast.success('Saran berhasil di-copy! 📋');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Generator Saran Foto Produk</h1>
        <p className="text-gray-600 mt-1">Dapatkan ide foto produk yang menarik dengan AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <Camera className="w-6 h-6 text-purple-500" />
            <h2 className="text-xl font-bold text-gray-900">Info Produk</h2>
          </div>

          <div className="space-y-4">
            <Input
              label="Nama Produk"
              placeholder="Contoh: Sepatu Sneakers Casual"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kategori
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

            <Button
              variant="primary"
              fullWidth
              leftIcon={<Sparkles className="w-5 h-5" />}
              onClick={handleGenerate}
              loading={loading}
            >
              Generate Saran Foto
            </Button>
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-2">💡 Tips Foto Produk</h4>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Gunakan lighting yang cukup</li>
              <li>• Background bersih & rapi</li>
              <li>• Foto dari berbagai angle</li>
              <li>• Tunjukkan detail produk</li>
              <li>• Gunakan tripod untuk stabilitas</li>
            </ul>
          </div>
        </Card>

        {/* Result */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Saran Foto</h2>
            {suggestions && (
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Copy className="w-4 h-4" />}
                onClick={handleCopy}
              >
                Copy
              </Button>
            )}
          </div>

          {!suggestions ? (
            <div className="text-center py-12 text-gray-500">
              <Camera className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Generate untuk mendapatkan saran foto profesional</p>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 p-4 bg-gray-50 rounded-lg">
                {suggestions}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Example Gallery */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">📸 Contoh Angle Foto Produk</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Hero Shot', desc: 'Angle lurus dari depan' },
            { name: 'Detail Shot', desc: 'Close-up fitur penting' },
            { name: 'Lifestyle', desc: 'Produk sedang digunakan' },
            { name: 'Flat Lay', desc: 'Top-down view' }
          ].map((type, idx) => (
            <div key={idx} className="p-4 border rounded-lg text-center">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
              <div className="font-semibold text-sm text-gray-900">{type.name}</div>
              <div className="text-xs text-gray-600">{type.desc}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ImageGenerator;
