import axiosClient from './axiosClient';

export const getCustomer = async (filters = {}) => {
  console.log('API call with filters:', filters);

  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  const queryString = params.toString();
  console.log('Query string:', queryString);

  try {
    const { data } = await axiosClient.get(
      `/customer${queryString ? `?${queryString}` : ''}`
    );

    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const getSingleCustomer = async (id) => {
  const { data } = await axiosClient.get(`/customer/${id}`);

  return data;
};

export const getCustomerAccount = async (customerId) => {
  const { data } = await axiosClient.get(`/customer/${customerId}/account`);
  console.log('customer account summary', data);
  return data;
};

export const getCustomerDetails = async (customerId) => {
  const { data } = await axiosClient.get(`/customer/${customerId}`);
  return data;
};

// Update your getAllTransaction function
export const getAllTransaction = async (
  customerId,
  { limit = 10, page = 1 } = {}
) => {
  try {
    console.log('🔍 API Call Debug:');
    console.log('customerId:', customerId, 'type:', typeof customerId);
    console.log('params:', { limit, page });

    const response = await axiosClient.get(
      `/customer/${customerId}/transactions`,
      {
        params: { limit, page },
      }
    );

    console.log('✅ API Response:', response);
    console.log('📊 Response data structure:', {
      status: response.data?.status,
      total: response.data?.total,
      dataLength: response.data?.data?.length,
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

export const createCustomer = async (payload) => {
  const { data } = await axiosClient.post('/customer', payload);
  return data;
};

export const updateCustomer = async ({ id, payload }) => {
  const { data } = await axiosClient.patch(`/customer/${id}`, payload);
  return data;
};

export const deleteCustomer = async (id) => {
  const { data } = await axiosClient.delete(`/customer/${id}`);
  return data;
};
