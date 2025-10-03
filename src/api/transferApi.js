import axiosClient from './axiosClient';

export const getTransfer = async (filters = {}) => {
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
      `/transfer${queryString ? `?${queryString}` : ''}`
    );

    console.log('API response for transfer:', data);
    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const createTransfer = async (payload) => {
  const { data } = await axiosClient.post('/transfer', payload);
  return data;
};
export const getSingleTransfer = async (id) => {
  const { data } = await axiosClient.get(`/transfer/${id}`);
  return data;
};
export const updateTransfer = async ({ id, payload }) => {
  const { data } = await axiosClient.patch(`/transfer/${id}`, payload);
  return data;
};
export const deleteTransfer = async (id) => {
  const { data } = await axiosClient.delete(`/transfer/${id}`);
  return data;
};
