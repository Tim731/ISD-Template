import { defineStore } from 'pinia';
import CryptoJS from 'crypto-js';
import piniaPersistedState from 'pinia-plugin-persistedstate';

// Encryption key (keep this secret and secure)
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// Function to encrypt data
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Function to decrypt data
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
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");

        const formdata = new FormData();
        formdata.append("username", username);
        formdata.append("password", password);

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };

        const response = await fetch('https://isd.philrice.gov.ph/api_center/api/login', requestOptions);
        const result = await response.json();

        if (response.ok) {
          this.user = result; // Store user info on success
          this.error = null;
        } else {
          this.error = result.message || 'Login failed';
        }
      } catch (error) {
        this.error = 'An error occurred';
      }
    },
    async logout() {
      if (!this.user) return;

      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${this.user.token}`);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
      };

      try {
        const response = await fetch("https://isd.philrice.gov.ph/api_center/api/logout", requestOptions);
        const result = await response.text();
        console.log(result);

        this.user = null; // Clear user state

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
    key: 'auth', // Storage key
    storage: localStorage,
    paths: ['user'], // Encrypt only user data
    beforeRestore: (context) => {
      const encryptedData = localStorage.getItem(context.key);
      if (encryptedData) {
        context.store.user = decryptData(encryptedData);
      }
    },
    afterRestore: (context) => {
      if (context.store.user) {
        localStorage.setItem(context.key, encryptData(context.store.user));
      }
    }
  },
});
