'use client';

import { useState, useMemo } from 'react';
import { Search, Sparkles, SlidersHorizontal } from 'lucide-react';
import { TourCard } from '@/components/TourCard';
import { cn } from '@/lib/utils';

import { tours } from '@/data/tours';

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
