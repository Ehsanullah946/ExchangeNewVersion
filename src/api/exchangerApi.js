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

    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const createExchanger = async (payload) => {
  const { data } = await axiosClient.post('/exchanger', payload);
  return data;
};
