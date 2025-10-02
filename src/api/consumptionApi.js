import axiosClient from './axiosClient';

export const getConsumption = async (filters = {}) => {
  console.log('API call with filters:', filters);
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
      `/expence${queryString ? `?${queryString}` : ''}`
    );

    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const createConsumption = async (payload) => {
  const { data } = await axiosClient.post('/expence', payload);
  return data;
};

export const getSingleConsumption = async (id) => {
  const { data } = await axiosClient.get(`/expence/${id}`);
  return data;
};

export const updateConsumption = async ({ id, payload }) => {
  const { data } = await axiosClient.patch(`/expence/${id}`, payload);
  return data;
};

export const deleteConsumption = async (payload) => {
  const { data } = await axiosClient.delete('/expence', payload);
  return data;
};
