import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Heart, User, LogOut, LayoutDashboard } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function Header() {
  const { user, logout } = useContext(AuthContext)
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4">
        {/* Navigation Left */}
        <nav className="flex gap-8 items-center">
          <Link to="/" className="hover:text-primary transition font-medium text-sm md:text-base">Home</Link>
          <Link to="/products" className="hover:text-primary transition font-medium text-sm md:text-base">Products</Link>
          <Link to="/about-us" className="hover:text-primary transition font-medium text-sm md:text-base">About Us</Link>
          <Link to="/cart" title="Cart" className="hover:text-primary transition relative">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/wishlist" title="Wishlist" className="hover:text-primary transition relative">
            <Heart size={24} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Logo & Brand Right */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <img src="/logo.png" alt="Blossom" className="h-12 w-12 object-cover rounded-full border-2 border-primary" />
          <span className="hidden sm:inline text-sm font-bold text-primary">Blossom Beauty</span>
        </Link>

        {/* User Actions */}
        <div className="flex gap-4 items-center">
          {user ? (
            <div className="flex gap-2 items-center">
              {user.role === 'admin' && (
                <Link to="/admin" title="Admin Dashboard" className="hover:text-primary transition mr-2">
                  <LayoutDashboard size={24} />
                </Link>
              )}
              <Link to="/dashboard" title="My Account" className="hover:text-primary transition">
                <User size={24} />
              </Link>
              <button onClick={logout} title="Logout" className="text-red-500 hover:text-red-700">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-primary text-sm">Login</Link>
              <Link to="/register" className="btn-secondary text-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
