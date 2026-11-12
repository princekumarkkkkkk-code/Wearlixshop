import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { HERO_BANNER_IMAGE, JACKET_IMAGE, HOODIE_IMAGE } from '../data/mockData';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#155EEF]">OUR MANIFESTO</span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2">
          YOUR STYLE. YOUR RULES.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
          WEARLIX was founded on a singular conviction: luxury streetwear should not rely on disposable hype or synthetic fast-fashion shortcuts.
        </p>
      </div>

      <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border border-slate-200">
        <img
          src={HERO_BANNER_IMAGE}
          alt="WEARLIX Atelier"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <span className="text-xs font-bold text-[#155EEF] uppercase">01. HEAVYWEIGHT FABRICS</span>
          <h3 className="text-lg font-bold text-slate-900 mt-2">480 GSM Cotton Knit</h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            We source 100% long-staple organic cotton knitted on custom circular looms to achieve a dense, structured drape that maintains shape year after year.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <span className="text-xs font-bold text-[#155EEF] uppercase">02. RUNWAY PATTERNS</span>
          <h3 className="text-lg font-bold text-slate-900 mt-2">Architectural Cuts</h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Every garment pattern is drafted in our Mumbai design studio with dropped shoulders, ergonomic armhole pitches, and balanced hemlines.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <span className="text-xs font-bold text-[#155EEF] uppercase">03. ETHICAL INTEGRITY</span>
          <h3 className="text-lg font-bold text-slate-900 mt-2">Fair Indian Manufacturing</h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Crafted in certified facilities across Tirupur, Ludhiana, and Mumbai with safe working conditions, living wages, and zero toxic chemical runoff.
          </p>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-[#155EEF]">CONCIERGE DESK</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">Get in Touch with WEARLIX</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Our styling advisory and client services teams are here to assist you Monday through Saturday, 9:00 AM to 7:00 PM IST.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#155EEF] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Mumbai Atelier & Flagship</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Level 4, The Grand Palladium, 175 CST Road, Kalina, Santacruz East, Mumbai, Maharashtra 400098
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#155EEF] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Email Inquiries</h4>
                <p className="text-xs text-slate-600 mt-1">
                  General & Orders: <strong className="text-slate-900 font-mono">care@wearlix.in</strong><br />
                  Press & VIP Drops: <strong className="text-slate-900 font-mono">atelier@wearlix.in</strong>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#155EEF] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Telephone & WhatsApp</h4>
                <p className="text-xs text-slate-600 mt-1 font-mono">
                  +91 (022) 6902-8800<br />
                  +91 98201 44820 (Direct WhatsApp Concierge)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Message Received</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you for reaching out. A dedicated stylist or fulfillment manager will respond within 4 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-[#155EEF] hover:underline pt-2 inline-block"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 mb-2">Send a Message</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#155EEF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#155EEF]"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Order query, sizing advice, wholesale..."
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#155EEF]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#155EEF]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#155EEF] hover:bg-blue-600 text-white font-bold text-xs py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How fast do orders ship within India?',
      a: 'All orders placed before 2:00 PM IST are dispatched on the same business day from our primary Mumbai or Delhi fulfillment centers. Metro deliveries arrive within 24 to 48 hours via Blue Dart Air Express. Non-metro cities take 2 to 4 business days.'
    },
    {
      q: 'Is Cash on Delivery (COD) supported?',
      a: 'Yes, Cash on Delivery is available across 27,000+ PIN codes in India for orders up to ₹15,000. You can pay cash or scan the courier delivery agent’s dynamic UPI QR code on arrival.'
    },
    {
      q: 'How does the 7-day doorstep size exchange work?',
      a: 'If a garment doesn’t fit your intended silhouette, you can request an exchange through your account or our WhatsApp concierge within 7 days of delivery. Our courier will bring the replacement size and pick up the original item simultaneously.'
    },
    {
      q: 'What does 480 GSM French Terry mean?',
      a: 'GSM stands for Grams per Square Meter. Standard hoodies are typically 260–320 GSM with synthetic fleece inside. WEARLIX custom hoodies are 480 GSM 100% loopback cotton—offering unmatched structural weight, thermal breathability, and zero interior lint shedding.'
    },
    {
      q: 'How do I care for 14.5oz Japanese Selvedge Denim?',
      a: 'We recommend wearing your selvedge jeans unwashed for the first 3 to 6 months to form personalized honeycombs and whiskers. When washing, turn inside out, soak in cold water with mild detergent, and line dry in the shade.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#155EEF]">ANSWERS</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">Frequently Asked Questions</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">Everything you need to know about purchasing, shipping, and styling WEARLIX garments.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
          >
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-[#155EEF] transition-colors"
            >
              <span>{faq.q}</span>
              <span className="font-mono text-lg text-slate-400">{openIdx === i ? '−' : '+'}</span>
            </button>
            {openIdx === i && (
              <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <span className="text-xs font-bold uppercase tracking-widest text-[#155EEF]">LEGAL NOTICE</span>
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Privacy Policy</h1>
      <p className="text-xs text-slate-400 mt-1">Effective Date: November 2026 · Compliant with Digital Personal Data Protection Act (DPDPA)</p>

      <div className="mt-8 space-y-6 text-xs text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            When you purchase from WEARLIX, we collect personal information you provide such as your full name, shipping destination address, email address, and mobile phone number for logistics coordination.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">2. Payment Security & Tokenization</h2>
          <p>
            We do not store your full debit/credit card numbers or UPI PINs on our servers. All online transactions are handled through certified Level 1 PCI-DSS compliant gateways (such as Razorpay) using end-to-end tokenization.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">3. SMS & WhatsApp Notifications</h2>
          <p>
            By placing an order, you consent to receive transactional updates regarding dispatch, courier tracking links, and doorstep delivery OTPs via Blue Dart / Delhivery courier partner APIs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">4. Your Data Rights</h2>
          <p>
            You may request deletion of your account or review your order archive at any time by contacting privacy@wearlix.in.
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <span className="text-xs font-bold uppercase tracking-widest text-[#155EEF]">TERMS OF USE</span>
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Terms & Conditions</h1>
      <p className="text-xs text-slate-400 mt-1">Last Updated: November 2026</p>

      <div className="mt-8 space-y-6 text-xs text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or ordering from WEARLIX (wearlix.in), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and applicable Indian laws.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">2. Pricing & GST</h2>
          <p>
            All listed prices are denominated in Indian Rupees (INR ₹) and are inclusive of Goods and Services Tax (GST) as mandated by the Government of India.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">3. Intellectual Property</h2>
          <p>
            All designs, photography, branding, trademarks, and typography appearing on this platform are the exclusive intellectual property of WEARLIX Retail India Pvt Ltd.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">4. Governing Law & Jurisdiction</h2>
          <p>
            Any disputes arising out of or in connection with orders shall be subject to the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra.
          </p>
        </section>
      </div>
    </div>
  );
};

export const ReturnPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <span className="text-xs font-bold uppercase tracking-widest text-[#155EEF]">RETURNS & SWAPS</span>
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Return & Exchange Policy</h1>
      <p className="text-xs text-slate-400 mt-1">7-Day Free Doorstep Return & Exchange Program</p>

      <div className="mt-8 space-y-6 text-xs text-slate-700 leading-relaxed">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-blue-950 space-y-2">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-[#155EEF]" />
            <span>Zero-Friction Exchange Promise</span>
          </h3>
          <p>
            We want you to love your silhouette. If the sizing is not 100% ideal, we arrange a reverse pickup at zero additional cost to you.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">1. Eligibility Criteria</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Item must be initiated for return within 7 calendar days of confirmed delivery.</li>
            <li>Garments must be unworn, unwashed, and returned with original woven WEARLIX tags intact.</li>
            <li>Original dust bags or garment protectors must be handed over to the courier.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">2. Refund Timeline</h2>
          <p>
            Once our fulfillment team receives and inspects the return package (typically within 48 hours of pickup), the refund is processed directly to your original payment method (or Bank Account/UPI for Cash on Delivery orders).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900">3. How to Initiate</h2>
          <p>
            Log in to your account, head to <Link to="/orders" className="text-[#155EEF] font-bold hover:underline">My Orders</Link>, click "Request Return/Exchange" on any delivered garment, or WhatsApp our concierge directly at +91 98201 44820 with your Order Reference ID.
          </p>
        </section>
      </div>
    </div>
  );
};
