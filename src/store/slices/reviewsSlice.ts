import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  tourId: string;
  tourName: string;
  verified: boolean;
}

interface ReviewsState {
  reviews: Review[];
  loading: boolean;
}

const mockReviews: Review[] = [
  {
    id: '1',
    userName: 'Priya Sharma',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    comment: 'Amazing audio tour of Meenakshi Temple! The historical details were fascinating and the offline feature worked perfectly.',
    date: '2024-01-15',
    tourId: '1',
    tourName: 'Meenakshi Temple Heritage Tour',
    verified: true
  },
  {
    id: '2',
    userName: 'Rajesh Kumar',
    userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4,
    comment: 'Great experience in Ooty! The tea garden tour was informative and the app worked seamlessly offline.',
    date: '2024-01-12',
    tourId: '2',
    tourName: 'Ooty Tea Gardens Experience',
    verified: true
  },
  {
    id: '3',
    userName: 'Anitha Ravi',
    userAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    comment: 'The Kanyakumari sunrise tour was breathtaking! Perfect timing and excellent audio commentary.',
    date: '2024-01-10',
    tourId: '3',
    tourName: 'Kanyakumari Sunrise Tour',
    verified: true
  },
  {
    id: '4',
    userName: 'Vikram Patel',
    userAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4,
    comment: 'Marina Beach cultural walk was enlightening. Learned so much about Chennai\'s history and culture.',
    date: '2024-01-08',
    tourId: '4',
    tourName: 'Marina Beach Cultural Walk',
    verified: true
  },
  {
    id: '5',
    userName: 'Meera Krishnan',
    userAvatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    comment: 'Kodaikanal tour exceeded expectations! Beautiful scenery and excellent offline maps feature.',
    date: '2024-01-05',
    tourId: '5',
    tourName: 'Kodaikanal Hill Station Retreat',
    verified: true
  }
];

const initialState: ReviewsState = {
  reviews: mockReviews,
  loading: false,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.unshift(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setReviews, addReview, setLoading } = reviewsSlice.actions;
export default reviewsSlice.reducer;