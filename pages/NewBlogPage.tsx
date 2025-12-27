
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, BlogCategory } from '../types';
import { geminiService } from '../services/geminiService';
import AuthModal from '../components/AuthModal';

interface Props {
  user: User | null;
  onVerify: (user: User) => void;
}

const NewBlogPage: React.FC<Props> = ({ user, onVerify }) => {
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPolishing, setIsPolishing] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [estimatedCredits, setEstimatedCredits] = useState(1.0);
  
  const [formData, setFormData] = useState({
    title: '',
    category: BlogCategory.LIFESTYLE,
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1544735032-6a71dd6414fe?q=80&w=2070'
  });

  // Dynamic Credit Estimation based on word count & topic triggers
  useEffect(() => {
    const wordCount = formData.content.split(/\s+/).filter(x => x.length > 0).length;
    let base = 1.0;
    if (wordCount > 100) base = 2.0;
    if (wordCount > 300) base = 5.0;
    if (wordCount > 600) base = 8.0;
    
    // Simple heuristic for "authentic" topics before AI check
    const keywords = ['struggle', 'journey', 'experience', 'living in', 'how to', 'visa', 'accommodation'];
    const hasKeyword = keywords.some(k => formData.content.toLowerCase().includes(k));
    if (hasKeyword && wordCount > 200) base += 2.0;

    setEstimatedCredits(Math.min(10, base));
  }, [formData.content]);

  const handlePolish = async () => {
    if (!formData.content || !formData.title) {
      alert("Add a title and story details first!");
      return;
    }
    setIsPolishing(true);
    const polished = await geminiService.polishBlogContent(formData.title, formData.content);
    setFormData(prev => ({ ...prev, content: polished }));
    setIsPolishing(false);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    
    setIsPublishing(true);
    const evalResult = await geminiService.evaluateBlogAuthenticity(formData.title, formData.content);
    
    let creditsToAward = 1.0; 
    if (!evalResult.isGeneral) {
      creditsToAward = Math.max(2.0, (evalResult.score / 10));
      if (creditsToAward > 10) creditsToAward = 10;
    }

    if (user && user.isVerified) {
      const updatedUser = {
        ...user,
        credits: (user.credits || 0) + creditsToAward
      };
      onVerify(updatedUser);
      alert(`Published! AI Score: ${evalResult.score}/100. Authenticity: ${evalResult.isGeneral ? 'General' : 'High-Value Diaspora Story'}. Awarded +${creditsToAward.toFixed(1)} Credits! 🪙`);
    } else {
      alert(`Published! Your story scored ${evalResult.score}/100 for authenticity. You earned ${creditsToAward.toFixed(1)} credits, but they are PENDING in your vault. Verify your ID in Profile to bank them.`);
    }
    
    setIsPublishing(false);
    navigate('/blog');
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="mb-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/blog')} className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xl hover:bg-slate-50 transition-colors shadow-sm">←</button>
          <div>
            <h1 className="text-4xl font-black text-slate-900 mb-1 tracking-tighter italic">Write a Story</h1>
            <p className="text-slate-500 font-medium">Diaspora voices earn <span className="text-red-700 font-black">1c - 10c</span></p>
          </div>
        </div>
        
        <div className="bg-slate-900 text-white px-8 py-4 rounded-[2rem] border-b-4 border-slate-950 flex flex-col items-center">
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Authenticity Meter</span>
           <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-red-500 transition-all duration-700" style={{ width: `${(estimatedCredits / 10) * 100}%` }}></div>
              </div>
              <span className="text-xs font-black text-red-500">🪙 {estimatedCredits.toFixed(1)} est.</span>
           </div>
        </div>
      </div>

      <form onSubmit={handlePublish} className="bg-white p-10 md:p-16 rounded-[4rem] border border-slate-200 shadow-2xl flex flex-col gap-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[80px] pointer-events-none"></div>

        {(!user || !user.isVerified) && (
          <div className="bg-amber-50 border border-amber-200 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <span className="text-4xl">🔐</span>
              <div>
                <p className="font-black text-amber-900 uppercase text-xs tracking-widest mb-1">The Catch: Verification Required</p>
                <p className="text-amber-800 text-sm font-medium">You can write and publish, but credits will stay in "Pending Vault" until you verify your profile via Google/Facebook.</p>
              </div>
            </div>
            <button type="button" onClick={() => setIsAuthOpen(true)} className="bg-amber-700 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest">Verify & Bank</button>
          </div>
        )}

        <div className="space-y-8">
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Story Title</label>
            <input 
              type="text" 
              placeholder="e.g. Navigating Visa Renewals in the UK"
              className="text-3xl md:text-5xl font-black text-slate-900 border-none outline-none focus:ring-0 placeholder:text-slate-100 p-0"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Category</label>
            <div className="flex flex-wrap gap-2">
              {Object.values(BlogCategory).map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormData({...formData, category: cat})}
                  className={`px-6 py-3 rounded-xl text-xs font-black transition-all border ${formData.category === cat ? 'bg-red-700 text-white border-red-700 shadow-lg' : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-red-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Your Deep Dive Story</label>
              <button 
                type="button"
                onClick={handlePolish}
                disabled={isPolishing}
                className="bg-red-50 text-red-700 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-red-100 hover:bg-red-100 disabled:opacity-50 transition-all flex items-center gap-2"
              >
                {isPolishing ? '✨ Polishing...' : '✨ Improve with AI Editor'}
              </button>
            </div>
            <textarea 
              rows={12}
              placeholder="Tell your story. Personal experiences, student tips, or worker guides earn the most credits..."
              className="w-full p-0 text-lg font-medium leading-relaxed border-none outline-none focus:ring-0 placeholder:text-slate-100 resize-none min-h-[350px]"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100">
          <button 
            type="submit"
            disabled={isPublishing}
            className="w-full bg-slate-900 text-white py-6 rounded-[2.5rem] font-black text-xl hover:bg-red-700 transition-all shadow-2xl active:scale-95 disabled:opacity-50"
          >
            {isPublishing ? 'Evaluating with AI...' : user?.isVerified ? 'Publish & Bank Credits' : 'Publish (Credits will be Pending)'}
          </button>
        </div>
      </form>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onVerify={onVerify} />
    </div>
  );
};

export default NewBlogPage;
