import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RefreshCw,
  ShieldCheck,
  Check,
  ChevronRight,
  ZoomIn,
  Sparkles,
  Ruler,
  Share2
} from 'lucide-react';
import { INITIAL_PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/common/ProductCard';
import { useCart } from '../../src/context/CartContext';
import { useWishlist } from '../../src/context/WishlistContext';
import { Review } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = INITIAL_PRODUCTS.find(p => p.id === id) || INITIAL_PRODUCTS[0];

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'reviews'>('details');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [shareNotice, setShareNotice] = useState(false);

  // New review form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewList, setReviewList] = useState<Review[]>(product.reviews || []);

  const isFavorited = isInWishlist(product.id);

  // Variant stock checking
  const currentVariant = product.variants.find(v => v.size === selectedSize && v.color === selectedColor) || { stock: product.stock };
  const availableStock = currentVariant.stock ?? product.stock;

  const handleAddToCart = () => {
    const res = addToCart(product, selectedSize, selectedColor, quantity);
    if (res.success) {
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShareNotice(true);
    setTimeout(() => setShareNotice(false), 2000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      userName: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: newReviewComment.trim(),
      verifiedPurchase: true
    };

    setReviewList([newRev, ...reviewList]);
    setNewReviewAuthor('');
    setNewReviewComment('');
  };

  const relatedProducts = INITIAL_PRODUCTS.filter(
    p => (p.category === product.category || p.gender === product.gender) && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="hover:text-slate-900 capitalize transition-colors">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Gallery Column (Sticky left) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[3/4] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 group">
            <img
              src={product.images[selectedImageIdx] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover object-center transition-transform duration-500 cursor-zoom-in ${
                isZoomed ? 'scale-150' : 'group-hover:scale-105'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
              {product.discountPercent > 0 && (
                <span className="bg-[#155EEF] text-white text-xs font-bold px-2.5 py-1 rounded shadow-xs font-mono">
                  {product.discountPercent}% OFF
                </span>
              )}
              {product.isNewArrival && (
                <span className="bg-[#101828] text-white text-xs font-medium px-2.5 py-1 rounded shadow-xs">
                  NEW SEASON
                </span>
              )}
            </div>

            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute bottom-4 right-4 p-2.5 bg-white/90 hover:bg-white text-slate-700 rounded-full shadow-md backdrop-blur-xs transition-colors"
              title="Toggle zoom"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`aspect-[3/4] rounded-xl overflow-hidden border-2 bg-slate-100 transition-all ${
                    selectedImageIdx === idx ? 'border-[#155EEF] shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Purchase Module Column (Sticky right) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border-b border-slate-200 pb-6">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="uppercase tracking-widest font-bold text-[#155EEF]">
                WEARLIX · {product.category}
              </span>
              <span className="font-mono text-slate-400">SKU: {product.sku}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Price & Rating */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold font-mono text-slate-900 tabular-nums">
                  ₹{product.sellingPrice.toLocaleString('en-IN')}
                </span>
                {product.mrp > product.sellingPrice && (
                  <span className="text-base text-slate-400 line-through font-mono tabular-nums">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  Save ₹{(product.mrp - product.sellingPrice).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 text-xs text-slate-700">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="font-bold tabular-nums">{product.rating.toFixed(1)}</span>
                <span className="text-slate-400">({product.reviewCount})</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Inclusive of all Indian taxes and GST duties.</p>
          </div>

          {/* Color Selector */}
          {product.colors.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-slate-700">Selected Shade:</span>
                <span className="text-[#155EEF]">{selectedColor}</span>
              </div>
              <div className="flex gap-2.5">
                {product.colors.map(col => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    className={`w-9 h-9 rounded-full border-2 transition-all p-0.5 ${
                      selectedColor === col.name ? 'border-[#155EEF] scale-110 shadow-sm' : 'border-slate-300'
                    }`}
                    title={col.name}
                  >
                    <span
                      className="block w-full h-full rounded-full border border-black/10"
                      style={{ backgroundColor: col.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-slate-700">Select Size:</span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs text-[#155EEF] hover:underline flex items-center gap-1 font-medium"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[48px] py-2.5 px-4 text-xs font-bold rounded-xl border transition-all ${
                    selectedSize === size
                      ? 'bg-[#101828] text-white border-[#101828] shadow-sm'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Stock Status */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-700">Quantity:</span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 text-sm font-bold"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(availableStock, quantity + 1))}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right">
              {availableStock <= 0 ? (
                <span className="text-xs font-bold text-red-600">Currently Sold Out</span>
              ) : availableStock <= 5 ? (
                <span className="text-xs font-semibold text-amber-600">
                  Only {availableStock} pieces remaining in batch
                </span>
              ) : (
                <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Ready for Immediate Dispatch
                </span>
              )}
            </div>
          </div>

          {/* Primary Buy CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={availableStock <= 0}
                className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                  availableStock <= 0
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    : isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#155EEF] hover:bg-blue-600 text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Your Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-xl border transition-colors ${
                  isFavorited
                    ? 'bg-red-50 border-red-200 text-red-600'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-red-500'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-600' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-3.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 transition-colors relative"
                title="Share garment link"
              >
                <Share2 className="w-5 h-5" />
                {shareNotice && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap">
                    Link copied!
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={availableStock <= 0}
              className="w-full bg-[#101828] hover:bg-slate-800 text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-colors shadow-sm"
            >
              Buy Now with 1-Click Checkout
            </button>
          </div>

          {/* Delivery & Assurance Strip */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-[#155EEF] shrink-0" />
              <span>Complimentary express air delivery on orders above ₹999</span>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCw className="w-4 h-4 text-[#155EEF] shrink-0" />
              <span>7-day doorstep size exchanges and easy return policy</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-[#155EEF] shrink-0" />
              <span>Cash on Delivery & Secure UPI Payment options verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications, Care, Reviews */}
      <div className="mt-16 border-t border-slate-200 pt-10">
        <div className="flex border-b border-slate-200 gap-8 text-sm font-bold">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'details' ? 'border-[#155EEF] text-[#155EEF]' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Product Architecture & Features
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'care' ? 'border-[#155EEF] text-[#155EEF]' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Fabric & Garment Care
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'reviews' ? 'border-[#155EEF] text-[#155EEF]' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Customer Reviews ({reviewList.length})
          </button>
        </div>

        <div className="py-6">
          {activeTab === 'details' && (
            <div className="space-y-6 max-w-3xl">
              <p className="text-sm text-slate-700 leading-relaxed">{product.description}</p>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Key Design Details</h4>
                <ul className="space-y-2">
                  {product.features.map((feat, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#155EEF]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="space-y-4 max-w-2xl">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold uppercase text-slate-400">Composition</span>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">{product.fabric}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">Care Instructions</h4>
                <ul className="space-y-1.5">
                  {product.care.map((c, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-center gap-2">
                      <span className="text-slate-400">·</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8 max-w-3xl">
              {/* Write Review Form */}
              <form onSubmit={handleAddReview} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Write a Review for {product.name}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Your Name</label>
                    <input
                      type="text"
                      value={newReviewAuthor}
                      onChange={e => setNewReviewAuthor(e.target.value)}
                      placeholder="e.g. Varun Malhotra"
                      required
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#155EEF]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Rating</label>
                    <select
                      value={newReviewRating}
                      onChange={e => setNewReviewRating(Number(e.target.value))}
                      className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#155EEF]"
                    >
                      <option value={5}>5 Stars - Excellent Quality</option>
                      <option value={4}>4 Stars - Great Fit</option>
                      <option value={3}>3 Stars - Average</option>
                      <option value={2}>2 Stars - Below Expectations</option>
                      <option value={1}>1 Star - Poor</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Your Feedback & Styling Notes</label>
                  <textarea
                    rows={3}
                    value={newReviewComment}
                    onChange={e => setNewReviewComment(e.target.value)}
                    placeholder="Share how the garment fits and feels..."
                    required
                    className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#155EEF]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#101828] hover:bg-slate-800 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition-colors"
                >
                  Submit Verified Review
                </button>
              </form>

              {/* Review List */}
              <div className="space-y-4">
                {reviewList.length === 0 ? (
                  <p className="text-xs text-slate-500">Be the first to review this new season release!</p>
                ) : (
                  reviewList.map(rev => (
                    <div key={rev.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{rev.userName}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                              Verified Order
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 my-1.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                        ))}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sizing Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setIsSizeGuideOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 z-10 border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#155EEF]" />
                <span>WEARLIX Size Measurement Guide (Inches)</span>
              </h3>
              <button onClick={() => setIsSizeGuideOpen(false)} className="text-slate-400 hover:text-slate-900">
                ✕
              </button>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold uppercase">
                  <tr>
                    <th className="p-2.5">Size</th>
                    <th className="p-2.5">Chest</th>
                    <th className="p-2.5">Length</th>
                    <th className="p-2.5">Shoulder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr><td className="p-2.5 font-bold">S</td><td className="p-2.5">38 - 40"</td><td className="p-2.5">27.5"</td><td className="p-2.5">18.5"</td></tr>
                  <tr><td className="p-2.5 font-bold">M</td><td className="p-2.5">40 - 42"</td><td className="p-2.5">28.5"</td><td className="p-2.5">19.5"</td></tr>
                  <tr><td className="p-2.5 font-bold">L</td><td className="p-2.5">42 - 44"</td><td className="p-2.5">29.5"</td><td className="p-2.5">20.5"</td></tr>
                  <tr><td className="p-2.5 font-bold">XL</td><td className="p-2.5">44 - 46"</td><td className="p-2.5">30.5"</td><td className="p-2.5">21.5"</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-500 mt-4">
              All our cuts follow standard contemporary silhouettes. If you prefer an oversized slouch drape, order one size up.
            </p>
          </div>
        </div>
      )}

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 border-t border-slate-200 pt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF]">COMPLETE THE WARDROBE</span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                You May Also Covet
              </h2>
            </div>
            <Link to="/shop" className="text-xs font-bold text-[#155EEF] hover:underline">
              View All Styles
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
