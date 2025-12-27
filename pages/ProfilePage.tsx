
import React, { useState } from 'react';
// Added missing import for Link
import { Link } from 'react-router-dom';
import { User, Post, Category, ContributorTier, ServiceItem, BusinessDomain } from '../types';
import { MOCK_POSTS, MOCK_STAYS, MOCK_AGENCIES } from '../constants';
import ListingCard from '../components/ListingCard';
import VisitingCard from '../components/VisitingCard';
import { geminiService } from '../services/geminiService';

interface Props {
  user: User | null;
  onUpdateUser: (user: User) => void;
}

const ProfilePage: React.FC<Props> = ({ user, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState<'listings' | 'business' | 'rewards'>('listings');
  const [isGeneratingTagline, setIsGeneratingTagline] = useState(false);

  if (!user) return <div className="py-20 text-center font-black">Please sign in to view your Hub profile.</div>;

  const handleUpdateBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Business Profile Updated!");
  };

  const generateTagline = async () => {
    if (!user.businessProfile?.businessName) return;
    setIsGeneratingTagline(true);
    const tagline = await geminiService.generateBusinessTagline(
      user.businessProfile.businessName, 
      user.businessProfile.description || "Trusted service provider"
    );
    onUpdateUser({
      ...user,
      businessProfile: {
        ...(user.businessProfile!),
        tagline
      }
    });
    setIsGeneratingTagline(false);
  };

  const userAds = MOCK_POSTS.filter(p => p.authorId === 'pro_c1' || p.authorId === user.id);

  return (
    <div className="py-12 flex flex-col gap-12">
      {/* Cinematic Profile Header */}
      <div className="glass-panel p-10 rounded-[4rem] border border-white/5 shadow-2xl flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-700/5 blur-[100px] pointer-events-none"></div>
        <div className="relative group">
          <img src={user.photoURL} className="w-40 h-40 rounded-[2.5rem] border-8 border-slate-900 shadow-2xl transition-transform group-hover:rotate-3" alt={user.name} />
          {user.isNagritaVerified && (
            <div className="absolute -bottom-2 -right-2 bg-red-700 text-white p-3 rounded-full border-4 border-slate-900 shadow-lg text-xl sacred-icon" title="Nagrita Verified Citizen">🛡️</div>
          )}
        </div>
        <div className="flex-grow text-center md:text-left z-10">
          <h1 className="text-5xl font-black text-white tracking-tighter italic mb-2">{user.name}</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
            <span className="bg-slate-900/80 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">{user.contributorTier}</span>
            <div className="flex items-center gap-2 bg-red-700/20 text-red-50 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-500/20 shadow-xl">
               <span>🪙 {user.credits.toFixed(1)} Banked</span>
               {user.isVerified && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>}
            </div>
            {!user.isVerified && (
               <span className="bg-amber-500/20 text-amber-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-500/20">
                  ⚠️ Credits Pending Verification
               </span>
            )}
          </div>
          <div className="flex justify-center md:justify-start gap-8 border-t border-white/5 pt-6">
             <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Trust Score</p><p className="font-black text-white text-xl">9.8/10</p></div>
             <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Identity Status</p><p className={`font-black text-xl ${user.isNagritaVerified ? 'text-red-500' : 'text-slate-200'}`}>{user.isNagritaVerified ? 'Nagrita Verified' : 'Email Verified'}</p></div>
          </div>
        </div>
      </div>

      {/* Profile Navigation */}
      <div className="flex flex-wrap gap-8 border-b border-white/5 pb-2">
         {[
           { id: 'listings', label: 'My Listings', icon: '📦' },
           { id: 'business', label: 'Merchant Hub', icon: '🏢' },
           { id: 'rewards', label: 'Credit Wallet', icon: '🪙' }
         ].map((tab) => (
           <button 
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={`pb-4 text-xl font-black italic tracking-tighter transition-all uppercase flex items-center gap-3 ${activeTab === tab.id ? 'text-white border-b-4 border-red-700' : 'text-slate-600 hover:text-slate-400'}`}
           >
             <span className="text-sm opacity-50">{tab.icon}</span> {tab.label}
           </button>
         ))}
      </div>

      {activeTab === 'listings' && (
        <div className="animate-in fade-in duration-500">
           <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black italic tracking-tighter text-white">Ad Management</h2>
              <div className="flex gap-4">
                 <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> 0.5c Standard
                 </div>
                 <div className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span> 1.0c Nagrita
                 </div>
              </div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userAds.map(post => <ListingCard key={post.id} post={post} />)}
              {userAds.length === 0 && (
                <div className="col-span-full py-20 text-center glass-panel rounded-[3rem] border-dashed border-white/10">
                   <p className="text-slate-500 font-black uppercase tracking-widest italic">No active ads. Start posting to earn credits.</p>
                </div>
              )}
           </div>
        </div>
      )}

      {activeTab === 'business' && (
        <div className="animate-in fade-in duration-500 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <h3 className="text-2xl font-black italic tracking-tighter mb-6 text-white">Commercial Card</h3>
            <VisitingCard 
              profile={user.businessProfile || { businessName: user.name, tagline: 'Verified Member', description: '', services: [], category: 'General', cardMode: 'digital' as const, domain: BusinessDomain.SERVICES }}
              isNagritaVerified={user.isNagritaVerified}
              name={user.name}
            />
            <div className="bg-red-700/5 p-8 rounded-[2.5rem] border border-red-500/10">
               <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-3">Community Multiplier</p>
               <p className="text-xs text-slate-400 leading-relaxed font-medium italic">Verified Nagrita accounts earn <span className="text-white">2x Credits</span> on marketplace listings.</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleUpdateBusiness} className="glass-panel p-10 rounded-[3rem] border border-white/5 shadow-xl space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Legal Trading Name</label>
                     <input 
                       type="text" 
                       className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold outline-none"
                       value={user.businessProfile?.businessName || ''}
                       onChange={e => onUpdateUser({...user, businessProfile: {...(user.businessProfile || { businessName: '', tagline: '', description: '', services: [], category: 'General', cardMode: 'digital' as const, domain: BusinessDomain.SERVICES }), businessName: e.target.value}})}
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">AI Catchy Tagline</label>
                        <button type="button" onClick={generateTagline} disabled={isGeneratingTagline} className="text-[8px] font-black uppercase text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">Generate ✨</button>
                     </div>
                     <input 
                       type="text" 
                       className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold outline-none"
                       value={user.businessProfile?.tagline || ''}
                       onChange={e => onUpdateUser({...user, businessProfile: {...(user.businessProfile!), tagline: e.target.value}})}
                     />
                  </div>
               </div>
               <button type="submit" className="w-full bg-red-700 text-white py-5 rounded-2xl font-black text-lg hover:bg-white hover:text-red-700 transition-all shadow-xl">
                  Update Hub Profile
               </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'rewards' && (
        <div className="animate-in fade-in duration-500 space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-panel p-10 rounded-[3rem] border-white/5 flex flex-col items-center text-center">
                 <span className="text-4xl mb-4">🏦</span>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Banked Balance</p>
                 <h4 className="text-4xl font-black text-white italic tracking-tighter">🪙 {user.credits.toFixed(1)}</h4>
                 <p className="text-[9px] text-green-500 font-bold mt-2 uppercase">Ready for Redemption</p>
              </div>
              <div className="glass-panel p-10 rounded-[3rem] border-white/5 flex flex-col items-center text-center relative overflow-hidden">
                 {!user.isVerified && <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] z-10"></div>}
                 <span className="text-4xl mb-4">⏳</span>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Pending Vault</p>
                 <h4 className="text-4xl font-black text-slate-200 italic tracking-tighter">🪙 0.0</h4>
                 <p className="text-[9px] text-amber-500 font-bold mt-2 uppercase">Verify ID to Bank</p>
              </div>
              <div className="bg-red-700/10 border border-red-500/20 p-10 rounded-[3rem] flex flex-col items-center text-center group">
                 <span className="text-4xl mb-4 group-hover:scale-125 transition-transform">🏔️</span>
                 <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Community Level</p>
                 <h4 className="text-4xl font-black text-white italic tracking-tighter">{user.contributorTier}</h4>
                 <p className="text-[9px] text-red-400 font-bold mt-2 uppercase">Next: Samajsewi</p>
              </div>
           </div>

           {/* Redemption Logic for Partners */}
           <div className="space-y-10">
              <div className="flex items-center justify-between px-4">
                 <div className="flex items-center gap-4">
                    <div className="h-8 w-1.5 bg-red-700 rounded-full"></div>
                    <h3 className="text-3xl font-black italic text-white tracking-tighter uppercase">Redeem at Partner Hubs</h3>
                 </div>
                 <Link to="/partners" className="text-[10px] font-black text-slate-500 uppercase hover:text-white transition-colors">View All Partners →</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[...MOCK_STAYS, ...MOCK_AGENCIES].slice(0, 4).map((partner: any) => (
                    <div key={partner.id} className="glass-panel p-8 rounded-[2.5rem] border-white/5 hover:border-red-500/30 transition-all group flex flex-col items-center text-center">
                       <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center text-4xl mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                          {partner.name.includes('Stay') ? '🏠' : '✈️'}
                       </div>
                       <h5 className="font-black text-white italic mb-2">{partner.name}</h5>
                       <p className="text-[9px] text-slate-500 font-bold uppercase mb-6 tracking-widest">Accepts Sajha Vouchers</p>
                       <button className="w-full bg-white text-slate-950 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 hover:text-white transition-all">
                          Get 5.0c Voucher
                       </button>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
