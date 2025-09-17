import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import toursSlice from './slices/toursSlice';
import reviewsSlice from './slices/reviewsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tours: toursSlice,
    reviews: reviewsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;