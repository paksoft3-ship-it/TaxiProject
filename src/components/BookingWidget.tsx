'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Flag, Calendar, CarTaxiFront, Mountain, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackBookingStarted } from '@/lib/analytics';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';

const libraries: ("places")[] = ["places"];

type BookingType = 'taxi' | 'tour';

export function BookingWidget() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<BookingType>('taxi');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');
  const [minDate, setMinDate] = useState('');

  // Google Maps State
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const [pickupAutocomplete, setPickupAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [dropoffAutocomplete, setDropoffAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    // Generate accurate local date strictly on the client to avoid SSR/Caching bugs
    const today = new Date();
    const offset = today.getTimezoneOffset() * 60000;
    const localISOTime = new Date(today.getTime() - offset).toISOString().split('T')[0];
    setMinDate(localISOTime);
    
    // Auto-fill today's date if empty
    if (!date) {
      setDate(localISOTime);
    }
  }, []);

  const onPickupPlaceChanged = () => {
    if (pickupAutocomplete !== null) {
      const place = pickupAutocomplete.getPlace();
      if (place.formatted_address) {
        setPickup(place.formatted_address);
      }
    }
  };

  const onDropoffPlaceChanged = () => {
    if (dropoffAutocomplete !== null) {
      const place = dropoffAutocomplete.getPlace();
      if (place.formatted_address) {
        setDropoff(place.formatted_address);
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    trackBookingStarted(activeTab);

    const params = new URLSearchParams({
      type: activeTab === 'taxi' ? 'TAXI' : 'PRIVATE_TOUR',
      pickup,
      dropoff,
      date,
    });

    router.push(`/booking?${params.toString()}`);
  };

  return (
    <div className="relative z-20 w-full px-4 -mt-32 mb-12">
      <div className="max-w-5xl mx-auto bg-white dark:bg-[#1a180e] rounded-2xl shadow-2xl overflow-hidden border border-slate-100 dark:border-white/5">
        {/* Widget Tabs */}
        <div className="flex border-b border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5">
          <button
            onClick={() => setActiveTab('taxi')}
            className={cn(
              'flex items-center justify-center gap-2 flex-1 py-4 border-b-[3px] font-bold text-sm sm:text-base transition-colors',
              activeTab === 'taxi'
                ? 'border-primary text-slate-900 dark:text-white bg-white dark:bg-transparent'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'
            )}
            type="button"
          >
            <CarTaxiFront className={cn('size-5', activeTab === 'taxi' && 'text-primary')} />
            Book Taxi
          </button>
          <button
            onClick={() => setActiveTab('tour')}
            className={cn(
              'flex items-center justify-center gap-2 flex-1 py-4 border-b-[3px] font-bold text-sm sm:text-base transition-colors',
              activeTab === 'tour'
                ? 'border-primary text-slate-900 dark:text-white bg-white dark:bg-transparent'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'
            )}
            type="button"
          >
            <Mountain className={cn('size-5', activeTab === 'tour' && 'text-primary')} />
            Private Tour
          </button>
        </div>

        {/* Widget Form */}
        <form onSubmit={handleSearch} className="p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* Pickup */}
            <div className="md:col-span-4 flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Pickup Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5 z-10 pointer-events-none" />
                {isLoaded ? (
                  <Autocomplete
                    onLoad={(autocomplete) => setPickupAutocomplete(autocomplete)}
                    onPlaceChanged={onPickupPlaceChanged}
                  >
                    <input
                      type="text"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      placeholder="KEF Airport, Hotel, etc."
                      className="w-full pl-12 h-12 rounded-lg border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm font-medium"
                      required
                    />
                  </Autocomplete>
                ) : (
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="KEF Airport, Hotel, etc."
                    className="w-full pl-12 h-12 rounded-lg border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm font-medium"
                    required
                  />
                )}
              </div>
            </div>

            {/* Dropoff */}
            <div className="md:col-span-4 flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {activeTab === 'tour' ? 'Tour Destination' : 'Dropoff Location'}
              </label>
              <div className="relative">
                <Flag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5 z-10 pointer-events-none" />
                {isLoaded ? (
                  <Autocomplete
                    onLoad={(autocomplete) => setDropoffAutocomplete(autocomplete)}
                    onPlaceChanged={onDropoffPlaceChanged}
                  >
                    <input
                      type="text"
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      placeholder={activeTab === 'tour' ? 'Golden Circle, South Coast...' : 'Enter destination'}
                      className="w-full pl-12 h-12 rounded-lg border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm font-medium"
                      required
                    />
                  </Autocomplete>
                ) : (
                  <input
                    type="text"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    placeholder={activeTab === 'tour' ? 'Golden Circle, South Coast...' : 'Enter destination'}
                    className="w-full pl-12 h-12 rounded-lg border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm font-medium"
                    required
                  />
                )}
              </div>
            </div>

            {/* Date */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5 pointer-events-none" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={minDate}
                  className="w-full px-4 pl-12 h-12 rounded-lg border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm font-medium"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-yellow-400 text-slate-900 font-bold rounded-lg shadow-lg shadow-yellow-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Search</span>
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
