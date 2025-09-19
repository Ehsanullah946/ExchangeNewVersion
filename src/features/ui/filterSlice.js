import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  phone: '',
  open: false,
  page: 1,
  limit: 10,
  debouncedSearch: '',
  debouncedPhone: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    toggleOpen: (state, action) => {
      state.open = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setDebouncedPhone: (state, action) => {
      state.debouncedPhone = action.payload;
    },
    setDebouncedSearch: (state, action) => {
      state.debouncedSearch = action.payload;
    },
    resetFilter: () => initialState,
  },
});

export const {
  setDebouncedPhone,
  setDebouncedSearch,
  setPhone,
  toggleOpen,
  setSearch,
} = filterSlice.actions;
export default filterSlice.reducer;
