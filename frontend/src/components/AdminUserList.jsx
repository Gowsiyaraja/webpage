import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { Mail, Shield, Search } from 'lucide-react';

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/admin/users')
      .then(res => setUsers(res.data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Customers</h2>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search customers..." 
            className="input pl-10" 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-bold text-gray-700">Name</th>
              <th className="px-4 py-3 text-left font-bold text-gray-700">Email</th>
              <th className="px-4 py-3 text-left font-bold text-gray-700">Role</th>
              <th className="px-4 py-3 text-left font-bold text-gray-700">Joined</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3 text-gray-600 flex items-center gap-2">
                  <Mail size={14} /> {user.email}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {user.role === 'admin' && <Shield size={12} />} {user.role.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <p className="text-center py-8 text-gray-500">No customers found matching "{search}"</p>
        )}
      </div>
    </div>
  );
}