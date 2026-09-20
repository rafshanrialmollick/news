import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNewsStore } from '../store/useNewsStore';
import { NewsCard } from '../components/NewsCard';
import {
  Flame,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Newspaper,
  Award,
  ChevronRight,
  Zap,
} from 'lucide-react';

export const Home = () => {
  const { top6News, fetchTop6News, allNews, fetchAllNews, loading } = useNewsStore();
  const [activeCategoryTab, setActiveCategoryTab] = useState('Technology');

  useEffect(() => {
    fetchTop6News();
    fetchAllNews({ limit: 12 });
  }, []);

  const featuredArticle = top6News[0] || allNews[0];
  const categoryArticles = allNews.filter((n) => n.category === activeCategoryTab).slice(0, 4);

  return (
    <div className="space-y-12 pb-16">
      
      {/* SECTION 1: HERO / FEATURED ARTICLE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {featuredArticle ? (
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group border border-gray-200/50 dark:border-slate-800">
            <div className="aspect-[16/9] md:aspect-[21/9] w-full bg-slate-900">
              <img
                src={featuredArticle.imageUrl}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-6 sm:p-10 md:p-12">
              <div className="max-w-3xl space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-sky-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                    {featuredArticle.category}
                  </span>
                  <span className="bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Flame className="w-3 h-3 animate-bounce" /> Lead Story
                  </span>
                </div>

                <Link to={`/news/${featuredArticle._id}`}>
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white font-serif hover:text-sky-300 transition-colors leading-tight drop-shadow-md">
                    {featuredArticle.title}
                  </h1>
                </Link>

                <p className="text-sm sm:text-base text-slate-300 line-clamp-2 leading-relaxed max-w-2xl hidden sm:block">
                  {featuredArticle.summary}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={featuredArticle.author?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'}
                      alt={featuredArticle.author?.name}
                      className="w-6 h-6 rounded-full object-cover ring-2 ring-sky-500"
                    />
                    <span className="font-medium text-white">{featuredArticle.author?.name || 'Editorial Staff'}</span>
                  </div>
                  <span>•</span>
                  <span>{new Date(featuredArticle.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <Link
                    to={`/news/${featuredArticle._id}`}
                    className="inline-flex items-center gap-1 text-sky-400 font-bold hover:underline"
                  >
                    Read Full Story <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-96 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse flex items-center justify-center text-gray-400">
            Loading Lead Story...
          </div>
        )}
      </section>

      {/* SECTION 2: TOP 6 HEADLINES  */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white font-serif uppercase tracking-wide">
                Top 6 Headlines
              </h2>
              <p className="text-xs text-gray-500 dark:text-slate-400">Curated top stories fetched directly via API</p>
            </div>
          </div>
          <Link
            to="/news"
            className="flex items-center gap-1 text-sm font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 transition"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading && top6News.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {top6News.map((news) => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>
        )}
      </section>

      {/* SECTION 3: CATEGORY SHOWCASE TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 dark:bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-gray-200/80 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white font-serif uppercase">
                Explore by Category
              </h2>
            </div>
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {['Technology', 'World', 'Sports', 'Entertainment', 'Business', 'Health'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryTab(cat)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                    activeCategoryTab === cat
                      ? 'bg-sky-600 text-white shadow-md'
                      : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryArticles.length > 0 ? (
              categoryArticles.map((article) => (
                <NewsCard key={article._id} news={article} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-sm text-gray-500 dark:text-slate-400">
                No articles published under <span className="font-bold text-sky-600">{activeCategoryTab}</span> yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4: TRENDING & EDITOR'S PICKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Trending List (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-slate-800 pb-3">
              <TrendingUp className="w-5 h-5 text-rose-500" />
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-white uppercase font-serif">
                Most Read & Trending
              </h3>
            </div>

            <div className="space-y-4">
              {allNews.slice(0, 4).map((news) => (
                <NewsCard key={news._id} news={news} compact={true} />
              ))}
            </div>
          </div>

          {/* Editor's Choice Sidebar (1 col) */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 space-y-4 h-fit">
            <div className="flex items-center gap-2 text-amber-500 border-b border-gray-100 dark:border-slate-800 pb-3">
              <Award className="w-5 h-5" />
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white uppercase font-serif">
                Editor's Desk Briefing
              </h3>
            </div>

            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
              Our investigative unit analyzes global macroeconomic shifts, energy transitions, and technological frontiers.
            </p>

            <div className="space-y-3 pt-2">
              {allNews.slice(4, 7).map((news, idx) => (
                <Link
                  key={news._id}
                  to={`/news/${news._id}`}
                  className="block group p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/60 transition"
                >
                  <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 block mb-1">
                    0{idx + 1} • {news.category}
                  </span>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 line-clamp-2">
                    {news.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: NEWSLETTER SUBSCRIPTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 p-8 sm:p-12 text-white overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block">
              Stay Ahead of the Curve
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-serif">
              Subscribe to Global Pulse Morning Briefing
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Join over 150,000 global readers receiving un-biased daily investigative coverage directly in their inbox every morning.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Global Pulse Briefing!'); }} className="flex flex-col sm:flex-row gap-3 pt-2">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 flex-1"
              />
              <button
                type="submit"
                className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm px-6 py-3 rounded-xl transition shadow-lg shrink-0"
              >
                Join Free
              </button>
            </form>
          </div>
          {/* Decorative graphic background */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden lg:block">
            <Newspaper className="w-96 h-96" />
          </div>
        </div>
      </section>

    </div>
  );
};
