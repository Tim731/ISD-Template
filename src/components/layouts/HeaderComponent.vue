<template>
  <header class="header-custom">
    <div class="header-content">
      <div class="flex items-center">
        <Button class="p-2 rounded-md hover:bg-gray-300 mr-4" @click="toggleSidebar" text>
          <i class="pi pi-bars"></i>
        </Button>
        <h1 class="text-xl font-bold ml-5">
          {{ title }}
        </h1>
      </div>
      <div class="flex items-center">
        <!-- Add any header actions here, e.g., user profile, notifications -->
        <slot name="actions"></slot>
      </div>
    </div>
  </header>
</template>

<script setup>
// Remove: import { ref } from 'vue'; // No longer needed

import Button from 'primevue/button';

const props = defineProps({
  title: {
    type: String,
    default: 'ISD Web App Template',
  },
});

const emit = defineEmits(['toggle-sidebar']);

const toggleSidebar = () => {
  emit('toggle-sidebar');
};
</script>

<style scoped>
.header-custom {
  /* Layout Properties */
  width: 100%;
  /* Changed from 1920px to 100% for responsiveness */
  height: 86px;
  /* UI Properties */
  background: transparent url('/img/Header.png') 10% 30% no-repeat;
  box-shadow: 0px 3px 6px #00000029;
  opacity: 1;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  width: 100%;
  height: 100%;
}

.header-content h1 {
  font: normal normal bold 27px Roboto;
  letter-spacing: 0px;
  color: #000000;
}
</style>
