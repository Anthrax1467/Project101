
import React from 'react';
import { ServiceSubCategory } from '../types';

interface Props {
  onSelectCategory: (cat: ServiceSubCategory | 'All') => void;
  selectedCategory: ServiceSubCategory | 'All';
}

const ServiceDashboard: React.FC<Props> = ({ onSelectCategory, selectedCategory }) => {
  const categories = [
    { name: ServiceSubCategory.PLUMBER, icon: '🪠' },
    { name: ServiceSubCategory.ELECTRICIAN, icon: '⚡' },
    { name: ServiceSubCategory.CARPENTER, icon: '🪚' },
    { name: ServiceSubCategory.HANDYMAN, icon: '🛠️' },
    { name: ServiceSubCategory.CLEANER, icon: '🧹' },
    { name: ServiceSubCategory.PAINTER, icon: '🎨' },
    { name: ServiceSubCategory.IT_SUPPORT, icon: '💻' },
    { name: ServiceSubCategory.LEGAL, icon: '⚖️' },
  ];

  return (
    <div className="glass-panel p-8 md:p-12 rounded-[4rem] border-white/5 mb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-700/5 blur-[100px] pointer-events-none"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-black text-white italic tracking-tighter mb-2">Verified Pro Services</h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">Hire authentic help within the diaspora hub.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-red-700/20 px-4 py-2 rounded-xl border border-red-500/20">
            <span className="text-sm">🛡️</span>
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Nagrita Shield</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-white/10 opacity-60">
            <span className="text-sm">⭐</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Community Rank</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        <button
          onClick={() => onSelectCategory('All')}
          className={`flex flex-col items-center justify-center p-6 rounded-[2.5rem] transition-all border ${selectedCategory === 'All' ? 'bg-red-700 border-red-500 shadow-2xl scale-105' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-red-500/30'}`}
        >
          <span className="text-2xl mb-3">🔍</span>
          <span className="text-[9px] font-black text-white uppercase tracking-widest">All Pros</span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onSelectCategory(cat.name)}
            className={`flex flex-col items-center justify-center p-6 rounded-[2.5rem] transition-all border ${selectedCategory === cat.name ? 'bg-red-700 border-red-500 shadow-2xl scale-105' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-red-500/30'}`}
          >
            <span className="text-2xl mb-3 group-hover:scale-125 transition-transform">{cat.icon}</span>
            <span className="text-[9px] font-black text-white uppercase tracking-widest text-center">{cat.name}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-10 flex items-center justify-center gap-10">
         <div className="h-[1px] w-12 bg-white/5"></div>
         <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] italic">Priority ranking based on Sajha Trust Protocols</p>
         <div className="h-[1px] w-12 bg-white/5"></div>
      </div>
    </div>
  );
};

export default ServiceDashboard;
