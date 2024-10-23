import { createSlice } from '@reduxjs/toolkit';
import { UserRole } from './auth-types';

const initialState = {
  user: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.role = action.payload.role || UserRole.CUSTOMER; 
    },
    clearUser: (state) => {
      state.user = null;
      state.role = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;