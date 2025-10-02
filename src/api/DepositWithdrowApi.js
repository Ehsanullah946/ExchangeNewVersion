import axiosClient from './axiosClient';

export const getDeposit = async (filters = {}) => {
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
      `depositWithdraw/deposits${queryString ? `?${queryString}` : ''}`
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

export const getWithdraw = async (filters = {}) => {
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
      `depositWithdraw/withdraws${queryString ? `?${queryString}` : ''}`
    );

    console.log(queryString);
    console.log('api response for Withdraw:', data);
    return data;
  } catch (error) {
    console.log('some thing went wrong with fetching the Withdraw', error);
    throw error;
  }
};

export const createDepositWithdraw = async (payload) => {
  const { data } = await axiosClient.post('/depositWithdraw', payload);
  return data;
};

export const getSingleDepositWithdraw = async (id) => {
  const { data } = await axiosClient.get(`/depositWithdraw/${id}`);
  console.log('getSingleDepositWithdraw', data);
  return data;
};

export const updateDepositWithdraw = async ({ id, payload }) => {
  const { data } = await axiosClient.patch(`/depositWithdraw/${id}`, payload);
  return data;
};

export const deleteDepositWithdraw = async (id) => {
  const { data } = await axiosClient.delete(`/depositWithdraw/${id}`);
  return data;
};
