'use client';

import { useState, useMemo } from 'react';
import { Search, Sparkles, SlidersHorizontal } from 'lucide-react';
import { TourCard } from '@/components/TourCard';
import { cn } from '@/lib/utils';

const tours = [
  {
    id: '1',
    name: 'Reykjavik City Tour',
    slug: 'reykjavik-city',
    category: 'HALF_DAY' as const,
    duration: '1-3 Hours',
    shortDescription: 'Explore Iceland\'s Capital',
    price: 25000,
    currency: 'ISK',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT4xAiwOYzy5D3pJWuGoHH7APGUplommRj1qLquuXgM3dH_DSqzY9ZE74j7kz-I4a5EYSWm-ymsUkdHZiHmKqgBzLwq-z0bJF4A9vnYvWGdL9dG2lNSNtzYl9dzj37nfDpuwa_LBg86bznhs9wE4QqoPZFU1XBFm8dc4WliNXy2jRQQz41Z_gR2qFB9kyoGp8BjwmPMpFYXfl7iJ-bpYTMPMO0jjiWl8K0buWMIf_MdcvM2DoIKlYh_8ZF2hG-K_LT4L7gK5lw3cv6',
    highlights: ['Hallgrímskirkja Church', 'Harpa Concert Hall', 'Sun Voyager & Old Harbour'],
  },
  {
    id: '2',
    name: 'Golden Circle',
    slug: 'golden-circle',
    category: 'FULL_DAY' as const,
    duration: '6 Hours',
    shortDescription: 'Thingvellir, Geysir & Gullfoss',
    price: 92000,
    currency: 'ISK',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT4xAiwOYzy5D3pJWuGoHH7APGUplommRj1qLquuXgM3dH_DSqzY9ZE74j7kz-I4a5EYSWm-ymsUkdHZiHmKqgBzLwq-z0bJF4A9vnYvWGdL9dG2lNSNtzYl9dzj37nfDpuwa_LBg86bznhs9wE4QqoPZFU1XBFm8dc4WliNXy2jRQQz41Z_gR2qFB9kyoGp8BjwmPMpFYXfl7iJ-bpYTMPMO0jjiWl8K0buWMIf_MdcvM2DoIKlYh_8ZF2hG-K_LT4L7gK5lw3cv6',
    badge: { text: 'Top Rated', type: 'popular' as const },
    highlights: ['Gullfoss Waterfall & Geysir Area', 'Thingvellir National Park', 'Luxury Vehicle & WiFi'],
  },
  {
    id: '3',
    name: 'South Coast Spectacular',
    slug: 'south-coast',
    category: 'FULL_DAY' as const,
    duration: '10 Hours',
    shortDescription: 'Waterfalls & Black Sand Beach',
    price: 138000,
    currency: 'ISK',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKs6YqO20c1r3pE0D8sWRH66wzozCBCzK31rodsy877bxh-F_7A9ZbB4y5EMO1ymwb_JYsNs6icv6zTmCTFNKvX-ERHUWzyyowKLo0F4j1ctYByW2zCmXJ6ROG88q_oMJT1_HidGHogvc6MmiJokry1fkBj1NpbRGSx8e9VOCKQ9elH7dUFL1czKF7asn5GELd63XMPR_AR8wNG0N4opKnTtPb4nxOcmaa12r6USvTMMO9sxD0m9anIypH-N11ricL6apczJp2e6gO',
    highlights: ['Reynisfjara Black Sand Beach', 'Skógafoss & Seljalandsfoss', 'Vík Village Visit'],
  },
  {
    id: '4',
    name: 'Snæfellsnes Peninsula',
    slug: 'snaefellsnes',
    category: 'FULL_DAY' as const,
    duration: '12 Hours',
    shortDescription: 'Iceland in Miniature',
    price: 154000,
    currency: 'ISK',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9yJ3B9Al8bmIxJTD2BbEOAMvpW_0scC-MVjvxKzeH2C_2rKO9waZoL87HNtEuD-9iHl7u-psWVdEStLcU4-oR3aSX7girGHTq-3SEnfK6sxJ6blhPgUrDasXtg7c7zFxzQj6Au4EezoprIK5uiuffZsuAg9f68xi-rJaThDWQfHaZheDl2E4Hv4eE4mZQ5BRu6L_GjGjEdfJgv5nHDhIHAdlCiZZt-GZQVka3N-PZ_7fQaPnfKXHfaL8XxcOkyEOuuVQOGGfHqHI9',
    highlights: ['Kirkjufell Mountain', 'Snæfellsjökull Glacier', 'Arnarstapi Cliffs'],
  },
  {
    id: '5',
    name: 'Glacier Lagoon & Diamond Beach',
    slug: 'glacier-lagoon',
    category: 'FULL_DAY' as const,
    duration: '15 Hours',
    shortDescription: 'Jökulsárlón Adventure',
    price: 204000,
    currency: 'ISK',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKs6YqO20c1r3pE0D8sWRH66wzozCBCzK31rodsy877bxh-F_7A9ZbB4y5EMO1ymwb_JYsNs6icv6zTmCTFNKvX-ERHUWzyyowKLo0F4j1ctYByW2zCmXJ6ROG88q_oMJT1_HidGHogvc6MmiJokry1fkBj1NpbRGSx8e9VOCKQ9elH7dUFL1czKF7asn5GELd63XMPR_AR8wNG0N4opKnTtPb4nxOcmaa12r6USvTMMO9sxD0m9anIypH-N11ricL6apczJp2e6gO',
    badge: { text: 'Epic Journey', type: 'popular' as const },
    highlights: ['Jökulsárlón Glacier Lagoon', 'Diamond Beach', 'Vatnajökull Views'],
  },
  {
    id: '6',
    name: 'Blue Lagoon Transfer',
    slug: 'blue-lagoon',
    category: 'TRANSFER' as const,
    duration: '45 min each way',
    shortDescription: 'Relaxing Geothermal Spa',
    price: 19500,
    currency: 'ISK',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVWeCbujmlEyrgmQ8GQQ4KrfCo9ELZ_L573wLwgKBck7PWSCwohWC6tPekru2ZS7aM6XrDpisc1IXVB4XWg6DQOWEtAak0-ybxa5aPf7A0VKzNCo0smbeNWrr1VFCCJYKL8RY0CrVdKYBER2B4EY0L8WpaahjiMg-SNTM4Q5sRgFPb7XQMkgW9YHw43sDx0I7p9rZfaTp3qMEB_a_X_RKtXOEqikacLPpoD9hYmNg_gpNRFg5vMXR49lbdM0yU7Nk_yoBF3Zg57OmZ',
    badge: { text: 'Transfer', type: 'transfer' as const },
    highlights: ['Door-to-door Luxury Service', 'Luggage Assistance', 'Flexible Timing'],
  },
  {
    id: '7',
    name: 'Northern Lights Hunt',
    slug: 'northern-lights',
    category: 'HALF_DAY' as const,
    duration: '4-5 Hours',
    shortDescription: 'Aurora Borealis Chase',
    price: 65000,
    currency: 'ISK',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT4xAiwOYzy5D3pJWuGoHH7APGUplommRj1qLquuXgM3dH_DSqzY9ZE74j7kz-I4a5EYSWm-ymsUkdHZiHmKqgBzLwq-z0bJF4A9vnYvWGdL9dG2lNSNtzYl9dzj37nfDpuwa_LBg86bznhs9wE4QqoPZFU1XBFm8dc4WliNXy2jRQQz41Z_gR2qFB9kyoGp8BjwmPMpFYXfl7iJ-bpYTMPMO0jjiWl8K0buWMIf_MdcvM2DoIKlYh_8ZF2hG-K_LT4L7gK5lw3cv6',
    badge: { text: 'Seasonal', type: 'popular' as const },
    highlights: ['Expert Aurora Forecasting', 'Prime Viewing Locations', 'Hot Chocolate & Snacks'],
    isNorthernLights: true,
  },
  {
    id: '8',
    name: 'Keflavik Airport Transfer',
    slug: 'airport-transfer',
    category: 'TRANSFER' as const,
    duration: '45 min',
    shortDescription: 'Premium Airport Service',
    price: 18900,
    currency: 'ISK',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVWeCbujmlEyrgmQ8GQQ4KrfCo9ELZ_L573wLwgKBck7PWSCwohWC6tPekru2ZS7aM6XrDpisc1IXVB4XWg6DQOWEtAak0-ybxa5aPf7A0VKzNCo0smbeNWrr1VFCCJYKL8RY0CrVdKYBER2B4EY0L8WpaahjiMg-SNTM4Q5sRgFPb7XQMkgW9YHw43sDx0I7p9rZfaTp3qMEB_a_X_RKtXOEqikacLPpoD9hYmNg_gpNRFg5vMXR49lbdM0yU7Nk_yoBF3Zg57OmZ',
    badge: { text: 'Transfer', type: 'transfer' as const },
    highlights: ['Flight Monitoring', 'Meet & Greet', '24/7 Service'],
    isAirport: true,
  },
];

