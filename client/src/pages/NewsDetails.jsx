import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useNewsStore } from '../store/useNewsStore';
import { useAuthStore } from '../store/useAuthStore';
import { NewsCard } from '../components/NewsCard';
import {
  Clock,
  Eye,
  MessageSquare,
  Share2,
  Bookmark,
  ArrowLeft,
  Send,
  Loader2,
  CheckCircle,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
} from 'lucide-react';

export const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleNews, relatedNews, fetchSingleNews, addComment, loading } = useNewsStore();
  const { user, isAuthenticated, token } = useAuthStore();

  const [commentText, setCommentText] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (id) {
      fetchSingleNews(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setCommentSubmitting(true);
    const res = await addComment(id, commentText, token);
    setCommentSubmitting(false);

    if (res.success) {
      setCommentText('');
    } else {
      alert(res.message);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (loading && !singleNews) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-sky-600 animate-spin mb-4" />
        <p className="text-sm font-semibold text-gray-500">Loading full story...</p>
      </div>
    );
  }

  if (!singleNews) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Article Not Found</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-2 mb-6">
          The news article you are looking for does not exist or may have been removed.
        </p>
        <Link
          to="/news"
          className="inline-flex items-center gap-2 bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" /> Return to News Desk
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-slate-400 hover:text-sky-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to News Feed
      </button>

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-extrabold text-xs px-3 py-1 rounded-md uppercase tracking-wider">
            {singleNews.category}
          </span>
          {singleNews.isTopHeadline && (
            <span className="bg-rose-600 text-white font-black text-xs px-2.5 py-1 rounded-md uppercase">
              Top Headline
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white font-serif leading-tight">
          {singleNews.title}
        </h1>

        <p className="text-base sm:text-lg text-gray-600 dark:text-slate-300 leading-relaxed font-sans italic border-l-4 border-sky-500 pl-4">
          {singleNews.summary}
        </p>

        {/* Author & Metadata Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-gray-200 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-3">
            <img
              src={singleNews.author?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'}
              alt={singleNews.author?.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-500"
            />
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm">
                {singleNews.author?.name || 'Global Pulse Desk'}
              </p>
              <p className="text-gray-500 dark:text-slate-400">
                {singleNews.author?.bio || 'Senior Investigative Journalist'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-sky-500" />
              {new Date(singleNews.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4 text-sky-500" /> {singleNews.views || 0} views
            </span>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-slate-800 bg-slate-900">
        <img
          src={singleNews.imageUrl}
          alt={singleNews.title}
          className="w-full max-h-[480px] object-cover"
        />
      </div>

      {/* Main Body Content */}
      <article className="prose dark:prose-invert max-w-none text-gray-800 dark:text-slate-200 font-serif leading-relaxed text-base sm:text-lg space-y-6">
        {singleNews.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="leading-8">
            {paragraph}
          </p>
        ))}
      </article>

      {/* Article Action Bar / Social Share */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-sky-600" />
          <span className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase">Share story:</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-semibold rounded-lg text-gray-700 dark:text-slate-300 hover:bg-gray-100 transition"
          >
            {copiedLink ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedLink ? 'Link Copied!' : 'Copy Link'}
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(singleNews.title)}&url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noreferrer"
            className="p-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-700 dark:text-slate-300 hover:text-sky-500 transition"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noreferrer"
            className="p-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-700 dark:text-slate-300 hover:text-sky-600 transition"
          >
            <Facebook className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* COMMENTS SECTION */}
      <section className="pt-8 border-t border-gray-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-sky-600" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white font-serif">
            Discussion & Reader Comments ({singleNews.comments?.length || 0})
          </h3>
        </div>

        {/* Comment Box */}
        {isAuthenticated ? (
          <form onSubmit={handleCommentSubmit} className="space-y-3">
            <div className="flex gap-3">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
                alt={user?.name}
                className="w-9 h-9 rounded-full object-cover shrink-0"
              />
              <div className="flex-1">
                <textarea
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your perspective on this report..."
                  required
                  className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-xl p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={commentSubmitting || !commentText.trim()}
                className="bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 shadow disabled:opacity-50 transition"
              >
                {commentSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                Post Comment
              </button>
            </div>
          </form>
        ) : (
          <div className="p-4 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60 rounded-xl text-xs text-sky-800 dark:text-sky-300 flex items-center justify-between">
            <span>Logged in users can participate in article discussions.</span>
            <Link to="/login" className="font-bold underline text-sky-700 dark:text-sky-300">
              Log In to Comment →
            </Link>
          </div>
        )}

        {/* Comment List */}
        <div className="space-y-4 pt-2">
          {singleNews.comments?.length > 0 ? (
            singleNews.comments.map((cmt) => (
              <div
                key={cmt._id}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={cmt.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
                      alt={cmt.userName}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="font-bold text-xs text-gray-900 dark:text-white">
                      {cmt.userName || 'Community Reader'}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400">
                    {new Date(cmt.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-slate-300 leading-relaxed pl-9">
                  {cmt.content}
                </p>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-400 italic">No comments yet. Be the first to express your thoughts!</p>
          )}
        </div>
      </section>

      {/* RELATED NEWS SECTION */}
      {relatedNews.length > 0 && (
        <section className="pt-8 border-t border-gray-200 dark:border-slate-800 space-y-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white font-serif uppercase">
            Related Reports in {singleNews.category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedNews.map((news) => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
