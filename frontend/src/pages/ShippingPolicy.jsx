import React from 'react'
import { Link } from 'react-router-dom'

export default function ShippingPolicy() {
  return (
    <div 
      className="min-h-screen py-12"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/bg1.jpg)`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <div className="container max-w-4xl bg-pink-50/90 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>
      <div className="prose max-w-none text-gray-700 dark:text-gray-300">
        <p className="mb-4 text-sm">Last updated: {new Date().toLocaleDateString()}</p>

        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Processing:</strong> Orders are processed within 1-2 business days.</li>
          <li><strong>Shipping Rates:</strong> Standard (3-5 days): ₹50. Express (1-2 days): ₹100. Free on orders over ₹999.</li>
          <li><strong>Tracking:</strong> You will receive a tracking number via email once shipped.</li>
          <li><strong>Issues:</strong> We are not liable for shipping damages or lost packages. Please contact the carrier.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">Contact Us</h2>
        <p>Questions about your order? <Link to="/contact" className="text-primary hover:underline">Contact us</Link>.</p>
      </div>
    </div>
    </div>
  )
}