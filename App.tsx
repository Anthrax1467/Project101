
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import NewPostPage from './pages/NewPostPage';
import BlogPage from './pages/BlogPage';
import NewBlogPage from './pages/NewBlogPage';
import StaysPage from './pages/StaysPage';
import TravelDealsPage from './pages/TravelDealsPage';
import FlightsPage from './pages/FlightsPage';
import ProfilePage from './pages/ProfilePage';
import PartnerApplyPage from './pages/PartnerApplyPage';
import PartnerToursPage from './pages/PartnerToursPage';
import PartnersPage from './pages/PartnersPage'; 
import BusinessHubPage from './pages/BusinessHubPage';
import CompanyPage from './pages/CompanyPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import CitySelectionOverlay from './components/CitySelectionOverlay';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('sajha_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    const savedCity = localStorage.getItem('sajha_city');
    if (savedCity) {
      setSelectedCity(savedCity);
    }
  }, []);

  const handleUpdateUser = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('sajha_user', JSON.stringify(newUser));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('sajha_user');
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem('sajha_city', city);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-red-100 selection:text-red-900">
        {!selectedCity && <CitySelectionOverlay onSelectCity={handleCitySelect} />}
        
        <Navbar 
          user={user} 
          onVerify={handleUpdateUser} 
          onSignOut={handleSignOut} 
          selectedCity={selectedCity || 'Global'}
          onCityChange={() => setSelectedCity(null)}
        />
        
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage globalCity={selectedCity || 'Global'} />} />
            <Route path="/listings" element={<HomePage globalCity={selectedCity || 'Global'} />} />
            <Route path="/flights" element={<FlightsPage />} />
            {/* Fix: Pass missing user and onUpdateUser props to StaysPage */}
            <Route path="/stays" element={<StaysPage user={user} onUpdateUser={handleUpdateUser} />} />
            <Route path="/stays/apply" element={<PartnerApplyPage user={user} onVerify={handleUpdateUser} />} />
            <Route path="/deals" element={<TravelDealsPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/business-hub" element={<BusinessHubPage user={user} onUpdateUser={handleUpdateUser} />} />
            <Route path="/events" element={<HomePage globalCity={selectedCity || 'Global'} />} />
            <Route path="/profile" element={<ProfilePage user={user} onUpdateUser={handleUpdateUser} />} />
            <Route path="/new-post" element={<NewPostPage user={user} onVerify={handleUpdateUser} defaultCity={selectedCity || ''} />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/new" element={<NewBlogPage user={user} onVerify={handleUpdateUser} />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        
        <footer className="bg-slate-950 text-white py-24 mt-20 border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none dhaka-texture"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-16 text-center md:text-left relative z-10">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-4xl font-black mb-8 flex items-center justify-center md:justify-start gap-2 italic">
                <span className="bg-red-700 px-3 py-1 rounded-2xl text-white not-italic shadow-2xl crimson-glow">Sajha</span> Hub
              </h3>
              <p className="text-slate-400 leading-relaxed font-bold text-sm mb-4 uppercase tracking-[0.2em]">
                One Community. Our Hub. Beyond Every Border.
              </p>
            </div>
            <div>
              <h4 className="font-black mb-10 text-white uppercase tracking-[0.4em] text-[10px] opacity-60">Directory</h4>
              <ul className="space-y-5 text-slate-400 text-sm font-bold">
                <li><Link to="/partners" className="hover:text-red-700 transition-colors">Partner Network</Link></li>
                <li><Link to="/stays" className="hover:text-red-700 transition-colors">Hotels & Stays</Link></li>
                <li><Link to="/business-hub" className="hover:text-amber-500 transition-colors">Hamro Business Hub</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-10 text-white uppercase tracking-[0.4em] text-[10px] opacity-60">Company</h4>
              <ul className="space-y-5 text-slate-400 text-sm font-bold">
                <li><Link to="/company" className="hover:text-red-700 transition-colors">Mission & Motto</Link></li>
                <li><Link to="/careers" className="hover:text-red-700 transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-red-700 transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-10 text-white uppercase tracking-[0.4em] text-[10px] opacity-60">Community</h4>
              <ul className="space-y-5 text-slate-400 text-sm font-bold">
                <li><Link to="/blog" className="hover:text-red-700 transition-colors">Stories & Blog</Link></li>
                <li><Link to="/listings" className="hover:text-red-700 transition-colors">Global Classifieds</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 mt-20 pt-12 text-center text-slate-700 text-[10px] font-black uppercase tracking-[1em] opacity-40">
            &copy; {new Date().getFullYear()} Sajha Hub Diaspora • Built with Pride 🇳🇵
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
