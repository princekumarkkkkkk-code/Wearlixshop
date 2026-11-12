import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  MapPin,
  Package,
  Heart,
  LogOut,
  Plus,
  Trash2,
  Check,
  Edit2,
  Sparkles,
  Phone,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useWishlist } from '../context/WishlistContext';
import { Address } from '../types';

export const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, updateProfile, saveAddress, deleteAddress, setDefaultAddress, isDemoMode } = useAuth();
  const { orders } = useOrders();
  const { wishlistIds } = useWishlist();

  const [activeTab, setActiveTab] = useState<'profile' | 'addresses'>('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');

  // New address modal
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: 'Maharashtra',
    pinCode: '',
    isDefault: false
  });

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Please Sign In</h2>
        <p className="text-xs text-slate-500 mt-2 mb-6">You need an active account to manage your profile and addresses.</p>
        <Link to="/login" className="bg-[#155EEF] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md">
          Go to Sign In
        </Link>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: profileName, phone: profilePhone });
    setIsEditingProfile(false);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.fullName || !addressForm.street || !addressForm.city || !addressForm.pinCode) return;

    saveAddress(addressForm, editingAddressId || undefined);
    setIsAddingAddress(false);
    setEditingAddressId(null);
    setAddressForm({
      fullName: '',
      phone: '',
      email: '',
      street: '',
      city: '',
      state: 'Maharashtra',
      pinCode: '',
      isDefault: false
    });
  };

  const openEditAddress = (addr: Address) => {
    setEditingAddressId(addr.id);
    setAddressForm({
      fullName: addr.fullName,
      phone: addr.phone,
      email: addr.email,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      pinCode: addr.pinCode,
      isDefault: !!addr.isDefault
    });
    setIsAddingAddress(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Banner with Demo Alert */}
      {isDemoMode && (
        <div className="mb-8 bg-blue-50/80 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#155EEF] shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider">Demo Client Account Active</h4>
              <p className="text-xs text-blue-800">
                You are currently viewing {user.name}'s account. Real orders, tracking IDs, and address changes persist in browser storage.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-semibold bg-white px-2.5 py-1 rounded-lg text-blue-800 border border-blue-200 shrink-0">
            SIMULATED OTP MODE
          </span>
        </div>
      )}

      {/* Account Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#101828] text-white flex items-center justify-center font-bold text-2xl shadow-md">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">{user.name}</h1>
              <span className="bg-[#155EEF] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                VIP Member
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
              <span>{user.email}</span>
              <span>·</span>
              <span>{user.phone}</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Nav Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        <Link
          to="/orders"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#155EEF] transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#155EEF] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">My Orders</h3>
              <p className="text-xs text-slate-500">{orders.length} orders on record</p>
            </div>
          </div>
          <span className="font-mono font-bold text-slate-900 text-sm">→</span>
        </Link>

        <Link
          to="/wishlist"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#155EEF] transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Wishlist</h3>
              <p className="text-xs text-slate-500">{wishlistIds.length} styles saved</p>
            </div>
          </div>
          <span className="font-mono font-bold text-slate-900 text-sm">→</span>
        </Link>

        <Link
          to="/track-order"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#155EEF] transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Track Parcel</h3>
              <p className="text-xs text-slate-500">Live delivery timeline</p>
            </div>
          </div>
          <span className="font-mono font-bold text-slate-900 text-sm">→</span>
        </Link>
      </div>

      {/* Tabs: Profile Settings vs Saved Addresses */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-4 text-xs font-bold transition-colors ${
              activeTab === 'profile' ? 'bg-white text-[#155EEF] border-b-2 border-[#155EEF]' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Personal Information
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-6 py-4 text-xs font-bold transition-colors ${
              activeTab === 'addresses' ? 'bg-white text-[#155EEF] border-b-2 border-[#155EEF]' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Saved Delivery Addresses ({user.addresses.length})
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {activeTab === 'profile' && (
            <div className="max-w-xl">
              {isEditingProfile ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={e => setProfileName(e.target.value)}
                      className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:border-[#155EEF] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Mobile Phone Number</label>
                    <input
                      type="tel"
                      value={profilePhone}
                      onChange={e => setProfilePhone(e.target.value)}
                      className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:border-[#155EEF] focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="bg-[#155EEF] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block">Full Name</span>
                      <span className="font-bold text-slate-900 text-sm mt-0.5 block">{user.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Email Address</span>
                      <span className="font-bold text-slate-900 text-sm mt-0.5 block">{user.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Primary Contact Phone</span>
                      <span className="font-bold text-slate-900 text-sm mt-0.5 block">{user.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Client ID</span>
                      <span className="font-mono text-slate-900 text-sm mt-0.5 block">{user.id}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setProfileName(user.name);
                        setProfilePhone(user.phone);
                        setIsEditingProfile(true);
                      }}
                      className="flex items-center gap-2 text-xs font-bold text-[#155EEF] hover:underline"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Profile Details</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-500">
                  Manage doorstep delivery destinations across India.
                </p>
                <button
                  onClick={() => {
                    setEditingAddressId(null);
                    setAddressForm({
                      fullName: user.name,
                      phone: user.phone,
                      email: user.email,
                      street: '',
                      city: 'Mumbai',
                      state: 'Maharashtra',
                      pinCode: '',
                      isDefault: user.addresses.length === 0
                    });
                    setIsAddingAddress(true);
                  }}
                  className="bg-[#155EEF] hover:bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Address</span>
                </button>
              </div>

              {/* Address Form Modal/Section */}
              {isAddingAddress && (
                <form onSubmit={handleAddressSubmit} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900">
                    {editingAddressId ? 'Update Delivery Address' : 'Add New Address'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                      <input
                        type="text"
                        value={addressForm.fullName}
                        onChange={e => setAddressForm({ ...addressForm, fullName: e.target.value })}
                        required
                        className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={addressForm.phone}
                        onChange={e => setAddressForm({ ...addressForm, phone: e.target.value })}
                        required
                        className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Street Address / Society</label>
                    <input
                      type="text"
                      value={addressForm.street}
                      onChange={e => setAddressForm({ ...addressForm, street: e.target.value })}
                      required
                      className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">City</label>
                      <input
                        type="text"
                        value={addressForm.city}
                        onChange={e => setAddressForm({ ...addressForm, city: e.target.value })}
                        required
                        className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">State</label>
                      <input
                        type="text"
                        value={addressForm.state}
                        onChange={e => setAddressForm({ ...addressForm, state: e.target.value })}
                        required
                        className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">PIN Code</label>
                      <input
                        type="text"
                        maxLength={6}
                        value={addressForm.pinCode}
                        onChange={e => setAddressForm({ ...addressForm, pinCode: e.target.value })}
                        required
                        className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="addrDefCheck"
                      checked={addressForm.isDefault}
                      onChange={e => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                      className="w-4 h-4 text-[#155EEF]"
                    />
                    <label htmlFor="addrDefCheck" className="text-xs text-slate-700">Set as default delivery address</label>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="bg-[#155EEF] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs"
                    >
                      Save Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Address List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.addresses.map(addr => (
                  <div
                    key={addr.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      addr.isDefault ? 'border-[#155EEF] bg-blue-50/20 shadow-xs' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-bold text-[#155EEF] bg-blue-100 px-2 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditAddress(addr)}
                          className="p-1 text-slate-400 hover:text-slate-700"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="p-1 text-slate-400 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {addr.street}<br />
                      {addr.city}, {addr.state} - <strong className="font-mono">{addr.pinCode}</strong>
                    </p>

                    <p className="text-xs text-slate-400 mt-2">
                      Phone: <span className="font-mono text-slate-700 font-semibold">{addr.phone}</span>
                    </p>

                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="mt-3 text-[11px] font-bold text-[#155EEF] hover:underline"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
