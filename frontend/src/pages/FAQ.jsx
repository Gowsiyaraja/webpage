import React from 'react'
import { Link } from 'react-router-dom'

export default function FAQ() {
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
      <div className="container bg-white/90 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      <div className="space-y-6 max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
        <div className="card">
          <h3 className="font-bold text-lg mb-2">What payment methods do you accept?</h3>
          <p>We accept all major credit cards (VISA, Mastercard, American Express), debit cards, UPI, and Cash on Delivery (COD) for your convenience.</p>
        </div>
        <div className="card">
          <h3 className="font-bold text-lg mb-2">How long does shipping take?</h3>
          <p>Standard shipping typically takes 3-5 business days. We also offer an express shipping option which takes 1-2 business days. You can find more details on our <Link to="/shipping-policy" className="text-primary hover:underline">Shipping Policy</Link> page.</p>
        </div>
        <div className="card">
          <h3 className="font-bold text-lg mb-2">Do you offer international shipping?</h3>
          <p>Currently, we only ship within India. We are working on expanding our services to other countries in the near future. Stay tuned for updates!</p>
        </div>
        <div className="card">
          <h3 className="font-bold text-lg mb-2">What is your return policy?</h3>
          <p>We have a 7-day return policy for items that are unopened, unused, and in their original packaging. For more detailed information, please visit our <Link to="/return-policy" className="text-primary hover:underline">Return Policy</Link> page.</p>
        </div>
        <div className="card">
          <h3 className="font-bold text-lg mb-2">Are your products cruelty-free?</h3>
          <p>Yes, all Blossom Beauty products are 100% cruelty-free. We are committed to ethical practices and do not test any of our products on animals.</p>
        </div>
        <div className="card">
          <h3 className="font-bold text-lg mb-2">Are your products suitable for sensitive skin?</h3>
          <p>Many of our products are formulated to be gentle and are suitable for sensitive skin. However, we always recommend performing a patch test before using any new skincare product. You can find ingredient lists on each product page to check for potential allergens.</p>
        </div>
        <div className="card">
          <h3 className="font-bold text-lg mb-2">How can I track my order?</h3>
          <p>Once your order has been shipped, you will receive an email with a tracking number and a link to the courier's website. You can use this to track the status of your delivery.</p>
        </div>
        <div className="card">
          <h3 className="font-bold text-lg mb-2">I have another question. How can I get in touch?</h3>
          <p>We'd love to hear from you! You can reach out to our customer support team through our <Link to="/contact" className="text-primary hover:underline">Contact Page</Link>, and we'll get back to you as soon as possible.</p>
        </div>
      </div>
    </div>
    </div>
  )
}