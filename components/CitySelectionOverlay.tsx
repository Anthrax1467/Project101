
import React from 'react';
import { POPULAR_CITIES } from '../constants';

interface Props {
  onSelectCity: (city: string) => void;
}

const CitySelectionOverlay: React.FC<Props> = ({ onSelectCity }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 overflow-hidden bg-slate-950">
      {/* Updated to Majestic Durbar Square Theme */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1571501679680-de32f141ad49?q=80&w=2070" 
          className="w-full h-full object-cover scale-110 animate-pulse duration-[30s] brightness-[0.3] saturate-[1.4]"
          alt="Kathmandu Durbar Square Twilight"
        />
        {/* Deep Atmospheric Layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(185,28,28,0.15)_100%)]"></div>
        
        {/* Floating AI Elements */}
        <div className="absolute top-[10%] left-[20%] text-6xl sacred-icon opacity-20 pointer-events-none">🏮</div>
        <div className="absolute bottom-[20%] right-[15%] text-8xl sacred-icon opacity-15 pointer-events-none" style={{ animationDelay: '3s' }}>☸️</div>
      </div>

      <div className="max-w-7xl w-full text-center relative z-10 overflow-y-auto no-scrollbar max-h-screen py-20 px-6">
        <div className="mb-16 inline-block glass-panel px-12 py-4 rounded-full text-[14px] font-black text-red-500 uppercase tracking-[0.8em] shadow-4xl crimson-glow gold-border">
          Global Nepali Diaspora
        </div>
        
        <h2 className="text-white text-5xl md:text-[9rem] font-black mb-8 tracking-[-0.04em] drop-shadow-[0_40px_40px_rgba(0,0,0,1)] italic leading-[0.85]">
          Kaha <br />
          <span className="text-red-700 drop-shadow-[0_0_30px_rgba(185,28,28,0.4)]">Hunuhunchha?</span>
        </h2>

        {/* AI Enhanced Motto Section */}
        <div className="mb-24 flex flex-col items-center gap-5 animate-in fade-in duration-1000 delay-500">
          <div className="flex items-center gap-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-red-700"></div>
            <p className="text-white text-[10px] md:text-xl font-black uppercase tracking-[0.5em] nepal-gradient-text drop-shadow-lg text-center">
              One Community. Our Hub. Beyond Every Border.
            </p>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-red-700"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {POPULAR_CITIES.map((city) => (
            <button
              key={city.name}
              onClick={() => onSelectCity(city.name)}
              className="group relative glass-panel p-12 rounded-[4rem] hover:bg-red-700/80 hover:border-red-500/50 hover:-translate-y-4 transition-all duration-700 overflow-hidden shadow-4xl border-white/5 active:scale-95 gold-border"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[80px] -translate-y-16 translate-x-16 group-hover:bg-red-500/30 transition-all"></div>
              <span className="text-[11px] font-black uppercase text-slate-500 group-hover:text-red-100 tracking-[0.4em] mb-4 block opacity-60">
                {city.region}
              </span>
              <span className="text-white text-3xl font-black group-hover:scale-110 transition-transform inline-block tracking-tight drop-shadow-lg">
                {city.name}
              </span>
              <div className="mt-4 h-1 w-0 group-hover:w-full bg-red-400 transition-all duration-700 rounded-full mx-auto"></div>
            </button>
          ))}
          <button
            onClick={() => onSelectCity('Global')}
            className="group relative glass-panel bg-slate-900/60 p-12 rounded-[4rem] hover:bg-slate-800 transition-all duration-700 border-white/10 shadow-4xl gold-border"
          >
             <span className="text-[11px] font-black uppercase text-slate-500 tracking-[0.4em] mb-4 block opacity-60">
                International
              </span>
              <span className="text-white text-3xl font-black group-hover:text-red-600 transition-colors tracking-tight">
                Global Search
              </span>
              <div className="mt-4 text-xs font-black text-slate-600 group-hover:text-slate-400 uppercase tracking-widest">See All Areas</div>
          </button>
        </div>
        
        <div className="mt-32 flex items-center justify-center gap-10">
           <div className="h-[2px] w-32 bg-gradient-to-r from-transparent to-red-900"></div>
           <p className="text-slate-500 text-[14px] font-black uppercase tracking-[1em] opacity-30 flex items-center gap-4">
             Jay <span className="text-red-900 sacred-icon">🇳🇵</span> Nepal
           </p>
           <div className="h-[2px] w-32 bg-gradient-to-l from-transparent to-red-900"></div>
        </div>
      </div>
    </div>
  );
};

export default CitySelectionOverlay;
