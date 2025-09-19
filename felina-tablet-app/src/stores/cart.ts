import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import type { CartItem, Product } from '@/types';
import { useNotificationStore } from './notifications';
import { logger } from '@/utils/logger';

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
    logger.debug(`Attempting to add product to cart: ${product.ean}`);
    if (items.value.has(product.ean)) {
      const existingItem = items.value.get(product.ean)!;
      if (existingItem.quantity < product.stock) {
        existingItem.quantity++;
        notificationStore.addNotification(`${product.name} lisati ostukorvi.`, 'success');
        logger.info({ product }, `Added another unit of ${product.name} to cart.`);
      } else {
        notificationStore.addNotification('Maksimaalne laokogus on saavutatud!', 'error');
        logger.warn({ product }, `Failed to add ${product.name}, max stock reached.`);
      }
    } else {
       if (product.stock > 0) {
         items.value.set(product.ean, { ...product, quantity: 1 });
         notificationStore.addNotification(`${product.name} lisati ostukorvi.`, 'success');
         logger.info({ product }, `Added new product ${product.name} to cart.`);
       } else {
         notificationStore.addNotification('Toode on laost otsas!', 'error');
         logger.warn({ product }, `Failed to add ${product.name}, out of stock.`);
       }
    }
  }

  function removeItem(ean: string): void {
    logger.debug(`Attempting to remove item with EAN: ${ean}`);
    const item = items.value.get(ean);
    if (item) {
        if (item.quantity > 1) {
            item.quantity--;
            logger.info({ ean }, `Decremented quantity for item ${item.name}.`);
        } else {
            items.value.delete(ean);
            logger.info({ ean }, `Removed last unit of item ${item.name}.`);
        }
        notificationStore.addNotification(`${item.name} eemaldati ostukorvist.`, 'success');
    }
  }

  function clearCart(): void {
    logger.info('Clearing the shopping cart.');
    items.value.clear();
  }

  return { items, cartItems, cartTotal, cartItemCount, addItem, removeItem, clearCart };
});
