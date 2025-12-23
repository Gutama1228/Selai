// src/pages/admin/SystemSettings.jsx
import React, { useState } from 'react';
import { Save, Shield, Bell, Mail, Database } from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'SellerAI Pro',
    siteUrl: 'https://selai.vercel.app',
    supportEmail: 'support@sellerai.com',
    maxUploadSize: '5',
    sessionTimeout: '30',
    enableRegistration: true,
    enableAI: true,
    maintenanceMode: false
  });

  const handleSave = () => {
    toast.success('Pengaturan berhasil disimpan! ⚙️');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pengaturan Sistem</h1>
        <p className="text-gray-600 mt-1">Konfigurasi sistem platform</p>
      </div>

      <Card>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          General Settings
        </h3>
        <div className="space-y-4">
          <Input
            label="Site Name"
            value={settings.siteName}
            onChange={(e) => setSettings({...settings, siteName: e.target.value})}
          />
          <Input
            label="Site URL"
            value={settings.siteUrl}
            onChange={(e) => setSettings({...settings, siteUrl: e.target.value})}
          />
          <Input
            label="Support Email"
            type="email"
            leftIcon={<Mail className="w-5 h-5" />}
            value={settings.supportEmail}
            onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
          />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5" />
          System Limits
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Max Upload Size (MB)"
            type="number"
            value={settings.maxUploadSize}
            onChange={(e) => setSettings({...settings, maxUploadSize: e.target.value})}
          />
          <Input
            label="Session Timeout (minutes)"
            type="number"
            value={settings.sessionTimeout}
            onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})}
          />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Feature Toggles
        </h3>
        <div className="space-y-3">
          {[
            { key: 'enableRegistration', label: 'Enable User Registration' },
            { key: 'enableAI', label: 'Enable AI Features' },
            { key: 'maintenanceMode', label: 'Maintenance Mode' }
          ].map(toggle => (
            <label key={toggle.key} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={settings[toggle.key]}
                onChange={(e) => setSettings({...settings, [toggle.key]: e.target.checked})}
                className="w-4 h-4 text-purple-600 rounded"
              />
              <span className="font-medium text-gray-900">{toggle.label}</span>
            </label>
          ))}
        </div>
      </Card>

      <Button
        variant="primary"
        fullWidth
        leftIcon={<Save className="w-5 h-5" />}
        onClick={handleSave}
      >
        Simpan Pengaturan
      </Button>
    </div>
  );
};

export default SystemSettings;
