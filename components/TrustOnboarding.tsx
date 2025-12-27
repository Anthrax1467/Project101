
import React from 'react';

interface Props {
  onClose: () => void;
}

const TrustOnboarding: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[300] bg-slate-900/95 backdrop-blur-2xl flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-[3.5rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="bg-red-700 p-12 text-center text-white relative">
           <div className="absolute top-0 right-0 p-8">
             <button onClick={onClose} className="text-3xl font-light opacity-50 hover:opacity-100">×</button>
           </div>
           <span className="text-7xl mb-6 block">🛡️</span>
           <h2 className="text-4xl font-black italic tracking-tighter mb-2">The Trust Protocol</h2>
           <p className="text-red-100 font-medium opacity-90 uppercase text-[10px] tracking-[0.2em] mb-4">One Community. Our Hub. Beyond Every Border.</p>
           <p className="text-red-50 text-sm font-medium">Why Sajha Hub is safer than unregulated Facebook groups & generic websites.</p>
        </div>
        <div className="p-10 space-y-8">
           <div className="flex gap-6 items-start">
             <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-xl shrink-0">🤝</div>
             <div>
                <h4 className="font-black text-slate-900 mb-1">Community Bhaichara</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">We focus on accountability. Unlike random groups, every listing here is tied to a verified profile with a reputation score.</p>
             </div>
           </div>
           <div className="flex gap-6 items-start">
             <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-xl shrink-0">🆔</div>
             <div>
                <h4 className="font-black text-slate-900 mb-1">Identity-First Rentals</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">Skip the scams. Rental listings are reserved for members who have verified their ID or social presence.</p>
             </div>
           </div>
           <div className="flex gap-6 items-start">
             <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-xl shrink-0">📍</div>
             <div>
                <h4 className="font-black text-slate-900 mb-1">Diaspora Context</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">Our AI guides ensure you find the right neighborhood with Nepali groceries, temples, and community hubs nearby.</p>
             </div>
           </div>
           <button 
             onClick={onClose}
             className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-red-700 transition-all shadow-xl active:scale-95"
           >
             Enter the Verified Hub
           </button>
        </div>
      </div>
    </div>
  );
};

// Added missing default export
export default TrustOnboarding;
