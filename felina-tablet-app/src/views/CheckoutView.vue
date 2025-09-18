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
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useDeviceStore } from '@/stores/device';
import { useNotificationStore } from '@/stores/notifications';
import type { CustomerDetails, OrderPayload } from '@/types';
import { createOrder } from '@/services/apiService';
import CheckoutForm from '@/components/CheckoutForm.vue';

const cartStore = useCartStore();
const deviceStore = useDeviceStore();
const notificationStore = useNotificationStore();
const router = useRouter();
const orderPlaced: Ref<boolean> = ref(false);
const orderId: Ref<string | null> = ref(null);

async function handleOrderSubmit(details: CustomerDetails): Promise<void> {
    if (!deviceStore.storeId || !deviceStore.deviceId) {
        notificationStore.addNotification('Seadme andmed puuduvad. Palun kontakteeruge personaliga.', 'error');
        return;
    }

    const orderPayload: OrderPayload = {
        items: cartStore.cartItems,
        customer: details,
        storeId: deviceStore.storeId,
        deviceId: deviceStore.deviceId
    };

    try {
        // Mock a successful payment.
        const paymentSuccessful = true;

        if (paymentSuccessful) {
            const result = await createOrder(orderPayload);
            if (result.success && result.orderId) {
                orderPlaced.value = true;
                orderId.value = result.orderId;
                cartStore.clearCart();
                notificationStore.addNotification('Tellimus edukalt esitatud!', 'success');
                setTimeout(() => router.push('/'), 5000);
            } else {
                notificationStore.addNotification('Tellimuse esitamisel tekkis viga.', 'error');
            }
        } else {
            notificationStore.addNotification('Makse ebaõnnestus.', 'error');
        }
    } catch (err) {
        if (err instanceof Error) {
            notificationStore.addNotification(err.message, 'error');
        } else {
            notificationStore.addNotification('Tellimuse esitamisel tekkis tundmatu viga.', 'error');
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
