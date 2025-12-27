
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_STAYS } from '../constants';
import { PartneredStay, User } from '../types';
import PaymentModal from '../components/PaymentModal';
import { currencyService } from '../services/currencyService';

interface Props {
  user: User | null;
  onUpdateUser: (user: User) => void;
}

const StaysPage: React.FC<Props> = ({ user, onUpdateUser }) => {
  const [selectedStay, setSelectedStay] = useState<PartneredStay | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookingType, setBookingType] = useState<'night' | 'day'>('night');
  const [useCredits, setUseCredits] = useState(false);
  const [currentCity, setCurrentCity] = useState(localStorage.getItem('sajha_city') || 'Global');

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentCity(localStorage.getItem('sajha_city') || 'Global');
    };
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleBooking = (stay: PartneredStay, type: 'night' | 'day' = 'night') => {
    setSelectedStay(stay);
    setBookingType(type);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    if (useCredits && user) {
      // Deduct 5 credits for a discount simulation
      onUpdateUser({
        ...user,
        credits: Math.max(0, user.credits - 5)
      });
    }
    setIsPaymentOpen(false);
    setBooked(true);
    setTimeout(() => setBooked(false), 5000);
  };

  return (
    <div className="py-12 flex flex-col gap-12">
      <section className="bg-slate-900 rounded-[3rem] overflow-hidden p-10 md:p-20 relative flex flex-col md:flex-row items-center gap-10">
        <div className="relative z-10 flex-grow text-center md:text-left">
          <span className="bg-red-700 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">
            Sajha Partner Network
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Redeem Your <br /> <span className="text-amber-500">Hub Credits.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-xl mb-10 font-medium">
            Verified members can use 🪙 credits to get exclusive discounts at our partnered diaspora homestays and hotels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/stays/apply" className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black hover:bg-red-600 hover:text-white transition-all shadow-xl text-center">
              Apply to Partner
            </Link>
            {user && user.credits > 0 && (
              <div className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-white/10 bg-white/5">
                 <span className="text-amber-500 text-xl font-black">🪙 {user.credits.toFixed(1)}</span>
                 <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Available to Spend</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <div id="browse" className="scroll-mt-32">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 px-4">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black text-slate-900 mb-4 italic tracking-tighter">Partnered Stays</h2>
            <p className="text-lg text-slate-600">Verified diaspora-owned properties accepting Hub Credits.</p>
          </div>
        </div>

        {booked && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl animate-bounce font-black">
            🎉 Booking Successful! Check your email for voucher code.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_STAYS.map(stay => {
            const nightPriceValue = stay.pricePerNight;
            const nightPrice = currencyService.convertAndFormat(nightPriceValue, currentCity, '/night');
            
            return (
              <div key={stay.id} className="bg-white rounded-[3.5rem] border border-slate-200 overflow-hidden hover:shadow-2xl transition-all group flex flex-col h-full relative">
                <div className="relative h-64 overflow-hidden">
                  <img src={stay.imageUrl} alt={stay.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-red-700 shadow-sm uppercase tracking-widest">
                      {stay.type}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur text-white px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1 shadow-xl">
                    ⭐ {stay.rating}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-red-700 transition-colors italic">{stay.name}</h3>
                  <p className="text-slate-500 text-sm mb-6 font-bold flex items-center gap-2 uppercase tracking-widest">
                    📍 {stay.location}
                  </p>
                  
                  <p className="text-slate-600 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
                    {stay.description}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-slate-100 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Standard Rate</p>
                        <p className="text-xl font-black text-red-700">{nightPrice}</p>
                      </div>
                      <button 
                        onClick={() => handleBooking(stay, 'night')}
                        className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black hover:bg-red-700 transition-all shadow-xl active:scale-95 text-xs uppercase tracking-widest"
                      >
                        Book Now
                      </button>
                    </div>

                    {user && user.credits >= 5 && (
                       <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-center justify-between group/credit cursor-pointer" onClick={() => setUseCredits(!useCredits)}>
                          <div className="flex items-center gap-3">
                             <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${useCredits ? 'bg-amber-500 border-amber-500' : 'border-amber-300'}`}>
                                {useCredits && <span className="text-white text-[10px] font-black">✓</span>}
                             </div>
                             <div>
                                <p className="text-[10px] font-black text-amber-900 uppercase tracking-widest leading-none">Use Hub Credits</p>
                                <p className="text-[8px] text-amber-700 font-bold uppercase mt-1">Redeem 5.0c for $5 off</p>
                             </div>
                          </div>
                          <span className="text-lg">🪙</span>
                       </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedStay && (
        <PaymentModal 
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          amount={currencyService.convertAndFormat(bookingType === 'night' ? selectedStay.pricePerNight - (useCredits ? 5 : 0) : (selectedStay.dayStayPrice || 0), currentCity)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default StaysPage;
