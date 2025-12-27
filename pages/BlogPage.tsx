
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_BLOGS, COMMUNITY_HEROES } from '../constants';
import { BlogCategory, ContributorTier } from '../types';

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'All'>('All');

  const filteredBlogs = selectedCategory === 'All' 
    ? MOCK_BLOGS 
    : MOCK_BLOGS.filter(b => b.category === selectedCategory);

  const getTierColor = (tier: ContributorTier) => {
    switch(tier) {
      case 'Samajsewi': return 'from-slate-300 to-slate-100 text-slate-800 border-slate-400';
      case 'Guru': return 'from-amber-400 to-amber-200 text-amber-900 border-amber-500';
      case 'Sathi': return 'from-slate-400 to-slate-200 text-slate-800 border-slate-300';
      default: return 'from-orange-400 to-orange-200 text-orange-900 border-orange-500';
    }
  };

  return (
    <div className="py-12 flex flex-col gap-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block bg-red-700/10 text-red-700 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-red-700/20">
          Chautari Stories
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter italic">Diaspora Diary.</h1>
        <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
          Voices of the global Nepali community. From hidden momo spots to survival guides in new cities.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Feed */}
        <div className="flex-grow space-y-16">
          {/* Category Filter Bar */}
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setSelectedCategory('All')}
              className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${selectedCategory === 'All' ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-500 border border-slate-200 hover:border-red-200'}`}
            >
              All
            </button>
            {Object.values(BlogCategory).map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-red-700 text-white shadow-xl' : 'bg-white text-slate-500 border border-slate-200 hover:border-red-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredBlogs.map((blog) => (
              <article key={blog.id} className="bg-white rounded-[3.5rem] overflow-hidden border border-slate-200 group hover:shadow-2xl transition-all flex flex-col h-full cursor-pointer relative">
                <div className="h-72 overflow-hidden relative">
                  <img 
                    src={blog.imageUrl} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-90"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur text-red-700 font-black text-[9px] uppercase tracking-widest px-4 py-2 rounded-full shadow-xl">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 border border-slate-200">
                      {blog.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-800">{blog.author}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{blog.date} • {blog.readTime}</p>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-black text-slate-900 mb-6 group-hover:text-red-700 transition-colors leading-tight italic">
                    {blog.title}
                  </h2>
                  <p className="text-slate-500 line-clamp-2 mb-8 leading-relaxed font-medium text-sm">
                    {blog.content}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                    <button className="text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all">
                      Read Story <span>→</span>
                    </button>
                    <div className="flex gap-1 items-center">
                       <span className="text-[10px] font-black text-green-600">Up to 🪙 10 Credits</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Sidebar: Community Heroes */}
        <aside className="lg:w-96 flex flex-col gap-8">
          <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[3.5rem] border border-slate-200 shadow-sm sticky top-28">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-1">Community Heroes</h4>
                <p className="text-xs font-black text-red-700 italic">Top Contributors</p>
              </div>
              <span className="text-2xl">🏆</span>
            </div>

            <div className="space-y-6">
              {COMMUNITY_HEROES.map((hero, idx) => (
                <div key={hero.id} className="flex items-center gap-4 group cursor-help">
                  <div className="relative">
                    <img src={hero.photoURL} alt={hero.name} className="w-14 h-14 rounded-2xl bg-slate-100 border-2 border-white shadow-md group-hover:scale-110 transition-transform" />
                    <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br ${getTierColor(hero.contributorTier!)} flex items-center justify-center text-[10px] font-black shadow-lg border-2 border-white`}>
                      {idx + 1}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                       <p className="text-sm font-black text-slate-800">{hero.name}</p>
                    </div>
                    <div className="flex flex-col gap-0.5 mt-0.5">
                      <p className="text-[10px] font-black text-red-600 italic uppercase tracking-tighter">"{hero.specialty}"</p>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{hero.credits} Points</p>
                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-gradient-to-r ${getTierColor(hero.contributorTier!)} opacity-80`}>
                          {hero.contributorTier}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-red-50 p-6 rounded-[2rem] border border-red-100">
              <h5 className="text-[10px] font-black text-red-700 uppercase tracking-[0.2em] mb-3">Your Impact</h5>
              <p className="text-xs text-red-900 font-medium leading-relaxed mb-4">
                Share stories, help neighbors, and earn credits for early access to global travel deals.
              </p>
              <Link to="/blog/new" className="w-full bg-red-700 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-center block hover:bg-slate-900 transition-all shadow-lg shadow-red-100">
                Start Contributing
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Write a Story CTA */}
      <section className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-8 leading-[0.9]">
            Earn Credits <br />for your travel
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-medium mb-12 leading-relaxed">
            Every story you publish awards you up to <span className="text-red-500 font-black">10 credits</span> based on quality. 
            Redeem points for discounts on Sajha partnered stays and ad boosts.
          </p>
          <Link 
            to="/blog/new"
            className="bg-red-700 text-white px-12 py-5 rounded-[2rem] font-black text-lg hover:bg-white hover:text-red-700 transition-all shadow-2xl inline-block active:scale-95"
          >
            Write Your Story
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
