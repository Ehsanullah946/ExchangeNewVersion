import axiosClient from './axiosClient';

export const getDepositWithdraw = async (filters = {}) => {
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
      `depositWithdraw/deposits?${queryString ? `?${queryString}` : ' '}`
    );

    console.log(queryString);
    console.log('api response for depositWithdraw:', data);
    return data;
  } catch (error) {
    console.log(
      'some thing went wrong with fetching the depositWithdraw',
      error
    );
    throw error;
  }
};
