import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold text-pink-500 mb-4">Blossom</h3>
            <p className="text-sm">
              Your one-stop shop for premium beauty and skincare products. Embrace your natural glow with Blossom.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="hover:text-pink-500"><Facebook size={20} /></a>
              <a href="#" className="hover:text-pink-500"><Instagram size={20} /></a>
              <a href="#" className="hover:text-pink-500"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-pink-500">Products</Link></li>
              <li><Link to="/about-us" className="hover:text-pink-500">About Us</Link></li>
              <li><Link to="/faq" className="hover:text-pink-500">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-pink-500">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-pink-500">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-pink-500">Terms of Service</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-pink-500">Shipping Policy</Link></li>
              <li><Link to="/return-policy" className="hover:text-pink-500">Return Policy</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <Mail size={16} className="mr-3 mt-1 flex-shrink-0" />
                <a href="mailto:gowsiyaraja@gmail.com" className="hover:text-pink-500">gowsiyaraja@gmail.com</a>
              </li>
              <li className="flex items-start">
                <Phone size={16} className="mr-3 mt-1 flex-shrink-0" />
                <a href="tel:9942254017" className="hover:text-pink-500">9942254017</a>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-3 mt-1 flex-shrink-0" />
                <span>Coimbatore, Tamil Nadu, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Blossom Beauty Care. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;