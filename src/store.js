import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import customerReducer from './features/customer/customerSlice';
import toastReducer from './features/toast/toastSlice';
import filterReducer from './features/ui/filterSlice';
import employeeReducer from './features/employee/employeeSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    toast: toastReducer,
    filters: filterReducer,
    employee: employeeReducer,
  },
});

export default store;
