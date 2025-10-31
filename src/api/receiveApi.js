import axiosClient from './axiosClient';

export const getReceive = async (filters = {}) => {
  console.log('API call with filters:', filters);

  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value);
    }
  });

  const queryString = params.toString();
  console.log('Query string:', queryString);

  try {
    const { data } = await axiosClient.get(
      `receive${queryString ? `?${queryString}` : ''}`
    );

    console.log('qurey String', queryString);
    console.log('API response for receive:', data);
    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const createReceive = async (payload) => {
  const { data } = await axiosClient.post('/receive', payload);
  return data;
};

export const updateReceive = async ({ id, payload }) => {
  const { data } = await axiosClient.patch(`/receive/${id}`, payload);
  return data;
};

export const deleteReceive = async (id) => {
  const { data } = await axiosClient.delete(`/receive/${id}`);
  return data;
};

export const rejectReceive = async (id) => {
  const { data } = await axiosClient.patch(`/receive/${id}/reject`);
  return data;
};

export const getSingleReceive = async (id) => {
  const { data } = await axiosClient.get(`/receive/${id}`);
  return data;
};

export const UpdateReceiveReceiver = async ({ id, ...payload }) => {
  const { data } = await axiosClient.post(`/receive/${id}/receiver`, payload);
  return data;
};

export const UpdateReceiveSender = async ({ id, ...payload }) => {
  const { data } = await axiosClient.post(`/receive/${id}/sender`, payload);
  return data;
};
