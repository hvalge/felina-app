import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { logger } from '@/utils/logger';
import { useDeviceStore } from '@/stores/device';

import App from './App.vue'
import router from './router'

logger.info('Felina Showroom App is starting...');

const app = createApp(App)

app.use(createPinia())
app.use(router)

const deviceStore = useDeviceStore();
deviceStore.setDeviceInfo('store-123', 'device-456');

app.mount('#app');

logger.info('App mounted successfully!');