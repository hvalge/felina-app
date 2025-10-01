<template>
  <div>
    <h1>Tooted</h1>
    <SearchBar @search="handleSearch" />
    <div v-if="loading">Laen...</div>
    <div v-if="product" class="found-product">
        <h2>Leitud Toode</h2>
        <ProductCard :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { Product } from '@/types';
import { useCartStore } from '@/stores/cart';
import SearchBar from '@/components/SearchBar.vue';
import ProductCard from '@/components/ProductCard.vue';
import { logger } from '@/utils/logger';

const product: Ref<Product | null> = ref(null);
const loading: Ref<boolean> = ref(false);
const cartStore = useCartStore();

async function handleSearch(ean: string): Promise<void> {
  loading.value = true;
  product.value = null;
  logger.info(`Handling search for product with EAN: ${ean}`);

  const foundProduct = await cartStore.fetchAndAddItemByEan(ean);
  
  if (foundProduct) {
    product.value = foundProduct;
  }
  
  loading.value = false;
}
</script>

<style scoped>
.found-product {
    margin-top: 2rem;
}
</style>