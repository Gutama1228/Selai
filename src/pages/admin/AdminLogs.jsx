import React, { useState } from 'react';
import { Search, Filter, Download, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { formatDate } from '../../utils/formatters';

const AdminLogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [logLevel, setLogLevel] = useState('all');

  // Mock logs data
  const logs = [
    {
      id: 1,
      timestamp: new Date().toISOString(),
      level: 'info',
      action: 'User Login',
      user: 'seller@test.com',
      details: 'Successful login from 192.168.1.1',
      ip: '192.168.1.1'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      level: 'success',
      action: 'Product Created',
      user: 'admin@sellerai.com',
      details: 'New product "Tas Ransel" added',
      ip: '192.168.1.2'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      level: 'warning',
      action: 'Failed Login Attempt',
      user: 'unknown@email.com',
      details: 'Invalid credentials',
      ip: '203.45.67.89'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      level: 'error',
      action: 'API Error',
      user: 'system',
      details: 'Database connection timeout',
      ip: 'internal'
    }
  ];

  const getLevelIcon = (level) => {
    switch (level) {
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getLevelVariant = (level) => {
    switch (level) {
      case 'error': return 'danger';
      case 'warning': return 'warning';
      case 'success': return 'success';
      default: return 'info';
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchLevel = logLevel === 'all' || log.level === logLevel;
    const matchSearch = !searchQuery || 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchLevel && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Logs</h1>
          <p className="text-gray-600 mt-1">Monitor aktivitas sistem dan user</p>
        </div>
        <Button
          variant="outline"
          leftIcon={<Download className="w-5 h-5" />}
        >
          Export Logs
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card padding="sm">
          <div className="text-sm text-gray-600 mb-1">Total Logs</div>
          <div className="text-2xl font-bold text-gray-900">{logs.length}</div>
        </Card>
        <Card padding="sm">
          <div className="text-sm text-gray-600 mb-1">Errors</div>
          <div className="text-2xl font-bold text-red-600">
            {logs.filter(l => l.level === 'error').length}
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-sm text-gray-600 mb-1">Warnings</div>
          <div className="text-2xl font-bold text-yellow-600">
            {logs.filter(l => l.level === 'warning').length}
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-sm text-gray-600 mb-1">Success</div>
          <div className="text-2xl font-bold text-green-600">
            {logs.filter(l => l.level === 'success').length}
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Cari logs berdasarkan action, user, atau detail..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={logLevel}
              onChange={(e) => setLogLevel(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Semua Level</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
            <Button variant="outline" leftIcon={<Filter className="w-5 h-5" />}>
              Filter
            </Button>
          </div>
        </div>
      </Card>

      {/* Logs Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  IP
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(log.timestamp, 'datetime')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getLevelIcon(log.level)}
                      <Badge variant={getLevelVariant(log.level)}>
                        {log.level}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {log.details}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {log.ip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogs;
