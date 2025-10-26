import apiClient from './apiClient';

export const loginUser = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post('/auth/logout');
  return response.data;
};

export const addUserToOrganization = async (userData) => {
  const response = await apiClient.post('/auth/add-user', userData);
  return response.data;
};
