
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-20 flex flex-col gap-24">
      <section className="text-center max-w-4xl mx-auto">
        <span className="bg-red-700/10 text-red-500 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.5em] mb-8 inline-block border border-red-500/20">
          Always Here
        </span>
        <h1 className="text-6xl md:text-8xl font-black text-white mb-10 italic tracking-tighter leading-tight">
          Connect with <br /> <span className="text-red-700">The Hub.</span>
        </h1>
        <p className="text-xl text-slate-400 font-medium leading-relaxed">
          Need help with a listing? Interested in a partnership? Or just want to say Namaste?
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="glass-panel p-20 rounded-[4rem] text-center animate-in zoom-in h-full flex flex-col items-center justify-center">
              <span className="text-8xl mb-8">🙏</span>
              <h2 className="text-4xl font-black text-white italic mb-4 tracking-tight">Message Received</h2>
              <p className="text-slate-400 font-medium">We'll get back to you within 24 hours. Jay Nepal!</p>
              <button onClick={() => setSubmitted(false)} className="mt-12 text-red-500 font-black uppercase tracking-widest hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-panel p-12 md:p-16 rounded-[4rem] border-white/5 shadow-4xl space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest px-4">Full Name</label>
                  <input type="text" className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold outline-none focus:border-red-500/50" required placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest px-4">Email Address</label>
                  <input type="email" className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold outline-none focus:border-red-500/50" required placeholder="john@example.com" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest px-4">Subject</label>
                <select className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold outline-none focus:border-red-500/50">
                  <option className="bg-slate-900">General Inquiry</option>
                  <option className="bg-slate-900">Safety/Scam Report</option>
                  <option className="bg-slate-900">Partnership Request</option>
                  <option className="bg-slate-900">Ad Boosting Issue</option>
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest px-4">Message</label>
                <textarea rows={6} className="p-6 rounded-[2rem] bg-white/5 border border-white/10 text-white font-medium outline-none focus:border-red-500/50 resize-none" required placeholder="How can we help?"></textarea>
              </div>
              <button type="submit" className="w-full bg-red-700 text-white py-6 rounded-[2rem] font-black text-xl hover:bg-white hover:text-red-700 transition-all shadow-4xl active:scale-95">
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="glass-panel p-10 rounded-[3rem] border-white/5">
            <h3 className="text-xl font-black text-white mb-6 italic tracking-tight">Direct Contacts</h3>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Email Support</p>
                <p className="text-white font-black">support@sajhahub.com</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Partnerships</p>
                <p className="text-white font-black">partners@sajhahub.com</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Office (Kathmandu)</p>
                <p className="text-white font-black italic">Baneshwor-31, Kathmandu, Nepal</p>
              </div>
            </div>
          </div>

          <div className="bg-red-700/5 p-10 rounded-[3rem] border border-red-500/10">
            <span className="text-4xl mb-4 block">🛡️</span>
            <h4 className="text-lg font-black text-red-500 italic mb-2 tracking-tight">Safe Hub Policy</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              If you are reporting a scam or unsafe listing, please include the Listing ID and any relevant screenshots. We investigate all reports within 6 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
