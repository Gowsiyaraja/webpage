import React, { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend endpoint
    console.log('Form submitted:', formData);
    setFormStatus('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

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
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Have questions about our products or your order? We're here to help! Fill out the form or reach us via email or phone.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Mail size={24} />
              </div>
              <div>
                <p className="font-bold">Email</p>
                <a href="mailto:gowsiyaraja@gmail.com" className="text-gray-700 dark:text-gray-300 hover:text-primary">gowsiyaraja@gmail.com</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Phone size={24} />
              </div>
              <div>
                <p className="font-bold">Phone</p>
                <a href="tel:9942254017" className="text-gray-700 dark:text-gray-300 hover:text-primary">9942254017</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <p className="font-bold">Address</p>
                <p className="text-gray-700 dark:text-gray-300">Coimbatore, Tamil Nadu, India</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          {formStatus && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {formStatus}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="input w-full" placeholder="Your Name" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="input w-full" placeholder="your@email.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} className="input w-full h-32" placeholder="How can we help you?" required></textarea>
            </div>
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}