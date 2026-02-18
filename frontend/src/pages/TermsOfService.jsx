import React from 'react'
import { Link } from 'react-router-dom'

export default function TermsOfService() {
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
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="prose max-w-none text-gray-700 dark:text-gray-300">
        <p className="mb-4 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        
        <p>By using Blossom Beauty, you agree to the following terms:</p>
        
        <ul className="list-disc pl-5 space-y-2 mt-4">
            <li><strong>Accounts:</strong> You are responsible for maintaining the confidentiality of your account and password.</li>
            <li><strong>Products:</strong> Prices and availability are subject to change without notice.</li>
            <li><strong>Usage:</strong> Content on this site is for personal, non-commercial use only.</li>
            <li><strong>Liability:</strong> We are not liable for any damages arising from the use of our site or products.</li>
            <li><strong>Law:</strong> These terms are governed by the laws of Tamil Nadu, India.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">Contact Us</h2>
        <p>If you have any questions about these Terms, please <Link to="/contact" className="text-primary hover:underline">contact us</Link>.</p>
      </div>
    </div>
    </div>
  )
}