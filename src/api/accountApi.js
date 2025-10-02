import axiosClient from './axiosClient';

export const getAccounts = async (filters = {}) => {
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
      `/account${queryString ? `?${queryString}` : ''}`
    );

    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const createAccount = async (payload) => {
  const { data } = await axiosClient.post('/account', payload);
  return data;
};

export const getSingleAccount = async (id) => {
  const { data } = await axiosClient.get(`/account/${id}`);
  return data;
};

export const updateAccount = async ({ id, payload }) => {
  const { data } = await axiosClient.patch(`/account/${id}`, payload);
  return data;
};

export const deleteAccount = async (id) => {
  const { data } = await axiosClient.delete(`/account/${id}`);
  return data;
};
