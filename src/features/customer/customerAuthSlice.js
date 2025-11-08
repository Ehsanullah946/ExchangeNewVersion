// features/customer/customerAuthSlice.js - Fixed initialization
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customer: null,
  token: null,
  isAuthenticated: false,
  loading: true, // Start with loading true
  verificationEmail: null,
  verificationStep: 'email',
};

const customerAuthSlice = createSlice({
  name: 'customerAuth',
  initialState,
  reducers: {
    setVerificationEmail: (state, action) => {
      console.log('📧 Setting verification email:', action.payload);
      state.verificationEmail = action.payload;
      state.verificationStep = 'code';
    },
    setCustomerCredentials: (state, action) => {
      const { token, customerId, personId } = action.payload;
      console.log('🔐 Setting customer credentials:', {
        token,
        customerId,
        personId,
      });

      state.customer = { id: customerId, personId };
      state.token = token;
      state.isAuthenticated = true;
      state.verificationStep = 'success';
      state.loading = false;

      localStorage.setItem('customerToken', token);
      localStorage.setItem(
        'customer',
        JSON.stringify({ id: customerId, personId })
      );

      console.log(
        '✅ Customer credentials set - isAuthenticated:',
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
      state.loading = false;
      localStorage.removeItem('customerToken');
      localStorage.removeItem('customer');
    },
    initializeCustomerAuth: (state) => {
      console.log('🔄 initializeCustomerAuth called');

      const token = localStorage.getItem('customerToken');
      const customerStr = localStorage.getItem('customer');

      console.log('📦 Storage check:', {
        hasToken: !!token,
        hasCustomerStr: !!customerStr,
        token: token ? `${token.substring(0, 20)}...` : 'none',
        customerStr: customerStr || 'none',
      });

      if (token && customerStr) {
        try {
          const customer = JSON.parse(customerStr);
          console.log('✅ Parsed customer data:', customer);

          state.customer = customer;
          state.token = token;
          state.isAuthenticated = true;
          state.verificationStep = 'success';
          state.loading = false;

          console.log('🎯 Customer auth initialized successfully:', {
            isAuthenticated: state.isAuthenticated,
            customerId: state.customer?.id,
            hasToken: !!state.token,
          });
        } catch (error) {
          console.error('❌ Error parsing stored customer data:', error);
          // Clear invalid data
          localStorage.removeItem('customerToken');
          localStorage.removeItem('customer');
          state.loading = false;
        }
      } else {
        console.log('ℹ️ No stored customer auth data found');
        state.loading = false;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetVerification: (state) => {
      state.verificationEmail = null;
      state.verificationStep = 'email';
    },
    // Add a clear action for debugging
    clearCustomerAuth: (state) => {
      state.customer = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
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
  clearCustomerAuth,
} = customerAuthSlice.actions;
export default customerAuthSlice.reducer;
