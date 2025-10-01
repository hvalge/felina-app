<template>
  <div>
    <h1>Tooted</h1>
    <SearchBar @search="findAndAddProduct" />
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
import { getProductByEan } from '@/services/apiService';
import { useCartStore } from '@/stores/cart';
import { useNotificationStore } from '@/stores/notifications';
import SearchBar from '@/components/SearchBar.vue';
import ProductCard from '@/components/ProductCard.vue';
import { logger } from '@/utils/logger';

const product: Ref<Product | null> = ref(null);
const loading: Ref<boolean> = ref(false);
const cartStore = useCartStore();
const notificationStore = useNotificationStore();

async function findAndAddProduct(ean: string): Promise<void> {
  loading.value = true;
  product.value = null;
  logger.info(`Searching for product with EAN: ${ean}`);
  try {
    const foundProduct = await getProductByEan(ean);
    if (foundProduct) {
      product.value = foundProduct;
      cartStore.addItem(foundProduct);
      logger.info({ product: foundProduct }, `Product found and added to cart.`);
    } else {
      notificationStore.addNotification(`Toodet koodiga ${ean} ei leitud. Palun kontrollige koodi ja proovige uuesti.`, 'error');
      logger.warn(`Product not found for EAN: ${ean}`);
    }
  } catch (err) {
    if (err instanceof Error) {
        notificationStore.addNotification(err.message, 'error');
        logger.error({ err }, 'Error during product search.');
    } else {
        notificationStore.addNotification('Toote otsimisel tekkis ootamatu viga. Palun proovige hiljem uuesti.', 'error');
        logger.error('Unknown error during product search.');
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.found-product {
    margin-top: 2rem;
}
</style>