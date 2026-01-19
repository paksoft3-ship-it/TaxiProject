'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { CreditCard, Lock, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutForm({ amount, bookingId }: { amount: number; bookingId: string | null }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || 'An error occurred');
      setIsLoading(false);
      return;
    }

    const returnUrl = bookingId
      ? `${window.location.origin}/booking/confirmation?booking=${bookingId}`
      : `${window.location.origin}/booking/confirmation`;

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
    });

    if (confirmError) {
      setError(confirmError.message || 'Payment failed');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Lock className="size-4" />
        <span>Your payment is secured with 256-bit SSL encryption</span>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isLoading}
        disabled={!stripe}
      >
        Pay {formatCurrency(amount)}
      </Button>
    </form>
  );
}

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [amount, setAmount] = useState(19500);
  const [bookingId, setBookingId] = useState<string | null>(null);

  useEffect(() => {
    // Get booking details from URL params
    const bookingAmount = searchParams.get('amount');
    const booking = searchParams.get('booking');
    const secret = searchParams.get('clientSecret');

    if (bookingAmount) {
      setAmount(parseInt(bookingAmount));
    }
    if (booking) {
      setBookingId(booking);
    }
    if (secret) {
      setClientSecret(secret);
      return;
    }

    // Create payment intent if no client secret provided
    fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency: 'isk' }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      })
      .catch(console.error);
  }, [amount, searchParams]);

  return (
    <main className="py-10 px-4 max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8"
      >
        <ArrowLeft className="size-5" />
        Back to Booking
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="size-6 text-primary" />
            <h1 className="text-2xl font-bold text-slate-900">Payment Details</h1>
          </div>

          {clientSecret ? (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#f2cc0d',
                    borderRadius: '8px',
                  },
                },
              }}
            >
              <CheckoutForm amount={amount} bookingId={bookingId} />
            </Elements>
          ) : (
            <div className="space-y-4">
              <div className="h-12 skeleton rounded-lg" />
              <div className="h-12 skeleton rounded-lg" />
              <div className="h-12 skeleton rounded-lg" />
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-secondary text-white rounded-2xl shadow-lg p-8 h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-slate-300">Airport Transfer</span>
              <span>{formatCurrency(19500)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Service Fee</span>
              <span>{formatCurrency(0)}</span>
            </div>
            <div className="border-t border-slate-700 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{formatCurrency(amount)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Check className="size-4 text-green-400" />
              <span>Free cancellation up to 24h before</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Check className="size-4 text-green-400" />
              <span>Flight monitoring included</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Check className="size-4 text-green-400" />
              <span>Meet & greet at arrivals</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function PaymentLoading() {
  return (
    <main className="py-10 px-4 max-w-4xl mx-auto">
      <div className="h-8 w-32 skeleton rounded mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
          <div className="h-8 w-48 skeleton rounded mb-6" />
          <div className="space-y-4">
            <div className="h-12 skeleton rounded-lg" />
            <div className="h-12 skeleton rounded-lg" />
            <div className="h-12 skeleton rounded-lg" />
          </div>
        </div>
        <div className="bg-slate-200 rounded-2xl p-8 h-fit">
          <div className="h-6 w-32 skeleton rounded mb-6" />
          <div className="space-y-4">
            <div className="h-4 skeleton rounded" />
            <div className="h-4 skeleton rounded" />
            <div className="h-4 skeleton rounded" />
          </div>
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
