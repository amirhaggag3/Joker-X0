import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import NewsletterSection from '@/components/NewsletterSection';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <section className="section-padding bg-gradient-to-b from-ink to-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              JOKER
            </h2>
            <p className="mt-4 text-gray-400">
              Premium pieces. Built for your lifestyle.
            </p>
          </div>
          <div className="text-center">
            <Link
              href="/shop"
              className="btn-primary inline-flex"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </section>
      <NewsletterSection />
    </div>
  );
}
