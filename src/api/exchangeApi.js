import axiosClient from './axiosClient';

export const getExchange = async (filters = {}) => {
  console.log('api filters', filters);

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
      `/exchange${queryString ? `?${queryString}` : ''}`
    );

    console.log('API response for exchange:', data);
    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const createExchange = async (payload) => {
  const { data } = await axiosClient.post('/exchange', payload);
  return data;
};

export const updateExchange = async ({ id, payload }) => {
  const { data } = await axiosClient.patch(`/exchange/${id}`, payload);
  return data;
};

export const deleteExchange = async (id) => {
  const { data } = await axiosClient.delete(`/exchange/${id}`);
  return data;
};

export const getSingleExchange = async (id) => {
  const { data } = await axiosClient.get(`/exchange/${id}`);
  return data;
};
