import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

import App from './App.vue';
import router from './router';
import MyPreset from './config/presetConfig'; // Import preset config

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(ConfirmationService);
app.use(ToastService);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: MyPreset, // Use external preset config
    options: {
      darkModeSelector: 'class',

      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue,'
      }
    }
  }
});

app.mount('#app');
