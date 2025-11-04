import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customer: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  verificationEmail: null,
  verificationStep: 'email',
};

const customerAuthSlice = createSlice({
  name: 'customerAuth',
  initialState,
  reducers: {
    setVerificationEmail: (state, action) => {
      state.verificationEmail = action.payload;
      state.verificationStep = 'code';
      state.error = null;
    },
    setCustomerCredentials: (state, action) => {
      const { token, customerId, personId } = action.payload;
      console.log('🔄 Setting customer credentials:', {
        token,
        customerId,
        personId,
      });

      state.customer = { id: customerId, personId };
      state.token = token;
      state.isAuthenticated = true;
      state.verificationStep = 'success';
      state.loading = false;
      state.error = null;

      // Store in localStorage
      localStorage.setItem('customerToken', token);
      localStorage.setItem(
        'customer',
        JSON.stringify({ id: customerId, personId })
      );

      console.log(
        '✅ Customer credentials set, isAuthenticated:',
        state.isAuthenticated
      );
    },
    logoutCustomer: (state) => {
      console.log('🚪 Logging out customer');
      state.customer = null;
      state.token = null;
      state.isAuthenticated = false;
      state.verificationEmail = null;
      state.verificationStep = 'email';
      localStorage.removeItem('customerToken');
      localStorage.removeItem('customer');
    },
    initializeCustomerAuth: (state) => {
      const token = localStorage.getItem('customerToken');
      const customerStr = localStorage.getItem('customer');

      console.log('🔄 Initializing customer auth from storage:', {
        hasToken: !!token,
        hasCustomerStr: !!customerStr,
      });

      if (token && customerStr) {
        try {
          const customer = JSON.parse(customerStr);
          state.customer = customer;
          state.token = token;
          state.isAuthenticated = true;
          state.verificationStep = 'success';
          console.log('✅ Customer auth initialized from storage');
        } catch (error) {
          console.error('❌ Error parsing stored customer data:', error);
          localStorage.removeItem('customerToken');
          localStorage.removeItem('customer');
        }
      } else {
        console.log('ℹ️ No stored customer auth data found');
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetVerification: (state) => {
      state.verificationEmail = null;
      state.verificationStep = 'email';
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setVerificationEmail,
  setCustomerCredentials,
  logoutCustomer,
  initializeCustomerAuth,
  setLoading,
  resetVerification,
  setError,
} = customerAuthSlice.actions;
export default customerAuthSlice.reducer;
