import React, { useEffect, useState } from 'react'
import api from '../api/api'
import ProductCard from '../components/ProductCard'
import ProductSkeleton from '../components/ProductSkeleton'
import { Search, ChevronDown } from 'lucide-react'
import { mockProducts } from '../mockData'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [sortBy, setSortBy] = useState('latest')

  const categories = [
    { name: 'All Products', value: '' },
    { name: 'Face Care', value: 'Face Care' },
    { name: 'Body Care', value: 'Body Care' },
    { name: 'Hair Care', value: 'Hair Care' },
    { name: 'Lip Care', value: 'Lip Care' },
    { name: 'Bath', value: 'Bath' },
    { name: 'Combo', value: 'Combo' }
  ]

  useEffect(() => {
    setLoading(true)
    
    // Create a promise that rejects after 8 seconds
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timed out')), 8000)
    );

    // Race the API call against the timeout
    Promise.race([
      api.get('/products', { params: { q: search, category, limit: 50 } }),
      timeoutPromise
    ])
      .then(response => {
        const res = response; // response from api.get
        let allProducts = res.data.data || []
        
        // Filter by price
        allProducts = allProducts.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
        
        // Sort
        if (sortBy === 'low-to-high') {
          allProducts.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price))
        } else if (sortBy === 'high-to-low') {
          allProducts.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price))
        } else if (sortBy === 'popular') {
          allProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        }
        
        setProducts(allProducts)
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setProducts([]); // Set to empty array on failure to show the 'No products found' message.
      })
      .finally(() => setLoading(false))
  }, [search, category, priceRange, sortBy])

  return (
    <div
      className="min-h-screen py-8"
      style={{
        backgroundImage: 'url(/productbg.jpg)',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <div className="container mx-auto px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Our Collection</h1>
        <p className="text-gray-600">Browse our premium beauty collection</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 bg-white/80 p-8 rounded-lg">
        {/* Sidebar - Filters */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg p-6 border sticky top-24">
            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="input pl-10 text-sm"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-bold text-sm mb-3 uppercase">Categories</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={`block w-full text-left px-3 py-2 rounded transition ${
                      category === cat.value
                        ? 'bg-primary text-white font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-bold text-sm mb-3 uppercase">Price Range</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="price" checked={priceRange[1] === 500} onChange={() => setPriceRange([0, 500])} />
                  Under ₹500
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="price" checked={priceRange[1] === 1000} onChange={() => setPriceRange([0, 1000])} />
                  ₹500 - ₹1000
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="price" checked={priceRange[1] === 2000} onChange={() => setPriceRange([0, 2000])} />
                  ₹1000 - ₹2000
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="price" checked={priceRange[1] === 10000} onChange={() => setPriceRange([0, 10000])} />
                  All Prices
                </label>
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h3 className="font-bold text-sm mb-3 uppercase">Sort By</h3>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input w-full text-sm">
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(8).fill(0).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600 font-semibold">Showing <span className="text-primary font-bold">{products.length}</span> products</p>
                <div className="text-sm text-gray-500">
                  Page 1
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(p => <ProductCard key={p._id} product={p} />)}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4 text-lg">No products found</p>
              <button onClick={() => { setSearch(''); setCategory(''); setPriceRange([0, 10000]); }} className="btn-primary">
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}
