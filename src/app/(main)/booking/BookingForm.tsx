'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  ArrowLeft,
  ArrowRight,
  Car,
  Calendar,
  MapPin,
  User,
  Check,
  Plane,
  Flag,
  Clock,
  Phone,
  CreditCard,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { POPULAR_LOCATIONS } from '@/lib/locations';
import { BookingSummary } from './BookingSummary';
import { useJsApiLoader, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { PlaceAutocomplete } from '@/components/PlaceAutocomplete';

const libraries: any[] = [];

type BookingStep = 1 | 2 | 3 | 4 | 5;
type ServiceType = 'TAXI' | 'AIRPORT_TRANSFER' | 'PRIVATE_TOUR' | 'HOURLY_HIRE' | 'BLUE_LAGOON';

interface ValidationErrors {
  date?: string;
  time?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  name?: string;
  email?: string;
  phone?: string;
}

const serviceTypes = [
  { id: 'AIRPORT_TRANSFER', label: 'Airport Transfer', icon: Plane, description: 'To/from Keflavik Airport' },
  { id: 'TAXI', label: 'City Taxi', icon: Car, description: 'Point-to-point rides' },
  { id: 'PRIVATE_TOUR', label: 'Day Tours', icon: MapPin, description: 'Classic sightseeing' },
  { id: 'BLUE_LAGOON', label: 'Blue Lagoon', icon: Flag, description: 'Spa transfers' },
  { id: 'HOURLY_HIRE', label: 'Hourly Hire', icon: Clock, description: 'Flexible private driver' },
];

export function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialType = (searchParams.get('type') as ServiceType) || 'TAXI';
  const initialPackage = searchParams.get('package');
  const initialPickup = searchParams.get('pickup') || '';
  const initialDropoff = searchParams.get('dropoff') || '';
  const initialDate = searchParams.get('date') || '';
  const initialPassengers = Number(searchParams.get('passengers')) || 2;
  const initialFlightNumber = searchParams.get('flightNumber') || '';
  const initialTourName = searchParams.get('tourName') || '';
  const initialTourId = searchParams.get('tourId') || '';
  const initialTourPrice = Number(searchParams.get('tourPrice')) || 0;
  const initialDirection = searchParams.get('direction') || '';
  const initialHours = searchParams.get('hours') || '4';

  // Determine initial step and form data based on package
  let startStep: BookingStep = 1;
  let defaultPickup = initialPickup;
  let defaultDropoff = initialDropoff;

  if (initialType === 'BLUE_LAGOON' && initialPackage) {
    startStep = 2; // Skip service selection
    if (initialPackage === 'combo') {
      defaultPickup = 'Keflavik Airport';
      defaultDropoff = 'Reykjavik City (via Blue Lagoon)';
    } else if (initialPackage === 'oneway') {
      // User needs to specify direction, so maybe don't prefill completely or use generic
    }
  }

  const [step, setStep] = useState<BookingStep>(startStep);
  const [serviceType, setServiceType] = useState<ServiceType>(initialType);
  const [formData, setFormData] = useState({
    pickupLocation: defaultPickup,
    dropoffLocation: defaultDropoff,
    date: initialDate,
    time: '10:00',
    passengers: initialPassengers,
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [options, setOptions] = useState({
    premiumCar: false,
    childSeats: 0,
    extraStop: false,
    extraTime: false,
  });
  const [flightDetails, setFlightDetails] = useState({
    flightNumber: initialFlightNumber,
    flightTime: '',
    luggageCount: 0,
  });
  const [customFields, setCustomFields] = useState({
    tourName: initialTourName,
    blDirection: initialDirection,
    hourlyDuration: initialHours,
    tourStartTime: '',
  });
  const [additionalInfo, setAdditionalInfo] = useState('');

  const [minDate, setMinDate] = useState<string>('');

  useEffect(() => {
    // Generate accurate local date strictly on the client to avoid SSR/Caching bugs
    const today = new Date();
    const offset = today.getTimezoneOffset() * 60000;
    const localISOTime = new Date(today.getTime() - offset).toISOString().split('T')[0];
    setMinDate(localISOTime);

    // If initial date is empty, or was set in the past (from cache or URL params), force it to today
    if (!formData.date || formData.date < localISOTime) {
      setFormData(prev => ({ ...prev, date: localISOTime }));
    }
  }, []);

  // Google Maps State
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [distanceKm, setDistanceKm] = useState<number>(0);
  const [durationStr, setDurationStr] = useState<string>('');



  const calculateRoute = async () => {
    if (!formData.pickupLocation || !formData.dropoffLocation) return;
    try {
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: formData.pickupLocation,
        destination: formData.dropoffLocation,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(results);
      if (results.routes[0]?.legs[0]) {
        const distVal = results.routes[0].legs[0].distance?.value || 0;
        setDistanceKm(Math.round(distVal / 1000));
        setDurationStr(results.routes[0].legs[0].duration?.text || '');
      }
    } catch (e) {
      console.error('Error calculating route:', e);
    }
  };

  // Automatically trace the route right when the map script finishes loading
  // if the user arrived from the homepage widget with predefined locations!
  useEffect(() => {
    if (isLoaded && formData.pickupLocation && formData.dropoffLocation) {
      calculateRoute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Validation functions
  const validateStep2 = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    } else {
      if (minDate && formData.date < minDate) {
        newErrors.date = 'Date cannot be in the past';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = 'Please enter a pickup location';
    }

    if ((serviceType === 'TAXI' || serviceType === 'AIRPORT_TRANSFER') && !formData.dropoffLocation.trim()) {
      newErrors.dropoffLocation = 'Please enter a drop-off location';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = (): boolean => {
    // Optional step validation if needed (e.g., flight number required for airport pickup)
    // For now, let's keep it optional or add logic later if user requests strict validation
    return true;
  };

  const validateStep5 = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = 'Phone number must be at least 7 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    let isValid = true;

    if (step === 2) {
      isValid = validateStep2();
    } else if (step === 3) {
      isValid = validateStep3();
    } else if (step === 4) {
      isValid = validateStep4();
    }

    if (isValid) {
      setStep((prev) => Math.min(prev + 1, 5) as BookingStep);
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1) as BookingStep);

  const handleSubmitBooking = async () => {
    if (!validateStep5()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: serviceType,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          passengers: formData.passengers,
          pickupLocation: formData.pickupLocation,
          dropoffLocation: formData.dropoffLocation || undefined,
          pickupDate: formData.date,
          pickupTime: formData.time,
          specialRequests: additionalInfo,
          flightNumber: serviceType === 'AIRPORT_TRANSFER' ? flightDetails.flightNumber : undefined,
          flightTime: serviceType === 'AIRPORT_TRANSFER' ? flightDetails.flightTime : undefined,
          luggageCount: (serviceType === 'AIRPORT_TRANSFER' || serviceType === 'BLUE_LAGOON') ? flightDetails.luggageCount : undefined,
          options: {
            ...options,
            tourName: customFields.tourName || undefined,
            blDirection: customFields.blDirection || undefined,
            hourlyDuration: customFields.hourlyDuration || undefined,
            tourStartTime: customFields.tourStartTime || undefined,
            packageType: initialPackage || undefined,
          },
          tourId: initialTourId || undefined,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        const firstIssue = errData?.details?.[0]?.message || errData?.error || 'Failed to create booking';
        throw new Error(firstIssue);
      }

      const data = await response.json();

      // Redirect to confirmation page if it is a metered taxi ride
      if (serviceType === 'TAXI') {
        router.push(`/booking/confirmation?booking=${data.booking.id}`);
        return;
      }

      const params = new URLSearchParams({
        booking: data.booking.id,
        amount: data.booking.totalPrice.toString(),
        type: serviceType,
      });

      router.push(`/booking/payment?${params.toString()}`);
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (step / 5) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
      {/* Left Column: Booking Steps */}
      <div className="lg:col-span-8 flex flex-col gap-6 sm:gap-8">
        {/* Page Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="text-secondary text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Book Your Journey
          </h1>
          <p className="text-slate-500 text-base sm:text-lg">
            Secure your ride in Iceland in just a few steps.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 justify-between items-center">
            <p className="text-secondary text-sm font-bold uppercase tracking-wider">
              Step {step} of 5
            </p>
            <span className="text-slate-400 text-sm">{progress}% Completed</span>
          </div>
          <div className="rounded-full bg-slate-100 h-2.5 w-full overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <section className="bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 p-4 sm:p-6 md:p-8">
            <h3 className="text-secondary text-xl font-bold mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-secondary text-sm font-bold">
                1
              </span>
              Select Service Type
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {serviceTypes.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setServiceType(service.id as ServiceType)}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all text-left',
                    serviceType === service.id
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-200 hover:border-slate-300'
                  )}
                >
                  <service.icon
                    className={cn(
                      'size-8 mb-3',
                      serviceType === service.id ? 'text-primary' : 'text-slate-400'
                    )}
                  />
                  <p className="font-bold text-slate-900">{service.label}</p>
                  <p className="text-sm text-slate-500">{service.description}</p>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <section className="bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 p-4 sm:p-6 md:p-8">
            <h3 className="text-secondary text-xl font-bold mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-secondary text-sm font-bold">
                2
              </span>
              Date & Time
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 font-semibold text-sm">Select Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 text-slate-400 size-5 pointer-events-none" />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => updateFormData('date', e.target.value)}
                    min={minDate || new Date().toISOString().split('T')[0]}
                    className={cn(
                      "w-full rounded-lg bg-slate-50 p-3 pl-10 text-slate-700 focus:border-primary focus:ring-primary",
                      errors.date ? "border-red-500 border-2" : "border-slate-200"
                    )}
                  />
                </div>
                {errors.date && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="size-4" />
                    {errors.date}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 font-semibold text-sm">Select Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3.5 text-slate-400 size-5 pointer-events-none" />
                  <select
                    value={formData.time}
                    onChange={(e) => updateFormData('time', e.target.value)}
                    className={cn(
                      "w-full rounded-lg bg-slate-50 p-3 pl-10 text-slate-700 focus:border-primary focus:ring-primary appearance-none",
                      errors.time ? "border-red-500 border-2" : "border-slate-200"
                    )}
                  >
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, '0');
                      return (
                        <option key={hour} value={`${hour}:00`}>
                          {hour}:00
                        </option>
                      );
                    })}
                  </select>
                </div>
                {errors.time && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="size-4" />
                    {errors.time}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Step 3: Locations */}
        {step === 3 && (
          <section className="bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 p-4 sm:p-6 md:p-8">
            <h3 className="text-secondary text-xl font-bold mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-secondary text-sm font-bold">
                3
              </span>
              Locations
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                {/* Datalist for location suggestions */}
                <datalist id="locations-list">
                  {POPULAR_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} />
                  ))}
                </datalist>

                <div className="flex flex-col gap-2">
                  <label className="text-slate-700 font-semibold text-sm">Pick-up Location</label>
                  <PlaceAutocomplete
                    value={formData.pickupLocation}
                    onChange={(val) => {
                      updateFormData('pickupLocation', val);
                      setTimeout(calculateRoute, 100);
                    }}
                    placeholder="Enter airport, hotel, or address"
                    icon={<Plane className="text-primary size-5" />}
                    className={cn(
                      "bg-slate-50 text-slate-700 border",
                      errors.pickupLocation ? "border-red-500 border-2" : "border-slate-200"
                    )}
                  />
                  {errors.pickupLocation && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="size-4" />
                      {errors.pickupLocation}
                    </p>
                  )}
                </div>
                <div className="pl-5 -my-2">
                  <div className="h-6 border-l-2 border-dashed border-slate-300" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-slate-700 font-semibold text-sm">Drop-off Location</label>
                  <PlaceAutocomplete
                    value={formData.dropoffLocation}
                    onChange={(val) => {
                      updateFormData('dropoffLocation', val);
                      setTimeout(calculateRoute, 100);
                    }}
                    placeholder="Enter destination"
                    icon={<Flag className="text-red-500 size-5" />}
                    className={cn(
                      "bg-slate-50 text-slate-700 border",
                      errors.dropoffLocation ? "border-red-500 border-2" : "border-slate-200"
                    )}
                  />
                  {errors.dropoffLocation && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="size-4" />
                      {errors.dropoffLocation}
                    </p>
                  )}
                </div>
                <div className="mt-2">
                  <p className="text-xs text-slate-400 font-medium mb-2 uppercase tracking-wide">
                    Popular Destinations:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_LOCATIONS.slice(0, 6).map((place) => (
                      <button
                        key={place}
                        onClick={() => {
                          if (!formData.pickupLocation) {
                            updateFormData('pickupLocation', place);
                          } else {
                            updateFormData('dropoffLocation', place);
                            setTimeout(calculateRoute, 100);
                          }
                        }}
                        className={cn(
                          'px-3 py-1 text-xs rounded-full transition-colors border',
                          (formData.pickupLocation === place || formData.dropoffLocation === place)
                            ? 'bg-primary/10 text-secondary border-primary/20 font-medium'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-100'
                        )}
                      >
                        {place}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden bg-slate-100 relative h-48 sm:h-64 md:h-auto md:min-h-[400px] border border-slate-200">
                {isLoaded ? (
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={{ lat: 64.1466, lng: -21.9426 }} // Reykjavik center
                    zoom={10}
                    options={{ disableDefaultUI: true, zoomControl: true }}
                  >
                    {directionsResponse && (
                      <DirectionsRenderer directions={directionsResponse} />
                    )}
                  </GoogleMap>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <MapPin className="size-12 animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Step 4: Options & Details (NEW) */}
        {step === 4 && (
          <section className="bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 p-4 sm:p-6 md:p-8">
            <h3 className="text-secondary text-xl font-bold mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-secondary text-sm font-bold">
                4
              </span>
              Options & Details
            </h3>

            {/* Travel Details */}
            <div className="space-y-6 mb-8">
              <h4 className="font-bold text-slate-900 border-b pb-2">Travel Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* AIRPORT TRANSFER */}
                {serviceType === 'AIRPORT_TRANSFER' && (
                  <>
                    <div className="flex flex-col gap-2">
                      <label className="text-slate-700 font-semibold text-sm">Flight Number</label>
                      <input
                        type="text"
                        value={flightDetails.flightNumber}
                        onChange={(e) => setFlightDetails(prev => ({ ...prev, flightNumber: e.target.value }))}
                        placeholder="e.g. FI502"
                        className="w-full rounded-lg border-slate-200 p-3 text-slate-700 focus:border-primary focus:ring-primary"
                      />
                      <p className="text-xs text-green-600 font-medium flex items-center gap-1 mt-1">
                        <Check className="size-3" /> We monitor your flight for delays (Free waiting time)
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-slate-700 font-semibold text-sm">
                         {formData.pickupLocation.toLowerCase().includes('airport') ? 'Expected Landing Time' : 'Flight Departure Time'}
                       </label>
                       <input
                         type="time"
                         value={flightDetails.flightTime}
                         onChange={(e) => setFlightDetails(prev => ({ ...prev, flightTime: e.target.value }))}
                         className="w-full rounded-lg border-slate-200 p-3 text-slate-700 focus:border-primary focus:ring-primary"
                       />
                    </div>
                  </>
                )}

                {/* PRIVATE TOUR */}
                {serviceType === 'PRIVATE_TOUR' && (
                  <>
                    <div className="flex flex-col gap-2">
                      <label className="text-slate-700 font-semibold text-sm">Selected Tour</label>
                      <input
                        type="text"
                        value={customFields.tourName}
                        onChange={(e) => setCustomFields(prev => ({ ...prev, tourName: e.target.value }))}
                        placeholder="e.g. Golden Circle"
                        className="w-full rounded-lg border-slate-200 p-3 text-slate-700 focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-slate-700 font-semibold text-sm">Preferred Start Time</label>
                      <input
                        type="time"
                        value={customFields.tourStartTime}
                        onChange={(e) => setCustomFields(prev => ({ ...prev, tourStartTime: e.target.value }))}
                        className="w-full rounded-lg border-slate-200 p-3 text-slate-700 focus:border-primary focus:ring-primary"
                      />
                      <p className="text-xs text-slate-500 mt-1">Default is typical optimal daylight hours.</p>
                    </div>
                  </>
                )}

                {/* BLUE LAGOON */}
                {serviceType === 'BLUE_LAGOON' && (
                  <div className="flex flex-col gap-2">
                    <label className="text-slate-700 font-semibold text-sm">Route Plan</label>
                    <select
                      value={customFields.blDirection}
                      onChange={(e) => setCustomFields(prev => ({ ...prev, blDirection: e.target.value }))}
                      className="w-full rounded-lg border-slate-200 p-3 text-slate-700 focus:border-primary focus:ring-primary"
                    >
                      <option value="KEF_BL_RV">KEF Airport → Blue Lagoon → Reykjavík</option>
                      <option value="RV_BL_RV">Reykjavík → Blue Lagoon → Reykjavík</option>
                      <option value="RV_BL_KEF">Reykjavík → Blue Lagoon → KEF Airport</option>
                      <option value="ONE_WAY">One-Way Transfer</option>
                    </select>
                  </div>
                )}

                {/* HOURLY HIRE */}
                {serviceType === 'HOURLY_HIRE' && (
                  <div className="flex flex-col gap-2">
                    <label className="text-slate-700 font-semibold text-sm">Charter Duration</label>
                    <select
                      value={customFields.hourlyDuration}
                      onChange={(e) => setCustomFields(prev => ({ ...prev, hourlyDuration: e.target.value }))}
                      className="w-full rounded-lg border-slate-200 p-3 text-slate-700 focus:border-primary focus:ring-primary"
                    >
                      <option value="3">3 Hours</option>
                      <option value="4">4 Hours</option>
                      <option value="6">6 Hours</option>
                      <option value="8">8 Hours</option>
                      <option value="10">10 Hours</option>
                      <option value="12">12 Hours (Full Day)</option>
                    </select>
                  </div>
                )}

                {/* Luggage (Show for Airport & Blue Lagoon) */}
                {(serviceType === 'AIRPORT_TRANSFER' || serviceType === 'BLUE_LAGOON') && (
                  <div className="flex flex-col gap-2 md:max-w-xs">
                    <label className="text-slate-700 font-semibold text-sm">Number of Suitcases</label>
                    <select
                      value={flightDetails.luggageCount}
                      onChange={(e) => setFlightDetails(prev => ({ ...prev, luggageCount: parseInt(e.target.value) }))}
                      className="w-full rounded-lg border-slate-200 p-3 text-slate-700 focus:border-primary focus:ring-primary"
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                      <option value={9}>9+</option>
                    </select>
                    <p className="text-xs text-slate-500 mt-1">Our premium vehicles easily accommodate large luggage volumes.</p>
                  </div>
                )}

              </div>
            </div>

            {/* Extras */}
            <div className="space-y-6">
              <h4 className="font-bold text-slate-900 border-b pb-2">Extras & Upgrades</h4>

              <div className="space-y-4">
                {/* Premium Car */}
                <label className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-primary/50 cursor-pointer transition-colors bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={options.premiumCar}
                      onChange={(e) => setOptions(prev => ({ ...prev, premiumCar: e.target.checked }))}
                      className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <div>
                      <p className="font-bold text-slate-900">Premium Luxury Car</p>
                      <p className="text-sm text-slate-500">Upgrade to a luxury oversized vehicle</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">ISK 5,000</span>
                </label>

                {/* Child Seats */}
                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={options.childSeats > 0}
                        onChange={(e) => setOptions(prev => ({ ...prev, childSeats: e.target.checked ? 1 : 0 }))}
                        className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                      />
                      <div>
                        <p className="font-bold text-slate-900">Child Seat / Booster Seat</p>
                        <p className="text-sm text-slate-500">Safety seats for children</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900">ISK 2,000 <span className="text-xs font-normal text-slate-500">/ each</span></span>
                  </div>

                  {options.childSeats > 0 && (
                    <div className="ml-8 mt-3 flex items-center gap-3">
                      <label className="text-sm font-medium text-slate-700">How many seats?</label>
                      <select
                        value={options.childSeats}
                        onChange={(e) => setOptions(prev => ({ ...prev, childSeats: parseInt(e.target.value) }))}
                        className="rounded border-slate-300 text-sm py-1 pl-2 pr-8 focus:ring-primary focus:border-primary"
                      >
                        {[1, 2, 3, 4].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Extra Stop */}
                <label className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-primary/50 cursor-pointer transition-colors bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={options.extraStop}
                      onChange={(e) => setOptions(prev => ({ ...prev, extraStop: e.target.checked }))}
                      className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <div>
                      <p className="font-bold text-slate-900">Extra Pick up / Drop off place</p>
                      <p className="text-sm text-slate-500">Stop at an additional location</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">ISK 7,000</span>
                </label>

                {/* Extra Time */}
                <label className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-primary/50 cursor-pointer transition-colors bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={options.extraTime}
                      onChange={(e) => setOptions(prev => ({ ...prev, extraTime: e.target.checked }))}
                      className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <div>
                      <p className="font-bold text-slate-900">Extra Time</p>
                      <p className="text-sm text-slate-500">Extended waiting or service time</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">ISK 14,000</span>
                </label>
              </div>

              {/* Additional Information */}
              <div className="flex flex-col gap-2 pt-4">
                <label className="text-slate-700 font-semibold text-sm">
                  Additional Details
                </label>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Any special requirements or information..."
                  rows={3}
                  className="w-full rounded-lg border-slate-200 p-3 text-slate-700 focus:border-primary focus:ring-primary resize-none"
                />
              </div>
            </div>
          </section>
        )}

        {/* Step 5: Passenger Details (Previously Step 4) */}
        {step === 5 && (
          <section className="bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 p-4 sm:p-6 md:p-8">
            <h3 className="text-secondary text-xl font-bold mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-secondary text-sm font-bold">
                5
              </span>
              Contact Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 font-semibold text-sm">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-slate-400 size-5" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    placeholder="John Smith"
                    className={cn(
                      "w-full rounded-lg p-3 pl-10 text-slate-700 focus:border-primary focus:ring-primary",
                      errors.name ? "border-red-500 border-2" : "border-slate-200"
                    )}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="size-4" />
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 font-semibold text-sm">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="john@example.com"
                  className={cn(
                    "w-full rounded-lg p-3 text-slate-700 focus:border-primary focus:ring-primary",
                    errors.email ? "border-red-500 border-2" : "border-slate-200"
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="size-4" />
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 font-semibold text-sm">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-slate-400 size-5" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    placeholder="+354 555 1234"
                    className={cn(
                      "w-full rounded-lg p-3 pl-10 text-slate-700 focus:border-primary focus:ring-primary",
                      errors.phone ? "border-red-500 border-2" : "border-slate-200"
                    )}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="size-4" />
                    {errors.phone}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 font-semibold text-sm">Number of Passengers</label>
                <select
                  value={formData.passengers}
                  onChange={(e) => updateFormData('passengers', parseInt(e.target.value))}
                  className="w-full rounded-lg border-slate-200 p-3 text-slate-700 focus:border-primary focus:ring-primary"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 pb-12">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="px-4 sm:px-6 py-3 rounded-lg text-slate-600 font-bold hover:bg-slate-100 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="size-5" />
            Back
          </button>
          {step < 5 ? (
            <button
              onClick={nextStep}
              className="px-6 sm:px-8 py-3 rounded-lg bg-primary text-secondary font-bold hover:bg-yellow-400 shadow-md shadow-yellow-400/20 transition-all transform hover:scale-[1.02] flex items-center gap-2"
            >
              Continue
              <ArrowRight className="size-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmitBooking}
              disabled={isSubmitting}
              className="px-6 sm:px-8 py-3 rounded-lg bg-primary text-secondary font-bold hover:bg-yellow-400 shadow-md shadow-yellow-400/20 transition-all transform hover:scale-[1.02] flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Processing...
                </>
              ) : serviceType === 'TAXI' ? (
                <>
                  <Check className="size-5" />
                  Confirm Booking
                </>
              ) : (
                <>
                  <CreditCard className="size-5" />
                  Proceed to Payment
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Right Column: Sidebar Summary */}
      <div className="lg:col-span-4">
        <BookingSummary
          serviceType={serviceType}
          formData={formData}
          options={{
            ...options,
            hourlyDuration: customFields.hourlyDuration,
          }}
          step={step}
          packageType={initialPackage || undefined}
          realDistanceKm={distanceKm}
          realDurationStr={durationStr}
          tourPrice={initialTourPrice || undefined}
        />
      </div>
    </div>
  );
}
