import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api'
import ProductCard from '../components/ProductCard'
import { Sparkles, Leaf, Shield } from 'lucide-react'
import { mockProducts } from '../mockData'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/products?limit=8')
      .then(res => setProducts(res.data.data || []))
      .catch(err => {
        console.error("Backend failed, using mock data", err)
        setProducts(mockProducts.slice(0, 8))
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <section className="text-white py-20 rounded-lg mb-16 shadow-lg bg-cover bg-center relative" style={{backgroundImage: 'url(/bg-hero.jpg)'}}>
        <div className="container relative z-10">
          <div className="flex flex-col items-start justify-center mb-4 gap-8 pl-12">
            <img src="/logo.png" alt="Blossom Beauty" className="h-64 w-64 object-cover rounded-full border-4 border-white shadow-lg" />
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Natural & Organic Skin<br />Care</h1>
              <p className="text-base opacity-100 font-semibold tracking-wide max-w-2xl text-gray-800">Glow better. Feel confident. Premium beauty essentials for every skin type.<br />Simple, affordable, and made just for you.</p>
            </div>
          </div>
          <div className="flex justify-start pl-12">
            <Link to="/products" className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition transform hover:scale-105">
              Explore Now →
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="card text-center hover:shadow-lg transition">
          <Leaf size={48} className="mx-auto text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">100% Natural</h3>
          <p className="text-gray-600">Made with premium natural ingredients from trusted sources</p>
        </div>
        <div className="card text-center hover:shadow-lg transition">
          <Shield size={48} className="mx-auto text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Dermatologist Tested</h3>
          <p className="text-gray-600">Clinically tested and safe for all skin types</p>
        </div>
        <div className="card text-center hover:shadow-lg transition">
          <Sparkles size={48} className="mx-auto text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Cruelty Free</h3>
          <p className="text-gray-600">No animal testing, 100% ethical & sustainable</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">✨ Featured Products</h2>
          <Link to="/products" className="text-primary hover:text-accent font-bold">View All →</Link>
        </div>
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Loading amazing products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">No products available yet</div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white rounded-lg py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Skincare Routine?</h2>
        <p className="text-lg mb-6 opacity-90">Join thousands of happy customers discovering natural beauty</p>
        <Link to="/products" className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
          Shop Now
        </Link>
      </section>
    </div>
  )
}
