import React from 'react'
import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
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
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose max-w-none text-gray-700 dark:text-gray-300">
        <p className="mb-4 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        
        <p>At Blossom Beauty, we value your privacy. This policy outlines how we handle your data.</p>
        
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">Data Collection & Use</h2>
        <p>We collect basic information like your name, contact details, and payment info solely to process your orders and improve your shopping experience.</p>
        
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">Security & Cookies</h2>
        <p>Your data is protected with industry-standard security measures. We use cookies to enhance site functionality and user experience.</p>
        
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">Contact Us</h2>
        <p>For any privacy concerns, please <Link to="/contact" className="text-primary hover:underline">contact us</Link>.</p>
      </div>
    </div>
    </div>
  )
}