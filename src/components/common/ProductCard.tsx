import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [isHovered, setIsHovered] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const res = addToCart(product, selectedSize, selectedColor, 1);
    if (res.success) {
      setAddedNotice(true);
      setTimeout(() => setAddedNotice(false), 2000);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  // Determine primary display image
  const displayImage = product.images[0];

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all duration-200 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container (65-75% height) */}
      <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          {!imageFailed ? (
            <img
              src={displayImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-200 text-slate-500 text-center">
              <ShoppingBag className="w-10 h-10 mb-2 stroke-1" />
              <span className="text-xs font-semibold">{product.name}</span>
            </div>
          )}
        </Link>

        {/* Top Badges (Subtle, clean text tags, no sandwich) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
          {product.discountPercent > 0 && (
            <span className="bg-[#155EEF] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs tracking-wider">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-[#101828] text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-xs tracking-wide">
              NEW DROP
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-150 ${
            isFavorited
              ? 'bg-red-50 text-red-600 shadow-sm'
              : 'bg-white/90 text-slate-600 hover:text-red-500 hover:bg-white shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-600' : ''}`} />
        </button>

        {/* Floating Quick Action Drawer on Hover (Desktop) */}
        <div
          className={`absolute inset-x-3 bottom-3 transition-all duration-200 hidden sm:flex flex-col gap-2 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
          }`}
        >
          {/* Size picker strip */}
          {product.sizes.length > 1 && (
            <div className="bg-white/95 backdrop-blur-xs p-1.5 rounded-lg shadow-md flex items-center justify-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">Size:</span>
              {product.sizes.slice(0, 5).map(size => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded transition-colors ${
                    selectedSize === size
                      ? 'bg-[#101828] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleQuickAdd}
              disabled={product.stock <= 0}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md transition-colors ${
                product.stock <= 0
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : addedNotice
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#155EEF] hover:bg-blue-600 text-white'
              }`}
            >
              {addedNotice ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : product.stock <= 0 ? (
                <span>Out of Stock</span>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Quick Add</span>
                </>
              )}
            </button>

            {onQuickView && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onQuickView(product);
                }}
                className="p-2 bg-white/95 hover:bg-white text-slate-700 rounded-lg shadow-md transition-colors"
                title="Quick preview"
              >
                <Eye className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-slate-400">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-slate-700 font-medium">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="tabular-nums text-xs">{product.rating.toFixed(1)}</span>
              <span className="text-slate-400 text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product.id}`}
            className="text-sm font-semibold text-slate-900 hover:text-[#155EEF] transition-colors line-clamp-1 block"
          >
            {product.name}
          </Link>

          {/* Fabric & Fit note */}
          <p className="text-xs text-slate-400 truncate mt-0.5">
            {product.fabric}
          </p>
        </div>

        {/* Pricing & Stock baseline */}
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
              ₹{product.sellingPrice.toLocaleString('en-IN')}
            </span>
            {product.mrp > product.sellingPrice && (
              <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Stock state indicator */}
          <span className={`text-[11px] font-medium ${product.stock <= 5 ? 'text-amber-600' : 'text-slate-400'}`}>
            {product.stock <= 0 ? 'Sold Out' : product.stock <= 5 ? `Only ${product.stock} left` : 'In Stock'}
          </span>
        </div>
      </div>
    </div>
  );
};
