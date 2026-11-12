# WEARLIX — Premium Fashion E-Commerce

> **YOUR STYLE. YOUR RULES.**
> Premium Indian fashion e-commerce storefront crafted for modern streetwear, luxury outerwear, heavyweight loopback cotton hoodies, and Japanese selvedge denim.

---

## 💎 Brand Identity & Aesthetics

- **Primary Blue:** `#155EEF`
- **Dark Neutral:** `#101828`
- **Canvas Neutral:** `#F2F4F7`
- **Accent & White:** `#FFFFFF`
- **Target Market:** India (Pan-India Express Air Shipping)
- **Currency:** Indian Rupee (`INR` / `₹`)
- **Typography:** `Plus Jakarta Sans` geometric & display hierarchy with tabular numerals (`tabular-nums`)

---

## 🚀 Features & Architecture

### 1. Catalog & Product Architecture
- Detailed product models with unique IDs, SKUs (e.g., `WLX-JKT-001`), descriptions, fabric composition, and care specs.
- Accurate pricing engine: MRP (Maximum Retail Price), discounted Selling Price, and calculated discount percentages.
- Multi-dimensional variant selection: Size variants (`XS` through `XXL`, waist measurements `30`–`36`, Kids `4-6Y`–`12Y`) and Color swatches with live hex tokens.
- Inventory tracking with out-of-stock and low-stock protection.
- High-fidelity product gallery with interactive zoom and multi-angle previews.

### 2. Functional Shopping Cart & Bag Drawer
- Add, update quantity, and remove items with real stock limits enforcement.
- Variant switching directly from the cart and slide-over bag drawer.
- Automatic subtotal, shipping calculation, and dynamic free shipping progress bar (Free Express Shipping on orders above ₹999).
- Promotional coupon engine with instant validation (e.g., `WEARLIX10` for 10% off, `FIRSTSTYLE` for flat ₹500 off).
- Complete `localStorage` persistence across page reloads.

### 3. Professional Indian Checkout Flow
- Full shipping destination form tailored for Indian addresses (Name, Phone, Street, City, State, 6-digit PIN code).
- Configurable payment options:
  - **Online Payment:** Integrated with a separated, modular `RazorpayModal` interface (UPI with Google Pay / PhonePe / Paytm / BHIM, Credit & Debit Cards, Netbanking).
  - **Cash on Delivery (COD):** Available across 27,000+ Indian PIN codes.
- Immediate order confirmation with celebratory confetti and unique tracking reference generation (`KZ-XXXXXXXXXX`).

### 4. Order Management & Live Logistics Tracking
- Standardized order tracking format: `KZ-XXXXXXXXXX` (e.g. `KZ-8492019384`).
- Comprehensive order lifecycle stages:
  - `Pending` $\to$ `Confirmed` $\to$ `Processing` $\to$ `Packed` $\to$ `Shipped` $\to$ `Out for Delivery` $\to$ `Delivered` (with `Cancelled` / `Returned` support).
- Milestone timeline with live courier name (`Blue Dart Air Express`, `Delhivery Surface Plus`) and AWB tracking numbers.
- Self-service 7-day hassle-free doorstep exchange and return request workflow.

### 5. Customer Account & Authentication
- Dual-mode authentication:
  - Standard email and password login/registration.
  - **Demo Mode**: One-click login as Aditya Singhania (VIP Client) with pre-loaded addresses and orders.
- Saved address book with default address toggling, creation, editing, and deletion.
- Integrated customer wishlist with bulk "Add All to Bag".

### 6. Owner Admin Dashboard (`/admin`)
- **Overview:** Real-time revenue analytics, order volume counter, active customer count, live product catalog, and revenue performance bar chart.
- **Products:** Manage garments, prices, MRP discounts, SKU variants, and modal to create new styles.
- **Categories:** Direct overview of category counts and routing.
- **Inventory:** Batch stock restock buttons (+10 / +50 units) and low-stock warnings.
- **Orders:** Complete order pipeline with instant status changer.
- **Customers:** VIP customer directory with lifetime spends.
- **Coupons:** Active promo codes and minimum order value rules.
- **Banners:** Storefront promotional hero lookbook controller.
- **Reviews:** Customer feedback moderation.
- **Returns:** Doorstep reverse pickup approvals.
- **Website Settings:** Store thresholds, support lines, and Razorpay Sandbox API keys.

---

## 📂 Complete Page Directory (All 27 Pages + Admin)

1. **Home:** `/`
2. **Shop:** `/shop`
3. **All Products:** `/products`
4. **Men:** `/category/men` or `/men`
5. **Women:** `/category/women` or `/women`
6. **Kids:** `/category/kids` or `/kids`
7. **Jackets:** `/category/jackets` or `/jackets`
8. **Hoodies:** `/category/hoodies` or `/hoodies`
9. **T-Shirts:** `/category/t-shirts` or `/t-shirts`
10. **Shirts:** `/category/shirts` or `/shirts`
11. **Jeans:** `/category/jeans` or `/jeans`
12. **Product Details:** `/product/:id`
13. **Search Results:** `/search`
14. **Shopping Cart:** `/cart`
15. **Checkout:** `/checkout`
16. **Login:** `/login`
17. **Signup:** `/signup`
18. **My Account:** `/account`
19. **My Orders:** `/orders`
20. **Track Order:** `/track-order` & `/track-order/:orderId`
21. **Wishlist:** `/wishlist`
22. **About Us:** `/about`
23. **Contact Us:** `/contact`
24. **FAQ:** `/faq`
25. **Privacy Policy:** `/privacy-policy`
26. **Terms & Conditions:** `/terms`
27. **Return & Exchange Policy:** `/return-policy`
28. **Owner Admin Console:** `/admin`

---

## 🛠️ Local Development & Installation

### Requirements
- Node.js 18+ or 20+
- npm 9+

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:3000`.

### 3. Production Build
```bash
npm run build
```

### 4. Type Checking / Lint
```bash
npm run lint
```
