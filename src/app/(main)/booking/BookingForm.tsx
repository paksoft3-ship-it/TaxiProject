'use client';

import { useState } from 'react';
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
import { BookingSummary } from './BookingSummary';

type BookingStep = 1 | 2 | 3 | 4;
type ServiceType = 'TAXI' | 'AIRPORT_TRANSFER' | 'PRIVATE_TOUR' | 'CUSTOM_TOUR';

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
  { id: 'TAXI', label: 'City Taxi', icon: Car, description: 'Rides within Reykjavik' },
  { id: 'AIRPORT_TRANSFER', label: 'Airport Transfer', icon: Plane, description: 'To/from Keflavik Airport' },
  { id: 'PRIVATE_TOUR', label: 'Private Tour', icon: MapPin, description: 'Custom day tours' },
];

export function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialType = (searchParams.get('type') as ServiceType) || 'TAXI';
  const initialPickup = searchParams.get('pickup') || '';
  const initialDropoff = searchParams.get('dropoff') || '';
  const initialDate = searchParams.get('date') || '';

  const [step, setStep] = useState<BookingStep>(1);
  const [serviceType, setServiceType] = useState<ServiceType>(initialType);
  const [formData, setFormData] = useState({
    pickupLocation: initialPickup,
    dropoffLocation: initialDropoff,
    date: initialDate,
    time: '10:00',
    passengers: 2,
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
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
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
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

    if (!formData.dropoffLocation.trim()) {
      newErrors.dropoffLocation = 'Please enter a drop-off location';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = (): boolean => {
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
    }

    if (isValid) {
      setStep((prev) => Math.min(prev + 1, 4) as BookingStep);
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1) as BookingStep);

  const handleSubmitBooking = async () => {
    if (!validateStep4()) {
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
          dropoffLocation: formData.dropoffLocation,
          pickupDate: formData.date,
          pickupTime: formData.time,
          specialRequests: formData.specialRequests,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const data = await response.json();

      // Redirect to payment page with booking details
      const params = new URLSearchParams({
        booking: data.booking.id,
        amount: data.booking.totalPrice.toString(),
        clientSecret: data.clientSecret,
      });

      router.push(`/booking/payment?${params.toString()}`);
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (step / 4) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Booking Steps */}
      <div className="lg:col-span-8 flex flex-col gap-8">
        {/* Page Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="text-secondary text-3xl md:text-4xl font-extrabold tracking-tight">
            Book Your Journey
          </h1>
          <p className="text-slate-500 text-lg">
            Secure your ride in Iceland in just a few steps.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 justify-between items-center">
            <p className="text-secondary text-sm font-bold uppercase tracking-wider">
              Step {step} of 4
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
          <section className="bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
            <h3 className="text-secondary text-xl font-bold mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-secondary text-sm font-bold">
                1
              </span>
              Select Service Type
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <section className="bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
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
                    min={new Date().toISOString().split('T')[0]}
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
          <section className="bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
            <h3 className="text-secondary text-xl font-bold mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-secondary text-sm font-bold">
                3
              </span>
              Locations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-slate-700 font-semibold text-sm">Pick-up Location</label>
                  <div className="relative">
                    <Plane className="absolute left-3 top-3.5 text-primary size-5" />
                    <input
                      type="text"
                      value={formData.pickupLocation}
                      onChange={(e) => updateFormData('pickupLocation', e.target.value)}
                      placeholder="Enter airport, hotel, or address"
                      className={cn(
                        "w-full rounded-lg p-3 pl-10 text-slate-700 focus:border-primary focus:ring-primary",
                        errors.pickupLocation ? "border-red-500 border-2" : "border-slate-200"
                      )}
                    />
                  </div>
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
                  <div className="relative">
                    <Flag className="absolute left-3 top-3.5 text-red-500 size-5" />
                    <input
                      type="text"
                      value={formData.dropoffLocation}
                      onChange={(e) => updateFormData('dropoffLocation', e.target.value)}
                      placeholder="Enter destination"
                      className={cn(
                        "w-full rounded-lg p-3 pl-10 text-slate-700 focus:border-primary focus:ring-primary",
                        errors.dropoffLocation ? "border-red-500 border-2" : "border-slate-200"
                      )}
                    />
                  </div>
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
                    {['Reykjavik City', 'Blue Lagoon', 'Sky Lagoon'].map((place) => (
                      <button
                        key={place}
                        onClick={() => updateFormData('dropoffLocation', place)}
                        className={cn(
                          'px-3 py-1 text-xs rounded-full transition-colors border',
                          formData.dropoffLocation === place
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
              <div className="rounded-xl overflow-hidden bg-slate-100 relative h-64 md:h-auto border border-slate-200">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  <MapPin className="size-12" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Step 4: Passenger Details */}
        {step === 4 && (
          <section className="bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
            <h3 className="text-secondary text-xl font-bold mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-secondary text-sm font-bold">
                4
              </span>
              Passenger Details
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
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-slate-700 font-semibold text-sm">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => updateFormData('specialRequests', e.target.value)}
                  placeholder="Child seats, wheelchair accessibility, extra luggage..."
                  rows={3}
                  className="w-full rounded-lg border-slate-200 p-3 text-slate-700 focus:border-primary focus:ring-primary resize-none"
                />
              </div>
            </div>
          </section>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 pb-12">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="px-6 py-3 rounded-lg text-slate-600 font-bold hover:bg-slate-100 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="size-5" />
            Back
          </button>
          {step < 4 ? (
            <button
              onClick={nextStep}
              className="px-8 py-3 rounded-lg bg-primary text-secondary font-bold hover:bg-yellow-400 shadow-md shadow-yellow-400/20 transition-all transform hover:scale-[1.02] flex items-center gap-2"
            >
              Continue
              <ArrowRight className="size-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmitBooking}
              disabled={isSubmitting}
              className="px-8 py-3 rounded-lg bg-primary text-secondary font-bold hover:bg-yellow-400 shadow-md shadow-yellow-400/20 transition-all transform hover:scale-[1.02] flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Processing...
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
          step={step}
        />
      </div>
    </div>
  );
}
