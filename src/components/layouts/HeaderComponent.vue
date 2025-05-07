<template>
  <header class="header-custom">
    <div class="header-content">
      <div class="flex items-center">
        <Button class="p-2 rounded-md hover:bg-gray-300 mr-4" @click="toggleSidebar" text>
          <i class="pi pi-bars"></i>
        </Button>
        <span class="text-sm lg:text-xl font-bold lg:ml-5">
          {{ title }}
        </span>
      </div>
      <div class="flex items-center">
        <!-- Add any header actions here, e.g., user profile, notifications -->
        <slot name="actions">
          <div class="text-sm lg:text-lg">
            <span>Mabuhay,
              <span class="font-bold">{{ authStore.user?.user.firstname }}</span>
            </span>
            <Button severity="success" text class="lg:ml-3" @click="handleLogout()">
              <i class="pi pi-sign-out "></i>
            </Button>
          </div>
        </slot>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/authStore';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

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

const handleLogout = async () => {
  const success = await authStore.logout();

  if (success) {
    toast.add({ severity: 'success', summary: 'Logged out', detail: 'You have successfully logged out.', life: 3000 });
    router.push({ name: 'Login' });
  } else {
    toast.add({ severity: 'error', summary: 'Logout Failed', detail: 'An error occurred while logging out.', life: 3000 });
  }
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
