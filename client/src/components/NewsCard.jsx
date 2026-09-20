import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, MessageSquare, ArrowUpRight } from 'lucide-react';

export const NewsCard = ({ news, compact = false }) => {
  if (!news) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'Technology': return 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300';
      case 'World': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300';
      case 'Sports': return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300';
      case 'Entertainment': return 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300';
      case 'Business': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300';
      case 'Health': return 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  if (compact) {
    return (
      <Link
        to={`/news/${news._id}`}
        className="group flex gap-4 p-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-sky-500/50 hover:shadow-md transition duration-200"
      >
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-24 h-24 rounded-lg object-cover shrink-0 group-hover:scale-105 transition duration-300"
        />
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider mb-1 ${getCategoryBadgeClass(news.category)}`}>
              {news.category}
            </span>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 line-clamp-2 transition-colors">
              {news.title}
            </h4>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {formatDate(news.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" /> {news.views || 0}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <article className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-200/80 dark:border-slate-800/80 hover:border-sky-500/50 hover:shadow-xl transition duration-300 flex flex-col h-full">
      {/* Image Banner */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-slate-800">
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
        
        <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-extrabold rounded-md shadow-md backdrop-blur-md uppercase tracking-wider ${getCategoryBadgeClass(news.category)}`}>
          {news.category}
        </span>

        {news.isTopHeadline && (
          <span className="absolute top-3 right-3 bg-rose-600 text-white px-2 py-0.5 text-[10px] font-black uppercase rounded shadow">
            Top Headline
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 mb-2">
            <div className="flex items-center gap-2">
              {news.author?.avatar && (
                <img
                  src={news.author.avatar}
                  alt={news.author.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
              )}
              <span className="font-semibold text-gray-700 dark:text-slate-300 truncate max-w-[120px]">
                {news.author?.name || 'Editorial Team'}
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatDate(news.createdAt)}
            </span>
          </div>

          <Link to={`/news/${news._id}`}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 line-clamp-2 transition-colors mb-2 leading-snug">
              {news.title}
            </h3>
          </Link>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {news.summary}
          </p>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> {news.views || 0}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" /> {news.comments?.length || 0}
            </span>
          </div>

          <Link
            to={`/news/${news._id}`}
            className="flex items-center gap-1 font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 transition"
          >
            Read Article <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};
