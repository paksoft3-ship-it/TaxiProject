export interface Tour {
    id: string;
    name: string;
    slug: string;
    category: 'FULL_DAY' | 'HALF_DAY' | 'TRANSFER' | 'EVENING' | 'MULTI_DAY';
    duration: string;
    shortDescription: string;
    price: number;
    currency: string;
    image: string;
    badge?: {
        text: string;
        type: 'popular' | 'seasonal' | 'transfer';
    };
    highlights: string[];
    distance?: string;
    isNorthernLights?: boolean;
    isAirport?: boolean;
}

export const tours: Tour[] = [
    {
        id: '1',
        name: 'Reykjavik City Tour',
        slug: 'reykjavik-city',
        category: 'HALF_DAY',
        duration: '1-3 Hours',
        shortDescription: 'Looking for an unforgettable experience in Reykjavik?',
        price: 10500,
        currency: 'ISK',
        image: '/images/reykjavik_city.png',
        highlights: ['Hallgrímskirkja Church', 'Harpa Concert Hall', 'Sun Voyager & Old Harbour'],
    },
    {
        id: '2',
        name: 'Golden Circle',
        slug: 'golden-circle',
        category: 'FULL_DAY',
        duration: '6 Hours',
        shortDescription: 'As its title suggests, this comprehensive tour covers all the major attractions...',
        price: 92500,
        currency: 'ISK',
        image: '/images/golden_circle.png',
        badge: { text: 'Top Rated', type: 'popular' },
        highlights: ['Gullfoss Waterfall & Geysir Area', 'Thingvellir National Park', 'Luxury Vehicle & WiFi'],
        distance: '320.0 Km',
    },
    {
        id: '3',
        name: 'South Coast Spectacular Tour',
        slug: 'south-coast',
        category: 'FULL_DAY',
        duration: '10 Hours',
        shortDescription: 'Discover the stunning South Coast of Iceland with its waterfalls, black sand beaches, and glaciers.',
        price: 138500,
        currency: 'ISK',
        image: '/images/south_coast.png',
        highlights: ['Reynisfjara Black Sand Beach', 'Skógafoss & Seljalandsfoss', 'Vík Village Visit'],
        distance: '210.0 Km',
    },
    {
        id: '4',
        name: 'Snæfellsnes Peninsula Tour',
        slug: 'snaefellsnes',
        category: 'FULL_DAY',
        duration: '12 Hours',
        shortDescription: 'Discover the Magic of Snæfellsnes Peninsula',
        price: 154500,
        currency: 'ISK',
        image: '/images/snaefellsnes.png',
        highlights: ['Kirkjufell Mountain', 'Snæfellsjökull Glacier', 'Arnarstapi Cliffs'],
        distance: '210.0 Km',
    },
    {
        id: '5',
        name: 'Glacier Lagoon & Diamond Beach',
        slug: 'glacier-lagoon',
        category: 'FULL_DAY',
        duration: '15 Hours',
        shortDescription: 'Welcome to the icy heart of Iceland\'s nature!',
        price: 204500,
        currency: 'ISK',
        image: '/images/glacier_lagoon.png',
        badge: { text: 'Epic Journey', type: 'popular' },
        highlights: ['Jökulsárlón Glacier Lagoon', 'Diamond Beach', 'Vatnajökull Views'],
        distance: '800.0 Km',
    },
    {
        id: '6',
        name: 'Reykjavik to Blue Lagoon',
        slug: 'blue-lagoon',
        category: 'TRANSFER',
        duration: '45 min',
        shortDescription: 'Are you going to the Blue Lagoon?',
        price: 20000,
        currency: 'ISK',
        image: '/images/blue_lagoon.png',
        badge: { text: 'Transfer', type: 'transfer' },
        highlights: ['Door-to-door Luxury Service', 'Luggage Assistance', 'Flexible Timing'],
        distance: '50.0 Km',
    },
    {
        id: '7',
        name: 'Northern Lights Hunt',
        slug: 'northern-lights',
        category: 'HALF_DAY',
        duration: '4-5 Hours',
        shortDescription: 'Aurora Borealis Chase',
        price: 65000,
        currency: 'ISK',
        image: '/images/northern_lights.png',
        badge: { text: 'Seasonal', type: 'popular' },
        highlights: ['Expert Aurora Forecasting', 'Prime Viewing Locations', 'Hot Chocolate & Snacks'],
        isNorthernLights: true,
    },
    {
        id: '8',
        name: 'Keflavik Airport Transfer',
        slug: 'airport-transfer',
        category: 'TRANSFER',
        duration: '45 min',
        shortDescription: 'A convenient, comfortable option for passengers...',
        price: 20000,
        currency: 'ISK',
        image: '/images/airport_transfer.png',
        badge: { text: 'Transfer', type: 'transfer' },
        highlights: ['Flight Monitoring', 'Meet & Greet', '24/7 Service'],
        isAirport: true,
        distance: '50.0 Km',
    },
];
