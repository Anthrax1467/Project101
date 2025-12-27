
import React, { useState } from 'react';
import { CommunityQuestion } from '../types';
import { MOCK_QUESTIONS } from '../constants';

const AskCommunitySection: React.FC = () => {
  const [questions, setQuestions] = useState<CommunityQuestion[]>(MOCK_QUESTIONS);
  const [newQuestion, setNewQuestion] = useState('');
  const [newCity, setNewCity] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion || !newCity) return;
    
    setIsPosting(true);
    // Simulating a post
    setTimeout(() => {
      const q: CommunityQuestion = {
        id: Math.random().toString(),
        question: newQuestion,
        city: newCity,
        author: 'You',
        date: new Date().toISOString(),
        answers: []
      };
      setQuestions([q, ...questions]);
      setNewQuestion('');
      setNewCity('');
      setIsPosting(false);
    }, 800);
  };

  return (
    <section className="bg-slate-900 rounded-[3rem] p-10 md:p-12 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full"></div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <h2 className="text-3xl font-black mb-4">Ask the Community</h2>
          <p className="text-slate-400 font-medium mb-8 leading-relaxed">
            Quick recommendations from verified diaspora members. No spam, just neighbors helping neighbors.
          </p>
          
          <form onSubmit={handlePost} className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="What is your question?" 
              className="bg-white/10 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              required
            />
            <input 
              type="text" 
              placeholder="City (e.g. Parramatta)" 
              className="bg-white/10 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              required
            />
            <button 
              type="submit"
              disabled={isPosting}
              className="bg-red-700 hover:bg-red-800 transition-all py-3 rounded-xl font-black text-sm uppercase tracking-widest disabled:opacity-50"
            >
              {isPosting ? 'Posting...' : 'Ask Now'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-4 no-scrollbar">
            {questions.map((q) => (
              <div key={q.id} className="bg-white rounded-[2rem] p-6 text-slate-800 border border-slate-100 shadow-xl group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col gap-1">
                    <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block w-fit">
                      📍 {q.city}
                    </span>
                    <h4 className="text-lg font-black leading-tight group-hover:text-red-700 transition-colors">{q.question}</h4>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{new Date(q.date).toLocaleDateString()}</span>
                </div>

                <div className="space-y-3">
                  {q.answers.length > 0 ? (
                    q.answers.map((a) => (
                      <div key={a.id} className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 flex-shrink-0">
                          {a.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-600 leading-relaxed">{a.text}</p>
                          <p className="text-[9px] font-black text-slate-400 uppercase mt-1">By {a.author}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] font-bold text-slate-400 italic">No answers yet. Be the first to help!</p>
                  )}
                  
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-50">
                    <input 
                      type="text" 
                      placeholder="Add a quick answer..." 
                      className="flex-grow text-xs p-2 rounded-lg bg-slate-50 border-none focus:ring-1 focus:ring-red-100"
                    />
                    <button className="bg-slate-900 text-white p-2 rounded-lg text-xs font-black">Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Added missing default export
export default AskCommunitySection;
