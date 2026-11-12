import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, ChevronDown, Check, Star } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { Product, CategoryType } from '../types';

interface ShopPageProps {
  initialCategory?: CategoryType | 'all' | 'men' | 'women' | 'kids';
  isSearchMode?: boolean;
}

export const ShopPage: React.FC<ShopPageProps> = ({ initialCategory, isSearchMode }) => {
  const params = useParams<{ categoryName?: string }>();
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('q') || '';

  const activeCategoryParam = (params.categoryName || initialCategory || 'all').toLowerCase();

  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategoryParam);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync category param if route changed
  React.useEffect(() => {
    if (params.categoryName) {
      setSelectedCategory(params.categoryName.toLowerCase());
    } else if (initialCategory) {
      setSelectedCategory(initialCategory.toLowerCase());
    }
  }, [params.categoryName, initialCategory]);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'men', label: "Men's Apparel" },
    { id: 'women', label: "Women's Collection" },
    { id: 'kids', label: 'Junior & Kids' },
    { id: 'jackets', label: 'Jackets & Outerwear' },
    { id: 'hoodies', label: 'Heavyweight Hoodies' },
    { id: 't-shirts', label: 'T-Shirts' },
    { id: 'shirts', label: 'Tailored Shirts' },
    { id: 'jeans', label: 'Jeans & Denim' },
  ];

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', '4-6Y', '6-8Y', '8-10Y', '10-12Y'];
  const allColors = [
    { name: 'Onyx Black', hex: '#111827' },
    { name: 'Cobalt Blue', hex: '#155EEF' },
    { name: 'Chalk White', hex: '#FFFFFF' },
    { name: 'Raw Indigo', hex: '#1e293b' },
    { name: 'Ash Grey', hex: '#94A3B8' },
  ];

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter(product => {
      // 1. Search Query
      if (isSearchMode && searchKeyword) {
        const query = searchKeyword.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesSku = product.sku.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesSku) return false;
      }

      // 2. Category / Gender Filter
      if (selectedCategory !== 'all') {
        const isGenderMatch = (selectedCategory === 'men' && (product.gender === 'men' || product.gender === 'unisex'))
          || (selectedCategory === 'women' && (product.gender === 'women' || product.gender === 'unisex'))
          || (selectedCategory === 'kids' && product.gender === 'kids');

        const isCategoryMatch = product.category === selectedCategory;

        if (!isGenderMatch && !isCategoryMatch) {
          return false;
        }
      }

      // 3. Price Filter
      if (product.sellingPrice > maxPrice) return false;

      // 4. Rating Filter
      if (minRating > 0 && product.rating < minRating) return false;

      // 5. Stock Filter
      if (inStockOnly && product.stock <= 0) return false;

      // 6. Size Filter
      if (selectedSizes.length > 0) {
        const hasSize = product.sizes.some(s => selectedSizes.includes(s));
        if (!hasSize) return false;
      }

      // 7. Color Filter
      if (selectedColors.length > 0) {
        const hasColor = product.colors.some(c => selectedColors.includes(c.name));
        if (!hasColor) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.sellingPrice - b.sellingPrice;
      if (sortBy === 'price-desc') return b.sellingPrice - a.sellingPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, selectedSizes, selectedColors, maxPrice, minRating, inStockOnly, sortBy, isSearchMode, searchKeyword]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors(prev =>
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(10000);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters = selectedSizes.length > 0 || selectedColors.length > 0 || maxPrice < 10000 || minRating > 0 || inStockOnly || selectedCategory !== 'all';

  // Category page title and editorial description
  const categoryTitle = isSearchMode
    ? `Search Results for "${searchKeyword}"`
    : categories.find(c => c.id === selectedCategory)?.label || 'All Products';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-slate-500 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-slate-900 transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold capitalize">{selectedCategory}</span>
      </nav>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF]">WEARLIX CATALOG</span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            {categoryTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Showing <strong className="text-slate-900 font-mono">{filteredProducts.length}</strong> styles curated for modern silhouette, comfort, and longevity.
          </p>
        </div>

        {/* Sort & Mobile Filter Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs"
          >
            <Filter className="w-4 h-4 text-[#155EEF]" />
            <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
          </button>

          <div className="relative flex items-center gap-2 text-xs text-slate-600 bg-white border border-slate-300 rounded-xl px-3 py-2 shadow-xs">
            <span className="text-slate-400 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-transparent font-semibold text-slate-900 focus:outline-none cursor-pointer pr-4"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 py-4">
          <span className="text-xs text-slate-400 font-medium">Active Filters:</span>
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-[#155EEF] border border-blue-200 text-xs px-2.5 py-1 rounded-lg">
              <span>Category: {selectedCategory}</span>
              <button onClick={() => setSelectedCategory('all')}><X className="w-3.5 h-3.5" /></button>
            </span>
          )}
          {selectedSizes.map(size => (
            <span key={size} className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-lg">
              <span>Size: {size}</span>
              <button onClick={() => toggleSize(size)}><X className="w-3.5 h-3.5" /></button>
            </span>
          ))}
          {selectedColors.map(color => (
            <span key={color} className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-lg">
              <span>Color: {color}</span>
              <button onClick={() => toggleColor(color)}><X className="w-3.5 h-3.5" /></button>
            </span>
          ))}
          {maxPrice < 10000 && (
            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-lg">
              <span>Under ₹{maxPrice.toLocaleString('en-IN')}</span>
              <button onClick={() => setMaxPrice(10000)}><X className="w-3.5 h-3.5" /></button>
            </span>
          )}
          {minRating > 0 && (
            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-lg">
              <span>{minRating}+ Stars</span>
              <button onClick={() => setMinRating(0)}><X className="w-3.5 h-3.5" /></button>
            </span>
          )}
          {inStockOnly && (
            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-lg">
              <span>In Stock Only</span>
              <button onClick={() => setInStockOnly(false)}><X className="w-3.5 h-3.5" /></button>
            </span>
          )}
          <button
            onClick={resetFilters}
            className="text-xs text-red-600 hover:underline font-semibold ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Grid with Sidebar Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs h-fit sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#155EEF]" />
              <span>Filters</span>
            </h3>
            {hasActiveFilters && (
              <button onClick={resetFilters} className="text-xs text-slate-500 hover:text-red-600">
                Reset
              </button>
            )}
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Category</h4>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === cat.id
                      ? 'bg-blue-50 text-[#155EEF] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.label}</span>
                  {selectedCategory === cat.id && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex justify-between text-xs mb-2">
              <span className="font-bold uppercase tracking-wider text-slate-400">Max Price</span>
              <span className="font-bold font-mono text-slate-900">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#155EEF] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>₹1,000</span>
              <span>₹10,000</span>
            </div>
          </div>

          {/* Sizes */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Size</h4>
            <div className="flex flex-wrap gap-1.5">
              {allSizes.map(size => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`min-w-[36px] py-1 px-2 rounded-md text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#101828] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Colors */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Colour</h4>
            <div className="space-y-1.5">
              {allColors.map(col => {
                const isSelected = selectedColors.includes(col.name);
                return (
                  <button
                    key={col.name}
                    onClick={() => toggleColor(col.name)}
                    className="w-full flex items-center justify-between text-xs text-slate-700 py-1 px-2 rounded-md hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full border border-slate-300"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.name}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#155EEF]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rating */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Customer Rating</h4>
            <div className="space-y-1">
              {[4, 4.5].map(rating => (
                <button
                  key={rating}
                  onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                  className={`w-full flex items-center justify-between px-2 py-1 rounded text-xs transition-colors ${
                    minRating === rating ? 'bg-amber-50 text-amber-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{rating} Stars & Above</span>
                  </div>
                  {minRating === rating && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Toggle */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-800">In Stock Only</span>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={e => setInStockOnly(e.target.checked)}
              className="w-4 h-4 rounded text-[#155EEF] focus:ring-[#155EEF] cursor-pointer"
            />
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <h3 className="text-lg font-bold text-slate-900">No matching garments found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try widening your price range, clearing selected sizes or choosing another category.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 bg-[#155EEF] hover:bg-blue-600 text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Sheet */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <h3 className="text-base font-bold text-slate-900">Refine Collection</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content mirror for mobile */}
            <div className="space-y-6 flex-1">
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Categories</h4>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-2 py-1 text-xs rounded ${
                        selectedCategory === cat.id ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Max Price (₹{maxPrice.toLocaleString('en-IN')})</h4>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#155EEF]"
                />
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Sizes</h4>
                <div className="flex flex-wrap gap-1.5">
                  {allSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`text-xs px-2.5 py-1 rounded font-semibold ${
                        selectedSizes.includes(size) ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 mt-6 flex gap-2">
              <button
                onClick={resetFilters}
                className="w-1/2 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 py-2.5 bg-[#155EEF] text-white rounded-xl text-xs font-semibold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
