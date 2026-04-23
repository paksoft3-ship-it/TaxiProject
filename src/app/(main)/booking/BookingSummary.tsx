'use client';

import { useMemo } from 'react';
import { Car, Calendar, MapPin, Phone, Ruler, Clock, Users, Info, Sparkles } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface BookingSummaryProps {
  serviceType: string;
  formData: {
    pickupLocation: string;
    dropoffLocation: string;
    date: string;
    time: string;
    passengers: number;
    name: string;
    email: string;
    phone: string;
  };
  options?: {
    premiumCar: boolean;
    childSeats: number;
    extraStop: boolean;
    extraTime: boolean;
    hourlyDuration?: string;
  };
  step: number;
  packageType?: string;
  realDistanceKm?: number;
  realDurationStr?: string;
  tourPrice?: number;
}

const serviceLabels: Record<string, string> = {
  TAXI: 'City Taxi',
  AIRPORT_TRANSFER: 'Airport Transfer',
  PRIVATE_TOUR: 'Private Tour',
  HOURLY_HIRE: 'Hourly Hire',
  BLUE_LAGOON: 'Blue Lagoon Transfer',
};

// Base prices per service type (TAXI is metered — no fixed price shown)
const basePrices: Record<string, number> = {
  AIRPORT_TRANSFER: 20000,
  PRIVATE_TOUR: 45000,
  BLUE_LAGOON: 20000,
  // HOURLY_HIRE is dynamic: hours × 12,000
};

// Price per km (only used for distance display on AIRPORT_TRANSFER map badge)
const pricePerKm: Record<string, number> = {
  AIRPORT_TRANSFER: 150,
};

// Popular route distances (in km) - estimates
const routeDistances: Record<string, number> = {
  // From Keflavik Airport
  'keflavik-reykjavik': 45,
  'kef-reykjavik': 45,
  'airport-reykjavik': 45,
  'keflavik-blue lagoon': 22,
  'airport-blue lagoon': 22,
  'blue lagoon-reykjavik': 45,
  // Reykjavik routes
  'reykjavik-blue lagoon': 45,
  'reykjavik-sky lagoon': 8,
  'reykjavik-perlan': 3,
  // Default city routes
  'default_city': 8,
  'default_airport': 45,
};

// Time-based surcharges
const timeSurcharges: Record<string, { multiplier: number; label: string }> = {
  night: { multiplier: 1.25, label: 'Night Rate (22:00-06:00)' },
  early: { multiplier: 1.15, label: 'Early Morning (06:00-08:00)' },
  peak: { multiplier: 1.1, label: 'Peak Hours (08:00-09:00, 17:00-19:00)' },
};

// Additional passenger fees
const passengerFees = {
  extraPassenger: 2000, // Per passenger above 4
  largeGroup: 5000, // Group of 6+
};

