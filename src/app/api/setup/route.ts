import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import prisma from '@/lib/db';

// This endpoint creates an admin user - DELETE THIS FILE IN PRODUCTION
export async function GET() {
  try {
    const hashedPassword = await hash('admin123', 12);

    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@primetaxi.is' },
      update: {
        password: hashedPassword,
        name: 'Admin User',
        role: 'SUPER_ADMIN',
      },
      create: {
        email: 'admin@primetaxi.is',
        password: hashedPassword,
        name: 'Admin User',
        role: 'SUPER_ADMIN',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      email: adminUser.email,
      hint: 'Password is: admin123',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        hint: 'Make sure your database is running and accessible',
      },
      { status: 500 }
    );
  }
}
