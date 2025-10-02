import axiosClient from './axiosClient';

export const getTransferToAccount = async (filters = {}) => {
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
      `/accountToAccount${queryString ? `?${queryString}` : ''}`
    );

    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const createTransferToAccount = async (payload) => {
  const { data } = await axiosClient.post('/accountToAccount', payload);
  return data;
};

export const getSingleTransferToAccount = async (id) => {
  const { data } = await axiosClient.get(`/accountToAccount/${id}`);
  return data;
};
export const updateTransferToAccount = async ({ id, payload }) => {
  const { data } = await axiosClient.patch(`/accountToAccount/${id}`, payload);
  return data;
};
export const deleteTransferToAccount = async (id) => {
  const { data } = await axiosClient.delete(`/accountToAccount/${id}`);
  return data;
};
