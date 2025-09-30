import axiosClient from './axiosClient';

export const getExchanger = async (filters = {}) => {
  console.log('api filter:', filters);
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
      `/exchanger${queryString ? `?${queryString}` : ''}`
    );

    console.log('API response for exchanger:', data);

    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const getSingleExchanger = async (id) => {
  const { data } = await axiosClient.get(`/exchanger/${id}`);
  return data;
};

export const createExchanger = async (payload) => {
  const { data } = await axiosClient.post('/exchanger', payload);
  return data;
};

export const updateExchanger = async ({ id, payload }) => {
  const { data } = await axiosClient.patch(`/exchanger/${id}`, payload);
  return data;
};

export const deleteExchanger = async (id) => {
  const { data } = await axiosClient.delete(`/exchanger/${id}`);
  return data;
};
