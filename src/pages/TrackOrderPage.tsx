import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  MapPin,
  Calendar,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { OrderStatus } from '../types';

export const TrackOrderPage: React.FC = () => {
  const { orderId } = useParams<{ orderId?: string }>();
  const { orders, getOrderById, updateOrderStatus } = useOrders();

  const [inputOrderId, setInputOrderId] = useState(orderId || '');
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (orderId) {
      setInputOrderId(orderId);
      const found = getOrderById(orderId);
      setCurrentOrder(found || null);
      setSearched(true);
    } else if (orders.length > 0 && !searched) {
      // Default to the first order for quick preview
      setCurrentOrder(orders[0]);
      setInputOrderId(orders[0].id);
    }
  }, [orderId, orders, getOrderById]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputOrderId.trim()) return;
    const found = getOrderById(inputOrderId.trim());
    setCurrentOrder(found || null);
    setSearched(true);
  };

  // Standard delivery stages
  const STAGES: OrderStatus[] = ['Confirmed', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

  const getStageIndex = (status: OrderStatus) => {
    return STAGES.indexOf(status);
  };

  const currentStageIndex = currentOrder ? getStageIndex(currentOrder.orderStatus) : -1;

  // Simulator helper to advance order state for demonstration
  const handleAdvanceState = () => {
    if (!currentOrder) return;
    const idx = getStageIndex(currentOrder.orderStatus);
    if (idx < STAGES.length - 1 && idx !== -1) {
      const nextStatus = STAGES[idx + 1];
      updateOrderStatus(currentOrder.id, nextStatus, `Updated to ${nextStatus} via logistics simulation.`);
      setCurrentOrder(getOrderById(currentOrder.id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#155EEF]">WEARLIX LOGISTICS</span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Track Your Shipment</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Enter your 10-digit order tracking reference starting with <strong>KZ-</strong> to view real-time transit status.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-6 flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            value={inputOrderId}
            onChange={e => setInputOrderId(e.target.value)}
            placeholder="e.g. KZ-8492019384"
            className="flex-1 text-xs font-mono font-bold uppercase p-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-[#155EEF] shadow-xs"
          />
          <button
            type="submit"
            className="bg-[#155EEF] hover:bg-blue-600 text-white font-semibold text-xs px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Track</span>
          </button>
        </form>
      </div>

      {/* Quick sample chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs text-slate-500">
        <span>Recent Demo Orders:</span>
        {orders.slice(0, 3).map(o => (
          <button
            key={o.id}
            onClick={() => {
              setInputOrderId(o.id);
              setCurrentOrder(o);
            }}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors"
          >
            {o.id} ({o.orderStatus})
          </button>
        ))}
      </div>

      {currentOrder ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl space-y-8">
          {/* Top Order Card */}
          <div className="flex flex-wrap items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">TRACKING ID</span>
              <h2 className="text-2xl font-black text-slate-900 font-mono mt-0.5">{currentOrder.id}</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Carrier: <strong className="text-slate-800">{currentOrder.courierName || 'Blue Dart Air Express'}</strong> · AWB: <strong className="font-mono text-slate-800">{currentOrder.trackingNumber || 'BD89371029IN'}</strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-blue-50 text-[#155EEF] border border-blue-200 text-xs font-bold px-3 py-1.5 rounded-full font-mono uppercase">
                {currentOrder.orderStatus}
              </span>

              {/* Demo test button to simulate progress */}
              <button
                onClick={handleAdvanceState}
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200"
                title="Simulation helper: advance to next logistical milestone"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Simulate Next Step</span>
              </button>
            </div>
          </div>

          {/* Stepper Timeline (Horizontal on desktop, vertical on mobile) */}
          {currentOrder.orderStatus !== 'Cancelled' && currentOrder.orderStatus !== 'Returned' && (
            <div className="py-4">
              <div className="relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0">
                  <div
                    className="h-full bg-[#155EEF] transition-all duration-500"
                    style={{
                      width: `${Math.max(0, (currentStageIndex / (STAGES.length - 1)) * 100)}%`
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative z-10">
                  {STAGES.map((stage, idx) => {
                    const isDone = currentStageIndex >= idx;
                    const isCurrent = currentStageIndex === idx;

                    return (
                      <div key={stage} className="flex flex-col items-center text-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                            isDone
                              ? 'bg-[#155EEF] text-white shadow-md'
                              : 'bg-white border-2 border-slate-300 text-slate-400'
                          } ${isCurrent ? 'ring-4 ring-blue-100' : ''}`}
                        >
                          {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                        </div>
                        <span className={`text-xs mt-2 font-bold ${isCurrent ? 'text-[#155EEF]' : isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                          {stage}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Special notice if Cancelled / Returned */}
          {(currentOrder.orderStatus === 'Cancelled' || currentOrder.orderStatus === 'Returned') && (
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl flex items-center gap-3 text-purple-900 text-xs">
              <AlertCircle className="w-5 h-5 text-purple-600 shrink-0" />
              <div>
                <h4 className="font-bold">Status: {currentOrder.orderStatus}</h4>
                <p>{currentOrder.returnReason || currentOrder.notes || 'Reverse logistics initiated.'}</p>
              </div>
            </div>
          )}

          {/* Detailed Milestone History & Shipping Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            {/* Timeline Events list */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#155EEF]" />
                <span>Logistics Activity Feed</span>
              </h3>

              <div className="border-l-2 border-blue-200 pl-4 space-y-6 ml-2 text-xs">
                {currentOrder.timeline?.map((evt: any, idx: number) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-[#155EEF] ring-4 ring-white" />
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{evt.status}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{evt.timestamp}</span>
                    </div>
                    <p className="text-slate-600 mt-1 leading-relaxed">{evt.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Details & Package items */}
            <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#155EEF]" />
                <span>Destination Coordinates</span>
              </h3>

              <div className="space-y-1 text-slate-700">
                <p className="font-bold text-slate-900">{currentOrder.shippingAddress.fullName}</p>
                <p>{currentOrder.shippingAddress.street}</p>
                <p>{currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} - <strong className="font-mono">{currentOrder.shippingAddress.pinCode}</strong></p>
                <p className="text-slate-500 pt-1">Phone: {currentOrder.shippingAddress.phone}</p>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h4 className="font-bold text-slate-900 mb-2">Garments in this Consignment:</h4>
                <div className="space-y-2">
                  {currentOrder.items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between items-center text-slate-600">
                      <span className="truncate max-w-[200px]">{item.productName} ({item.size})</span>
                      <span className="font-mono font-bold text-slate-900">x{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : searched ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900">Order Reference Not Found</h3>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            We could not locate order "{inputOrderId}". Please check your order confirmation email or verify the 10-digit ID.
          </p>
          <Link
            to="/orders"
            className="bg-slate-900 text-white text-xs font-bold px-6 py-2.5 rounded-xl inline-block"
          >
            Check My Orders
          </Link>
        </div>
      ) : null}
    </div>
  );
};
