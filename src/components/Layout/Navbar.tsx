import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, MapPin, User, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/tours', label: 'Tours' },
    { path: '/maps', label: 'Maps' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl mx-4 md:mx-8 mt-6 px-6 py-4 relative z-50">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
  <img 
    src="https://bolt.new/~/sb1-xdx4k3bu/files/src/components/Layout/favicon-32x32.png" 
    alt="TamilToursLogo" 
    className="h-10 w-auto"
  />
  <span className="text-xl font-bold text-white">TamilTours</span>
</Link>

        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors ${
                location.pathname === link.path
                  ? 'text-cyan-400'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            <input
              type="text"
              placeholder="Search destination, district, resort..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent w-64"
            />
          </div>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-white/90">
                <User className="w-4 h-4" />
                <span className="text-sm">{user?.name}</span>
              </div>
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="backdrop-blur-lg bg-purple-500/20 border border-purple-400/30 text-purple-300 px-4 py-2 rounded-xl text-sm font-medium hover:bg-purple-500/30 transition-all"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="backdrop-blur-lg bg-red-500/20 border border-red-400/30 text-red-300 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-500/30 transition-all flex items-center space-x-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="backdrop-blur-lg bg-white/20 border border-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/30 transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-cyan-500 hover:to-blue-600 transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl mt-4 p-6">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  location.pathname === link.path
                    ? 'text-cyan-400'
                    : 'text-white/90 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              />
            </div>

            {isAuthenticated ? (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2 text-white/90">
                  <User className="w-4 h-4" />
                  <span>{user?.name}</span>
                </div>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="backdrop-blur-lg bg-purple-500/20 border border-purple-400/30 text-purple-300 px-4 py-2 rounded-xl text-sm font-medium hover:bg-purple-500/30 transition-all text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="backdrop-blur-lg bg-red-500/20 border border-red-400/30 text-red-300 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-500/30 transition-all flex items-center justify-center space-x-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="backdrop-blur-lg bg-white/20 border border-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/30 transition-all text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-cyan-500 hover:to-blue-600 transition-all text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;