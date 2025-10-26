// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  organizationId: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.organizationId = user.organizationId;
      state.role = user.role;

      // Store token in localStorage for persistence
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.organizationId = null;
      state.role = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    // Add this to initialize auth state from localStorage
    initializeAuth: (state) => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          state.user = user;
          state.token = token;
          state.isAuthenticated = true;
          state.organizationId = user.organizationId;
          state.role = user.role;
        } catch (error) {
          // Clear invalid stored data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    },
  },
});

export const { setCredentials, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
