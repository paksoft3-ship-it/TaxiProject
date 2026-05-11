import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

const transfersData = [
  // ── AIRPORT ──────────────────────────────────────────────────
  {
    name: 'KEF ↔ Reykjavik (1–4 pax)',
    category: 'AIRPORT',
    from: 'Keflavik International Airport',
    to: 'Reykjavik',
    description: 'Private airport transfer between Keflavik Airport and Reykjavik city centre.',
    duration: '45 min',
    distance: '47 km',
    passengers: '1–4 passengers',
    price: 20000,
    largeGroupPrice: 25000,
    features: ['Flight tracking', 'Meet & greet at arrivals', 'Door-to-door service', 'Free WiFi', 'Luggage assistance'],
    popular: true,
    active: true,
    sortOrder: 1,
  },
  {
    name: 'KEF ↔ Reykjavik (5–8 pax)',
    category: 'AIRPORT',
    from: 'Keflavik International Airport',
    to: 'Reykjavik',
    description: 'Large group airport transfer between Keflavik Airport and Reykjavik city centre.',
    duration: '45 min',
    distance: '47 km',
    passengers: '5–8 passengers',
    price: 25000,
    largeGroupPrice: 0,
    features: ['Flight tracking', 'Meet & greet at arrivals', 'Spacious van', 'Free WiFi', 'Luggage assistance'],
    popular: false,
    active: true,
    sortOrder: 2,
  },

  // ── AIRPORT ↔ BLUE LAGOON ────────────────────────────────────
  {
    name: 'KEF ↔ Blue Lagoon (1–4 pax)',
    category: 'AIRPORT_BLUE_LAGOON',
    from: 'Keflavik International Airport',
    to: 'Blue Lagoon, Grindavík',
    description: 'Direct transfer between Keflavik Airport and the Blue Lagoon — only 20 km apart.',
    duration: '20–25 min',
    distance: '20 km',
    passengers: '1–4 passengers',
    price: 15000,
    largeGroupPrice: 18000,
    features: ['Direct route', 'Flight tracking', 'Luggage storage assistance', 'Meet & greet'],
    popular: true,
    active: true,
    sortOrder: 1,
  },
  {
    name: 'KEF ↔ Blue Lagoon (5–8 pax)',
    category: 'AIRPORT_BLUE_LAGOON',
    from: 'Keflavik International Airport',
    to: 'Blue Lagoon, Grindavík',
    description: 'Large group direct transfer between Keflavik Airport and the Blue Lagoon.',
    duration: '20–25 min',
    distance: '20 km',
    passengers: '5–8 passengers',
    price: 18000,
    largeGroupPrice: 0,
    features: ['Direct route', 'Flight tracking', 'Luggage storage assistance', 'Spacious van'],
    popular: false,
    active: true,
    sortOrder: 2,
  },

  // ── BLUE LAGOON PACKAGES ─────────────────────────────────────
  {
    name: 'Reykjavik → Blue Lagoon (One-way)',
    category: 'BLUE_LAGOON',
    from: 'Reykjavik',
    to: 'Blue Lagoon, Grindavík',
    description: 'One-way private transfer from Reykjavik to the Blue Lagoon.',
    duration: '50 min',
    distance: '48 km',
    passengers: '1–4 passengers',
    price: 20000,
    largeGroupPrice: 25000,
    features: ['Door-to-door pickup', 'Professional driver', 'Free WiFi', 'Luggage assistance'],
    popular: false,
    active: true,
    sortOrder: 1,
  },
  {
    name: 'Reykjavik ↔ Blue Lagoon (Roundtrip)',
    category: 'BLUE_LAGOON',
    from: 'Reykjavik',
    to: 'Blue Lagoon, Grindavík',
    description: 'Roundtrip private transfer between Reykjavik and the Blue Lagoon.',
    duration: '50 min each way',
    distance: '48 km each way',
    passengers: '1–4 passengers',
    price: 39000,
    largeGroupPrice: 48000,
    features: ['Door-to-door service', 'Wait & return', 'Free WiFi', 'Luggage assistance'],
    popular: true,
    active: true,
    sortOrder: 2,
  },
  {
    name: 'KEF → Blue Lagoon → Reykjavik',
    category: 'BLUE_LAGOON',
    from: 'Keflavik International Airport',
    to: 'Reykjavik (via Blue Lagoon)',
    description: 'Arrive at KEF, relax at Blue Lagoon, continue to Reykjavik. Perfect for arrivals.',
    duration: '~3 hours',
    distance: '68 km total',
    passengers: '1–4 passengers',
    price: 40000,
    largeGroupPrice: 50000,
    features: ['Flight tracking', 'Luggage storage at lagoon', 'Door-to-door final drop', 'Free WiFi'],
    popular: false,
    active: true,
    sortOrder: 3,
  },
  {
    name: 'Reykjavik → Blue Lagoon → KEF',
    category: 'BLUE_LAGOON',
    from: 'Reykjavik',
    to: 'Keflavik International Airport (via Blue Lagoon)',
    description: 'Start in Reykjavik, enjoy the Blue Lagoon, then depart from KEF. Perfect for departures.',
    duration: '~3 hours',
    distance: '68 km total',
    passengers: '1–4 passengers',
    price: 40000,
    largeGroupPrice: 50000,
    features: ['Hotel pickup', 'Luggage storage at lagoon', 'Airport drop-off', 'Free WiFi'],
    popular: false,
    active: true,
    sortOrder: 4,
  },

  // ── PRIVATE TRANSFERS ────────────────────────────────────────
  {
    name: 'Reykjavik ↔ Blue Lagoon',
    category: 'PRIVATE_TRANSFER',
    from: 'Reykjavik',
    to: 'Blue Lagoon, Grindavík',
    description: 'Private transfer between Reykjavik and the Blue Lagoon.',
    duration: '50 min',
    distance: '48 km',
    passengers: '1–4 passengers',
    price: 20000,
    largeGroupPrice: 25000,
    features: ['Door-to-door service', 'Professional driver', 'Free WiFi', 'Child seats available'],
    popular: true,
    active: true,
    sortOrder: 1,
  },
  {
    name: 'Reykjavik City Transfer',
    category: 'PRIVATE_TRANSFER',
    from: 'Reykjavik',
    to: 'Any Reykjavik location',
    description: 'Private transfer within the Reykjavik city area.',
    duration: '15–30 min',
    distance: 'Varies',
    passengers: '1–4 passengers',
    price: 10500,
    largeGroupPrice: 14000,
    features: ['Any pickup/drop-off', 'Professional driver', 'Free WiFi', 'Card payment'],
    popular: false,
    active: true,
    sortOrder: 2,
  },
  {
    name: 'Reykjavik ↔ Blue Lagoon (Large Group)',
    category: 'PRIVATE_TRANSFER',
    from: 'Reykjavik',
    to: 'Blue Lagoon, Grindavík',
    description: 'Large group private transfer between Reykjavik and the Blue Lagoon.',
    duration: '50 min',
    distance: '48 km',
    passengers: '5–8 passengers',
    price: 25000,
    largeGroupPrice: 0,
    features: ['Spacious van', 'Door-to-door service', 'Free WiFi', 'Luggage assistance'],
    popular: false,
    active: true,
    sortOrder: 3,
  },
];

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const results: { name: string; status: string }[] = [];

    for (const t of transfersData) {
      const existing = await prisma.transferRoute.findFirst({
        where: { name: t.name, category: t.category },
      });
      if (existing) {
        await prisma.transferRoute.update({
          where: { id: existing.id },
          data: { largeGroupPrice: t.largeGroupPrice },
        });
        results.push({ name: t.name, status: 'updated largeGroupPrice' });
      } else {
        await prisma.transferRoute.create({ data: t });
        results.push({ name: t.name, status: 'created' });
      }
    }

    return NextResponse.json({ message: 'Transfer seed complete', results });
  } catch (error) {
    console.error('Seed transfers error:', error);
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}
