import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Phone, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginAsDemoUser, isDemoMode } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      navigate('/account');
    } else {
      setError(res.message || 'Login failed.');
    }
  };

  const handleDemoSignIn = () => {
    loginAsDemoUser();
    navigate('/account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6">
        <div className="text-center">
          <span className="text-xs font-bold tracking-widest text-[#155EEF] uppercase">CLIENT PORTAL</span>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 mt-1">Sign in to WEARLIX</h1>
          <p className="text-xs text-slate-500 mt-1">Access your saved wardrobe, order tracking, and VIP drops.</p>
        </div>

        {/* Demo Mode Notice */}
        {isDemoMode && (
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 text-xs space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-bold">
              <Sparkles className="w-4 h-4 text-[#155EEF]" />
              <span>Demo Authentication Mode Active</span>
            </div>
            <p className="text-blue-800 leading-relaxed text-[11px]">
              Ready for backend OTP/SMS auth. You can test immediately using the one-click demo profile with pre-loaded Mumbai orders.
            </p>
            <button
              onClick={handleDemoSignIn}
              type="button"
              className="w-full bg-[#155EEF] hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Quick Login as Aditya Singhania (VIP)</span>
            </button>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full text-xs p-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#155EEF]"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <label className="font-semibold text-slate-700">Password</label>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("In demo mode, any password works or use 1-Click Demo Login above."); }} className="text-[#155EEF] hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full text-xs p-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#155EEF]"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#101828] hover:bg-slate-800 text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            {loading ? <span>Verifying...</span> : <span>Sign In</span>}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500">
          New to WEARLIX?{' '}
          <Link to="/signup" className="text-[#155EEF] font-bold hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await signup(name, email, phone, password);
    setLoading(false);
    if (res.success) {
      navigate('/account');
    } else {
      setError(res.message || 'Signup failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6">
        <div className="text-center">
          <span className="text-xs font-bold tracking-widest text-[#155EEF] uppercase">JOIN THE ATELIER</span>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 mt-1">Create WEARLIX Account</h1>
          <p className="text-xs text-slate-500 mt-1">Unlock seamless tracking, exclusive releases, and ₹500 welcome voucher.</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Varun Malhotra"
                required
                className="w-full text-xs p-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#155EEF]"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="varun@domain.com"
                required
                className="w-full text-xs p-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#155EEF]"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Mobile Number (India)</label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+91 98110 59281"
                required
                className="w-full text-xs p-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#155EEF]"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Create Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full text-xs p-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#155EEF]"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#155EEF] hover:bg-blue-600 text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            {loading ? <span>Creating Profile...</span> : <span>Create Account</span>}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="text-[#155EEF] font-bold hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};
