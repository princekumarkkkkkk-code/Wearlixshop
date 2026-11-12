import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#101828] text-white border-t border-slate-800">
      {/* Newsletter Strip */}
      <div className="border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#155EEF] font-bold">WEARLIX INSIDER</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">
                Unlock exclusive drops and private sales.
              </h3>
              <p className="text-sm text-slate-400 mt-2">
                Receive curated styling edits, early access to new releases, and an instant ₹500 welcome voucher.
              </p>
            </div>
            <div>
              {subscribed ? (
                <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-200 px-4 py-3 rounded-xl flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-sm font-medium">Welcome to WEARLIX Insider! Check your inbox for your exclusive ₹500 voucher.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 px-4 py-3 rounded-xl focus:outline-none focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF]"
                  />
                  <button
                    type="submit"
                    className="bg-[#155EEF] hover:bg-blue-600 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors flex items-center gap-2 shrink-0"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
              <p className="text-[11px] text-slate-500 mt-2">
                By subscribing, you agree to our <Link to="/privacy-policy" className="underline hover:text-slate-300">Privacy Policy</Link>. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-black tracking-tight text-white">WEARLIX</span>
              <p className="text-[10px] tracking-widest text-[#155EEF] font-bold uppercase mt-0.5">
                YOUR STYLE. YOUR RULES.
              </p>
            </Link>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed max-w-sm">
              Engineered in India for discerning individuals. We design heavyweight essentials, architectural outerwear, and precision denim that command attention without demanding validation.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-400">
              <div>
                <span className="text-white font-medium">Headquarters:</span> Mumbai & New Delhi
              </div>
              <span className="text-slate-600">·</span>
              <div>
                <span className="text-white font-medium">Currency:</span> INR (₹)
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">Shop Collections</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/category/men" className="hover:text-white transition-colors">Men's Apparel</Link></li>
              <li><Link to="/category/women" className="hover:text-white transition-colors">Women's Collection</Link></li>
              <li><Link to="/category/kids" className="hover:text-white transition-colors">Junior & Kids</Link></li>
              <li><Link to="/category/jackets" className="hover:text-white transition-colors">Outerwear & Jackets</Link></li>
              <li><Link to="/category/hoodies" className="hover:text-white transition-colors">480 GSM Hoodies</Link></li>
              <li><Link to="/category/shirts" className="hover:text-white transition-colors">Tailored Shirts</Link></li>
              <li><Link to="/category/jeans" className="hover:text-white transition-colors">Japanese Selvedge Denim</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors font-medium text-blue-400">All Products</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">Client Services</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/track-order" className="hover:text-white transition-colors">Track Your Order</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">My Profile & Orders</Link></li>
              <li><Link to="/return-policy" className="hover:text-white transition-colors">Easy Returns & Exchanges</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Concierge</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Our Atelier</Link></li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">Policies & Legal</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/return-policy" className="hover:text-white transition-colors">Shipping & Return Terms</Link></li>
              <li><Link to="/admin" className="hover:text-[#155EEF] transition-colors font-semibold text-slate-300">Merchant Admin UI</Link></li>
            </ul>
          </div>
        </div>

        {/* Payment & Trust Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="font-medium text-slate-300">Accepted Payment Methods:</span>
            <div className="flex items-center gap-2 font-mono text-[11px] bg-slate-900 px-3 py-1.5 rounded border border-slate-800">
              <span className="text-blue-400 font-bold">UPI</span>
              <span>·</span>
              <span className="text-emerald-400 font-bold">RuPay</span>
              <span>·</span>
              <span>Visa</span>
              <span>·</span>
              <span>Mastercard</span>
              <span>·</span>
              <span>NetBanking</span>
              <span>·</span>
              <span className="text-amber-400">Cash on Delivery</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 text-center md:text-right">
            © 2026 WEARLIX Retail India Pvt Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
