import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/slices/authSlice';
import serviceReducer from '../store/slices/serviceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    service: serviceReducer,
  },
});