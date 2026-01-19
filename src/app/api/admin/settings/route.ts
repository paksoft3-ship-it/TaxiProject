import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { z } from 'zod';

// Settings are stored in a simple key-value format
// For a production app, you might want a dedicated Settings model in Prisma

const settingsSchema = z.object({
  siteName: z.string().optional(),
  siteDescription: z.string().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  address: z.string().optional(),
  googleAnalyticsId: z.string().optional(),
  googleTagManagerId: z.string().optional(),
  facebookPixelId: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  ogImage: z.string().url().optional(),
  twitterHandle: z.string().optional(),
  facebookUrl: z.string().url().optional(),
  instagramUrl: z.string().url().optional(),
  tripAdvisorUrl: z.string().url().optional(),
  stripePublishableKey: z.string().optional(),
  currency: z.enum(['ISK', 'EUR', 'USD']).optional(),
  timezone: z.string().optional(),
  bookingEmailNotifications: z.boolean().optional(),
  autoConfirmBookings: z.boolean().optional(),
});

// In-memory settings cache (in production, use Redis or database)
let settingsCache: Record<string, any> | null = null;

// Default settings
const defaultSettings = {
  siteName: 'PrimeTaxi & Tours',
  siteDescription: 'Premium taxi and tour services in Iceland',
  contactEmail: 'info@primetaxi.is',
  contactPhone: '+354 555 1234',
  address: 'Reykjavik, Iceland',
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
  googleTagManagerId: '',
  facebookPixelId: '',
  metaTitle: 'PrimeTaxi & Tours - Premium Private Tours & Transfers',
  metaDescription: 'Experience Iceland with our premium private tours and airport transfers. Golden Circle, Northern Lights, South Coast and more.',
  ogImage: '/og-image.jpg',
  twitterHandle: '@primetaxi',
  facebookUrl: 'https://facebook.com/primetaxi',
  instagramUrl: 'https://instagram.com/primetaxi',
  tripAdvisorUrl: '',
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  currency: 'ISK',
  timezone: 'Atlantic/Reykjavik',
  bookingEmailNotifications: true,
  autoConfirmBookings: false,
};

// GET - Get all settings
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Return cached settings or defaults
    const settings = settingsCache || defaultSettings;

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
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

    // Merge with existing settings
    const currentSettings = settingsCache || defaultSettings;
    const newSettings = {
      ...currentSettings,
      ...validatedData,
    };

    // Update cache
    settingsCache = newSettings;

    // In production, persist to database:
    // await prisma.setting.upsert({ ... })

    return NextResponse.json({
      message: 'Settings updated successfully',
      settings: newSettings,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Settings PUT error:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
