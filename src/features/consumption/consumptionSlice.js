import { createSlice } from '@reduxjs/toolkit';

const consumptionSlice = createSlice({
  name: 'consumption',
  initialState: {
    selectedConsumption: null,
  },
  reducers: {
    setSelectedConsumption: (state, action) => {
      state.selectedConsumption = action.payload;
    },
  },
});

export const { setSelectedConsumption } = consumptionSlice.actions;
export default consumptionSlice.reducer;
