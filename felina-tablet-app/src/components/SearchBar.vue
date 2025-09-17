<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="ean"
      @keydown.enter="handleSearch"
      placeholder="Skaneeri või sisesta tootekood (EAN)"
    />
    <button @click="handleSearch">Otsi</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

const ean: Ref<string> = ref('');

const emit = defineEmits<{
  (e: 'search', ean: string): void;
}>();

function handleSearch(): void {
  if (ean.value.trim()) {
    emit('search', ean.value.trim());
    ean.value = '';
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  margin-bottom: 2rem;
}
input {
  flex-grow: 1;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
}
button {
  padding: 0.75rem 1.5rem;
  border: 1px solid #d33692;
  background-color: #d33692;
  color: white;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 1rem;
}
</style>
