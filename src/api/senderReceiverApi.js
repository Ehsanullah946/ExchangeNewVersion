import { useQueryClient } from '@tanstack/react-query';
import axiosClient from './axiosClient';

export const getSenderReceiver = async (filters = {}) => {
  console.log('api filter:', filters);

  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  const queryString = params.toString();
  console.log('Query string:', queryString);

  try {
    const { data } = await axiosClient.get(
      `/senderReceiver${queryString ? `?${queryString}` : ''}`
    );

    console.log('API response for senderReceiver:', data);
    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const createSenderReceiver = async (paylaod) => {
  const { data } = await axiosClient.post('/senderReceiver', paylaod);
  return data;
};
export const getSingleSenderReceiver = async (id) => {
  const { data } = await axiosClient.get(`/senderReceiver/${id}`);
  return data;
};

export const updateSenderReceiver = async ({ id, paylaod }) => {
  const { data } = await axiosClient.patch(`/senderReceiver/${id}`, paylaod);
  return data;
};

export const deleteSenderReceiver = async (id) => {
  const { data } = await axiosClient.delete(`/senderReceiver/${id}`);
  return data;
};
