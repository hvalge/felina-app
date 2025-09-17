<template>
  <div>
    <h1>Tooted</h1>
    <SearchBar @search="findAndAddProduct" />
    <div v-if="loading">Laen...</div>
    <div v-if="error" class="error">{{ error }}</div>
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
import { getProductByEan } from '@/services/apiService';
import { useCartStore } from '@/stores/cart';
import SearchBar from '@/components/SearchBar.vue';
import ProductCard from '@/components/ProductCard.vue';

const product: Ref<Product | null> = ref(null);
const loading: Ref<boolean> = ref(false);
const error: Ref<string | null> = ref(null);
const cartStore = useCartStore();

async function findAndAddProduct(ean: string): Promise<void> {
  loading.value = true;
  error.value = null;
  product.value = null;
  try {
    const foundProduct = await getProductByEan(ean);
    if (foundProduct) {
      product.value = foundProduct;
      cartStore.addItem(foundProduct);
    } else {
      error.value = `Toodet koodiga ${ean} ei leitud.`;
    }
  } catch (err) {
    error.value = 'Toote otsimisel tekkis viga.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.error {
  color: red;
  margin-bottom: 1rem;
}
.found-product {
    margin-top: 2rem;
}
</style>
