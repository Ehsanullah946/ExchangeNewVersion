import axios from 'axios';
import store from '../store';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
