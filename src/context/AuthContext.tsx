import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Address } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  signup: (name: string, email: string, phone: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  loginAsDemoUser: () => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  saveAddress: (address: Omit<Address, 'id'>, editId?: string) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const AUTH_STORAGE_KEY = 'wearlix_auth_user_v1';

const DEMO_USER: UserProfile = {
  id: 'usr-aditya-01',
  name: 'Aditya Singhania',
  email: 'aditya.singhania@gmail.com',
  phone: '+91 98201 44820',
  addresses: [
    {
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
    {
      id: 'addr-2',
      fullName: 'Aditya Singhania (Studio)',
      phone: '+91 98201 44820',
      email: 'aditya.singhania@gmail.com',
      street: 'Unit 301, Lower Parel Business Hub, Senapati Bapat Marg',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400013',
      isDefault: false
    }
  ]
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEMO_USER; // Default logged in as demo user for instant testing
    } catch {
      return DEMO_USER;
    }
  });

  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const toggleDemoMode = () => {
    setIsDemoMode(prev => !prev);
  };

  const login = async (email: string): Promise<{ success: boolean; message?: string }> => {
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      phone: '+91 98000 00000',
      addresses: []
    };
    setUser(newUser);
    return { success: true };
  };

  const signup = async (
    name: string,
    email: string,
    phone: string
  ): Promise<{ success: boolean; message?: string }> => {
    if (!name.trim()) return { success: false, message: 'Name is required.' };
    if (!email.includes('@')) return { success: false, message: 'Valid email is required.' };
    if (!phone.trim()) return { success: false, message: 'Valid mobile number is required.' };

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      addresses: []
    };
    setUser(newUser);
    return { success: true };
  };

  const loginAsDemoUser = () => {
    setUser(DEMO_USER);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...data });
  };

  const saveAddress = (addressData: Omit<Address, 'id'>, editId?: string) => {
    if (!user) return;
    if (editId) {
      const updated = user.addresses.map(a =>
        a.id === editId ? { ...addressData, id: editId } : addressData.isDefault ? { ...a, isDefault: false } : a
      );
      setUser({ ...user, addresses: updated });
    } else {
      const newAddress: Address = {
        ...addressData,
        id: `addr-${Date.now()}`,
        isDefault: user.addresses.length === 0 ? true : !!addressData.isDefault
      };
      const addresses = addressData.isDefault
        ? user.addresses.map(a => ({ ...a, isDefault: false }))
        : [...user.addresses];
      setUser({ ...user, addresses: [...addresses, newAddress] });
    }
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    setUser({ ...user, addresses: user.addresses.filter(a => a.id !== id) });
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    setUser({
      ...user,
      addresses: user.addresses.map(a => ({
        ...a,
        isDefault: a.id === id
      }))
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isDemoMode,
        toggleDemoMode,
        login,
        signup,
        loginAsDemoUser,
        logout,
        updateProfile,
        saveAddress,
        deleteAddress,
        setDefaultAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
