import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';

/**
 * ContentEditor Component
 * Edit website content (landing page, features, etc)
 */
const ContentEditor = ({ content, onSave, onCancel }) => {
  const [editedContent, setEditedContent] = useState(content || {
    hero: {
      title: 'Platform AI untuk Online Seller Indonesia',
      subtitle: 'Tingkatkan penjualan dengan bantuan AI',
      cta: 'Mulai Gratis'
    },
    features: [
      {
        title: 'AI Chat Assistant',
        description: 'Konsultasi strategi penjualan 24/7'
      },
      {
        title: 'Generate Deskripsi',
        description: 'Buat deskripsi produk menarik otomatis'
      },
      {
        title: 'Analisis Trend',
        description: 'Prediksi trend pasar terkini'
      }
    ]
  });

  const handleHeroChange = (field, value) => {
    setEditedContent(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value
      }
    }));
  };

  const handleFeatureChange = (index, field, value) => {
    setEditedContent(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, [field]: value } : feature
      )
    }));
  };

  const handleSave = () => {
    onSave?.(editedContent);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Hero Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900">Hero Section</h3>
        
        <Input
          label="Title"
          value={editedContent.hero?.title || ''}
          onChange={(e) => handleHeroChange('title', e.target.value)}
          placeholder="Main headline"
        />

        <Input
          label="Subtitle"
          value={editedContent.hero?.subtitle || ''}
          onChange={(e) => handleHeroChange('subtitle', e.target.value)}
          placeholder="Subheadline"
        />

        <Input
          label="CTA Button Text"
          value={editedContent.hero?.cta || ''}
          onChange={(e) => handleHeroChange('cta', e.target.value)}
          placeholder="Call to action text"
        />
      </div>

      {/* Features Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900">Features</h3>
        
        {editedContent.features?.map((feature, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">Feature {index + 1}</span>
            </div>

            <Input
              label="Title"
              value={feature.title}
              onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
              placeholder="Feature title"
            />

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={feature.description}
                onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                placeholder="Feature description"
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t">
        <Button
          variant="ghost"
          leftIcon={<X className="w-4 h-4" />}
          onClick={onCancel}
        >
          Batal
        </Button>
        <Button
          variant="primary"
          leftIcon={<Save className="w-4 h-4" />}
          onClick={handleSave}
        >
          Simpan Perubahan
        </Button>
      </div>
    </div>
  );
};

export default ContentEditor;
