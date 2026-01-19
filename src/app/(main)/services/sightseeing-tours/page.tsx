import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Mountain,
  Check,
  ArrowRight,
  Clock,
  Users,
  Shield,
  Star,
  Phone,
  Camera,
  Compass,
  Sun,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sightseeing Tours | Discover Iceland\'s Wonders',
  description:
    'Explore Iceland\'s breathtaking landscapes with our expert-guided sightseeing tours. Golden Circle, South Coast, Northern Lights, and more.',
};

const features = [
  {
    icon: Compass,
    title: 'Expert Local Guides',
    description: 'Knowledgeable guides who share Iceland\'s stories, history, and hidden secrets.',
  },
  {
    icon: Users,
    title: 'Small Groups',
    description: 'Intimate group sizes for a personalized and comfortable experience.',
  },
  {
    icon: Camera,
    title: 'Photo Stops',
    description: 'Plenty of opportunities to capture Iceland\'s stunning landscapes.',
  },
  {
    icon: Shield,
    title: 'All-Inclusive',
    description: 'Everything included - transport, guide, and entrance fees where applicable.',
  },
];

interface Tour {
  name: string;
  duration: string;
  price: string;
  image: string;
  description: string;
  highlights: string[];
  distance?: string;
  seasonal?: string;
}

const tours: Tour[] = [
  {
    name: 'Reykjavik City Tour',
    duration: '1-3 hours',
    price: '25,000 ISK',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC10Q-hY2ws9134hG20NMVDn8vGv-tytWbsLHTDxUGTgf8pe5Dsy3bpH5wZCtizwFcL3I5Ga--PZhMCx_bdWYkEwX_sFssIF1EwdrKoLgMC4XaYECNsLMoXIAjzjOKYMD6VxpffKEd9YVT5C5OjaWyr8NyyD0W6TWaJsyyrWU5DVkV4ZanpPaEQppc03CO1XqfHQrHNjbcIWItbD04yDM4ciLseawjJL5Ux9122v_RtFeaa2YclITWf1yjVhqZv3rdyjKcvPd3Zxej9',
    description: 'Discover the charm of Iceland\'s capital with a personalized city tour covering all major landmarks.',
    highlights: ['Hallgrímskirkja Church', 'Harpa Concert Hall', 'Sun Voyager', 'Old Harbour'],
  },
  {
    name: 'Golden Circle',
    duration: '6 hours',
    price: '92,000 ISK',
    distance: '320 km',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC10Q-hY2ws9134hG20NMVDn8vGv-tytWbsLHTDxUGTgf8pe5Dsy3bpH5wZCtizwFcL3I5Ga--PZhMCx_bdWYkEwX_sFssIF1EwdrKoLgMC4XaYECNsLMoXIAjzjOKYMD6VxpffKEd9YVT5C5OjaWyr8NyyD0W6TWaJsyyrWU5DVkV4ZanpPaEQppc03CO1XqfHQrHNjbcIWItbD04yDM4ciLseawjJL5Ux9122v_RtFeaa2YclITWf1yjVhqZv3rdyjKcvPd3Zxej9',
    description: 'Visit Þingvellir National Park, Geysir geothermal area, and Gullfoss waterfall.',
    highlights: ['Þingvellir National Park', 'Strokkur Geyser', 'Gullfoss Waterfall', 'Kerið Crater (optional)'],
  },
  {
    name: 'South Coast Spectacular',
    duration: '10 hours',
    price: '138,000 ISK',
    distance: '420 km',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC10Q-hY2ws9134hG20NMVDn8vGv-tytWbsLHTDxUGTgf8pe5Dsy3bpH5wZCtizwFcL3I5Ga--PZhMCx_bdWYkEwX_sFssIF1EwdrKoLgMC4XaYECNsLMoXIAjzjOKYMD6VxpffKEd9YVT5C5OjaWyr8NyyD0W6TWaJsyyrWU5DVkV4ZanpPaEQppc03CO1XqfHQrHNjbcIWItbD04yDM4ciLseawjJL5Ux9122v_RtFeaa2YclITWf1yjVhqZv3rdyjKcvPd3Zxej9',
    description: 'Explore waterfalls, black sand beaches, and glacier views along the scenic south coast.',
    highlights: ['Seljalandsfoss Waterfall', 'Skógafoss Waterfall', 'Reynisfjara Black Beach', 'Vík Village'],
  },
  {
    name: 'Snæfellsnes Peninsula',
    duration: '12 hours',
    price: '154,000 ISK',
    distance: '350 km',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC10Q-hY2ws9134hG20NMVDn8vGv-tytWbsLHTDxUGTgf8pe5Dsy3bpH5wZCtizwFcL3I5Ga--PZhMCx_bdWYkEwX_sFssIF1EwdrKoLgMC4XaYECNsLMoXIAjzjOKYMD6VxpffKEd9YVT5C5OjaWyr8NyyD0W6TWaJsyyrWU5DVkV4ZanpPaEQppc03CO1XqfHQrHNjbcIWItbD04yDM4ciLseawjJL5Ux9122v_RtFeaa2YclITWf1yjVhqZv3rdyjKcvPd3Zxej9',
    description: 'Discover "Iceland in Miniature" with diverse landscapes, volcanoes, and charming villages.',
    highlights: ['Kirkjufell Mountain', 'Snæfellsjökull Glacier', 'Arnarstapi Cliffs', 'Djúpalónssandur Beach'],
  },
  {
    name: 'Glacier Lagoon & Diamond Beach',
    duration: '15 hours',
    price: '204,000 ISK',
    distance: '800 km',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC10Q-hY2ws9134hG20NMVDn8vGv-tytWbsLHTDxUGTgf8pe5Dsy3bpH5wZCtizwFcL3I5Ga--PZhMCx_bdWYkEwX_sFssIF1EwdrKoLgMC4XaYECNsLMoXIAjzjOKYMD6VxpffKEd9YVT5C5OjaWyr8NyyD0W6TWaJsyyrWU5DVkV4ZanpPaEQppc03CO1XqfHQrHNjbcIWItbD04yDM4ciLseawjJL5Ux9122v_RtFeaa2YclITWf1yjVhqZv3rdyjKcvPd3Zxej9',
    description: 'Journey to the stunning Jökulsárlón glacier lagoon and the famous Diamond Beach where icebergs wash ashore.',
    highlights: ['Jökulsárlón Glacier Lagoon', 'Diamond Beach', 'Vatnajökull Glacier', 'Scenic South Coast'],
  },
];