export function BookingSummary({ serviceType, formData, step, options = { premiumCar: false, childSeats: 0, extraStop: false, extraTime: false }, packageType, realDistanceKm = 0, realDurationStr = '', tourPrice }: BookingSummaryProps) {
  // Calculate estimated distance based on locations
  const estimatedDistance = useMemo(() => {
    if (realDistanceKm > 0) return realDistanceKm;

    const pickup = formData.pickupLocation.toLowerCase();
    const dropoff = formData.dropoffLocation.toLowerCase();

    // Check for known routes
    for (const [route, distance] of Object.entries(routeDistances)) {
      const routeWords = route.split('-');
      if (
        (pickup.includes(routeWords[0]) && dropoff.includes(routeWords[1])) ||
        (pickup.includes(routeWords[1]) && dropoff.includes(routeWords[0]))
      ) {
        return distance;
      }
    }

    // Default distances based on service type
    if (serviceType === 'AIRPORT_TRANSFER') {
      return routeDistances.default_airport;
    }
    return routeDistances.default_city;
  }, [formData.pickupLocation, formData.dropoffLocation, serviceType, realDistanceKm]);

  // Calculate time-based surcharge
  const timeSurcharge = useMemo(() => {
    if (!formData.time) return null;
    const hour = parseInt(formData.time.split(':')[0]);

    if (hour >= 22 || hour < 6) {
      return timeSurcharges.night;
    }
    if (hour >= 6 && hour < 8) {
      return timeSurcharges.early;
    }
    if ((hour >= 8 && hour < 9) || (hour >= 17 && hour < 19)) {
      return timeSurcharges.peak;
    }
    return null;
  }, [formData.time]);

  // Calculate all price components
  const priceBreakdown = useMemo(() => {
    const breakdown: { label: string; amount: number; type: 'add' | 'multiply' }[] = [];

    // Blue Lagoon Packages
    if (serviceType === 'BLUE_LAGOON') {
      let amount = 20000;
      let label = 'One-Way Transfer';

      if (packageType === 'roundtrip') {
        amount = 39000;
        label = 'Round Trip Transfer';
      } else if (packageType === 'combo') {
        if (formData.passengers > 4) {
          amount = 14000;
          label = 'Airport Combo Transfer (5-8 Pax)';
        } else {
          amount = 40000;
          label = 'Airport Combo Transfer';
        }
      }

      breakdown.push({ label, amount, type: 'add' });
      return breakdown;
    }

    // Special fixed price for Airport Transfer > 4 pax
    if (serviceType === 'AIRPORT_TRANSFER' && formData.passengers > 4) {
      breakdown.push({ label: 'Fixed fare (5-8 passengers)', amount: 25000, type: 'add' });
      return breakdown;
    }

    // Base price computation
    let base = (serviceType === 'PRIVATE_TOUR' && tourPrice) ? tourPrice : (basePrices[serviceType] || 0);
    
    if (serviceType === 'HOURLY_HIRE') {
       const hours = parseInt(options?.hourlyDuration || '4', 10);
       base = hours * 12000;
       breakdown.push({ label: `Hourly Hire (${hours} hrs @ 12k/hr)`, amount: base, type: 'add' });
    } else {
       breakdown.push({ label: 'Base fare', amount: base, type: 'add' });
    }

    // Distance-based pricing for taxi/transfer
    if (serviceType === 'TAXI' && formData.pickupLocation && formData.dropoffLocation) {
      const distanceFee = estimatedDistance * (pricePerKm[serviceType] || 0);
      if (distanceFee > 0) {
        breakdown.push({ label: `Distance (${estimatedDistance} km)`, amount: distanceFee, type: 'add' });
      }
    }

    // Extra passenger fees
    if (formData.passengers > 4) {
      if (serviceType === 'AIRPORT_TRANSFER') {
        // Special fixed price logic handled above
      } else if (serviceType === 'BLUE_LAGOON') {
        // Fixed price for Blue Lagoon packages regardless of pax count (packages handle specific tiers)
      } else {
        const extraPassengers = formData.passengers - 4;
        const fee = extraPassengers * passengerFees.extraPassenger;
        breakdown.push({ label: `Extra passengers (${extraPassengers})`, amount: fee, type: 'add' });
      }
    }

    // Options & Extras
    if (options.premiumCar) {
      breakdown.push({ label: 'Premium Luxury Vehicle', amount: 5000, type: 'add' });
    }

    if (options.childSeats > 0) {
      breakdown.push({ label: `Child / Booster Seat (${options.childSeats})`, amount: options.childSeats * 2000, type: 'add' });
    }

    if (options.extraStop) {
      breakdown.push({ label: 'Extra Stop', amount: 7000, type: 'add' });
    }

    if (options.extraTime) {
      breakdown.push({ label: 'Extra Time', amount: 14000, type: 'add' });
    }

    return breakdown;
  }, [serviceType, formData.passengers, formData.pickupLocation, formData.dropoffLocation, estimatedDistance, options, packageType, tourPrice]);

  // Calculate subtotal
  const subtotal = priceBreakdown.reduce((sum, item) => sum + item.amount, 0);

  // Calculate time surcharge amount
  const timeSurchargeAmount = timeSurcharge ? Math.round(subtotal * (timeSurcharge.multiplier - 1)) : 0;

  // Total price
  const totalPrice = subtotal + timeSurchargeAmount;

  // Estimated duration
  const estimatedDuration = useMemo(() => {
    if (realDurationStr) return realDurationStr;
    
    if (serviceType === 'TAXI') {
      return `${Math.ceil(estimatedDistance / 40 * 60)} min`; // ~40 km/h avg
    }
    if (serviceType === 'AIRPORT_TRANSFER' || serviceType === 'BLUE_LAGOON') {
      return '45-55 min';
    }
    if (serviceType === 'PRIVATE_TOUR') {
      return '4-6 hours';
    }
    return '6-8 hours';
  }, [serviceType, estimatedDistance, realDurationStr]);

  return (
    <div className="sticky top-24">
      <div className="bg-secondary text-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-700 bg-slate-900/50">
          <h3 className="text-xl font-bold">Booking Summary</h3>
          <p className="text-slate-400 text-sm mt-1">Real-time price estimate</p>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Selected Service */}
          <div className="flex items-start gap-4">
            <div className="bg-primary/20 p-2 rounded-lg text-primary">
              <Car className="size-5" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                Service
              </p>
              <p className="font-bold text-lg">{serviceLabels[serviceType]}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-slate-300 text-sm flex items-center gap-1">
                  <Users className="size-3.5" />
                  {formData.passengers} {formData.passengers === 1 ? 'Passenger' : 'Passengers'}
                </span>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          {step >= 2 && formData.date && (
            <div className="flex items-start gap-4">
              <div className="bg-slate-700 p-2 rounded-lg text-slate-300">
                <Calendar className="size-5" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                  Date & Time
                </p>
                <p className="font-bold">{formatDate(formData.date)}</p>
                <div className="flex items-center gap-2">
                  <p className="text-slate-300 text-sm">{formData.time}</p>
                  {timeSurcharge && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs font-medium">
                      <Sparkles className="size-3" />
                      {timeSurcharge.multiplier}x
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Route */}
          {step >= 3 && (formData.pickupLocation || formData.dropoffLocation) && (
            <div className="flex items-start gap-4">
              <div className="bg-slate-700 p-2 rounded-lg text-slate-300">
                <MapPin className="size-5" />
              </div>
              <div className="w-full">
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
                  Route
                </p>
                <div className="flex flex-col gap-3 relative">
                  <div className="absolute left-[3px] top-2 bottom-2 w-0.5 bg-slate-600" />
                  {formData.pickupLocation && (
                    <div className="flex gap-3 items-start relative z-10">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-primary ring-4 ring-secondary" />
                      <p className="text-sm font-medium leading-tight">
                        {formData.pickupLocation}
                      </p>
                    </div>
                  )}
                  {formData.dropoffLocation && (
                    <div className="flex gap-3 items-start relative z-10">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-white ring-4 ring-secondary" />
                      <p className="text-sm font-medium leading-tight">
                        {formData.dropoffLocation}
                      </p>
                    </div>
                  )}
                </div>
                {formData.pickupLocation && formData.dropoffLocation && (
                  <div className="flex gap-2 mt-3">
                    {/* Hide distance/duration for fixed services */}
                    {serviceType !== 'BLUE_LAGOON' && serviceType !== 'PRIVATE_TOUR' && (
                      <>
                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-slate-300">
                          <Ruler className="size-3.5" />
                          ~{estimatedDistance} km
                        </div>
                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-slate-300">
                          <Clock className="size-3.5" />
                          {estimatedDuration}
                        </div>
                      </>
                    )}
                    {(serviceType === 'BLUE_LAGOON' || serviceType === 'PRIVATE_TOUR') && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-slate-300">
                        <Clock className="size-3.5" />
                        {estimatedDuration}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact */}
          {step >= 4 && formData.name && (
            <div className="flex items-start gap-4">
              <div className="bg-slate-700 p-2 rounded-lg text-slate-300">
                <Phone className="size-5" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                  Contact
                </p>
                <p className="font-bold">{formData.name}</p>
                <p className="text-slate-300 text-sm">{formData.phone || formData.email}</p>
              </div>
            </div>
          )}
        </div>

        {/* Price Breakdown Section */}
        {serviceType !== 'TAXI' ? (
          <div className="bg-slate-800/80 p-6 border-t border-slate-700 backdrop-blur-sm">
            {/* Price breakdown */}
            <div className="space-y-2 mb-4">
              {priceBreakdown.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="text-slate-200 font-medium">{formatCurrency(item.amount)}</span>
                </div>
              ))}
              {timeSurcharge && timeSurchargeAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-amber-400 flex items-center gap-1">
                    <Sparkles className="size-3" />
                    {timeSurcharge.label}
                  </span>
                  <span className="text-amber-400 font-medium">+{formatCurrency(timeSurchargeAmount)}</span>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-slate-600 my-4" />

            {/* Total */}
            <div className="flex justify-between items-end mb-1">
              <p className="text-slate-400 text-sm font-medium">Estimated Total</p>
              <p className="text-primary text-3xl font-extrabold tracking-tight transition-all duration-300">
                {formatCurrency(totalPrice)}
              </p>
            </div>
            <p className="text-right text-xs text-slate-500 mb-4">Final price may vary based on actual route</p>

            {/* Info note */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-slate-700/50 border border-slate-600">
              <Info className="size-4 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed">
                Price updates automatically based on your selections. Payment is processed securely via PayPal.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/80 p-6 border-t border-slate-700 backdrop-blur-sm flex flex-col items-center justify-center text-center">
             <Car className="size-8 text-slate-400 mb-3" />
             <p className="text-slate-200 font-bold text-lg">Metered Taxi Fare</p>
             <p className="text-sm text-slate-400 mt-2">
               City Taxi fares are metered. You will pay the driver directly at the end of your ride.
             </p>
          </div>
        )}
      </div>

      {/* Help Box */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex gap-3 items-start">
        <Phone className="size-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-blue-900 dark:text-blue-300 font-bold text-sm">Need Help?</p>
          <p className="text-blue-700 dark:text-blue-400 text-sm mt-1 leading-snug">
            Call our 24/7 support line if you have special requirements.
          </p>
          <a
            href="tel:+3548575955"
            className="text-blue-600 dark:text-blue-400 font-bold text-sm mt-2 block hover:underline"
          >
            +354 857 5955
          </a>
        </div>
      </div>
    </div>
  );
}
