// hooks/useCustomerAuth.js - Updated to handle auto-login
import { useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getCustomerAccounts,
  initiateVerification,
  verifyCode,
} from '../api/customerAuth';
import {
  setVerificationEmail,
  setCustomerCredentials,
  setLoading,
  logoutCustomer,
} from '../features/customer/customerAuthSlice';
import { useNavigate } from 'react-router-dom';

export const useInitiateVerification = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: ({ email, organizationId }) =>
      initiateVerification(email, organizationId),
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSuccess: (data, variables) => {
      if (data.token) {
        // Auto-login successful (returning customer)
        dispatch(setCustomerCredentials(data));
      } else {
        // New verification required
        dispatch(setVerificationEmail(variables.email));
      }
    },
    onError: (error) => {
      console.error('Verification initiation error:', error);
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
  });
};

export const useVerifyCode = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, code, organizationId }) =>
      verifyCode(email, code, organizationId),
    onMutate: () => {
      console.log('🔄 Starting verification...');
      dispatch(setLoading(true));
    },
    onSuccess: (data, variables) => {
      console.log('✅ Verification SUCCESS - Full response:', data);

      // Check if we have the required data
      if (data.token && data.customerId) {
        console.log('🔐 Token and customerId found, setting credentials...');

        dispatch(
          setCustomerCredentials({
            token: data.token,
            customerId: data.customerId,
            personId: data.personId,
          })
        );

        console.log('🏠 Navigating to customer dashboard...');
        // Use setTimeout to ensure Redux state is updated before navigation
        setTimeout(() => {
          navigate('/customer');
        }, 100);
      } else {
        console.error('❌ Missing required data in response:', {
          hasToken: !!data.token,
          hasCustomerId: !!data.customerId,
          fullData: data,
        });
      }
    },
    onError: (error) => {
      console.error('❌ Verification ERROR:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    },
    onSettled: () => {
      console.log('🏁 Verification process completed');
      dispatch(setLoading(false));
    },
  });
};
export const useCustomerAccounts = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomerAccounts(),
    onError: (error) => {
      console.error('Error fetching customer account:', error);
    },
  });
};

export const useCustomerLogout = () => {
  const dispatch = useDispatch();
  return () => dispatch(logoutCustomer());
};
