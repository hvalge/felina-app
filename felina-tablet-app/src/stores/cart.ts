import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import type { CartItem, Product } from '@/types';
import { useNotificationStore } from './notifications';

export const useCartStore = defineStore('cart', () => {
  const items: Ref<Map<string, CartItem>> = ref(new Map());
  const notificationStore = useNotificationStore();

  const cartItems: ComputedRef<CartItem[]> = computed(() => Array.from(items.value.values()));
  const cartTotal: ComputedRef<number> = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
  });
  const cartItemCount: ComputedRef<number> = computed(() => {
    return cartItems.value.reduce((count, item) => count + item.quantity, 0);
  });

  function addItem(product: Product): void {
    if (items.value.has(product.ean)) {
      const existingItem = items.value.get(product.ean)!;
      if (existingItem.quantity < product.stock) {
        existingItem.quantity++;
        notificationStore.addNotification(`${product.name} lisati ostukorvi.`, 'success');
      } else {
        notificationStore.addNotification('Maksimaalne laokogus on saavutatud!', 'error');
      }
    } else {
       if (product.stock > 0) {
         items.value.set(product.ean, { ...product, quantity: 1 });
         notificationStore.addNotification(`${product.name} lisati ostukorvi.`, 'success');
       } else {
         notificationStore.addNotification('Toode on laost otsas!', 'error');
       }
    }
  }

  function removeItem(ean: string): void {
    const item = items.value.get(ean);
    if (item) {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            items.value.delete(ean);
        }
        notificationStore.addNotification(`${item.name} eemaldati ostukorvist.`, 'success');
    }
  }

  function clearCart(): void {
    items.value.clear();
  }

  return { items, cartItems, cartTotal, cartItemCount, addItem, removeItem, clearCart };
});
