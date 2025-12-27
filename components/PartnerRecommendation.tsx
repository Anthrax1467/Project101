
import React from 'react';
import { Link } from 'react-router-dom';
import { PartneredStay, PartneredAgency } from '../types';

interface Props {
  partner: (PartneredStay | PartneredAgency) & { partnerType: 'Travel Expert' | 'Verified Stay' };
}

const PartnerRecommendation: React.FC<Props> = ({ partner }) => {
  const isAgency = 'specialty' in partner;
  
  return (
    <div className="glass-panel p-6 rounded-[3rem] border-white/5 group hover:border-amber-500/40 transition-all hover:-translate-y-2 relative overflow-hidden flex flex-col h-full">
      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-[40px]"></div>
      
      <div className="flex gap-5 mb-6">
        <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 shadow-xl relative">
          <img src={partner.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={partner.name} />
          <div className="absolute inset-0 bg-slate-950/20"></div>
        </div>
        <div>
          <span className="bg-amber-500/20 text-amber-500 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-amber-500/20 mb-2 inline-block">
            {partner.partnerType}
          </span>
          <h4 className="text-lg font-black text-white italic tracking-tight line-clamp-1 group-hover:text-amber-500 transition-colors">
            {partner.name}
          </h4>
        </div>
      </div>

      <p className="text-slate-400 text-xs font-medium leading-relaxed italic line-clamp-2 mb-6 opacity-70">
        "{partner.description}"
      </p>

      <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
            {isAgency ? 'Specialty' : 'Rate From'}
          </span>
          <span className="text-white font-black text-sm">
            {isAgency ? partner.specialty : `$${partner.pricePerNight}/night`}
          </span>
        </div>
        <Link 
          to={isAgency ? "/partners" : "/stays"} 
          className="bg-white/10 hover:bg-amber-500 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95"
        >
          View Hub
        </Link>
      </div>
    </div>
  );
};

export default PartnerRecommendation;
