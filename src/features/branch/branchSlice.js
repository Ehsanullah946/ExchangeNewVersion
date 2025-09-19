import { createSlice } from '@reduxjs/toolkit';

const branchSlice = createSlice({
  name: 'branches',
  initialState: {
    selectedBranch: null,
  },
  reducers: {
    setSelectedBranch: (state, action) => {
      state.selectedBranch = action.payload;
    },
  },
});

export const { setSelectedBranch } = branchSlice.actions;
export default branchSlice.reducer;
