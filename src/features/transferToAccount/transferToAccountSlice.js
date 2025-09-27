import { createSlice } from '@reduxjs/toolkit';

const transferToAccountSlice = createSlice({
  name: 'transferToAccount',
  initialState: {
    selectedTransferToAccount: null,
  },
  reducers: {
    setSelectedTransferToAccount: (state, action) => {
      state.selectedTransferToAccount = action.payload;
    },
  },
});

export const { setSelectedTransferToAccount } = transferToAccountSlice.actions;
export default transferToAccountSlice.reducer;
