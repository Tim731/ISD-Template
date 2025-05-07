import { defineStore } from 'pinia';
import CryptoJS from 'crypto-js';
import axiosInstance from '../config/axiosConfig';

// Encryption key (keep this secret and secure)
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// Helper functions
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (cipherText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Error decrypting data:', error);
    return null;
  }
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    error: null,
  }),
  actions: {
    async login(username, password) {
      try {
        const formdata = new FormData();
        formdata.append('username', username);
        formdata.append('password', password);

        const response = await axiosInstance.post('/login', formdata);

        if (response.status === 201) {
          this.user = response.data;
          this.error = null;
        } else {
          this.error = response.data.message || 'Login failed';
        }
      } catch (error) {
        this.error = error || 'An error occurred during login';
        console.error('Login error:', error);
      }
    },
    async logout() {
      if (!this.user) return;

      try {
        await axiosInstance.post('/logout');
        this.user = null;
        return true;
      } catch (error) {
        console.error('Logout failed:', error);
        return false;
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getToken: (state) => state.user?.token || null,
  },
  persist: {
    enabled: true,
    serializer: {
      serialize: encryptData,
      deserialize: decryptData,
    },
    key: 'auth',
    storage: localStorage,
    paths: ['user'],
  },
});
