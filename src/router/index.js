import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
  ],
})

export default router
