import { createSlice } from '@reduxjs/toolkit';

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState: {
    selectedExchange: null,
  },
  reducers: {
    setSelectedExchange: (state, action) => {
      state.selectedExchange = action.payload;
    },
  },
});

export const { setSelectedExchange } = exchangeSlice.actions;
export default exchangeSlice.reducer;
