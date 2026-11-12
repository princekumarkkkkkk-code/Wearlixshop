import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, ShoppingBag, Heart, Check, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [added, setAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    const res = addToCart(product, selectedSize, selectedColor, quantity);
    if (res.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white text-slate-600 rounded-full shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery */}
        <div className="bg-slate-100 flex flex-col justify-between p-4">
          <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-200">
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIdx(i)}
                  className={`w-14 h-16 rounded-lg overflow-hidden border-2 shrink-0 ${
                    activeImageIdx === i ? 'border-[#155EEF]' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="Thumb" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info & Variants */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="uppercase tracking-wider font-semibold text-slate-400">
                {product.category}
              </span>
              <span>·</span>
              <span className="font-mono">{product.sku}</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 leading-tight">
              {product.name}
            </h3>

            {/* Price & Rating */}
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                  ₹{product.sellingPrice.toLocaleString('en-IN')}
                </span>
                {product.mrp > product.sellingPrice && (
                  <span className="text-sm text-slate-400 line-through font-mono tabular-nums">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="font-semibold tabular-nums">{product.rating.toFixed(1)}</span>
                <span className="text-slate-400">({product.reviewCount})</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            {/* Color selection */}
            {product.colors.length > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-700">Colour:</span>
                  <span className="text-slate-500">{selectedColor}</span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map(col => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        selectedColor === col.name ? 'border-[#155EEF] scale-110' : 'border-slate-300'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selection */}
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700">Size:</span>
                <span className="text-slate-500">{selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[42px] py-1.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                      selectedSize === size
                        ? 'bg-[#101828] text-white border-[#101828]'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-700">Qty:</span>
              <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 text-xs"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 text-xs"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-slate-400">
                {product.stock} pieces left in inventory
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-slate-100 flex items-center gap-3 mt-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all ${
                product.stock <= 0
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#155EEF] hover:bg-blue-600 text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 rounded-xl border transition-colors ${
                isFavorited
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-red-500'
              }`}
              title="Add to wishlist"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-600' : ''}`} />
            </button>

            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition-colors"
              title="View full product page"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
