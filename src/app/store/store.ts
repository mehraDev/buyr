import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './locationSlice';

const store = configureStore({
  reducer: {
    location: locationReducer,
    // Add other reducers here if needed
  },
});

export default store;
