// features/toast/toastSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  message: '',
  type: 'error', // 'error' | 'success' | 'warning' | 'info'
  duration: 5000,
  position: 'top-center',
  actions: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action) => {
      const {
        message,
        type = 'error',
        duration = 5000,
        position = 'top-center',
        actions = [],
      } = action.payload;
      state.isVisible = true;
      state.message = message;
      state.type = type;
      state.duration = duration;
      state.position = position;
      state.actions = actions;
    },
    hideToast: (state) => {
      state.isVisible = false;
      // Don't reset other fields immediately to avoid flickering during exit animation
    },
    clearToast: (state) => {
      return initialState; // This properly resets everything
    },
  },
});

export const { showToast, hideToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
