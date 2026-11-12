import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Sparkles, Star } from 'lucide-react';
import { INITIAL_PRODUCTS, HERO_BANNER_IMAGE, MEN_IMAGE, WOMEN_IMAGE, HOODIE_IMAGE, JACKET_IMAGE } from '../data/mockData';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { Product } from '../types';

export const HomePage: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categories = [
    { name: 'Outerwear & Jackets', path: '/category/jackets', image: JACKET_IMAGE, tag: '550 GSM Wool' },
    { name: 'Heavyweight Hoodies', path: '/category/hoodies', image: HOODIE_IMAGE, tag: '480 GSM Loopback' },
    { name: "Men's Collection", path: '/category/men', image: MEN_IMAGE, tag: 'New Arrivals' },
    { name: "Women's Atelier", path: '/category/women', image: WOMEN_IMAGE, tag: 'Tailored Cuts' },
    { name: 'Japanese Denim', path: '/category/jeans', image: HERO_BANNER_IMAGE, tag: '14.5oz Selvedge' },
    { name: 'Junior & Kids', path: '/category/kids', image: HOODIE_IMAGE, tag: 'Active Movement' }
  ];

  const newArrivals = INITIAL_PRODUCTS.filter(p => p.isNewArrival).slice(0, 4);
  const bestSellers = INITIAL_PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);
  const trendingProducts = INITIAL_PRODUCTS.filter(p => p.isTrending).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Large Fashion Hero Banner */}
      <section className="relative bg-[#101828] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/40 text-blue-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>COLLECTION 2026 DROP // VOL. 01</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-balance">
              YOUR STYLE.<br />
              <span className="text-[#155EEF]">YOUR RULES.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Precision-engineered luxury essentials. From 480 GSM French Terry loopback hoodies to hand-finished Melton wool bomber jackets and 14.5oz selvedge denim.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/shop"
                className="bg-[#155EEF] hover:bg-blue-600 text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 group"
              >
                <span>Explore The Drop</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/category/jackets"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3.5 rounded-xl backdrop-blur-xs transition-colors border border-white/20"
              >
                Outerwear Series
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800/80 text-xs text-slate-400">
              <div>
                <p className="text-xl font-bold font-mono text-white">480 GSM</p>
                <p className="text-slate-400 mt-0.5">Custom Knit French Terry</p>
              </div>
              <div>
                <p className="text-xl font-bold font-mono text-white">100%</p>
                <p className="text-slate-400 mt-0.5">Organic Long-Staple</p>
              </div>
              <div>
                <p className="text-xl font-bold font-mono text-white">48 Hrs</p>
                <p className="text-slate-400 mt-0.5">Express Dispatch Across India</p>
              </div>
            </div>
          </div>

          {/* Hero Photography Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 group">
              <img
                src={HERO_BANNER_IMAGE}
                alt="WEARLIX Campaign 2026"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
                <div>
                  <span className="text-xs uppercase font-bold text-blue-400 tracking-wider">LOOKBOOK 01</span>
                  <h3 className="text-lg font-bold text-white">Aura Melton Bomber & Atelier Trench Series</h3>
                  <p className="text-xs text-slate-300 mt-1">Available in limited batch production.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar (India Delivery, Easy Returns, Authentic, COD) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-12">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#155EEF] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Free Express Shipping</h4>
              <p className="text-xs text-slate-500">Across India on all orders over ₹999</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#155EEF] flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">7-Day Free Exchange</h4>
              <p className="text-xs text-slate-500">Hassle-free doorstep size swap</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#155EEF] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Cash on Delivery</h4>
              <p className="text-xs text-slate-500">Available across 27,000+ PIN codes</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#155EEF] flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Runway Standard</h4>
              <p className="text-xs text-slate-500">Zero fast-fashion compromise</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF]">COLLECTIONS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-[#155EEF] hover:text-blue-700 flex items-center gap-1 group"
          >
            <span>View Complete Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map(cat => (
            <Link
              key={cat.name}
              to={cat.path}
              className="group relative rounded-xl overflow-hidden bg-slate-900 aspect-[3/4] flex flex-col justify-end p-4 border border-slate-200 hover:shadow-xl transition-all"
            >
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-blue-300 tracking-wider uppercase block">
                  {cat.tag}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors mt-0.5 leading-snug">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF]">MOST COVETED</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Best Sellers
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-[#155EEF] hover:text-blue-700 flex items-center gap-1 group"
          >
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </section>

      {/* 5. Special Editorial Feature Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#101828] text-white rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-slate-800 shadow-xl">
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
            <span className="text-xs uppercase font-bold text-[#155EEF] tracking-widest">
              ATELIER ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              The 480 GSM French Terry Standard.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              We spent 14 months calibrating the yarn tension of our loopback cotton. It is dense without feeling rigid, pre-shrunk to withstand repeated washing, and constructed with zero flimsy synthetic fillers.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#155EEF]" />
                <span>Double-layered crossover hood without metallic cord eyelets</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#155EEF]" />
                <span>Heavy-duty 2x2 ribbing on cuffs with elastane memory recovery</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#155EEF]" />
                <span>Clean drop shoulder drape tailored for both men & women</span>
              </div>
            </div>
            <div className="pt-4 flex gap-4">
              <Link
                to="/category/hoodies"
                className="bg-[#155EEF] hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors shadow-md"
              >
                Shop 480 GSM Hoodies
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 relative min-h-[340px] bg-slate-900">
            <img
              src={HOODIE_IMAGE}
              alt="Apex 480GSM Hoodie"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* 6. New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF]">FRESH OFF PRODUCTION</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-[#155EEF] hover:text-blue-700 flex items-center gap-1 group"
          >
            <span>See All New Arrivals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </section>

      {/* 7. Trending Streetwear & Denim */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF]">COMMUNITY PICKS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Trending Now
            </h2>
          </div>
          <Link
            to="/category/jeans"
            className="text-xs font-bold text-[#155EEF] hover:text-blue-700 flex items-center gap-1 group"
          >
            <span>View Denim</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </section>

      {/* 8. Customer Reviews & Community Social Proof */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF]">VERIFIED REVIEWS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Worn by over 25,000+ creators across India.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Uncompromising quality tested in real climates from Delhi winter winds to Mumbai monsoon humidity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  "The Aura Wool & Leather Bomber is genuinely runway grade. The leather feel on the sleeves is silky, the ribbing has actual tension, and it feels like a ₹25,000 piece."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">Arjun Verma</h4>
                  <p className="text-slate-400">Mumbai · Verified Buyer</p>
                </div>
                <span className="text-[#155EEF] font-semibold text-[11px]">Aura Bomber Jacket</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  "Finally an Indian brand delivering true heavyweight loopback cotton without tacky loud graphics. Clean tonal embroidery and the crossover hood is architectural perfection."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">Siddharth Rao</h4>
                  <p className="text-slate-400">Bengaluru · Verified Buyer</p>
                </div>
                <span className="text-[#155EEF] font-semibold text-[11px]">Cobalt 480GSM Hoodie</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  "Ordered the Atelier Minimal Trench for Delhi Fashion Week. The drape is effortless and the fabric is substantial enough for winter evenings. Doorstep delivery took 2 days."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">Priya Sharma</h4>
                  <p className="text-slate-400">New Delhi · Verified Buyer</p>
                </div>
                <span className="text-[#155EEF] font-semibold text-[11px]">Atelier Trench</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
