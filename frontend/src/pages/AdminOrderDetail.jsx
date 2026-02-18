import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';
import { ArrowLeft, Package, User, MapPin, CreditCard, Edit } from 'lucide-react';

export default function AdminOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [isEditingStatus, setIsEditingStatus] = useState(false);

  const orderStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'];

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then(res => {
        setOrder(res.data);
        setStatus(res.data.status);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusUpdate = async () => {
    try {
      const res = await api.put(`/orders/${id}/status`, { status });
      setOrder(res.data);
      setIsEditingStatus(false);
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status.");
    }
  };

  if (loading) {
    return <div className="text-center py-12"><div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  if (!order) {
    return <div className="text-center py-12">Order not found.</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Link to="/admin?tab=orders" className="flex items-center gap-2 text-primary font-bold mb-6">
        <ArrowLeft size={20} />
        Back to All Orders
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold">Order #{order.orderNumber}</h1>
                <p className="text-gray-500">Placed on {new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                {isEditingStatus ? (
                  <div className="flex items-center gap-2">
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="input text-sm">
                      {orderStatuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                    <button onClick={handleStatusUpdate} className="btn-primary btn-sm">Save</button>
                    <button onClick={() => setIsEditingStatus(false)} className="btn-secondary btn-sm">Cancel</button>
                  </div>
                ) : (
                  <>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : order.status === 'shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {order.status.toUpperCase()}
                    </span>
                    <button onClick={() => setIsEditingStatus(true)} className="text-gray-500 hover:text-primary"><Edit size={16} /></button>
                  </>
                )}
              </div>
            </div>

            <h2 className="text-lg font-bold mb-4 border-t pt-4 flex items-center gap-2"><Package size={20} /> Items</h2>
            <div className="space-y-4">
              {order.items.map(item => (
                <div key={item.product._id} className="flex gap-4 items-center">
                  <img src={item.product.images?.[0] || 'https://via.placeholder.com/100'} alt={item.product.title} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-bold">{item.product.title}</p>
                    <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{item.price * item.qty}</p>
                    <p className="text-sm text-gray-500">(₹{item.price} each)</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="card">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><User size={20} /> Customer</h2>
            <p className="font-semibold">{order.shippingAddress.name}</p>
            <p className="text-gray-600">{order.user.email}</p>
            <p className="text-gray-600">{order.shippingAddress.phone}</p>
          </div>

          <div className="card">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><MapPin size={20} /> Shipping Address</h2>
            <p>{order.shippingAddress.line1}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postal}</p>
            <p>{order.shippingAddress.country}</p>
          </div>

          <div className="card">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><CreditCard size={20} /> Payment Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{order.subtotal}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>₹{order.shippingCost}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>₹{order.tax}</span></div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2"><span>Total</span><span>₹{order.total}</span></div>
            </div>
            <div className="mt-4">
              <p>Payment Method: <span className="font-semibold">{order.paymentMethod.toUpperCase()}</span></p>
              <p>Payment Status: <span className="font-semibold">{order.paymentStatus.toUpperCase()}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}