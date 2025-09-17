import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import { loginSuccess } from './store/slices/authSlice';
import { HelmetProvider } from 'react-helmet-async';

// Layout Components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Tours from './pages/Tours';
import Maps from './pages/Maps';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';

const AppContent: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you'd validate the token with your API
      // For demo purposes, we'll create a mock user
      const mockUser = {
        user: {
          id: '1',
          name: 'Demo User',
          email: 'demo@tamiltours.com',
          role: 'user' as const,
        },
        token: token,
      };
      dispatch(loginSuccess(mockUser));
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 rounded-full blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-20 w-96 h-96 bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-500 rounded-full blur-2xl opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-40 w-80 h-80 bg-gradient-to-br from-pink-400 via-orange-400 to-red-400 rounded-full blur-xl opacity-50 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 left-10 w-64 h-64 bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 rounded-full blur-xl opacity-70 animate-pulse delay-500"></div>
        <div className="absolute top-60 left-1/2 w-48 h-48 bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 rounded-full blur-lg opacity-80"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin>
                  <Admin />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <Router>
          <AppContent />
        </Router>
      </Provider>
    </HelmetProvider>
  );
}

export default App;