import axiosClient from './axiosClient';

export const getCustomer = async (filters) => {
  console.log('API call with filters:', filters); 
  const params = new URLSearchParams(filters).toString();
  const { data } = await axiosClient.get(`/customer?${params}`);
  console.log('API response:', data); 
  return data;
};
