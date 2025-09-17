<template>
    <form @submit.prevent="submitForm" class="checkout-form">
        <div class="form-group">
            <label for="name">Nimi</label>
            <input id="name" type="text" v-model="details.name" required />
        </div>
        <div class="form-group">
            <label for="email">E-post</label>
            <input id="email" type="email" v-model="details.email" required />
        </div>
        <div class="form-group">
            <label for="address">Aadress</label>
            <textarea id="address" v-model="details.address" required></textarea>
        </div>
        <button type="submit">Vormista Tellimus</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { CustomerDetails } from '@/types';

const details: Ref<CustomerDetails> = ref({
    name: '',
    email: '',
    address: '',
});

const emit = defineEmits<{
    (e: 'submit', details: CustomerDetails): void;
}>();

function submitForm() {
    emit('submit', details.value);
}
</script>

<style scoped>
.checkout-form {
    max-width: 500px;
    margin: 0 auto;
}
.form-group {
    margin-bottom: 1.5rem;
}
label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}
input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
button {
    width: 100%;
    padding: 1rem;
    font-size: 1.2rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>
