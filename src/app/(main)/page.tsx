import Image from 'next/image';
import Link from 'next/link';
import {
  Plane,
  CarTaxiFront,
  Mountain,
  Star,
  Shield,
  Clock,
  ArrowRight,
  User,
  Car,
} from 'lucide-react';
import { BookingWidget } from '@/components/BookingWidget';
import { ServiceCard } from '@/components/ServiceCard';
import { TourCard } from '@/components/TourCard';
import prisma from '@/lib/db';
import type { TourCategory } from '@/types';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const dbTours = await prisma.tour.findMany({
    where: { active: true },
    orderBy: [{ featured: 'desc' }, { price: 'asc' }],
    take: 4,
  });

  const tours = dbTours.map((tour) => ({
    id: tour.id,
    name: tour.name,
    slug: tour.slug,
    category: tour.category as TourCategory,
    duration: tour.duration,
    shortDescription: tour.shortDescription,
    price: tour.price,
    currency: tour.currency,
    image: tour.images[0] || '/images/golden_circle.png',
    highlights: tour.highlights.slice(0, 3),
    badge: tour.featured ? { text: 'Most Popular', type: 'popular' as const } : undefined,
  }));
  return (
    <>
      {/* Hero Section */}
      <header className="relative w-full h-[420px] sm:h-[540px] lg:h-[700px] flex flex-col justify-start items-center pt-14 sm:pt-20 lg:pt-32 text-center px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/northern_lights.png"
            alt="Scenic road through Icelandic mountains with moody sky"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-4 sm:gap-6">
          <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight drop-shadow-lg">
            Explore Iceland in <br className="hidden sm:block" />
            <span className="text-primary">Comfort & Style</span>
          </h1>
          <p className="text-slate-100 text-sm sm:text-base lg:text-lg font-medium max-w-2xl leading-relaxed drop-shadow-md hidden sm:block">
            Reliable airport transfers, premium city taxis, and bespoke private
            tours tailored to your Icelandic adventure.
          </p>
        </div>
      </header>

      {/* Booking Widget */}
      <BookingWidget />

      {/* Trust Indicators */}
      <section className="py-6 border-b border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 items-center text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Star className="size-5 text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-slate-700 dark:text-slate-200">4.9/5</span>
            <span className="text-sm">on Google Reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="size-5" />
            <span className="font-bold text-slate-700 dark:text-slate-200">Licensed</span>
            <span className="text-sm">by Icelandic Transport Authority</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-5" />
            <span className="font-bold text-slate-700 dark:text-slate-200">24/7</span>
            <span className="text-sm">Customer Support</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-20 px-4 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Premium Services</h2>
            <p className="section-subtitle">
              Whether you need a quick ride to Keflavík airport or a full-day
              adventure around the Golden Circle, we have the perfect vehicle for
              you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Plane />}
              title="Airport Transfers"
              description="Fixed price transfers between Keflavík International Airport (KEF) and Reykjavik area. Flight monitoring included."
              href="/booking?type=AIRPORT_TRANSFER"
              linkText="Book Transfer"
            />
            <ServiceCard
              icon={<CarTaxiFront />}
              title="City Taxi"
              description="Reliable taxi service within Reykjavik and surrounding areas. Fast pickup times and professional local drivers."
              href="/booking?type=TAXI"
              linkText="Order Taxi"
            />
            <ServiceCard
              icon={<Mountain />}
              title="Private Tours"
              description="Experience Iceland's natural wonders at your own pace. Customizable private tours with expert driver-guides."
              href="/tours"
              linkText="View Tours"
            />
          </div>
        </div>
      </section>

      {/* Popular Tours */}
      <section className="py-12 sm:py-20 px-4 bg-white dark:bg-[#1a180e]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="section-title">Popular Private Tours</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-xl">
                Discover the most sought-after destinations in Iceland with our
                comfortable private vehicles.
              </p>
            </div>
            <Link
              href="/tours"
              className="hidden md:flex items-center gap-2 px-6 py-3 border-2 border-slate-200 dark:border-white/10 rounded-lg font-bold text-slate-900 dark:text-white hover:border-primary hover:text-primary transition-colors"
            >
              See All Tours
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tours.map((tour) => (
              <TourCard key={tour.id} {...tour} variant="featured" />
            ))}
          </div>
          <Link
            href="/tours"
            className="md:hidden w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 border-2 border-slate-200 dark:border-white/10 rounded-lg font-bold text-slate-900 dark:text-white hover:border-primary hover:text-primary transition-colors"
          >
            See All Tours
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 bg-slate-100 dark:bg-[#15120a] overflow-hidden">
        <div className="max-w-7xl mx-auto bg-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Decorative circle */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3 sm:mb-4">
                Ready to start your journey?
              </h2>
              <p className="text-slate-800 text-base sm:text-lg mb-6 sm:mb-8 font-medium max-w-lg">
                Book your ride now and enjoy a seamless travel experience across
                Iceland's stunning landscapes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="/booking"
                  className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl shadow-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Book Online</span>
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white/20 border-2 border-slate-900/10 text-slate-900 font-bold rounded-xl hover:bg-white/30 transition-colors text-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full max-w-sm md:max-w-md">
              {/* Journey Card */}
              <div className="bg-white/90 backdrop-blur rounded-2xl p-5 sm:p-6 shadow-xl sm:transform sm:rotate-2 sm:hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-4 border-b border-slate-100 pb-4">
                  <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <User className="size-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold">Driver</p>
                    <p className="font-bold text-slate-900">Jónas Gunnarsson</p>
                  </div>
                  <div className="ml-auto flex gap-1 items-center">
                    <Star className="size-4 text-primary fill-primary" />
                    <span className="text-sm font-bold">5.0</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-1">
                      <div className="size-3 rounded-full bg-primary border-2 border-white ring-1 ring-slate-200" />
                      <div className="w-0.5 h-8 bg-slate-200" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">10:30 AM</p>
                      <p className="text-sm font-bold text-slate-900">
                        Keflavík International Airport
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-1">
                      <div className="size-3 rounded-full bg-slate-900" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">11:15 AM</p>
                      <p className="text-sm font-bold text-slate-900">
                        Center Hotel Plaza, Reykjavik
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                  <p className="text-sm text-slate-500 font-medium">
                    Mercedes-Benz V-Class
                  </p>
                  <Car className="size-5 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
