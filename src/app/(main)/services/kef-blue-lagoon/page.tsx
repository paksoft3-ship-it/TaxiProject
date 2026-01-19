import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Plane,
  Check,
  ArrowRight,
  Clock,
  Users,
  Shield,
  Star,
  Phone,
  Luggage,
  MapPin,
  Snowflake,
  Calendar,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Keflavik Airport to Blue Lagoon Transfer | Direct Service',
  description:
    'Direct transfer service between Keflavik International Airport and Blue Lagoon. Start or end your Iceland trip with the ultimate relaxation experience.',
};

const features = [
  {
    icon: Plane,
    title: 'Flight Tracking',
    description: 'We monitor your flight in real-time and adjust pickup accordingly.',
  },
  {
    icon: Luggage,
    title: 'Luggage Handling',
    description: 'We help store your luggage while you enjoy the lagoon.',
  },
  {
    icon: Clock,
    title: 'Flexible Timing',
    description: 'Coordinate your transfer with your Blue Lagoon reservation.',
  },
  {
    icon: Shield,
    title: 'Reliable Service',
    description: 'Never miss your flight or lagoon slot with our punctual service.',
  },
];

const routes = [
  {
    name: 'KEF → Blue Lagoon',
    description: 'Perfect for arrivals - relax after your flight',
    duration: '25 min',
    distance: '23 km',
    price: '10,000 ISK',
    note: '1-4 passengers',
  },
  {
    name: 'Blue Lagoon → KEF',
    description: 'Ideal for departures - refresh before your flight',
    duration: '25 min',
    distance: '23 km',
    price: '10,000 ISK',
    note: '1-4 passengers',
  },
  {
    name: 'KEF → Blue Lagoon → Reykjavik',
    description: 'Complete arrival package with city drop-off',
    duration: '~3 hours total',
    distance: '75 km',
    price: '40,000 ISK',
    note: '1-4 passengers, includes lagoon time',
    popular: true,
  },
  {
    name: 'Reykjavik → Blue Lagoon → KEF',
    description: 'Complete departure package from your hotel',
    duration: '~3 hours total',
    distance: '75 km',
    price: '40,000 ISK',
    note: '1-4 passengers, includes lagoon time',
  },
  {
    name: 'KEF ↔ Blue Lagoon (5-8 passengers)',
    description: 'Larger group transfer between airport and spa',
    duration: '25 min',
    distance: '23 km',
    price: '14,000 ISK',
    note: '5-8 passengers, one-way',
  },
];

const highlights = [
  'Real-time flight tracking and monitoring',
  'Meet & greet at airport arrivals',
  'Luggage storage assistance at Blue Lagoon',
  'Help coordinating your lagoon reservation',
  'Direct route with no unnecessary stops',
  'Professional English-speaking drivers',
  'Comfortable modern vehicles',
  'Flexible scheduling options',
];

const faqs = [
  {
    question: 'How far is the Blue Lagoon from Keflavik Airport?',
    answer: 'The Blue Lagoon is approximately 20 km from Keflavik Airport, making it a convenient 20-25 minute drive. It\'s actually closer to the airport than to Reykjavik!',
  },
  {
    question: 'Can I store my luggage at the Blue Lagoon?',
    answer: 'Yes! The Blue Lagoon has luggage storage facilities. We\'ll help you get your bags safely stored before you enjoy the spa.',
  },
  {
    question: 'What if my flight is delayed?',
    answer: 'No worries! We track your flight in real-time and automatically adjust your pickup time. There are no extra charges for flight delays.',
  },
  {
    question: 'Do I need to book Blue Lagoon tickets separately?',
    answer: 'Yes, Blue Lagoon entry tickets must be booked directly with them as they require advance reservations. We can help coordinate your transfer time with your reservation.',
  },
];

export default function KefBlueLagoonPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-secondary text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyNrM-b0O1gLH2FKFjF2HyYQY0uJJxXPfSLTlVFMKqL8j0jXqWYJjLsKQpVJFpDEWOXsMFxX8ND8k8vLqVZqFnPF8WtPEGxXYqK9wXxF8w"
            alt="Keflavik Airport to Blue Lagoon"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/services" className="text-slate-400 hover:text-primary transition-colors">
                Services
              </Link>
              <span className="text-slate-500">/</span>
              <span className="text-primary">KEF ↔ Blue Lagoon</span>
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-bold mb-6">
              <Plane className="size-4" />
              Airport Connection
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Keflavik Airport <br />
              <span className="text-primary">↔ Blue Lagoon</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              The perfect way to start or end your Iceland adventure. Our direct transfer
              connects you between the airport and Iceland's most famous geothermal spa.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/booking?type=KEF_BLUE_LAGOON"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-yellow-400 transition-colors"
              >
                Book Transfer
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="tel:+3545551234"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors"
              >
                <Phone className="size-4" />
                +354 555 1234
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Route Info Bar */}
      <section className="bg-primary text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>Only 20 km apart</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-4" />
              <span>20-25 min drive</span>
            </div>
            <div className="flex items-center gap-2">
              <Snowflake className="size-4" />
              <span>Perfect layover activity</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <span>Available 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Route Options */}
      <section className="py-20 px-4 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Transfer Options</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Choose the route that fits your travel plans
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {routes.map((route) => (
              <div
                key={route.name}
                className={`relative bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 ${
                  route.popular ? 'border-primary' : 'border-slate-100 dark:border-slate-700'
                }`}
              >
                {route.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{route.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{route.description}</p>
                <div className="flex items-center gap-4 mb-6 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="size-4" />
                    {route.duration}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">{route.price}</p>
                    <p className="text-xs text-slate-500">{route.note}</p>
                  </div>
                  <Link
                    href="/booking?type=KEF_BLUE_LAGOON"
                    className={`inline-flex items-center gap-2 px-4 py-2 font-bold rounded-lg transition-colors ${
                      route.popular
                        ? 'bg-primary text-white hover:bg-yellow-400'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Transfer */}
      <section className="py-20 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                The Perfect Start or End to Your Iceland Trip
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                The Blue Lagoon is perfectly positioned between Keflavik Airport and Reykjavik,
                making it an ideal stop for arriving or departing travelers. Instead of going
                straight to your hotel or the airport, why not unwind in Iceland's most famous
                geothermal spa?
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Our transfer service makes this seamless - we handle the logistics so you can
                focus on relaxation. We'll track your flight, help with your luggage, and
                ensure you make the most of your time.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-2">
                    <Check className="size-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature.title} className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                  <div className="size-12 mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                    <feature.icon className="size-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-background-light dark:bg-background-dark">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Everything you need to know about this transfer
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-100 dark:border-slate-700"
              >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{faq.question}</h3>
                <p className="text-slate-600 dark:text-slate-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Plane className="size-10 text-black/60" />
            <ArrowRight className="size-6 text-black/40" />
            <Snowflake className="size-10 text-black/60" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
            Make the Most of Your Layover
          </h2>
          <p className="text-black/70 text-lg mb-8">
            Book your airport to Blue Lagoon transfer and experience Iceland's magic from the moment you land.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking?type=KEF_BLUE_LAGOON"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-white font-bold rounded-xl hover:bg-slate-700 transition-colors"
            >
              Book Transfer
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black/10 text-black font-bold rounded-xl hover:bg-black/20 transition-colors"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
