'use client';

import { FormEvent, useState } from 'react';
import { useCart } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(event.currentTarget);

    const order = {
      customer: {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
      },
      items,
      subtotal,
      paymentMethod: 'cash_on_delivery',
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      clearCart();
      router.push('/?order=success');
    } catch {
      setError('Unable to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <section className="section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold">Your cart is empty.</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container-custom max-w-3xl">
        <h1 className="mb-10 text-4xl font-bold">Checkout</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="name"
            required
            placeholder="Full name"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3"
          />

          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3"
          />

          <input
            name="phone"
            required
            placeholder="Phone number"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3"
          />

          <textarea
            name="address"
            required
            placeholder="Delivery address"
            rows={4}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3"
          />

          {error && <p className="text-red-400">{error}</p>}

          <div className="border-t border-white/10 pt-6">
            <p className="text-gray-400">Total</p>
            <p className="text-3xl font-bold">${subtotal.toFixed(2)}</p>
          </div>

          <button
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Placing Order...' : 'Place Order — Cash on Delivery'}
          </button>
        </form>
      </div>
    </section>
  );
          }
