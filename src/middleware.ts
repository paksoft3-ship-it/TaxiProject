import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Check if accessing admin routes (except login)
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
      // Must be authenticated
      if (!token) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }

      // Must have ADMIN role
      if (token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/login?error=unauthorized', req.url));
      }
    }

    // Check if accessing admin API routes
    if (pathname.startsWith('/api/admin')) {
      if (!token || token.role !== 'ADMIN') {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Allow public routes
        if (pathname === '/admin/login') {
          return true;
        }

        // Allow public API routes (booking, contact, etc.)
        if (pathname.startsWith('/api/') && !pathname.startsWith('/api/admin')) {
          return true;
        }

        // Allow all non-admin routes
        if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
          return true;
        }

        // For admin routes, require token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};
