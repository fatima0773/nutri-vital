
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleFAQClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const faqSection = document.getElementById('faq');
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const faqSection = document.getElementById('faq');
        if (faqSection) {
          faqSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-natural p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-raleway font-bold">
                NutriVital
              </span>
            </div>
            <p className="text-gray-300 font-lato">
              Premium supplements for health-conscious consumers. Quality, transparency, and wellness in every product.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-nutri-green-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-nutri-green-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-nutri-green-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-raleway font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-nutri-green-400 transition-colors font-lato">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-nutri-green-400 transition-colors font-lato">
                  Products
                </Link>
              </li>
              <li>
                <button 
                  onClick={handleFAQClick}
                  className="text-gray-300 hover:text-nutri-green-400 transition-colors font-lato"
                >
                  FAQ
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-nutri-green-400 transition-colors font-lato">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-raleway font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-nutri-green-400" />
                <span className="text-gray-300 font-lato">support@nutrivital.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-nutri-green-400" />
                <span className="text-gray-300 font-lato">1-800-NUTRI-VIT</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-nutri-green-400" />
                <span className="text-gray-300 font-lato">123 Wellness Blvd, Health City, HC 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 font-lato text-sm">
              © 2024 NutriVital. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-nutri-green-400 text-sm font-lato transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-nutri-green-400 text-sm font-lato transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-nutri-green-400 text-sm font-lato transition-colors">
                Shipping Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
