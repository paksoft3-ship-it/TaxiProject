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
      BLUE_LAGOON: 19500, // Default base
    };

    let basePrice = basePrices[validated.type] || 0;

    // Handle Blue Lagoon Packages specifically
    if (validated.type === 'BLUE_LAGOON' && validated.options?.packageType) {
      if (validated.options.packageType === 'roundtrip') {
        basePrice = 39000;
      } else if (validated.options.packageType === 'combo') {
        if (validated.passengers > 4) {
          basePrice = 14000;
        } else {
          basePrice = 40000;
        }
      }
    }

    // Calculate extras
    let extras = 0;

    // Extra passengers fee
    if (validated.passengers > 4) {
      if (validated.type === 'AIRPORT_TRANSFER') {
        extras += 25000 - basePrice; // Fixed price of 25000 for > 4 pax
      } else if (validated.type === 'BLUE_LAGOON') {
        // Assume same fixed price logic or keep base? 
        // For now, keep base price for Blue Lagoon as fixed vehicle price.
      } else {
        extras += (validated.passengers - 4) * 2000;
      }
    }

    // New Options calculations
    if (validated.options) {
      if (validated.options.premiumCar) extras += 5000;
      if (validated.options.childSeats) extras += validated.options.childSeats * 2000;
      if (validated.options.extraStop) extras += 7000;
      if (validated.options.extraTime) extras += 14000;
    }

    // Special logic for fixed price airport transfer > 4 pax
    let totalPrice = basePrice + extras;

    if (validated.type === 'AIRPORT_TRANSFER' && validated.passengers > 4) {
      // Fixed base of 25000 logic...
      // Already handled above by setting extras to (25000 - basePrice)
      // So totalPrice = basePrice + (25000 - basePrice) = 25000.

      // Add other extras on top
      if (validated.options) {
        if (validated.options.premiumCar) totalPrice += 5000;
        if (validated.options.childSeats) totalPrice += validated.options.childSeats * 2000;
        if (validated.options.extraStop) totalPrice += 7000;
        if (validated.options.extraTime) totalPrice += 14000;
      }

      // Recalculate 'extras' field for DB
      extras = totalPrice - basePrice;
    }

    // Compile special requests string
    let specialRequests = validated.specialRequests || '';
    const details = [];

    // Map types for DB compatibility
    let dbType: string = validated.type;
    if (validated.type === 'BLUE_LAGOON') {
      dbType = 'AIRPORT_TRANSFER'; // Map to supported DB enum
      details.push('Service: Blue Lagoon Transfer');
      if (validated.options?.packageType) {
        details.push(`Package: ${validated.options.packageType}`);
      }
    }

    if (validated.flightNumber) details.push(`Flight: ${validated.flightNumber}`);
    if (validated.flightTime) details.push(`Time: ${validated.flightTime}`);
    if (validated.luggageCount) details.push(`Luggage: ${validated.luggageCount}`);

    if (validated.options) {
      if (validated.options.premiumCar) details.push('Premium Car');
      if (validated.options.childSeats) details.push(`${validated.options.childSeats} Child/Booster Seat(s)`);
      if (validated.options.extraStop) details.push('Extra Stop');
      if (validated.options.extraTime) details.push('Extra Time');
    }

    if (details.length > 0) {
      specialRequests = `${details.join(', ')}. ${specialRequests}`;
    }

    // Create payment intent
    const paymentIntent = await createPaymentIntent(totalPrice, 'isk', {
      bookingType: validated.type, // Stripe can receive custom strings, or stick to dbType? Let's use validated.type for metadata
      customerEmail: validated.customerEmail,
    });

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingNumber: generateBookingNumber(),
        type: dbType as any, // Cast to any to bypass strict literal check if needed, or mapped type
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
        specialRequests: specialRequests, // Saved combined string
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
