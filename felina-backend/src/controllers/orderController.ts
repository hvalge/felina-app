import type { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import type { OrderPayload } from '../types';

/**
 * Handles the creation of a new order.
 * In a real application, this would interact with a database and the Odoo ERP.
 */
export const createOrder = (req: Request, res: Response) => {
  const orderData: OrderPayload = req.body;

  // Basic validation
  if (!orderData.items || orderData.items.length === 0 || !orderData.customer || !orderData.storeId || !orderData.deviceId) {
    return res.status(400).json({ message: 'Invalid order data' });
  }

  // In a real application:
  // 1. Process the payment via a payment gateway (e.g., Stripe).
  // 2. If payment is successful, create the order in your database.
  // 3. Send the order to the Odoo ERP via its API.
  // 4. Handle any potential errors from these services.
  
  console.log('Received new order:', JSON.stringify(orderData, null, 2));
  
  const orderId = randomUUID().substring(0, 8).toUpperCase();

  res.status(201).json({ success: true, orderId });
};
