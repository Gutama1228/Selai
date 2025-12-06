import React, { useState } from 'react';
import { Camera, Sparkles, Copy, RotateCw, Download } from 'lucide-react';
import { generateImageSuggestions } from '../../services/claude';
import { CATEGORIES } from '../../utils/constants';
import { copyToClipboard } from '../../utils/helpers';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Alert from '../../components/common/Alert';
import toast from 'react-hot-toast';

/**
 * Image Generator Page
 * AI-powered product image suggestions
 */
const ImageGenerator = () => {
  const [formData, setFormData] = useState({
    productName: '',
    category: ''
  });
  const [suggestions, setSuggestions] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGenerate = async () => {
    if (!formData.productName.trim()) {
      toast.error('Nama produk harus diisi');
      return;
    }

    setIsGenerating(true);

    try {
      const { data, error } = await generateImageSuggestions(
        formData.productName,
        formData.category
      );

      if (error) {
        toast.error('Gagal generate saran');
        return;
      }

      setSuggestions(data);
      toast.success('Saran foto berhasil di-generate! 📸');
    } catch (error) {
      console.error('Generate error:', error);
      toast.error('Terjadi kesalahan');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(suggestions);
    if (success) {
      toast.success('Saran berhasil disalin! 📋');
    } else {
      toast.error('Gagal menyalin saran');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([suggestions], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `panduan-foto-${formData.productName.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Panduan berhasil didownload! 💾');
  };

  const handleReset = () => {
    setFormData({
      productName: '',
      category: ''
    });
    setSuggestions('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Generator Saran Foto Produk AI</h1>
        <p className="text-gray-600 mt-1">
          Dapatkan panduan lengkap untuk membuat foto produk yang profesional dengan bantuan AI
        </p>
      </div>

      {/* Info Banner */}
      <Alert variant="info">
        <strong>Catatan:</strong> AI akan memberikan saran detail tentang angle, lighting, background, 
        dan tips editing untuk membuat foto produk Anda terlihat profesional dan menarik!
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card
          title="Input Produk"
          subtitle="Masukkan informasi produk"
        >
          <div className="space-y-4">
            <Input
              label="Nama Produk"
              name="productName"
              placeholder="Contoh: Jam Tangan Smart Minimalis"
              value={formData.productName}
              onChange={handleChange}
              required
              disabled={isGenerating}
            />

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kategori (Opsional)
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isGenerating}
              >
                <option value="">Pilih Kategori...</option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Kategori membantu AI memberikan saran yang lebih spesifik
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="primary"
                fullWidth
                onClick={handleGenerate}
                disabled={isGenerating || !formData.productName.trim()}
                loading={isGenerating}
                leftIcon={<Camera className="w-5 h-5" />}
              >
                {isGenerating ? 'Generating...' : 'Generate Saran Foto'}
              </Button>
              {suggestions && (
                <Button
                  variant="outline"
                  onClick={handleReset}
                  leftIcon={<RotateCw className="w-5 h-5" />}
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Result */}
        <Card
          title="Saran & Panduan"
          subtitle={suggestions ? 'Panduan lengkap siap digunakan!' : 'Saran akan muncul di sini'}
          headerAction={
            suggestions && (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Copy className="w-4 h-4" />}
                  onClick={handleCopy}
                >
                  Copy
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Download className="w-4 h-4" />}
                  onClick={handleDownload}
                >
                  Download
                </Button>
              </div>
            )
          }
        >
          {suggestions ? (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg max-h-[500px] overflow-y-auto whitespace-pre-wrap text-sm border border-gray-200">
                {suggestions}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="success"
                  fullWidth
                  leftIcon={<Copy className="w-5 h-5" />}
                  onClick={handleCopy}
                >
                  Copy ke Clipboard
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  leftIcon={<Download className="w-5 h-5" />}
                  onClick={handleDownload}
                >
                  Download Panduan
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="font-semibold mb-2">Saran akan muncul di sini</p>
              <p className="text-sm">Masukkan nama produk dan klik Generate</p>
            </div>
          )}
        </Card>
      </div>

      {/* Tips Section */}
      <Card title="Tips Foto Produk yang Baik" variant="gradient">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-3xl mb-2">💡</div>
            <h3 className="font-bold text-gray-900 mb-2">Lighting yang Baik</h3>
            <p className="text-sm text-gray-600">
              Gunakan cahaya natural atau softbox untuk hasil yang optimal
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-3xl mb-2">📐</div>
            <h3 className="font-bold text-gray-900 mb-2">Komposisi Rapi</h3>
            <p className="text-sm text-gray-600">
              Perhatikan rule of thirds dan jarak objek dengan kamera
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-3xl mb-2">🎨</div>
            <h3 className="font-bold text-gray-900 mb-2">Background Bersih</h3>
            <p className="text-sm text-gray-600">
              Gunakan background polos atau yang tidak mengganggu fokus
            </p>
          </div>
        </div>
      </Card>

      {/* Best Practices */}
      <Card title="Best Practices" subtitle="Rekomendasi untuk foto produk e-commerce">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold text-green-600 mb-2 flex items-center gap-2">
              ✅ DO's
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Gunakan resolusi tinggi (minimal 1000x1000px)</li>
              <li>• Foto dari berbagai angle (depan, samping, detail)</li>
              <li>• Tampilkan ukuran/skala produk</li>
              <li>• Edit ringan untuk color correction</li>
              <li>• Konsisten dengan style brand</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-red-600 mb-2 flex items-center gap-2">
              ❌ DON'Ts
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Jangan over-edit sampai tidak natural</li>
              <li>• Hindari background berantakan</li>
              <li>• Jangan gunakan foto blur atau gelap</li>
              <li>• Hindari watermark yang mengganggu</li>
              <li>• Jangan screenshot foto orang lain</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ImageGenerator;
