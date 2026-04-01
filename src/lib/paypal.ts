// PayPal REST API v2 server helpers
// Works with both sandbox and live by checking PAYPAL_MODE env var

const PAYPAL_API_BASE =
  process.env.PAYPAL_MODE === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

// PayPal does NOT support ISK. Convert to EUR for payment.
// This rate can be overridden via PAYPAL_ISK_TO_EUR_RATE env var.
// Default: 150 ISK = 1 EUR (approximate). Adjust as needed.
const ISK_TO_EUR_RATE = parseFloat(process.env.PAYPAL_ISK_TO_EUR_RATE || '150');

/**
 * Generate a PayPal OAuth2 access token using client credentials.
 */
export async function generateAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('PayPal client ID or secret is not configured');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Failed to get PayPal access token: ${errorData}`);
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Create a PayPal order.
 * ISK is not supported by PayPal, so we convert to EUR.
 * Returns the converted EUR amount alongside the order.
 */
export async function createOrder(
  amountISK: number,
  description?: string
): Promise<{ id: string; status: string; amountEUR: string }> {
  const accessToken = await generateAccessToken();

  // Convert ISK to EUR (2 decimal places)
  const amountEUR = (amountISK / ISK_TO_EUR_RATE).toFixed(2);

  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: amountEUR,
          },
          description: description || 'PrimeTaxi & Tours Booking',
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Failed to create PayPal order: ${errorData}`);
  }

  const orderData = await response.json();
  return { ...orderData, amountEUR };
}

/**
 * Capture an approved PayPal order to collect payment.
 */
export async function captureOrder(
  orderId: string
): Promise<{ id: string; status: string; purchase_units: any[] }> {
  const accessToken = await generateAccessToken();

  const response = await fetch(
    `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Failed to capture PayPal order: ${errorData}`);
  }

  return response.json();
}
