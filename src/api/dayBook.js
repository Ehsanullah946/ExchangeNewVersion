import axiosClient from './axiosClient';

export const getDayBook = async (queryParams = '') => {
  const { data } = await axiosClient.get(`/dayBook?${queryParams}`);
  return data;
};
