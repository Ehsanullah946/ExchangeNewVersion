import axiosClient from './axiosClient';

export const createBackup = async (payload = {}) => {
  const { data } = await axiosClient.post('/backups/create', payload);
  return data;
};

export const listBackups = async () => {
  const { data } = await axiosClient.get('/backups/list');
  return data;
};

export const downloadBackup = async (filename) => {
  const response = await axiosClient.get(`/backups/download/${filename}`, {
    responseType: 'blob',
  });
  return response;
};

export const restoreBackup = async (payload) => {
  const { data } = await axiosClient.post('/backups/restore', payload);
  return data;
};

export const deleteBackup = async (filename) => {
  const { data } = await axiosClient.delete(`/backups/delete/${filename}`);
  return data;
};

export const cleanupBackups = async () => {
  const { data } = await axiosClient.post('/backups/cleanup');
  return data;
};
