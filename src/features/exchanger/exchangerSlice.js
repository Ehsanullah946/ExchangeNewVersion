import { createSlice } from '@reduxjs/toolkit';

const exchangerSlice = createSlice({
  name: 'exchangers',
  initialState: {
    selectedExchanger: null,
  },
  reducers: {
    setSelectedExchanger: (state, action) => {
      state.selectedExchanger = action.payload;
    },
  },
});

export const { setSelectedExchanger } = exchangerSlice.actions;
export default exchangerSlice.reducer;
