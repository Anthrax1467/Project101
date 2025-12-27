
import React from 'react';

const CompanyPage: React.FC = () => {
  return (
    <div className="py-20 flex flex-col gap-24">
      <section className="text-center max-w-4xl mx-auto">
        <span className="bg-red-700/10 text-red-500 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.5em] mb-8 inline-block border border-red-500/20">
          Our Foundation
        </span>
        <h1 className="text-6xl md:text-8xl font-black text-white mb-10 italic tracking-tighter leading-tight nepal-gradient-text">
          Mission & <br /> <span className="text-red-700">Motto.</span>
        </h1>
        <p className="text-xl text-slate-400 font-medium leading-relaxed italic">
          "One Community. Our Hub. Beyond Every Border."
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="glass-panel p-16 rounded-[4rem] border-white/5 shadow-4xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-700/5 blur-[60px]"></div>
          <h2 className="text-3xl font-black text-white italic mb-8 tracking-tight">Our Mission</h2>
          <div className="space-y-6 text-slate-400 font-medium leading-relaxed">
            <p>
              Sajha Hub was born out of a simple necessity: to bridge the gap for the millions of Nepalis living, working, and studying abroad. 
            </p>
            <p>
              Our mission is to build the world's most trusted digital ecosystem for the global Nepali diaspora—centralizing housing, jobs, events, and community wisdom into a single, secure marketplace.
            </p>
          </div>
        </div>

        <div className="glass-panel p-16 rounded-[4rem] border-white/5 shadow-4xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[60px]"></div>
          <h2 className="text-3xl font-black text-white italic mb-8 tracking-tight">Our Motto</h2>
          <div className="space-y-6">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <p className="text-2xl font-black text-amber-500 italic tracking-tighter">"One Community. Our Hub. Beyond Every Border."</p>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed">
              This isn't just a slogan; it's our architectural philosophy. Whether you are in Aldershot or Dallas, Sajha Hub ensures you are never truly "abroad"—you are always at home with your community.
            </p>
          </div>
        </div>
      </div>

      <section className="bg-slate-950 p-20 rounded-[5rem] border border-white/5 crimson-glow text-center">
        <h3 className="text-4xl font-black italic text-white mb-8 tracking-tighter">Values We Live By</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          <div>
            <span className="text-5xl mb-6 block">🤝</span>
            <h4 className="text-lg font-black text-white mb-2 uppercase tracking-widest">Bhaichara</h4>
            <p className="text-xs text-slate-500 font-medium">Brotherhood and mutual support across all borders.</p>
          </div>
          <div>
            <span className="text-5xl mb-6 block">🛡️</span>
            <h4 className="text-lg font-black text-white mb-2 uppercase tracking-widest">Trust</h4>
            <p className="text-xs text-slate-500 font-medium">Verified identities for a scam-free diaspora experience.</p>
          </div>
          <div>
            <span className="text-5xl mb-6 block">🏔️</span>
            <h4 className="text-lg font-black text-white mb-2 uppercase tracking-widest">Pachhyan</h4>
            <p className="text-xs text-slate-500 font-medium">Preserving our identity while embracing global opportunities.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyPage;
