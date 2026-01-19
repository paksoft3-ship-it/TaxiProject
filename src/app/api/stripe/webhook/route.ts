import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import prisma from '@/lib/db';
import {
  sendBookingConfirmation,
  sendAdminBookingNotification,
  sendPaymentConfirmation,
} from '@/lib/email';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Update booking status
      await prisma.booking.updateMany({
        where: { paymentIntentId: paymentIntent.id },
        data: {
          paymentStatus: 'PAID',
          status: 'CONFIRMED',
          paidAt: new Date(),
        },
      });

      // Fetch the booking to send email notifications
      const booking = await prisma.booking.findFirst({
        where: { paymentIntentId: paymentIntent.id },
        include: {
          tour: { select: { name: true } },
        },
      });

      if (booking) {
        const emailData = {
          bookingNumber: booking.bookingNumber,
          customerName: booking.customerName,
          customerEmail: booking.customerEmail,
          customerPhone: booking.customerPhone,
          type: booking.type,
          pickupDate: booking.pickupDate,
          pickupTime: booking.pickupTime,
          pickupLocation: booking.pickupLocation,
          dropoffLocation: booking.dropoffLocation || undefined,
          passengers: booking.passengers,
          totalPrice: booking.totalPrice,
          currency: booking.currency,
          specialRequests: booking.specialRequests || undefined,
          tourName: booking.tour?.name,
        };

        // Send emails in parallel (don't await to not block webhook response)
        Promise.all([
          sendBookingConfirmation(emailData),
          sendPaymentConfirmation(emailData),
          sendAdminBookingNotification(emailData),
        ]).catch((error) => {
          console.error('Failed to send booking emails:', error);
        });
      }

      console.log(`Payment succeeded for PaymentIntent: ${paymentIntent.id}`);
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Update booking status
      await prisma.booking.updateMany({
        where: { paymentIntentId: paymentIntent.id },
        data: {
          paymentStatus: 'FAILED',
        },
      });

      console.log(`Payment failed for PaymentIntent: ${paymentIntent.id}`);
      break;
    }

    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge;

      if (charge.payment_intent) {
        await prisma.booking.updateMany({
          where: { paymentIntentId: charge.payment_intent as string },
          data: {
            paymentStatus: 'REFUNDED',
          },
        });
      }

      console.log(`Charge refunded: ${charge.id}`);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
