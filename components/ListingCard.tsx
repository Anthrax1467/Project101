
import React, { useState } from 'react';
import { Post, Category, Region } from '../types';
import { currencyService } from '../services/currencyService';
import ListingDetailModal from './ListingDetailModal';

interface Props {
  post: Post;
  selectedCity?: string; 
  showRenew?: boolean;
  onRenew?: (id: string) => void;
  onToggleAvailability?: (id: string) => void;
  onBoost?: (id: string) => void;
}

const ListingCard: React.FC<Props> = ({ post, selectedCity = 'Global', showRenew, onRenew, onToggleAvailability, onBoost }) => {
  const [feedback, setFeedback] = useState(post.safetyFeedback);
  const [voted, setVoted] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const getCategoryColor = (cat: Category) => {
    switch(cat) {
      case Category.RENTAL: return 'bg-blue-100 text-blue-700';
      case Category.EVENT: return 'bg-amber-100 text-amber-700';
      case Category.CONCERT: return 'bg-fuchsia-100 text-fuchsia-700 ring-1 ring-fuchsia-200';
      case Category.MARKETPLACE: return 'bg-green-100 text-green-700';
      case Category.JOBS: return 'bg-purple-100 text-purple-700';
      case Category.SERVICES: return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const handleFeedback = (type: 'helpful' | 'misleading' | 'scam') => {
    if (voted) return;
    setVoted(type);
    setFeedback(prev => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const formatLastActive = (dateStr: string) => {
    const lastActive = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastActive.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return { text: 'Active today', color: 'text-green-600', dot: 'bg-green-500' };
    if (diffDays === 1) return { text: 'Active yesterday', color: 'text-green-600', dot: 'bg-green-500' };
    return { text: `Active ${diffDays}d ago`, color: 'text-slate-400', dot: 'bg-slate-300' };
  };

  const activeStatus = formatLastActive(post.lastActiveDate);
  const cleanNumber = (num?: string) => num?.replace(/\s+/g, '') || '';

  const getPriceSuffix = () => {
    if (post.category === Category.RENTAL) {
      return post.region === Region.AUSTRALIA ? '/wk' : '/mo';
    }
    if (post.category === Category.SERVICES) return '/hr';
    return '';
  };

  const localizedPrice = currencyService.convertAndFormat(post.priceValue, selectedCity, getPriceSuffix());

  // Trust Tiers Visualization
  const trustTiers = [
    { label: 'N', verified: post.isNagritaVerified, color: 'text-red-500', title: 'Nagrita Verified' },
    { label: 'P', verified: post.isPhoneVerified, color: 'text-blue-500', title: 'Phone Verified' },
    { label: 'E', verified: post.isAuthorVerified, color: 'text-green-500', title: 'Email Verified' }
  ];

  return (
    <>
      <div className={`bg-white rounded-[2.5rem] overflow-hidden border transition-all group flex flex-col h-full relative ${post.isNagritaVerified ? 'border-red-500/20 shadow-[0_0_20px_rgba(185,28,28,0.05)]' : post.isFeatured ? 'border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.15)] ring-1 ring-amber-400/50' : 'border-slate-200 hover:shadow-2xl'}`}>
        
        {/* Verification Badges */}
        <div className="absolute top-4 right-4 z-20 flex gap-1.5">
          {trustTiers.map(tier => (
            <div 
              key={tier.label}
              title={tier.title}
              className={`w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-black transition-all backdrop-blur-md shadow-lg ${tier.verified ? `bg-white ${tier.color} border-${tier.color}/30` : 'bg-black/10 text-white/20 border-white/5'}`}
            >
              {tier.label}
            </div>
          ))}
        </div>

        <div className="relative h-60 overflow-hidden cursor-pointer" onClick={() => setIsDetailOpen(true)}>
          <img 
            src={post.imageUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073'} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${getCategoryColor(post.category)}`}>
              {post.category === Category.SERVICES && post.serviceSubCategory ? post.serviceSubCategory : post.category}
            </span>
          </div>
          
          {post.priceValue !== undefined && (
            <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur text-white px-4 py-1.5 rounded-xl font-black shadow-xl text-lg">
              {localizedPrice}
            </div>
          )}
        </div>
        
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 overflow-hidden">
                {post.author.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-800 line-clamp-1 italic">{post.author}</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{post.city}, {post.region}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
               <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${activeStatus.dot}`}></span>
                <span className={`text-[10px] font-bold ${activeStatus.color} uppercase tracking-tight`}>{activeStatus.text}</span>
              </div>
              {post.rating && (
                <div className="flex items-center gap-1 text-amber-500 font-black text-[9px] mt-0.5">
                   ⭐ {post.rating}
                </div>
              )}
            </div>
          </div>

          <h3 
            className="text-xl font-black text-slate-900 line-clamp-1 mb-2 group-hover:text-red-700 transition-colors cursor-pointer italic"
            onClick={() => setIsDetailOpen(true)}
          >
            {post.title}
          </h3>

          <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-grow leading-relaxed font-medium">
            {post.description}
          </p>

          <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-slate-100">
            <a 
              href={`tel:${cleanNumber(post.phoneNumber)}`}
              className="flex items-center justify-center gap-2 bg-slate-900 text-white p-3.5 rounded-2xl hover:bg-red-700 transition-all shadow-md group/btn active:scale-95"
            >
               <span className="text-lg">📞</span>
               <span className="text-[10px] font-black uppercase tracking-widest">Call</span>
            </a>
            <a 
              href={`https://wa.me/${cleanNumber(post.whatsappNumber || post.phoneNumber)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] text-white p-3.5 rounded-2xl hover:opacity-90 transition-all shadow-md active:scale-95"
            >
               <span className="text-lg">💬</span>
               <span className="text-[10px] font-black uppercase tracking-widest">WhatsApp</span>
            </a>
          </div>
          
          <div className="mt-4 flex gap-1 items-center justify-center">
              <button onClick={() => handleFeedback('helpful')} className={`flex-1 py-1 px-2 rounded-lg text-[8px] font-bold border transition-all ${voted === 'helpful' ? 'bg-green-600 text-white border-green-600' : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-green-50 hover:text-green-600'}`}>
                👍 Helpful ({feedback.helpful})
              </button>
              <button onClick={() => handleFeedback('scam')} className={`flex-1 py-1 px-2 rounded-lg text-[8px] font-bold border transition-all ${voted === 'scam' ? 'bg-red-600 text-white border-red-600' : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-red-50 hover:text-red-600'}`}>
                🚫 Scam Alert ({feedback.scam})
              </button>
          </div>
        </div>
      </div>

      <ListingDetailModal 
        post={post} 
        selectedCity={selectedCity} 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
      />
    </>
  );
};

export default ListingCard;
