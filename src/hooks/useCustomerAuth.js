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

  return useMutation({
    mutationFn: ({ email, code, organizationId }) =>
      verifyCode(email, code, organizationId),
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSuccess: (data) => {
      dispatch(setCustomerCredentials(data));
    },
    onError: (error) => {
      console.error('Verification error:', error);
    },
    onSettled: () => {
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
