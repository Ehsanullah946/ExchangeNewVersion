import axiosClient from './axiosClient';

export const getBranch = async (filters = {}) => {
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
      `/branch${queryString ? `?${queryString}` : ''}`
    );
    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const getSingleBranch = async (id) => {
  const { data } = await axiosClient.get(`/branch/${id}`);
  return data;
};
export const createBranch = async (payload) => {
  const { data } = await axiosClient.post('/branch', payload);
  return data;
};

export const updateBranch = async ({ id, payload }) => {
  const { data } = await axiosClient.patch(`/branch/${id}`, payload);
  return data;
};

export const deleteBranch = async (id) => {
  const { data } = await axiosClient.delete(`/branch/${id}`);
  return data;
};
