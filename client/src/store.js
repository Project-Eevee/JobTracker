import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import jobItemsReducer from './slices/statusSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    jobItems: jobItemsReducer,
  },
});
export default store;
