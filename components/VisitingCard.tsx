
import React from 'react';
import { BusinessProfile } from '../types';

interface Props {
  profile: BusinessProfile;
  isNagritaVerified?: boolean;
  name: string;
}

const VisitingCard: React.FC<Props> = ({ profile, isNagritaVerified, name }) => {
  return (
    <div className="relative w-full max-w-sm aspect-[1.75/1] bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-4xl group border border-white/5 crimson-glow">
      {/* Background Textures */}
      <div className="absolute inset-0 opacity-10 pointer-events-none dhaka-texture scale-150 transition-transform group-hover:scale-125 duration-1000"></div>
      
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-red-700/20 blur-[80px] rounded-full -translate-y-24 translate-x-24 group-hover:bg-red-700/40 transition-all duration-1000"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 blur-[60px] rounded-full translate-y-16 -translate-x-16"></div>

      <div className="relative p-8 h-full flex flex-col justify-between z-10">
        <div className="flex justify-between items-start">
          <div className="flex gap-5 items-center">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl shadow-3xl overflow-hidden border border-white/10 backdrop-blur-3xl group-hover:border-red-500/50 transition-all">
              {profile.logoUrl ? (
                <img src={profile.logoUrl} className="w-full h-full object-cover" alt="Logo" />
              ) : (
                <span className="sacred-icon">🏮</span>
              )}
            </div>
            <div>
              <h3 className="text-white font-black text-2xl tracking-tighter leading-none mb-2 line-clamp-1 italic group-hover:text-red-500 transition-colors drop-shadow-lg">
                {profile.businessName}
              </h3>
              <div className="flex items-center gap-2">
                 <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] drop-shadow-md">{profile.tagline}</p>
              </div>
            </div>
          </div>
          {isNagritaVerified && (
            <div className="bg-red-700 text-white p-3 rounded-2xl border border-white/20 shadow-4xl sacred-icon" title="Nagrita Verified Merchant">
              <span className="text-sm">🛡️</span>
            </div>
          )}
        </div>

        <div className="mt-6">
          <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.5em] mb-3 border-b border-white/5 pb-1 opacity-60 italic">Featured Catalog Items</p>
          <div className="flex flex-wrap gap-2.5">
            {(profile.services || []).slice(0, 2).map(s => (
              <span key={s.id} className="bg-white/5 text-white/90 px-4 py-2 rounded-xl text-[10px] font-extrabold border border-white/5 backdrop-blur-md group-hover:bg-red-700/20 transition-all">
                {s.name}
              </span>
            ))}
            {(!profile.services || profile.services.length === 0) && (
              <span className="text-slate-600 text-[10px] italic font-black uppercase tracking-[0.3em]">Establishing Legacy...</span>
            )}
            {profile.services.length > 2 && (
              <span className="text-slate-400 text-[10px] font-black py-2">+{profile.services.length - 2} More</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
          <div className="flex flex-col">
            <span className="text-white/30 text-[9px] font-black uppercase tracking-[0.4em] mb-1">Commercial Liaison</span>
            <span className="text-white text-[14px] font-black italic tracking-tight nepal-gradient-text">{name}</span>
          </div>
          <div className="flex gap-4">
            {profile.whatsappNumber && (
              <a href={`https://wa.me/${profile.whatsappNumber.replace(/\s+/g, '')}`} className="w-12 h-12 rounded-[1.25rem] bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-center text-white text-xl hover:scale-110 hover:bg-[#25D366] transition-all shadow-2xl">
                💬
              </a>
            )}
            {profile.viberNumber && (
               <a href={`viber://chat?number=${profile.viberNumber.replace(/\s+/g, '')}`} className="w-12 h-12 rounded-[1.25rem] bg-[#7360f2]/20 border border-[#7360f2]/30 flex items-center justify-center text-white text-xl hover:scale-110 hover:bg-[#7360f2] transition-all shadow-2xl">
                💜
               </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Added missing default export
export default VisitingCard;
