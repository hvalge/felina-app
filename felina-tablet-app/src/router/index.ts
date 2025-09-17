import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'products',
      component: () => import('../views/ProductView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/ShoppingCartView.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
    },
  ],
});

export default router;