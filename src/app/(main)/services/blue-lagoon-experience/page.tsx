import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Snowflake,
  Check,
  ArrowRight,
  Clock,
  Users,
  Shield,
  Star,
  Phone,
  MapPin,
  Thermometer,
  Droplets,
  Camera,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Experience the Blue Lagoon | Premium Transfer Service',
  description:
    'Visit Iceland\'s iconic Blue Lagoon geothermal spa with our comfortable transfer service. Door-to-door pickup, flexible scheduling, and hassle-free booking.',
};

const features = [
  {
    icon: Clock,
    title: 'Flexible Timing',
    description: 'Choose your preferred pickup time to match your Blue Lagoon reservation.',
  },
  {
    icon: Users,
    title: 'All Group Sizes',
    description: 'From solo travelers to groups of 7, we have the perfect vehicle for you.',
  },
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'Travel with peace of mind knowing you\'re fully covered.',
  },
  {
    icon: Star,
    title: '5-Star Service',
    description: 'Consistently rated excellent by thousands of happy visitors.',
  },
];

const highlights = [
  'Comfortable door-to-door service from your accommodation',
  'Professional English-speaking drivers',
  'Luggage storage assistance at the lagoon',
  'Help with entry ticket coordination',
  'Silica mud mask and in-water drink included with premium packages',
  'Return transfer at your preferred time',
  'Child seats available on request',
  'Free WiFi in all vehicles',
];

const packages = [
  {
    name: 'One-Way Transfer',
    price: '19,500 ISK',
    description: 'Single transfer from/to Reykjavik',
    features: ['Hotel pickup or drop-off', 'Luggage assistance', 'Free WiFi', 'English-speaking driver'],
  },
  {
    name: 'Round Trip Transfer',
    price: '39,000 ISK',
    description: 'Return transfer from Reykjavik',
    features: ['Hotel pickup & drop-off', 'Flexible return time', 'Luggage assistance', 'Free WiFi'],
    popular: true,
  },
  {
    name: 'Airport Combo',
    price: '40,000 ISK',
    description: 'KEF Airport → Blue Lagoon → Reykjavik',
    features: ['Airport pickup', 'Blue Lagoon stop', 'Hotel drop-off', 'Luggage handling', 'Flight tracking'],
  },
];

export default function BlueLagoonExperiencePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-secondary text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPXvrb1aP9kpKx-HXmoSB6b-3abWjRApv-GTl4XbGpqtH071cxb1IJjdrtCxu170xPeyH72NQvSpcof3QAdzoEAF2F1poyoUxQGiwcSpkipgI6QyODOAjU-d_MH4TyO-ZZscbMoy5ZIHNF1KJQPCTS8H2Su8McBPDILWZlVEBtnCrCE4Vn3CfQ7k8QrUQeg9rqD0mWtqpoKw7MfZmas0T1bJhf4AIyf9_rt5UzmikNpDwZHKboFVOBlnBTyMNFhGFvKnMbdztl0JmW"
            alt="Blue Lagoon Iceland"
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
              <span className="text-primary">Blue Lagoon Experience</span>
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-bold mb-6">
              <Snowflake className="size-4" />
              Iceland's #1 Attraction
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Experience the <br />
              <span className="text-cyan-400">Blue Lagoon</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Immerse yourself in the world-famous geothermal spa surrounded by stunning lava fields.
              Our premium transfer service ensures a seamless journey to this natural wonder.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/booking?type=BLUE_LAGOON"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-400 transition-colors"
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

      {/* Quick Info Bar */}
      <section className="bg-cyan-500 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>47 km from Reykjavik</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-4" />
              <span>~45 min drive</span>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer className="size-4" />
              <span>38-40°C water</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="size-4" />
              <span>Mineral-rich waters</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                A Journey to Iceland's Most Iconic Destination
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                The Blue Lagoon is more than just a geothermal spa – it's an otherworldly experience
                set amidst a dramatic lava landscape. The milky-blue waters are rich in silica,
                algae, and minerals that nourish and rejuvenate your skin.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Our transfer service takes the stress out of your visit. We'll pick you up from
                your accommodation, drive you through Iceland's stunning landscapes, and ensure
                you arrive relaxed and ready to enjoy this unique natural wonder.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.slice(0, 6).map((highlight) => (
                  <div key={highlight} className="flex items-start gap-2">
                    <Check className="size-5 text-cyan-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPXvrb1aP9kpKx-HXmoSB6b-3abWjRApv-GTl4XbGpqtH071cxb1IJjdrtCxu170xPeyH72NQvSpcof3QAdzoEAF2F1poyoUxQGiwcSpkipgI6QyODOAjU-d_MH4TyO-ZZscbMoy5ZIHNF1KJQPCTS8H2Su8McBPDILWZlVEBtnCrCE4Vn3CfQ7k8QrUQeg9rqD0mWtqpoKw7MfZmas0T1bJhf4AIyf9_rt5UzmikNpDwZHKboFVOBlnBTyMNFhGFvKnMbdztl0JmW"
                alt="Blue Lagoon geothermal spa"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Book With Us</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              We make your Blue Lagoon experience seamless from start to finish
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="size-16 mx-auto mb-4 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                  <feature.icon className="size-8 text-cyan-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 px-4 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Transfer Packages</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Choose the package that best suits your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 ${
                  pkg.popular ? 'border-cyan-500' : 'border-slate-100 dark:border-slate-700'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 text-white text-xs font-bold rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{pkg.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{pkg.description}</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white mb-6">
                  {pkg.price}
                  <span className="text-sm font-normal text-slate-500"> / person</span>
                </p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Check className="size-4 text-cyan-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/booking?type=BLUE_LAGOON"
                  className={`block text-center py-3 rounded-xl font-bold transition-colors ${
                    pkg.popular
                      ? 'bg-cyan-500 text-white hover:bg-cyan-400'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Gallery</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              A glimpse of what awaits you at the Blue Lagoon
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPXvrb1aP9kpKx-HXmoSB6b-3abWjRApv-GTl4XbGpqtH071cxb1IJjdrtCxu170xPeyH72NQvSpcof3QAdzoEAF2F1poyoUxQGiwcSpkipgI6QyODOAjU-d_MH4TyO-ZZscbMoy5ZIHNF1KJQPCTS8H2Su8McBPDILWZlVEBtnCrCE4Vn3CfQ7k8QrUQeg9rqD0mWtqpoKw7MfZmas0T1bJhf4AIyf9_rt5UzmikNpDwZHKboFVOBlnBTyMNFhGFvKnMbdztl0JmW"
                  alt={`Blue Lagoon photo ${i}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="max-w-4xl mx-auto text-center">
          <Camera className="size-12 mx-auto mb-6 text-white/80" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready for an Unforgettable Experience?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Book your Blue Lagoon transfer today and let us handle the rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking?type=BLUE_LAGOON"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-cyan-600 font-bold rounded-xl hover:bg-slate-100 transition-colors"
            >
              Book Transfer
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-colors"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
