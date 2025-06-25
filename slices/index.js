import { configureStore } from '@reduxjs/toolkit';
import LocationReducer from './location/reducer';
export const store = configureStore({
  reducer: {
    location: LocationReducer,
  },
});
