import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product, 1)
      removeFromWishlist(product._id)
    } catch (err) {
      console.error('Error adding to cart:', err)
    }
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="container">
          <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 text-lg mb-4">Your wishlist is empty</p>
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
        <h1 className="text-3xl font-bold mb-8">My Wishlist ({wishlist.length} items)</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product._id} className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition group border">
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gray-100 h-72">
                <img 
                  src={product.images?.[0] || 'https://via.placeholder.com/300x300?text=Product'} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                
                {/* Remove from Wishlist Button */}
                <button 
                  onClick={() => removeFromWishlist(product._id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-red-500 hover:text-white transition"
                  title="Remove from Wishlist"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-bold text-base mb-2 line-clamp-2 text-gray-800">{product.title}</h3>
                
                {/* Pricing */}
                <div className="flex gap-2 items-center mb-4">
                  <span className="text-xl font-bold text-primary">₹{product.discountPrice || product.price}</span>
                  {product.discountPrice && (
                    <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className={`w-full py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                    product.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'btn-primary hover:shadow-md'
                  }`}
                >
                  <ShoppingCart size={18} />
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
