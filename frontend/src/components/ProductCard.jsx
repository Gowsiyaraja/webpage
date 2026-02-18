import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Heart, Star, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function ProductCard({ product }) {
  const { addToCart, loading } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const [added, setAdded] = useState(false)
  
  const discountPercent = product.discountPrice
    ? Math.round((1 - product.discountPrice / product.price) * 100)
    : 0
  
  const rating = product.rating || 0
  const stars = Array(5).fill(0).map((_, i) => i < Math.floor(rating) ? 'full' : 'empty')
  const inWishlist = isInWishlist(product._id)

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (product.stock === 0) return
    
    try {
      await addToCart(product, 1)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (err) {
      console.error('Error adding to cart:', err)
    }
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }
  
  return (
    <Link to={`/products/${product._id}`} className="block h-full">
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition group border h-full">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100 h-72">
        <img src={product.images?.[0] || 'https://via.placeholder.com/300x300?text=Product'} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
          {product.category || 'Skincare'}
        </div>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            -{discountPercent}%
          </div>
        )}

        {/* Stock Status */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="text-white font-bold text-lg">OUT OF STOCK</span>
          </div>
        )}

        {/* Wishlist Button */}
        <button 
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition ${inWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'}`}
          title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart size={18} fill={inWishlist ? "white" : "none"} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col">
        {/* Title */}
        <h3 className="font-bold text-base mb-2 line-clamp-2 text-gray-800">{product.title}</h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {stars.map((star, idx) => (
              <Star
                key={idx}
                size={14}
                className={star === 'full' ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({rating.toFixed(1)})</span>
        </div>

        {/* Pricing */}
        <div className="mb-3">
          <div className="flex gap-2 items-center">
            <span className="text-xl font-bold text-primary">₹{product.discountPrice || product.price}</span>
            {product.discountPrice && (
              <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button 
          disabled={product.stock === 0 || loading}
          onClick={handleAddToCart}
          className={`w-full py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
            product.stock === 0 || loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : added
                ? 'bg-green-500 text-white'
                : 'btn-primary hover:shadow-md'
          }`}
        >
          {added ? (
            <>
              <Check size={18} />
              Added to Basket!
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Basket'}
            </>
          )}
        </button>
      </div>
    </div>
    </Link>
  )
}
