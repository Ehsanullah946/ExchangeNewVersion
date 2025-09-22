import axiosClient from './axiosClient';

export const getAccounts = async (filters = {}) => {
  console.log('api filters', filters);

  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  const queryString = params.toString();

  try {
    const { data } = await axiosClient.get(
      `/account?${queryString ? `?${queryString}` : ' '}`
    );
    console.log('api response for account:', data);
    return data;
  } catch (error) {
    console.log('some thing went wrong with fetching the account', error);
    throw error;
  }
};
