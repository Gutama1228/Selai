import React, { useState } from 'react';
import ContentEditor from '../../components/admin/ContentEditor';
import Card from '../../components/common/Card';
import toast from 'react-hot-toast';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('landing');

  const handleSave = (content) => {
    console.log('Saving content:', content);
    toast.success('Konten berhasil disimpan! ✅');
  };

  const handleCancel = () => {
    toast.info('Perubahan dibatalkan');
  };

  const tabs = [
    { id: 'landing', label: 'Landing Page' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Kelola Konten Website</h1>
        <p className="text-gray-600 mt-1">Edit konten halaman website</p>
      </div>

      <Card padding="none">
        <div className="border-b">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'landing' && (
            <ContentEditor
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}

          {activeTab === 'features' && (
            <div className="text-center py-12 text-gray-500">
              <p>Feature content editor coming soon...</p>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="text-center py-12 text-gray-500">
              <p>Pricing content editor coming soon...</p>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="text-center py-12 text-gray-500">
              <p>About content editor coming soon...</p>
            </div>
          )}
        </div>
      </Card>

      <Card>
        <h3 className="font-bold text-gray-900 mb-3">📱 Preview Mode</h3>
        <div className="space-y-3">
          <button className="w-full md:w-auto px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Desktop Preview
          </button>
          <button className="w-full md:w-auto px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ml-0 md:ml-3">
            Mobile Preview
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ContentManagement;
