
import React from 'react';

const CareersPage: React.FC = () => {
  const openRoles = [
    { title: 'Community Manager', location: 'London/Remote', type: 'Full-time', category: 'Operations' },
    { title: 'Full Stack Engineer', location: 'Global/Remote', type: 'Contract', category: 'Tech' },
    { title: 'Partnership Associate', location: 'USA (Dallas/NYC)', type: 'Full-time', category: 'Growth' },
    { title: 'Content Editor', location: 'Kathmandu (Hybrid)', type: 'Part-time', category: 'Editorial' }
  ];

  return (
    <div className="py-20 flex flex-col gap-24">
      <section className="text-center max-w-4xl mx-auto">
        <span className="bg-amber-500/10 text-amber-500 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.5em] mb-8 inline-block border border-amber-500/20">
          Work with Pride
        </span>
        <h1 className="text-6xl md:text-8xl font-black text-white mb-10 italic tracking-tighter leading-tight">
          Join the <br /> <span className="text-red-700">Hub Team.</span>
        </h1>
        <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
          Help us build the digital future of the Nepali diaspora. We are looking for mission-driven individuals who care about community.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {openRoles.map((role, idx) => (
          <div key={idx} className="glass-panel p-10 rounded-[3rem] border-white/5 hover:border-red-500/30 transition-all group cursor-pointer shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-2">{role.category}</span>
                <h3 className="text-2xl font-black text-white italic group-hover:text-red-500 transition-colors">{role.title}</h3>
              </div>
              <span className="bg-white/5 border border-white/10 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase">
                {role.type}
              </span>
            </div>
            <div className="flex justify-between items-center mt-auto pt-6 border-t border-white/5">
              <span className="text-xs font-medium text-slate-400">📍 {role.location}</span>
              <button className="text-red-500 font-black text-[10px] uppercase tracking-widest group-hover:underline">Apply Now →</button>
            </div>
          </div>
        ))}
      </div>

      <section className="glass-panel p-16 rounded-[4rem] border-white/5 text-center bg-gradient-to-br from-slate-900 to-slate-950">
        <h3 className="text-3xl font-black text-white mb-6 italic tracking-tight">Don't see a fit?</h3>
        <p className="text-slate-400 font-medium mb-10 max-w-xl mx-auto">
          We are always looking for passionate community organizers and developers. Send us your resume and a brief "story" of why you want to help the diaspora.
        </p>
        <a href="mailto:careers@sajhahub.com" className="bg-red-700 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-white hover:text-red-700 transition-all shadow-2xl inline-block">
          General Application
        </a>
      </section>
    </div>
  );
};

export default CareersPage;
