import axios from 'axios';
import type { Product, CartItem, CustomerDetails } from '@/types';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    // TODO: Secret key
    'X-API-Key': 'tablet-secret-key-123',
  },
});

export async function getProductByEan(ean: string): Promise<Product | null> {
  try {
    const response = await apiClient.get<Product>(`/products/${ean}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with EAN ${ean}:`, error);
    return null;
  }
}

export async function createOrder(cart: CartItem[], customer: CustomerDetails): Promise<{ success: boolean; orderId?: string }> {
    try {
        const response = await apiClient.post<{ success: boolean; orderId: string }>('/orders', {
            items: cart,
            customer,
        });
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        return { success: false };
    }
}
