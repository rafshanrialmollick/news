import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNewsStore } from '../store/useNewsStore';
import { NewsCard } from '../components/NewsCard';
import { Search, Filter, SlidersHorizontal, Loader2, RefreshCw } from 'lucide-react';

export const NewsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const {
    allNews,
    fetchAllNews,
    totalPages,
    currentPage,
    selectedCategory,
    searchQuery,
    sortBy,
    loading,
  } = useNewsStore();

  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState('latest');

  const categories = ['All', 'Technology', 'World', 'Sports', 'Entertainment', 'Business', 'Health'];

  useEffect(() => {
    fetchAllNews({ category, search, sort, page: 1 });
  }, [category, sort]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchAllNews({ category, search, sort, page: 1 });
    setSearchParams({ category, search });
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setSearchParams({ category: cat, search });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchAllNews({ category, search, sort, page: newPage });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="border-b border-gray-200 dark:border-slate-800 pb-6">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white font-serif tracking-tight uppercase">
          News Desk & Catalogue
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
          Explore all latest investigative articles, global reporting, and breaking press coverage.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800 space-y-4">
        
        {/* Top row: Search & Sort */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search by keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-sm rounded-xl pl-10 pr-24 py-2.5 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
            >
              Search
            </button>
          </form>

          {/* Sorting Control */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase">Sort by:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-xs font-semibold rounded-lg px-3 py-2 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="latest">Latest Published</option>
              <option value="popular">Most Viewed / Popular</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

        </div>

        {/* Bottom row: Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-gray-100 dark:border-slate-800">
          <Filter className="w-4 h-4 text-sky-600 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-1.5 text-xs font-bold rounded-full whitespace-nowrap transition-all ${
                category === cat
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Active Filter Badges */}
      {(category !== 'All' || search.trim() !== '') && (
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400">
          <span>Filtering by:</span>
          {category !== 'All' && (
            <span className="bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-bold px-2.5 py-0.5 rounded-md">
              Category: {category}
            </span>
          )}
          {search.trim() !== '' && (
            <span className="bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-bold px-2.5 py-0.5 rounded-md">
              Query: "{search}"
            </span>
          )}
          <button
            onClick={() => {
              setCategory('All');
              setSearch('');
              fetchAllNews({ category: 'All', search: '', sort, page: 1 });
              setSearchParams({});
            }}
            className="text-rose-600 hover:underline flex items-center gap-1 font-semibold ml-2"
          >
            <RefreshCw className="w-3 h-3" /> Reset Filters
          </button>
        </div>
      )}

      {/* News Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-sky-600 animate-spin mb-3" />
          <p className="text-sm font-semibold text-gray-500">Fetching latest articles...</p>
        </div>
      ) : allNews.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-8">
          <p className="text-lg font-bold text-gray-800 dark:text-slate-200">No news articles found</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            Try resetting your search query or selecting a different category filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allNews.map((news) => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-xs font-bold rounded-lg border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-slate-800 transition"
          >
            Previous
          </button>
          <span className="text-xs text-gray-600 dark:text-slate-400 font-semibold px-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-xs font-bold rounded-lg border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-slate-800 transition"
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
};
