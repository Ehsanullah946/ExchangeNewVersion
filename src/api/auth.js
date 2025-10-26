import axiosClient from './axiosClient';

export const loginUser = async (credentials) => {
  const response = await axiosClient.post('/auth/login', credentials);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosClient.post('/auth/logout');
  return response.data;
};

export const addUserToOrganization = async (userData) => {
  const response = await axiosClient.post('/auth/add-user', userData);
  return response.data;
};

export const getOrganizationUsers = async (organizationId) => {
  const response = await axiosClient.get(
    `/users/organization/${organizationId}`
  );
  return response.data;
};
