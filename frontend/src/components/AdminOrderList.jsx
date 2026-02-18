import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { Search } from 'lucide-react';

export default function AdminOrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/admin/orders')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
        setOrders(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders = orders.filter(order => 
    (order.orderNumber || '').toLowerCase().includes(search.toLowerCase()) ||
    (order.user?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (order.user?.email || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-12"><div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Orders</h2>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="input pl-10" 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-gray-700">Order #</th>
                <th className="px-4 py-3 text-left font-bold text-gray-700">Customer</th>
                <th className="px-4 py-3 text-left font-bold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left font-bold text-gray-700">Total</th>
                <th className="px-4 py-3 text-left font-bold text-gray-700">Payment</th>
                <th className="px-4 py-3 text-left font-bold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order._id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-mono text-sm">{order.orderNumber || 'N/A'}</td>
                  <td className="px-4 py-3">{order.user?.name || 'Guest'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 font-bold text-primary">₹{order.total}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${order.paymentStatus === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {(order.paymentStatus || 'pending').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : order.status === 'shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {(order.status || 'pending').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link to={`/admin/orders/${order._id}`} className="btn-secondary btn-sm">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 text-center py-12">No orders found matching "{search}"</p>
      )}
    </div>
  );
}