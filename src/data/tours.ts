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
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT4xAiwOYzy5D3pJWuGoHH7APGUplommRj1qLquuXgM3dH_DSqzY9ZE74j7kz-I4a5EYSWm-ymsUkdHZiHmKqgBzLwq-z0bJF4A9vnYvWGdL9dG2lNSNtzYl9dzj37nfDpuwa_LBg86bznhs9wE4QqoPZFU1XBFm8dc4WliNXy2jRQQz41Z_gR2qFB9kyoGp8BjwmPMpFYXfl7iJ-bpYTMPMO0jjiWl8K0buWMIf_MdcvM2DoIKlYh_8ZF2hG-K_LT4L7gK5lw3cv6',
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
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT4xAiwOYzy5D3pJWuGoHH7APGUplommRj1qLquuXgM3dH_DSqzY9ZE74j7kz-I4a5EYSWm-ymsUkdHZiHmKqgBzLwq-z0bJF4A9vnYvWGdL9dG2lNSNtzYl9dzj37nfDpuwa_LBg86bznhs9wE4QqoPZFU1XBFm8dc4WliNXy2jRQQz41Z_gR2qFB9kyoGp8BjwmPMpFYXfl7iJ-bpYTMPMO0jjiWl8K0buWMIf_MdcvM2DoIKlYh_8ZF2hG-K_LT4L7gK5lw3cv6',
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
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKs6YqO20c1r3pE0D8sWRH66wzozCBCzK31rodsy877bxh-F_7A9ZbB4y5EMO1ymwb_JYsNs6icv6zTmCTFNKvX-ERHUWzyyowKLo0F4j1ctYByW2zCmXJ6ROG88q_oMJT1_HidGHogvc6MmiJokry1fkBj1NpbRGSx8e9VOCKQ9elH7dUFL1czKF7asn5GELd63XMPR_AR8wNG0N4opKnTtPb4nxOcmaa12r6USvTMMO9sxD0m9anIypH-N11ricL6apczJp2e6gO',
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
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9yJ3B9Al8bmIxJTD2BbEOAMvpW_0scC-MVjvxKzeH2C_2rKO9waZoL87HNtEuD-9iHl7u-psWVdEStLcU4-oR3aSX7girGHTq-3SEnfK6sxJ6blhPgUrDasXtg7c7zFxzQj6Au4EezoprIK5uiuffZsuAg9f68xi-rJaThDWQfHaZheDl2E4Hv4eE4mZQ5BRu6L_GjGjEdfJgv5nHDhIHAdlCiZZt-GZQVka3N-PZ_7fQaPnfKXHfaL8XxcOkyEOuuVQOGGfHqHI9',
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
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKs6YqO20c1r3pE0D8sWRH66wzozCBCzK31rodsy877bxh-F_7A9ZbB4y5EMO1ymwb_JYsNs6icv6zTmCTFNKvX-ERHUWzyyowKLo0F4j1ctYByW2zCmXJ6ROG88q_oMJT1_HidGHogvc6MmiJokry1fkBj1NpbRGSx8e9VOCKQ9elH7dUFL1czKF7asn5GELd63XMPR_AR8wNG0N4opKnTtPb4nxOcmaa12r6USvTMMO9sxD0m9anIypH-N11ricL6apczJp2e6gO',
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
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVWeCbujmlEyrgmQ8GQQ4KrfCo9ELZ_L573wLwgKBck7PWSCwohWC6tPekru2ZS7aM6XrDpisc1IXVB4XWg6DQOWEtAak0-ybxa5aPf7A0VKzNCo0smbeNWrr1VFCCJYKL8RY0CrVdKYBER2B4EY0L8WpaahjiMg-SNTM4Q5sRgFPb7XQMkgW9YHw43sDx0I7p9rZfaTp3qMEB_a_X_RKtXOEqikacLPpoD9hYmNg_gpNRFg5vMXR49lbdM0yU7Nk_yoBF3Zg57OmZ',
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
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT4xAiwOYzy5D3pJWuGoHH7APGUplommRj1qLquuXgM3dH_DSqzY9ZE74j7kz-I4a5EYSWm-ymsUkdHZiHmKqgBzLwq-z0bJF4A9vnYvWGdL9dG2lNSNtzYl9dzj37nfDpuwa_LBg86bznhs9wE4QqoPZFU1XBFm8dc4WliNXy2jRQQz41Z_gR2qFB9kyoGp8BjwmPMpFYXfl7iJ-bpYTMPMO0jjiWl8K0buWMIf_MdcvM2DoIKlYh_8ZF2hG-K_LT4L7gK5lw3cv6',
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
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVWeCbujmlEyrgmQ8GQQ4KrfCo9ELZ_L573wLwgKBck7PWSCwohWC6tPekru2ZS7aM6XrDpisc1IXVB4XWg6DQOWEtAak0-ybxa5aPf7A0VKzNCo0smbeNWrr1VFCCJYKL8RY0CrVdKYBER2B4EY0L8WpaahjiMg-SNTM4Q5sRgFPb7XQMkgW9YHw43sDx0I7p9rZfaTp3qMEB_a_X_RKtXOEqikacLPpoD9hYmNg_gpNRFg5vMXR49lbdM0yU7Nk_yoBF3Zg57OmZ',
        badge: { text: 'Transfer', type: 'transfer' },
        highlights: ['Flight Monitoring', 'Meet & Greet', '24/7 Service'],
        isAirport: true,
        distance: '50.0 Km',
    },
];
