import { Metadata } from 'next';
import Link from 'next/link';
import {
  Clock,
  Check,
  ArrowRight,
  MapPin,
  Shield,
  Star,
  Car,
  Phone,
  Wifi,
  Users,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hourly Car Hire with Driver | PrimeTaxi & Tours',
  description:
    'Hire a private driver by the hour in Iceland. Flexible, comfortable, and perfect for city exploration, custom stops, or business travel. Available from 3 to 12 hours.',
};

const features = [
  {
    icon: Clock,
    title: 'Flexible Duration',
    description: 'Book from 3 hours up to a full 12-hour day. Your driver stays with you the entire time.',
  },
  {
    icon: MapPin,
    title: 'Go Anywhere',
    description: 'No fixed route. Stop where you want, for as long as you want — waterfalls, hot springs, viewpoints.',
  },
  {
    icon: Car,
    title: 'Luxury Vehicles',
    description: 'Travel in comfort in our modern fleet of sedans and SUVs, fully equipped for Iceland conditions.',
  },
  {
    icon: Wifi,
    title: 'Free WiFi On Board',
    description: 'Stay connected throughout your journey with complimentary high-speed WiFi.',
  },
  {
    icon: Shield,
    title: 'Professional Driver',
    description: 'All our drivers are licensed, English-speaking, and know Iceland inside out.',
  },
  {
    icon: Users,
    title: 'Up to 8 Passengers',
    description: 'Perfect for families, couples, or small groups. Child seats available on request.',
  },
];

const durations = [
  { hours: 3,  label: '3 Hours',          note: 'Reykjavík city highlights' },
  { hours: 4,  label: '4 Hours',          note: 'City + nearby countryside' },
  { hours: 6,  label: '6 Hours',          note: 'Golden Circle highlights' },
  { hours: 8,  label: '8 Hours',          note: 'South Coast essentials' },
  { hours: 10, label: '10 Hours',         note: 'Full Golden Circle + extras' },
  { hours: 12, label: '12 Hours (Full Day)', note: 'Complete Iceland experience' },
];

const included = [
  'Private luxury vehicle',
  'Professional English-speaking driver',
  'Free WiFi on board',
  'Bottled water',
  'All fuel & parking fees',
  'All taxes and fees included',
];

export default function HourlyHirePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">

      {/* Hero */}
      <div
        className="relative min-h-[420px] flex items-end"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15,76,129,0.55), rgba(0,0,0,0.75)), url('/images/south_coast.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 pb-12 pt-24">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <Clock className="size-4" />
            Flexible Private Driver
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
            Hourly Car Hire<br />with Driver
          </h1>
          <p className="text-slate-200 text-lg md:text-xl max-w-2xl mb-8">
            Your own private driver, your own schedule. Explore Iceland on your terms — no fixed routes, no rush.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/booking?type=HOURLY_HIRE&from=service"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors shadow-lg"
            >
              Book Your Driver
              <ArrowRight className="size-5" />
            </Link>
            <a
              href="tel:+3548575955"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-colors"
            >
              <Phone className="size-5" />
              Call Us
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">

        {/* Features grid */}
        <section>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Why choose hourly hire?</h2>
          <p className="text-slate-500 mb-10">The most flexible way to see Iceland — no group tours, no waiting around.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
                <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="size-5 text-primary" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{f.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Duration options */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Choose your duration</h2>
            <p className="text-slate-500 mb-8">Pick how long you need your private driver. Pricing is calculated at checkout based on the current rates.</p>
            <div className="space-y-3">
              {durations.map((d) => (
                <Link
                  key={d.hours}
                  href={`/booking?type=HOURLY_HIRE&from=service&hours=${d.hours}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Clock className="size-4 text-slate-500 group-hover:text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{d.label}</p>
                      <p className="text-sm text-slate-500">{d.note}</p>
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-slate-400 group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* What's included */}
          <div className="bg-secondary text-white rounded-2xl p-8 sticky top-24">
            <div className="flex items-center gap-3 mb-6">
              <Star className="size-5 text-primary" />
              <h3 className="font-bold text-lg">Everything included</h3>
            </div>
            <ul className="space-y-3 mb-8">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-200">
                  <div className="size-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                    <Check className="size-3 text-green-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/booking?type=HOURLY_HIRE&from=service"
              className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors"
            >
              Book Now
              <ArrowRight className="size-5" />
            </Link>
            <p className="text-center text-slate-400 text-xs mt-4">Free cancellation up to 24 hours before</p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 bg-slate-50 dark:bg-slate-800 rounded-2xl">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Not sure how many hours you need?</h2>
          <p className="text-slate-500 mb-6 max-w-xl mx-auto">Call us and we'll help you plan the perfect itinerary for your time in Iceland.</p>
          <a
            href="tel:+3548575955"
            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
          >
            <Phone className="size-5" />
            +354 857 5955
          </a>
        </section>

      </div>
    </div>
  );
}
