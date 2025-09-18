<template>
  <header>
    <div class="wrapper">
      <div class="logo">Felina Showroom</div>
      <nav>
        <RouterLink to="/">Tooted</RouterLink>
        <RouterLink to="/cart">
          <span class="cart-icon">🛒</span>
          Ostukorv ({{ cartStore.cartItemCount }})
        </RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
</script>

<style scoped>
header {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
}
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
.logo {
  font-weight: bold;
  font-size: 1.5rem;
  color: #333;
}
nav {
  display: flex;
  gap: 1.5rem;
  font-size: 1.2rem;
}
nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
nav a:hover,
nav a.router-link-exact-active {
  color: #d33692;
}
</style>
