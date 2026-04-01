import { NextRequest, NextResponse } from 'next/server';
import { captureOrder } from '@/lib/paypal';
import prisma from '@/lib/db';
import {
  sendBookingConfirmation,
  sendAdminBookingNotification,
  sendPaymentConfirmation,
} from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderID, bookingId } = body;

    if (!orderID || !bookingId) {
      return NextResponse.json(
        { error: 'Missing orderID or bookingId' },
        { status: 400 }
      );
    }

    // Capture the PayPal payment
    const captureData = await captureOrder(orderID);

    if (captureData.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'Payment not completed', status: captureData.status },
        { status: 400 }
      );
    }

    // Update booking — retry up to 3x with backoff to handle Neon cold-start.
    // Critical: PayPal payment is already captured at this point, so we MUST
    // succeed here or the customer is charged but booking stays PENDING.
    let updatedBooking = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        updatedBooking = await prisma.booking.update({
          where: { id: bookingId },
          data: {
            paymentStatus: 'PAID',
            status: 'CONFIRMED',
            paymentIntentId: orderID,
            paidAt: new Date(),
          },
          include: {
            tour: { select: { name: true } },
          },
        });
        break; // success
      } catch (dbErr: any) {
        if (attempt === 3) throw dbErr; // rethrow on final attempt
        console.warn(`DB update attempt ${attempt} failed, retrying in ${attempt * 2}s…`, dbErr.code);
        await new Promise((r) => setTimeout(r, attempt * 2000));
      }
    }

    // Fetch the booking for email notifications
    const booking = updatedBooking ?? await prisma.booking.findUnique({
      where: { id: bookingId },
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

      // Send emails non-blocking
      const sendSafely = (label: string, fn: Promise<void>) =>
        fn.catch((err) => console.error(`Failed to send ${label} email:`, err));

      Promise.all([
        sendSafely('booking confirmation', sendBookingConfirmation(emailData)),
        sendSafely('payment confirmation', sendPaymentConfirmation(emailData)),
        sendSafely('admin notification', sendAdminBookingNotification(emailData)),
      ]);
    }

    return NextResponse.json({
      success: true,
      captureId: captureData.id,
    });
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    return NextResponse.json(
      { error: 'Failed to capture payment' },
      { status: 500 }
    );
  }
}
