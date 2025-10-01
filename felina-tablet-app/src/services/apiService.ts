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

apiClient.interceptors.request.use(
  (config) => {
    logger.info(`Sending ${config.method?.toUpperCase()} request to ${config.baseURL}${config.url}`);

    if (config.data && (config.method === 'post' || config.method === 'put' || config.method === 'patch')) {
      logger.info('Request body:', config.data);
    }

    return config;
  },
  (error) => {
    logger.error({ error }, 'Request failed before being sent.');
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    logger.info(`Received response for ${response.config.method?.toUpperCase()} ${response.config.url} with status ${response.status}`);
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        logger.error(`Request to ${error.config?.url} failed with status ${error.response?.status}`);
        
        if (error.response.status === 401) {
          return Promise.reject(new Error('Autentimine ebaõnnestus. Palun kontrollige oma API võtit.'));
        }
        if (error.response.status === 404) {
          return Promise.reject(new Error('Vastavat ressurssi ei leitud.'));
        }
      } else if (error.request) {
        logger.error('No response received for the request.');
        return Promise.reject(new Error('Server ei vasta. Palun proovige hiljem uuesti.'));
      }
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