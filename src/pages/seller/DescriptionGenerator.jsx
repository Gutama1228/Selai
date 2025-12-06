import React, { useState } from 'react';
import { Sparkles, Copy, RotateCw, Save, Download } from 'lucide-react';
import { generateProductDescription } from '../../services/claude';
import { PLATFORMS, CATEGORIES } from '../../utils/constants';
import { copyToClipboard } from '../../utils/helpers';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Alert from '../../components/common/Alert';
import toast from 'react-hot-toast';

/**
 * Description Generator Page
 * AI-powered product description generator
 */
const DescriptionGenerator = () => {
  const [formData, setFormData] = useState({
    productName: '',
    platform: 'Shopee',
    category: '',
    specs: ''
  });
  const [generatedDesc, setGeneratedDesc] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState([]);

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
      const { data, error } = await generateProductDescription(
        formData.productName,
        formData.platform,
        formData.category,
        formData.specs
      );

      if (error) {
        toast.error('Gagal generate deskripsi');
        return;
      }

      setGeneratedDesc(data);
      
      // Add to history
      setHistory(prev => [{
        id: Date.now(),
        productName: formData.productName,
        platform: formData.platform,
        description: data,
        timestamp: new Date().toISOString()
      }, ...prev.slice(0, 4)]); // Keep last 5

      toast.success('Deskripsi berhasil di-generate! 🎉');
    } catch (error) {
      console.error('Generate error:', error);
      toast.error('Terjadi kesalahan');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(generatedDesc);
    if (success) {
      toast.success('Deskripsi berhasil disalin! 📋');
    } else {
      toast.error('Gagal menyalin deskripsi');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedDesc], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deskripsi-${formData.productName.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Deskripsi berhasil didownload! 💾');
  };

  const handleReset = () => {
    setFormData({
      productName: '',
      platform: 'Shopee',
      category: '',
      specs: ''
    });
    setGeneratedDesc('');
  };

  const loadFromHistory = (item) => {
    setFormData({
      productName: item.productName,
      platform: item.platform,
      category: '',
      specs: ''
    });
    setGeneratedDesc(item.description);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Generator Deskripsi Produk AI</h1>
        <p className="text-gray-600 mt-1">
          Buat deskripsi produk yang menarik dan SEO-friendly secara otomatis dengan AI
        </p>
      </div>

      {/* Info Banner */}
      <Alert variant="info">
        <strong>Tips:</strong> Berikan informasi selengkap mungkin untuk hasil yang lebih baik. 
        AI akan membuat deskripsi yang persuasif dan optimized untuk marketplace!
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card
          title="Input Produk"
          subtitle="Masukkan detail produk Anda"
        >
          <div className="space-y-4">
            <Input
              label="Nama Produk"
              name="productName"
              placeholder="Contoh: Sepatu Running Nike Air Max 2024"
              value={formData.productName}
              onChange={handleChange}
              required
              disabled={isGenerating}
            />

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Platform Penjualan
              </label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isGenerating}
              >
                {PLATFORMS.map(platform => (
                  <option key={platform.value} value={platform.label}>
                    {platform.label}
                  </option>
                ))}
              </select>
            </div>

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
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Spesifikasi / Detail (Opsional)
              </label>
              <textarea
                name="specs"
                value={formData.specs}
                onChange={handleChange}
                placeholder="Contoh: Ukuran 40-44, Bahan mesh breathable, Sol rubber anti slip, Tersedia 3 warna..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                disabled={isGenerating}
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="primary"
                fullWidth
                onClick={handleGenerate}
                disabled={isGenerating || !formData.productName.trim()}
                loading={isGenerating}
                leftIcon={<Sparkles className="w-5 h-5" />}
              >
                {isGenerating ? 'Generating...' : 'Generate Deskripsi AI'}
              </Button>
              {generatedDesc && (
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
          title="Hasil Generate"
          subtitle={generatedDesc ? 'Deskripsi siap digunakan!' : 'Deskripsi akan muncul di sini'}
          headerAction={
            generatedDesc && (
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
          {generatedDesc ? (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg max-h-[500px] overflow-y-auto whitespace-pre-wrap text-sm border border-gray-200">
                {generatedDesc}
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
                  Download .txt
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="font-semibold mb-2">Deskripsi akan muncul di sini</p>
              <p className="text-sm">Masukkan nama produk dan klik Generate</p>
            </div>
          )}
        </Card>
      </div>

      {/* History */}
      {history.length > 0 && (
        <Card title="Riwayat Generate" subtitle={`${history.length} deskripsi terakhir`}>
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer border border-gray-200"
                onClick={() => loadFromHistory(item)}
              >
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 truncate">{item.productName}</div>
                  <div className="text-sm text-gray-500">
                    {item.platform} • {new Date(item.timestamp).toLocaleString('id-ID')}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Load
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default DescriptionGenerator;