const highlights = [
  'Door-to-door hotel pickup and drop-off',
  'Professional English-speaking guide/driver',
  'Comfortable 4x4 vehicles for all conditions',
  'Small groups (max 7 passengers)',
  'Flexible itineraries based on weather',
  'Photography stops at the best viewpoints',
  'Local insights and hidden gems',
  'Free WiFi in all vehicles',
];

export default function SightseeingToursPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-secondary text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC10Q-hY2ws9134hG20NMVDn8vGv-tytWbsLHTDxUGTgf8pe5Dsy3bpH5wZCtizwFcL3I5Ga--PZhMCx_bdWYkEwX_sFssIF1EwdrKoLgMC4XaYECNsLMoXIAjzjOKYMD6VxpffKEd9YVT5C5OjaWyr8NyyD0W6TWaJsyyrWU5DVkV4ZanpPaEQppc03CO1XqfHQrHNjbcIWItbD04yDM4ciLseawjJL5Ux9122v_RtFeaa2YclITWf1yjVhqZv3rdyjKcvPd3Zxej9"
            alt="Iceland Sightseeing Tours"
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
              <span className="text-primary">Sightseeing Tours</span>
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm font-bold mb-6">
              <Mountain className="size-4" />
              Guided Adventures
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Sightseeing <br />
              <span className="text-purple-400">Tours</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Discover Iceland's most spectacular landscapes with our expert-guided tours.
              From powerful waterfalls to mystical Northern Lights, experience it all.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/tours"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-400 transition-colors"
              >
                View All Tours
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

      {/* Quick Stats */}
      <section className="bg-purple-500 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Star className="size-4" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="size-4" />
              <span>5000+ Happy Travelers</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="size-4" />
              <span>10+ Tour Options</span>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="size-4" />
              <span>Year-round Tours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-20 px-4 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Popular Tours</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Choose from our most loved sightseeing experiences
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tours.map((tour) => (
              <div
                key={tour.name}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700"
              >
                <div className="relative h-48">
                  <Image src={tour.image} alt={tour.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{tour.name}</h3>
                    <div className="flex items-center gap-4 text-white/80 text-sm mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {tour.duration}
                      </span>
                      {tour.seasonal && (
                        <span className="px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full">
                          {tour.seasonal}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 dark:text-slate-400 mb-4">{tour.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tour.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-3 py-1 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div>
                      <p className="text-sm text-slate-500">From</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white">{tour.price}</p>
                    </div>
                    <Link
                      href="/tours"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="py-20 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Experience Iceland Like a Local
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Our sightseeing tours are designed to give you an authentic Icelandic experience.
                With local guides who are passionate about their homeland, you'll discover not
                just the famous attractions, but also hidden gems that most tourists never see.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                We keep our groups small to ensure a personalized experience, and our flexible
                itineraries mean we can adapt to weather conditions and your interests.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-2">
                    <Check className="size-5 text-purple-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature.title} className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                  <div className="size-12 mb-4 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <feature.icon className="size-6 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="max-w-4xl mx-auto text-center">
          <Sparkles className="size-12 mx-auto mb-6 text-white/80" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to Explore Iceland?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Book your sightseeing tour today and create memories that last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tours"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-slate-100 transition-colors"
            >
              Browse All Tours
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-colors"
            >
              Custom Tour Request
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
