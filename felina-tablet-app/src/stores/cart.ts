import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import type { CartItem, Product } from '@/types';

export const useCartStore = defineStore('cart', () => {
  const items: Ref<Map<string, CartItem>> = ref(new Map());

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
      } else {
        alert('Maksimaalne laokogus on saavutatud!');
      }
    } else {
       if (product.stock > 0) {
         items.value.set(product.ean, { ...product, quantity: 1 });
       } else {
         alert('Toode on laost otsas!');
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
    }
  }

  function clearCart(): void {
    items.value.clear();
  }

  return { items, cartItems, cartTotal, cartItemCount, addItem, removeItem, clearCart };
});
