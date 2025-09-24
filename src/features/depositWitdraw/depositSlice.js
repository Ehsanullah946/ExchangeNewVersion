import { createSlice } from '@reduxjs/toolkit';

const depositSlice = createSlice({
  name: 'deposit',
  initialState: {
    selectedDeposit: null,
  },
  reducers: {
    setSelectedDeposit: (state, action) => {
      state.selectedDeposit = action.payload;
    },
  },
});

export const { setSelectedDeposit } = depositSlice.actions;
export default depositSlice.reducer;
