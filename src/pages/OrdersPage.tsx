import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Clock, ShieldCheck, ArrowRight, RotateCcw, XCircle, Eye } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { Order, OrderStatus } from '../types';

export const OrdersPage: React.FC = () => {
  const { orders, cancelOrder, requestReturn } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [returnModalOrder, setReturnModalOrder] = useState<Order | null>(null);
  const [returnReason, setReturnReason] = useState('Size was slightly smaller than expected');
  const [cancelNotice, setCancelNotice] = useState<string | null>(null);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Shipped':
      case 'Out for Delivery':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Processing':
      case 'Packed':
      case 'Confirmed':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Returned':
      case 'Refunded':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const handleCancel = (orderId: string) => {
    if (window.confirm(`Are you sure you want to cancel order ${orderId}?`)) {
      cancelOrder(orderId);
      setCancelNotice(`Order ${orderId} has been successfully cancelled.`);
      setTimeout(() => setCancelNotice(null), 4000);
    }
  };

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnModalOrder) return;
    requestReturn(returnModalOrder.id, returnReason);
    setReturnModalOrder(null);
    setCancelNotice(`Return initiated for ${returnModalOrder.id}. Courier pickup scheduled.`);
    setTimeout(() => setCancelNotice(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF]">PURCHASE HISTORY</span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            My Orders ({orders.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track dispatches, download invoices, and initiate size exchanges.
          </p>
        </div>
        <Link
          to="/track-order"
          className="self-start sm:self-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-xs flex items-center gap-2"
        >
          <Clock className="w-4 h-4" />
          <span>Track Order by ID</span>
        </Link>
      </div>

      {cancelNotice && (
        <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-medium">
          {cancelNotice}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center my-8">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Package className="w-8 h-8 stroke-1" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No orders placed yet</h3>
          <p className="text-xs text-slate-500 mt-1 mb-6">Explore our latest drops to elevate your personal style.</p>
          <Link
            to="/shop"
            className="bg-[#155EEF] hover:bg-blue-600 text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-md inline-flex items-center gap-2"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6 mt-8">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden hover:border-slate-300 transition-all"
            >
              {/* Card Header */}
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <span className="text-slate-400 block text-[11px]">ORDER PLACED</span>
                    <span className="font-semibold text-slate-800 font-mono">
                      {new Date(order.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">TOTAL AMOUNT</span>
                    <span className="font-mono font-bold text-slate-900">
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">ORDER REFERENCE</span>
                    <span className="font-mono font-bold text-[#155EEF]">{order.id}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                  <Link
                    to={`/track-order/${order.id}`}
                    className="bg-[#155EEF] hover:bg-blue-600 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>Track</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Items in this Order */}
              <div className="p-6 divide-y divide-slate-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.productName}
                        referrerPolicy="no-referrer"
                        className="w-16 h-20 object-cover rounded-xl bg-slate-100 shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{item.productName}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Size: <span className="font-semibold text-slate-800">{item.size}</span> · Color: <span className="font-semibold text-slate-800">{item.color}</span> · Qty: <span className="font-mono font-semibold">{item.quantity}</span>
                        </p>
                        <p className="text-xs font-mono font-bold text-slate-900 mt-1">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-xs text-[#155EEF] hover:underline font-semibold"
                      >
                        Buy Again
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer Actions */}
              <div className="bg-slate-50/50 px-6 py-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-slate-500">
                  Shipped via: <strong className="text-slate-700">{order.courierName || 'Blue Dart Air'}</strong> ({order.trackingNumber || 'Pending'})
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-slate-700 hover:text-slate-900 font-semibold"
                  >
                    View Invoice Breakdown
                  </button>

                  {order.orderStatus === 'Delivered' && (
                    <button
                      onClick={() => setReturnModalOrder(order)}
                      className="text-purple-700 hover:underline font-semibold flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Request Return/Exchange</span>
                    </button>
                  )}

                  {['Confirmed', 'Pending', 'Processing'].includes(order.orderStatus) && (
                    <button
                      onClick={() => handleCancel(order.id)}
                      className="text-red-600 hover:underline font-semibold"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invoice Breakdown Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSelectedOrder(null)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 z-10 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">RECEIPT BREAKDOWN</span>
                <h3 className="text-base font-bold text-slate-900 font-mono">{selectedOrder.id}</h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-900">
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal ({selectedOrder.items.length} items)</span>
                <span className="font-mono text-slate-900">₹{selectedOrder.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount Applied</span>
                  <span className="font-mono">-₹{selectedOrder.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping & Express Handling</span>
                <span className="font-mono text-slate-900">
                  {selectedOrder.shippingFee === 0 ? 'FREE' : `₹${selectedOrder.shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 border-t border-slate-200 pt-2">
                <span>Total Paid / Payable</span>
                <span className="font-mono text-[#155EEF]">₹{selectedOrder.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400">
              Payment mode: <strong className="text-slate-700">{selectedOrder.paymentMethod}</strong> ({selectedOrder.paymentStatus})
            </div>
          </div>
        </div>
      )}

      {/* Return Request Modal */}
      {returnModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setReturnModalOrder(null)} />
          <form
            onSubmit={handleReturnSubmit}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 z-10 border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-purple-600" />
                <span>Return / Exchange Request</span>
              </h3>
              <button type="button" onClick={() => setReturnModalOrder(null)} className="text-slate-400">
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Initiating 7-day hassle-free doorstep pickup for order <strong className="font-mono text-slate-900">{returnModalOrder.id}</strong>.
            </p>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Select Reason for Return</label>
              <select
                value={returnReason}
                onChange={e => setReturnReason(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="Size too small, need replacement size">Size too small, need replacement size</option>
                <option value="Size too large, need replacement size">Size too large, need replacement size</option>
                <option value="Fabric or styling not as expected">Fabric or styling not as expected</option>
                <option value="Ordered multiple sizes to try">Ordered multiple sizes to try</option>
                <option value="Defect or stitching issue">Defect or stitching issue</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs"
              >
                Confirm Return Pickup
              </button>
              <button
                type="button"
                onClick={() => setReturnModalOrder(null)}
                className="bg-slate-100 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
