import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingCart, CreditCard, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import api from '../api/api'

export default function Cart() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const { cart, updateCartItem, removeFromCart, clearCart, cartCount } = useCart()
  const [loading, setLoading] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [address, setAddress] = useState({
    name: '',
    line1: '',
    city: '',
    state: '',
    postal: '',
    country: 'India',
    phone: ''
  })

  useEffect(() => {
    if (user) {
      setAddress(curr => ({
        ...curr,
        name: user.name || '',
        phone: user.phone || ''
      }))
    }
  }, [user])

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value })
  }

  const handleCheckout = async (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/login?redirect=/cart')
      return
    }

    if (!address.name || !address.line1 || !address.city || !address.state || !address.postal || !address.phone) {
      alert('Please fill in all shipping details')
      return
    }

    setLoading(true)
    try {
      const subtotal = cart.subtotal
      const shippingCost = 50
      const tax = Math.round(subtotal * 0.18)
      const total = subtotal + shippingCost + tax

      const orderData = {
        items: cart.items.map(item => ({
          product: item.product._id,
          qty: item.qty,
          price: item.discountPrice || item.price
        })),
        subtotal,
        tax,
        shippingCost,
        total,
        shippingAddress: address,
        paymentMethod: 'cod'
      }

      const response = await api.post('/orders', orderData)
      
      if (response.data) {
        clearCart()
        navigate('/dashboard?tab=orders')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert(error.response?.data?.message || 'Failed to process checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="container">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
            <Link to="/products" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cartCount} items)</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {showCheckout ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <button onClick={() => setShowCheckout(false)} className="text-gray-500 hover:text-primary">
                    <ArrowLeft size={24} />
                  </button>
                  <h2 className="text-xl font-bold">Shipping Details</h2>
                </div>
                
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input type="text" name="name" value={address.name} onChange={handleAddressChange} className="input w-full" required placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input type="tel" name="phone" value={address.phone} onChange={handleAddressChange} className="input w-full" required placeholder="10-digit mobile number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Address Line 1</label>
                    <input type="text" name="line1" value={address.line1} onChange={handleAddressChange} className="input w-full" required placeholder="House No, Building, Street" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <input type="text" name="city" value={address.city} onChange={handleAddressChange} className="input w-full" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">State</label>
                      <input type="text" name="state" value={address.state} onChange={handleAddressChange} className="input w-full" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Postal Code</label>
                      <input type="text" name="postal" value={address.postal} onChange={handleAddressChange} className="input w-full" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Country</label>
                      <input type="text" name="country" value={address.country} onChange={handleAddressChange} className="input w-full" disabled />
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {cart.items.map((item) => {
                  const itemPrice = item.discountPrice || item.price
                  const itemTotal = itemPrice * item.qty
                  
                  return (
                    <div key={item.product._id} className="flex gap-4 p-4 border-b">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.images?.[0] || 'https://via.placeholder.com/100x100?text=Product'} 
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1">
                        <Link to={`/products/${item.product._id}`} className="font-semibold hover:text-primary">
                          {item.product.title}
                        </Link>
                        <p className="text-gray-500 text-sm">{item.product.category}</p>
                        
                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateCartItem(item.product._id, item.qty - 1)}
                              className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-gray-100"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.qty}</span>
                            <button 
                              onClick={() => updateCartItem(item.product._id, item.qty + 1)}
                              disabled={item.qty >= item.product.stock}
                              className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          {/* Price */}
                          <div className="text-right">
                            <p className="font-bold text-lg">₹{itemTotal}</p>
                            {item.discountPrice && (
                              <p className="text-gray-400 text-sm line-through">₹{item.price * item.qty}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Remove Button */}
                      <button 
                        onClick={() => removeFromCart(item.product._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          
          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{cart.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">₹50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (18%)</span>
                  <span className="font-semibold">₹{Math.round(cart.subtotal * 0.18)}</span>
                </div>
              </div>
              
              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{cart.subtotal + 50 + Math.round(cart.subtotal * 0.18)}</span>
                </div>
              </div>
              
              {!showCheckout ? (
                <button onClick={() => setShowCheckout(true)} className="w-full btn-primary py-3 mb-2">
                  Proceed to Checkout
                </button>
              ) : (
                <button form="checkout-form" type="submit" disabled={loading} className="w-full btn-primary py-3 mb-2">
                  {loading ? 'Processing...' : 'Confirm Order (COD)'}
                </button>
              )}
              
              <button 
                onClick={clearCart}
                className="w-full text-red-500 hover:text-red-700 text-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
