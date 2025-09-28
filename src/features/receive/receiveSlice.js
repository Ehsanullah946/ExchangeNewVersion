import { createSlice } from '@reduxjs/toolkit';

const receiveSlice = createSlice({
  name: 'receive',
  initialState: {
    selectedTransfer: null,
  },
  reducers: {
    setSelectedReceive: (state, action) => {
      state.selectedReceive = action.payload;
    },
  },
});

export const { setSelectedReceive } = receiveSlice.actions;
export default receiveSlice.reducer;
