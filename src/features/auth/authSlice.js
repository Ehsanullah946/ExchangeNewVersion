import { createSlice } from '@reduxjs/toolkit';

let parsedUser = null;
try {
  const storedUser = localStorage.getItem('user');
  parsedUser = storedUser ? JSON.parse(storedUser) : null;
} catch (err) {
  parsedUser = null;
}

const token = localStorage.getItem('token');

const initialState = {
  user: parsedUser,
  token: token || null,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
