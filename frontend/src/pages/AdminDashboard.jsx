import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import api from '../api/api'
import AdminOrderList from '../components/AdminOrderList'
import AdminProductList from '../components/AdminProductList'
import AdminUserList from '../components/AdminUserList'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Users, Package, ShoppingCart, DollarSign, LayoutDashboard, ListOrdered } from 'lucide-react'

function DashboardHome() {
  const [data, setData] = useState(null)
  const [salesData, setSalesData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/admin/dashboard'),
      api.get('/admin/analytics')
    ])
      .then(([dashRes, analyticsRes]) => {
        setData(dashRes.data)
        setSalesData(analyticsRes.data.salesByMonth)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center py-12"><div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

  const StatCard = ({ icon: Icon, label, value, color = 'text-primary' }) => (
    <div className="card flex items-center gap-4 hover:shadow-lg transition">
      <div className={`p-4 bg-primary/10 rounded-lg`}>
        <Icon size={32} className={color} />
      </div>
      <div>
        <p className="text-gray-600 text-sm font-medium">{label}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  )

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">📊 Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Users} label="Total Customers" value={data?.totalUsers || 0} />
        <StatCard icon={Package} label="Total Products" value={data?.totalProducts || 0} />
        <StatCard icon={ShoppingCart} label="Total Orders" value={data?.totalOrders || 0} />
        <StatCard icon={DollarSign} label="Total Revenue" value={`₹${data?.totalRevenue || 0}`} color="text-green-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 card">
          <h2 className="text-2xl font-bold mb-6">📈 Sales Analytics</h2>
          {salesData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData.map(d => ({ ...d, month: d._id?.month || 'N/A', sales: d.totalSales }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#d6336c" name="Sales (₹)" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-600 text-center py-12">No sales data available yet</p>
          )}
        </div>

        <div className="card h-fit">
          <h2 className="text-2xl font-bold mb-6">⚡ Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/admin?tab=products" className="w-full btn-primary text-left block">📦 Manage Products</Link>
            <Link to="/admin?tab=orders" className="w-full btn-secondary text-left block">📋 View All Orders</Link>
            <Link to="/admin?tab=users" className="w-full btn-primary text-left block">👥 Manage Users</Link>
            <Link to="/admin?tab=settings" className="w-full btn-secondary text-left block">⚙️ Settings</Link>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-6">📦 Recent Orders</h2>
        {data?.recentOrders && data.recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">Order ID</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">Customer</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">Amount</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map(order => (
                  <tr key={order._id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-mono text-sm">{order.orderNumber}</td>
                    <td className="px-4 py-3">{order.user?.email || 'Guest'}</td>
                    <td className="px-4 py-3 font-bold text-primary">₹{order.total}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : order.status === 'shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <Link to={`/admin/orders/${order._id}`} className="text-primary hover:underline text-sm font-bold">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-center py-12">No orders yet</p>
        )}
      </div>
    </>
  )
}

export default function AdminDashboard() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'dashboard';

  const NavLink = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition ${
        tab === to.split('=')[1] || (to === '/admin' && tab === 'dashboard')
          ? 'bg-primary text-white'
          : 'hover:bg-gray-100'
      }`}
    >
      <Icon size={20} />
      {children}
    </Link>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 flex-shrink-0">
          <div className="p-4 border rounded-lg sticky top-24">
            <h2 className="text-lg font-bold mb-4">Admin Menu</h2>
            <nav className="space-y-2">
              <NavLink to="/admin" icon={LayoutDashboard}>Dashboard</NavLink>
              <NavLink to="/admin?tab=orders" icon={ListOrdered}>Orders</NavLink>
              <NavLink to="/admin?tab=products" icon={Package}>Products</NavLink>
              <NavLink to="/admin?tab=users" icon={Users}>Customers</NavLink>
            </nav>
          </div>
        </aside>
        <div className="flex-1">
          {tab === 'dashboard' && <DashboardHome />}
          {tab === 'orders' && <AdminOrderList />}
          {tab === 'products' && <AdminProductList />}
          {tab === 'users' && <AdminUserList />}
          {tab === 'settings' && (
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">⚙️ Settings</h2>
              <p className="text-gray-600">Store configuration settings will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
