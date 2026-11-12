import React, { useState } from 'react';
import { ShieldCheck, X, CreditCard, Smartphone, Building2, Wallet, CheckCircle2, AlertCircle } from 'lucide-react';

interface RazorpayModalProps {
  isOpen: boolean;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  onSuccess: (paymentId: string) => void;
  onCancel: () => void;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  isOpen,
  amount,
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
  onCancel
}) => {
  const [activeTab, setActiveTab] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [upiId, setUpiId] = useState(`${customerEmail.split('@')[0]}@okhdfcbank`);
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleTestAuthorize = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const simulatedPaymentId = `pay_${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
      onSuccess(simulatedPaymentId);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={onCancel} />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header - Razorpay signature blue/slate header */}
        <div className="bg-[#0c2340] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center font-black tracking-tight text-white text-lg font-mono">
              ₹
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-wide">WEARLIX PAYMENTS</span>
                <span className="bg-blue-500/30 text-blue-300 text-[10px] font-mono font-semibold px-2 py-0.5 rounded">
                  SANDBOX
                </span>
              </div>
              <p className="text-xs text-slate-300">Order Amount: <strong className="text-white font-mono text-sm">₹{amount.toLocaleString('en-IN')}</strong></p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice of Architecture Separation */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex items-start gap-2.5 text-xs text-amber-800">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Payment Gateway Integration Interface:</strong> This preview interface is structured to link to your backend Razorpay SDK (Order Creation, Webhooks, Signature verification). No real money is charged.
          </p>
        </div>

        {/* Customer Mini Summary */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs flex justify-between text-slate-600">
          <div>
            <span className="text-slate-400">Payer:</span> <strong>{customerName}</strong>
          </div>
          <div>
            <span className="text-slate-400">Mobile:</span> <strong>{customerPhone}</strong>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-4 border-b border-slate-200 text-xs font-semibold text-slate-600 bg-slate-100">
          <button
            onClick={() => setActiveTab('upi')}
            className={`py-3 flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'upi' ? 'bg-white text-[#155EEF] border-b-2 border-[#155EEF]' : 'hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>UPI / QR</span>
          </button>
          <button
            onClick={() => setActiveTab('card')}
            className={`py-3 flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'card' ? 'bg-white text-[#155EEF] border-b-2 border-[#155EEF]' : 'hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Card</span>
          </button>
          <button
            onClick={() => setActiveTab('netbanking')}
            className={`py-3 flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'netbanking' ? 'bg-white text-[#155EEF] border-b-2 border-[#155EEF]' : 'hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>NetBanking</span>
          </button>
          <button
            onClick={() => setActiveTab('wallet')}
            className={`py-3 flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'wallet' ? 'bg-white text-[#155EEF] border-b-2 border-[#155EEF]' : 'hover:text-slate-900'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>Wallets</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-5">
          {activeTab === 'upi' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Virtual Payment Address (VPA / UPI ID)
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  placeholder="username@okhdfcbank"
                  className="w-full text-sm font-mono px-3.5 py-2.5 border border-slate-300 rounded-xl focus:border-[#155EEF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-4 gap-2 pt-1">
                {['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI'].map(app => (
                  <div
                    key={app}
                    className="p-2 border border-slate-200 rounded-lg text-center hover:border-blue-400 bg-slate-50 cursor-pointer"
                  >
                    <span className="text-[11px] font-semibold text-slate-700 block">{app}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'card' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Card Number (Visa / Mastercard / RuPay)</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  className="w-full text-sm font-mono px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Expiry MM/YY</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={e => setCardExpiry(e.target.value)}
                    className="w-full text-sm font-mono px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">CVV / CVC</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cardCvv}
                    onChange={e => setCardCvv(e.target.value)}
                    className="w-full text-sm font-mono px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'netbanking' && (
            <div className="grid grid-cols-2 gap-2">
              {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map(bank => (
                <div key={bank} className="p-3 border border-slate-200 rounded-xl hover:border-[#155EEF] cursor-pointer flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <span className="text-xs font-semibold text-slate-800">{bank}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'wallet' && (
            <div className="space-y-2">
              {['Amazon Pay', 'Mobikwik', 'Freecharge', 'Airtel Money'].map(wallet => (
                <div key={wallet} className="p-3 border border-slate-200 rounded-xl hover:border-[#155EEF] cursor-pointer flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800">{wallet}</span>
                  <span className="text-xs text-blue-600 font-medium">Link & Pay</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Authorization CTA */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-bit SSL Secured</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              disabled={isProcessing}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2"
            >
              Cancel
            </button>
            <button
              onClick={handleTestAuthorize}
              disabled={isProcessing}
              className="bg-[#155EEF] hover:bg-blue-600 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simulate Payment of ₹{amount.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
