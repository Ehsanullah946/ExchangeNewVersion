import axiosClient from './axiosClient';

export const getBranch = async (filters) => {
  console.log('api calls with params' + filters);
  const params = new URLSearchParams.filters().toString();
  const { data } = await axiosClient.get(`/branch?${params}`);
  console.log(data);
  return data;
};
