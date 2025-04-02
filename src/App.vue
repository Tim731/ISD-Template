<script setup>
import { RouterView, useRoute } from 'vue-router';
import SidebarComponent from './components/layouts/SidebarComponent.vue';
import HeaderComponent from './components/layouts/HeaderComponent.vue';
import FooterColorComponent from './components/layouts/FooterColorComponent.vue';
import Button from 'primevue/button';
import { useSidebarStore } from '@/stores/sidebar'; // Import the store
import { storeToRefs } from 'pinia';

const sidebarStore = useSidebarStore(); // Get the store instance
const { isSidebarOpen } = storeToRefs(sidebarStore); // Get the reactive state
const route = useRoute();

const toggleSidebar = () => {
  sidebarStore.toggleSidebar(); // Use the store's action
};
</script>

<template>
  <div v-if="route.meta.withHeader">
    <HeaderComponent title="ISD Web App Template" @toggle-sidebar="toggleSidebar">
      <template #actions>
        <div class="text-sm lg:text-xl font-bold">
          <span>Mabuhay, </span>
          <span class="font-bold"> Ranniel! </span>
          <Button severity="success" text class="lg:ml-3">
            <i class="pi pi-sign-out "></i>
          </Button>
        </div>
      </template>
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
    <RouterView />
  </template>
</template>

<style scoped>
/* ... (rest of your existing styles) ... */
</style>
