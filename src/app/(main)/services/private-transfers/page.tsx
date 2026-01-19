import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Car,
  Check,
  ArrowRight,
  Clock,
  Users,
  Shield,
  Star,
  Phone,
  Wifi,
  Baby,
  CreditCard,
  MapPin,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Private Transfers | Luxury Door-to-Door Service',
  description:
    'Premium private transfer service anywhere in Iceland. Professional drivers, luxury vehicles, and 24/7 availability for all your transportation needs.',
};

const features = [
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Book transfers any time of day or night - we\'re always here for you.',
  },
  {
    icon: Users,
    title: 'Professional Drivers',
    description: 'Experienced, English-speaking chauffeurs with local expertise.',
  },
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'Complete insurance coverage for your peace of mind.',
  },
  {
    icon: Star,
    title: 'Premium Vehicles',
    description: 'Modern, well-maintained fleet with luxury amenities.',
  },
];

const vehicleOptions = [
  {
    name: 'Standard Sedan',
    capacity: '1-3 passengers',
    luggage: '3 bags',
    price: 'From 10,000 ISK',
    features: ['Air conditioning', 'Free WiFi', 'Phone chargers', 'Bottled water'],
  },
  {
    name: 'Premium SUV',
    capacity: '1-4 passengers',
    luggage: '4 bags',
    price: 'From 19,500 ISK',
    features: ['Leather seats', 'Extra legroom', 'Free WiFi', 'Climate control'],
    popular: true,
  },
  {
    name: 'Luxury Van',
    capacity: '5-8 passengers',
    luggage: '8 bags',
    price: 'From 27,500 ISK',
    features: ['Spacious interior', 'Individual seats', 'Free WiFi', 'USB ports'],
  },
];

const popularRoutes = [
  { route: 'Reykjavik to Blue Lagoon', price: '19,500 ISK' },
  { route: 'Blue Lagoon to Reykjavik', price: '19,500 ISK' },
  { route: 'Transfer to/from Hveragerði', price: '22,000 ISK' },
  { route: 'Transfer to/from Selfoss', price: '27,500 ISK' },
  { route: 'Transfer to/from The Lava Tunnel', price: '21,000 ISK' },
  { route: 'Transfer to/from Hotel ION Adventure', price: '26,500 ISK' },
  { route: 'Transfer to/from Hotel Grímsborgir', price: '35,500 ISK' },
  { route: 'Transfer to/from Hotel Ranga', price: '53,500 ISK' },
  { route: 'Transfer to/from Hotel Búðir', price: '88,000 ISK' },
];

const transferTypes = [
  {
    title: 'Hotel Transfers',
    description: 'Comfortable rides between hotels and accommodations anywhere in the Reykjavik area.',
    icon: MapPin,
  },
  {
    title: 'Event Transportation',
    description: 'Reliable transport for weddings, conferences, and special occasions.',
    icon: Star,
  },
  {
    title: 'Business Travel',
    description: 'Professional service for corporate clients with invoicing options.',
    icon: CreditCard,
  },
  {
    title: 'Custom Routes',
    description: 'Flexible transfers to any destination in Iceland with multiple stops.',
    icon: Car,
  },
];

const highlights = [
  'Door-to-door service from any location',
  'Meet & greet service available',
  'Real-time booking confirmation',
  'Flight tracking for airport pickups',
  'Child seats available on request',
  'Wheelchair accessible vehicles',
  'Corporate accounts welcome',
  'Multiple payment options',
];

export default function PrivateTransfersPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-secondary text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvP5L7B8Gj9XiIQW2M7FqVt2lRYuLhJKYh5WpXqB4Y3VcXfN8M2xLT6HqZ8RpKXwFjLxNvYtK9mCfPwQ1R5PvL7VyWqKhPgR3xZnF8wN7Q"
            alt="Private Transfer Service"
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
              <span className="text-primary">Private Transfers</span>
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-yellow-400 rounded-full text-sm font-bold mb-6">
              <Car className="size-4" />
              Premium Service
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Private <br />
              <span className="text-yellow-400">Transfers</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Experience luxury door-to-door transportation anywhere in Iceland.
              Professional chauffeurs, premium vehicles, and service that exceeds expectations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/booking?type=PRIVATE_TRANSFER"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors"
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

      {/* Vehicle Amenities Bar */}
      <section className="bg-primary text-black py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Wifi className="size-4" />
              <span>Free WiFi</span>
            </div>
            <div className="flex items-center gap-2">
              <Baby className="size-4" />
              <span>Child Seats</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="size-4" />
              <span>Card Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="size-4" />
              <span>Fully Insured</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Options */}
      <section className="py-20 px-4 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Vehicles</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Choose the perfect vehicle for your journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vehicleOptions.map((vehicle) => (
              <div
                key={vehicle.name}
                className={`relative bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 ${
                  vehicle.popular ? 'border-primary' : 'border-slate-100 dark:border-slate-700'
                }`}
              >
                {vehicle.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-black text-xs font-bold rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{vehicle.name}</h3>
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <Users className="size-4 inline mr-2" />
                    {vehicle.capacity}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <MapPin className="size-4 inline mr-2" />
                    {vehicle.luggage}
                  </p>
                </div>
                <ul className="space-y-2 mb-6">
                  {vehicle.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Check className="size-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-2xl font-black text-slate-900 dark:text-white mb-6">{vehicle.price}</p>
                <Link
                  href="/booking?type=PRIVATE_TRANSFER"
                  className={`block text-center py-3 rounded-xl font-bold transition-colors ${
                    vehicle.popular
                      ? 'bg-primary text-black hover:bg-yellow-400'
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

      {/* Transfer Types */}
      <section className="py-20 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Transfer Services</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Whatever your transportation needs, we've got you covered
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {transferTypes.map((type) => (
              <div key={type.title} className="text-center">
                <div className="size-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <type.icon className="size-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{type.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-20 px-4 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Popular Routes & Prices</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Fixed prices for our most requested transfer routes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularRoutes.map((item) => (
              <div
                key={item.route}
                className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700"
              >
                <span className="text-slate-700 dark:text-slate-300 font-medium">{item.route}</span>
                <span className="text-primary font-bold whitespace-nowrap ml-4">{item.price}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-8">
            Prices are for 1-4 passengers. Contact us for larger groups or custom routes.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvP5L7B8Gj9XiIQW2M7FqVt2lRYuLhJKYh5WpXqB4Y3VcXfN8M2xLT6HqZ8RpKXwFjLxNvYtK9mCfPwQ1R5PvL7VyWqKhPgR3xZnF8wN7Q"
                alt="Premium transfer vehicle"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Why Choose Our Private Transfers?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Our private transfer service offers the highest level of comfort and convenience.
                Whether you're traveling for business or pleasure, our professional chauffeurs
                ensure you arrive at your destination relaxed and on time.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                With a modern fleet of vehicles and 24/7 availability, we're here whenever you
                need us. Book online or call us directly for immediate assistance.
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-yellow-500">
        <div className="max-w-4xl mx-auto text-center">
          <Car className="size-12 mx-auto mb-6 text-black/60" />
          <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
            Need a Ride?
          </h2>
          <p className="text-black/70 text-lg mb-8">
            Book your private transfer now and travel in comfort and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking?type=PRIVATE_TRANSFER"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
            >
              Book Transfer
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/30 text-black font-bold rounded-xl hover:bg-white/40 transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
