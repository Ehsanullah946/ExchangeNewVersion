import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import customerReducer from './features/customer/customerSlice';
import toastReducer from './features/toast/toastSlice';
import filterReducer from './features/ui/filterSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    toast: toastReducer,
    filters: filterReducer,
  },
});

export default store;
