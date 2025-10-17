import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, LogOut, Edit, Trash2, Eye, CheckCircle, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  
  const [items, setItems] = useState([
    { id: 1, name: 'Network Configuration A', status: 'Active', modified: '2024-03-15' },
    { id: 2, name: 'Network Configuration B', status: 'Inactive', modified: '2024-03-14' },
    { id: 3, name: 'Network Configuration C', status: 'Active', modified: '2024-03-13' }
  ]);

  // Check if user can edit (admin or regular user, but not readonly)
  const canEdit = user?.role === 'admin' || user?.role === 'user';

  const handleEdit = (id) => {
    const item = items.find(i => i.id === id);
    alert(`Editing: ${item.name}`);
  };

  const handleDelete = (id) => {
    const item = items.find(i => i.id === id);
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  const handleLogout = () => {
    logout();
  };

  const getRoleBadge = () => {
    if (user?.role === 'admin') {
      return { text: 'Admin - Full Access', color: 'bg-green-200 text-green-900 border border-green-400' };
    } else if (user?.role === 'user') {
      return { text: 'User - Read/Write', color: 'bg-blue-200 text-blue-900 border border-blue-400' };
    } else {
      return { text: 'Read Only', color: 'bg-yellow-200 text-yellow-900 border border-yellow-400' };
    }
  };

  const badge = getRoleBadge();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back, <span className="font-medium">{user?.name}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
                <Shield className="w-4 h-4" />
                {badge.text}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                data-cy="logout-button"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Configurations</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{items.length}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {items.filter(i => i.status === 'Active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Access Level</p>
                <p className="text-lg font-bold text-gray-900 mt-1">
                  {canEdit ? 'Full Access' : 'Read Only'}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                canEdit ? 'bg-blue-100' : 'bg-yellow-100'
              }`}>
                {canEdit ? (
                  <Edit className="w-6 h-6 text-blue-600" />
                ) : (
                  <Eye className="w-6 h-6 text-yellow-600" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Access Level Notice for Read-only users */}
        {!canEdit && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <p className="text-sm text-yellow-800">
                You have read-only access. Contact your administrator to request edit permissions.
              </p>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Network Configurations</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Modified
                  </th>
                  {canEdit && (
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.modified}
                    </td>
                    {canEdit && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4 inline-flex items-center gap-1"
                          data-cy={`edit-button-${item.id}`}
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                          data-cy={`delete-button-${item.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;