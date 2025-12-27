
import React, { useState } from 'react';
import { User } from '../types';
import AuthModal from '../components/AuthModal';

interface Props {
  user: User | null;
  onVerify: (user: User) => void;
}

const PartnerApplyPage: React.FC<Props> = ({ user, onVerify }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    type: 'Homestay',
    location: '',
    contactEmail: '',
    licenseNumber: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center animate-in fade-in slide-in-from-bottom-10">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner">
          📋
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-4">Application Received</h1>
        <p className="text-slate-500 text-lg mb-10 leading-relaxed">
          Thank you, <span className="text-red-700 font-bold">{user?.name}</span>. Our team will verify your business <span className="font-bold text-slate-800">"{formData.businessName}"</span> and the provided license credentials. We will contact you within 3-5 business days.
        </p>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left mb-10">
          <h4 className="font-black text-slate-800 mb-2 uppercase text-xs tracking-widest">Next Steps</h4>
          <ul className="text-sm text-slate-500 space-y-2">
            <li>• Document verification (License & Identity)</li>
            <li>• Quality check of location photos</li>
            <li>• Integration with SajhaSecure™ Payment gateway</li>
          </ul>
        </div>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-red-700 transition-all shadow-xl"
        >
          Back to Stays
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-3">Become a Partnered Stay</h1>
          <p className="text-slate-500 text-lg">Join our exclusive network of verified Nepali-owned accommodations.</p>
        </div>
        <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
          <span>✨</span> Official Verification Required
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Business Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Himalayan Homestay NYC"
                  className="p-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-red-500/20 font-bold"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Property Type</label>
                <select 
                  className="p-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-red-500/20 font-bold"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="Homestay">Homestay</option>
                  <option value="Hotel">Business Hotel</option>
                  <option value="Guesthouse">Guesthouse</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">License / Registration Number</label>
              <input 
                type="text" 
                placeholder="Official business registration ID"
                className="p-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-red-500/20 font-bold"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Location</label>
              <input 
                type="text" 
                placeholder="Full address of the property"
                className="p-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-red-500/20 font-bold"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Business Description</label>
              <textarea 
                rows={4}
                placeholder="Describe your facilities, proximity to transport, and Nepali culture integration..."
                className="p-5 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-red-500/20 resize-none font-medium leading-relaxed"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>

            <button 
              type="submit"
              className="bg-red-700 text-white py-5 rounded-[2rem] font-black text-xl hover:bg-red-800 transition-all shadow-2xl active:scale-95"
            >
              Submit for Verification
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl">
            <h3 className="text-xl font-black mb-4">Why Partner?</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✓</span>
                <span className="text-sm font-medium text-slate-300">Target the global Nepali diaspora specifically.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✓</span>
                <span className="text-sm font-medium text-slate-300">SajhaSecure™ integrated booking and payments.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✓</span>
                <span className="text-sm font-medium text-slate-300">"Verified Partner" badge for high-trust conversions.</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-[2.5rem]">
            <p className="text-blue-900 font-black mb-2 uppercase text-xs tracking-tighter">Security Note</p>
            <p className="text-xs text-blue-700 leading-relaxed font-medium">
              We take verification seriously. All partners must provide proof of ownership or management rights to ensure community safety.
            </p>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onVerify={onVerify} 
      />
    </div>
  );
};

export default PartnerApplyPage;
