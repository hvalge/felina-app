<template>
  <div class="notifications-container">
    <Notification 
      v-for="notification in notificationStore.notifications" 
      :key="notification.id" 
      :notification="notification" 
    />
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/notifications';
import Notification from './NotificationMessage.vue';

const notificationStore = useNotificationStore();
</script>

<style scoped>
.notifications-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  width: 300px;
}
</style>