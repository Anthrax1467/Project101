
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Category, Region, User, RentalType } from '../types';
import { geminiService } from '../services/geminiService';
import { currencyService } from '../services/currencyService';
import AuthModal from '../components/AuthModal';

interface Props {
  user: User | null;
  onVerify: (user: User) => void;
  defaultCity?: string;
}

const NewPostPage: React.FC<Props> = ({ user, onVerify, defaultCity }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(0); 
  const [isVerifyingDocs, setIsVerifyingDocs] = useState(false);
  const [earnedCredits, setEarnedCredits] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    category: Category.RENTAL,
    region: Region.GLOBAL,
    city: defaultCity || '',
    description: '',
    priceValue: 0,
    whatsappNumber: '',
    languages: ['Nepali', 'English'],
    rentalType: RentalType.SINGLE_ROOM,
    // ID Verification Fields
    nagritaNumber: '',
    nagritaIssuedDistrict: '',
    phoneOtp: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const highRiskCategories = [Category.RENTAL, Category.SERVICES, Category.CONCERT, Category.JOBS, Category.BUSINESS];
  const isHighRisk = highRiskCategories.includes(formData.category);

  const handleNext = () => {
    if (step === 1 && isHighRisk && (!user || !user.isVerified)) {
      setIsAuthOpen(true);
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifyingDocs(true);
    
    // Simulate biometric and document cross-referencing
    setTimeout(() => {
      // Rule: 0.5 for standard, 1.0 for Nagrita verified (High Risk)
      const reward = isHighRisk ? 1.0 : 0.5; 
      setEarnedCredits(reward);

      if (user && user.isVerified) {
        onVerify({
          ...user,
          credits: user.credits + reward,
          isNagritaVerified: isHighRisk ? true : user.isNagritaVerified
        });
      }
      setIsVerifyingDocs(false);
      setIsSubmitted(true);
    }, 4000);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-40 text-center animate-in fade-in slide-in-from-bottom-12 px-6">
        <div className="text-9xl mb-12 sacred-icon">🛡️</div>
        <h1 className="text-6xl font-black text-white mb-6 tracking-tighter italic">Identity Secured.</h1>
        <p className="text-slate-400 text-xl mb-12 leading-relaxed font-medium">
          {isHighRisk 
            ? "Your professional listing is now anchored by your Nagrita verification. We've notified our safety teams to expedite approval."
            : "Your contribution is live! Thank you for maintaining the Hub's sacred trust."}
        </p>

        {user && user.isVerified ? (
          <div className="glass-panel p-10 rounded-[3.5rem] mb-12 shadow-4xl border-green-500/20 relative overflow-hidden group">
             <div className="absolute inset-0 bg-green-500/5"></div>
             <p className="text-[12px] font-black uppercase tracking-[0.5em] text-green-500 mb-4 relative z-10">Credits Awarded</p>
             <div className="flex items-center justify-center gap-4 relative z-10">
                <span className="text-4xl font-black text-white italic tracking-tighter uppercase">🪙 {earnedCredits} Hub Credits Added</span>
             </div>
          </div>
        ) : (
          <div className="glass-panel p-10 rounded-[3.5rem] mb-12 shadow-4xl border-amber-500/20 relative overflow-hidden group">
             <div className="absolute inset-0 bg-amber-500/5"></div>
             <p className="text-[12px] font-black uppercase tracking-[0.5em] text-amber-500 mb-4 relative z-10">Catch Detected</p>
             <div className="flex flex-col items-center justify-center gap-2 relative z-10">
                <span className="text-2xl font-black text-white italic tracking-tighter uppercase">Verification Required to Bank Credits</span>
                <p className="text-slate-500 text-[10px] font-bold">You earned {earnedCredits} credits, but they won't show in your profile until you verify your identity.</p>
             </div>
          </div>
        )}

        <button onClick={() => navigate('/profile')} className="bg-white text-slate-900 px-16 py-6 rounded-[3rem] font-black text-xl hover:bg-red-700 hover:text-white transition-all shadow-4xl active:scale-95">
          Review My Business Hub
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-20 px-6">
      <div className="mb-20 flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -z-10"></div>
        {[1, 2, 3].map((num, i) => (
            <div key={num} className={`w-14 h-14 rounded-[1.25rem] flex items-center justify-center font-black text-lg border-4 transition-all duration-700 ${step >= i ? 'bg-red-700 border-red-500 text-white shadow-3xl' : 'bg-slate-900 border-white/10 text-slate-600'}`}>
                {num}
            </div>
        ))}
      </div>

      {step === 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-8">
          <div className="text-center mb-20">
            <h1 className="text-7xl font-black text-white mb-8 tracking-tighter italic drop-shadow-2xl">Create Legacy.</h1>
            <p className="text-slate-400 text-2xl font-medium max-w-3xl mx-auto leading-relaxed">Select your commercial domain. High-trust listings award higher credits.</p>
            <div className="mt-8 flex justify-center gap-10">
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Standard: 🪙 0.5</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Nagrita Verified: 🪙 1.0</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[Category.BUSINESS, Category.RENTAL, Category.SERVICES, Category.JOBS, Category.CONCERT, Category.EVENT].map(cat => (
              <button 
                key={cat} 
                onClick={() => { setFormData(p => ({...p, category: cat})); setStep(1); }} 
                className="glass-panel p-12 rounded-[4rem] border-white/5 hover:border-red-500/50 hover:-translate-y-4 transition-all text-left group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-700/0 to-red-700/[0.03] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {highRiskCategories.includes(cat) && (
                  <span className="absolute top-8 right-8 text-[10px] font-black uppercase tracking-[0.2em] bg-red-700/20 text-red-500 px-3 py-1.5 rounded-full border border-red-500/20">Shield Mandatory (1.0c)</span>
                )}
                <div className="w-20 h-20 rounded-[1.5rem] bg-white/5 group-hover:bg-red-700 group-hover:text-white flex items-center justify-center text-4xl mb-8 transition-all shadow-xl">
                  {cat === Category.BUSINESS ? '🏢' : cat === Category.RENTAL ? '🏠' : cat === Category.SERVICES ? '🛠️' : '📦'}
                </div>
                <h3 className="text-3xl font-black text-white mb-3 tracking-tight group-hover:text-red-500 transition-colors italic">{cat}</h3>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Verified Community Reach</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="glass-panel p-16 rounded-[5rem] border-white/10 shadow-4xl space-y-12 animate-in fade-in duration-700">
          <div className="flex items-center gap-5 border-b border-white/5 pb-8 mb-4">
             <div className="w-10 h-10 rounded-xl bg-red-700 flex items-center justify-center text-white">✨</div>
             <h2 className="text-4xl font-black italic tracking-tighter text-white">Commercial Details</h2>
          </div>
          
          <div className="space-y-10">
            <div className="flex flex-col gap-4">
              <label className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-500 px-4">Campaign Title</label>
              <input 
                type="text" 
                className="p-8 rounded-[3rem] bg-white/5 border border-white/10 text-white font-black outline-none focus:border-red-500/50 transition-all text-2xl shadow-inner"
                placeholder="e.g. Premium Newari Catering Service in Dallas"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-500 px-4">Offer Description</label>
              <textarea 
                rows={6} 
                className="p-10 rounded-[4rem] bg-white/5 border border-white/10 text-white font-medium leading-loose outline-none focus:border-red-500/50 transition-all text-xl"
                placeholder="Detail your value proposition for the diaspora..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="w-full bg-white text-slate-950 py-8 rounded-[4rem] font-black text-2xl hover:bg-red-700 hover:text-white transition-all shadow-4xl active:scale-95">
                Next: Architectural Verification →
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <div className="space-y-12 animate-in fade-in duration-700">
           <div className="glass-panel p-16 rounded-[6rem] border-white/10 shadow-4xl relative overflow-hidden">
              <div className="absolute inset-0 dhaka-texture opacity-5 pointer-events-none"></div>
              
              <div className="bg-red-950/30 p-10 rounded-[3.5rem] border border-red-500/20 mb-16 flex gap-8 items-center shadow-inner">
                 <span className="text-6xl sacred-icon">🇳🇵</span>
                 <div>
                    <h3 className="text-xl font-black text-red-500 uppercase tracking-[0.4em] mb-3">Nagrita Shield Protocols</h3>
                    <p className="text-slate-400 font-medium leading-relaxed italic">For high-risk commerce, our AI system cross-references your Nagrita ID with global merchant databases to ensure a scam-free ecosystem. (Reward: 1.0 Credits)</p>
                 </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-4">
                       <label className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-500 px-4">Nagrita Citizen ID</label>
                       <input 
                        type="text" 
                        placeholder="XXXX-XXXX-XXXX"
                        className="p-8 rounded-[3.5rem] bg-white/5 border border-white/10 text-white font-black outline-none focus:border-red-500/50 text-2xl tracking-widest"
                        value={formData.nagritaNumber}
                        onChange={e => setFormData({...formData, nagritaNumber: e.target.value})}
                        required={isHighRisk}
                       />
                    </div>
                    <div className="flex flex-col gap-4">
                       <label className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-500 px-4">Issuing District</label>
                       <input 
                        type="text" 
                        placeholder="e.g. Lalitpur"
                        className="p-8 rounded-[3.5rem] bg-white/5 border border-white/10 text-white font-black outline-none focus:border-red-500/50 text-2xl"
                        value={formData.nagritaIssuedDistrict}
                        onChange={e => setFormData({...formData, nagritaIssuedDistrict: e.target.value})}
                        required={isHighRisk}
                       />
                    </div>
                 </div>

                 <div className="bg-white/5 p-12 rounded-[5rem] border border-white/5 space-y-10 shadow-inner">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.8em] text-slate-600 text-center">Biometric Document Scan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="h-56 rounded-[3.5rem] border-4 border-dashed border-white/10 flex flex-col items-center justify-center bg-white/5 group hover:border-red-500/50 transition-all cursor-pointer">
                          <span className="text-6xl mb-4 opacity-40 group-hover:scale-125 transition-transform group-hover:opacity-100">🇳🇵</span>
                          <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Nagrita Front</span>
                       </div>
                       <div className="h-56 rounded-[3.5rem] border-4 border-dashed border-white/10 flex flex-col items-center justify-center bg-white/5 group hover:border-red-500/50 transition-all cursor-pointer">
                          <span className="text-6xl mb-4 opacity-40 group-hover:scale-125 transition-transform group-hover:opacity-100">🇳🇵</span>
                          <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Nagrita Back</span>
                       </div>
                    </div>
                 </div>

                 <button 
                  type="submit" 
                  disabled={isVerifyingDocs}
                  className="w-full bg-red-700 text-white py-10 rounded-[5rem] font-black text-3xl hover:bg-white hover:text-red-700 transition-all flex items-center justify-center gap-6 shadow-4xl active:scale-95 disabled:opacity-50"
                 >
                   {isVerifyingDocs ? (
                     <>
                        <div className="w-10 h-10 border-[6px] border-white/30 border-t-white rounded-full animate-spin"></div>
                        Validating Identity...
                     </>
                   ) : 'Finalize & Secure Listing'}
                 </button>
              </form>
           </div>
        </div>
      )}

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onVerify={onVerify} />
    </div>
  );
};

export default NewPostPage;
