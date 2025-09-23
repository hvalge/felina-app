import axios from 'axios';
import type { Product, OrderPayload } from '@/types';
import { logger } from '@/utils/logger';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': import.meta.env.VITE_API_KEY,
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Log the request method and full URL
    logger.info(`Sending ${config.method?.toUpperCase()} request to ${config.baseURL}${config.url}`);
    
    // Log the request body for POST/PUT/PATCH requests
    if (config.data && (config.method === 'post' || config.method === 'put' || config.method === 'patch')) {
      logger.info('Request body:', config.data);
    }
    
    return config;
  },
  (error) => {
    // Handle request error
    logger.error({ error }, 'Request failed before being sent.');
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses
    logger.info(`Received response for ${response.config.method?.toUpperCase()} ${response.config.url} with status ${response.status}`);
    return response;
  },
  (error) => {
    // Handle response errors
    if (axios.isAxiosError(error)) {
      logger.error(`Request to ${error.config?.url} failed with status ${error.response?.status}`);
    } else {
      logger.error({ error }, 'An unexpected error occurred during the request.');
    }
    return Promise.reject(error);
  }
);

export async function getProductByEan(ean: string): Promise<Product | null> {
  logger.info(`Attempting to fetch product with EAN: ${ean}`);
  try {
    const response = await apiClient.get<Product>(`/products/${ean}`);
    logger.info({ product: response.data }, `Successfully fetched product with EAN: ${ean}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
        logger.warn(`Product with EAN: ${ean} not found.`);
        return null;
    }
    logger.error({ error }, `Error fetching product with EAN ${ean}`);
    throw new Error('Viga toote pärimisel.');
  }
}

export async function createOrder(orderPayload: OrderPayload): Promise<{ success: boolean; orderId?: string }> {
    logger.info({ orderPayload }, 'Attempting to create a new order.');
    try {
        const response = await apiClient.post<{ success: boolean; orderId: string }>('/orders', orderPayload);
        logger.info({ result: response.data }, 'Order created successfully.');
        return response.data;
    } catch (error) {
        logger.error({ error }, 'Error creating order.');
        throw new Error('Tellimuse loomisel tekkis viga.');
    }
}
