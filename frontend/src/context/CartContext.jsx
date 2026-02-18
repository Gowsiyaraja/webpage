import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/api'
import { AuthContext } from './AuthContext'

const CartContext = createContext()

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext)
  const [cart, setCart] = useState({ items: [], subtotal: 0 })
  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(false)

  // Load cart from localStorage on mount (for simple cart)
  useEffect(() => {
    const savedCart = localStorage.getItem('blossom_cart')
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart)
        setCart(parsed)
        setCartCount(parsed.items?.length || 0)
      } catch (e) {
        console.error('Error parsing cart from localStorage:', e)
      }
    }
  }, [])

  // Sync with backend when user logs in
  useEffect(() => {
    if (user) {
      fetchCartFromBackend()
    } else {
      // Clear cart when user logs out
      setCart({ items: [], subtotal: 0 })
      setCartCount(0)
    }
  }, [user])

  // Save cart to localStorage when it changes (for simple cart)
  useEffect(() => {
    if (!user) {
      localStorage.setItem('blossom_cart', JSON.stringify(cart))
    }
  }, [cart, user])

  const fetchCartFromBackend = async () => {
    try {
      const res = await api.get('/cart')
      setCart(res.data)
      setCartCount(res.data.items?.length || 0)
    } catch (err) {
      console.error('Error fetching cart:', err)
    }
  }

  const addToCart = async (product, qty = 1) => {
    setLoading(true)
    try {
      if (user) {
        // Use backend API for logged in users
        const res = await api.post('/cart/add', {
          productId: product._id,
          qty
        })
        setCart(res.data)
        setCartCount(res.data.items?.length || 0)
      } else {
        // Use localStorage for non-logged in users
        const newItems = [...cart.items]
        const existingIndex = newItems.findIndex(
          item => item.product._id === product._id
        )

        if (existingIndex > -1) {
          newItems[existingIndex].qty += qty
        } else {
          newItems.push({
            product,
            qty,
            price: product.price,
            discountPrice: product.discountPrice
          })
        }

        const newSubtotal = newItems.reduce((total, item) => {
          const itemPrice = item.discountPrice || item.price
          return total + (itemPrice * item.qty)
        }, 0)

        setCart({ items: newItems, subtotal: newSubtotal })
        setCartCount(newItems.length)
      }
    } catch (err) {
      console.error('Error adding to cart:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateCartItem = async (productId, qty) => {
    setLoading(true)
    try {
      if (user) {
        const res = await api.put(`/cart/update/${productId}`, { qty })
        setCart(res.data)
        setCartCount(res.data.items?.length || 0)
      } else {
        const newItems = cart.items.map(item => {
          if (item.product._id === productId) {
            return { ...item, qty }
          }
          return item
        }).filter(item => item.qty > 0)

        const newSubtotal = newItems.reduce((total, item) => {
          const itemPrice = item.discountPrice || item.price
          return total + (itemPrice * item.qty)
        }, 0)

        setCart({ items: newItems, subtotal: newSubtotal })
        setCartCount(newItems.length)
      }
    } catch (err) {
      console.error('Error updating cart:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (productId) => {
    setLoading(true)
    try {
      if (user) {
        const res = await api.delete(`/cart/remove/${productId}`)
        setCart(res.data)
        setCartCount(res.data.items?.length || 0)
      } else {
        const newItems = cart.items.filter(
          item => item.product._id !== productId
        )

        const newSubtotal = newItems.reduce((total, item) => {
          const itemPrice = item.discountPrice || item.price
          return total + (itemPrice * item.qty)
        }, 0)

        setCart({ items: newItems, subtotal: newSubtotal })
        setCartCount(newItems.length)
      }
    } catch (err) {
      console.error('Error removing from cart:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const clearCart = async () => {
    setLoading(true)
    try {
      if (user) {
        await api.delete('/cart/clear')
      }
      setCart({ items: [], subtotal: 0 })
      setCartCount(0)
    } catch (err) {
      console.error('Error clearing cart:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const value = {
    cart,
    cartCount,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCartFromBackend
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
