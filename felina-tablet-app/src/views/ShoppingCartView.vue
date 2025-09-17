<template>
  <div>
    <h1>Ostukorv</h1>
    <div v-if="cartStore.cartItemCount > 0">
      <ul>
        <li v-for="item in cartStore.cartItems" :key="item.ean">
          {{ item.name }} - {{ item.quantity }} x {{ item.price.toFixed(2) }} €
          <button @click="cartStore.removeItem(item.ean)">Eemalda</button>
        </li>
      </ul>
      <h3>Kokku: {{ cartStore.cartTotal.toFixed(2) }} €</h3>
      <RouterLink to="/checkout">Vormista Tellimus</RouterLink>
    </div>
    <div v-else>
      <p>Ostukorv on tühi.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { RouterLink } from 'vue-router';

const cartStore = useCartStore();
</script>

<style scoped>
li {
  list-style: none;
  margin-bottom: 0.5rem;
}
</style>