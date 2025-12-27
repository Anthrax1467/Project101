
import React, { useState } from 'react';
import { User } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (user: User) => void;
}

const AuthModal: React.FC<Props> = ({ isOpen, onClose, onVerify }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleAuth = (method: User['verificationMethod'] = 'email') => {
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'Sajha User',
      email: formData.email || 'user@sajha.com',
      city: formData.city || 'Global',
      isVerified: true,
      verificationMethod: method,
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name || method}`,
      credits: 0,
      contributorTier: 'Yatri',
      notifications: []
    };
    onVerify(mockUser);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAuth('email');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-slate-800">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl font-bold">&times;</button>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-2xl mb-6 border border-blue-100 flex items-start gap-3">
             <span className="text-xl">📧</span>
             <div>
                <p className="text-[11px] font-black text-blue-900 uppercase tracking-tighter">Trust First Policy</p>
                <p className="text-xs text-blue-700 font-medium leading-tight">Email verification is required to post in high-trust categories like Rentals and Services.</p>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
            {!isLogin && (
              <>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-red-500/20 font-medium"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Current City" 
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-red-500/20 font-medium"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                  required
                />
              </>
            )}
            <input 
              type="email" 
              placeholder="Email Address" 
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-red-500/20 font-medium"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-red-500/20 font-medium"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              required
            />
            <button 
              type="submit"
              className="bg-red-700 text-white p-4 rounded-xl font-bold hover:bg-red-800 transition-colors shadow-lg shadow-red-100"
            >
              {isLogin ? 'Sign In' : 'Sign Up & Verify Email'}
            </button>
          </form>

          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-slate-300 text-xs font-bold uppercase">Or Social Link</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button onClick={() => handleAuth('gmail')} className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 font-bold text-slate-600 text-sm">
              <span className="text-red-500">G</span> Google
            </button>
            <button onClick={() => handleAuth('facebook')} className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 font-bold text-slate-600 text-sm">
              <span className="text-blue-600">f</span> Facebook
            </button>
          </div>

          <div className="text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-bold text-red-700 hover:underline"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Added missing default export
export default AuthModal;
