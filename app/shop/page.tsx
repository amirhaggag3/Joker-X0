'use client';

import { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';

export default function ShopPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === 'All' || product.category === category;

      const matchesQuery =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase());

      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="mb-12">
          <h1 className="text-4xl font-bold sm:text-5xl">Shop</h1>
          <p className="mt-3 text-gray-400">
            Explore the JOKER collection.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-white/10 bg-black px-4 py-3 text-white"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-400">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
