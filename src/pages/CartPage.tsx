import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    updateVariant,
    subtotal,
    discount,
    shippingFee,
    freeShippingThreshold,
    freeShippingRemaining,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode.trim());
    if (res.success) {
      setFeedback({ type: 'success', text: res.message });
      setCouponCode('');
    } else {
      setFeedback({ type: 'error', text: res.message });
    }
  };

  const progressPercent = Math.min(100, Math.round(((freeShippingThreshold - freeShippingRemaining) / freeShippingThreshold) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF]">CHECKOUT BAG</span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Shopping Cart ({cart.length} items)
          </h1>
        </div>
        <Link to="/shop" className="text-xs font-bold text-[#155EEF] hover:underline flex items-center gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center my-8">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <ShoppingBag className="w-10 h-10 stroke-1" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Your shopping bag is completely empty</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-2 mb-6">
            Explore our curated collections of streetwear bomber jackets, heavyweight hoodies, and selvedge denim.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#155EEF] hover:bg-blue-600 text-white font-semibold text-xs px-6 py-3 rounded-xl transition-all shadow-md"
          >
            <span>Browse Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8">
          {/* Items Table / List */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free shipping banner */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                <span>
                  {freeShippingRemaining === 0 ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" />
                      Free Express Delivery Unlocked!
                    </span>
                  ) : (
                    <span>
                      Add items worth <strong className="text-slate-900 font-mono">₹{freeShippingRemaining.toLocaleString('en-IN')}</strong> to unlock FREE shipping
                    </span>
                  )}
                </span>
                <span className="text-slate-500 font-mono">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${freeShippingRemaining === 0 ? 'bg-emerald-500' : 'bg-[#155EEF]'}`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs">
              {cart.map(item => (
                <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                  {/* Left: image & info */}
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-24 object-cover rounded-xl bg-slate-100 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {item.product.category}
                      </span>
                      <Link to={`/product/${item.productId}`} className="text-sm font-bold text-slate-900 hover:text-[#155EEF] transition-colors block">
                        {item.product.name}
                      </Link>

                      {/* Variant Pickers */}
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                        <div className="flex items-center gap-1 text-slate-600">
                          <span className="font-semibold text-slate-400">Size:</span>
                          <select
                            value={item.size}
                            onChange={e => updateVariant(item.id, e.target.value, item.color)}
                            className="bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-xs font-semibold text-slate-800"
                          >
                            {item.product.sizes.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center gap-1 text-slate-600">
                          <span className="font-semibold text-slate-400">Color:</span>
                          <select
                            value={item.color}
                            onChange={e => updateVariant(item.id, item.size, e.target.value)}
                            className="bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-xs font-semibold text-slate-800"
                          >
                            {item.product.colors.map(c => (
                              <option key={c.name} value={c.name}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Quantity Stepper, Price, Remove */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-slate-600 hover:bg-slate-200"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold font-mono">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-slate-600 hover:bg-slate-200"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[90px]">
                      <span className="text-base font-bold font-mono text-slate-900 block tabular-nums">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        ₹{item.price.toLocaleString('en-IN')} each
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                Order Summary
              </h3>

              {/* Coupon Form */}
              <div className="space-y-2">
                {appliedCoupon ? (
                  <div className="bg-blue-50 border border-blue-200 text-blue-900 p-3 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#155EEF]" />
                      <span>Applied: <strong>{appliedCoupon.code}</strong> (-₹{discount.toLocaleString('en-IN')})</span>
                    </div>
                    <button onClick={removeCoupon} className="text-red-600 underline font-semibold text-[11px]">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={e => {
                        setCouponCode(e.target.value);
                        setFeedback(null);
                      }}
                      placeholder="Coupon Code"
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono uppercase focus:outline-none focus:border-[#155EEF]"
                    />
                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {feedback && (
                  <p className={`text-xs ${feedback.type === 'error' ? 'text-red-600' : 'text-emerald-600'}`}>
                    {feedback.text}
                  </p>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-mono tabular-nums text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Voucher Discount</span>
                    <span className="font-mono tabular-nums">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="font-mono tabular-nums text-slate-900">
                    {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-900 border-t border-slate-200 pt-3">
                  <span>Total Amount</span>
                  <span className="font-mono tabular-nums text-xl text-[#155EEF]">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#155EEF] hover:bg-blue-600 text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
