import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Play, Map, Star, User, Clock, Users, Download, ArrowRight, MapPin, Headphones, Wifi, WifiOff } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { tours } = useSelector((state: RootState) => state.tours);

  const featuredTours = tours.slice(0, 3);

  const features = [
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Audio Tours",
      description: "Self-guided tours in Tamil and English with local insights",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: <WifiOff className="w-8 h-8" />,
      title: "Offline Maps",
      description: "Download detailed maps and navigate without internet",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Resort Reviews",
      description: "Authentic reviews and ratings from real travelers",
      color: "from-orange-400 to-red-500"
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "AI Recommendations",
      description: "Personalized suggestions based on your preferences",
      color: "from-green-400 to-teal-500"
    }
  ];

  const districts = [
    { name: 'Madurai', places: 15, image: 'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Chennai', places: 22, image: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Ooty', places: 18, image: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Kanyakumari', places: 12, image: 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Tirunelveli', places: 14, image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Coimbatore', places: 16, image: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=300' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to tours page with search query
      window.location.href = `/tours?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative px-4 md:px-8 mt-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl">
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12">
              <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 leading-tight mb-6">
                Discover Tamil Nadu Like Never Before
              </h1>
              
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                Experience rich heritage, vibrant landscapes, and authentic culture with our intelligent travel platform. 
                Get offline maps, audio tours, and personalized recommendations – even without internet connectivity.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search your dream Tamil Nadu destination..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent text-lg"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-cyan-500 hover:to-blue-600 transition-all"
                  >
                    Search
                  </button>
                </div>
              </form>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/tours"
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-cyan-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Start Exploring</span>
                </Link>
                <button className="backdrop-blur-lg bg-white/20 border border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/30 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Download App</span>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div className={`flex justify-center mb-3 p-3 rounded-2xl bg-gradient-to-r ${feature.color} bg-opacity-20 group-hover:bg-opacity-30 transition-all`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-cyan-400 transition-colors">{feature.title}</h3>
                    <p className="text-white/60 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Featured Tours */}
          <div className="flex-1 max-w-md">
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Featured Audio Tours</h2>
                <Link to="/tours" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="space-y-4">
                {featuredTours.map((tour) => (
                  <div key={tour.id} className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-200 cursor-pointer group">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={tour.image} 
                        alt={tour.title}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors mb-1">
                          {tour.title}
                        </h3>
                        <p className="text-white/60 text-sm mb-2 line-clamp-2">{tour.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1 text-white/80">
                            <Clock className="w-4 h-4" />
                            <span>{tour.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-yellow-400">
                            <Star className="w-4 h-4 fill-current" />
                            <span>{tour.rating}</span>
                          </div>
                          <div className="text-cyan-400 font-semibold">
                            ₹{tour.price}
                          </div>
                        </div>
                      </div>
                      <Play className="w-8 h-8 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/tours"
                className="block mt-6 text-center bg-gradient-to-r from-purple-400 to-pink-500 text-white py-3 rounded-2xl font-semibold hover:from-purple-500 hover:to-pink-600 transition-all"
              >
                View All Tours
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-4 md:px-8 mt-16">
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2 group-hover:scale-110 transition-transform">50+</div>
              <div className="text-white/80 group-hover:text-white transition-colors">Audio Tours</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2 group-hover:scale-110 transition-transform">200+</div>
              <div className="text-white/80 group-hover:text-white transition-colors">Destinations</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-2 group-hover:scale-110 transition-transform">10K+</div>
              <div className="text-white/80 group-hover:text-white transition-colors">Reviews</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 mb-2 group-hover:scale-110 transition-transform">95%</div>
              <div className="text-white/80 group-hover:text-white transition-colors">Offline Ready</div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Districts */}
      <div className="px-4 md:px-8 mt-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Popular Districts</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Explore the most visited districts in Tamil Nadu with our comprehensive audio guides and offline maps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {districts.map((district, index) => (
            <div key={index} className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all duration-200 cursor-pointer group">
              <div className="relative mb-4 overflow-hidden rounded-2xl">
                <img 
                  src={district.image} 
                  alt={district.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white mb-1">{district.name}</h3>
                  <div className="flex items-center space-x-1 text-white/80">
                    <MapPin className="w-4 h-4" />
                    <span>{district.places} places</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-white/80">
                  <span className="text-sm">Starting from</span>
                  <div className="text-cyan-400 font-bold text-lg">₹199</div>
                </div>
                <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-cyan-500 hover:to-blue-600 transition-all flex items-center space-x-1">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 md:px-8 mt-16 pb-16">
        <div className="backdrop-blur-lg bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-white/20 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Explore Tamil Nadu?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of travelers who have discovered the beauty of Tamil Nadu with our intelligent travel platform. 
            Start your journey today with offline capabilities and personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tours"
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-12 py-4 rounded-2xl font-semibold hover:from-cyan-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Start Exploring Now</span>
            </Link>
            <button className="backdrop-blur-lg bg-white/20 border border-white/30 text-white px-12 py-4 rounded-2xl font-semibold hover:bg-white/30 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Download Mobile App</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;