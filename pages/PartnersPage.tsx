
import React from 'react';
import { MOCK_STAYS, MOCK_AGENCIES } from '../constants';
import { currencyService } from '../services/currencyService';

const PartnersPage: React.FC = () => {
  const currentCity = localStorage.getItem('sajha_city') || 'Global';

  return (
    <div className="py-12 flex flex-col gap-16">
      <section className="bg-red-700 rounded-[3.5rem] p-12 md:p-24 text-white relative overflow-hidden flex flex-col items-center text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none dhaka-texture scale-150"></div>
        <div className="relative z-10 max-w-4xl">
          <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">
            Sajha Trusted Network
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter italic">
            Hamro Partners <br />Hub.
          </h1>
          <p className="text-xl md:text-2xl text-red-100 font-medium mb-12 max-w-2xl mx-auto">
            Book verified hotels, homestays, and travel experts. Spend your Hub Credits here.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Stays Section */}
        <div className="space-y-10">
          <h2 className="text-3xl font-black italic text-white tracking-tighter border-b border-white/10 pb-4">Hotels & Homestays</h2>
          <div className="grid grid-cols-1 gap-8">
            {MOCK_STAYS.map(stay => (
              <div key={stay.id} className="glass-panel p-6 rounded-[3rem] border-white/5 flex gap-8 group hover:border-red-500/30 transition-all overflow-hidden relative">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] overflow-hidden flex-shrink-0 shadow-2xl relative">
                  <img src={stay.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={stay.name} />
                  {stay.allowsDayStay && (
                    <div className="absolute bottom-2 left-2 right-2 bg-green-600/90 backdrop-blur text-white text-[7px] font-black uppercase py-1 px-2 rounded-lg text-center">
                      Day Stay OK
                    </div>
                  )}
                </div>
                <div className="flex-grow flex flex-col justify-center">
                   <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-black text-white italic tracking-tight">{stay.name}</h4>
                      <span className="bg-red-700 text-white text-[8px] font-black uppercase px-2 py-1 rounded">Vouchers OK</span>
                   </div>
                   
                   <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-white/5 border border-white/10 text-slate-400 text-[8px] px-2 py-1 rounded-lg font-black uppercase">🛏️ {stay.bedType}</span>
                      <span className="bg-white/5 border border-white/10 text-slate-400 text-[8px] px-2 py-1 rounded-lg font-black uppercase">🍳 {stay.hasBreakfast ? 'Breakfast' : 'No Meals'}</span>
                      <span className="bg-white/5 border border-white/10 text-slate-400 text-[8px] px-2 py-1 rounded-lg font-black uppercase">🏔️ {stay.viewType}</span>
                   </div>

                   <p className="text-xs text-slate-500 font-medium line-clamp-2 italic mb-4">"{stay.description}"</p>
                   <div className="flex justify-between items-center">
                      <span className="text-red-500 font-black">{currencyService.convertAndFormat(stay.pricePerNight, currentCity, '/night')}</span>
                      <button className="text-[10px] font-black uppercase tracking-widest text-white bg-white/5 border border-white/10 px-4 py-2 rounded-xl hover:bg-red-700 transition-all">View Detail</button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agency Section */}
        <div className="space-y-10">
          <h2 className="text-3xl font-black italic text-white tracking-tighter border-b border-white/10 pb-4">Travel Experts</h2>
          <div className="grid grid-cols-1 gap-8">
            {MOCK_AGENCIES.map(agency => (
              <div key={agency.id} className="glass-panel p-6 rounded-[3rem] border-white/5 flex gap-8 group hover:border-amber-500/30 transition-all">
                <div className="w-32 h-32 rounded-[2rem] overflow-hidden flex-shrink-0 shadow-2xl">
                  <img src={agency.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={agency.name} />
                </div>
                <div className="flex-grow flex flex-col justify-center">
                   <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-black text-white italic tracking-tight">{agency.name}</h4>
                      <span className="bg-amber-600 text-white text-[8px] font-black uppercase px-2 py-1 rounded">Fees Reducible</span>
                   </div>
                   <p className="text-xs text-slate-500 font-medium line-clamp-2 italic mb-4">"{agency.description}"</p>
                   <div className="flex justify-between items-center">
                      <span className="text-amber-500 font-black">{agency.specialty} Specialist</span>
                      <button className="text-[10px] font-black uppercase tracking-widest text-white bg-white/5 border border-white/10 px-4 py-2 rounded-xl hover:bg-amber-600 transition-all">View Detail</button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;
