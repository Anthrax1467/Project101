
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, UserNotification } from '../types';
import AuthModal from './AuthModal';
import NotificationCenter from './NotificationCenter';

interface Props {
  user: User | null;
  onVerify: (user: User) => void;
  onSignOut: () => void;
  selectedCity: string;
  onCityChange: () => void;
}

const Navbar: React.FC<Props> = ({ user, onVerify, onSignOut, selectedCity, onCityChange }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<UserNotification[]>([]);

  useEffect(() => {
    if (user && notifications.length === 0) {
      setNotifications([
        {
          id: 'welcome',
          title: 'Welcome to Sajha Hub!',
          message: 'Complete your identity verification to start posting rentals.',
          type: 'system',
          date: 'Just now',
          read: false
        }
      ]);
    }
  }, [user]);

  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleClear = () => setNotifications([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="sticky top-0 z-[100] bg-slate-950/60 backdrop-blur-2xl border-b border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-24 items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-3xl font-black text-white tracking-tighter flex items-center gap-3 italic text-shadow">
              <span className="bg-red-700 text-white px-3 py-1.5 rounded-2xl not-italic shadow-xl crimson-glow">Sajha</span>
              <span>Hub</span>
            </Link>
            
            <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
            
            <button 
              onClick={onCityChange}
              className="group flex items-center gap-3 px-5 py-2.5 rounded-full hover:bg-white/5 transition-all glass-panel"
            >
              <span className="text-xl">🏮</span>
              <span className="text-sm font-black text-white tracking-tight">
                {selectedCity}
              </span>
              <span className="text-[9px] bg-red-700 text-white px-2 py-1 rounded-lg font-black uppercase opacity-80">
                Change
              </span>
            </button>

            <div className="hidden lg:flex items-center space-x-10 ml-6">
              <Link to="/listings" className="text-slate-400 hover:text-white font-bold text-sm tracking-widest uppercase transition-colors">Classifieds</Link>
              <Link to="/flights" className="text-slate-400 hover:text-white font-bold text-sm tracking-widest uppercase transition-colors">Flights</Link>
              <Link to="/business-hub" className="text-slate-400 hover:text-white font-bold text-sm tracking-widest uppercase transition-colors">Hamro Business</Link>
              <Link to="/partners" className="text-slate-400 hover:text-white font-bold text-sm tracking-widest uppercase transition-colors">Partners</Link>
              <div className="flex flex-col items-start gap-0">
                <Link to="/blog" className="text-slate-400 hover:text-white font-bold text-sm tracking-widest uppercase transition-colors">Resources</Link>
                <Link 
                  to="/blog/new" 
                  className="text-[10px] font-black text-white italic uppercase tracking-[0.1em] mt-1 hover:bg-white hover:text-red-700 transition-all bg-red-700 px-3 py-1 rounded-full shadow-lg shadow-red-900/40 whitespace-nowrap animate-in slide-in-from-left-2 group"
                >
                  Write a Blog <span className="inline-block group-hover:rotate-12 transition-transform ml-1">✍️</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-6">
                <div className="relative">
                  <button 
                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                    className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl hover:bg-white/10 transition-all border border-white/10 relative"
                  >
                    🔔
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-700 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  {isNotifOpen && (
                    <NotificationCenter 
                      notifications={notifications} 
                      onMarkRead={handleMarkRead} 
                      onClear={handleClear} 
                    />
                  )}
                </div>

                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-black text-white line-clamp-1 italic tracking-tight">{user.name}</span>
                  <span className="text-[9px] text-green-500 font-black uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Citizen Tier
                  </span>
                </div>
                <div className="relative group">
                  <img src={user.photoURL} alt="User" className="w-12 h-12 rounded-2xl border-2 border-white/10 cursor-pointer shadow-xl group-hover:scale-110 transition-transform object-cover" />
                  <div className="absolute right-0 top-full mt-4 hidden group-hover:block w-64 glass-panel rounded-[2.5rem] shadow-3xl p-3 overflow-hidden animate-in fade-in slide-in-from-top-4">
                    <Link to="/profile" className="block px-6 py-4 text-sm text-white hover:bg-white/10 rounded-2xl font-black transition-all">
                      My Profile
                    </Link>
                    <Link to="/business-hub" className="block px-6 py-4 text-sm text-amber-500 hover:bg-white/10 rounded-2xl font-black transition-all border-t border-white/5">
                      Hamro Business Hub
                    </Link>
                    <button 
                      onClick={onSignOut}
                      className="w-full text-left px-6 py-4 text-sm text-red-500 hover:bg-red-500/10 rounded-2xl font-black transition-all border-t border-white/5"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="text-white hover:text-red-700 font-black text-sm px-6 tracking-widest uppercase"
              >
                Sign In
              </button>
            )}
            
            <Link 
              to="/new-post" 
              className="bg-red-700 text-white px-8 py-3.5 rounded-[1.5rem] font-black hover:bg-white hover:text-red-700 transition-all shadow-2xl active:scale-95 text-xs uppercase tracking-widest border-b-4 border-red-900"
            >
              Post Ad
            </Link>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onVerify={onVerify} 
      />
    </nav>
  );
};

export default Navbar;
