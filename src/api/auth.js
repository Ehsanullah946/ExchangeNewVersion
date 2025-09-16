import axiosClient from './axiosClient';

export const loginUser = async (credentials) => {
  const { data } = await axiosClient.post('/auth/login', credentials);
  return data;
};

export const logoutUser = () => {
  return true;
};
