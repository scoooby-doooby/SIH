import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Tour {
  id: string;
  title: string;
  district: string;
  duration: string;
  rating: number;
  image: string;
  description: string;
  category: 'Culture' | 'Nature' | 'Temples' | 'Resorts';
  audioUrl?: string;
  price: number;
}

interface ToursState {
  tours: Tour[];
  filteredTours: Tour[];
  loading: boolean;
  selectedCategory: string;
}

const mockTours: Tour[] = [
  {
    id: '1',
    title: 'Meenakshi Temple Heritage Tour',
    district: 'Madurai',
    duration: '45 mins',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Explore the magnificent Meenakshi Temple with detailed audio commentary about its history and architecture.',
    category: 'Temples',
    price: 299
  },
  {
    id: '2',
    title: 'Ooty Tea Gardens Experience',
    district: 'Nilgiris',
    duration: '60 mins',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Discover the Queen of Hills with guided tours through lush tea plantations and scenic viewpoints.',
    category: 'Nature',
    price: 399
  },
  {
    id: '3',
    title: 'Kanyakumari Sunrise Tour',
    district: 'Kanyakumari',
    duration: '35 mins',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Witness the breathtaking sunrise at the southernmost tip of India with cultural insights.',
    category: 'Culture',
    price: 199
  },
  {
    id: '4',
    title: 'Marina Beach Cultural Walk',
    district: 'Chennai',
    duration: '50 mins',
    rating: 4.6,
    image: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Experience Chennai\'s vibrant beach culture and local traditions along Marina Beach.',
    category: 'Culture',
    price: 249
  },
  {
    id: '5',
    title: 'Kodaikanal Hill Station Retreat',
    district: 'Dindigul',
    duration: '75 mins',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Explore the Princess of Hill Stations with guided tours of lakes, viewpoints, and forests.',
    category: 'Nature',
    price: 449
  },
  {
    id: '6',
    title: 'Thanjavur Palace Heritage',
    district: 'Thanjavur',
    duration: '55 mins',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Discover the rich history of Thanjavur Palace and its magnificent art collections.',
    category: 'Culture',
    price: 329
  }
];

const initialState: ToursState = {
  tours: mockTours,
  filteredTours: mockTours,
  loading: false,
  selectedCategory: 'All',
};

const toursSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    setTours: (state, action: PayloadAction<Tour[]>) => {
      state.tours = action.payload;
      state.filteredTours = action.payload;
    },
    filterTours: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      if (action.payload === 'All') {
        state.filteredTours = state.tours;
      } else {
        state.filteredTours = state.tours.filter(tour => tour.category === action.payload);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setTours, filterTours, setLoading } = toursSlice.actions;
export default toursSlice.reducer;