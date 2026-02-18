import React, { useContext, useEffect, useState } from 'react'
import api from '../api/api'
import { AuthContext } from '../context/AuthContext'
import { Package, Heart, Settings, LogOut } from 'lucide-react'

export default function CustomerDashboard() {
  const { user, logout } = useContext(AuthContext)
  const [orders, setOrders] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('orders')

  useEffect(() => {
    Promise.all([
      api.get('/orders'),
      api.get('/users/wishlist')
    ])
      .then(([orderRes, wishRes]) => {
        setOrders(orderRes.data)
        setWishlist(wishRes.data)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center py-12"><div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">👤 My Dashboard</h1>
        <button onClick={logout} className="text-red-500 hover:text-red-700 flex gap-2 items-center">
          <LogOut size={20} /> Logout
        </button>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition whitespace-nowrap ${activeTab === 'orders' ? 'btn-primary' : 'bg-gray-200 text-gray-700'}`}
        >
          <Package size={20} /> Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition whitespace-nowrap ${activeTab === 'wishlist' ? 'btn-primary' : 'bg-gray-200 text-gray-700'}`}
        >
          <Heart size={20} /> Wishlist ({wishlist.length})
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition whitespace-nowrap ${activeTab === 'profile' ? 'btn-primary' : 'bg-gray-200 text-gray-700'}`}
        >
          <Settings size={20} /> Profile
        </button>
      </div>

      {activeTab === 'orders' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">📋 Order History</h2>
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order._id} className="card flex justify-between items-start hover:shadow-lg transition">
                  <div>
                    <p className="font-bold text-lg">{order.orderNumber}</p>
                    <p className="text-gray-600 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="text-gray-600 text-sm">{order.items?.length} items</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">₹{order.total}</p>
                    <span className={`inline-block px-3 py-1 rounded text-sm font-bold mt-2 ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : order.status === 'shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">No orders yet</p>
              <a href="/products" className="btn-primary inline-block">Start Shopping</a>
            </div>
          )}
        </div>
      )}

      {activeTab === 'wishlist' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">❤️ Wishlist</h2>
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlist.map(product => (
                <div key={product._id} className="card hover:shadow-lg transition">
                  <h3 className="font-bold mb-2">{product.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <p className="text-primary text-lg font-bold">₹{product.discountPrice || product.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <Heart size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Your wishlist is empty</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="card max-w-md">
          <h2 className="text-2xl font-bold mb-6">⚙️ Profile Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm font-medium">Name</label>
              <p className="font-bold text-lg">{user?.name}</p>
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium">Email</label>
              <p className="font-bold">{user?.email}</p>
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium">Phone</label>
              <p className="font-bold">{user?.phone || 'Not set'}</p>
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium">Account Role</label>
              <p className="font-bold capitalize text-primary">{user?.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
