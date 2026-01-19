import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { OrganizationSchema } from '@/components/StructuredData';
import { Providers } from './providers';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f8f5' },
    { media: '(prefers-color-scheme: dark)', color: '#221f10' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'PrimeTaxi & Tours | Premium Private Transportation in Iceland',
    template: '%s | PrimeTaxi & Tours',
  },
  description:
    'Experience Iceland in comfort and style. Reliable airport transfers, premium city taxis, and bespoke private tours tailored to your Icelandic adventure. Book online 24/7.',
  keywords: [
    'Iceland taxi',
    'Iceland tours',
    'Keflavik airport transfer',
    'Reykjavik taxi',
    'Golden Circle tour',
    'Northern Lights tour',
    'Blue Lagoon transfer',
    'private tours Iceland',
    'Iceland transportation',
  ],
  authors: [{ name: 'PrimeTaxi & Tours' }],
  creator: 'PrimeTaxi & Tours',
  publisher: 'PrimeTaxi & Tours',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'PrimeTaxi & Tours',
    title: 'PrimeTaxi & Tours | Premium Private Transportation',
    description:
      'Experience Iceland in comfort and style. Reliable airport transfers, premium city taxis, and bespoke private tours.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PrimeTaxi & Tours',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PrimeTaxi & Tours',
    description:
      'Premium private transportation in Iceland. Airport transfers, city taxis, and private tours.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
        <Providers>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </Providers>
        <GoogleAnalytics />
        <OrganizationSchema />
      </body>
    </html>
  );
}
