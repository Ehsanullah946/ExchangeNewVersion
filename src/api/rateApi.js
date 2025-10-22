// api/rateApi.js
import axiosClient from './axiosClient';

export const getRates = async (params = {}) => {
  console.log('API call with params:', params);

  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value);
    }
  });

  try {
    const { data } = await axiosClient.get(`/rates?${queryParams}`);
    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const deleteRate = async (id) => {
  try {
    const { data } = await axiosClient.delete(`/rates/${id}`);
    return data;
  } catch (error) {
    console.error('Delete rate error:', error);
    throw error;
  }
};

// Add other API functions
export const createRate = async (rateData) => {
  const { data } = await axiosClient.post('/rates', rateData);
  return data;
};

export const updateRate = async (id, rateData) => {
  const { data } = await axiosClient.put(`/rates/${id}`, rateData);
  return data;
};

export const getRateById = async (id) => {
  const { data } = await axiosClient.get(`/rates/${id}`);
  return data;
};
