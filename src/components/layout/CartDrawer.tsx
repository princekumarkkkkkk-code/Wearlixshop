import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shippingFee,
    freeShippingThreshold,
    freeShippingRemaining,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    isCartDrawerOpen,
    setIsCartDrawerOpen
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput.trim());
    if (res.success) {
      setCouponFeedback({ type: 'success', text: res.message });
      setCouponInput('');
    } else {
      setCouponFeedback({ type: 'error', text: res.message });
    }
  };

  const progressPercent = Math.min(100, Math.round(((freeShippingThreshold - freeShippingRemaining) / freeShippingThreshold) * 100));

  const proceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#155EEF]" />
              <h2 className="text-lg font-bold text-slate-900">Your Shopping Bag</h2>
              <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-mono">
                {cart.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-slate-50 px-4 sm:px-6 py-3 border-b border-slate-200">
            <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
              <span>
                {freeShippingRemaining === 0 ? (
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Unlocked: Free Express Shipping!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-slate-900 font-mono">₹{freeShippingRemaining.toLocaleString('en-IN')}</strong> for FREE delivery
                  </span>
                )}
              </span>
              <span className="text-slate-400 font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  freeShippingRemaining === 0 ? 'bg-emerald-500' : 'bg-[#155EEF]'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Your bag is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mt-1 mb-6">
                  Explore our luxury streetwear jackets, heavyweight hoodies, and Japanese selvedge denim.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="bg-[#155EEF] hover:bg-blue-600 text-white text-xs font-semibold px-6 py-2.5 rounded-lg transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-slate-100 shadow-xs hover:border-slate-200 transition-all"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover rounded-lg bg-slate-100 shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-slate-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-red-500 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="font-medium bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                          Size: {item.size}
                        </span>
                        <span className="font-medium bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                          Color: {item.color}
                        </span>
                      </div>
                    </div>

                    {/* Stepper & Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-slate-800 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 space-y-4">
              {/* Coupon Form */}
              <div className="space-y-1.5">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-blue-50 border border-blue-200 text-blue-900 px-3 py-2 rounded-lg text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-[#155EEF]" />
                      <span>
                        Coupon <strong>{appliedCoupon.code}</strong> applied (-₹{discount.toLocaleString('en-IN')})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-blue-700 hover:text-red-600 font-semibold underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={e => {
                        setCouponInput(e.target.value);
                        setCouponFeedback(null);
                      }}
                      placeholder="Coupon code (e.g. WEARLIX10)"
                      className="flex-1 bg-white border border-slate-200 text-xs px-3 py-2 rounded-lg uppercase tracking-wider font-mono focus:outline-none focus:border-[#155EEF]"
                    />
                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponFeedback && (
                  <p
                    className={`text-[11px] ${
                      couponFeedback.type === 'error' ? 'text-red-600' : 'text-emerald-600'
                    }`}
                  >
                    {couponFeedback.text}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono tabular-nums text-slate-900">
                    {shippingFee === 0 ? <span className="text-emerald-600 font-medium">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 border-t border-slate-200 pt-2">
                  <span>Estimated Total</span>
                  <span className="font-mono tabular-nums text-base text-[#155EEF]">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={proceedToCheckout}
                  className="w-full bg-[#155EEF] hover:bg-blue-600 text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full text-center text-xs font-semibold text-slate-600 hover:text-slate-900 py-1.5"
                >
                  View Full Cart & Bag Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
