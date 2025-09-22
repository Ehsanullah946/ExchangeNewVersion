import axiosClient from './axiosClient';

export const getMoneyType = async (filters = {}) => {
  console.log('api filters:', filters);
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  const queryString = params.toString();

  try {
    const { data } = await axiosClient.get(
      `/moneyType?${queryString ? `?${queryString}` : ''}`
    );
    console.log('api response money Type', data);
    return data;
  } catch (error) {
    console.log('error with fetching data', error);
    throw error;
  }
};
