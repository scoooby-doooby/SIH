import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { filterTours } from '../store/slices/toursSlice';
import { Search, Filter, Star, Clock, MapPin, Play, Download, Users } from 'lucide-react';

const Tours: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredTours, selectedCategory } = useSelector((state: RootState) => state.tours);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const categories = ['All', 'Culture', 'Nature', 'Temples', 'Resorts'];

  useEffect(() => {
    // Get search query from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, []);

  const handleCategoryFilter = (category: string) => {
    dispatch(filterTours(category));
  };

  const filteredAndSearchedTours = filteredTours.filter(tour =>
    tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTours = [...filteredAndSearchedTours].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return a.price - b.price;
      case 'duration':
        return parseInt(a.duration) - parseInt(b.duration);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen px-4 md:px-8 mt-12">
      {/* Header */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4">
          Audio-Guided Tours
        </h1>
        <p className="text-white/80 text-lg mb-6">
          Discover Tamil Nadu's rich heritage with our self-guided audio tours. Available offline for seamless exploration.
        </p>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tours, districts, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            >
              <option value="rating">Sort by Rating</option>
              <option value="price">Sort by Price</option>
              <option value="duration">Sort by Duration</option>
            </select>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mt-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-6 py-2 rounded-2xl font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white'
                  : 'backdrop-blur-lg bg-white/10 border border-white/20 text-white/80 hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {sortedTours.map((tour) => (
          <div key={tour.id} className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl overflow-hidden hover:bg-white/20 transition-all duration-300 group">
            <div className="relative">
              <img 
                src={tour.image} 
                alt={tour.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  tour.category === 'Culture' ? 'bg-purple-500/80 text-white' :
                  tour.category === 'Nature' ? 'bg-green-500/80 text-white' :
                  tour.category === 'Temples' ? 'bg-orange-500/80 text-white' :
                  'bg-blue-500/80 text-white'
                }`}>
                  {tour.category}
                </span>
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center space-x-1 text-yellow-400 mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-white font-semibold">{tour.rating}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {tour.title}
              </h3>
              <p className="text-white/70 text-sm mb-4 line-clamp-2">
                {tour.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-white/80">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{tour.district}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{tour.duration}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-cyan-400 font-bold text-xl">
                  ₹{tour.price}
                </div>
                <div className="flex space-x-2">
                  <button className="backdrop-blur-lg bg-white/20 border border-white/30 text-white p-2 rounded-xl hover:bg-white/30 transition-all">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-cyan-500 hover:to-blue-600 transition-all flex items-center space-x-1">
                    <Play className="w-4 h-4" />
                    <span>Start Tour</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {sortedTours.length === 0 && (
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-12 text-center">
          <div className="text-white/60 mb-4">
            <Search className="w-16 h-16 mx-auto mb-4" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No tours found</h3>
          <p className="text-white/80">
            Try adjusting your search criteria or browse all available tours.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              dispatch(filterTours('All'));
            }}
            className="mt-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-cyan-500 hover:to-blue-600 transition-all"
          >
            Show All Tours
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-cyan-400 mb-2">{filteredTours.length}</div>
            <div className="text-white/80">Available Tours</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400 mb-2">38</div>
            <div className="text-white/80">Districts Covered</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-400 mb-2">100%</div>
            <div className="text-white/80">Offline Compatible</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tours;