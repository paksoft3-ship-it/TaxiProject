'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MapPin, Flag, Calendar, CarTaxiFront, 
  Mountain, ArrowRight, Plane, Droplets, 
  Clock, Users, Hash
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackBookingStarted } from '@/lib/analytics';
import { PlaceAutocomplete } from '@/components/PlaceAutocomplete';

type BookingType = 'AIRPORT_TRANSFER' | 'TAXI' | 'PRIVATE_TOUR' | 'BLUE_LAGOON' | 'HOURLY_HIRE';

const TABS = [
  { id: 'AIRPORT_TRANSFER', label: 'Airport', icon: Plane },
  { id: 'TAXI', label: 'City Taxi', icon: CarTaxiFront },
  { id: 'PRIVATE_TOUR', label: 'Day Tours', icon: Mountain },
  { id: 'BLUE_LAGOON', label: 'Blue Lagoon', icon: Droplets },
  { id: 'HOURLY_HIRE', label: 'Hourly Hire', icon: Clock },
] as const;

export function BookingWidget() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<BookingType>('AIRPORT_TRANSFER');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');
  const [minDate, setMinDate] = useState('');
  
  // Extra fields
  const [flightNumber, setFlightNumber] = useState('');
  const [passengers, setPassengers] = useState('2');
  const [hours, setHours] = useState('4');
  const [tourName, setTourName] = useState('');
  const [blDirection, setBlDirection] = useState('KEF_BL_RV');

  useEffect(() => {
    const today = new Date();
    const offset = today.getTimezoneOffset() * 60000;
    const localISOTime = new Date(today.getTime() - offset).toISOString().split('T')[0];
    setMinDate(localISOTime);
    if (!date) setDate(localISOTime);
  }, []);

  useEffect(() => {
    // Reset per-tab fields on tab switch to avoid stale values carrying over
    setFlightNumber('');
    setDropoff('');
    setTourName('');
    setBlDirection('KEF_BL_RV');
    setHours('4');
    setPickup(activeTab === 'AIRPORT_TRANSFER' ? 'Keflavík International Airport (KEF)' : '');
  }, [activeTab]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    trackBookingStarted(activeTab as any);

    const params = new URLSearchParams({
      type: activeTab,
      date,
      passengers,
    });

    if (activeTab === 'AIRPORT_TRANSFER') {
      params.append('pickup', pickup);
      params.append('dropoff', dropoff);
      params.append('flightNumber', flightNumber);
    } else if (activeTab === 'TAXI') {
      params.append('pickup', pickup);
      params.append('dropoff', dropoff);
    } else if (activeTab === 'PRIVATE_TOUR') {
      params.append('tourName', tourName);
    } else if (activeTab === 'BLUE_LAGOON') {
      params.append('direction', blDirection);
    } else if (activeTab === 'HOURLY_HIRE') {
      params.append('pickup', pickup);
      params.append('hours', hours);
    }

    router.push(`/booking?${params.toString()}`);
  };

  return (
    <div className="relative z-20 w-full px-3 sm:px-4 -mt-16 sm:-mt-24 lg:-mt-32 mb-8 sm:mb-12">
      <div className="max-w-6xl mx-auto bg-white dark:bg-[#1a180e] rounded-xl sm:rounded-2xl shadow-2xl border border-slate-100 dark:border-white/5">

        {/* Widget Tabs (Scrollable on mobile) */}
        <div className="flex overflow-x-auto custom-scrollbar rounded-t-xl sm:rounded-t-2xl border-b border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as BookingType)}
              className={cn(
                'flex items-center justify-center gap-1.5 sm:gap-2 flex-1 min-w-[100px] sm:min-w-[120px] py-3 sm:py-4 border-b-[3px] font-bold text-xs sm:text-sm lg:text-base transition-colors whitespace-nowrap px-2 sm:px-4',
                activeTab === tab.id
                  ? 'border-primary text-slate-900 dark:text-white bg-white dark:bg-transparent'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white'
              )}
              type="button"
            >
              <tab.icon className={cn('size-4 sm:size-5 shrink-0', activeTab === tab.id && 'text-primary')} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Widget Form */}
        <form onSubmit={handleSearch} className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row flex-wrap gap-3 sm:gap-4 lg:items-end">
            
            {/* --- DYNAMIC FIELDS BASED ON TAB --- */}
            
            {/* AIRPORT TRANSFER / TAXI */}
            {(activeTab === 'AIRPORT_TRANSFER' || activeTab === 'TAXI' || activeTab === 'HOURLY_HIRE') && (
              <div className="flex flex-col gap-1.5 w-full lg:flex-1 lg:min-w-[220px]">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Pickup Location</label>
                <PlaceAutocomplete
                  value={pickup}
                  onChange={setPickup}
                  placeholder={activeTab === 'AIRPORT_TRANSFER' ? "KEF Airport..." : "Hotel, Address..."}
                  icon={<MapPin className="text-slate-400 size-5" />}
                  required
                  className="bg-slate-50 border border-slate-200"
                />
              </div>
            )}

            {(activeTab === 'AIRPORT_TRANSFER' || activeTab === 'TAXI') && (
               <div className="flex flex-col gap-1.5 w-full lg:flex-1 lg:min-w-[220px]">
                 <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Dropoff Location</label>
                 <PlaceAutocomplete
                   value={dropoff}
                   onChange={setDropoff}
                   placeholder="Enter destination"
                   icon={<Flag className="text-slate-400 size-5" />}
                   required
                   className="bg-slate-50 border border-slate-200"
                 />
               </div>
            )}

            {activeTab === 'AIRPORT_TRANSFER' && (
               <div className="flex flex-col gap-1.5 w-full sm:w-[calc(50%-0.5rem)] lg:w-auto lg:flex-[0.7] lg:min-w-[140px]">
                 <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Flight No.</label>
                 <div className="relative">
                   <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                   <input
                     type="text"
                     value={flightNumber}
                     onChange={(e) => setFlightNumber(e.target.value)}
                     placeholder="e.g. FI500 (opt)"
                     className="w-full pl-10 pr-3 h-12 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                   />
                 </div>
               </div>
            )}

            {/* PRIVATE TOUR */}
            {activeTab === 'PRIVATE_TOUR' && (
              <div className="flex flex-col gap-1.5 w-full lg:flex-[2] lg:min-w-[280px]">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Select Tour</label>
                <div className="relative">
                  <Mountain className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                  <select
                    value={tourName}
                    onChange={(e) => setTourName(e.target.value)}
                    className="w-full pl-10 pr-4 h-12 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-900 font-medium focus:ring-2 focus:ring-primary focus:outline-none appearance-none transition-all"
                    required
                  >
                    <option value="" disabled>Choose a destination...</option>
                    <option value="Golden Circle">Golden Circle Classic</option>
                    <option value="South Coast">South Coast & Waterfalls</option>
                    <option value="Snaefellsnes">Snæfellsnes Peninsula</option>
                    <option value="Northern Lights">Northern Lights Chase</option>
                  </select>
                </div>
              </div>
            )}

            {/* BLUE LAGOON */}
            {activeTab === 'BLUE_LAGOON' && (
              <div className="flex flex-col gap-1.5 w-full lg:flex-[2] lg:min-w-[280px]">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Route Direction</label>
                <div className="relative">
                  <Droplets className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                  <select
                    value={blDirection}
                    onChange={(e) => setBlDirection(e.target.value)}
                    className="w-full pl-10 pr-4 h-12 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-900 font-medium focus:ring-2 focus:ring-primary focus:outline-none appearance-none transition-all"
                    required
                  >
                    <option value="KEF_BL_RV">KEF Airport ➔ Blue Lagoon ➔ Reykjavík</option>
                    <option value="RV_BL_RV">Reykjavík ➔ Blue Lagoon ➔ Reykjavík</option>
                    <option value="RV_BL_KEF">Reykjavík ➔ Blue Lagoon ➔ KEF Airport</option>
                    <option value="ONE_WAY">One-Way Transfer</option>
                  </select>
                </div>
              </div>
            )}

            {/* HOURLY HIRE */}
            {activeTab === 'HOURLY_HIRE' && (
              <div className="flex flex-col gap-1.5 w-full sm:w-[calc(50%-0.5rem)] lg:w-auto lg:flex-[0.7] lg:min-w-[140px]">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Duration</label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                  <select
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full pl-10 pr-4 h-12 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-900 font-medium focus:ring-2 focus:ring-primary focus:outline-none appearance-none transition-all"
                    required
                  >
                    <option value="3">3 Hours</option>
                    <option value="4">4 Hours</option>
                    <option value="6">6 Hours</option>
                    <option value="8">8 Hours</option>
                    <option value="10">10 Hours</option>
                    <option value="12">12 Hours (Full Day)</option>
                  </select>
                </div>
              </div>
            )}

            {/* SHARED FIELDS: DATE & PASSENGERS */}
            <div className={`flex gap-3 w-full ${activeTab === 'AIRPORT_TRANSFER' || activeTab === 'HOURLY_HIRE' ? 'sm:w-[calc(50%-0.5rem)] lg:w-auto lg:flex-[1.2] lg:min-w-[220px]' : 'lg:flex-[1.2] lg:min-w-[220px]'}`}>
              <div className="flex flex-col gap-1.5 flex-[3]">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 pointer-events-none" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={minDate}
                    className="w-full pl-9 pr-2 h-12 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {activeTab !== 'TAXI' && (
                <div className="flex flex-col gap-1.5 flex-[2]">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1 truncate">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
                    <select
                      value={passengers}
                      onChange={(e) => setPassengers(e.target.value)}
                      className="w-full pl-9 pr-2 h-12 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-primary focus:outline-none appearance-none transition-all"
                    >
                      {[1,2,3,4,5,6,7,8].map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="w-full lg:flex-1 lg:min-w-[130px] lg:max-w-[160px] mt-2 lg:mt-0">
              <button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-yellow-400 text-slate-900 font-bold rounded-lg shadow-lg shadow-yellow-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
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
