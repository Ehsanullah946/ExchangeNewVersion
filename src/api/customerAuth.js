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
  const { data } = await customerClient.get('auth/customer/accounts');
  console.log('account data for in api', data);
  return data;
};

export const getCustomerTransactions = async ({
  limit = 10,
  page = 1,
  search = '',
  moneyType = '',
  fromDate = '',
  toDate = '',
  TransactionType = '',
} = {}) => {
  try {
    console.log('🔍 API Call Debug:');
    console.log('params:', {
      limit,
      page,
      search,
      moneyType,
      fromDate,
      toDate,
      TransactionType,
    });

    const response = await customerClient.get(`auth/customer/transactions`, {
      params: {
        limit,
        page,
        search,
        moneyType,
        fromDate,
        toDate,
        TransactionType,
      },
    });

    console.log('✅ API Response:', response);
    console.log('📊 Response data structure:', {
      status: response.data?.status,
      total: response.data?.total,
      dataLength: response.data?.data?.length,
      filters: response.data?.filters,
      fullData: response.data,
    });

    return response.data;
  } catch (error) {
    console.error('❌ API Error:', error);
    console.error('Error details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};
