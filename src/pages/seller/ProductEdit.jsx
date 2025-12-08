import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import { PLATFORMS, CATEGORIES } from '../../utils/constants';
import toast from 'react-hot-toast';

const ProductEdit = ({ productId, onNavigate }) => {
  const { products, editProduct, removeProduct } = useProducts();
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setFormData(product);
    }
  }, [productId, products]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || formData.stock === undefined) {
      toast.error('Nama, harga, dan stok wajib diisi');
      return;
    }

    try {
      setLoading(true);
      await editProduct(productId, {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      });
      onNavigate?.('products');
    } catch (error) {
      console.error('Edit product error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await removeProduct(productId);
      setShowDeleteModal(false);
      onNavigate?.('products');
    } catch (error) {
      console.error('Delete product error:', error);
    }
  };

  if (!formData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Memuat produk...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate?.('products')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Produk</h1>
            <p className="text-gray-600 mt-1">{formData.name}</p>
          </div>
        </div>

        <Button
          variant="danger"
          leftIcon={<Trash2 className="w-5 h-5" />}
          onClick={() => setShowDeleteModal(true)}
        >
          Hapus Produk
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi Produk</h2>
              
              <div className="space-y-4">
                <Input
                  label="Nama Produk"
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
                      value={formData.category || ''}
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
                      value={formData.platform || 'Shopee'}
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
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    required
                  />

                  <Input
                    label="Stok"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleChange('stock', e.target.value)}
                    required
                  />
                </div>

                <Input
                  label="URL Gambar"
                  value={formData.image || ''}
                  onChange={(e) => handleChange('image', e.target.value)}
                  helperText="URL gambar produk dari internet"
                />
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Deskripsi Produk</h2>
              <textarea
                value={formData.description || ''}
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
                    <div className="font-semibold text-gray-900">Tidak Aktif</div>
                    <div className="text-sm text-gray-600">Produk disembunyikan</div>
                  </div>
                </label>
              </div>
            </Card>

            {formData.image && (
              <Card>
                <h3 className="font-bold text-gray-900 mb-3">Preview Gambar</h3>
                <img 
                  src={formData.image} 
                  alt={formData.name}
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
              </Card>
            )}

            <Card>
              <h3 className="font-bold text-gray-900 mb-3">Info Produk</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU</span>
                  <span className="font-semibold">{formData.sku || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Terjual</span>
                  <span className="font-semibold">{formData.sold || 0} unit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-semibold">⭐ {formData.rating || 0}</span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                leftIcon={<Save className="w-5 h-5" />}
                loading={loading}
              >
                Simpan Perubahan
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

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Hapus Produk"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
              Batal
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Hapus
            </Button>
          </>
        }
      >
        <p className="text-gray-700">
          Yakin ingin menghapus produk <strong>{formData.name}</strong>? 
          Tindakan ini tidak dapat dibatalkan.
        </p>
      </Modal>
    </div>
  );
};

export default ProductEdit;
