import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNewsStore } from '../store/useNewsStore';
import { useAuthStore } from '../store/useAuthStore';
import { PlusCircle, Image, Sparkles, Send, AlertCircle, Loader2, FileText, CheckCircle2 } from 'lucide-react';

export const CreateNews = () => {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const { createNews, loading } = useNewsStore();

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    category: 'Technology',
    imageUrl: '',
    content: '',
    isTopHeadline: false,
  });

  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const sampleImagePresets = [
    { label: 'Technology', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800' },
    { label: 'World News', url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800' },
    { label: 'Sports', url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800' },
    { label: 'Business', url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800' },
    { label: 'Entertainment', url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800' },
    { label: 'Health', url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const res = await createNews(formData, token);
    if (res.success) {
      setSuccessMsg('Article published successfully!');
      setTimeout(() => {
        navigate(`/news/${res.data._id}`);
      }, 1200);
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="border-b border-gray-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-sky-600 text-white shadow-lg">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white font-serif uppercase tracking-tight">
              Publish New Article
            </h1>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Submit your story directly to Global Pulse main news stream.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 rounded-2xl text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-2xl text-sm flex items-center gap-3 font-bold">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
          <span>{successMsg} Redirecting to your published story...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-800 space-y-6">
        
        {/* Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
            Article Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Next-Gen Fusion Reactor Achieves Net Energy Gain"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-base rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500 focus:outline-none font-serif"
          />
        </div>

        {/* Category & Top Headline Switch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
              Select Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500 focus:outline-none font-semibold"
            >
              {['Technology', 'World', 'Sports', 'Entertainment', 'Business', 'Health', 'General'].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center pt-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isTopHeadline}
                onChange={(e) => setFormData({ ...formData, isTopHeadline: e.target.checked })}
                className="w-5 h-5 text-sky-600 rounded border-gray-300 focus:ring-sky-500"
              />
              <span className="text-xs font-bold text-gray-800 dark:text-slate-200 uppercase">
                Promote to Top Headlines Section
              </span>
            </label>
          </div>
        </div>

        {/* Image URL & Preset Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
            Featured Image URL
          </label>
          <div className="relative mb-3">
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
            <Image className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          </div>

          {/* Image Preset Chips */}
          <div className="space-y-1">
            <p className="text-[11px] text-gray-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Or pick a high-res cover image preset:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {sampleImagePresets.map((preset) => (
                <button
                  type="button"
                  key={preset.label}
                  onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                  className="px-3 py-1 bg-gray-100 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-sky-950 text-gray-700 dark:text-slate-300 text-xs font-semibold rounded-lg border border-gray-200 dark:border-slate-700 transition"
                >
                  {preset.label} Cover
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
            Executive Summary / Lead Paragraph *
          </label>
          <textarea
            required
            rows={2}
            placeholder="Brief 1-2 sentence overview of the breaking news..."
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        {/* Full Content */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
            Full Article Story Body *
          </label>
          <textarea
            required
            rows={8}
            placeholder="Write the full report here. Use double line breaks between paragraphs..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500 focus:outline-none font-serif"
          />
        </div>

        {/* Submit */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg flex items-center gap-2 transition"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Publish Article Now
          </button>
        </div>

      </form>
    </div>
  );
};
