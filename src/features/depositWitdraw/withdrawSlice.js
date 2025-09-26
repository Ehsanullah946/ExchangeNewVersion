import { createSlice } from '@reduxjs/toolkit';

const withdrawSlice = createSlice({
  name: 'withdraw',
  initialState: {
    selectedWithdraw: null,
  },
  reducers: {
    setSelectedWithdraw: (state, action) => {
      state.selectedWithdraw = action.payload;
    },
  },
});

export const { setSelectedWithdraw } = withdrawSlice.actions;
export default withdrawSlice.reducer;
