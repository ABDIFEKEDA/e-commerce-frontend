"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, RotateCcw, ShieldCheck, Headphones, Star } from "lucide-react";
import useProductStore from "./stores/productStore";
import ProductCard from "./components/ProductCard";
import { categories } from "./components/Categories";
import { useState } from "react";

const trustItems = [
  { icon: Truck, label: "Free Shipping", sub: "On orders over $50" },
  { icon: RotateCcw, label: "Easy Returns", sub: "30-day return policy" },
  { icon: ShieldCheck, label: "Secure Payment", sub: "100% protected" },
  { icon: Headphones, label: "24/7 Support", sub: "Always here for you" },
];

const testimonials = [
  { name: "Sarah M.", text: "Amazing quality! The t-shirt fits perfectly and the fabric is so soft.", rating: 5 },
  { name: "James K.", text: "Fast delivery and the jacket looks even better in person. Highly recommend!", rating: 5 },
  { name: "Amina R.", text: "Great prices and the customer service was super helpful. Will shop again.", rating: 4 },
];

export default function LandingPage() {
  const { products } = useProductStore();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const featured = products.slice(0, 4);
  const shopCategories = categories.filter((c) => c.slug !== "all");

  return (
    <div className="flex flex-col gap-0">

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gray-950">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/featured.png"
            alt="Hero"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/70 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 flex flex-col gap-6">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-full w-fit backdrop-blur-sm border border-white/20">
            ✨ New Collection 2025
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight max-w-2xl">
            Dress Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Best</span> Every Day
          </h1>
          <p className="text-gray-300 text-lg max-w-md leading-relaxed">
            Discover the latest trends in fashion. Premium quality clothes for every occasion, delivered to your door.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <Link
              href="/products"
              className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              View Collections
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-6 pt-6 border-t border-white/10">
            {[["10K+", "Happy Customers"], ["500+", "Products"], ["50+", "Brands"], ["4.9★", "Avg Rating"]].map(([val, label]) => (
              <div key={label}>
                <p className="text-2xl font-bold text-white">{val}</p>
                <p className="text-gray-400 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-white border-y border-gray-100">
        <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-xl shrink-0">
                <Icon className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">{label}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-purple-600 uppercase tracking-widest mb-2">Browse</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {shopCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="group flex flex-col items-center gap-3 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200"
              >
                <div className="p-4 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                  <span className="text-gray-700 [&>svg]:w-6 [&>svg]:h-6">{cat.icon}</span>
                </div>
                <span className="text-sm font-medium text-gray-700 capitalize">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-medium text-purple-600 uppercase tracking-widest mb-2">Handpicked</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Products</h2>
            </div>
            <Link href="/products" className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-black transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} Product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BANNER ── */}
      <section className="bg-gray-950 py-20">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-lg">
            <span className="text-purple-400 text-sm font-medium uppercase tracking-widest">Limited Time</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Up to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">40% Off</span> on New Arrivals
            </h2>
            <p className="text-gray-400">Don't miss out on our biggest sale of the season. Shop now before it's gone.</p>
            <Link
              href="/products"
              className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors w-fit"
            >
              Shop the Sale <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative w-72 h-72 shrink-0">
            <Image src="/featured.png" alt="Sale" fill className="object-cover rounded-2xl opacity-80" />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-purple-600 uppercase tracking-widest mb-2">Reviews</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, text, rating }) => (
              <div key={name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">"{text}"</p>
                <p className="font-semibold text-sm text-gray-900">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-500 py-20">
        <div className="mx-auto max-w-2xl px-6 text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Stay in the Loop</h2>
          <p className="text-purple-100 text-lg">Subscribe to get exclusive deals, new arrivals, and style tips straight to your inbox.</p>
          {subscribed ? (
            <div className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-medium">
              🎉 You're subscribed! Check your inbox.
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
              className="flex w-full max-w-md gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
              />
              <button
                type="submit"
                className="bg-white text-purple-600 font-semibold px-5 py-3 rounded-xl hover:bg-gray-100 transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="text-purple-200 text-xs">No spam, ever. Unsubscribe at any time.</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 text-gray-400">
        <div className="mx-auto max-w-6xl px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Trends" width={32} height={32} />
              <span className="text-white font-bold tracking-wider">TRENDS</span>
            </Link>
            <p className="text-sm leading-relaxed">Your go-to destination for modern fashion. Quality you can feel, style you can trust.</p>
            <div className="flex gap-3 mt-2">
              {["Instagram", "Twitter", "Facebook"].map((s) => (
                <span key={s} className="text-xs bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 cursor-pointer transition-colors">{s}</span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <p className="text-white font-semibold text-sm">Quick Links</p>
            {[["Home", "/"], ["Products", "/products"], ["Cart", "/cart"], ["Sign In", "/login"]].map(([label, href]) => (
              <Link key={label} href={href} className="text-sm hover:text-white transition-colors">{label}</Link>
            ))}
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-3">
            <p className="text-white font-semibold text-sm">Categories</p>
            {shopCategories.slice(0, 5).map((c) => (
              <Link key={c.slug} href={`/products?category=${c.slug}`} className="text-sm capitalize hover:text-white transition-colors">{c.name}</Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-white font-semibold text-sm">Contact</p>
            <p className="text-sm">support@trends.com</p>
            <p className="text-sm">+1 (800) 123-4567</p>
            <p className="text-sm">Mon–Fri, 9am–6pm EST</p>
            <div className="flex gap-2 mt-2">
              <Image src="/stripe.png" alt="Stripe" width={40} height={24} className="h-6 w-auto opacity-60" />
              <Image src="/klarna.png" alt="Klarna" width={40} height={24} className="h-6 w-auto opacity-60" />
              <Image src="/cards.png" alt="Cards" width={40} height={24} className="h-6 w-auto opacity-60" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mx-auto max-w-6xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p>© 2025 TRENDS. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
