import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { ScrollToTop } from './components/common/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage, SignupPage } from './pages/AuthPages';
import { AccountPage } from './pages/AccountPage';
import { OrdersPage } from './pages/OrdersPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { WishlistPage } from './pages/WishlistPage';
import {
  AboutPage,
  ContactPage,
  FAQPage,
  PrivacyPolicyPage,
  TermsPage,
  ReturnPolicyPage
} from './pages/StaticPages';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F4F7]">
      {!isAdminRoute && <AnnouncementBar />}
      {!isAdminRoute && <Header />}
      <main className="flex-1">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
      <CartDrawer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <OrderProvider>
            <BrowserRouter>
              <ScrollToTop />
              <AppLayout>
                <Routes>
                  {/* 1. Home */}
                  <Route path="/" element={<HomePage />} />

                  {/* 2 & 3. Shop & All Products */}
                  <Route path="/shop" element={<ShopPage initialCategory="all" />} />
                  <Route path="/products" element={<ShopPage initialCategory="all" />} />

                  {/* 4 to 11. Specific Category Pages */}
                  <Route path="/category/:categoryName" element={<ShopPage />} />
                  <Route path="/men" element={<ShopPage initialCategory="men" />} />
                  <Route path="/women" element={<ShopPage initialCategory="women" />} />
                  <Route path="/kids" element={<ShopPage initialCategory="kids" />} />
                  <Route path="/jackets" element={<ShopPage initialCategory="jackets" />} />
                  <Route path="/hoodies" element={<ShopPage initialCategory="hoodies" />} />
                  <Route path="/t-shirts" element={<ShopPage initialCategory="t-shirts" />} />
                  <Route path="/shirts" element={<ShopPage initialCategory="shirts" />} />
                  <Route path="/jeans" element={<ShopPage initialCategory="jeans" />} />

                  {/* 12. Product Details */}
                  <Route path="/product/:id" element={<ProductDetailPage />} />

                  {/* 13. Search Results */}
                  <Route path="/search" element={<ShopPage isSearchMode={true} />} />

                  {/* 14. Shopping Cart */}
                  <Route path="/cart" element={<CartPage />} />

                  {/* 15. Checkout */}
                  <Route path="/checkout" element={<CheckoutPage />} />

                  {/* 16 & 17. Authentication */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />

                  {/* 18. Customer Account */}
                  <Route path="/account" element={<AccountPage />} />

                  {/* 19. My Orders */}
                  <Route path="/orders" element={<OrdersPage />} />

                  {/* 20. Track Order */}
                  <Route path="/track-order" element={<TrackOrderPage />} />
                  <Route path="/track-order/:orderId" element={<TrackOrderPage />} />

                  {/* 21. Wishlist */}
                  <Route path="/wishlist" element={<WishlistPage />} />

                  {/* 22 to 27. Brand & Policy Pages */}
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/return-policy" element={<ReturnPolicyPage />} />
                  <Route path="/returns-policy" element={<ReturnPolicyPage />} />

                  {/* 28. Owner Admin Dashboard UI */}
                  <Route path="/admin" element={<AdminDashboard />} />

                  {/* Fallback route */}
                  <Route path="*" element={<ShopPage initialCategory="all" />} />
                </Routes>
              </AppLayout>
            </BrowserRouter>
          </OrderProvider>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}
