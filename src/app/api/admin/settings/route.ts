import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const settingsSchema = z.object({
  siteName: z.string().optional(),
  siteDescription: z.string().optional(),
  contactEmail: z.string().optional(),
  contactPhone: z.string().optional(),
  address: z.string().optional(),
  googleAnalyticsId: z.string().optional(),
  googleTagManagerId: z.string().optional(),
  facebookPixelId: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  ogImage: z.string().optional(),
  twitterHandle: z.string().optional(),
  facebookUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  tripAdvisorUrl: z.string().optional(),
  stripePublishableKey: z.string().optional(),
  currency: z.enum(['ISK', 'EUR', 'USD']).optional(),
  timezone: z.string().optional(),
  bookingEmailNotifications: z.boolean().optional(),
  autoConfirmBookings: z.boolean().optional(),
  // Pricing fields
  airportTransferPrice: z.number().optional(),
  blueLagoonTransferPrice: z.number().optional(),
  kefBlueLagoonPrice: z.number().optional(),
  cruisePortPrice: z.number().optional(),
  cityTourBasePrice: z.number().optional(),
});

const defaultSettings: Record<string, string> = {
  siteName: 'PrimeTaxi & Tours',
  siteDescription: 'Premium taxi and tour services in Iceland',
  contactEmail: 'info@primetaxi.is',
  contactPhone: '+354 555 1234',
  address: 'Reykjavik, Iceland',
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
  googleTagManagerId: '',
  facebookPixelId: '',
  metaTitle: 'PrimeTaxi & Tours - Premium Private Tours & Transfers',
  metaDescription:
    'Experience Iceland with our premium private tours and airport transfers. Golden Circle, Northern Lights, South Coast and more.',
  ogImage: '/og-image.jpg',
  twitterHandle: '@primetaxi',
  facebookUrl: 'https://facebook.com/primetaxi',
  instagramUrl: 'https://instagram.com/primetaxi',
  tripAdvisorUrl: '',
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  currency: 'ISK',
  timezone: 'Atlantic/Reykjavik',
  bookingEmailNotifications: 'true',
  autoConfirmBookings: 'false',
  airportTransferPrice: '20000',
  blueLagoonTransferPrice: '20000',
  kefBlueLagoonPrice: '15000',
  cruisePortPrice: '25000',
  cityTourBasePrice: '10500',
};

function parseValue(key: string, value: string): any {
  if (key === 'bookingEmailNotifications' || key === 'autoConfirmBookings') {
    return value === 'true';
  }
  if (
    key === 'airportTransferPrice' ||
    key === 'blueLagoonTransferPrice' ||
    key === 'kefBlueLagoonPrice' ||
    key === 'cruisePortPrice' ||
    key === 'cityTourBasePrice'
  ) {
    return parseFloat(value) || 0;
  }
  return value;
}

// GET - Get all settings
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbSettings = await prisma.setting.findMany();
    const dbMap: Record<string, string> = {};
    for (const s of dbSettings) {
      dbMap[s.key] = s.value;
    }

    // Merge defaults with DB values
    const settings: Record<string, any> = {};
    for (const key of Object.keys(defaultSettings)) {
      const raw = dbMap[key] ?? defaultSettings[key];
      settings[key] = parseValue(key, raw);
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

// PUT - Update settings
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = settingsSchema.parse(body);

    // Persist each key-value pair to DB
    await Promise.all(
      Object.entries(validatedData).map(([key, val]) => {
        if (val === undefined) return Promise.resolve();
        const value = String(val);
        return prisma.setting.upsert({
          where: { key },
          create: { key, value },
          update: { value },
        });
      })
    );

    // Return merged settings
    const dbSettings = await prisma.setting.findMany();
    const dbMap: Record<string, string> = {};
    for (const s of dbSettings) {
      dbMap[s.key] = s.value;
    }

    const settings: Record<string, any> = {};
    for (const key of Object.keys(defaultSettings)) {
      const raw = dbMap[key] ?? defaultSettings[key];
      settings[key] = parseValue(key, raw);
    }

    return NextResponse.json({ message: 'Settings updated successfully', settings });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('Settings PUT error:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
