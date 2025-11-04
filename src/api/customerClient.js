// api/customerClient.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1';
const customerClient = axios.create({
  baseURL: API_BASE_URL, // Your specific customer base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
customerClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('customerToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle auth errors
customerClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.error('Auth error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default customerClient;
