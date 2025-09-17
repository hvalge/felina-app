<template>
  <div>
    <h1>Tooted</h1>
    <div class="product-grid">
      <ProductCard v-for="product in products" :key="product.ean" :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { Product } from '@/types';
import ProductCard from '@/components/ProductCard.vue';

// Mock data - this would come from an API call
const products: Ref<Product[]> = ref([
  {
    ean: '1234567890123',
    name: 'Elegant Lingerie Set',
    description: 'A beautiful and comfortable set.',
    price: 79.99,
    imageUrl: 'https://via.placeholder.com/150',
    stock: 10,
  },
  {
    ean: '9876543210987',
    name: 'Silk Night Gown',
    description: 'Luxurious silk for a perfect night.',
    price: 129.50,
    imageUrl: 'https://via.placeholder.com/150',
    stock: 5,
  },
]);
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
</style>