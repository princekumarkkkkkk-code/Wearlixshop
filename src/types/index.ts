export type CategoryType = 
  | 'men' 
  | 'women' 
  | 'kids' 
  | 'jackets' 
  | 'hoodies' 
  | 't-shirts' 
  | 'shirts' 
  | 'jeans';

export interface ProductVariant {
  size: string;
  color: string;
  colorHex: string;
  stock: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: CategoryType;
  gender: 'men' | 'women' | 'kids' | 'unisex';
  mrp: number; // Maximum Retail Price
  sellingPrice: number; // Discounted/Selling Price
  discountPercent: number;
  description: string;
  features: string[];
  fabric: string;
  care: string[];
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique item key: productId-size-color
  productId: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned'
  | 'Refunded';

export interface OrderItem {
  productId: string;
  productName: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
  isDefault?: boolean;
}

export interface Order {
  id: string; // KZ-XXXXXXXXXX
  date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: Address;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'Online Payment' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  orderStatus: OrderStatus;
  timeline: {
    status: OrderStatus;
    timestamp: string;
    description: string;
  }[];
  courierName?: string;
  trackingNumber?: string;
  notes?: string;
  returnReason?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minOrderValue: number;
  description: string;
  isActive: boolean;
}
