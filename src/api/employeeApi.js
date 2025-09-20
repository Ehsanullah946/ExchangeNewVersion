import axiosClient from './axiosClient';

export const getEmployee = async (filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  const queryString = params.toString();
  console.log('query String :', queryString);
  try {
    const { data } = await axiosClient.get(
      `/employee?${queryString ? `?${queryString}` : ' '}`
    );
    console.log('api response', data);
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
