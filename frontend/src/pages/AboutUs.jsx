import React from 'react'
import { Heart, Leaf, Shield } from 'lucide-react'

export default function AboutUs() {
  return (
    <div 
      className="min-h-screen py-12"
      style={{
        backgroundImage: 'url(/aboutusbg.jpg)',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary via-secondary to-accent text-white py-16 mb-12">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">About Blossom Beauty</h1>
          <p className="text-xl opacity-90">Natural & Organic Skincare for Everyone</p>
        </div>
      </section>

      {/* Main Content - Large Image */}
      <section className="container mb-16">
        <div className="flex justify-center">
          <img 
            src="/aboutus.png" 
            alt="About Us - Our Products" 
            className="rounded-lg shadow-lg hover:shadow-xl transition w-full max-h-96 object-cover"
          />
        </div>
      </section>

      {/* Our Story with Logo */}
      <section className="container mb-16">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Logo */}
            <div className="flex justify-center">
              <img 
                src="/logo.png" 
                alt="Blossom Beauty Logo" 
                className="h-56 w-56 object-cover rounded-full border-4 border-primary shadow-xl hover:shadow-2xl transition"
              />
            </div>

            {/* Story Content */}
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Story</h2>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                At Blossom Beauty, we believe that everyone deserves access to beautiful, natural skincare products. Our journey started with a simple mission: to create premium beauty essentials that are affordable, effective, and made with nature's finest ingredients.
              </p>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                We carefully select each ingredient to ensure our products are safe, gentle, and perfect for all skin types. From our face washes to serums, every product is crafted with love and certified by dermatologists.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our commitment to quality and sustainability means we never compromise on ingredients. We're proud to offer cruelty-free, ethically sourced beauty products that make you glow better and feel confident.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="container mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
            <Leaf size={48} className="mx-auto text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">100% Natural</h3>
            <p className="text-gray-600">Made with premium natural ingredients sourced responsibly from trusted suppliers worldwide.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
            <Shield size={48} className="mx-auto text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Dermatologist Tested</h3>
            <p className="text-gray-600">Clinically tested and proven safe for all skin types, including sensitive and problematic skin.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
            <Heart size={48} className="mx-auto text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Cruelty Free</h3>
            <p className="text-gray-600">We never test on animals. 100% ethical, sustainable, and environmentally conscious beauty.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Blossom Beauty?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-20">
                <span className="text-lg font-bold">✓</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
              <p className="opacity-90">Every product is carefully formulated and tested to ensure the best results for your skin.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-20">
                <span className="text-lg font-bold">✓</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Affordable Prices</h3>
              <p className="opacity-90">We believe luxury skincare should be accessible to everyone. No compromise on quality.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-20">
                <span className="text-lg font-bold">✓</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Fast Shipping</h3>
              <p className="opacity-90">Get your favorite products delivered quickly and safely to your doorstep.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-20">
                <span className="text-lg font-bold">✓</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
              <p className="opacity-90">Our team is always ready to help with any questions or concerns about your order.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
