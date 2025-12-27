
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, BusinessProfile, ServiceItem, BusinessDomain, BusinessNature } from '../types';
import VisitingCard from '../components/VisitingCard';
import { geminiService } from '../services/geminiService';
import AuthModal from '../components/AuthModal';

interface Props {
  user: User | null;
  onUpdateUser: (user: User) => void;
}

const BusinessHubPage: React.FC<Props> = ({ user, onUpdateUser }) => {
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [activeSetupStep, setActiveSetupStep] = useState(user?.businessProfile ? 2 : 0);
  
  const [newProduct, setNewProduct] = useState<Partial<ServiceItem>>({ 
    name: '', description: '', price: '', imageUrl: '', 
    duration: '', eventDate: '', venue: '', amenities: [],
    type: 'Product'
  });

  if (!user) {
    return (
      <div className="py-32 text-center">
        <div className="inline-block glass-panel px-6 py-2 rounded-full text-[12px] font-black text-red-500 uppercase tracking-[0.4em] mb-8 border-red-500/20">
          Commercial Gateway
        </div>
        <h1 className="text-6xl font-black text-white mb-8 italic tracking-tighter drop-shadow-2xl">
          Hamro <span className="text-red-700">Business Hub</span>
        </h1>
        <p className="text-slate-400 mb-12 max-w-2xl mx-auto font-bold uppercase tracking-widest leading-loose">
          Connect your products & services to 100,000+ diaspora members. <br />
          Join the Sajha business network today.
        </p>
        <button 
          onClick={() => setIsAuthOpen(true)}
          className="bg-red-700 text-white px-16 py-6 rounded-[3rem] font-black text-2xl hover:bg-white hover:text-red-700 transition-all shadow-4xl active:scale-95 border-b-8 border-red-900"
        >
          Add Your Business (List Garnuhos)
        </button>
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onVerify={onUpdateUser} />
      </div>
    );
  }

  const profile = user.businessProfile || {
    businessName: user.name + "'s Enterprise",
    tagline: 'Trusted Community Partner',
    description: '',
    services: [],
    category: 'General',
    domain: BusinessDomain.SERVICES,
    nature: BusinessNature.SERVICE,
    cardMode: 'digital'
  };

  const trustLevel = useMemo(() => {
    let score = 0;
    if (user.isVerified) score += 25; 
    if (user.isPhoneVerified) score += 25; 
    if (user.isNagritaVerified) score += 50; 
    return score;
  }, [user]);

  const handleUpdate = (updates: Partial<BusinessProfile>) => {
    onUpdateUser({
      ...user,
      businessProfile: { ...profile, ...updates } as BusinessProfile
    });
  };

  const addProduct = () => {
    if (!newProduct.name) return;
    const item: ServiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name,
      description: newProduct.description || '',
      price: newProduct.price,
      imageUrl: newProduct.imageUrl,
      duration: newProduct.duration,
      eventDate: newProduct.eventDate,
      venue: newProduct.venue,
      amenities: newProduct.amenities,
      type: newProduct.type as 'Product' | 'Service'
    };
    handleUpdate({ services: [...profile.services, item] });
    setNewProduct({ name: '', description: '', price: '', imageUrl: '', duration: '', eventDate: '', venue: '', amenities: [], type: 'Product' });
    setShowProductForm(false);
  };

  const handleAIDescription = async () => {
    setIsGenerating(true);
    const tagline = await geminiService.generateBusinessTagline(profile.businessName, profile.description || 'Professional services');
    handleUpdate({ tagline });
    setIsGenerating(false);
  };

  // Step 0: Nature of Business
  if (activeSetupStep === 0) {
    return (
      <div className="py-20 animate-in slide-in-from-bottom-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white italic tracking-tighter mb-4">Business Type</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Do you sell products, provide services, or both?</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {Object.entries(BusinessNature).map(([key, value]) => (
            <button 
              key={key}
              onClick={() => {
                handleUpdate({ nature: value });
                setActiveSetupStep(1);
              }}
              className="glass-panel p-12 rounded-[4rem] text-center group hover:border-red-500 transition-all hover:-translate-y-4 shadow-4xl"
            >
              <div className="text-6xl mb-8 group-hover:scale-110 transition-transform">
                {value === BusinessNature.PRODUCT ? '📦' : value === BusinessNature.SERVICE ? '🛠️' : '⚖️'}
              </div>
              <h4 className="text-2xl font-black text-white italic tracking-tight group-hover:text-red-500">{value}</h4>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-4 opacity-60">Commercial Hub</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Step 1: Industry Domain
  if (activeSetupStep === 1) {
    return (
      <div className="py-20 animate-in fade-in duration-700">
        <div className="text-center mb-16">
          <button onClick={() => setActiveSetupStep(0)} className="text-red-500 font-black uppercase tracking-widest text-xs mb-6 hover:underline">← Change Type</button>
          <h2 className="text-5xl font-black text-white italic tracking-tighter mb-4">Select Your Industry</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Which domain best describes your hub activity?</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.values(BusinessDomain).map((domain) => (
            <button 
              key={domain}
              onClick={() => {
                handleUpdate({ domain });
                setActiveSetupStep(2);
              }}
              className="glass-panel p-10 rounded-[3.5rem] text-left group hover:border-red-500 transition-all hover:-translate-y-4"
            >
              <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500">
                {domain === BusinessDomain.TRAVEL && '✈️'}
                {domain === BusinessDomain.HOMESTAY && '🏠'}
                {domain === BusinessDomain.EVENTS && '🎆'}
                {domain === BusinessDomain.TOURS && '🎒'}
                {domain === BusinessDomain.SERVICES && '💼'}
                {domain === BusinessDomain.RETAIL && '🛒'}
              </div>
              <h4 className="text-xl font-black text-white italic mb-2 tracking-tight group-hover:text-red-500">{domain}</h4>
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest leading-relaxed">Setup specialized catalogs</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 flex flex-col gap-20 animate-in fade-in duration-1000">
      {/* Verification Status Header */}
      <div className="glass-panel p-8 rounded-[3rem] border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 shadow-3xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-red-700/5 blur-[80px]"></div>
          <div className="relative z-10 flex items-center gap-8">
             <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364} strokeDashoffset={364 - (364 * trustLevel) / 100} className="text-red-600 transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                   <span className="text-2xl font-black text-white">{trustLevel}%</span>
                   <span className="text-[8px] font-black uppercase text-slate-500">Trust</span>
                </div>
             </div>
             <div>
                <h4 className="text-2xl font-black text-white italic tracking-tighter mb-2">Hamro Merchant Shield</h4>
                <div className="flex gap-3">
                   <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${user.isVerified ? 'bg-green-600/20 text-green-500 border-green-500/20' : 'bg-white/5 text-slate-500 border-white/10'}`}>Email</span>
                   <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${user.isPhoneVerified ? 'bg-green-600/20 text-green-500 border-green-500/20' : 'bg-white/5 text-slate-500 border-white/10'}`}>Phone</span>
                   <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${user.isNagritaVerified ? 'bg-red-600 text-white border-red-500 shadow-xl sacred-icon' : 'bg-white/5 text-slate-500 border-white/10'}`}>Nagrita ID</span>
                </div>
             </div>
          </div>
          <div className="relative z-10 flex flex-col gap-2 w-full md:w-auto">
             {!user.isNagritaVerified && (
               <button onClick={() => navigate('/profile')} className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 hover:text-white transition-all shadow-xl">
                 Verify Nagrita for Hub Priority
               </button>
             )}
             <div className="flex gap-2">
                <button onClick={() => setActiveSetupStep(0)} className="text-[10px] bg-white/5 px-4 py-2 rounded-xl font-black text-slate-400 uppercase tracking-widest hover:text-white transition-colors">
                  {profile.nature}
                </button>
                <button onClick={() => setActiveSetupStep(1)} className="text-[10px] bg-white/5 px-4 py-2 rounded-xl font-black text-slate-400 uppercase tracking-widest hover:text-white transition-colors">
                  {profile.domain}
                </button>
             </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Identity & Visiting Card Section */}
        <div className="lg:col-span-4 space-y-12">
          <div className="sticky top-32 space-y-10">
            <div>
              <div className="flex justify-between items-center mb-6 px-4">
                <h3 className="text-[12px] font-black uppercase text-slate-500 tracking-[0.4em]">Visiting Card</h3>
                <div className="flex bg-slate-900 p-1 rounded-xl border border-white/5">
                    <button 
                      onClick={() => handleUpdate({ cardMode: 'digital' })}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${profile.cardMode === 'digital' ? 'bg-red-700 text-white' : 'text-slate-500'}`}
                    >Digital</button>
                    <button 
                      onClick={() => handleUpdate({ cardMode: 'physical' })}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${profile.cardMode === 'physical' ? 'bg-red-700 text-white' : 'text-slate-500'}`}
                    >Physical</button>
                </div>
              </div>

              {profile.cardMode === 'digital' ? (
                <VisitingCard 
                  profile={profile}
                  isNagritaVerified={user.isNagritaVerified}
                  name={user.name}
                />
              ) : (
                <div className="aspect-[1.75/1] glass-panel rounded-[2.5rem] flex flex-col items-center justify-center p-8 border-dashed border-white/20 hover:border-red-500/50 transition-all group cursor-pointer shadow-4xl">
                    <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">📷</span>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Upload Official Card</p>
                    <p className="text-[10px] text-slate-600 mt-2 italic">Hamro Verified Badge Shield</p>
                </div>
              )}
            </div>
            
            <div className="glass-panel p-10 rounded-[3.5rem] gold-border relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 text-4xl opacity-20 rotate-12 group-hover:rotate-0 transition-all">🪙</div>
              <h4 className="text-sm font-black text-amber-500 uppercase tracking-widest mb-4">Merchant Points</h4>
              <p className="text-xs text-slate-300 font-medium leading-relaxed mb-8 opacity-70">
                You have <span className="text-white font-black">{user.credits.toFixed(2)} Credits</span>. 
                Keep your profile verified to earn points for free "Featured" status.
              </p>
              <button className="w-full bg-white/5 border border-white/10 text-white py-5 rounded-[2rem] text-[12px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all">
                Boost Your Presence
              </button>
            </div>
          </div>
        </div>

        {/* Catalog & Product Management Section */}
        <div className="lg:col-span-8 space-y-16">
          {/* Detailed Profile Configuration */}
          <section className="glass-panel p-12 rounded-[4.5rem] shadow-4xl border-white/5">
            <div className="flex items-center gap-4 mb-12">
                <div className="h-8 w-1.5 bg-red-700 rounded-full"></div>
                <h3 className="text-3xl font-black italic text-white tracking-tighter">Business Core</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-4">
                <label className="text-[11px] font-black uppercase text-slate-500 tracking-[0.3em] px-3">Commercial Name</label>
                <input 
                  type="text" 
                  value={profile.businessName}
                  onChange={(e) => handleUpdate({ businessName: e.target.value })}
                  className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 text-white font-bold outline-none focus:border-red-500/50 transition-all text-xl"
                  placeholder="Official Name"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center px-3">
                   <label className="text-[11px] font-black uppercase text-slate-500 tracking-[0.3em]">AI Tagline Generator</label>
                   <button onClick={handleAIDescription} className="text-[9px] font-black text-amber-500 hover:text-white transition-colors uppercase">{isGenerating ? 'Drafting...' : 'Polish ✨'}</button>
                </div>
                <input 
                  type="text" 
                  value={profile.tagline}
                  onChange={(e) => handleUpdate({ tagline: e.target.value })}
                  className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 text-white font-bold outline-none focus:border-red-500/50 transition-all text-xl"
                />
              </div>
              <div className="flex flex-col gap-4 md:col-span-2">
                <label className="text-[11px] font-black uppercase text-slate-500 tracking-[0.3em] px-3">Business Bio (Hamro Story)</label>
                <textarea 
                  rows={4}
                  value={profile.description}
                  onChange={(e) => handleUpdate({ description: e.target.value })}
                  className="p-8 rounded-[3rem] bg-white/5 border border-white/10 text-white font-medium outline-none focus:border-red-500/50 transition-all leading-relaxed text-lg"
                  placeholder="Tell the community about your journey and expertise..."
                />
              </div>
            </div>
          </section>

          {/* Rich Catalog Editor */}
          <section className="space-y-12">
            <div className="flex justify-between items-center px-4">
              <div className="flex items-center gap-4">
                <div className="h-8 w-1.5 bg-amber-600 rounded-full"></div>
                <h3 className="text-3xl font-black italic text-white tracking-tighter">Hub Catalog</h3>
              </div>
              <button 
                onClick={() => setShowProductForm(!showProductForm)}
                className="bg-red-700 text-white px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:text-red-700 transition-all shadow-4xl border-b-4 border-red-900"
              >
                {showProductForm ? 'Cancel Add' : 'Add Post/Item +'}
              </button>
            </div>

            {showProductForm && (
              <div className="glass-panel p-12 rounded-[5rem] shadow-4xl gold-border animate-in zoom-in duration-700 relative overflow-hidden">
                <div className="absolute inset-0 dhaka-texture opacity-5 pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="flex gap-4 mb-10 bg-slate-900/40 p-2 rounded-2xl border border-white/5">
                        <button 
                          onClick={() => setNewProduct({...newProduct, type: 'Product'})}
                          className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${newProduct.type === 'Product' ? 'bg-red-700 text-white shadow-xl' : 'text-slate-500'}`}
                        >📦 Product</button>
                        <button 
                          onClick={() => setNewProduct({...newProduct, type: 'Service'})}
                          className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${newProduct.type === 'Service' ? 'bg-amber-600 text-white shadow-xl' : 'text-slate-500'}`}
                        >🛠️ Service</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                      <div className="flex flex-col gap-4">
                          <label className="text-[11px] font-black uppercase text-slate-500 tracking-[0.4em] px-3">Item Title</label>
                          <input 
                          type="text" 
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 text-white font-bold outline-none focus:border-amber-500/50"
                          placeholder="e.g. Kathmandu Spices Combo"
                          />
                      </div>
                      <div className="flex flex-col gap-4">
                          <label className="text-[11px] font-black uppercase text-slate-500 tracking-[0.4em] px-3">Price</label>
                          <input 
                          type="text" 
                          placeholder="e.g. $25 or रु 1200"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                          className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 text-white font-bold outline-none focus:border-amber-500/50"
                          />
                      </div>
                      
                      {newProduct.type === 'Service' && (
                        <div className="flex flex-col gap-4 md:col-span-2">
                          <label className="text-[11px] font-black uppercase text-slate-500 tracking-[0.4em] px-3">Service Duration / Timeline</label>
                          <input 
                          type="text" 
                          placeholder="e.g. 1-2 Hours, Per Project, Ongoing"
                          value={newProduct.duration}
                          onChange={(e) => setNewProduct({...newProduct, duration: e.target.value})}
                          className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 text-white font-bold outline-none"
                          />
                        </div>
                      )}

                      <div className="flex flex-col gap-4 md:col-span-2">
                          <label className="text-[11px] font-black uppercase text-slate-500 tracking-[0.4em] px-3">Image Link</label>
                          <input 
                          type="text" 
                          placeholder="https://..."
                          value={newProduct.imageUrl}
                          onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
                          className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 text-white font-bold outline-none focus:border-amber-500/50"
                          />
                      </div>
                      <div className="flex flex-col gap-4 md:col-span-2">
                          <label className="text-[11px] font-black uppercase text-slate-500 tracking-[0.4em] px-3">Details</label>
                          <textarea 
                          rows={3}
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                          className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 text-white font-medium outline-none"
                          placeholder="Describe the value..."
                          />
                      </div>
                    </div>
                    <button 
                    onClick={addProduct}
                    className="w-full bg-white text-slate-950 py-7 rounded-[3rem] font-black text-2xl hover:bg-red-700 hover:text-white transition-all shadow-4xl active:scale-95 border-b-8 border-slate-200"
                    >
                    Publish to Catalog
                    </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {profile.services.map((item) => (
                <div key={item.id} className="glass-panel p-8 rounded-[3.5rem] border-white/5 flex flex-col gap-6 group hover:border-amber-500/30 transition-all hover:-translate-y-2 relative overflow-hidden">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 rounded-3xl bg-slate-900 overflow-hidden flex-shrink-0 border border-white/10 shadow-2xl relative">
                      {item.imageUrl ? <img src={item.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-125" /> : <div className="w-full h-full flex items-center justify-center text-4xl">{item.type === 'Service' ? '🛠️' : '📦'}</div>}
                      <div className="absolute top-1 right-1">
                        <span className={`px-2 py-0.5 rounded-lg text-[7px] font-black uppercase ${item.type === 'Service' ? 'bg-amber-600' : 'bg-red-700'} text-white shadow-xl`}>
                           {item.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-white font-black text-xl tracking-tight mb-1 group-hover:text-red-500 transition-colors italic">{item.name}</h4>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{profile.domain}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                         {item.duration && <span className="bg-white/5 px-2 py-0.5 rounded text-[8px] font-black text-slate-400">⏱️ {item.duration}</span>}
                         {item.eventDate && <span className="bg-red-900/40 px-2 py-0.5 rounded text-[8px] font-black text-white">📅 {item.eventDate}</span>}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm font-medium line-clamp-2 leading-relaxed opacity-70 italic">"{item.description || 'Verified offering.'}"</p>
                  <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-amber-500 font-black text-xl">{item.price || 'Contact'}</span>
                    <button 
                      onClick={() => handleUpdate({ services: profile.services.filter(s => s.id !== item.id) })}
                      className="text-red-900 hover:text-red-500 transition-colors opacity-40 group-hover:opacity-100 font-black text-[9px] uppercase tracking-widest"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              {profile.services.length === 0 && (
                <div className="col-span-full py-32 text-center glass-panel rounded-[5rem] border-dashed border-white/10 bg-white/[0.02]">
                  <span className="text-8xl block mb-8 sacred-icon opacity-20">☸️</span>
                  <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-sm">Hub Catalog is Empty.</p>
                  <p className="text-slate-600 font-medium mt-4 text-lg italic">Add your first product or service above.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BusinessHubPage;
