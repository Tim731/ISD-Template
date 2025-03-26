<script setup>
import { RouterView, useRoute } from 'vue-router'
import SidebarComponent from './components/layouts/SidebarComponent.vue';
import HeaderComponent from './components/layouts/HeaderComponent.vue';
import { ref } from 'vue';
import Button from 'primevue/button';

const isSidebarOpen = ref(true);
const route = useRoute();

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <div v-if="route.meta.withHeader">
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
      <SidebarComponent
        :sidebarClass="['ml-[-300px] lg:ml-0', isSidebarOpen ? 'ml-0!' : 'ml-[-300px]!', 'transition-all duration-500 ease-in-out min-w-[300px] max-w-[300px]']">
        <RouterView />
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
