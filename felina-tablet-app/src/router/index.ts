import { createRouter, createWebHistory } from 'vue-router';
import { useCartStore } from '../stores/cart';

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
      beforeEnter: (_to, _from, next) => {
        const cartStore = useCartStore();
        if (cartStore.cartItemCount === 0) {
          next({ name: 'products' });
        } else {
          next();
        }
      },
    },
  ],
});

export default router;