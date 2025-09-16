import axiosClient from './axiosClient';

export const getCustomer = async () => {
  const { data } = await axiosClient.get('/customer');
  return data;
};
