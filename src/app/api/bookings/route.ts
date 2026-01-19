import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { bookingSchema } from '@/lib/validations';
import { generateBookingNumber } from '@/lib/utils';
import { createPaymentIntent } from '@/lib/stripe';

// GET /api/bookings - Get all bookings (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (type) where.type = type;

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          tour: true,
          driver: true,
          vehicle: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({
      bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = bookingSchema.parse(body);

    // Calculate price based on service type
    const basePrices: Record<string, number> = {
      TAXI: 3500,
      AIRPORT_TRANSFER: 19500,
      PRIVATE_TOUR: 45000,
      CUSTOM_TOUR: 60000,
    };

    const basePrice = basePrices[validated.type] || 0;
    const extras = validated.passengers > 4 ? (validated.passengers - 4) * 2000 : 0;
    const totalPrice = basePrice + extras;

    // Create payment intent
    const paymentIntent = await createPaymentIntent(totalPrice, 'isk', {
      bookingType: validated.type,
      customerEmail: validated.customerEmail,
    });

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingNumber: generateBookingNumber(),
        type: validated.type,
        customerName: validated.customerName,
        customerEmail: validated.customerEmail,
        customerPhone: validated.customerPhone,
        passengers: validated.passengers,
        pickupLocation: validated.pickupLocation,
        dropoffLocation: validated.dropoffLocation,
        pickupDate: new Date(validated.pickupDate),
        pickupTime: validated.pickupTime,
        basePrice,
        extras,
        totalPrice,
        currency: 'ISK',
        paymentIntentId: paymentIntent.id,
        tourId: validated.tourId,
        specialRequests: validated.specialRequests,
      },
    });

    return NextResponse.json({
      booking,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
