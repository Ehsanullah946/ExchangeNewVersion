import { createSlice } from '@reduxjs/toolkit';

const moneyTypeSlice = createSlice({
  name: 'moneyType',
  initialState: {
    selectedMoneyType: null,
  },
  reducers: {
    setSelectedMoneyTpye: (state, action) => {
      state.selectedMoneyType = action.payload;
    },
  },
});

export const { setSelectedMoneyTpye } = moneyTypeSlice.actions;
export default moneyTypeSlice.reducer;
