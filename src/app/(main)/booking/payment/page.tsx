'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Lock, ArrowLeft, ShieldCheck, Clock, Phone, Star, Loader2, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const serviceLabels: Record<string, string> = {
  TAXI: 'City Taxi',
  AIRPORT_TRANSFER: 'Airport Transfer',
  PRIVATE_TOUR: 'Private Tour',
  CUSTOM_TOUR: 'Custom Tour',
  BLUE_LAGOON: 'Blue Lagoon Transfer',
  HOURLY_HIRE: 'Hourly Hire',
};

const serviceIcons: Record<string, string> = {
  TAXI: '🚖',
  AIRPORT_TRANSFER: '✈️',
  PRIVATE_TOUR: '🗺️',
  CUSTOM_TOUR: '🎯',
  BLUE_LAGOON: '♨️',
  HOURLY_HIRE: '⏱️',
};

const ISK_TO_EUR_RATE = 150;
const EUR_EXCHANGE_RATE_FORMAT = '1 EUR = 150 ISK';

interface PayPalButtonsWrapperProps {
  isPaying: boolean;
  createOrder: () => Promise<string>;
  onApprove: (data: { orderID: string }) => Promise<void>;
  onError: (err: any) => void;
  onCancel: () => void;
}

function PayPalButtonsWrapper({ isPaying, createOrder, onApprove, onError, onCancel }: PayPalButtonsWrapperProps) {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <div className="relative min-h-[150px]">
      {isPending && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 z-10 gap-3">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-xs font-semibold text-slate-500 animate-pulse">Loading payment methods...</p>
        </div>
      )}
      <PayPalButtons
        style={{
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'pay',
          height: 50,
        }}
        disabled={isPaying || isPending}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        onCancel={onCancel}
      />
    </div>
  );
}

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const amount    = parseInt(searchParams.get('amount')  || '0');
  const bookingId = searchParams.get('booking');
  const serviceType = searchParams.get('type') || '';
  const amountEUR = (amount / ISK_TO_EUR_RATE).toFixed(2);

  const [error, setError]       = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);

  const createOrder = async () => {
    setError(null);
    try {
      const res  = await fetch('/api/paypal/create-order', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          description: `${serviceLabels[serviceType] || 'Booking'} - PrimeTaxi & Tours`,
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        console.error('Server-side PayPal error:', data);
        const errorMsg = data.error || 'Failed to initialize PayPal order.';
        setError(errorMsg);
        window.alert(`PayPal Error: ${errorMsg}`);
        throw new Error(errorMsg);
      }
      
      return data.orderID;
    } catch (err: any) {
      console.error('Client-side createOrder error:', err);
      if (!error) setError(err.message || 'Failed to initialize payment.');
      throw err;
    }
  };

  const onApprove = async (data: { orderID: string }) => {
    setIsPaying(true);
    setError(null);
    try {
      const res    = await fetch('/api/paypal/capture-order', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderID: data.orderID, bookingId }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Payment capture failed');
      router.push(`/booking/confirmation?booking=${bookingId}`);
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
      setIsPaying(false);
    }
  };

  const onError = (err: any) => {
    console.error('PayPal error:', err);
    setError('Payment could not be processed. Please try again.');
    setIsPaying(false);
  };

  const onCancel = () =>
    setError('Payment was cancelled. You can try again whenever you are ready.');

  if (!bookingId || !amount) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Invalid Payment Link</h1>
          <p className="text-slate-500 mb-8">Booking details are missing. Please start a new booking.</p>
          <button
            onClick={() => router.push('/booking')}
            className="px-8 py-3 bg-primary text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors"
          >
            Start New Booking
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-8 sm:py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span className="text-sm font-medium">Back to Booking</span>
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <ShieldCheck className="size-4" />
            Secured by PayPal
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Complete Your Payment</h1>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Pay with your PayPal account or enter your card details — no PayPal account required.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Left: payment panel ── */}
          <div className="lg:col-span-3 space-y-4">

            {/* Amount banner */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Amount Due</span>
                <span className="text-xs bg-slate-100 text-slate-500 rounded-full px-2.5 py-0.5">Charged in EUR</span>
              </div>
              <div className="flex items-end gap-3 mt-1">
                <span className="text-3xl font-extrabold text-slate-900">{formatCurrency(amount)}</span>
                <span className="text-slate-400 text-sm mb-1">≈ €{amountEUR}</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                ISK is converted to EUR at checkout (approx. 1 EUR = {ISK_TO_EUR_RATE} ISK).
              </p>
            </div>

            {/* Payment card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

              {/* Header */}
              <div className="px-6 pt-6 pb-4 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-700 mb-1">Choose payment method</p>
                <p className="text-xs text-slate-400">
                  Pay with PayPal or enter your card details directly — no account needed.
                </p>
              </div>

              {/* Accepted cards row */}
              <div className="px-6 pt-4 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-400 font-medium">We accept:</span>
                {['Visa', 'Mastercard', 'Amex', 'Discover', 'PayPal'].map((c) => (
                  <span key={c} className="text-xs font-bold text-slate-500 bg-slate-100 border border-slate-200 rounded-md px-2.5 py-1">
                    {c}
                  </span>
                ))}
                <span className="ml-auto text-xs text-slate-400 flex items-center gap-1">
                  <Lock className="size-3" />
                  SSL encrypted
                </span>
              </div>

              {/* PayPal buttons — vertical layout shows PayPal + card natively */}
              <div className="p-6">
                {!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ? (
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                    <AlertCircle className="size-4 shrink-0" />
                    Payment configuration is missing. Please contact support or try again later.
                  </div>
                ) : (
                  <PayPalScriptProvider
                    options={{
                      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                      currency: 'EUR',
                      intent: 'capture',
                      locale: 'en_US',
                      components: 'buttons',
                    }}
                  >
                    <PayPalButtonsWrapper
                      isPaying={isPaying}
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                      onCancel={onCancel}
                    />
                  </PayPalScriptProvider>
                )}
              </div>

              {/* Feedback messages */}
              {error && (
                <div className="mx-6 mb-5 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  <AlertCircle className="size-4 shrink-0 mt-0.5" />
                  {error}
                </div>
              )}
              {isPaying && (
                <div className="mx-6 mb-5 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl text-sm flex items-center gap-3">
                  <Loader2 className="size-4 animate-spin shrink-0" />
                  Processing your payment — please do not close this page.
                </div>
              )}

              <div className="px-6 pb-5">
                <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-green-500 shrink-0" />
                  Your card details are handled securely by PayPal — we never store them.
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400 py-1">
              <span className="flex items-center gap-1.5"><Lock className="size-3.5" />256-bit SSL encryption</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="size-3.5" />PayPal Buyer Protection</span>
              <span className="flex items-center gap-1.5"><Phone className="size-3.5" />24/7 support available</span>
            </div>
          </div>

          {/* ── Right: order summary ── */}
          <div className="lg:col-span-2">
            <div className="bg-secondary text-white rounded-2xl shadow-lg p-6 sticky top-24">

              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                <span className="text-3xl">{serviceIcons[serviceType] || '🚗'}</span>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Service</p>
                  <p className="font-bold">{serviceLabels[serviceType] || 'Booking'}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Base fare</span>
                  <span>{formatCurrency(amount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">EUR equivalent</span>
                  <span>€{amountEUR}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(amount)}</span>
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  { icon: Clock,        text: 'Free cancellation up to 24h before' },
                  { icon: Phone,        text: 'Flight monitoring included'          },
                  { icon: Star,         text: 'Meet & greet at arrivals'            },
                  { icon: ShieldCheck,  text: 'Instant booking confirmation'        },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <div className="size-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                      <Icon className="size-3 text-green-400" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 text-center">
                <p className="text-xs text-slate-400">
                  Need help?{' '}
                  <a href="tel:+3548575955" className="text-primary hover:underline font-medium">
                    +354 857 5955
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function PaymentLoading() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="h-5 w-28 bg-slate-200 rounded animate-pulse mb-8" />
        <div className="h-10 w-64 bg-slate-200 rounded animate-pulse mx-auto mb-10" />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl h-24 animate-pulse" />
            <div className="bg-white rounded-2xl h-80 animate-pulse" />
          </div>
          <div className="lg:col-span-2 bg-slate-800 rounded-2xl h-80 animate-pulse" />
        </div>
      </div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<PaymentLoading />}>
      <PaymentContent />
    </Suspense>
  );
}
