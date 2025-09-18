import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error';
}

export const useNotificationStore = defineStore('notifications', () => {
  const notifications: Ref<Notification[]> = ref([]);
  let nextId = 0;

  function addNotification(message: string, type: 'success' | 'error' = 'success', duration: number = 3000) {
    const id = nextId++;
    notifications.value.push({ id, message, type });
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  }

  function removeNotification(id: number) {
    const index = notifications.value.findIndex(n => n.id === id);
    if (index !== -1) {
      notifications.value.splice(index, 1);
    }
  }

  return { notifications, addNotification, removeNotification };
});
