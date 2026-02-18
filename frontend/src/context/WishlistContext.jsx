import React, { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([])
  const [wishlistCount, setWishlistCount] = useState(0)

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('blossom_wishlist')
    if (savedWishlist) {
      try {
        const parsed = JSON.parse(savedWishlist)
        setWishlist(parsed)
        setWishlistCount(parsed.length || 0)
      } catch (e) {
        console.error('Error parsing wishlist from localStorage:', e)
      }
    }
  }, [])

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('blossom_wishlist', JSON.stringify(wishlist))
    setWishlistCount(wishlist.length)
  }, [wishlist])

  const addToWishlist = (product) => {
    const exists = wishlist.find(item => item._id === product._id)
    if (!exists) {
      setWishlist([...wishlist, product])
    }
  }

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item._id !== productId))
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId)
  }

  const toggleWishlist = (product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id)
    } else {
      addToWishlist(product)
    }
  }

  const clearWishlist = () => {
    setWishlist([])
  }

  const value = {
    wishlist,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
