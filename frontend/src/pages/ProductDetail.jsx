import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/api'
import { ShoppingCart, Heart, Star, ArrowLeft, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart, loading: cartLoading } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const inWishlist = product ? isInWishlist(product._id) : false

  useEffect(() => {
    setLoading(true)
    api.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [id])

  const handleAddToCart = async () => {
    if (product.stock === 0) return
    
    try {
      await addToCart(product, quantity)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (err) {
      console.error('Error adding to cart:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600 text-lg mb-4">Product not found</p>
        <Link to="/products" className="btn-primary">
          Back to Products
        </Link>
      </div>
    )
  }

  const discountPercent = product.discountPrice
    ? Math.round((1 - product.discountPrice / product.price) * 100)
    : 0

  const rating = product.rating || 0
  const stars = Array(5).fill(0).map((_, i) => i < Math.floor(rating) ? 'full' : 'empty')

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Back Button */}
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-6">
          <ArrowLeft size={20} />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <img 
              src={product.images?.[0] || 'https://via.placeholder.com/600x600?text=Product'} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Category */}
            <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
              {product.category || 'Skincare'}
            </span>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {stars.map((star, idx) => (
                  <Star
                    key={idx}
                    size={20}
                    className={star === 'full' ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-gray-600">({rating.toFixed(1)} / 5)</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">{product.reviewCount || 0} reviews</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-primary">
                  ₹{product.discountPrice || product.price}
                </span>
                {product.discountPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ₹{product.price}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                      {discountPercent}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <span className="text-green-600 font-semibold">
                  ✓ In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-red-600 font-semibold">
                  ✗ Out of Stock
                </span>
              )}
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-gray-600 font-semibold mb-2">Quantity:</label>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                disabled={product.stock === 0 || cartLoading}
                onClick={handleAddToCart}
                className={`flex-1 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                  product.stock === 0 || cartLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : added
                      ? 'bg-green-500 text-white'
                      : 'btn-primary hover:shadow-md'
                }`}
              >
                {added ? (
                  <>
                    <Check size={20} />
                    Added to Basket!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Basket'}
                  </>
                )}
              </button>
              <button className="p-3 rounded-lg border hover:bg-gray-100 transition">
                <Heart size={24} />
              </button>
            </div>

            {/* Product Details */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="font-bold text-lg mb-4">Product Details</h3>
              <div className="space-y-2 text-gray-600">
                {product.sku && (
                  <p><span className="font-semibold">SKU:</span> {product.sku}</p>
                )}
                {product.tags && product.tags.length > 0 && (
                  <p><span className="font-semibold">Tags:</span> {product.tags.join(', ')}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
