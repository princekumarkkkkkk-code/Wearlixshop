import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, Coupon } from '../types';
import { INITIAL_COUPONS } from '../data/mockData';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => { success: boolean; message: string };
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => { success: boolean; message?: string };
  updateVariant: (itemId: string, newSize: string, newColor: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  appliedCoupon: Coupon | null;
  subtotal: number;
  discount: number;
  shippingFee: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  total: number;
  totalItems: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'wearlix_cart_v1';
const COUPON_STORAGE_KEY = 'wearlix_coupon_v1';
const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem(COUPON_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
  }, [appliedCoupon]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Validate coupon against current subtotal
  let discount = 0;
  if (appliedCoupon) {
    if (subtotal >= appliedCoupon.minOrderValue) {
      if (appliedCoupon.discountPercent) {
        discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
      } else if (appliedCoupon.discountAmount) {
        discount = Math.min(appliedCoupon.discountAmount, subtotal);
      }
    }
  }

  const freeShippingThreshold = FREE_SHIPPING_THRESHOLD;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = cart.length === 0 ? 0 : subtotal >= freeShippingThreshold ? 0 : STANDARD_SHIPPING_FEE;
  const total = Math.max(0, subtotal - discount) + shippingFee;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    // Check variant stock
    const variant = product.variants.find(v => v.size === size && v.color === color) || { stock: product.stock };
    const maxStock = variant.stock ?? product.stock;

    if (maxStock <= 0) {
      return { success: false, message: 'Sorry, this variant is currently out of stock.' };
    }

    const itemKey = `${product.id}-${size}-${color}`;
    const existingIndex = cart.findIndex(item => item.id === itemKey);

    if (existingIndex > -1) {
      const existing = cart[existingIndex];
      const newQty = existing.quantity + quantity;
      if (newQty > maxStock) {
        return {
          success: false,
          message: `Only ${maxStock} items available in stock for ${size} / ${color}.`
        };
      }
      const updated = [...cart];
      updated[existingIndex] = { ...existing, quantity: newQty };
      setCart(updated);
    } else {
      if (quantity > maxStock) {
        return {
          success: false,
          message: `Only ${maxStock} items available in stock.`
        };
      }
      const newItem: CartItem = {
        id: itemKey,
        productId: product.id,
        product,
        size,
        color,
        quantity,
        price: product.sellingPrice
      };
      setCart([...cart, newItem]);
    }

    setIsCartDrawerOpen(true);
    return { success: true, message: `Added ${product.name} (${size}) to your bag.` };
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return { success: true };
    }

    const item = cart.find(i => i.id === itemId);
    if (!item) return { success: false, message: 'Item not found in cart.' };

    const variant = item.product.variants.find(v => v.size === item.size && v.color === item.color) || { stock: item.product.stock };
    const maxStock = variant.stock ?? item.product.stock;

    if (newQty > maxStock) {
      return {
        success: false,
        message: `Maximum available stock is ${maxStock}.`
      };
    }

    setCart(cart.map(i => (i.id === itemId ? { ...i, quantity: newQty } : i)));
    return { success: true };
  };

  const updateVariant = (itemId: string, newSize: string, newColor: string) => {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;

    const newKey = `${item.productId}-${newSize}-${newColor}`;
    // If exact same key, nothing to do
    if (newKey === itemId) return;

    // Check if new variant already exists
    const existing = cart.find(i => i.id === newKey);
    if (existing) {
      setCart(cart.filter(i => i.id !== itemId).map(i => i.id === newKey ? { ...i, quantity: i.quantity + item.quantity } : i));
    } else {
      setCart(cart.map(i => i.id === itemId ? { ...i, id: newKey, size: newSize, color: newColor } : i));
    }
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(COUPON_STORAGE_KEY);
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const coupon = INITIAL_COUPONS.find(c => c.code.toUpperCase() === trimmed && c.isActive);

    if (!coupon) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }

    if (subtotal < coupon.minOrderValue) {
      return {
        success: false,
        message: `Coupon requires a minimum order value of ₹${coupon.minOrderValue.toLocaleString('en-IN')}.`
      };
    }

    setAppliedCoupon(coupon);
    return { success: true, message: `Coupon ${coupon.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateVariant,
        clearCart,
        applyCoupon,
        removeCoupon,
        appliedCoupon,
        subtotal,
        discount,
        shippingFee,
        freeShippingThreshold,
        freeShippingRemaining,
        total,
        totalItems,
        isCartDrawerOpen,
        setIsCartDrawerOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
