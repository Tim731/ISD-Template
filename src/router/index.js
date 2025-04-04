import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/samples/HomeView.vue'),
      meta: { withHeader: true }
    },
    {
      path: '/buttons',
      name: 'buttons',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/samples/ButtonsSample.vue'),
      meta: { withHeader: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/Login.vue'),
      meta: { withHeader: false }
    },
  ],
})

// Global navigation guard to check for authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Access the Pinia auth store

  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isAuthenticated) {
    // Redirect to login page if not authenticated
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router
