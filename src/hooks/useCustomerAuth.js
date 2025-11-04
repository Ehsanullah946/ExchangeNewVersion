// hooks/useCustomerAuth.js
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
  resetVerification,
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
      dispatch(setVerificationEmail(variables.email));
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
  const navigate = useNavigate(); // Add this

  return useMutation({
    mutationFn: ({ email, code, organizationId }) =>
      verifyCode(email, code, organizationId),
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSuccess: (data, variables) => {
      console.log('✅ Verification successful:', data);

      // Make sure we have the required data
      if (data.token && data.customerId) {
        dispatch(
          setCustomerCredentials({
            token: data.token,
            customerId: data.customerId,
            personId: data.personId,
          })
        );

        // Navigate to customer dashboard
        navigate('/customer');
      } else {
        console.error('❌ Missing token or customerId in response:', data);
        alert('Authentication failed: Missing token');
      }
    },
    onError: (error) => {
      console.error('❌ Verification error:', error);
      console.error('Error details:', error.response?.data);
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
