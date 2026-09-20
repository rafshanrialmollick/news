import React, { useState, useEffect } from 'react';
import { useNewsStore } from '../store/useNewsStore';
import { useAuthStore } from '../store/useAuthStore';
import { X, Save, AlertCircle, Loader2 } from 'lucide-react';

export const EditNewsModal = ({ news, isOpen, onClose, onSuccess }) => {
  const { token } = useAuthStore();
  const { updateNews, loading } = useNewsStore();

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    category: 'General',
    imageUrl: '',
    content: '',
    isTopHeadline: false,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title || '',
        summary: news.summary || '',
        category: news.category || 'General',
        imageUrl: news.imageUrl || '',
        content: news.content || '',
        isTopHeadline: news.isTopHeadline || false,
      });
    }
  }, [news]);

  if (!isOpen || !news) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const res = await updateNews(news._id, formData, token);
    if (res.success) {
      onSuccess?.(res.message);
      onClose();
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-800 my-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white font-serif">
            Edit Article
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 dark:bg-rose-950/40 dark:border-rose-900 text-rose-700 dark:text-rose-300 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
              Article Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              >
                {['Technology', 'World', 'Sports', 'Entertainment', 'Business', 'Health', 'General'].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
              Short Summary *
            </label>
            <textarea
              required
              rows={2}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
              Full Content *
            </label>
            <textarea
              required
              rows={6}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-sky-500 focus:outline-none font-sans"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="editTopHeadline"
              checked={formData.isTopHeadline}
              onChange={(e) => setFormData({ ...formData, isTopHeadline: e.target.checked })}
              className="w-4 h-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500"
            />
            <label htmlFor="editTopHeadline" className="text-xs text-gray-700 dark:text-slate-300 font-semibold">
              Mark as Top Headline
            </label>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-sm font-semibold bg-sky-600 hover:bg-sky-500 text-white rounded-lg flex items-center gap-2 shadow"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
