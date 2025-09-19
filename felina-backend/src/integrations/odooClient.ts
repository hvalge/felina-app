import type { OrderPayload } from '../types/index.js';
import pino from 'pino';

const logger = pino();

// This is a mock Odoo API client. In a real application, this would
// use a library like 'axios' to make HTTP requests to the Odoo ERP.

/**
 * Checks the stock of a list of items against the Odoo ERP.
 * @param items - An array of cart items.
 * @returns A promise that resolves to true if all items are in stock.
 */
export const checkStockWithOdoo = async (items: OrderPayload['items']): Promise<boolean> => {
  logger.info(`[Odoo Service] Checking stock for: ${items.map(i => `${i.name} (Qty: ${i.quantity})`).join(', ')}`);
  // In a real implementation, you would loop through items and query the Odoo API.
  // For now, we will assume everything is in stock if we found it initially.
  // A real check would be crucial to handle race conditions where stock changes
  // between product lookup and final order placement.
  return Promise.resolve(true);
};

/**
 * Creates an order in the Odoo ERP system.
 * @param orderData - The complete order payload.
 * @returns A promise that resolves with the Odoo order reference ID.
 */
export const createOrderInOdoo = async (orderData: OrderPayload): Promise<string> => {
  logger.info({ orderData }, '[Odoo Service] Creating order with payload');
  
  // MOCK API CALL TO ODOO
  // const odooApiEndpoint = `${process.env.ODOO_API_URL}/sale.order`;
  // const response = await axios.post(odooApiEndpoint, formattedOrderData, {
  //   headers: { 'Authorization': `Bearer ${process.env.ODOO_API_TOKEN}` }
  // });

  // For now, return a mock Odoo order ID.
  const mockOdooOrderId = `SO${Math.floor(10000 + Math.random() * 90000)}`;
  logger.info(`[Odoo Service] Successfully created order. Odoo ID: ${mockOdooOrderId}`);
  
  return Promise.resolve(mockOdooOrderId);
};
