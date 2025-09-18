import type { OrderPayload } from '../types/index.js';

// Real application would use the official 'stripe' Node.js library.

/**
 * Processes a payment for a given order.
 * @param orderData - The order details.
 * @param paymentToken - A token from the frontend representing the payment method.
 * @returns A promise that resolves to true if the payment is successful.
 */
export const processPayment = async (orderData: OrderPayload, paymentToken: string = 'tok_mockSuccess'): Promise<boolean> => {
  const totalAmount = orderData.items.reduce((acc: number, item: { price: number; quantity: number; }) => acc + item.price * item.quantity, 0);
  // Stripe expects the amount in the smallest currency unit (e.g., cents).
  const amountInCents = Math.round(totalAmount * 100);

  console.log(`[Stripe Service] Processing payment of €${totalAmount.toFixed(2)} (${amountInCents} cents)`);
  
  // MOCK STRIPE API CALL
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  // const charge = await stripe.charges.create({
  //   amount: amountInCents,
  //   currency: 'eur',
  //   source: paymentToken,
  //   description: `Order from ${orderData.storeId} on device ${orderData.deviceId}`,
  //   receipt_email: orderData.customer.email,
  // });
  
  // Simulate a successful payment based on the mock token.
  if (paymentToken === 'tok_mockSuccess') {
    console.log('[Stripe Service] Payment successful.');
    return Promise.resolve(true);
  } else {
    console.error('[Stripe Service] Payment failed.');
    return Promise.resolve(false);
  }
};
