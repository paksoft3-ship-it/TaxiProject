import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Plane,
  CarTaxiFront,
  Mountain,
  Check,
  ArrowRight,
  Clock,
  Users,
  Shield,
  Star,
  Wifi,
  Snowflake,
  Baby,
  CreditCard,
  Phone,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Premium taxi and tour services in Iceland. Airport transfers, city taxis, private tours, and custom adventures with professional drivers.',
};

const services = [
  {
    id: 'blue-lagoon-experience',
    title: 'Experience the Blue Lagoon',
    subtitle: 'Geothermal Paradise',
    icon: Snowflake,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPXvrb1aP9kpKx-HXmoSB6b-3abWjRApv-GTl4XbGpqtH071cxb1IJjdrtCxu170xPeyH72NQvSpcof3QAdzoEAF2F1poyoUxQGiwcSpkipgI6QyODOAjU-d_MH4TyO-ZZscbMoy5ZIHNF1KJQPCTS8H2Su8McBPDILWZlVEBtnCrCE4Vn3CfQ7k8QrUQeg9rqD0mWtqpoKw7MfZmas0T1bJhf4AIyf9_rt5UzmikNpDwZHKboFVOBlnBTyMNFhGFvKnMbdztl0JmW',
    description:
      'Immerse yourself in the world-famous Blue Lagoon, Iceland\'s most iconic geothermal spa. Our premium transfer service ensures a seamless journey to this natural wonder, where mineral-rich waters await to rejuvenate your body and soul.',
    features: [
      'Comfortable door-to-door service',
      'Flexible pickup times',
      'Luggage storage assistance',
      'Entry ticket coordination',
      'Professional drivers',
      'Return transfer available',
    ],
    pricing: {
      from: '19,500 ISK',
      note: 'One-way from Reykjavik',
    },
    href: '/booking?type=BLUE_LAGOON',
    detailsHref: '/services/blue-lagoon-experience',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'sightseeing-tours',
    title: 'Sightseeing Tours',
    subtitle: 'Discover Iceland\'s Wonders',
    icon: Mountain,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC10Q-hY2ws9134hG20NMVDn8vGv-tytWbsLHTDxUGTgf8pe5Dsy3bpH5wZCtizwFcL3I5Ga--PZhMCx_bdWYkEwX_sFssIF1EwdrKoLgMC4XaYECNsLMoXIAjzjOKYMD6VxpffKEd9YVT5C5OjaWyr8NyyD0W6TWaJsyyrWU5DVkV4ZanpPaEQppc03CO1XqfHQrHNjbcIWItbD04yDM4ciLseawjJL5Ux9122v_RtFeaa2YclITWf1yjVhqZv3rdyjKcvPd3Zxej9',
    description:
      'Explore Iceland\'s breathtaking landscapes with our expert-guided sightseeing tours. From the majestic Golden Circle to hidden waterfalls and volcanic wonders, experience the best of Iceland with knowledgeable local guides.',
    features: [
      'Golden Circle tours',
      'South Coast adventures',
      'Glacier Lagoon trips',
      'Expert local guides',
      'Photography opportunities',
      'Small group experiences',
    ],
    pricing: {
      from: '25,000 ISK',
      note: 'Reykjavik City Tour (1-3 hours)',
    },
    href: '/tours',
    detailsHref: '/services/sightseeing-tours',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'private-transfers',
    title: 'Private Transfers',
    subtitle: 'Luxury Door-to-Door Service',
    icon: CarTaxiFront,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvP5L7B8Gj9XiIQW2M7FqVt2lRYuLhJKYh5WpXqB4Y3VcXfN8M2xLT6HqZ8RpKXwFjLxNvYtK9mCfPwQ1R5PvL7VyWqKhPgR3xZnF8wN7Q',
    description:
      'Experience premium private transfer service anywhere in Iceland. Whether you\'re heading to your hotel, a remote destination, or need transportation for a special occasion, our professional drivers ensure a comfortable and stress-free journey.',
    features: [
      'Private vehicle & driver',
      '24/7 availability',
      'Modern luxury vehicles',
      'Professional chauffeurs',
      'Child seats available',
      'Flexible scheduling',
    ],
    pricing: {
      from: '19,500 ISK',
      note: 'Reykjavik ↔ Blue Lagoon',
    },
    href: '/booking?type=PRIVATE_TRANSFER',
    detailsHref: '/services/private-transfers',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    id: 'kef-blue-lagoon',
    title: 'Transfer Between Keflavik Airport and Blue Lagoon',
    subtitle: 'The Perfect Arrival Experience',
    icon: Plane,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyNrM-b0O1gLH2FKFjF2HyYQY0uJJxXPfSLTlVFMKqL8j0jXqWYJjLsKQpVJFpDEWOXsMFxX8ND8k8vLqVZqFnPF8WtPEGxXYqK9wXxF8w',
    description:
      'Start or end your Iceland adventure in the most relaxing way possible. Our direct transfer service between Keflavik International Airport and the Blue Lagoon lets you unwind after your flight or refresh before departure.',
    features: [
      'Real-time flight tracking',
      'Luggage handling assistance',
      'Meet & greet service',
      'Direct route - no stops',
      'Booking coordination',
      'Flexible timing options',
    ],
    pricing: {
      from: '10,000 ISK',
      note: 'KEF ↔ Blue Lagoon (1-4 passengers)',
    },
    href: '/booking?type=KEF_BLUE_LAGOON',
    detailsHref: '/services/kef-blue-lagoon',
    color: 'from-blue-500 to-cyan-500',
  },
];

