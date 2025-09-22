import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
  name: 'accounts',
  initialState: {
    selectedAccount: null,
  },
  reducers: {
    setSelectedAccount: (state, action) => {
      state.selectedAccount = action.payload;
    },
  },
});

export const { setSelectedAccount } = accountSlice.actions;
export default accountSlice.reducer;
