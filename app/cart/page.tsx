'use client';

import Link from 'next/link';
import { useCart } from '@/lib/store';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <section className="section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold">Your Cart Is Empty</h1>
          <p className="mt-4 text-gray-400">
            Add some JOKER pieces to your cart.
          </p>
          <Link href="/shop" className="btn-primary mt-8">
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container-custom">
        <h1 className="mb-10 text-4xl font-bold">Shopping Cart</h1>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.size}-${item.color}`}
              className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="font-semibold">{item.product.name}</h2>
                <p className="text-sm text-gray-400">
                  Size: {item.size} · Color: {item.color}
                </p>
                <p className="mt-2">${item.product.price}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    updateQuantity(
                      item.product.id,
                      item.quantity - 1,
                      item.size,
                      item.color
                    )
                  }
                  className="rounded border border-white/20 px-3 py-1"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(
                      item.product.id,
                      item.quantity + 1,
                      item.size,
                      item.color
                    )
                  }
                  className="rounded border border-white/20 px-3 py-1"
                >
                  +
                </button>

                <button
                  onClick={() =>
                    removeFromCart(item.product.id, item.size, item.color)
                  }
                  className="ml-3 text-red-400"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-gray-400">Subtotal</p>
            <p className="text-3xl font-bold">${subtotal.toFixed(2)}</p>
          </div>

          <Link href="/checkout" className="btn-primary">
            Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}
