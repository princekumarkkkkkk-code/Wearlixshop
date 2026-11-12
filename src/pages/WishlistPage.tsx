import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/common/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlistProducts, clearWishlist, wishlistIds } = useWishlist();
  const { addToCart } = useCart();

  const handleAddAllToCart = () => {
    wishlistProducts.forEach(product => {
      addToCart(product, product.sizes[0] || 'M', product.colors[0]?.name || 'Standard', 1);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF]">SAVED WARDROBE</span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            My Wishlist ({wishlistIds.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Your personal lookbook edits saved for this season.
          </p>
        </div>

        {wishlistProducts.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddAllToCart}
              className="bg-[#155EEF] hover:bg-blue-600 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add All to Bag</span>
            </button>
            <button
              onClick={clearWishlist}
              className="border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center my-8">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Heart className="w-8 h-8 stroke-1" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Your wishlist is empty</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
            Tap the heart icon on any outerwear, hoodie, or denim style to save it here for later.
          </p>
          <Link
            to="/shop"
            className="bg-[#155EEF] hover:bg-blue-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md inline-flex items-center gap-2"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
