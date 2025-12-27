
import React, { useState, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { currencyService } from '../services/currencyService';

interface Deal {
  airline: string;
  price: string;
  comparison: string;
  url: string;
}

const TravelDealsPage: React.FC = () => {
  const [origin, setOrigin] = useState('London');
  const [destination, setDestination] = useState('Kathmandu');
  const [results, setResults] = useState<{ text: string; sources: any[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState(localStorage.getItem('sajha_city') || 'Global');

  useEffect(() => {
    const city = localStorage.getItem('sajha_city') || 'Global';
    setCurrentCity(city);
    if (city !== 'Global') setOrigin(city);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const currency = currencyService.getCurrencyByCity(currentCity);
    const data = await geminiService.searchTravelDeals(origin, destination, currency.code);
    setResults(data);
    setLoading(false);
  };

  const parseDealsFromText = (text: string): Deal[] => {
    const deals: Deal[] = [];
    const items = text.split(/\n\s*\*\s+/);
    
    let currentDeal: Partial<Deal> = {};
    
    items.forEach(item => {
      const line = item.trim();
      if (!line) return;

      if (line.includes('Airline:')) {
        currentDeal.airline = line.split('Airline:')[1].replace(/\*/g, '').trim();
      } else if (line.match(/^\*\*[^*]+\*\*$/)) {
        currentDeal.airline = line.replace(/\*/g, '').trim();
      }
      
      if (line.includes('Price:')) {
        currentDeal.price = line.split('Price:')[1].replace(/\*/g, '').trim();
      }
      
      if (line.includes('Comparison:')) {
        currentDeal.comparison = line.split('Comparison:')[1].replace(/\*/g, '').trim();
      }
      
      const urlMatch = line.match(/\((https?:\/\/[^\s)]+)\)/);
      if (urlMatch) {
        currentDeal.url = urlMatch[1];
      }

      if (currentDeal.airline && currentDeal.price && currentDeal.url && currentDeal.comparison) {
        deals.push(currentDeal as Deal);
        currentDeal = {};
      }
    });

    return deals.slice(0, 5);
  };

  const parseSections = (text: string) => {
    const parts = text.split(/### VALUE_DEALS|### PREMIUM_DEALS/);
    return {
      economical: parseDealsFromText(parts[1] || ""),
      premium: parseDealsFromText(parts[2] || "")
    };
  };

  const getUniquePartners = (sources: any[]) => {
    const seen = new Set<string>();
    const unique: { hostname: string; uri: string }[] = [];
    
    for (const source of sources) {
      if (source.web?.uri) {
        try {
          const hostname = new URL(source.web.uri).hostname.replace('www.', '');
          if (!seen.has(hostname)) {
            seen.add(hostname);
            unique.push({ hostname, uri: source.web.uri });
          }
        } catch (e) {
          // Skip invalid URLs
        }
      }
      if (unique.length >= 2) break; // Limit to maximum 2 partners
    }
    return unique;
  };

  const DealCard = ({ deal, variant }: { deal: Deal, variant: 'cheap' | 'premium' }) => (
    <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 hover:shadow-lg transition-all group/card mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-black text-slate-900 group-hover/card:text-red-700 transition-colors">{deal.airline}</h4>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{deal.comparison}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-black text-slate-900">{deal.price}</p>
          <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${variant === 'cheap' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
            {variant === 'cheap' ? 'Best Value' : 'Premium'}
          </span>
        </div>
      </div>
      <a 
        href={deal.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 ${variant === 'cheap' ? 'bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-100' : 'bg-slate-900 text-white hover:bg-red-700 shadow-md shadow-slate-100'}`}
      >
        Book Directly <span>✈️</span>
      </a>
    </div>
  );

  const sections = results ? parseSections(results.text) : null;
  const uniquePartners = results ? getUniquePartners(results.sources) : [];

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto mb-16 px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <span className="text-red-500">Live</span> Verified Flight Deals
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter italic">Where to next?</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Comparing the latest routes from <span className="text-red-700 font-black">{origin}</span> to Kathmandu.
          </p>
        </div>

        <form onSubmit={handleSearch} className="bg-white p-4 md:p-6 rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col md:flex-row gap-4 relative">
          <div className="flex-1">
            <div className="relative">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🛫</span>
               <input 
                type="text" 
                value={origin} 
                onChange={e => setOrigin(e.target.value)}
                className="w-full p-4 pl-12 rounded-2xl bg-slate-50 border border-slate-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/5 outline-none font-bold"
                placeholder="Origin"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="relative">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🛬</span>
               <input 
                type="text" 
                value={destination} 
                onChange={e => setDestination(e.target.value)}
                className="w-full p-4 pl-12 rounded-2xl bg-slate-50 border border-slate-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/5 outline-none font-bold"
                placeholder="Destination"
              />
            </div>
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="bg-red-700 text-white px-10 py-4 rounded-2xl font-black hover:bg-slate-900 transition-all disabled:opacity-50 shadow-lg active:scale-95 whitespace-nowrap"
          >
            {loading ? 'Searching...' : 'Search Deals'}
          </button>
        </form>
      </div>

      {loading && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
          {[1, 2].map(i => (
            <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 animate-pulse">
              <div className="h-10 w-48 bg-slate-100 rounded-full mb-10"></div>
              {[1, 2, 3, 4, 5].map(j => (
                <div key={j} className="h-32 w-full bg-slate-50 rounded-[2rem] mb-4"></div>
              ))}
            </div>
          ))}
        </div>
      )}

      {results && sections && (
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Economical Section */}
            <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
              <div className="bg-green-600 p-10 text-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Dashboard: Budget</span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(dot => <div key={dot} className="w-1.5 h-1.5 rounded-full bg-white/40"></div>)}
                  </div>
                </div>
                <h2 className="text-4xl font-black italic tracking-tighter">Value Seekers</h2>
                <p className="text-green-100 text-sm font-medium mt-2">Verified economical options found.</p>
              </div>
              <div className="p-10">
                {sections.economical.length > 0 ? (
                  sections.economical.map((deal, idx) => <DealCard key={idx} deal={deal} variant="cheap" />)
                ) : (
                  <p className="text-slate-400 font-bold text-center py-10">No budget deals parsed.</p>
                )}
              </div>
            </div>

            {/* Premium Section */}
            <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
              <div className="bg-slate-900 p-10 text-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Dashboard: Premium</span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(dot => <div key={dot} className="w-1.5 h-1.5 rounded-full bg-white/20"></div>)}
                  </div>
                </div>
                <h2 className="text-4xl font-black italic tracking-tighter">Premium & Urgent</h2>
                <p className="text-slate-400 text-sm font-medium mt-2">Premium or direct routes found.</p>
              </div>
              <div className="p-10">
                {sections.premium.length > 0 ? (
                  sections.premium.map((deal, idx) => <DealCard key={idx} deal={deal} variant="premium" />)
                ) : (
                  <p className="text-slate-400 font-bold text-center py-10">No premium deals parsed.</p>
                )}
              </div>
            </div>

          </div>

          <div className="mt-16 bg-slate-900 text-slate-300 rounded-[3rem] p-10 border border-slate-800">
             <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Detailed Trip Analysis</h3>
             <div className="prose prose-invert max-w-none text-sm font-medium leading-relaxed opacity-80">
                {results.text.split('###').map((part, i) => (
                  <div key={i} className="mb-4">{part}</div>
                ))}
             </div>
          </div>

          {/* Deduplicated Sources Bar */}
          <div className="mt-12 bg-white border border-slate-200 rounded-[2.5rem] p-8">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 text-center">Verified Booking Partner{uniquePartners.length > 1 ? 's' : ''}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {uniquePartners.map((partner, idx) => (
                <a 
                  key={idx}
                  href={partner.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-50 border border-slate-100 px-6 py-3 rounded-2xl flex items-center gap-3 hover:border-red-700 transition-all shadow-sm group"
                >
                  <span className="text-lg">🌍</span>
                  <span className="text-xs font-black text-slate-800 group-hover:text-red-700 uppercase tracking-tight">
                    {partner.hostname}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelDealsPage;
