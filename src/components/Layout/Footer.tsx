import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Send } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative mt-20">
      {/* Newsletter Section */}
      <div className="px-4 md:px-8 mb-12">
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Stay Updated with Tamil Nadu Adventures</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Get the latest travel tips, new audio tours, and exclusive offers delivered to your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-cyan-500 hover:to-blue-600 transition-all flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>{subscribed ? 'Subscribed!' : 'Subscribe'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="backdrop-blur-lg bg-white/5 border-t border-white/10">
        <div className="px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="https://bolt.new/~/sb1-xdx4k3bu/files/favicon-32x32.png" 
                  alt="" 
                  className="h-10 w-auto"
                />
                <span className="text-2xl font-bold text-white">TamilTours</span>
              </div>

              <p className="text-white/80 mb-6 max-w-md">
                Your intelligent travel companion for exploring Tamil Nadu. Experience rich heritage, 
                stunning landscapes, and vibrant culture with our offline-capable platform.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-white/80 hover:text-cyan-400 transition-colors">Home</Link></li>
                <li><Link to="/tours" className="text-white/80 hover:text-cyan-400 transition-colors">Audio Tours</Link></li>
                <li><Link to="/maps" className="text-white/80 hover:text-cyan-400 transition-colors">Interactive Maps</Link></li>
                <li><Link to="/reviews" className="text-white/80 hover:text-cyan-400 transition-colors">Reviews</Link></li>
                <li><Link to="/contact" className="text-white/80 hover:text-cyan-400 transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-white/80">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>support@tamiltours.com</span>
                </div>
                <div className="flex items-center space-x-3 text-white/80">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-start space-x-3 text-white/80">
                  <MapPin className="w-4 h-4 text-cyan-400 mt-1" />
                  <span>123 Heritage Street<br />Chennai, Tamil Nadu 600001</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2024 TamilTours. All rights reserved. Made with ❤️ for Tamil Nadu tourism.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-cyan-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/60 hover:text-cyan-400 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-white/60 hover:text-cyan-400 text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;