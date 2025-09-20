import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    selectedEmployee: null,
  },
  reducers: {
    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },
  },
});

export const { setSelectedEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
