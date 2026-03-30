import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { stripe } from '@/lib/stripe';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      select: { paymentIntentId: true, paymentStatus: true },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (!booking.paymentIntentId) {
      return NextResponse.json({ error: 'No payment required for this booking' }, { status: 400 });
    }

    if (booking.paymentStatus === 'PAID') {
      return NextResponse.json({ error: 'Booking already paid' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(booking.paymentIntentId);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error retrieving client secret:', error);
    return NextResponse.json({ error: 'Failed to retrieve payment details' }, { status: 500 });
  }
}
