<script setup>
import { RouterView } from 'vue-router'
import SidebarComponent from './components/layouts/SidebarComponent.vue';
import HeaderComponent from './components/layouts/HeaderComponent.vue';
import { ref } from 'vue';
import Button from 'primevue/button';

const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <HeaderComponent title="ISD Web App Template" @toggle-sidebar="toggleSidebar">
    <template #actions>
      <div class="text-[18px] leading-[22px] font-normal tracking-normal text-black">
        <span>Mabuhay, </span>
        <span class="font-bold"> Ranniel! </span>
        <Button severity="success" text class="ml-3">
          <i class="pi pi-sign-out "></i>
        </Button>

      </div>

    </template>
  </HeaderComponent>
  <div class="flex w-full" style="height: calc(100vh - 86px);">
    <SidebarComponent :sidebarClass="[isSidebarOpen ? 'block' : 'hidden', 'transition-all duration-300 ease-in-out']">
      <RouterView />
    </SidebarComponent>
  </div>
</template>

<style scoped>
/* ... (rest of your existing styles) ... */
</style>
