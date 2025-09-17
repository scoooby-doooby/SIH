import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addReview } from '../store/slices/reviewsSlice';
import { Star, ThumbsUp, Filter, Search, Calendar, MapPin, Verified, Plus } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Reviews: React.FC = () => {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state: RootState) => state.reviews);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { tours } = useSelector((state: RootState) => state.tours);
  
  const [showAddReview, setShowAddReview] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const reviewSchema = Yup.object().shape({
    tourId: Yup.string().required('Please select a tour'),
    rating: Yup.number().min(1, 'Please select a rating').max(5).required('Rating is required'),
    comment: Yup.string().min(10, 'Review must be at least 10 characters').required('Review is required'),
  });

  const handleSubmitReview = (values: any, { resetForm }: any) => {
    const selectedTour = tours.find(tour => tour.id === values.tourId);
    const newReview = {
      id: Date.now().toString(),
      userName: user?.name || 'Anonymous',
      userAvatar: `https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100`,
      rating: values.rating,
      comment: values.comment,
      date: new Date().toISOString().split('T')[0],
      tourId: values.tourId,
      tourName: selectedTour?.title || 'Unknown Tour',
      verified: true
    };
    
    dispatch(addReview(newReview));
    resetForm();
    setShowAddReview(false);
  };

  const filteredReviews = reviews
    .filter(review => {
      const matchesSearch = review.tourName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           review.userName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRating = filterRating === 'all' || review.rating.toString() === filterRating;
      return matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / reviews.length) * 100
  }));

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen px-4 md:px-8 mt-12">
      {/* Header */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4">
              Traveler Reviews
            </h1>
            <p className="text-white/80 text-lg">
              Real experiences from travelers who explored Tamil Nadu with our audio tours.
            </p>
          </div>
          
          {isAuthenticated && (
            <button
              onClick={() => setShowAddReview(true)}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-cyan-500 hover:to-blue-600 transition-all flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Write Review</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Overall Rating */}
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Overall Rating</h3>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                {averageRating.toFixed(1)}
              </div>
              {renderStars(Math.round(averageRating))}
              <div className="text-white/80 text-sm mt-2">
                Based on {reviews.length} reviews
              </div>
            </div>
            
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-white/80 text-sm w-2">{rating}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <div className="flex-1 bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-white/80 text-sm w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-white/80 text-sm mb-2 block">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                </select>
              </div>
              
              <div>
                <label className="text-white/80 text-sm mb-2 block">Filter by Rating</label>
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search */}
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reviews, tours, or travelers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              />
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <div key={review.id} className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all">
                <div className="flex items-start space-x-4">
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-white font-semibold">{review.userName}</h4>
                        {review.verified && (
                          <Verified className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-white/60 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      {renderStars(review.rating)}
                      <span className="text-white/80 text-sm">for</span>
                      <span className="text-cyan-400 text-sm font-medium">{review.tourName}</span>
                    </div>
                    
                    <p className="text-white/80 leading-relaxed mb-4">
                      {review.comment}
                    </p>
                    
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-white/60 hover:text-cyan-400 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">Helpful</span>
                      </button>
                      <div className="flex items-center space-x-1 text-white/60">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Verified Visit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-12 text-center">
              <Search className="w-16 h-16 text-white/60 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No reviews found</h3>
              <p className="text-white/80">
                Try adjusting your search criteria or filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Review Modal */}
      {showAddReview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-6">Write a Review</h3>
            
            <Formik
              initialValues={{ tourId: '', rating: 0, comment: '' }}
              validationSchema={reviewSchema}
              onSubmit={handleSubmitReview}
            >
              {({ values, setFieldValue }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="text-white/80 text-sm mb-2 block">Select Tour</label>
                    <Field
                      as="select"
                      name="tourId"
                      className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                    >
                      <option value="">Choose a tour...</option>
                      {tours.map((tour) => (
                        <option key={tour.id} value={tour.id}>{tour.title}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="tourId" component="div" className="text-red-400 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="text-white/80 text-sm mb-2 block">Rating</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-8 h-8 cursor-pointer transition-colors ${
                            star <= values.rating ? 'text-yellow-400 fill-current' : 'text-gray-400 hover:text-yellow-400'
                          }`}
                          onClick={() => setFieldValue('rating', star)}
                        />
                      ))}
                    </div>
                    <ErrorMessage name="rating" component="div" className="text-red-400 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="text-white/80 text-sm mb-2 block">Your Review</label>
                    <Field
                      as="textarea"
                      name="comment"
                      rows={4}
                      placeholder="Share your experience..."
                      className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 resize-none"
                    />
                    <ErrorMessage name="comment" component="div" className="text-red-400 text-sm mt-1" />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddReview(false)}
                      className="flex-1 backdrop-blur-lg bg-white/20 border border-white/30 text-white py-3 rounded-xl font-semibold hover:bg-white/30 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-cyan-500 hover:to-blue-600 transition-all"
                    >
                      Submit Review
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;