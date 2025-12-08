import React, { useState } from 'react';
import { ArrowLeft, Save, Wand2 } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { generateProductDescription } from '../../services/claude';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import { PLATFORMS, CATEGORIES } from '../../utils/constants';
import { isValidPrice, isValidStock } from '../../utils/validation';
import toast from 'react-hot-toast';

const ProductAdd = ({ onNavigate }) => {
  const { createProduct } = useProducts();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    platform: 'Shopee',
    description: '',
    image: '',
    status: 'active'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateDescription = async () => {
    if (!formData.name) {
      toast.error('Nama produk wajib diisi terlebih dahulu');
      return;
    }

    try {
      setGenerating(true);
      const { data } = await generateProductDescription({
        name: formData.name,
        category: formData.category,
        price: formData.price,
        platform: formData.platform
      });

      if (data?.description) {
        handleChange('description', data.description);
        toast.success('Deskripsi berhasil di-generate! ✨');
      }
    } catch (error) {
      toast.error('Gagal generate deskripsi');
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.price || !formData.stock) {
      toast.error('Nama, harga, dan stok wajib diisi');
      return;
    }

    const priceValidation = isValidPrice(formData.price);
    if (!priceValidation.isValid) {
      toast.error(priceValidation.error);
      return;
    }

    const stockValidation = isValidStock(formData.stock);
    if (!stockValidation.isValid) {
      toast.error(stockValidation.error);
      return;
    }

    try {
      setLoading(true);
      const result = await createProduct({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      });

      if (result.success) {
        onNavigate?.('products');
      }
    } catch (error) {
      console.error('Add product error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onNavigate?.('products')}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tambah Produk Baru</h1>
          <p className="text-gray-600 mt-1">Isi informasi produk Anda</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi Dasar</h2>
              
              <div className="space-y-4">
                <Input
                  label="Nama Produk"
                  placeholder="Contoh: Tas Ransel Premium"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Kategori
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
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
                      Platform
                    </label>
                    <select
                      value={formData.platform}
                      onChange={(e) => handleChange('platform', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {PLATFORMS.map(platform => (
                        <option key={platform.value} value={platform.label}>
                          {platform.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Harga (Rp)"
                    type="number"
                    placeholder="100000"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    required
                  />

                  <Input
                    label="Stok"
                    type="number"
                    placeholder="50"
                    value={formData.stock}
                    onChange={(e) => handleChange('stock', e.target.value)}
                    required
                  />
                </div>

                <Input
                  label="URL Gambar (Optional)"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                />
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Deskripsi Produk</h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  leftIcon={<Wand2 className="w-4 h-4" />}
                  onClick={handleGenerateDescription}
                  loading={generating}
                >
                  Generate AI
                </Button>
              </div>

              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Tulis deskripsi produk yang menarik..."
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <h3 className="font-bold text-gray-900 mb-4">Status Produk</h3>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={formData.status === 'active'}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-4 h-4 text-purple-600"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Aktif</div>
                    <div className="text-sm text-gray-600">Produk ditampilkan</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={formData.status === 'inactive'}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-4 h-4 text-purple-600"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Draft</div>
                    <div className="text-sm text-gray-600">Simpan sebagai draft</div>
                  </div>
                </label>
              </div>
            </Card>

            <Card>
              <h3 className="font-bold text-gray-900 mb-4">Tips Produk Laris</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✅ Gunakan foto berkualitas tinggi</li>
                <li>✅ Tulis deskripsi yang jelas dan lengkap</li>
                <li>✅ Set harga yang kompetitif</li>
                <li>✅ Update stok secara berkala</li>
                <li>✅ Gunakan AI untuk optimasi</li>
              </ul>
            </Card>

            <div className="space-y-3">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                leftIcon={<Save className="w-5 h-5" />}
                loading={loading}
              >
                Simpan Produk
              </Button>

              <Button
                type="button"
                variant="ghost"
                fullWidth
                onClick={() => onNavigate?.('products')}
              >
                Batal
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductAdd;
