import { Product, Coupon, Order } from '../types';

export const HERO_BANNER_IMAGE = '/src/assets/images/wearlix_hero_campaign_1794501045237.jpg';
export const MEN_IMAGE = '/src/assets/images/category_men_collection_1794501045445.jpg';
export const WOMEN_IMAGE = '/src/assets/images/category_women_collection_1794501044911.jpg';
export const HOODIE_IMAGE = '/src/assets/images/product_heavyweight_hoodie_1794501047505.jpg';
export const JACKET_IMAGE = '/src/assets/images/category_jackets_outerwear_1794501047510.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'wlx-jkt-001',
    name: 'Aura Wool & Leather Bomber Jacket',
    sku: 'WLX-JKT-001',
    category: 'jackets',
    gender: 'men',
    mrp: 6999,
    sellingPrice: 4499,
    discountPercent: 35,
    description: 'Constructed from a premium wool blend with tailored leather sleeves. Features matte black hardware, structured ribbing, and luxury satin thermal lining designed for unmatched silhouette and warmth.',
    features: [
      'Heavyweight 550 GSM Melton wool body',
      'Supple vegan nappa leather sleeves',
      'Dual-way YKK oxidized zipper',
      'Interior secure document pocket',
      'Signature WEARLIX embroidered tonal chest branding'
    ],
    fabric: '70% Wool, 30% Polyester; 100% Vegan Leather Sleeves',
    care: ['Dry clean only', 'Do not tumble dry', 'Store on structured wooden hanger'],
    images: [
      JACKET_IMAGE,
      HERO_BANNER_IMAGE,
      MEN_IMAGE
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Onyx Black', hex: '#111827' },
      { name: 'Deep Navy', hex: '#1e3a8a' }
    ],
    stock: 14,
    variants: [
      { size: 'S', color: 'Onyx Black', colorHex: '#111827', stock: 3 },
      { size: 'M', color: 'Onyx Black', colorHex: '#111827', stock: 5 },
      { size: 'L', color: 'Onyx Black', colorHex: '#111827', stock: 4 },
      { size: 'XL', color: 'Onyx Black', colorHex: '#111827', stock: 2 },
    ],
    rating: 4.9,
    reviewCount: 38,
    reviews: [
      {
        id: 'rev-1',
        userName: 'Arjun Verma',
        rating: 5,
        date: '2026-10-18',
        comment: 'The fit and structured shoulders are international runway standard. Best jacket purchase I made this season in Mumbai.',
        verifiedPurchase: true
      },
      {
        id: 'rev-2',
        userName: 'Rohan Mehra',
        rating: 5,
        date: '2026-10-04',
        comment: 'Worth every rupee. Heavyweight warmth, smooth lining and pristine finish.',
        verifiedPurchase: true
      }
    ],
    isNewArrival: true,
    isBestSeller: true,
    featured: true
  },
  {
    id: 'wlx-hdy-002',
    name: 'Apex 480GSM Cobalt Oversized Hoodie',
    sku: 'WLX-HDY-002',
    category: 'hoodies',
    gender: 'unisex',
    mrp: 3999,
    sellingPrice: 2499,
    discountPercent: 37,
    description: 'An ultra-heavyweight 480 GSM French Terry loopback cotton hoodie in our signature royal cobalt blue. Built with drop shoulders, clean crossover hood architecture, and anti-shrink loopback interior.',
    features: [
      '480 GSM 100% combed organic loopback cotton',
      'Seamless double-layered hood without tacky eyelets',
      'Pre-shrunk vintage wash with soft peach handfeel',
      'Thick 2x2 elastane reinforced cuffs & waist rib',
      'Embossed tonal WEARLIX signature emblem'
    ],
    fabric: '100% Organic Combed Loopback Cotton',
    care: ['Machine wash cold inside out', 'Hang to dry', 'Cool iron on reverse'],
    images: [
      HOODIE_IMAGE,
      HERO_BANNER_IMAGE,
      WOMEN_IMAGE
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Cobalt Blue', hex: '#155EEF' },
      { name: 'Pitch Black', hex: '#18181B' },
      { name: 'Ash Grey', hex: '#94A3B8' }
    ],
    stock: 28,
    variants: [
      { size: 'S', color: 'Cobalt Blue', colorHex: '#155EEF', stock: 6 },
      { size: 'M', color: 'Cobalt Blue', colorHex: '#155EEF', stock: 8 },
      { size: 'L', color: 'Cobalt Blue', colorHex: '#155EEF', stock: 9 },
      { size: 'XL', color: 'Cobalt Blue', colorHex: '#155EEF', stock: 5 },
    ],
    rating: 4.8,
    reviewCount: 92,
    reviews: [
      {
        id: 'rev-3',
        userName: 'Siddharth Rao',
        rating: 5,
        date: '2026-11-01',
        comment: 'The density of the 480 GSM fabric is insane! Keeps its shape after multiple washes.',
        verifiedPurchase: true
      }
    ],
    isBestSeller: true,
    isTrending: true,
    featured: true
  },
  {
    id: 'wlx-jkt-003',
    name: 'Atelier Minimal Trench Overcoat',
    sku: 'WLX-JKT-003',
    category: 'jackets',
    gender: 'women',
    mrp: 7499,
    sellingPrice: 4999,
    discountPercent: 33,
    description: 'Sculptural double-breasted cropped coat cut in high-density gabardine twill. Tailored with storm flaps, raglan sleeve drape, and horn button closures.',
    features: [
      'Water-repellent structured twill canvas',
      'Relaxed architectural silhouette',
      'Wide collar revers and deep welted pockets',
      'Fully lined with breathable viscose'
    ],
    fabric: '65% Cotton, 35% Technical Nylon',
    care: ['Gentle cycle dry clean', 'Low steam'],
    images: [
      WOMEN_IMAGE,
      HERO_BANNER_IMAGE,
      JACKET_IMAGE
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Cobalt Blue', hex: '#155EEF' },
      { name: 'Trench Sand', hex: '#D7C4A5' }
    ],
    stock: 12,
    variants: [
      { size: 'S', color: 'Cobalt Blue', colorHex: '#155EEF', stock: 4 },
      { size: 'M', color: 'Cobalt Blue', colorHex: '#155EEF', stock: 5 },
      { size: 'L', color: 'Cobalt Blue', colorHex: '#155EEF', stock: 3 },
    ],
    rating: 4.9,
    reviewCount: 24,
    reviews: [
      {
        id: 'rev-4',
        userName: 'Priya Sharma',
        rating: 5,
        date: '2026-10-25',
        comment: 'Received compliments non-stop at Delhi Fashion Week. Cut and drape is perfection.',
        verifiedPurchase: true
      }
    ],
    isNewArrival: true,
    featured: true
  },
  {
    id: 'wlx-jns-004',
    name: 'Raw Selvedge 14.5oz Indigo Denim',
    sku: 'WLX-JNS-004',
    category: 'jeans',
    gender: 'men',
    mrp: 4999,
    sellingPrice: 2999,
    discountPercent: 40,
    description: 'Authentic 14.5oz shuttle-loomed Japanese selvedge denim in unwashed deep indigo. Engineered to mold to your body and develop custom fading with every wear.',
    features: [
      '14.5oz 100% ringspun cotton shuttle loomed',
      'Red-line selvedge ID on coin pocket and cuff turnups',
      'Solid antique copper donut buttons & rivets',
      'Heavy duty herringbone cotton pocket bags'
    ],
    fabric: '100% Selvedge Cotton',
    care: ['Wear raw for 6 months before first cold soak', 'Line dry inside out'],
    images: [
      MEN_IMAGE,
      HERO_BANNER_IMAGE,
      JACKET_IMAGE
    ],
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Raw Indigo', hex: '#1e293b' },
      { name: 'Washed Black', hex: '#27272a' }
    ],
    stock: 22,
    variants: [
      { size: '30', color: 'Raw Indigo', colorHex: '#1e293b', stock: 5 },
      { size: '32', color: 'Raw Indigo', colorHex: '#1e293b', stock: 8 },
      { size: '34', color: 'Raw Indigo', colorHex: '#1e293b', stock: 6 },
      { size: '36', color: 'Raw Indigo', colorHex: '#1e293b', stock: 3 },
    ],
    rating: 4.7,
    reviewCount: 64,
    reviews: [],
    isTrending: true,
    featured: true
  },
  {
    id: 'wlx-tsh-005',
    name: 'Supima Heavyweight Boxy T-Shirt',
    sku: 'WLX-TSH-005',
    category: 't-shirts',
    gender: 'men',
    mrp: 1999,
    sellingPrice: 1199,
    discountPercent: 40,
    description: 'A 280 GSM heavyweight boxy tee cut from American Supima long-staple cotton. Featuring a tight 1.25" crewneck collar that never sags or bacon-necks.',
    features: [
      '280 GSM 100% Long-Staple Supima Cotton',
      'Reinforced high-density ribbed neck band',
      'Relaxed drop-shoulder boxy silhouette',
      'Pre-washed to guarantee zero shrinkage'
    ],
    fabric: '100% Supima Cotton',
    care: ['Machine wash warm', 'Tumble dry low'],
    images: [
      MEN_IMAGE,
      HOODIE_IMAGE,
      HERO_BANNER_IMAGE
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Chalk White', hex: '#FFFFFF' },
      { name: 'Slate Black', hex: '#0F172A' },
      { name: 'WEARLIX Blue', hex: '#155EEF' }
    ],
    stock: 45,
    variants: [
      { size: 'S', color: 'Chalk White', colorHex: '#FFFFFF', stock: 12 },
      { size: 'M', color: 'Chalk White', colorHex: '#FFFFFF', stock: 15 },
      { size: 'L', color: 'Chalk White', colorHex: '#FFFFFF', stock: 10 },
      { size: 'XL', color: 'Chalk White', colorHex: '#FFFFFF', stock: 8 },
    ],
    rating: 4.9,
    reviewCount: 115,
    reviews: [],
    isBestSeller: true,
    featured: true
  },
  {
    id: 'wlx-shr-006',
    name: 'Resort Camp-Collar Poplin Shirt',
    sku: 'WLX-SHR-006',
    category: 'shirts',
    gender: 'men',
    mrp: 2799,
    sellingPrice: 1799,
    discountPercent: 35,
    description: 'Crisp cotton poplin shirt with relaxed Cuban collar, straight hem with side vents, and custom mother-of-pearl buttons.',
    features: [
      '100% Mercerized Egyptian cotton poplin',
      'Camp collar silhouette with loop closure',
      'Mother of pearl natural shell buttons',
      'Clean French-seamed interior'
    ],
    fabric: '100% Mercerized Cotton Poplin',
    care: ['Machine wash cold', 'Warm iron'],
    images: [
      MEN_IMAGE,
      WOMEN_IMAGE,
      HERO_BANNER_IMAGE
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Sky Stripe', hex: '#38BDF8' }
    ],
    stock: 19,
    variants: [
      { size: 'S', color: 'Pure White', colorHex: '#FFFFFF', stock: 4 },
      { size: 'M', color: 'Pure White', colorHex: '#FFFFFF', stock: 7 },
      { size: 'L', color: 'Pure White', colorHex: '#FFFFFF', stock: 5 },
      { size: 'XL', color: 'Pure White', colorHex: '#FFFFFF', stock: 3 },
    ],
    rating: 4.8,
    reviewCount: 41,
    reviews: [],
    isNewArrival: true
  },
  {
    id: 'wlx-jkt-007',
    name: 'Alpine Down Puffer Tech Jacket',
    sku: 'WLX-JKT-007',
    category: 'jackets',
    gender: 'women',
    mrp: 8999,
    sellingPrice: 5999,
    discountPercent: 33,
    description: '700-fill power responsibly sourced goose down puffer featuring waterproof ripstop nylon shell, fleece-lined handwarmer pockets, and convertible storm collar.',
    features: [
      '700-fill power RDS certified goose down',
      'DWR coated ripstop matte nylon shell',
      'Internal elasticized storm wind-guard cuffs',
      'Two-way weather-sealed AquaGuard zipper'
    ],
    fabric: 'Shell: 100% Ripstop Nylon; Insulation: 90% Down, 10% Feathers',
    care: ['Specialist down cleaning or gentle tumble dry with tennis balls'],
    images: [
      HERO_BANNER_IMAGE,
      JACKET_IMAGE,
      WOMEN_IMAGE
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Charcoal Grey', hex: '#374151' },
      { name: 'Cobalt Night', hex: '#1E3A8A' }
    ],
    stock: 8,
    variants: [
      { size: 'S', color: 'Charcoal Grey', colorHex: '#374151', stock: 2 },
      { size: 'M', color: 'Charcoal Grey', colorHex: '#374151', stock: 4 },
      { size: 'L', color: 'Charcoal Grey', colorHex: '#374151', stock: 2 },
    ],
    rating: 4.9,
    reviewCount: 19,
    reviews: [],
    isBestSeller: true
  },
  {
    id: 'wlx-kds-008',
    name: 'Junior Active Streetwear Windbreaker',
    sku: 'WLX-KDS-008',
    category: 'kids',
    gender: 'kids',
    mrp: 2999,
    sellingPrice: 1899,
    discountPercent: 36,
    description: 'Lightweight weather-resistant technical windbreaker tailored for active movement. Features reflective safety piping, breathable mesh lining, and durable ripstop fabric.',
    features: [
      'Tear-resistant micro-ripstop shell',
      'Reflective 3M safety accents',
      'Chafe-free chin guard zip protector',
      'Packable into its own inner pouch'
    ],
    fabric: '100% Recycled Polyester',
    care: ['Machine wash cold', 'Fast drying'],
    images: [
      HERO_BANNER_IMAGE,
      HOODIE_IMAGE,
      MEN_IMAGE
    ],
    sizes: ['4-6Y', '6-8Y', '8-10Y', '10-12Y'],
    colors: [
      { name: 'Electric Blue', hex: '#155EEF' },
      { name: 'Steel Slate', hex: '#475569' }
    ],
    stock: 25,
    variants: [
      { size: '4-6Y', color: 'Electric Blue', colorHex: '#155EEF', stock: 6 },
      { size: '6-8Y', color: 'Electric Blue', colorHex: '#155EEF', stock: 8 },
      { size: '8-10Y', color: 'Electric Blue', colorHex: '#155EEF', stock: 7 },
      { size: '10-12Y', color: 'Electric Blue', colorHex: '#155EEF', stock: 4 },
    ],
    rating: 4.8,
    reviewCount: 31,
    reviews: [],
    isTrending: true
  },
  {
    id: 'wlx-jns-009',
    name: 'Wide-Leg Pleated Carpenter Jeans',
    sku: 'WLX-JNS-009',
    category: 'jeans',
    gender: 'women',
    mrp: 4499,
    sellingPrice: 2899,
    discountPercent: 35,
    description: 'High-waisted relaxed wide-leg denim with subtle front pleats and utility hammer loop detailing. Crafted from 100% non-stretch cotton twill for an effortless slouch.',
    features: [
      '13oz 100% cotton washed ring denim',
      'High rise with tailored front pleat architecture',
      'Relaxed puddle drape over sneakers or boots',
      'Custom stamped WEARLIX metal hardware'
    ],
    fabric: '100% Cotton Denim',
    care: ['Machine wash cold inside out', 'Line dry in shade'],
    images: [
      WOMEN_IMAGE,
      HERO_BANNER_IMAGE,
      MEN_IMAGE
    ],
    sizes: ['26', '28', '30', '32'],
    colors: [
      { name: 'Vintage Stone Blue', hex: '#64748B' },
      { name: 'Chalk White', hex: '#F8FAFC' }
    ],
    stock: 16,
    variants: [
      { size: '26', color: 'Vintage Stone Blue', colorHex: '#64748B', stock: 3 },
      { size: '28', color: 'Vintage Stone Blue', colorHex: '#64748B', stock: 6 },
      { size: '30', color: 'Vintage Stone Blue', colorHex: '#64748B', stock: 5 },
      { size: '32', color: 'Vintage Stone Blue', colorHex: '#64748B', stock: 2 },
    ],
    rating: 4.7,
    reviewCount: 44,
    reviews: [],
    isNewArrival: true
  },
  {
    id: 'wlx-hdy-010',
    name: 'Monolith Zip Hoodie Fleece',
    sku: 'WLX-HDY-010',
    category: 'hoodies',
    gender: 'men',
    mrp: 4299,
    sellingPrice: 2699,
    discountPercent: 37,
    description: 'A heavyweight dual-zip hoodie cut from premium 450 GSM brushed fleece with a structured hood that stays upright, raglan sleeves, and custom double zipper pullers.',
    features: [
      '450 GSM fleece with ultra-soft brushed interior',
      'Two-way matte nickel custom zipper',
      'Hidden zippered internal phone pocket',
      'Clean rib cuffs and hem band'
    ],
    fabric: '85% Cotton, 15% Polyester for durability',
    care: ['Machine wash warm', 'Tumble dry low'],
    images: [
      HOODIE_IMAGE,
      JACKET_IMAGE,
      HERO_BANNER_IMAGE
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Onyx Black', hex: '#0F172A' },
      { name: 'Cobalt Blue', hex: '#155EEF' }
    ],
    stock: 20,
    variants: [
      { size: 'S', color: 'Onyx Black', colorHex: '#0F172A', stock: 4 },
      { size: 'M', color: 'Onyx Black', colorHex: '#0F172A', stock: 7 },
      { size: 'L', color: 'Onyx Black', colorHex: '#0F172A', stock: 6 },
      { size: 'XL', color: 'Onyx Black', colorHex: '#0F172A', stock: 3 },
    ],
    rating: 4.8,
    reviewCount: 52,
    reviews: [],
    isTrending: true
  },
  {
    id: 'wlx-shr-011',
    name: 'Oversized Oxford Structured Shirt',
    sku: 'WLX-SHR-011',
    category: 'shirts',
    gender: 'unisex',
    mrp: 3299,
    sellingPrice: 2199,
    discountPercent: 33,
    description: 'Heavyweight organic cotton Oxford cloth shirt with button-down collar, curved hemline, and relaxed contemporary proportions.',
    features: [
      'Heavyweight 220 GSM combed Oxford cloth',
      'Roll collar with concealed button tabs',
      'Box pleat and locker loop at back',
      'Pearlised resin button closures'
    ],
    fabric: '100% Organic Oxford Cotton',
    care: ['Machine wash cold', 'Hang dry', 'Steam iron'],
    images: [
      MEN_IMAGE,
      WOMEN_IMAGE,
      HERO_BANNER_IMAGE
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Classic Sky Blue', hex: '#93C5FD' },
      { name: 'Crisp White', hex: '#FFFFFF' }
    ],
    stock: 30,
    variants: [
      { size: 'S', color: 'Classic Sky Blue', colorHex: '#93C5FD', stock: 7 },
      { size: 'M', color: 'Classic Sky Blue', colorHex: '#93C5FD', stock: 10 },
      { size: 'L', color: 'Classic Sky Blue', colorHex: '#93C5FD', stock: 8 },
      { size: 'XL', color: 'Classic Sky Blue', colorHex: '#93C5FD', stock: 5 },
    ],
    rating: 4.9,
    reviewCount: 37,
    reviews: [],
    isBestSeller: true
  },
  {
    id: 'wlx-kds-012',
    name: 'Junior Signature Fleece Hoodie',
    sku: 'WLX-KDS-012',
    category: 'kids',
    gender: 'kids',
    mrp: 2499,
    sellingPrice: 1599,
    discountPercent: 36,
    description: 'Ultra-soft fleece hoodie designed for comfort and everyday play. Features reinforced elbow patches and tagless collar for zero irritation.',
    features: [
      '100% soft brushed cotton fleece',
      'Reinforced double stitching throughout',
      'Safe no-drawcord hood design',
      'Kangaroo hand pocket'
    ],
    fabric: '100% Cotton Fleece',
    care: ['Machine wash warm', 'Tumble dry low'],
    images: [
      HOODIE_IMAGE,
      HERO_BANNER_IMAGE,
      MEN_IMAGE
    ],
    sizes: ['4-6Y', '6-8Y', '8-10Y', '10-12Y'],
    colors: [
      { name: 'Royal Blue', hex: '#155EEF' },
      { name: 'Heather Grey', hex: '#CBD5E1' }
    ],
    stock: 22,
    variants: [
      { size: '4-6Y', color: 'Royal Blue', colorHex: '#155EEF', stock: 5 },
      { size: '6-8Y', color: 'Royal Blue', colorHex: '#155EEF', stock: 7 },
      { size: '8-10Y', color: 'Royal Blue', colorHex: '#155EEF', stock: 6 },
      { size: '10-12Y', color: 'Royal Blue', colorHex: '#155EEF', stock: 4 },
    ],
    rating: 4.7,
    reviewCount: 22,
    reviews: [],
    isNewArrival: true
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'WEARLIX10',
    discountPercent: 10,
    minOrderValue: 999,
    description: '10% instant discount on orders above ₹999',
    isActive: true
  },
  {
    code: 'FIRSTSTYLE',
    discountAmount: 500,
    minOrderValue: 2499,
    description: 'Flat ₹500 off on your luxury wardrobe upgrade above ₹2499',
    isActive: true
  },
  {
    code: 'VIP20',
    discountPercent: 20,
    minOrderValue: 4999,
    description: 'VIP 20% discount on orders above ₹4999',
    isActive: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'KZ-8492019384',
    date: '2026-11-10T14:32:00Z',
    customer: {
      name: 'Aditya Singhania',
      email: 'aditya.singhania@gmail.com',
      phone: '+91 98201 44820'
    },
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Aditya Singhania',
      phone: '+91 98201 44820',
      email: 'aditya.singhania@gmail.com',
      street: 'Flat 402, Sea Crest Towers, Worli Sea Face',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400018',
      isDefault: true
    },
    items: [
      {
        productId: 'wlx-jkt-001',
        productName: 'Aura Wool & Leather Bomber Jacket',
        image: JACKET_IMAGE,
        size: 'L',
        color: 'Onyx Black',
        quantity: 1,
        price: 4499
      },
      {
        productId: 'wlx-tsh-005',
        productName: 'Supima Heavyweight Boxy T-Shirt',
        image: MEN_IMAGE,
        size: 'L',
        color: 'Chalk White',
        quantity: 2,
        price: 1199
      }
    ],
    subtotal: 6897,
    discount: 689,
    shippingFee: 0,
    total: 6208,
    paymentMethod: 'Online Payment',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    timeline: [
      {
        status: 'Confirmed',
        timestamp: 'Nov 10, 2026 02:35 PM',
        description: 'Order confirmed and verified via payment gateway.'
      },
      {
        status: 'Processing',
        timestamp: 'Nov 10, 2026 05:12 PM',
        description: 'Allocated from Mumbai fulfillment center.'
      },
      {
        status: 'Packed',
        timestamp: 'Nov 11, 2026 10:45 AM',
        description: 'Custom WEARLIX luxury garment bag packed and sealed.'
      },
      {
        status: 'Shipped',
        timestamp: 'Nov 11, 2026 04:30 PM',
        description: 'Dispatched via Blue Dart Express (Tracking: BD89371029IN).'
      }
    ],
    courierName: 'Blue Dart Air Express',
    trackingNumber: 'BD89371029IN'
  },
  {
    id: 'KZ-4920184712',
    date: '2026-11-06T10:15:00Z',
    customer: {
      name: 'Ananya Kapoor',
      email: 'ananya.k@outlook.com',
      phone: '+91 97110 59281'
    },
    shippingAddress: {
      id: 'addr-2',
      fullName: 'Ananya Kapoor',
      phone: '+91 97110 59281',
      email: 'ananya.k@outlook.com',
      street: 'B-12, Golf Links',
      city: 'New Delhi',
      state: 'Delhi',
      pinCode: '110003',
      isDefault: true
    },
    items: [
      {
        productId: 'wlx-jkt-003',
        productName: 'Atelier Minimal Trench Overcoat',
        image: WOMEN_IMAGE,
        size: 'M',
        color: 'Cobalt Blue',
        quantity: 1,
        price: 4999
      }
    ],
    subtotal: 4999,
    discount: 500,
    shippingFee: 0,
    total: 4499,
    paymentMethod: 'Online Payment',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    timeline: [
      {
        status: 'Confirmed',
        timestamp: 'Nov 06, 2026 10:18 AM',
        description: 'Payment authorized and receipt emailed.'
      },
      {
        status: 'Shipped',
        timestamp: 'Nov 07, 2026 02:00 PM',
        description: 'Dispatched from Gurgaon warehouse via Delhivery Express.'
      },
      {
        status: 'Out for Delivery',
        timestamp: 'Nov 08, 2026 09:30 AM',
        description: 'Out for delivery with rider Rajesh (+91 98110 23411).'
      },
      {
        status: 'Delivered',
        timestamp: 'Nov 08, 2026 01:45 PM',
        description: 'Delivered to resident at Golf Links address.'
      }
    ],
    courierName: 'Delhivery Surface Plus',
    trackingNumber: 'DLV99418290'
  }
];
