import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  message: '',
  type: 'error', // 'error' | 'success' | 'warning' | 'info'
  duration: 5000,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action) => {
      const { message, type = 'error', duration = 5000 } = action.payload;
      state.isVisible = true;
      state.message = message;
      state.type = type;
      state.duration = duration;
    },
    hideToast: (state) => {
      state.isVisible = false;
    },
    clearToast: (state) => {
      state.isVisible = false;
      state.message = '';
      state.type = 'error';
      state.duration = 5000;
    },
  },
});

export const { showToast, hideToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
