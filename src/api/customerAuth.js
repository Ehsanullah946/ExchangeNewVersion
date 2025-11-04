// api/customerAuth.js
import customerClient from './customerClient';

export const initiateVerification = async (email, organizationId) => {
  const response = await customerClient.post('auth/customer/initiate', {
    email,
    organizationId,
  });
  return response.data;
};

export const verifyCode = async (email, code, organizationId) => {
  const response = await customerClient.post('auth/customer/verify', {
    email,
    code,
    organizationId,
  });
  return response.data;
};

export const getCustomerAccounts = async () => {
  const response = await customerClient.get('auth/customer/accounts');
  return response.data;
};
