<template>
  <Toast />
  <div v-if="route.meta.withHeader">
    <HeaderComponent title="ISD Web App Template" @toggle-sidebar="toggleSidebar">
      <template #actions></template>
    </HeaderComponent>
    <div class="flex w-full" style="height: calc(100vh - 86px);">
      <SidebarComponent :sidebarClass="['ml-[-300px] lg:ml-0', isSidebarOpen ? 'ml-0!' : 'ml-[-300px]!']">
        <div class="p-4 h-[calc(100%-12px)] overflow-auto">
          <RouterView />
        </div>
        <FooterColorComponent />
      </SidebarComponent>
    </div>
  </div>

  <template v-else>
    <NoHeaderComponent>
      <RouterView />
      <template #footer>
        <FooterColorComponent>
          <span class="text-sm text-white mb-5">
            © 2025 PhilRice - Information Systems Division. All rights reserved.
          </span>
        </FooterColorComponent>
      </template>
    </NoHeaderComponent>
  </template>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router';
import SidebarComponent from './components/layouts/SidebarComponent.vue';
import HeaderComponent from './components/layouts/HeaderComponent.vue';
import NoHeaderComponent from './components/layouts/NoHeaderComponent.vue';
import FooterColorComponent from './components/layouts/FooterColorComponent.vue';
import Button from 'primevue/button';
import { useSidebarStore } from '@/stores/sidebar'; // Import the store
import { storeToRefs } from 'pinia';
import Toast from 'primevue/toast';

const sidebarStore = useSidebarStore(); // Get the store instance
const { isSidebarOpen } = storeToRefs(sidebarStore); // Get the reactive state
const route = useRoute();

const toggleSidebar = () => {
  sidebarStore.toggleSidebar(); // Use the store's action
};
</script>
