<template>
  <div class="product-card">
    <img :src="product.imageUrl" :alt="product.name" />
    <h3>{{ product.name }}</h3>
    <p>{{ product.price.toFixed(2) }} €</p>
    <button @click="addToCart">Lisa Ostukorvi</button>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types';
import { useCartStore } from '@/stores/cart';

const props = defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();

function addToCart(): void {
  cartStore.addItem(props.product);
}
</script>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
}
img {
  max-width: 150px;
}
</style>