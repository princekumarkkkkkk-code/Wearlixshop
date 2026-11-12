import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  MapPin,
  Lock,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { RazorpayModal } from '../components/common/RazorpayModal';
import { Address } from '../types';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, subtotal, discount, shippingFee, total, clearCart, appliedCoupon } = useCart();
  const { user, isAuthenticated, saveAddress } = useAuth();
  const { createOrder } = useOrders();

  // Pick default address if available
  const defaultAddr = user?.addresses.find(a => a.isDefault) || user?.addresses[0];

  const [formData, setFormData] = useState({
    fullName: defaultAddr?.fullName || user?.name || '',
    email: defaultAddr?.email || user?.email || '',
    phone: defaultAddr?.phone || user?.phone || '',
    street: defaultAddr?.street || '',
    city: defaultAddr?.city || '',
    state: defaultAddr?.state || 'Maharashtra',
    pinCode: defaultAddr?.pinCode || '',
    notes: '',
    saveThisAddress: true
  });

  const [paymentMethod, setPaymentMethod] = useState<'Online Payment' | 'Cash on Delivery'>('Online Payment');
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const indianStates = [
    'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Gujarat',
    'Haryana', 'Uttar Pradesh', 'West Bengal', 'Rajasthan', 'Kerala', 'Punjab'
  ];

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required.';
    if (!formData.email.includes('@')) errors.email = 'Valid email address is required.';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = '10-digit mobile number is required.';
    if (!formData.street.trim()) errors.street = 'Delivery address street is required.';
    if (!formData.city.trim()) errors.city = 'City is required.';
    if (!formData.pinCode.trim() || formData.pinCode.length < 6) errors.pinCode = '6-digit PIN code is required.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrderClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (paymentMethod === 'Online Payment') {
      setIsRazorpayOpen(true);
    } else {
      finalizeOrder('Cash on Delivery');
    }
  };

  const finalizeOrder = (method: 'Online Payment' | 'Cash on Delivery') => {
    const shippingAddress: Address = {
      id: `addr-${Date.now()}`,
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      pinCode: formData.pinCode
    };

    if (formData.saveThisAddress && isAuthenticated) {
      saveAddress(shippingAddress);
    }

    const orderItems = cart.map(item => ({
      productId: item.productId,
      productName: item.product.name,
      image: item.product.images[0],
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      price: item.price
    }));

    const order = createOrder({
      customer: {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone
      },
      shippingAddress,
      items: orderItems,
      subtotal,
      discount,
      shippingFee,
      total,
      paymentMethod: method,
      notes: formData.notes
    });

    clearCart();
    setConfirmedOrder(order);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  if (confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xl">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">ORDER CONFIRMED</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Thank you, {confirmedOrder.customer.name}!</h1>
          <p className="text-sm text-slate-500 mt-2">
            Your WEARLIX order has been recorded and will be packed in our custom luxury garment bag.
          </p>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 my-8 text-left space-y-3 text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-slate-500">Order ID (Tracking Reference):</span>
              <span className="font-mono font-bold text-base text-[#155EEF]">{confirmedOrder.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Payment Status:</span>
              <span className="font-bold text-slate-900">{confirmedOrder.paymentMethod} ({confirmedOrder.paymentStatus})</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Total Paid:</span>
              <span className="font-mono font-bold text-slate-900">₹{confirmedOrder.total.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-start pt-2 border-t border-slate-200">
              <span className="text-slate-500">Shipping To:</span>
              <span className="text-right text-slate-800 font-medium max-w-xs">
                {confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state} - {confirmedOrder.shippingAddress.pinCode}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={`/track-order/${confirmedOrder.id}`}
              className="bg-[#155EEF] hover:bg-blue-600 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Track Live Delivery Timeline</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/shop"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-6 py-3.5 rounded-xl transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Your bag is empty</h2>
        <p className="text-xs text-slate-500 mt-2 mb-6">Add products to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="bg-[#155EEF] text-white text-xs font-bold px-6 py-3 rounded-xl">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link to="/cart" className="hover:underline">Cart</Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold">Express Checkout</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Shipping & Payment Form */}
        <div className="lg:col-span-7 space-y-8">
          {/* Shipping Address */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#155EEF]" />
                <span>1. Shipping & Contact Details</span>
              </h2>
              {isAuthenticated && (
                <span className="text-xs text-slate-400">Authenticated Client</span>
              )}
            </div>

            {/* Quick autofill address button if user has saved addresses */}
            {user && user.addresses.length > 0 && (
              <div className="mb-6 p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
                <p className="text-xs font-semibold text-blue-900 mb-2">Saved Addresses (Click to Autofill):</p>
                <div className="flex flex-wrap gap-2">
                  {user.addresses.map(a => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        fullName: a.fullName,
                        email: a.email,
                        phone: a.phone,
                        street: a.street,
                        city: a.city,
                        state: a.state,
                        pinCode: a.pinCode
                      })}
                      className="text-[11px] font-medium bg-white hover:bg-blue-100/60 border border-blue-200 text-slate-800 px-3 py-1.5 rounded-lg text-left"
                    >
                      {a.fullName} - {a.city} ({a.pinCode})
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handlePlaceOrderClick} id="checkout-form" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Customer Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Aditya Singhania"
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#155EEF]"
                  />
                  {formErrors.fullName && <p className="text-[11px] text-red-600 mt-1">{formErrors.fullName}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Mobile Number (For Courier OTP) *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98201 44820"
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#155EEF]"
                  />
                  {formErrors.phone && <p className="text-[11px] text-red-600 mt-1">{formErrors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address (Order Confirmation) *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="aditya@singhania.com"
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#155EEF]"
                />
                {formErrors.email && <p className="text-[11px] text-red-600 mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Street Address, Flat / Building No. *</label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={e => setFormData({ ...formData, street: e.target.value })}
                  placeholder="Flat 402, Sea Crest Towers, Worli Sea Face"
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#155EEF]"
                />
                {formErrors.street && <p className="text-[11px] text-red-600 mt-1">{formErrors.street}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Mumbai"
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#155EEF]"
                  />
                  {formErrors.city && <p className="text-[11px] text-red-600 mt-1">{formErrors.city}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">State *</label>
                  <select
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#155EEF]"
                  >
                    {indianStates.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">PIN Code *</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.pinCode}
                    onChange={e => setFormData({ ...formData, pinCode: e.target.value })}
                    placeholder="400018"
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:outline-none focus:border-[#155EEF]"
                  />
                  {formErrors.pinCode && <p className="text-[11px] text-red-600 mt-1">{formErrors.pinCode}</p>}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Delivery Instructions / Landmarks (Optional)</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Leave package with security reception if unavailable"
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#155EEF]"
                />
              </div>

              {isAuthenticated && (
                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="saveAddressCheckbox"
                    checked={formData.saveThisAddress}
                    onChange={e => setFormData({ ...formData, saveThisAddress: e.target.checked })}
                    className="w-4 h-4 rounded text-[#155EEF]"
                  />
                  <label htmlFor="saveAddressCheckbox" className="text-xs text-slate-700">
                    Save this address to my WEARLIX profile for fast reordering
                  </label>
                </div>
              )}
            </form>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-4 border-b border-slate-100 mb-6">
              <CreditCard className="w-5 h-5 text-[#155EEF]" />
              <span>2. Select Payment Method</span>
            </h2>

            <div className="space-y-3">
              {/* Online Payment */}
              <label
                onClick={() => setPaymentMethod('Online Payment')}
                className={`flex items-start justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'Online Payment'
                    ? 'border-[#155EEF] bg-blue-50/40'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'Online Payment'}
                    onChange={() => setPaymentMethod('Online Payment')}
                    className="mt-1 text-[#155EEF]"
                  />
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">Online Payment (UPI, Cards, NetBanking)</span>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Secure checkout via UPI (Google Pay, PhonePe, Paytm), RuPay, Visa, Mastercard, and Netbanking.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  <span>Fastest</span>
                </div>
              </label>

              {/* Cash on Delivery */}
              <label
                onClick={() => setPaymentMethod('Cash on Delivery')}
                className={`flex items-start justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-[#155EEF] bg-blue-50/40'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={() => setPaymentMethod('Cash on Delivery')}
                    className="mt-1 text-[#155EEF]"
                  />
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">Cash on Delivery (COD)</span>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Pay in cash or UPI scan at your doorstep upon receiving the parcel.
                    </p>
                  </div>
                </div>
                <Banknote className="w-5 h-5 text-slate-400 mt-1" />
              </label>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs sticky top-28 space-y-4">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Order Breakdown ({cart.length} items)
            </h3>

            {/* List items mini preview */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-14 object-cover rounded-lg bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{item.product.name}</p>
                    <p className="text-slate-500 text-[11px]">Size: {item.size} · Color: {item.color}</p>
                    <p className="text-slate-400 text-[11px]">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-slate-600 pt-4 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-mono tabular-nums text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Voucher ({appliedCoupon?.code})</span>
                  <span className="font-mono tabular-nums">-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Charges</span>
                <span className="font-mono tabular-nums text-slate-900">
                  {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE (Above ₹999)</span> : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 border-t border-slate-200 pt-3">
                <span>Payable Total</span>
                <span className="font-mono tabular-nums text-xl text-[#155EEF]">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              form="checkout-form"
              className="w-full bg-[#155EEF] hover:bg-blue-600 text-white font-bold text-sm py-4 px-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group"
            >
              <Lock className="w-4 h-4" />
              <span>
                {paymentMethod === 'Online Payment'
                  ? `Pay ₹${total.toLocaleString('en-IN')} via Razorpay Interface`
                  : `Confirm Cash on Delivery Order`}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-slate-400 text-[11px] pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>256-bit encryption · Official India GST invoice generated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay Interface Modal */}
      <RazorpayModal
        isOpen={isRazorpayOpen}
        amount={total}
        customerName={formData.fullName}
        customerEmail={formData.email}
        customerPhone={formData.phone}
        onCancel={() => setIsRazorpayOpen(false)}
        onSuccess={() => {
          setIsRazorpayOpen(false);
          finalizeOrder('Online Payment');
        }}
      />
    </div>
  );
};
