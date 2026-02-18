import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { Edit, Trash2, Plus, AlertCircle, X } from 'lucide-react';

export default function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    api.get('/products?limit=1000')
      .then(res => setProducts(res.data.data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter(p => p._id !== id));
      } catch (err) {
        console.error('Failed to delete product', err);
        alert('Failed to delete product');
      }
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...newProduct,
        images: newProduct.image ? [newProduct.image] : []
      };
      const res = await api.post('/products', productData);
      setProducts([res.data, ...products]);
      setShowForm(false);
      setNewProduct({ title: '', category: '', price: '', stock: '', description: '', image: '' });
    } catch (err) {
      console.error('Failed to add product', err);
      alert('Failed to add product');
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <button className="btn-primary flex items-center gap-2" onClick={() => setShowForm(true)}>
          <Plus size={20} /> Add Product
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Product</h3>
              <button onClick={() => setShowForm(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input 
                type="text" 
                placeholder="Product Title" 
                className="input w-full" 
                value={newProduct.title}
                onChange={e => setNewProduct({...newProduct, title: e.target.value})}
                required 
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Category" 
                  className="input w-full" 
                  value={newProduct.category}
                  onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  required 
                />
                <input 
                  type="number" 
                  placeholder="Price" 
                  className="input w-full" 
                  value={newProduct.price}
                  onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number" 
                  placeholder="Stock" 
                  className="input w-full" 
                  value={newProduct.stock}
                  onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                  required 
                />
                <input 
                  type="text" 
                  placeholder="Image URL" 
                  className="input w-full" 
                  value={newProduct.image}
                  onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                />
              </div>
              <textarea 
                placeholder="Description" 
                className="input w-full h-24" 
                value={newProduct.description}
                onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                required
              ></textarea>
              <button type="submit" className="btn-primary w-full">Save Product</button>
            </form>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-bold text-gray-700">Product</th>
              <th className="px-4 py-3 text-left font-bold text-gray-700">Category</th>
              <th className="px-4 py-3 text-left font-bold text-gray-700">Price</th>
              <th className="px-4 py-3 text-left font-bold text-gray-700">Stock</th>
              <th className="px-4 py-3 text-left font-bold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-medium">{product.title}</td>
                <td className="px-4 py-3 text-gray-600">{product.category}</td>
                <td className="px-4 py-3 font-bold">₹{product.discountPrice || product.price}</td>
                <td className="px-4 py-3">
                  {product.stock > 0 ? <span className="text-green-600 font-bold">{product.stock}</span> : <span className="text-red-500 font-bold flex items-center gap-1"><AlertCircle size={14}/> Out of Stock</span>}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}