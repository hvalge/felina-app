<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Tooted</RouterLink>
        <RouterLink to="/cart">
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
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
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
}

nav a:hover,
nav a.router-link-exact-active {
  color: #42b983;
}
</style>