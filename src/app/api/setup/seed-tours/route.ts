import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

const toursData = [
  {
    name: 'Reykjavik City Tour',
    slug: 'reykjavik-city',
    category: 'HALF_DAY' as const,
    duration: '1-3 Hours',
    durationHours: 2,
    shortDescription: 'Looking for an unforgettable experience in Reykjavik?',
    description:
      'Experience the magic of Reykjavik with our private city tour. Discover the iconic landmarks that make the capital of Iceland so unique. From the striking Hallgrímskirkja church to the modern Harpa concert hall, our expert guide will show you the best of Reykjavik at your own pace.',
    price: 10500,
    currency: 'ISK',
    highlights: ['Hallgrímskirkja Church', 'Harpa Concert Hall', 'Sun Voyager & Old Harbour'],
    includes: ['Private luxury vehicle', 'Professional driver-guide', 'WiFi on board', 'Bottled water'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAT4xAiwOYzy5D3pJWuGoHH7APGUplommRj1qLquuXgM3dH_DSqzY9ZE74j7kz-I4a5EYSWm-ymsUkdHZiHmKqgBzLwq-z0bJF4A9vnYvWGdL9dG2lNSNtzYl9dzj37nfDpuwa_LBg86bznhs9wE4QqoPZFU1XBFm8dc4WliNXy2jRQQz41Z_gR2qFB9kyoGp8BjwmPMpFYXfl7iJ-bpYTMPMO0jjiWl8K0buWMIf_MdcvM2DoIKlYh_8ZF2hG-K_LT4L7gK5lw3cv6',
    ],
    featured: false,
    active: true,
  },
  {
    name: 'Golden Circle',
    slug: 'golden-circle',
    category: 'FULL_DAY' as const,
    duration: '6 Hours',
    durationHours: 6,
    shortDescription: 'As its title suggests, this comprehensive tour covers all the major attractions...',
    description:
      "This comprehensive tour covers all the major attractions of Iceland's famous Golden Circle route. Visit Thingvellir National Park, where the Eurasian and North American tectonic plates meet, the spectacular Geysir geothermal area, and the majestic Gullfoss waterfall. An unforgettable full-day adventure.",
    price: 92500,
    currency: 'ISK',
    highlights: ['Gullfoss Waterfall & Geysir Area', 'Thingvellir National Park', 'Luxury Vehicle & WiFi'],
    includes: ['Private luxury vehicle', 'Professional driver-guide', 'WiFi on board', 'Bottled water', 'Hotel pickup & drop-off', 'All taxes and fees'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAT4xAiwOYzy5D3pJWuGoHH7APGUplommRj1qLquuXgM3dH_DSqzY9ZE74j7kz-I4a5EYSWm-ymsUkdHZiHmKqgBzLwq-z0bJF4A9vnYvWGdL9dG2lNSNtzYl9dzj37nfDpuwa_LBg86bznhs9wE4QqoPZFU1XBFm8dc4WliNXy2jRQQz41Z_gR2qFB9kyoGp8BjwmPMpFYXfl7iJ-bpYTMPMO0jjiWl8K0buWMIf_MdcvM2DoIKlYh_8ZF2hG-K_LT4L7gK5lw3cv6',
    ],
    featured: true,
    active: true,
  },
  {
    name: 'South Coast Spectacular Tour',
    slug: 'south-coast',
    category: 'FULL_DAY' as const,
    duration: '10 Hours',
    durationHours: 10,
    shortDescription: 'Discover the stunning South Coast of Iceland with its waterfalls, black sand beaches, and glaciers.',
    description:
      "Discover the stunning South Coast of Iceland with its dramatic waterfalls, mysterious black sand beaches, and towering glaciers. This tour takes you to Seljalandsfoss and Skógafoss waterfalls, the famous Reynisfjara black sand beach, and the charming village of Vík.",
    price: 138500,
    currency: 'ISK',
    highlights: ['Reynisfjara Black Sand Beach', 'Skógafoss & Seljalandsfoss', 'Vík Village Visit'],
    includes: ['Private luxury vehicle', 'Professional driver-guide', 'WiFi on board', 'Bottled water', 'Hotel pickup & drop-off', 'All taxes and fees'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCKs6YqO20c1r3pE0D8sWRH66wzozCBCzK31rodsy877bxh-F_7A9ZbB4y5EMO1ymwb_JYsNs6icv6zTmCTFNKvX-ERHUWzyyowKLo0F4j1ctYByW2zCmXJ6ROG88q_oMJT1_HidGHogvc6MmiJokry1fkBj1NpbRGSx8e9VOCKQ9elH7dUFL1czKF7asn5GELd63XMPR_AR8wNG0N4opKnTtPb4nxOcmaa12r6USvTMMO9sxD0m9anIypH-N11ricL6apczJp2e6gO',
    ],
    featured: false,
    active: true,
  },
  {
    name: 'Snæfellsnes Peninsula Tour',
    slug: 'snaefellsnes',
    category: 'FULL_DAY' as const,
    duration: '12 Hours',
    durationHours: 12,
    shortDescription: 'Discover the Magic of Snæfellsnes Peninsula',
    description:
      "Explore the magical Snæfellsnes Peninsula, immortalized in Jules Verne's 'Journey to the Center of the Earth'. Visit the iconic Kirkjufell mountain, the mystical Snæfellsjökull glacier, and the dramatic Arnarstapi cliffs with their unique basalt formations.",
    price: 154500,
    currency: 'ISK',
    highlights: ['Kirkjufell Mountain', 'Snæfellsjökull Glacier', 'Arnarstapi Cliffs'],
    includes: ['Private luxury vehicle', 'Professional driver-guide', 'WiFi on board', 'Bottled water', 'Hotel pickup & drop-off', 'All taxes and fees'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB9yJ3B9Al8bmIxJTD2BbEOAMvpW_0scC-MVjvxKzeH2C_2rKO9waZoL87HNtEuD-9iHl7u-psWVdEStLcU4-oR3aSX7girGHTq-3SEnfK6sxJ6blhPgUrDasXtg7c7zFxzQj6Au4EezoprIK5uiuffZsuAg9f68xi-rJaThDWQfHaZheDl2E4Hv4eE4mZQ5BRu6L_GjGjEdfJgv5nHDhIHAdlCiZZt-GZQVka3N-PZ_7fQaPnfKXHfaL8XxcOkyEOuuVQOGGfHqHI9',
    ],
    featured: false,
    active: true,
  },
  {
    name: 'Glacier Lagoon & Diamond Beach',
    slug: 'glacier-lagoon',
    category: 'FULL_DAY' as const,
    duration: '15 Hours',
    durationHours: 15,
    shortDescription: "Welcome to the icy heart of Iceland's nature!",
    description:
      "Embark on an epic journey to the icy heart of Iceland's nature. Visit the breathtaking Jökulsárlón Glacier Lagoon where icebergs calved from the Vatnajökull glacier float majestically. Then walk on the nearby Diamond Beach, where ice chunks glitter like diamonds on the black sand.",
    price: 204500,
    currency: 'ISK',
    highlights: ['Jökulsárlón Glacier Lagoon', 'Diamond Beach', 'Vatnajökull Views'],
    includes: ['Private luxury vehicle', 'Professional driver-guide', 'WiFi on board', 'Bottled water', 'Hotel pickup & drop-off', 'All taxes and fees'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCKs6YqO20c1r3pE0D8sWRH66wzozCBCzK31rodsy877bxh-F_7A9ZbB4y5EMO1ymwb_JYsNs6icv6zTmCTFNKvX-ERHUWzyyowKLo0F4j1ctYByW2zCmXJ6ROG88q_oMJT1_HidGHogvc6MmiJokry1fkBj1NpbRGSx8e9VOCKQ9elH7dUFL1czKF7asn5GELd63XMPR_AR8wNG0N4opKnTtPb4nxOcmaa12r6USvTMMO9sxD0m9anIypH-N11ricL6apczJp2e6gO',
    ],
    featured: true,
    active: true,
  },
  {
    name: 'Reykjavik to Blue Lagoon',
    slug: 'blue-lagoon',
    category: 'TRANSFER' as const,
    duration: '45 min',
    durationHours: 1,
    shortDescription: 'Are you going to the Blue Lagoon?',
    description:
      'Travel in comfort from Reykjavik to the world-famous Blue Lagoon geothermal spa. Our professional driver will ensure a smooth, punctual transfer with door-to-door service and assistance with your luggage.',
    price: 20000,
    currency: 'ISK',
    highlights: ['Door-to-door Luxury Service', 'Luggage Assistance', 'Flexible Timing'],
    includes: ['Private luxury vehicle', 'Professional driver', 'Luggage assistance', 'Meet & Greet'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBVWeCbujmlEyrgmQ8GQQ4KrfCo9ELZ_L573wLwgKBck7PWSCwohWC6tPekru2ZS7aM6XrDpisc1IXVB4XWg6DQOWEtAak0-ybxa5aPf7A0VKzNCo0smbeNWrr1VFCCJYKL8RY0CrVdKYBER2B4EY0L8WpaahjiMg-SNTM4Q5sRgFPb7XQMkgW9YHw43sDx0I7p9rZfaTp3qMEB_a_X_RKtXOEqikacLPpoD9hYmNg_gpNRFg5vMXR49lbdM0yU7Nk_yoBF3Zg57OmZ',
    ],
    featured: false,
    active: true,
  },
  {
    name: 'Northern Lights Hunt',
    slug: 'northern-lights',
    category: 'HALF_DAY' as const,
    duration: '4-5 Hours',
    durationHours: 5,
    shortDescription: 'Aurora Borealis Chase',
    description:
      "Chase the magical Aurora Borealis across Iceland's dark skies. Our experienced guide uses real-time weather and aurora forecasts to find the best viewing locations away from city lights. We won't stop until we find the lights!",
    price: 65000,
    currency: 'ISK',
    highlights: ['Expert Aurora Forecasting', 'Prime Viewing Locations', 'Hot Chocolate & Snacks'],
    includes: ['Private luxury vehicle', 'Professional guide', 'Hot chocolate & snacks', 'Photography assistance'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAT4xAiwOYzy5D3pJWuGoHH7APGUplommRj1qLquuXgM3dH_DSqzY9ZE74j7kz-I4a5EYSWm-ymsUkdHZiHmKqgBzLwq-z0bJF4A9vnYvWGdL9dG2lNSNtzYl9dzj37nfDpuwa_LBg86bznhs9wE4QqoPZFU1XBFm8dc4WliNXy2jRQQz41Z_gR2qFB9kyoGp8BjwmPMpFYXfl7iJ-bpYTMPMO0jjiWl8K0buWMIf_MdcvM2DoIKlYh_8ZF2hG-K_LT4L7gK5lw3cv6',
    ],
    featured: false,
    active: true,
  },
  {
    name: 'Keflavik Airport Transfer',
    slug: 'airport-transfer',
    category: 'TRANSFER' as const,
    duration: '45 min',
    durationHours: 1,
    shortDescription: 'A convenient, comfortable option for passengers...',
    description:
      'A convenient, comfortable option for passengers traveling between Keflavik International Airport and Reykjavik. Our driver monitors your flight for delays and will be waiting for you at arrivals with a name sign. Available 24/7, 365 days a year.',
    price: 20000,
    currency: 'ISK',
    highlights: ['Flight Monitoring', 'Meet & Greet', '24/7 Service'],
    includes: ['Private luxury vehicle', 'Professional driver', 'Flight tracking', 'Luggage assistance', 'Meet & Greet service'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBVWeCbujmlEyrgmQ8GQQ4KrfCo9ELZ_L573wLwgKBck7PWSCwohWC6tPekru2ZS7aM6XrDpisc1IXVB4XWg6DQOWEtAak0-ybxa5aPf7A0VKzNCo0smbeNWrr1VFCCJYKL8RY0CrVdKYBER2B4EY0L8WpaahjiMg-SNTM4Q5sRgFPb7XQMkgW9YHw43sDx0I7p9rZfaTp3qMEB_a_X_RKtXOEqikacLPpoD9hYmNg_gpNRFg5vMXR49lbdM0yU7Nk_yoBF3Zg57OmZ',
    ],
    featured: false,
    active: true,
  },
];

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const results = [];

    for (const tourData of toursData) {
      const existing = await prisma.tour.findUnique({ where: { slug: tourData.slug } });
      if (existing) {
        results.push({ slug: tourData.slug, status: 'skipped (already exists)' });
        continue;
      }

      await prisma.tour.create({ data: tourData });
      results.push({ slug: tourData.slug, status: 'created' });
    }

    return NextResponse.json({ message: 'Seed complete', results });
  } catch (error) {
    console.error('Seed tours error:', error);
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}
