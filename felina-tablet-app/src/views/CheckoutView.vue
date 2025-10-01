<template>
    <div>
        <h1>Tellimuse Vormistamine</h1>
        <div v-if="!orderPlaced">
            <CheckoutForm @submit="handleOrderSubmit" />
        </div>
        <div v-if="orderPlaced" class="success-message">
            <h2>Aitäh tellimuse eest!</h2>
            <p>Teie tellimuse number on: {{ orderId }}</p>
            <p>Saadame peagi kinnituse teie e-posti aadressile.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useDeviceStore } from '@/stores/device';
import { useNotificationStore } from '@/stores/notifications';
import type { CustomerDetails, OrderPayload } from '@/types';
import { createOrder } from '@/services/apiService';
import CheckoutForm from '@/components/CheckoutForm.vue';
import { logger } from '@/utils/logger';

const cartStore = useCartStore();
const deviceStore = useDeviceStore();
const notificationStore = useNotificationStore();
const router = useRouter();
const orderPlaced: Ref<boolean> = ref(false);
const orderId: Ref<string | null> = ref(null);

onMounted(() => {
    logger.info('CheckoutView mounted.');
});

async function handleOrderSubmit(details: CustomerDetails): Promise<void> {
    logger.info('Handling order submission.');
    if (!deviceStore.storeId || !deviceStore.deviceId) {
        const message = 'Seadme andmed puuduvad. Palun kontakteeruge personaliga.';
        notificationStore.addNotification(message, 'error');
        logger.error(message);
        return;
    }

    const orderPayload: OrderPayload = {
        items: cartStore.cartItems,
        customer: details,
        storeId: deviceStore.storeId,
        deviceId: deviceStore.deviceId
    };

    try {
        const paymentSuccessful = true;
        logger.info(`Payment processing: ${paymentSuccessful ? 'successful' : 'failed'}`);

        if (paymentSuccessful) {
            const result = await createOrder(orderPayload);
            if (result.success && result.orderId) {
                orderPlaced.value = true;
                orderId.value = result.orderId;
                cartStore.clearCart();
                notificationStore.addNotification('Tellimus edukalt esitatud!', 'success');
                logger.info({ orderId: result.orderId }, 'Order placed successfully.');
                setTimeout(() => router.push('/'), 5000);
            } else {
                const message = 'Tellimuse esitamisel tekkis viga. Palun proovige uuesti.';
                notificationStore.addNotification(message, 'error');
                logger.error(message);
            }
        } else {
            const message = 'Makse ebaõnnestus. Palun kontrollige oma makseandmeid ja proovige uuesti.';
            notificationStore.addNotification(message, 'error');
            logger.error(message);
        }
    } catch (err) {
        if (err instanceof Error) {
            notificationStore.addNotification(err.message, 'error');
            logger.error({ err }, 'Error during order submission.');
        } else {
            notificationStore.addNotification('Tellimuse esitamisel tekkis ootamatu viga. Palun proovige hiljem uuesti.', 'error');
            logger.error('Unknown error during order submission.');
        }
    }
}
</script>

<style scoped>
.success-message {
    text-align: center;
    padding: 2rem;
    border-radius: 8px;
    margin-top: 2rem;
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}
</style>