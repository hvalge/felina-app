<template>
  <div class="toast-container">
    <transition-group name="toast">
      <div v-for="notification in notifications" :key="notification.id" :class="['toast', `toast-${notification.type}`]">
        {{ notification.message }}
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/notifications';
import { storeToRefs } from 'pinia';

const notificationStore = useNotificationStore();
const { notifications } = storeToRefs(notificationStore);
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: all 0.5s ease;
}

.toast-success {
  background-color: #28a745;
}

.toast-error {
  background-color: #dc3545;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
