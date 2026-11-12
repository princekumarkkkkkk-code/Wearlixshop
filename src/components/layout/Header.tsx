import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems, setIsCartDrawerOpen } = useCart();
  const { wishlistIds } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Men', path: '/category/men' },
    { label: 'Women', path: '/category/women' },
    { label: 'Kids', path: '/category/kids' },
    { label: 'Jackets', path: '/category/jackets' },
    { label: 'Hoodies', path: '/category/hoodies' },
    { label: 'T-Shirts', path: '/category/t-shirts' },
    { label: 'Shirts', path: '/category/shirts' },
    { label: 'Jeans', path: '/category/jeans' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 md:gap-8">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-slate-700 hover:text-blue-600 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3">
            <Link to="/" className="group flex flex-col">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-[#101828] group-hover:text-[#155EEF] transition-colors leading-none">
                WEARLIX
              </span>
              <span className="text-[9px] font-semibold tracking-widest text-slate-400 uppercase mt-0.5">
                YOUR STYLE. YOUR RULES.
              </span>
            </Link>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 overflow-x-auto no-scrollbar py-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold tracking-wide transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  isActive(link.path)
                    ? 'text-[#155EEF] border-[#155EEF]'
                    : 'text-slate-700 border-transparent hover:text-[#155EEF]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Zone 3: Interactive Affordances (Search, Account, Wishlist, Cart, Admin) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search Toggle / Inline Form on Desktop */}
            <div className="relative hidden md:block">
              <form onSubmit={handleSearchSubmit} className="relative w-48 lg:w-56">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search styles, jackets..."
                  className="w-full bg-[#F2F4F7] text-xs text-slate-800 placeholder-slate-400 pl-9 pr-3 py-2 rounded-full border border-transparent focus:border-[#155EEF] focus:bg-white focus:outline-none transition-all"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </form>
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-slate-700 hover:text-[#155EEF] transition-colors md:hidden"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="p-2 text-slate-700 hover:text-[#155EEF] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#155EEF] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {wishlistIds.length}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-2 text-slate-700 hover:text-[#155EEF] transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-[#155EEF] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Customer Account / Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 text-slate-700 hover:text-[#155EEF] transition-colors flex items-center gap-1.5"
                aria-label="Account Menu"
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                  <User className="w-4 h-4 text-slate-700" />
                </div>
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  {isAuthenticated && user ? (
                    <>
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs text-slate-500">Signed in as</p>
                        <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/account"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#155EEF]"
                      >
                        My Account
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#155EEF]"
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/track-order"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#155EEF]"
                      >
                        Track Order
                      </Link>
                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs text-slate-500">Welcome to WEARLIX</p>
                        <p className="text-xs font-medium text-slate-700 mt-0.5">Access your orders & wishlist</p>
                      </div>
                      <Link
                        to="/login"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm font-medium text-[#155EEF] hover:bg-blue-50"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        Create Account
                      </Link>
                      <Link
                        to="/track-order"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 border-t border-slate-100 mt-1 pt-1"
                      >
                        Track Guest Order
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Admin Portal Direct Link */}
            <Link
              to="/admin"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-[#101828] rounded-lg transition-colors border border-slate-200"
              title="Store Owner Admin Panel"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#155EEF]" />
              <span>Admin</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Input Row */}
        {isSearchOpen && (
          <div className="py-3 border-t border-slate-100 md:hidden animate-in fade-in duration-150">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search styles, jackets, hoodies..."
                className="w-full bg-[#F2F4F7] text-sm text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-lg border border-transparent focus:border-[#155EEF] focus:bg-white focus:outline-none"
                autoFocus
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-50">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xl font-black tracking-tight text-[#101828]">WEARLIX</span>
                <p className="text-[9px] tracking-widest text-slate-400 font-semibold uppercase">YOUR STYLE. YOUR RULES.</p>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Shop Categories</p>
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(link.path)
                      ? 'bg-blue-50 text-[#155EEF]'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              ))}

              <div className="pt-4 border-t border-slate-100 mt-4 space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Account & Support</p>
                <Link
                  to="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  <span>My Profile & Orders</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  to="/track-order"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  <span>Track Order</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-sm text-[#155EEF] font-semibold hover:bg-blue-50 rounded-lg"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Admin Dashboard
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <p className="text-xs text-slate-500 text-center">
                Currency: <strong className="text-slate-800">INR (₹)</strong> · India Express Delivery
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
