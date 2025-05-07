import axios from 'axios';
import CryptoJS from 'crypto-js';

const API_URL = import.meta.env.VITE_API_URL;
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
const API_KEY = import.meta.env.VITE_API_KEY;

// Helper to decrypt stored user from localStorage
const getDecryptedUser = () => {
  try {
    const encryptedData = localStorage.getItem('auth');
    if (!encryptedData) return null;

    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decrypted;
  } catch (err) {
    console.error('Failed to decrypt auth data', err);
    return null;
  }
};

// Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
  },
  timeout: 5000,
});

// Request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const user = getDecryptedUser();
    config.headers['X-API-KEY'] = API_KEY;

    if (user?.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    console.error('API error:', message);
    return Promise.reject(message);
  }
);

export default axiosInstance;
