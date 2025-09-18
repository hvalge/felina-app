import axios from 'axios';
import type { Product, OrderPayload } from '@/types';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': import.meta.env.VITE_API_KEY,
  },
});

export async function getProductByEan(ean: string): Promise<Product | null> {
  try {
    const response = await apiClient.get<Product>(`/products/${ean}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
    }
    console.error(`Error fetching product with EAN ${ean}:`, error);
    throw new Error('Viga toote pärimisel.');
  }
}

export async function createOrder(orderPayload: OrderPayload): Promise<{ success: boolean; orderId?: string }> {
    try {
        const response = await apiClient.post<{ success: boolean; orderId: string }>('/orders', orderPayload);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Tellimuse loomisel tekkis viga.');
    }
}
