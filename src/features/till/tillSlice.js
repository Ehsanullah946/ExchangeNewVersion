// store/slices/tillSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTodayTill, updateTotals, closeTill } from '../../api/tillApi';

// Async thunks
export const fetchTodayTill = createAsyncThunk(
  'till/fetchTodayTill',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTodayTill();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch till'
      );
    }
  }
);

export const closeTills = createAsyncThunk(
  'till/closeTill',
  async (closeData, { rejectWithValue }) => {
    try {
      const response = await closeTill(closeData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to close till'
      );
    }
  }
);

export const updateTillTotals = createAsyncThunk(
  'till/updateTotals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await updateTotals();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update totals'
      );
    }
  }
);

const tillSlice = createSlice({
  name: 'till',
  initialState: {
    todayTill: null,
    cashFlow: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetTill: (state) => {
      state.todayTill = null;
      state.cashFlow = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodayTill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodayTill.fulfilled, (state, action) => {
        state.loading = false;
        state.todayTill = action.payload.till;
        state.cashFlow = action.payload.cashFlow;
      })
      .addCase(fetchTodayTill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Close Till
      .addCase(closeTills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(closeTills.fulfilled, (state, action) => {
        state.loading = false;
        state.todayTill = action.payload;
      })
      .addCase(closeTills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Totals
      .addCase(updateTillTotals.fulfilled, (state, action) => {
        state.todayTill = action.payload;
      });
  },
});

export const { clearError, resetTill } = tillSlice.actions;
export default tillSlice.reducer;
