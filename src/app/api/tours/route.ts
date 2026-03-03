import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET - List all active tours (public)
export async function GET() {
  try {
    const tours = await prisma.tour.findMany({
      where: { active: true },
      orderBy: [{ featured: 'desc' }, { createdAt: 'asc' }],
    });

    return NextResponse.json({ tours });
  } catch (error) {
    console.error('Public Tours GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch tours' }, { status: 500 });
  }
}
