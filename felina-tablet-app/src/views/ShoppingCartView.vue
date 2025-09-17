<template>
  <div>
    <h1>Ostukorv</h1>
    <div v-if="cartStore.cartItemCount > 0" class="cart-container">
      <ul class="cart-items">
        <li v-for="item in cartStore.cartItems" :key="item.ean" class="cart-item">
          <img :src="item.imageUrl" :alt="item.name" class="item-image"/>
          <div class="item-details">
            <h4>{{ item.name }}</h4>
            <p>{{ item.price.toFixed(2) }} €</p>
          </div>
          <div class="item-quantity">
            Kogus: {{ item.quantity }}
          </div>
          <button @click="cartStore.removeItem(item.ean)" class="remove-btn">Eemalda</button>
        </li>
      </ul>
      <div class="cart-summary">
        <h3>Kokku: {{ cartStore.cartTotal.toFixed(2) }} €</h3>
        <RouterLink to="/checkout" class="checkout-link">Vormista Tellimus</RouterLink>
      </div>
    </div>
    <div v-else>
      <p>Ostukorv on tühi.</p>
      <RouterLink to="/">Jätka ostlemist</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { RouterLink } from 'vue-router';

const cartStore = useCartStore();
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}
.item-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
}
.item-details {
    flex-grow: 1;
}
.remove-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
}
.cart-summary {
    margin-top: 2rem;
    text-align: right;
}
.checkout-link {
    display: inline-block;
    padding: 1rem 2rem;
    background: #28a745;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-size: 1.2rem;
}
</style>
