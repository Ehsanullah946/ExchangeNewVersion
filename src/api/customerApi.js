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

export const getAllTransaction = async (
  customerId,
  { limit = 10, page = 1 }
) => {
  const { data } = await axiosClient.get(
    `/customer/${customerId}/transactions`,
    {
      params: { limit, page },
    }
  );

  console.log('all transaction data:', data);
  return data;
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