const vehicleFeatures = [
  { icon: Wifi, label: 'Free WiFi' },
  { icon: Snowflake, label: 'Climate Control' },
  { icon: Baby, label: 'Child Seats' },
  { icon: CreditCard, label: 'Card Payment' },
  { icon: Shield, label: 'Fully Insured' },
  { icon: Users, label: 'Up to 7 Seats' },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-secondary text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-bold mb-6">
              <Star className="size-4" />
              Premium Transportation Services
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Your Journey, <br />
              <span className="text-primary">Our Expertise</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              From quick city rides to epic adventures across Iceland's stunning landscapes.
              Professional drivers, premium vehicles, and service that exceeds expectations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors"
              >
                Book Now
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

      {/* Vehicle Features Bar */}
      <section className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {vehicleFeatures.map((feature) => (
              <div key={feature.label} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <feature.icon className="size-5 text-primary" />
                <span className="text-sm font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Whether you need a quick ride or an epic adventure, we have the perfect solution for you.
            </p>
          </div>

          <div className="space-y-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={cn(
                  'bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700',
                  'grid grid-cols-1 lg:grid-cols-2 gap-0'
                )}
              >
                {/* Image */}
                <div className={cn('relative h-64 lg:h-auto min-h-[300px]', index % 2 === 1 && 'lg:order-2')}>
                  <div className={cn('absolute inset-0 bg-gradient-to-br opacity-80', service.color)} />
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover mix-blend-overlay"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <service.icon className="size-16 mx-auto mb-4 drop-shadow-lg" />
                      <h3 className="text-2xl font-bold drop-shadow-lg">{service.title}</h3>
                      <p className="text-white/80 font-medium">{service.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="size-4 text-green-500 shrink-0" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing & CTA */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-700">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Starting from</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{service.pricing.from}</p>
                      <p className="text-xs text-slate-500">{service.pricing.note}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        href={service.detailsHref}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors shrink-0"
                      >
                        Learn More
                      </Link>
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors shrink-0"
                      >
                        Book Now
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose PrimeTaxi & Tours</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              We're committed to making your Iceland experience unforgettable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Licensed & Insured',
                description: 'Fully licensed by Icelandic Transport Authority with comprehensive insurance coverage.',
              },
              {
                icon: Users,
                title: 'Expert Drivers',
                description: 'Professional, English-speaking drivers with extensive local knowledge.',
              },
              {
                icon: Star,
                title: '5-Star Rated',
                description: 'Consistently rated 4.9/5 stars by over 2,000 happy customers.',
              },
              {
                icon: Clock,
                title: '24/7 Service',
                description: 'Available around the clock for airport transfers and emergency rides.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="size-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="size-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Ready to Explore Iceland?
          </h2>
          <p className="text-slate-800 text-lg mb-8">
            Book your ride now or contact us for custom tour planning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
            >
              Book Online
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 border-2 border-slate-900/20 text-slate-900 font-bold rounded-xl hover:bg-white/30 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
