
import React, { useState, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { currencyService } from '../services/currencyService';
import { FlightDeal } from '../types';

const FlightsPage: React.FC = () => {
  const [origin, setOrigin] = useState('Dallas');
  const [destination, setDestination] = useState('Kathmandu');
  const [results, setResults] = useState<{ budget: FlightDeal[]; premium: FlightDeal[]; rawText: string; sources: any[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState(localStorage.getItem('sajha_city') || 'Global');

  useEffect(() => {
    const city = localStorage.getItem('sajha_city') || 'Global';
    setCurrentCity(city);
    if (city !== 'Global' && city !== 'Kathmandu') setOrigin(city);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const currency = currencyService.getCurrencyByCity(currentCity);
    const data = await geminiService.searchFlights(origin, destination, currency.code);
    
    // Improved parsing for the markdown-style output provided by Gemini
    const budgetDeals = parseDeals(data.text, "BUDGET_FLIGHTS");
    const premiumDeals = parseDeals(data.text, "PREMIUM_FLIGHTS");
    
    setResults({
      budget: budgetDeals,
      premium: premiumDeals,
      rawText: data.text,
      sources: data.sources
    });
    setLoading(false);
  };

  const parseDeals = (text: string, section: string): FlightDeal[] => {
    const deals: FlightDeal[] = [];
    const sectionMarker = `### ${section}`;
    const startIndex = text.indexOf(sectionMarker);
    if (startIndex === -1) return [];

    const sectionEndIndex = text.indexOf('###', startIndex + sectionMarker.length);
    const content = sectionEndIndex === -1 ? text.substring(startIndex) : text.substring(startIndex, sectionEndIndex);
    
    // Split by numbered list items (e.g., "1. ", "2. ")
    const items = content.split(/\d+\.\s+/).slice(1);

    items.forEach(item => {
      const lines = item.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      let airline = lines[0]?.replace(/\*\*/g, '').trim();
      let price = '';
      let flightClass = '';
      let url = '';

      lines.forEach(line => {
        const lowerLine = line.toLowerCase();
        if (lowerLine.includes('price:')) {
          price = line.split(':').slice(1).join(':').replace(/\*/g, '').trim();
        } else if (lowerLine.includes('class:')) {
          flightClass = line.split(':').slice(1).join(':').replace(/\*/g, '').trim();
        } else if (lowerLine.includes('link:')) {
          const urlMatch = line.match(/\((https?:\/\/[^\s)]+)\)/);
          if (urlMatch) url = urlMatch[1];
        } else if (line.includes('http')) {
          const directUrlMatch = line.match(/https?:\/\/[^\s]+/);
          if (directUrlMatch) url = directUrlMatch[0].replace(/[()]/g, '');
        }
      });

      if (airline && price && url) {
        deals.push({
          airline,
          price,
          class: flightClass || 'Standard',
          url,
          origin,
          destination
        });
      }
    });

    return deals.slice(0, 5);
  };

  return (
    <div className="py-12 flex flex-col gap-12">
      <section className="bg-slate-950 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden border border-white/5 shadow-4xl crimson-glow">
        <div className="absolute inset-0 opacity-10 pointer-events-none dhaka-texture scale-125"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-red-700/20 px-6 py-2 rounded-full border border-red-500/30 mb-8">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Live Diaspora Flight Finder</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter italic leading-tight">
            Skies of <br /><span className="text-red-600">Sajha Skies.</span>
          </h1>
          
          <p className="text-xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            The most reliable routes for our community. Compare budget vs. premium options and book directly with official airlines.
          </p>

          <form onSubmit={handleSearch} className="glass-panel p-4 md:p-6 rounded-[3.5rem] flex flex-col md:flex-row gap-4 items-center shadow-3xl max-w-4xl mx-auto">
            <div className="flex-grow w-full md:w-auto relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl">🛫</span>
              <input 
                type="text" 
                value={origin} 
                onChange={e => setOrigin(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-5 pl-16 rounded-[2rem] text-white font-black text-lg outline-none focus:border-red-500 transition-all"
                placeholder="From"
              />
            </div>
            <div className="flex-shrink-0 text-3xl opacity-20 hidden md:block">⇌</div>
            <div className="flex-grow w-full md:w-auto relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl">🛬</span>
              <input 
                type="text" 
                value={destination} 
                onChange={e => setDestination(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-5 pl-16 rounded-[2rem] text-white font-black text-lg outline-none focus:border-red-500 transition-all"
                placeholder="To"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full md:w-auto bg-red-700 text-white px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-white hover:text-red-700 transition-all shadow-xl disabled:opacity-50 active:scale-95"
            >
              {loading ? 'Searching...' : 'Find Deals'}
            </button>
          </form>
        </div>
      </section>

      {loading && (
        <div className="flex flex-col gap-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
             {[1, 2].map(i => (
               <div key={i} className="glass-panel p-10 rounded-[4rem] border-white/5 h-[500px] flex flex-col gap-6">
                  <div className="h-12 w-48 bg-white/5 rounded-full mb-4"></div>
                  {[1, 2, 3, 4].map(j => (
                    <div key={j} className="h-20 w-full bg-white/5 rounded-3xl"></div>
                  ))}
               </div>
             ))}
          </div>
        </div>
      )}

      {results && (
        <div className="flex flex-col gap-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Economical Section */}
            <div className="flex flex-col gap-8">
              <div className="px-8">
                <h2 className="text-4xl font-black italic text-white tracking-tighter">Budget Friendly</h2>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">Economy Selection</p>
              </div>
              <div className="space-y-6">
                {results.budget.length > 0 ? results.budget.map((flight, idx) => (
                  <FlightCard key={idx} flight={flight} variant="budget" />
                )) : <div className="glass-panel p-20 text-center text-slate-600 font-black italic rounded-[3rem]">No budget flights found.</div>}
              </div>
            </div>

            {/* Premium Section */}
            <div className="flex flex-col gap-8">
              <div className="px-8">
                <h2 className="text-4xl font-black italic text-white tracking-tighter">Premium Comfort</h2>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">Business & First Tier</p>
              </div>
              <div className="space-y-6">
                {results.premium.length > 0 ? results.premium.map((flight, idx) => (
                  <FlightCard key={idx} flight={flight} variant="premium" />
                )) : <div className="glass-panel p-20 text-center text-slate-600 font-black italic rounded-[3rem]">No premium flights found.</div>}
              </div>
            </div>
          </div>
          
          {/* Search Methodology section removed as requested */}
        </div>
      )}
    </div>
  );
};

const FlightCard = ({ flight, variant }: { flight: FlightDeal; variant: 'budget' | 'premium' }) => (
  <div className="glass-panel p-8 rounded-[3rem] border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8 hover:border-red-500/40 transition-all group relative overflow-hidden">
    {/* Highlight for Premium */}
    {variant === 'premium' && (
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-[40px] pointer-events-none"></div>
    )}
    
    <div className="flex items-center gap-6 w-full sm:w-auto">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-2xl shrink-0 ${variant === 'budget' ? 'bg-green-600/10 text-green-500' : 'bg-red-700/10 text-red-500'}`}>
        {variant === 'budget' ? '💸' : '👑'}
      </div>
      <div>
        <h4 className="text-2xl font-black text-white italic tracking-tight group-hover:text-red-500 transition-colors">{flight.airline}</h4>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${variant === 'budget' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
            {flight.class}
          </span>
          <span className="text-[10px] text-slate-500 font-black tracking-widest">{flight.origin} → {flight.destination}</span>
        </div>
      </div>
    </div>

    <div className="flex flex-col sm:items-end gap-4 w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-6 sm:pt-0">
      <div className="flex flex-col sm:items-end">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Estimated Return</span>
        <p className={`text-4xl font-black ${variant === 'budget' ? 'text-white' : 'text-red-600'} tracking-tighter`}>
          {flight.price}
        </p>
      </div>
      <a 
        href={flight.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-white text-slate-950 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 hover:text-white transition-all shadow-4xl active:scale-95 text-center flex items-center justify-center gap-2 group/btn"
      >
        Book with {flight.airline} <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
      </a>
    </div>
  </div>
);

export default FlightsPage;