const filters = [
  { id: 'all', label: 'All Tours' },
  { id: 'full-day', label: 'Full Day' },
  { id: 'half-day', label: 'Half Day' },
  { id: 'northern-lights', label: 'Northern Lights', icon: Sparkles },
  { id: 'airport', label: 'Airport Transfers' },
];

const sortOptions = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'duration', label: 'Duration' },
];

export function ToursContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const filteredTours = useMemo(() => {
    let result = [...tours];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (tour) =>
          tour.name.toLowerCase().includes(query) ||
          tour.shortDescription.toLowerCase().includes(query) ||
          tour.highlights.some((h) => h.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (activeFilter !== 'all') {
      switch (activeFilter) {
        case 'full-day':
          result = result.filter((tour) => tour.category === 'FULL_DAY');
          break;
        case 'half-day':
          result = result.filter((tour) => tour.category === 'HALF_DAY');
          break;
        case 'northern-lights':
          result = result.filter((tour) => (tour as any).isNorthernLights);
          break;
        case 'airport':
          result = result.filter((tour) => tour.category === 'TRANSFER' || (tour as any).isAirport);
          break;
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'duration':
        result.sort((a, b) => {
          const getDurationMinutes = (d: string) => {
            const hours = d.match(/(\d+)/)?.[1] || '0';
            return parseInt(hours) * 60;
          };
          return getDurationMinutes(a.duration) - getDurationMinutes(b.duration);
        });
        break;
      default:
        // recommended - keep original order
        break;
    }

    return result;
  }, [searchQuery, activeFilter, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-secondary py-12 md:py-20 px-4">
        <div
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAw5paTld6pu6V7ft9GBdNx9lyyXeGTryceFVopMGZHV4TxsknhXVUzypqiEgax-jDUWJc8q_Epo-ZI9rlTqLh9lD2vbB0PSdDWxJNMSBTReOdtI9eAO7c8gPp77eGWl7hPY5RP6DmuPoPVZw4izze1f1tLdh9D9ULggK7l6GM3GYbWVL5K3ozKf-hv0J3slLFBNkkdnt-q5Z1xG50xW05DsPCP03sym1DW0zNpYRzZYvsW10JBtjJ2xMqmUEQcyhuzczXYRzJz4_rw')`,
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-secondary/80 to-secondary/95" />
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center text-center gap-6">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            Explore Iceland <span className="text-primary">Privately</span>
          </h1>
          <p className="text-slate-200 text-base md:text-lg max-w-2xl font-light">
            Experience the land of fire and ice in the comfort of a luxury private
            vehicle. Customized tours tailored to your schedule with expert local
            driver-guides.
          </p>
          <form onSubmit={handleSearch} className="w-full max-w-2xl mt-4">
            <div className="flex w-full items-stretch rounded-lg h-14 bg-white overflow-hidden shadow-lg p-1">
              <div className="flex items-center justify-center pl-3 text-slate-400">
                <Search className="size-5" />
              </div>
              <input
                className="w-full min-w-0 flex-1 border-none bg-transparent px-3 text-slate-900 focus:ring-0 placeholder:text-slate-400 text-base"
                placeholder="Search for tours, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-slate-900 font-bold rounded px-6 transition-colors"
              >
                Find Tours
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-slate-200 bg-white dark:bg-[#1a180d] dark:border-slate-800">
        <div className="max-w-7xl mx-auto w-full py-4 px-4 lg:px-10">
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 lg:pb-0">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  'flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-colors border',
                  activeFilter === filter.id
                    ? 'bg-secondary text-white shadow-sm border-secondary'
                    : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border-transparent hover:border-slate-300'
                )}
              >
                <p
                  className={cn(
                    'text-sm',
                    activeFilter === filter.id
                      ? 'font-bold'
                      : 'font-medium text-slate-700 dark:text-slate-200'
                  )}
                >
                  {filter.label}
                </p>
                {filter.icon && (
                  <filter.icon
                    className={cn(
                      'size-4',
                      activeFilter === filter.id ? 'text-primary' : 'text-slate-500'
                    )}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Grid */}
      <section className="py-10 px-4 lg:px-10 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-secondary dark:text-white text-2xl font-bold mb-1">
              {searchQuery ? `Search Results` : activeFilter === 'all' ? 'Most Popular Tours' : filters.find(f => f.id === activeFilter)?.label}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {filteredTours.length} {filteredTours.length === 1 ? 'tour' : 'tours'} found
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-secondary dark:text-slate-300">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none py-0 pl-2 pr-8 focus:ring-0 cursor-pointer font-bold text-secondary dark:text-primary"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} {...tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <SlidersHorizontal className="size-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No tours found</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="px-6 py-2.5 bg-primary text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
