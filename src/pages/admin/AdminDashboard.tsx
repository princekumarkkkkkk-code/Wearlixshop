import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Boxes,
  ShoppingBag,
  Users,
  Tag,
  Image as ImageIcon,
  Star,
  RotateCcw,
  Settings,
  ArrowUpRight,
  TrendingUp,
  Search,
  Plus,
  Trash2,
  Edit2,
  Check,
  AlertTriangle,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  X
} from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { INITIAL_PRODUCTS, INITIAL_COUPONS } from '../../data/mockData';
import { Product, OrderStatus, Coupon } from '../../types';

type AdminTab =
  | 'overview'
  | 'products'
  | 'categories'
  | 'inventory'
  | 'orders'
  | 'customers'
  | 'coupons'
  | 'banners'
  | 'reviews'
  | 'returns'
  | 'settings';

export const AdminDashboard: React.FC = () => {
  const { orders, updateOrderStatus } = useOrders();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [selectedOrderFilter, setSelectedOrderFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Add Product Modal
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: 'jackets' as any,
    gender: 'men' as any,
    mrp: 4999,
    sellingPrice: 2999,
    stock: 25,
    description: '',
    fabric: '100% Heavyweight Cotton'
  });

  // Settings State
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'WEARLIX',
    tagline: 'YOUR STYLE. YOUR RULES.',
    freeShippingThreshold: 999,
    currency: 'INR (₹)',
    supportEmail: 'care@wearlix.in',
    supportPhone: '+91 98201 44820',
    razorpayKeyId: 'rzp_test_WEARLIX_DEMO_KEY_99',
    razorpayEnabled: true,
    codEnabled: true
  });
  const [settingsSavedNotice, setSettingsSavedNotice] = useState(false);

  // Compute metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.total : 0), 0);
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;
  const totalCustomers = 4; // Aditya, Ananya, Arjun, Priya

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.sku) return;

    const discountPercent = Math.round(((newProduct.mrp - newProduct.sellingPrice) / newProduct.mrp) * 100);
    const prod: Product = {
      id: `wlx-${Date.now()}`,
      name: newProduct.name,
      sku: newProduct.sku,
      category: newProduct.category,
      gender: newProduct.gender,
      mrp: Number(newProduct.mrp),
      sellingPrice: Number(newProduct.sellingPrice),
      discountPercent: Math.max(0, discountPercent),
      description: newProduct.description || 'Premium crafted garment designed by WEARLIX.',
      features: ['Heavyweight yarn composition', 'Reinforced seams', 'Pre-shrunk fabric'],
      fabric: newProduct.fabric,
      care: ['Machine wash cold', 'Hang dry'],
      images: [INITIAL_PRODUCTS[0].images[0]],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Onyx Black', hex: '#111827' }],
      stock: Number(newProduct.stock),
      variants: [
        { size: 'M', color: 'Onyx Black', colorHex: '#111827', stock: Number(newProduct.stock) }
      ],
      rating: 5.0,
      reviewCount: 1,
      reviews: [],
      isNewArrival: true,
      featured: true
    };

    setProducts([prod, ...products]);
    setIsAddProductOpen(false);
    setNewProduct({
      name: '',
      sku: '',
      category: 'jackets',
      gender: 'men',
      mrp: 4999,
      sellingPrice: 2999,
      stock: 25,
      description: '',
      fabric: '100% Heavyweight Cotton'
    });
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Delete this product from catalog?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleStockUpdate = (productId: string, increment: number) => {
    setProducts(products.map(p => {
      if (p.id === productId) {
        const newStock = Math.max(0, p.stock + increment);
        return { ...p, stock: newStock };
      }
      return p;
    }));
  };

  const filteredOrders = orders.filter(o => {
    if (selectedOrderFilter !== 'all' && o.orderStatus.toLowerCase() !== selectedOrderFilter.toLowerCase()) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return o.id.toLowerCase().includes(q) || o.customer.name.toLowerCase().includes(q);
    }
    return true;
  });

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: FolderTree },
    { id: 'inventory', label: 'Inventory', icon: Boxes },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: orders.length },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'coupons', label: 'Coupons', icon: Tag },
    { id: 'banners', label: 'Banners', icon: ImageIcon },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'returns', label: 'Returns', icon: RotateCcw },
    { id: 'settings', label: 'Website Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#F2F4F7] flex flex-col">
      {/* Top Admin Navigation Header */}
      <header className="bg-[#101828] text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white">WEARLIX</span>
              <span className="bg-[#155EEF] text-white text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase">
                ADMIN CONSOLE
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-400 hidden sm:inline">Owner session: <strong className="text-white">Admin Privileges</strong></span>
            <Link
              to="/"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Admin Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-1 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs h-fit sticky top-24">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
            Store Administration
          </p>

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as AdminTab)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#155EEF] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-100 mt-4 px-3 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
            <p>Designed for future secure backend RBAC & API token authorization.</p>
          </div>
        </aside>

        {/* Tab View Canvas */}
        <main className="lg:col-span-9 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metric KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Gross Revenue</span>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 font-mono mt-2 tabular-nums">
                    ₹{totalRevenue.toLocaleString('en-IN')}
                  </h3>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    +18.4% from last drop
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Orders</span>
                    <ShoppingBag className="w-4 h-4 text-[#155EEF]" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 font-mono mt-2 tabular-nums">
                    {totalOrdersCount}
                  </h3>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    All KZ- prefixed references
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Garments</span>
                    <Package className="w-4 h-4 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 font-mono mt-2 tabular-nums">
                    {totalProductsCount}
                  </h3>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Across 8 apparel categories
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Client Base</span>
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 font-mono mt-2 tabular-nums">
                    {totalCustomers}
                  </h3>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Registered VIP purchasers
                  </span>
                </div>
              </div>

              {/* Sales Chart Mock Visualization */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Revenue Performance Curve (November 2026)</h3>
                    <p className="text-xs text-slate-400">Daily gross orders across Indian metro shipments</p>
                  </div>
                  <span className="text-xs font-bold font-mono text-[#155EEF] bg-blue-50 px-3 py-1 rounded-lg">
                    ₹6,208 Avg Daily Order
                  </span>
                </div>

                {/* Bar chart representation */}
                <div className="h-48 flex items-end gap-3 pt-6 pb-2 border-b border-slate-100">
                  {[
                    { day: 'Nov 06', val: 4499, height: '55%' },
                    { day: 'Nov 07', val: 2999, height: '40%' },
                    { day: 'Nov 08', val: 7899, height: '80%' },
                    { day: 'Nov 09', val: 5199, height: '62%' },
                    { day: 'Nov 10', val: 6208, height: '70%' },
                    { day: 'Nov 11', val: 9400, height: '95%' },
                    { day: 'Nov 12', val: 4200, height: '50%' },
                  ].map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="text-[10px] font-mono font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        ₹{d.val}
                      </div>
                      <div
                        className="w-full bg-[#155EEF] rounded-t-lg group-hover:bg-blue-700 transition-all"
                        style={{ height: d.height }}
                      />
                      <span className="text-[10px] text-slate-400 font-mono">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Orders Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Recent Customer Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-xs text-[#155EEF] font-bold hover:underline">
                    Manage All Orders ({orders.length}) →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="p-3.5">Order ID</th>
                        <th className="p-3.5">Customer</th>
                        <th className="p-3.5">Items</th>
                        <th className="p-3.5">Amount</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5">Quick Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.slice(0, 5).map(o => (
                        <tr key={o.id} className="hover:bg-slate-50/80">
                          <td className="p-3.5 font-mono font-bold text-[#155EEF]">{o.id}</td>
                          <td className="p-3.5">
                            <span className="font-bold text-slate-900 block">{o.customer.name}</span>
                            <span className="text-slate-400 text-[11px]">{o.shippingAddress.city}</span>
                          </td>
                          <td className="p-3.5 font-mono">{o.items.length} garments</td>
                          <td className="p-3.5 font-mono font-bold">₹{o.total.toLocaleString('en-IN')}</td>
                          <td className="p-3.5">
                            <select
                              value={o.orderStatus}
                              onChange={e => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                              className="text-xs font-semibold bg-slate-100 border border-slate-200 rounded px-2 py-1"
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Processing">Processing</option>
                              <option value="Packed">Packed</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-3.5">
                            <Link
                              to={`/track-order/${o.id}`}
                              className="text-[#155EEF] hover:underline font-semibold"
                            >
                              View Timeline
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Garment Catalog ({products.length})</h2>
                  <p className="text-xs text-slate-500">Manage apparel styles, pricing, MRP discounts, and SKU variants.</p>
                </div>
                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className="bg-[#155EEF] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Garment</span>
                </button>
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="p-3.5">Garment</th>
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5">SKU</th>
                        <th className="p-3.5">Selling Price</th>
                        <th className="p-3.5">Inventory</th>
                        <th className="p-3.5">Rating</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50">
                          <td className="p-3.5 flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-12 object-cover rounded-lg bg-slate-100 shrink-0"
                            />
                            <div>
                              <span className="font-bold text-slate-900 block max-w-xs truncate">{p.name}</span>
                              <span className="text-[11px] text-slate-400">{p.fabric}</span>
                            </div>
                          </td>
                          <td className="p-3.5 uppercase text-[11px] font-semibold text-slate-600">{p.category}</td>
                          <td className="p-3.5 font-mono text-slate-600">{p.sku}</td>
                          <td className="p-3.5 font-mono font-bold text-slate-900">
                            ₹{p.sellingPrice.toLocaleString('en-IN')}{' '}
                            <span className="text-slate-400 line-through text-[11px]">₹{p.mrp}</span>
                          </td>
                          <td className="p-3.5 font-mono font-bold">
                            <span className={p.stock <= 5 ? 'text-amber-600' : 'text-slate-800'}>
                              {p.stock} units
                            </span>
                          </td>
                          <td className="p-3.5 font-mono">★ {p.rating.toFixed(1)} ({p.reviewCount})</td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="text-red-500 hover:text-red-700 p-1 rounded"
                              title="Delete style"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Category Architecture</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: 'Jackets & Outerwear', slug: 'jackets', count: products.filter(p => p.category === 'jackets').length },
                  { name: '480 GSM Hoodies', slug: 'hoodies', count: products.filter(p => p.category === 'hoodies').length },
                  { name: 'T-Shirts & Tops', slug: 't-shirts', count: products.filter(p => p.category === 't-shirts').length },
                  { name: 'Tailored Shirts', slug: 'shirts', count: products.filter(p => p.category === 'shirts').length },
                  { name: 'Japanese Denim & Jeans', slug: 'jeans', count: products.filter(p => p.category === 'jeans').length },
                  { name: "Men's Apparel", slug: 'men', count: products.filter(p => p.gender === 'men').length },
                  { name: "Women's Collection", slug: 'women', count: products.filter(p => p.gender === 'women').length },
                  { name: 'Junior & Kids', slug: 'kids', count: products.filter(p => p.gender === 'kids').length },
                ].map(cat => (
                  <div key={cat.slug} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{cat.name}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">/category/{cat.slug}</p>
                    </div>
                    <span className="font-mono font-bold text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                      {cat.count} styles
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Inventory Stock Controller</h2>
                  <p className="text-xs text-slate-500">Fast batch restock and low-stock telemetry.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="p-3.5">Product SKU</th>
                      <th className="p-3.5">Name</th>
                      <th className="p-3.5">Current Stock</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Quick Restock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="p-3.5 font-mono text-slate-500">{p.sku}</td>
                        <td className="p-3.5 font-bold text-slate-900">{p.name}</td>
                        <td className="p-3.5 font-mono font-bold">{p.stock} units</td>
                        <td className="p-3.5">
                          {p.stock <= 5 ? (
                            <span className="text-amber-700 bg-amber-50 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded">
                              LOW STOCK
                            </span>
                          ) : (
                            <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded">
                              OPTIMAL
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleStockUpdate(p.id, 10)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded"
                          >
                            +10 Units
                          </button>
                          <button
                            onClick={() => handleStockUpdate(p.id, 50)}
                            className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-bold px-2.5 py-1 rounded"
                          >
                            +50 Units
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Order Management ({orders.length})</h2>
                  <p className="text-xs text-slate-500">Track shipments, adjust statuses, and manage fulfillment.</p>
                </div>

                <div className="flex gap-2">
                  <select
                    value={selectedOrderFilter}
                    onChange={e => setSelectedOrderFilter(e.target.value)}
                    className="text-xs font-semibold bg-white border border-slate-300 rounded-xl px-3 py-2 shadow-xs"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Returned">Returned</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Customer / Contact</th>
                      <th className="p-3.5">Total & Payment</th>
                      <th className="p-3.5">Logistics Status</th>
                      <th className="p-3.5">Tracking Number</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.map(o => (
                      <tr key={o.id} className="hover:bg-slate-50">
                        <td className="p-3.5 font-mono font-bold text-[#155EEF]">
                          <Link to={`/track-order/${o.id}`} className="hover:underline">
                            {o.id}
                          </Link>
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-slate-900 block">{o.customer.name}</span>
                          <span className="text-slate-400 text-[11px]">{o.customer.phone}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-mono font-bold text-slate-900 block">
                            ₹{o.total.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[11px] text-slate-500">{o.paymentMethod}</span>
                        </td>
                        <td className="p-3.5">
                          <select
                            value={o.orderStatus}
                            onChange={e => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                            className="text-xs font-semibold bg-slate-100 border border-slate-200 rounded px-2.5 py-1.5 focus:border-[#155EEF]"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Packed">Packed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Returned">Returned</option>
                          </select>
                        </td>
                        <td className="p-3.5 font-mono text-slate-600">
                          {o.trackingNumber || 'Pending'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: CUSTOMERS */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Client Directory</h2>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="p-3.5">Customer Name</th>
                      <th className="p-3.5">Email</th>
                      <th className="p-3.5">Phone</th>
                      <th className="p-3.5">Default Location</th>
                      <th className="p-3.5">Total Orders</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Aditya Singhania</td>
                      <td className="p-3.5 font-mono text-slate-600">aditya.singhania@gmail.com</td>
                      <td className="p-3.5 font-mono text-slate-600">+91 98201 44820</td>
                      <td className="p-3.5">Mumbai, MH</td>
                      <td className="p-3.5 font-mono font-bold">1 Order (₹6,208)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Ananya Kapoor</td>
                      <td className="p-3.5 font-mono text-slate-600">ananya.k@outlook.com</td>
                      <td className="p-3.5 font-mono text-slate-600">+91 97110 59281</td>
                      <td className="p-3.5">New Delhi, DL</td>
                      <td className="p-3.5 font-mono font-bold">1 Order (₹4,499)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: COUPONS */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">Voucher & Coupon Codes</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {coupons.map(cp => (
                  <div key={cp.code} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-base text-[#155EEF]">{cp.code}</span>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{cp.description}</p>
                    <div className="text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-100">
                      Min Order: ₹{cp.minOrderValue.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: BANNERS */}
          {activeTab === 'banners' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Hero & Campaign Banners</h2>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Autumn/Winter '26 Primary Campaign Hero</h4>
                    <p className="text-xs text-slate-500">Currently active on the homepage hero slot</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
                    LIVE ON STOREFRONT
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400 block font-semibold mb-1">Headline Text</span>
                    <p className="text-sm font-bold text-slate-900">YOUR STYLE. YOUR RULES.</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold mb-1">Subheading Copy</span>
                    <p className="text-slate-700">Precision-engineered luxury essentials. From 480 GSM French Terry loopback hoodies...</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Review Moderation</h2>
              <div className="space-y-3">
                {[
                  { user: 'Arjun Verma', product: 'Aura Wool & Leather Bomber Jacket', rating: 5, date: '2026-10-18', comment: 'The fit and structured shoulders are international runway standard.' },
                  { user: 'Siddharth Rao', product: 'Apex 480GSM Cobalt Oversized Hoodie', rating: 5, date: '2026-11-01', comment: 'The density of the 480 GSM fabric is insane! Keeps its shape after multiple washes.' },
                  { user: 'Priya Sharma', product: 'Atelier Minimal Trench Overcoat', rating: 5, date: '2026-10-25', comment: 'Received compliments non-stop at Delhi Fashion Week.' }
                ].map((rev, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{rev.user}</span>
                        <span className="text-slate-400">on {rev.product}</span>
                        <span className="text-amber-500 font-bold">★ {rev.rating}</span>
                      </div>
                      <p className="text-slate-600 mt-1">{rev.comment}</p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 font-semibold px-2 py-1 rounded text-[10px]">
                      APPROVED
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: RETURNS */}
          {activeTab === 'returns' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Returns & Doorstep Exchanges</h2>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Customer</th>
                      <th className="p-3.5">Reason</th>
                      <th className="p-3.5">Pickup Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-mono font-bold text-[#155EEF]">KZ-4920184712</td>
                      <td className="p-3.5 font-bold text-slate-900">Ananya Kapoor</td>
                      <td className="p-3.5 text-slate-600">Sample size swap (Requested XS)</td>
                      <td className="p-3.5">
                        <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                          PICKUP SCHEDULED
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button className="text-xs text-[#155EEF] font-semibold hover:underline">
                          Process Refund
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 11: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Website & Merchant Settings</h2>
                <p className="text-xs text-slate-500">Configure brand parameters, shipping policies, and payment gateway stubs.</p>
              </div>

              {settingsSavedNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold">
                  Store configuration saved successfully.
                </div>
              )}

              <form
                onSubmit={e => {
                  e.preventDefault();
                  setSettingsSavedNotice(true);
                  setTimeout(() => setSettingsSavedNotice(false), 3000);
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Brand Name</label>
                    <input
                      type="text"
                      value={storeSettings.storeName}
                      onChange={e => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Tagline</label>
                    <input
                      type="text"
                      value={storeSettings.tagline}
                      onChange={e => setStoreSettings({ ...storeSettings, tagline: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Free Shipping Threshold (INR ₹)</label>
                    <input
                      type="number"
                      value={storeSettings.freeShippingThreshold}
                      onChange={e => setStoreSettings({ ...storeSettings, freeShippingThreshold: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Primary Support Email</label>
                    <input
                      type="email"
                      value={storeSettings.supportEmail}
                      onChange={e => setStoreSettings({ ...storeSettings, supportEmail: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">Payment Gateway Integration (Future Razorpay Backend)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Razorpay Key ID / Stub</label>
                      <input
                        type="text"
                        value={storeSettings.razorpayKeyId}
                        onChange={e => setStoreSettings({ ...storeSettings, razorpayKeyId: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                      />
                    </div>
                    <div className="flex items-center gap-4 pt-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={storeSettings.razorpayEnabled}
                          onChange={e => setStoreSettings({ ...storeSettings, razorpayEnabled: e.target.checked })}
                          className="w-4 h-4 text-[#155EEF]"
                        />
                        <span>Enable Online Payment</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={storeSettings.codEnabled}
                          onChange={e => setStoreSettings({ ...storeSettings, codEnabled: e.target.checked })}
                          className="w-4 h-4 text-[#155EEF]"
                        />
                        <span>Enable Cash on Delivery</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-[#155EEF] hover:bg-blue-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs"
                  >
                    Save Settings
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setIsAddProductOpen(false)} />
          <form
            onSubmit={handleCreateProduct}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 z-10 border border-slate-200 space-y-4 text-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Add New Garment to Catalog</h3>
              <button type="button" onClick={() => setIsAddProductOpen(false)} className="text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Garment Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Kyoto Minimal Oversized Denim Jacket"
                value={newProduct.name}
                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">SKU</label>
                <input
                  type="text"
                  required
                  placeholder="WLX-JKT-099"
                  value={newProduct.sku}
                  onChange={e => setNewProduct({ ...newProduct, sku: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-mono uppercase"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Category</label>
                <select
                  value={newProduct.category}
                  onChange={e => setNewProduct({ ...newProduct, category: e.target.value as any })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                >
                  <option value="jackets">Jackets</option>
                  <option value="hoodies">Hoodies</option>
                  <option value="t-shirts">T-Shirts</option>
                  <option value="shirts">Shirts</option>
                  <option value="jeans">Jeans</option>
                  <option value="kids">Kids</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">MRP (₹)</label>
                <input
                  type="number"
                  required
                  value={newProduct.mrp}
                  onChange={e => setNewProduct({ ...newProduct, mrp: Number(e.target.value) })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-mono"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Selling Price (₹)</label>
                <input
                  type="number"
                  required
                  value={newProduct.sellingPrice}
                  onChange={e => setNewProduct({ ...newProduct, sellingPrice: Number(e.target.value) })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-mono"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Stock</label>
                <input
                  type="number"
                  required
                  value={newProduct.stock}
                  onChange={e => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-mono"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Fabric Composition</label>
              <input
                type="text"
                value={newProduct.fabric}
                onChange={e => setNewProduct({ ...newProduct, fabric: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="bg-[#155EEF] text-white font-bold px-5 py-2.5 rounded-xl shadow-xs"
              >
                Create Garment
              </button>
              <button
                type="button"
                onClick={() => setIsAddProductOpen(false)}
                className="bg-slate-100 text-slate-700 font-semibold px-4 py-2.5 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
