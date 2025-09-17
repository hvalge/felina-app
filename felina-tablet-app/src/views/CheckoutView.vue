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
        <div v-if="error" class="error-message">
            <p>{{ error }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import type { CustomerDetails } from '@/types';
import { createOrder } from '@/services/apiService';
import CheckoutForm from '@/components/CheckoutForm.vue';

const cartStore = useCartStore();
const router = useRouter();
const orderPlaced: Ref<boolean> = ref(false);
const orderId: Ref<string | null> = ref(null);
const error: Ref<string | null> = ref(null);

async function handleOrderSubmit(details: CustomerDetails): Promise<void> {
    error.value = null;
    const result = await createOrder(cartStore.cartItems, details);
    if (result.success && result.orderId) {
        orderPlaced.value = true;
        orderId.value = result.orderId;
        cartStore.clearCart();
        setTimeout(() => router.push('/'), 5000); // Redirect after 5s
    } else {
        error.value = "Tellimuse esitamisel tekkis viga. Palun proovige uuesti.";
    }
}
</script>

<style scoped>
.success-message, .error-message {
    text-align: center;
    padding: 2rem;
    border-radius: 8px;
    margin-top: 2rem;
}
.success-message {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}
.error-message {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}
</style>
