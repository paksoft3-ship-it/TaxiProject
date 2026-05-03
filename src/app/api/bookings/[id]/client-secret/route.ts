import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { createPaymentIntent } from '@/lib/stripe';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      select: {
        id:              true,
        bookingNumber:   true,
        customerEmail:   true,
        totalPrice:      true,
        currency:        true,
        paymentIntentId: true,
        paymentStatus:   true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.paymentStatus === 'PAID') {
      return NextResponse.json({ error: 'Booking already paid' }, { status: 400 });
    }

    // If no intent yet (e.g. Stripe key wasn't configured at booking time), create one now
    let intentId = booking.paymentIntentId;
    if (!intentId) {
      const intent = await createPaymentIntent(booking.totalPrice, booking.currency, {
        bookingId:     booking.id,
        bookingNumber: booking.bookingNumber,
        customerEmail: booking.customerEmail,
      });
      intentId = intent.id;
      await prisma.booking.update({
        where: { id: booking.id },
        data:  { paymentIntentId: intentId },
      });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(intentId);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Error retrieving client secret:', msg);

    // Give a clear message when Stripe is not configured
    if (msg.includes('Invalid API Key') || msg.includes('sk_test_mock')) {
      return NextResponse.json(
        { error: 'Payment is not configured yet. Please contact support.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: 'Failed to retrieve payment details' }, { status: 500 });
  }
}
