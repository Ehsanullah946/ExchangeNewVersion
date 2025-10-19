import axiosClient from './axiosClient';

export const getTodayTill = async () => {
  const { data } = await axiosClient.get('/till/today');
  return data.data;
};

export const closeTill = async (payload) => {
  const { data } = await axiosClient.post(`/till/close`, payload);
  return data;
};

export const getTillHistory = async (params) => {
  const { data } = await axiosClient.get(`/till/history`, { params });
  return data;
};

export const updateTotals = async () => {
  const { data } = await axiosClient.post(`/till/update-totals`);
  return data;
};

export const getTillDetail = async (id) => {
  const { data } = await axiosClient.get(`/till/${id}`);
  return data;
};
