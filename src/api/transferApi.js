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
