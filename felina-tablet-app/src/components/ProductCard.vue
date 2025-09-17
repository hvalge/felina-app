<template>
  <div class="product-card">
    <img :src="product.imageUrl" :alt="product.name" class="product-image" />
    <div class="product-info">
        <h3>{{ product.name }}</h3>
        <p class="price">{{ product.price.toFixed(2) }} €</p>
        <p class="stock">Laos: {{ product.stock }}</p>
        <button @click="addToCart" :disabled="product.stock === 0">Lisa Ostukorvi</button>
    </div>
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
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  background: #fff;
  transition: box-shadow 0.3s;
}
.product-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.product-info {
    padding: 1rem;
}
.price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
}
.stock {
    color: #666;
    font-size: 0.9rem;
}
button {
  background-color: #d33692;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #b92a7e;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
