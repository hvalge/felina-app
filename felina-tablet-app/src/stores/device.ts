import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';

export const useDeviceStore = defineStore('device', () => {
  const storeId: Ref<string | null> = ref(null);
  const deviceId: Ref<string | null> = ref(null);

  function setDeviceInfo(newStoreId: string, newDeviceId: string) {
    storeId.value = newStoreId;
    deviceId.value = newDeviceId;
  }

  return { storeId, deviceId, setDeviceInfo };
});
