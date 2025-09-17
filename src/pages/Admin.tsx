import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Users, MapPin, Star, BarChart3, Plus, Edit, Trash2, Eye } from 'lucide-react';

const Admin: React.FC = () => {
  const { tours } = useSelector((state: RootState) => state.tours);
  const { reviews } = useSelector((state: RootState) => state.reviews);
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { title: 'Total Users', value: '2,847', change: '+12%', icon: Users, color: 'from-blue-400 to-cyan-500' },
    { title: 'Active Tours', value: tours.length.toString(), change: '+3%', icon: MapPin, color: 'from-green-400 to-teal-500' },
    { title: 'Total Reviews', value: reviews.length.toString(), change: '+8%', icon: Star, color: 'from-yellow-400 to-orange-500' },
    { title: 'Revenue', value: '₹1,24,500', change: '+15%', icon: BarChart3, color: 'from-purple-400 to-pink-500' },
  ];

  const recentUsers = [
    { id: 1, name: 'Priya Sharma', email: 'priya@example.com', joined: '2024-01-15', status: 'Active' },
    { id: 2, name: 'Rajesh Kumar', email: 'rajesh@example.com', joined: '2024-01-14', status: 'Active' },
    { id: 3, name: 'Anitha Ravi', email: 'anitha@example.com', joined: '2024-01-13', status: 'Pending' },
    { id: 4, name: 'Vikram Patel', email: 'vikram@example.com', joined: '2024-01-12', status: 'Active' },
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'tours', label: 'Tours', icon: MapPin },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: Star },
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-gradient-to-r ${stat.color} bg-opacity-20`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-400 text-sm font-medium">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-white/80 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Recent Users</h3>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl">
                <div>
                  <h4 className="text-white font-medium">{user.name}</h4>
                  <p className="text-white/60 text-sm">{user.email}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {user.status}
                  </span>
                  <p className="text-white/60 text-xs mt-1">{user.joined}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Popular Tours</h3>
          <div className="space-y-3">
            {tours.slice(0, 4).map((tour) => (
              <div key={tour.id} className="flex items-center justify-between p-3 backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <img src={tour.image} alt={tour.title} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <h4 className="text-white font-medium text-sm">{tour.title}</h4>
                    <p className="text-white/60 text-xs">{tour.district}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm">{tour.rating}</span>
                  </div>
                  <p className="text-cyan-400 text-xs">₹{tour.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTours = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Tours</h2>
        <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-cyan-500 hover:to-blue-600 transition-all flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Add Tour</span>
        </button>
      </div>

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-4 text-white/80 font-medium">Tour</th>
                <th className="text-left p-4 text-white/80 font-medium">District</th>
                <th className="text-left p-4 text-white/80 font-medium">Category</th>
                <th className="text-left p-4 text-white/80 font-medium">Rating</th>
                <th className="text-left p-4 text-white/80 font-medium">Price</th>
                <th className="text-left p-4 text-white/80 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => (
                <tr key={tour.id} className="border-t border-white/10">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img src={tour.image} alt={tour.title} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <h4 className="text-white font-medium">{tour.title}</h4>
                        <p className="text-white/60 text-sm">{tour.duration}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-white/80">{tour.district}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      tour.category === 'Culture' ? 'bg-purple-500/20 text-purple-400' :
                      tour.category === 'Nature' ? 'bg-green-500/20 text-green-400' :
                      tour.category === 'Temples' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {tour.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white">{tour.rating}</span>
                    </div>
                  </td>
                  <td className="p-4 text-cyan-400 font-semibold">₹{tour.price}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="p-2 backdrop-blur-lg bg-blue-500/20 border border-blue-400/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 backdrop-blur-lg bg-green-500/20 border border-green-400/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 backdrop-blur-lg bg-red-500/20 border border-red-400/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Users</h2>
        <div className="flex space-x-3">
          <select className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50">
            <option value="all">All Users</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-4 text-white/80 font-medium">User</th>
                <th className="text-left p-4 text-white/80 font-medium">Email</th>
                <th className="text-left p-4 text-white/80 font-medium">Joined</th>
                <th className="text-left p-4 text-white/80 font-medium">Status</th>
                <th className="text-left p-4 text-white/80 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.id} className="border-t border-white/10">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-white font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-white/80">{user.email}</td>
                  <td className="p-4 text-white/80">{user.joined}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="p-2 backdrop-blur-lg bg-blue-500/20 border border-blue-400/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 backdrop-blur-lg bg-green-500/20 border border-green-400/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 backdrop-blur-lg bg-red-500/20 border border-red-400/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Reviews</h2>
        <div className="flex space-x-3">
          <select className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50">
            <option value="all">All Reviews</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="flagged">Flagged</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reviews.slice(0, 6).map((review) => (
          <div key={review.id} className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img src={review.userAvatar} alt={review.userName} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="text-white font-medium">{review.userName}</h4>
                  <p className="text-white/60 text-sm">{review.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                ))}
              </div>
            </div>
            
            <p className="text-cyan-400 text-sm font-medium mb-2">{review.tourName}</p>
            <p className="text-white/80 text-sm mb-4 line-clamp-3">{review.comment}</p>
            
            <div className="flex justify-between items-center">
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                Approved
              </span>
              <div className="flex space-x-2">
                <button className="p-2 backdrop-blur-lg bg-green-500/20 border border-green-400/30 text-green-400 rounded-lg hover:bg-green-500/30 transition-all">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 backdrop-blur-lg bg-red-500/20 border border-red-400/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen px-4 md:px-8 mt-12">
      {/* Header */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4">
          Admin Dashboard
        </h1>
        <p className="text-white/80 text-lg">
          Manage tours, users, reviews, and monitor platform performance.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-2 mb-8">
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="pb-16">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'tours' && renderTours()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'reviews' && renderReviews()}
      </div>
    </div>
  );
};

export default Admin;