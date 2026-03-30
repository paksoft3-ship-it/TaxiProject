import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import prisma from '@/lib/db';
import { authOptions } from '@/lib/auth';
import { bookingSchema } from '@/lib/validations';
import { generateBookingNumber } from '@/lib/utils';
import { createPaymentIntent } from '@/lib/stripe';

// GET /api/bookings - Get all bookings (admin only)
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
      TAXI: 0,
      AIRPORT_TRANSFER: 20000,
      PRIVATE_TOUR: 45000,
      CUSTOM_TOUR: 60000,
      BLUE_LAGOON: 20000, // Default base
    };

    let basePrice = basePrices[validated.type] || 0;

    // Dynamic pricing for hourly hire (ISK 12,000 per hour, default 4 hrs)
    if (validated.type === 'HOURLY_HIRE') {
      const hours = parseInt(String(validated.options?.hourlyDuration || '4'), 10);
      basePrice = hours * 12000;
    }

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

    // Options add-ons (applied once for all types)
    if (validated.options) {
      if (validated.options.premiumCar) extras += 5000;
      if (validated.options.childSeats) extras += validated.options.childSeats * 2000;
      if (validated.options.extraStop) extras += 7000;
      if (validated.options.extraTime) extras += 14000;
    }

    let totalPrice = basePrice + extras;

    // Apply time-based surcharge (matches BookingSummary.tsx display logic)
    let appliedSurchargeLabel = '';
    if (validated.type !== 'TAXI' && validated.pickupTime) {
      const pickupHour = parseInt(validated.pickupTime.split(':')[0], 10);
      let surchargeMultiplier = 1.0;

      if (pickupHour >= 22 || pickupHour < 6) {
        surchargeMultiplier = 1.25;
        appliedSurchargeLabel = 'Night rate (22:00-06:00)';
      } else if (pickupHour >= 6 && pickupHour < 8) {
        surchargeMultiplier = 1.15;
        appliedSurchargeLabel = 'Early morning (06:00-08:00)';
      } else if ((pickupHour >= 8 && pickupHour < 9) || (pickupHour >= 17 && pickupHour < 19)) {
        surchargeMultiplier = 1.1;
        appliedSurchargeLabel = 'Peak hours';
      }

      if (surchargeMultiplier > 1.0) {
        const surchargeAmount = Math.round(totalPrice * (surchargeMultiplier - 1));
        extras += surchargeAmount;
        totalPrice += surchargeAmount;
      }
    }

    // Compile special requests string
    let specialRequests = validated.specialRequests || '';
    const details = [];
    if (appliedSurchargeLabel) {
      details.push(`Surcharge: ${appliedSurchargeLabel}`);
    }

    // Map types for DB compatibility
    type DbBookingType = 'TAXI' | 'AIRPORT_TRANSFER' | 'PRIVATE_TOUR' | 'CUSTOM_TOUR';
    let dbType: DbBookingType = validated.type as DbBookingType;
    if (validated.type === 'BLUE_LAGOON') {
      dbType = 'AIRPORT_TRANSFER';
      details.push('Service: Blue Lagoon Transfer');
      if (validated.options?.packageType) {
        details.push(`Package: ${validated.options.packageType}`);
      }
      if (validated.options?.blDirection) {
        details.push(`Route: ${validated.options.blDirection}`);
      }
    } else if (validated.type === 'HOURLY_HIRE') {
      dbType = 'CUSTOM_TOUR';
      details.push('Service: Hourly Hire');
      if (validated.options?.hourlyDuration) {
        details.push(`Duration: ${validated.options.hourlyDuration} hours`);
      }
    } else if (validated.type === 'PRIVATE_TOUR') {
      if (validated.options?.tourName) {
        details.push(`Tour: ${validated.options.tourName}`);
      }
      if (validated.options?.tourStartTime) {
        details.push(`Start Time: ${validated.options.tourStartTime}`);
      }
    }

    if (validated.flightNumber) details.push(`Flight: ${validated.flightNumber}`);
    if (validated.flightTime) details.push(`Flight Time: ${validated.flightTime}`);
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

    // Create payment intent only for non-taxi services
    let paymentIntent = null;
    if (validated.type !== 'TAXI') {
      paymentIntent = await createPaymentIntent(totalPrice, 'isk', {
        bookingType: validated.type,
        customerEmail: validated.customerEmail,
      });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingNumber: generateBookingNumber(),
        type: dbType,
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
        paymentIntentId: paymentIntent?.id,
        tourId: validated.tourId,
        specialRequests: specialRequests, // Saved combined string
      },
    });

    return NextResponse.json({
      booking,
      clientSecret: paymentIntent?.client_secret,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
