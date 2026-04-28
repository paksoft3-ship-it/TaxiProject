import { NextRequest, NextResponse } from 'next/server';
import { buildMyPOSParams, signMyPOSParams, MYPOS_CHECKOUT_URL } from '@/lib/mypos';

export async function POST(req: NextRequest) {
  try {
    const { amount, bookingId, description, customerEmail, customerFirstName, customerLastName } =
      await req.json();

    if (!process.env.MYPOS_CONFIG_PACK) {
      return NextResponse.json(
        { error: 'myPOS is not configured on this server.' },
        { status: 500 }
      );
    }

    if (!amount || !bookingId) {
      return NextResponse.json(
        { error: 'Missing amount or bookingId.' },
        { status: 400 }
      );
    }

    const appUrl    = process.env.NEXT_PUBLIC_APP_URL!;
    const amountEUR = (amount / 150).toFixed(2);
    const orderId   = `PT-${bookingId}-${Date.now()}`;

    const params = buildMyPOSParams({
      amount:            amountEUR,
      currency:          'EUR',
      orderId,
      urlOk:             `${appUrl}/booking/confirmation?booking=${bookingId}&gateway=mypos`,
      urlCancel:         `${appUrl}/booking/payment?booking=${bookingId}&amount=${amount}&cancelled=1`,
      urlNotify:         `${appUrl}/api/mypos/notify`,
      customerEmail,
      customerFirstName,
      customerLastName,
    });

    const signature = signMyPOSParams(params);

    return NextResponse.json({
      checkoutUrl: MYPOS_CHECKOUT_URL,
      params: { ...params, Signature: signature },
    });
  } catch (err: any) {
    console.error('myPOS create-payment error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error.' },
      { status: 500 }
    );
  }
}
