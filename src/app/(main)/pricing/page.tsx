import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  CarTaxiFront,
  Plane,
  Mountain,
  Check,
  ArrowRight,
  Moon,
  Briefcase,
  Baby,
  CreditCard,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent pricing for Iceland taxi services. City taxis, airport transfers, and private tours with no hidden fees.',
};

const PRICING_DEFAULTS = {
  airportTransferPrice: 20000,
  airportTransferLargeGroupPrice: 25000,
  blueLagoonTransferPrice: 20000,
  kefBlueLagoonPrice: 15000,
  blueLagoonComboPrice: 40000,
  blueLagoonComboLargeGroupPrice: 14000,
  cityTourBasePrice: 10500,
};

async function getData() {
  const keys = Object.keys(PRICING_DEFAULTS);
  const [settings, tours, privateRoutes] = await Promise.all([
    prisma.setting.findMany({ where: { key: { in: keys } } }),
    prisma.tour.findMany({ where: { active: true }, orderBy: { price: 'asc' } }),
    prisma.transferRoute.findMany({
      where: { category: 'PRIVATE_TRANSFER', active: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    }),
  ]);

  const pricing = { ...PRICING_DEFAULTS };
  for (const s of settings) {
    if (s.key in pricing) {
      (pricing as any)[s.key] = parseFloat(s.value) || (PRICING_DEFAULTS as any)[s.key];
    }
  }

  return { pricing, tours, privateRoutes };
}

function formatISK(n: number) {
  return `${n.toLocaleString('is-IS')} ISK`;
}

const faqs = [
  {
    id: 'night',
    icon: Moon,
    question: 'Is there a surcharge for night rides?',
    answer:
      'Yes, a standard surcharge applies between 22:00 and 06:00. For fixed-rate transfers and tours booked in advance, the surcharge is clearly displayed before you confirm your booking.',
  },
  {
    id: 'luggage',
    icon: Briefcase,
    question: 'How much luggage is included in the fixed price?',
    answer:
      'For standard airport transfers, the price includes one checked bag (up to 23kg) and one carry-on per passenger. If you have oversized items like ski equipment or bicycles, please select a larger vehicle class or contact us beforehand.',
  },
  {
    id: 'child',
    icon: Baby,
    question: 'Do you offer child seats for families?',
    answer:
      'Absolutely. Child seats are available upon request. Please specify the age and weight of the child when making your reservation to ensure we provide the correct seat type.',
  },
  {
    id: 'payment',
    icon: CreditCard,
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit and debit cards (Visa, Mastercard, Amex) as well as cash in ISK, EUR, or USD. Contactless payment is available in all our vehicles.',
  },
];

export default async function PricingPage() {
  const { pricing, tours, privateRoutes } = await getData();

  const topTours = tours.slice(0, 3);

  const pricingCards = [
    {
      id: 'transfer',
      title: 'Private Transfers',
      icon: CarTaxiFront,
      priceLabel: 'Starting from',
      price: formatISK(pricing.blueLagoonTransferPrice),
      priceNote: 'Reykjavik ↔ Blue Lagoon',
      features: [
        '24/7 Availability',
        'Door-to-door Service',
        'Modern Luxury Vehicles',
        'English-speaking Drivers',
      ],
      buttonText: 'Book Transfer',
      href: '/services/private-transfers',
    },
    {
      id: 'airport',
      title: 'Airport Transfer',
      icon: Plane,
      priceLabel: 'Fixed Rate',
      price: formatISK(pricing.airportTransferPrice),
      priceNote: 'Keflavik (KEF) ↔ Reykjavik',
      features: [
        'Meet & Greet in Arrivals',
        'Flight Monitoring (No delay fees)',
        'Fixed Price Guarantee',
        'All Luggage Included',
      ],
      buttonText: 'Book Transfer',
      href: '/booking?type=AIRPORT_TRANSFER',
      highlighted: true,
    },
    {
      id: 'tour',
      title: 'Sightseeing Tours',
      icon: Mountain,
      priceLabel: 'Starting from',
      price: formatISK(pricing.cityTourBasePrice),
      priceNote: 'Reykjavik City Tour (1-3 hrs)',
      features: topTours.length > 0
        ? topTours.map(t => `${t.name} from ${formatISK(t.price)}`)
        : ['Expert Local Guides', 'Golden Circle', 'South Coast', 'Glacier Lagoon'],
      buttonText: 'View Tours',
      href: '/services/sightseeing-tours',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative w-full bg-cover bg-center bg-no-repeat min-h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 76, 129, 0.7), rgba(0, 0, 0, 0.5)), url('/images/south_coast.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-light dark:to-background-dark opacity-90" />
        <div className="relative z-10 max-w-[960px] mx-auto px-4 text-center py-12 sm:py-16">
          <h1 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4 drop-shadow-md">
            Transparent Pricing for Your{' '}
            <span className="text-primary">Icelandic Journey</span>
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-medium max-w-2xl mx-auto drop-shadow-sm">
            Explore Iceland with reliable city taxis, airport transfers, and
            private tours. No hidden fees, just clear rates.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <main className="flex-grow px-4 md:px-10 py-10 sm:-mt-20 z-20 relative">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricingCards.map((card) => (
              <div
                key={card.id}
                className={cn(
                  'flex flex-col rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1',
                  card.highlighted
                    ? 'relative border-2 border-primary bg-white dark:bg-slate-800 scale-100 md:scale-105 z-10'
                    : 'border border-white/20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md'
                )}
              >
                {card.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    Most Popular
                  </div>
                )}
                <div className="p-5 sm:p-8 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={cn(
                        'p-2 rounded-lg',
                        card.highlighted
                          ? 'bg-primary/20 text-primary-dark'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      )}
                    >
                      <card.icon className="size-6" />
                    </div>
                    <h3 className="text-slate-900 dark:text-white text-xl font-bold">
                      {card.title}
                    </h3>
                  </div>
                  <div className="mb-6">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
                      {card.priceLabel}
                    </p>
                    <span
                      className={cn(
                        'text-4xl font-extrabold tracking-tight',
                        card.highlighted
                          ? 'text-secondary-blue dark:text-primary'
                          : 'text-secondary-blue dark:text-white'
                      )}
                    >
                      {card.price}
                    </span>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                      {card.priceNote}
                    </p>
                  </div>
                  <div className="space-y-4 mb-8 flex-grow">
                    {card.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="size-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={card.href}
                    className={cn(
                      'w-full font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group',
                      card.highlighted
                        ? 'bg-primary hover:bg-primary-dark text-slate-900 shadow-lg shadow-primary/20'
                        : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white'
                    )}
                  >
                    {card.buttonText}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Detailed Pricing Tables */}
      <section className="bg-white dark:bg-slate-800 py-16 px-4 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-secondary-blue font-bold tracking-wider text-sm uppercase">
              Complete Price List
            </span>
            <h2 className="text-slate-900 dark:text-white text-3xl font-bold mt-2">
              Detailed Pricing
            </h2>
          </div>

          {/* Tours Pricing */}
          {tours.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Mountain className="size-5 text-primary" />
                Sightseeing Tours
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-700">
                      <th className="text-left p-4 font-bold text-slate-900 dark:text-white">Tour</th>
                      <th className="text-left p-4 font-bold text-slate-900 dark:text-white">Duration</th>
                      <th className="text-right p-4 font-bold text-slate-900 dark:text-white">1–4 pax</th>
                      <th className="text-right p-4 font-bold text-slate-900 dark:text-white">5–8 pax</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {tours.map((tour) => (
                      <tr key={tour.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <td className="p-4 text-slate-700 dark:text-slate-300">{tour.name}</td>
                        <td className="p-4 text-slate-500 dark:text-slate-400">{tour.duration}</td>
                        <td className="p-4 text-right font-bold text-primary">{formatISK(tour.price)}</td>
                        <td className="p-4 text-right font-bold text-primary">
                          {tour.largeGroupPrice > 0 ? formatISK(tour.largeGroupPrice) : formatISK(tour.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Private Transfers */}
          {privateRoutes.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <CarTaxiFront className="size-5 text-primary" />
                Private Transfers
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-700">
                      <th className="text-left p-4 font-bold text-slate-900 dark:text-white">Route</th>
                      <th className="text-right p-4 font-bold text-slate-900 dark:text-white">Price (1–4 pax)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {privateRoutes.map((route) => (
                      <tr key={route.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <td className="p-4 text-slate-700 dark:text-slate-300">{route.name}</td>
                        <td className="p-4 text-right font-bold text-primary">{formatISK(route.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Airport & Blue Lagoon */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Plane className="size-5 text-primary" />
              Airport & Blue Lagoon Transfers
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700">
                    <th className="text-left p-4 font-bold text-slate-900 dark:text-white">Route</th>
                    <th className="text-left p-4 font-bold text-slate-900 dark:text-white">Duration</th>
                    <th className="text-right p-4 font-bold text-slate-900 dark:text-white">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="p-4 text-slate-700 dark:text-slate-300">KEF ↔ Blue Lagoon (1–4 pax)</td>
                    <td className="p-4 text-slate-500 dark:text-slate-400">25 min</td>
                    <td className="p-4 text-right font-bold text-primary">{formatISK(pricing.kefBlueLagoonPrice)}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="p-4 text-slate-700 dark:text-slate-300">KEF ↔ Blue Lagoon (5–8 pax)</td>
                    <td className="p-4 text-slate-500 dark:text-slate-400">25 min</td>
                    <td className="p-4 text-right font-bold text-primary">{formatISK(pricing.blueLagoonComboLargeGroupPrice)}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="p-4 text-slate-700 dark:text-slate-300">KEF ↔ Reykjavik</td>
                    <td className="p-4 text-slate-500 dark:text-slate-400">45 min</td>
                    <td className="p-4 text-right font-bold text-primary">{formatISK(pricing.airportTransferPrice)}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="p-4 text-slate-700 dark:text-slate-300">KEF → Blue Lagoon → Reykjavik</td>
                    <td className="p-4 text-slate-500 dark:text-slate-400">~3 hours</td>
                    <td className="p-4 text-right font-bold text-primary">{formatISK(pricing.blueLagoonComboPrice)}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="p-4 text-slate-700 dark:text-slate-300">Reykjavik → Blue Lagoon → KEF</td>
                    <td className="p-4 text-slate-500 dark:text-slate-400">~3 hours</td>
                    <td className="p-4 text-right font-bold text-primary">{formatISK(pricing.blueLagoonComboPrice)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
            All prices are for private transfers. Contact us for custom routes or larger groups.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-background-light dark:bg-background-dark py-16 px-4 md:px-10">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-10">
            <span className="text-secondary-blue font-bold tracking-wider text-sm uppercase">
              Support
            </span>
            <h2 className="text-slate-900 dark:text-white text-3xl font-bold mt-2">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Everything you need to know about our pricing and services.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/50"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 list-none">
                  <div className="flex items-center gap-3">
                    <faq.icon className="size-5 text-primary" />
                    <p className="text-slate-900 dark:text-white text-base font-semibold">
                      {faq.question}
                    </p>
                  </div>
                  <ChevronDown className="size-5 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 pl-14">
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
