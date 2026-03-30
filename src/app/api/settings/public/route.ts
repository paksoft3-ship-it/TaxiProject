import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

const defaultPricing = {
  airportTransferPrice: 20000,
  blueLagoonTransferPrice: 20000,
  kefBlueLagoonPrice: 15000,
  cruisePortPrice: 25000,
  cityTourBasePrice: 10500,
  privateTourBasePrice: 45000,
  customTourBasePrice: 60000,
  blueLagoonRoundtripPrice: 39000,
  blueLagoonComboPrice: 40000,
  blueLagoonComboLargeGroupPrice: 14000,
  hourlyHireRate: 12000,
};

const pricingKeys = Object.keys(defaultPricing);

// GET - Public pricing settings (no auth required)
export async function GET() {
  try {
    const settings = await prisma.setting.findMany({
      where: { key: { in: pricingKeys } },
    });

    const pricing: Record<string, number> = { ...defaultPricing };
    for (const s of settings) {
      if (pricingKeys.includes(s.key)) {
        pricing[s.key] = parseFloat(s.value) || defaultPricing[s.key as keyof typeof defaultPricing];
      }
    }

    return NextResponse.json({ pricing });
  } catch (error) {
    console.error('Public settings GET error:', error);
    return NextResponse.json({ pricing: defaultPricing });
  }
}
