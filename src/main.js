import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

import App from './App.vue';
import router from './router';
import MyPreset from './config/presetConfig'; // Import preset config

const app = createApp(App);
console.log(MyPreset)
app.use(createPinia());
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
