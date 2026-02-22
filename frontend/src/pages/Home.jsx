import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api'
import ProductCard from '../components/ProductCard'
import ProductSkeleton from '../components/ProductSkeleton'
import { Sparkles, Leaf, Shield } from 'lucide-react'
import { mockProducts } from '../mockData'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timed out')), 15000) // Increased timeout
    );

    Promise.race([
      api.get('/products?limit=6'),
      timeoutPromise
    ])
      .then(res => setProducts(res.data.data || []))
      .catch(err => {
        console.error("Failed to fetch featured products:", err);
        setProducts(mockProducts.slice(0, 6)); // Fallback to mock data so site isn't empty
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="mx-auto">
      {/* Hero Section */}
      <section className="bg-pink-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-12 px-4">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
              Pure Ingredients, <br />
              <span className="text-primary">Visibly Beautiful</span> Skin.
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto md:mx-0">
              Discover our collection of natural, organic skincare essentials designed to make you glow.
            </p>
            <Link to="/products" className="btn-primary px-8 py-3 text-lg font-bold transition transform hover:scale-105">
              Explore Now →
            </Link>
          </div>
          <div className="md:w-1/2">
            <img src="/aboutus.png" alt="Blossom Beauty Products" className="rounded-lg shadow-2xl w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section className="container mx-auto px-4 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">✨ Featured Products</h2>
          <Link to="/products" className="text-primary hover:text-accent font-bold">View All →</Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-12 card bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Our shelves are currently empty!</h3>
            <p className="text-gray-500 mb-4">We're working on stocking up. Please check back soon or run the database seed script.</p>
            <Link to="/products" className="text-primary hover:underline font-semibold">Browse All Products</Link>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Skincare Routine?</h2>
        <p className="text-lg mb-6 opacity-90">Join thousands of happy customers discovering natural beauty</p>
        <Link to="/products" className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
          Shop Now
        </Link>
      </section>
    </div>
  )
}
