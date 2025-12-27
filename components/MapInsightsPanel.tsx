
import React, { useState, useEffect } from 'react';
import { geminiService } from '../services/geminiService';

interface Props {
  city: string;
}

const MapInsightsPanel: React.FC<Props> = ({ city }) => {
  const [data, setData] = useState<{ text: string; mapsSources: any[] } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      if (city === 'Global') return;
      setLoading(true);
      const res = await geminiService.getCityInsights(city);
      setData(res);
      setLoading(false);
    };
    fetchInsights();
  }, [city]);

  if (city === 'Global') return null;

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-xl mb-12">
      <div className="bg-slate-900 p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="bg-red-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-3 inline-block">Sajha Neighborhood Guide</span>
          <h3 className="text-3xl font-black italic tracking-tighter">Living in {city}</h3>
        </div>
        {data?.mapsSources[0]?.maps?.uri && (
          <a 
            href={data.mapsSources[0].maps.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 border border-white/10 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2"
          >
            🗺️ Explore Area Map
          </a>
        )}
      </div>
      <div className="p-8">
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-100 rounded w-3/4"></div>
            <div className="h-4 bg-slate-100 rounded w-1/2"></div>
            <div className="h-4 bg-slate-100 rounded w-5/6"></div>
          </div>
        ) : (
          <div className="prose prose-slate max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-sm font-medium leading-relaxed text-slate-600 whitespace-pre-wrap">
                {data?.text}
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Location Sources</h4>
                <div className="space-y-3">
                  {data?.mapsSources.slice(0, 3).map((s, i) => s.maps?.uri && (
                    <a key={i} href={s.maps.uri} target="_blank" rel="noopener" className="block text-[11px] font-black text-red-700 hover:underline truncate">
                      📍 {s.maps.title || 'View Location Context'}
                    </a>
                  ))}
                  {(!data?.mapsSources || data.mapsSources.length === 0) && (
                    <p className="text-xs text-slate-400 italic">No specific pins found for this query.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Added missing default export
export default MapInsightsPanel;
