
import React, { useState } from 'react';
// Added BusinessDomain to imports
import { Post, Category, Review, BusinessProfile, BusinessDomain } from '../types';
import { currencyService } from '../services/currencyService';
import VisitingCard from './VisitingCard';

interface Props {
  post: Post;
  selectedCity: string;
  isOpen: boolean;
  onClose: () => void;
}

const ListingDetailModal: React.FC<Props> = ({ post, selectedCity, isOpen, onClose }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [successConfirmed, setSuccessConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSent(true);
    setTimeout(() => {
      setRequestSent(false);
      onClose();
    }, 3000);
  };

  const handleSuccessConfirmation = () => {
    setSuccessConfirmed(true);
    alert("Deal Confirmation Sent! Both parties will receive +0.1 Hub Credits upon verification. This helps our community stay accurate.");
  };

  // Mock business profile for the detail view demonstration
  const mockBusinessProfile: BusinessProfile = {
    businessName: post.author + " Pro Services",
    tagline: "Trusted Diaspora Provider",
    description: post.description,
    domain: BusinessDomain.SERVICES, // Added required domain field
    services: [
      { id: '1', name: 'General Consultation', description: 'Expert consultation for diaspora needs', price: 'Free' },
      { id: '2', name: post.category + " Specialists", description: 'Specialized services in our community' }
    ],
    whatsappNumber: post.whatsappNumber,
    viberNumber: post.viberNumber || post.whatsappNumber,
    category: post.category,
    cardMode: 'digital' as const
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-6xl rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
          {/* Left Side: Images & Info */}
          <div className="lg:w-3/5 relative overflow-y-auto no-scrollbar">
            <button onClick={onClose} className="absolute top-6 left-6 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white text-3xl font-light hover:bg-white/40 transition-all flex items-center justify-center shadow-xl">
              &times;
            </button>
            <img 
              src={post.imageUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073'} 
              className="w-full h-96 object-cover"
              alt={post.title}
            />
            <div className="p-10">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-red-50 text-red-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                  {post.category}
                </span>
                {post.isNagritaVerified && (
                  <span className="bg-red-700 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    🛡️ Nagrita Verified
                  </span>
                )}
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter italic">{post.title}</h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">
                {post.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Location</p>
                  <p className="font-black text-slate-800">📍 {post.city}, {post.region}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Estimated Rate</p>
                  <p className="font-black text-red-700 text-xl">{currencyService.convertAndFormat(post.priceValue, selectedCity)}</p>
                </div>
              </div>

              {/* Fraud Protection Box */}
              {post.isNagritaVerified && (
                <div className="bg-red-50 border-2 border-red-100 p-8 rounded-[2.5rem] mb-10">
                   <div className="flex items-center gap-4 mb-4">
                      <span className="text-3xl">⚖️</span>
                      <h4 className="text-lg font-black text-red-900 italic tracking-tighter">Sajha Community Shield</h4>
                   </div>
                   <p className="text-sm text-red-700 font-medium leading-relaxed">
                     Verified Nagrita Citizen. Identity records on file for accountability and fraud protection. 
                   </p>
                </div>
              )}

              {/* Reviews Section */}
              <div className="border-t border-slate-100 pt-10">
                <h3 className="text-2xl font-black text-slate-900 mb-6">Reviews</h3>
                {post.reviews && post.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {post.reviews.map(review => (
                      <div key={review.id} className="bg-slate-50 p-6 rounded-3xl">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-black text-slate-800 text-sm">{review.author}</p>
                          <span className="text-amber-500 text-xs">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs font-bold text-slate-400 italic">No community feedback yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Professional Card & Contact */}
          <div className="lg:w-2/5 bg-slate-50 p-10 flex flex-col items-center border-l border-slate-100">
            {requestSent ? (
              <div className="text-center my-auto animate-in fade-in zoom-in">
                <span className="text-7xl mb-6 block">📩</span>
                <h3 className="text-3xl font-black text-slate-900 mb-4 italic tracking-tighter">Connected!</h3>
                <p className="text-slate-500 font-medium">Your request is sent to {post.author}.</p>
              </div>
            ) : (
              <div className="w-full space-y-10">
                <div className="text-center">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Verified Professional</h3>
                  <VisitingCard 
                    profile={mockBusinessProfile}
                    isNagritaVerified={post.isNagritaVerified}
                    name={post.author}
                  />
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                   <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">Direct Message</h4>
                   <form onSubmit={handleRequest} className="space-y-4">
                      <input type="text" placeholder="Your Name" className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 text-sm font-bold" required />
                      <textarea placeholder="Describe your requirement..." className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 text-sm font-medium h-24" required></textarea>
                      <button type="submit" className="w-full bg-red-700 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-slate-900 transition-all">
                         Inquire Now
                      </button>
                   </form>
                </div>

                <div className="text-center">
                   <button onClick={handleSuccessConfirmation} disabled={successConfirmed} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-700 transition-colors">
                     {successConfirmed ? '✓ Success Logged' : '🤝 Log successful deal to earn 0.1c'}
                   </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Added missing default export
export default ListingDetailModal;
