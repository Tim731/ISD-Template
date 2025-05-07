<template>
  <div class="flex justify-center items-center h-full w-full">
    <div class="w-full max-w-2xl bg-white rounded-2xl shadow-md pt-30 pb-10 px-15">
      <h2 class="text-2xl font-semibold text-center mb-20">ISD Template Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="username" class="block text-gray-700 font-medium mb-1">Username</label>
          <InputText id="username" v-model="username" required />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-medium mb-1">Password</label>
          <Password id="password" v-model="password" :feedback="false" required />
        </div>
        <Button label="Login" class="w-full" type="submit" :loading="isLoading" />
        <div class="text-xs text-center mt-2">
          <span>Having trouble logging in? Email us at </span>
          <a href="mailto:isdsupport@mail.philrice.gov.ph" class="text-green">isdsupport@mail.philrice.gov.ph</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

const username = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();
const isLoading = ref(false); // Add a loading state

const handleLogin = async () => {
  isLoading.value = true; // Set loading to true when login starts
  try {
    await authStore.login(username.value, password.value);

    if (authStore.user) {
      toast.add({ severity: 'success', summary: 'Login Successful', detail: `Welcome, ${username.value}!`, life: 3000 });
      router.push({ name: 'home' });
    } else {
      toast.add({ severity: 'error', summary: 'Login Failed', detail: authStore.error || 'Invalid credentials', life: 3000 });
    }
  } finally {
    isLoading.value = false; // Set loading to false when login finishes (success or error)
  }
};
</script>

<style scoped></style>
