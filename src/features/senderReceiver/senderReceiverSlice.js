import { createSlice } from '@reduxjs/toolkit';

const senderReceiverSlice = createSlice({
  name: 'senderReceiver',
  initialState: {
    selectedSenderReceiver: null,
  },
  reducers: {
    setSelectedSenderReceiver: (state, action) => {
      state.selectedSenderReceiver = action.payload;
    },
  },
});

export const { setSelectedSenderReceiver } = senderReceiverSlice.actions;
export default senderReceiverSlice.reducer;
