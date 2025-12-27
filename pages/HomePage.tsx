
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_POSTS, MOCK_STAYS, MOCK_AGENCIES } from '../constants';
import ListingCard from '../components/ListingCard';
import AskCommunitySection from './AskCommunitySection';
import MapInsightsPanel from '../components/MapInsightsPanel';
import TrustOnboarding from '../components/TrustOnboarding';
import PartnerRecommendation from '../components/PartnerRecommendation';
import ServiceDashboard from '../components/ServiceDashboard';
import { Region, Category, RentalType, ServiceSubCategory } from '../types';
import { currencyService } from '../services/currencyService';

interface Props {
  globalCity: string;
}

const HomePage: React.FC<Props> = ({ globalCity }) => {
  const [selectedRegion, setSelectedRegion] = useState<Region | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedServiceSub, setSelectedServiceSub] = useState<ServiceSubCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(globalCity);
  const [showOnboarding, setShowOnboarding] = useState(!localStorage.getItem('sajha_onboarded'));
  
  const [rentalType, setRentalType] = useState<RentalType | 'All'>('All');
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [onlyVerified, setOnlyVerified] = useState(true);

  useEffect(() => {
    setSelectedCity(globalCity);
  }, [globalCity]);

  // If a subcategory is selected, automatically switch to SERVICES category
  const handleServiceSelect = (sub: ServiceSubCategory | 'All') => {
    setSelectedServiceSub(sub);
    setSelectedCategory(Category.SERVICES);
  };

  const filteredPosts = useMemo(() => {
    const now = new Date();
    let results = MOCK_POSTS.filter(post => {
      const isExpired = new Date(post.expiresAt) < now;
      if (isExpired) return false;
      const matchesRegion = selectedRegion === 'All' || post.region === selectedRegion;
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesServiceSub = selectedServiceSub === 'All' || post.serviceSubCategory === selectedServiceSub;
      const matchesCity = selectedCity === 'All' || selectedCity === 'Global' || post.city === selectedCity;
      const matchesRentalType = rentalType === 'All' || post.rentalType === rentalType;
      const matchesPrice = maxPrice === 0 || (post.priceValue && post.priceValue <= maxPrice);
      const matchesVerified = !onlyVerified || (post.isAuthorVerified || post.isPhoneVerified || post.isNagritaVerified);

      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        post.title.toLowerCase().includes(query) || 
        post.description.toLowerCase().includes(query);
        
      return matchesRegion && matchesCategory && matchesServiceSub && matchesCity && matchesSearch && 
             matchesRentalType && matchesPrice && matchesVerified;
    });

    // Custom sorting: Nagrita > Phone > Email > Unverified
    return results.sort((a, b) => {
      // 1. Check Featured first
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;

      // 2. Trust Tier Ranking
      const getTrustWeight = (p: typeof a) => {
        let weight = 0;
        if (p.isNagritaVerified) weight += 1000;
        if (p.isPhoneVerified) weight += 100;
        if (p.isAuthorVerified) weight += 10;
        if (p.rating) weight += p.rating;
        return weight;
      };

      const weightA = getTrustWeight(a);
      const weightB = getTrustWeight(b);

      if (weightA !== weightB) return weightB - weightA;

      // 3. Recency
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [selectedRegion, selectedCategory, selectedServiceSub, selectedCity, searchQuery, rentalType, maxPrice, onlyVerified]);

  const recommendedPartners = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    
    // Search within verified agencies and stays
    const matchedAgencies = MOCK_AGENCIES.filter(a => 
      a.name.toLowerCase().includes(query) || 
      a.description.toLowerCase().includes(query) ||
      a.specialty.toLowerCase().includes(query)
    ).map(a => ({ ...a, partnerType: 'Travel Expert' as const }));

    const matchedStays = MOCK_STAYS.filter(s => 
      s.name.toLowerCase().includes(query) || 
      s.description.toLowerCase().includes(query) ||
      s.type.toLowerCase().includes(query)
    ).map(s => ({ ...s, partnerType: 'Verified Stay' as const }));

    return [...matchedAgencies, ...matchedStays].slice(0, 3);
  }, [searchQuery]);

  const closeOnboarding = () => {
    localStorage.setItem('sajha_onboarded', 'true');
    setShowOnboarding(false);
  };

  return (
    <div className="flex flex-col gap-16 py-8">
      {showOnboarding && <TrustOnboarding onClose={closeOnboarding} />}

      {/* Cinematic AI Hero */}
      <section className="relative h-[850px] rounded-[6rem] overflow-hidden flex items-center justify-center text-center px-4 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] group border border-white/5">
        <img 
          src="https://images.unsplash.com/photo-1565152011158-941160358896?q=80&w=2071" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.35] contrast-[1.2] transition-transform duration-[20s] group-hover:scale-110"
          alt="Majestic Nepal Durbar Square Architecture"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(2,6,23,0.4)_100%)]"></div>

        <div className="relative z-10 max-w-6xl px-6">
          <div className="flex flex-col items-center gap-6 mb-12 animate-in fade-in slide-in-from-top-12 duration-1000">
            <div className="glass-panel crimson-glow px-12 py-4 rounded-full text-[13px] font-black uppercase tracking-[0.6em] text-white shadow-3xl flex items-center gap-5">
              <span className="text-xl">🏮</span>
              One Community. Our Hub. Beyond Every Border.
              <span className="text-xl">🌏</span>
            </div>
          </div>
          
          <h1 className="text-8xl md:text-[14rem] font-black text-white mb-16 leading-[0.75] tracking-tighter italic drop-shadow-[0_30px_30px_rgba(0,0,0,1)]">
            Hamro <br />
            <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-400 to-red-600 animate-pulse">Sajha Hub.</span>
            </span>
          </h1>

          <div className="glass-panel p-8 rounded-[4.5rem] shadow-4xl max-w-5xl mx-auto ring-2 ring-white/10 animate-in zoom-in duration-1000 hover:ring-red-500/30 transition-all">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-grow relative group/search">
                <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center gap-4">
                    <span className="text-3xl sacred-icon">🏮</span>
                </div>
                <input 
                  type="text" 
                  placeholder="Find rentals, temple events, or diaspora heroes..."
                  className="w-full pl-24 pr-10 py-8 rounded-[3.5rem] text-white focus:outline-none font-bold placeholder:text-slate-400 bg-white/5 border border-white/10 text-2xl shadow-inner backdrop-blur-3xl focus:border-red-500/50 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="bg-red-700 text-white px-24 py-8 rounded-[3.5rem] font-black hover:bg-white hover:text-red-700 transition-all shadow-4xl text-3xl active:scale-95 border-b-8 border-red-900 group">
                Search <span className="group-hover:translate-x-4 inline-block transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Pro Dashboard */}
      <ServiceDashboard 
        onSelectCategory={handleServiceSelect} 
        selectedCategory={selectedServiceSub} 
      />

      {/* Recommended Partners Section */}
      {recommendedPartners.length > 0 && (
        <section className="animate-in slide-in-from-bottom-12 duration-700">
           <div className="flex items-center gap-4 mb-8">
             <div className="h-8 w-1.5 bg-amber-500 rounded-full"></div>
             <h3 className="text-2xl font-black italic text-white tracking-tighter uppercase">Verified Partners Matching Your Search</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendedPartners.map((partner, idx) => (
                <PartnerRecommendation key={idx} partner={partner} />
              ))}
           </div>
        </section>
      )}

      <div className="flex flex-col lg:flex-row gap-16">
        <aside className="lg:w-96 flex flex-col gap-12">
          <div className="glass-panel p-12 rounded-[5rem] shadow-4xl space-y-12 sticky top-32 border-white/5 gold-border">
            <div>
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-1.5 h-10 bg-red-700 rounded-full"></div>
                 <h4 className="text-[14px] font-black uppercase text-red-500 tracking-[0.4em]">Koshish Classifieds</h4>
              </div>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => { setSelectedCategory('All'); setSelectedServiceSub('All'); }}
                  className={`text-left px-10 py-6 rounded-[2.5rem] font-black transition-all text-sm tracking-widest uppercase border ${selectedCategory === 'All' ? 'bg-red-700 text-white border-red-500 shadow-4xl' : 'bg-white/5 text-slate-400 border-white/5 hover:border-red-500/50 hover:bg-white/10'}`}
                >
                  All Listings
                </button>
                {Object.values(Category).filter(c => c !== Category.COMMUNITY && c !== Category.BUSINESS).map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left px-10 py-6 rounded-[2.5rem] font-black transition-all text-sm tracking-widest uppercase border ${selectedCategory === cat ? 'bg-red-700 text-white border-red-500 shadow-4xl -translate-y-2' : 'bg-white/5 text-slate-400 border-white/5 hover:border-red-500/50 hover:bg-white/10'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-white/10">
               <div className="bg-gradient-to-br from-red-950/40 to-slate-950 p-10 rounded-[3rem] border border-red-500/20 shadow-xl">
                  <p className="text-[11px] font-black uppercase text-red-400 mb-3 tracking-[0.3em] flex items-center gap-2">
                    <span className="text-xl">🛡️</span> Nagrita Shield
                  </p>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed opacity-70 italic">
                    Prioritize authentic pros verified by citizenship ID.
                  </p>
                  <div className="flex items-center gap-5 mt-8">
                    <div className="relative">
                        <input 
                          type="checkbox" 
                          id="v-listings"
                          className="w-10 h-10 rounded-2xl border-white/20 bg-white/5 text-red-700 focus:ring-red-500 cursor-pointer appearance-none checked:bg-red-700 transition-all border-2"
                          checked={onlyVerified}
                          onChange={(e) => setOnlyVerified(e.target.checked)}
                        />
                        {onlyVerified && <span className="absolute inset-0 flex items-center justify-center pointer-events-none text-white font-black">✓</span>}
                    </div>
                    <label htmlFor="v-listings" className="text-sm font-black text-white cursor-pointer uppercase tracking-[0.2em] italic">
                      High Trust Only
                    </label>
                  </div>
               </div>
            </div>
          </div>
        </aside>

        <main className="flex-grow">
          <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="relative">
               <h2 className="text-7xl font-black text-white tracking-tighter italic nepal-gradient-text">
                {selectedCategory === 'All' ? `Explore ${selectedCity}` : selectedCategory}
              </h2>
              {selectedServiceSub !== 'All' && (
                <p className="text-amber-500 font-black uppercase tracking-[0.2em] mt-2 italic">Pro: {selectedServiceSub}</p>
              )}
              <div className="absolute -bottom-4 left-0 w-32 h-2 bg-gradient-to-r from-red-700 to-transparent rounded-full"></div>
            </div>
            <div className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-500 animate-pulse">
              Last Updated: Just Now
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-16">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <ListingCard key={post.id} post={post} selectedCity={selectedCity} />
              ))
            ) : (
              <div className="col-span-full py-40 text-center glass-panel rounded-[5rem] gold-border">
                <span className="text-8xl mb-10 block sacred-icon">☸️</span>
                <h3 className="text-4xl font-black italic tracking-tighter text-slate-200">The Hub is Quiet.</h3>
                <p className="text-slate-500 font-bold mt-6 text-xl">Be the pioneer who starts the conversation in {selectedCity}!</p>
                <Link to="/new-post" className="inline-block mt-12 bg-red-700 text-white px-12 py-5 rounded-[2rem] font-black uppercase tracking-widest hover:bg-white hover:text-red-700 transition-all">
                    Create First Post
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>

      <MapInsightsPanel city={selectedCity} />
      <AskCommunitySection />
    </div>
  );
};

export default HomePage;
