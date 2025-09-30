import axiosClient from './axiosClient';

export const getEmployee = async (filters = {}) => {
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
      `/employee${queryString ? `?${queryString}` : ''}`
    );
    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const createEmployee = async (payload) => {
  const { data } = await axiosClient.post('/employee', payload);
  return data;
};

export const getSingleEmployee = async (id) => {
  const { data } = await axiosClient.get(`/employee/${id}`);
  return data;
};

export const updateEmployee = async ({ id, payload }) => {
  const { data } = await axiosClient.patch(`/employee/${id}`, payload);
  return data;
};

export const deleteEmployee = async (id) => {
  const { data } = await axiosClient.delete(`/employee/${id}`);
  return data;
};
