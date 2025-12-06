import React, { useState } from 'react';
import { Plus, Search, Filter, Grid, List, Download } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { PLATFORMS, CATEGORIES } from '../../utils/constants';
import ProductCard from '../../components/seller/ProductCard';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Loading from '../../components/common/Loading';
import Modal from '../../components/common/Modal';

/**
 * Products Page
 * View and manage all products
 */
const Products = ({ onNavigate }) => {
  const {
    products,
    loading,
    removeProduct,
    searchProducts,
    getProductsByStatus,
    getProductsByPlatform,
    getStatistics
  } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const stats = getStatistics();

  // Filter products
  const getFilteredProducts = () => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = searchProducts(searchQuery);
    }

    // Platform filter
    if (filterPlatform !== 'all') {
      filtered = filtered.filter(p => p.platform === filterPlatform);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(p => p.status === filterStatus);
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  // Handle delete product
  const handleDelete = async (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedProduct) {
      await removeProduct(selectedProduct.id);
      setShowDeleteModal(false);
      setSelectedProduct(null);
    }
  };

  // Handle view product
  const handleView = (product) => {
    // Navigate to product detail
    console.log('View product:', product);
  };

  // Handle edit product
  const handleEdit = (product) => {
    // Navigate to edit page
    console.log('Edit product:', product);
  };

  // Export products
  const handleExport = () => {
    const csv = [
      ['Nama', 'Platform', 'Kategori', 'Harga', 'Stok', 'Terjual', 'Status'].join(','),
      ...filteredProducts.map(p => [
        p.name,
        p.platform,
        p.category || '',
        p.price,
        p.stock,
        p.sales || 0,
        p.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `produk-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <Loading fullScreen text="Memuat produk..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produk Saya</h1>
          <p className="text-gray-600 mt-1">{products.length} produk terdaftar</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={handleExport}
          >
            Export
          </Button>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-5 h-5" />}
            onClick={() => onNavigate?.('products/add')}
          >
            Tambah Produk
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card padding="sm">
          <div className="text-sm text-gray-600 mb-1">Total Produk</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        </Card>
        <Card padding="sm">
          <div className="text-sm text-gray-600 mb-1">Produk Aktif</div>
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
        </Card>
        <Card padding="sm">
          <div className="text-sm text-gray-600 mb-1">Stok Rendah</div>
          <div className="text-2xl font-bold text-orange-600">{stats.lowStock}</div>
        </Card>
        <Card padding="sm">
          <div className="text-sm text-gray-600 mb-1">Total Terjual</div>
          <div className="text-2xl font-bold text-purple-600">{stats.totalSales}</div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="Cari produk berdasarkan nama, kategori, atau platform..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-5 h-5" />}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={showFilters ? 'primary' : 'outline'}
                leftIcon={<Filter className="w-5 h-5" />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filter
              </Button>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Platform
                </label>
                <select
                  value={filterPlatform}
                  onChange={(e) => setFilterPlatform(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">Semua Platform</option>
                  {PLATFORMS.map(platform => (
                    <option key={platform.value} value={platform.label}>
                      {platform.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">Semua Status</option>
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                  <option value="low_stock">Stok Rendah</option>
                  <option value="out_of_stock">Stok Habis</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Active Filters Display */}
      {(filterPlatform !== 'all' || filterStatus !== 'all' || searchQuery) && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">Filter aktif:</span>
          {searchQuery && (
            <Badge variant="primary">
              Pencarian: {searchQuery}
              <button onClick={() => setSearchQuery('')} className="ml-2">×</button>
            </Badge>
          )}
          {filterPlatform !== 'all' && (
            <Badge variant="info">
              Platform: {filterPlatform}
              <button onClick={() => setFilterPlatform('all')} className="ml-2">×</button>
            </Badge>
          )}
          {filterStatus !== 'all' && (
            <Badge variant="warning">
              Status: {filterStatus}
              <button onClick={() => setFilterStatus('all')} className="ml-2">×</button>
            </Badge>
          )}
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterPlatform('all');
              setFilterStatus('all');
            }}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Reset Semua Filter
          </button>
        </div>
      )}

      {/* Products Grid/List */}
      {filteredProducts.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {searchQuery || filterPlatform !== 'all' || filterStatus !== 'all'
                ? 'Tidak ada produk yang sesuai'
                : 'Belum ada produk'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || filterPlatform !== 'all' || filterStatus !== 'all'
                ? 'Coba ubah filter atau kata kunci pencarian'
                : 'Tambahkan produk pertama Anda untuk mulai berjualan'}
            </p>
            {!(searchQuery || filterPlatform !== 'all' || filterStatus !== 'all') && (
              <Button
                variant="primary"
                leftIcon={<Plus className="w-5 h-5" />}
                onClick={() => onNavigate?.('products/add')}
              >
                Tambah Produk Sekarang
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Hapus Produk"
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => setShowDeleteModal(false)}
            >
              Batal
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
            >
              Hapus
            </Button>
          </>
        }
      >
        <p className="text-gray-700">
          Yakin ingin menghapus produk <strong>{selectedProduct?.name}</strong>?
          Tindakan ini tidak dapat dibatalkan.
        </p>
      </Modal>
    </div>
  );
};

export default Products;
