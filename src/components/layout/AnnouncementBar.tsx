import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#101828] text-white text-xs py-2 px-4 border-b border-slate-800 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 text-center font-medium flex items-center justify-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="tracking-wide uppercase font-semibold text-[11px]">AUTUMN/WINTER 2026</span>
          </span>
          <span className="text-slate-400 hidden sm:inline">·</span>
          <span>Free Express Shipping across India on orders above ₹999</span>
          <span className="text-slate-400 hidden sm:inline">·</span>
          <span className="text-blue-300">
            Use code <span className="font-mono font-bold text-white bg-blue-600/30 px-1.5 py-0.5 rounded">WEARLIX10</span> for 10% off
          </span>
          <Link to="/shop" className="underline underline-offset-2 hover:text-blue-400 ml-1 font-semibold">
            Shop Drop
          </Link>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white transition-colors p-0.5"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
