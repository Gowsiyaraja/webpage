import React from 'react'
import { Link } from 'react-router-dom'

export default function ReturnPolicy() {
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
      <h1 className="text-3xl font-bold mb-6">Return & Refund Policy</h1>
      <div className="prose max-w-none text-gray-700 dark:text-gray-300">
        <p className="mb-4 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        
        <p>We want you to be completely satisfied. Here is our simple return policy:</p>

        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Eligibility:</strong> Returns accepted within 7 days for unused, unopened items in original packaging.</li>
          <li><strong>Process:</strong> Contact <a href="mailto:gowsiyaraja@gmail.com" className="text-primary hover:underline">gowsiyaraja@gmail.com</a> to initiate a return.</li>
          <li><strong>Refunds:</strong> Processed to original payment method after inspection (7-10 days).</li>
          <li><strong>Shipping:</strong> Customer pays return shipping unless the item is defective.</li>
          <li><strong>Damages:</strong> Report damaged items immediately with photos.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">Contact Us</h2>
        <p>Need help? <Link to="/contact" className="text-primary hover:underline">Contact us</Link>.</p>
      </div>
    </div>
    </div>
  )
}