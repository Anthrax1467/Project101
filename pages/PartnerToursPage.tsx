
import React, { useState } from 'react';
import { MOCK_AGENCIES } from '../constants';
import { PartneredAgency, TourPackage } from '../types';
import PaymentModal from '../components/PaymentModal';
import { currencyService } from '../services/currencyService';

const PartnerToursPage: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<{pkg: TourPackage, agency: PartneredAgency} | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [booked, setBooked] = useState(false);
  const currentCity = localStorage.getItem('sajha_city') || 'Global';

  const handleBooking = (pkg: TourPackage, agency: PartneredAgency) => {
    setSelectedPackage({ pkg, agency });
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentOpen(false);
    setBooked(true);
    setTimeout(() => setBooked(false), 5000);
  };

  return (
    <div className="py-12 flex flex-col gap-16">
      {/* Hero Section */}
      <section className="bg-red-700 rounded-[3.5rem] p-12 md:p-24 text-white relative overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070" className="w-full h-full object-cover" alt="pattern" />
        </div>
        <div className="relative z-10 max-w-4xl">
          <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">
            Sajha Trusted Network
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter italic">
            Your Local Travel <br />Expert Abroad.
          </h1>
          <p className="text-xl md:text-2xl text-red-100 font-medium mb-12 max-w-2xl mx-auto">
            Book tickets, tours, and visa services directly with verified Nepali-owned agencies in your city.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
             <button className="bg-white text-red-700 px-10 py-4 rounded-2xl font-black shadow-2xl hover:bg-slate-900 hover:text-white transition-all">Explore Agencies</button>
             <button className="bg-red-900/40 border border-red-500/30 text-white px-10 py-4 rounded-2xl font-black">Become a Partner</button>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto w-full px-4">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-2">Partnered Agencies</h2>
            <p className="text-slate-500 font-medium text-lg italic">IATA Certified & Local Experts</p>
          </div>
          <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
             <button className="bg-white px-6 py-2.5 rounded-xl text-xs font-black shadow-sm">All Experts</button>
             <button className="px-6 py-2.5 rounded-xl text-xs font-black text-slate-500 hover:text-slate-900 transition-all">Ticketing Only</button>
             <button className="px-6 py-2.5 rounded-xl text-xs font-black text-slate-500 hover:text-slate-900 transition-all">Tours Only</button>
          </div>
        </div>

        {booked && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl animate-bounce font-black flex items-center gap-3">
             <span className="text-xl">🎟️</span> Booking Sent to Partner!
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {MOCK_AGENCIES.map(agency => (
            <div key={agency.id} className="bg-white rounded-[3.5rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col md:flex-row h-full">
              <div className="md:w-1/3 relative h-64 md:h-auto overflow-hidden">
                <img src={agency.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={agency.name} />
                <div className="absolute top-4 left-4 bg-red-700 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl">
                  Verified since {agency.verifiedYear}
                </div>
              </div>
              <div className="p-8 md:w-2/3 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-red-700 transition-colors">{agency.name}</h3>
                    <p className="text-xs font-bold text-slate-400 flex items-center gap-1 mt-1">📍 {agency.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase">⭐ {agency.rating}</span>
                  </div>
                </div>
                <p className="text-slate-500 text-sm font-medium mb-6 line-clamp-2 leading-relaxed">
                  {agency.description}
                </p>
                
                <div className="space-y-4 mb-8">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Featured Packages</h4>
                  {agency.packages.map(pkg => (
                    <div key={pkg.id} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl group/pkg hover:border-red-200 transition-all">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-black text-slate-800 text-sm group-hover/pkg:text-red-700 transition-colors">{pkg.title}</span>
                        <span className="text-red-700 font-black text-sm">{currencyService.convertAndFormat(pkg.price, currentCity)}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mb-4">{pkg.duration} • {pkg.description}</p>
                      <button 
                        onClick={() => handleBooking(pkg, agency)}
                        className="w-full bg-slate-900 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all shadow-md active:scale-95"
                      >
                        Book Package Directly
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                   <a href={`tel:${agency.contactNumber}`} className="text-[10px] font-black text-slate-400 hover:text-red-700 transition-colors uppercase tracking-widest">
                     📞 Contact Expert
                   </a>
                   <span className="bg-slate-100 px-4 py-1.5 rounded-lg text-[10px] font-black text-slate-600 uppercase">
                     {agency.specialty} Specialist
                   </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPackage && (
        <PaymentModal 
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          amount={currencyService.convertAndFormat(selectedPackage.pkg.price, currentCity)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Benefits Section */}
      <section className="bg-slate-50 border-y border-slate-200 py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="w-20 h-20 bg-white border border-slate-100 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform">🛡️</div>
            <h3 className="text-xl font-black text-slate-900 mb-4">Fraud Protection</h3>
            <p className="text-slate-500 font-medium leading-relaxed">All partnered agencies are vetted with IATA/Local registration checks before joining the hub.</p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 bg-white border border-slate-100 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform">🌍</div>
            <h3 className="text-xl font-black text-slate-900 mb-4">Diaspora Optimized</h3>
            <p className="text-slate-500 font-medium leading-relaxed">Find agencies that understand the unique ticketing needs of the global South East Asian community.</p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 bg-white border border-slate-100 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform">💳</div>
            <h3 className="text-xl font-black text-slate-900 mb-4">Direct Payments</h3>
            <p className="text-slate-500 font-medium leading-relaxed">Securely pay through Sajha Hub to ensure your booking is handled by the verified partner agency.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnerToursPage;
