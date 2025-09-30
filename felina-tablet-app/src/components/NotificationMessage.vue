<template>
  <div :class="['notification', notification.type]">
    {{ notification.message }}
  </div>
</template>

<script setup lang="ts">
import type { Notification } from '@/stores/notifications';

defineProps<{
  notification: Notification;
}>();
</script>

<style scoped>
.notification {
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  color: white;
  font-weight: bold;
}
.success {
  background-color: #28a745;
}
.error {
  background-color: #dc3545;
}
</style>