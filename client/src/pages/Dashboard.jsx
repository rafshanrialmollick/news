import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNewsStore } from '../store/useNewsStore';
import { EditNewsModal } from '../components/EditNewsModal';
import {
  User,
  Newspaper,
  Eye,
  Edit,
  Trash2,
  Save,
  CheckCircle,
  AlertCircle,
  Loader2,
  PlusCircle,
  LayoutDashboard,
  Shield,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { user, token, updateProfile } = useAuthStore();
  const { userNews, userStats, fetchUserDashboard, deleteNews, loading } = useNewsStore();

  const [activeTab, setActiveTab] = useState('articles'); // 'articles' | 'profile'
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
    password: '',
  });

  const [profileMsg, setProfileMsg] = useState(null);
  const [profileError, setProfileError] = useState(null);
  const [profileUpdating, setProfileUpdating] = useState(false);

  // Edit Modal State
  const [editingArticle, setEditingArticle] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState(null);

  useEffect(() => {
    if (token) {
      fetchUserDashboard(token);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
        password: '',
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMsg(null);
    setProfileError(null);
    setProfileUpdating(true);

    const res = await updateProfile(profileForm);
    setProfileUpdating(false);

    if (res.success) {
      setProfileMsg('Profile updated successfully!');
      setProfileForm((prev) => ({ ...prev, password: '' }));
      setTimeout(() => setProfileMsg(null), 3000);
    } else {
      setProfileError(res.message);
    }
  };

  const handleDeleteArticle = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      const res = await deleteNews(id, token);
      if (res.success) {
        setActionSuccessMsg('Article deleted successfully.');
        setTimeout(() => setActionSuccessMsg(null), 3000);
      } else {
        alert(res.message);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Edit Article Modal Component */}
      <EditNewsModal
        news={editingArticle}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingArticle(null);
        }}
        onSuccess={(msg) => {
          setActionSuccessMsg(msg);
          setTimeout(() => setActionSuccessMsg(null), 3000);
        }}
      />

      {/* Profile Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-slate-800">
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
            alt={user?.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-sky-500 shadow-xl shrink-0"
          />
          <div className="text-center sm:text-left space-y-1 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black font-serif">{user?.name}</h1>
              <span className="bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {user?.role || 'Contributor'}
              </span>
            </div>
            <p className="text-xs text-slate-300">{user?.email}</p>
            <p className="text-xs text-slate-400 max-w-xl italic pt-1">{user?.bio || 'Journalist and contributor.'}</p>
          </div>
          <Link
            to="/create-news"
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg transition shrink-0"
          >
            <PlusCircle className="w-4 h-4" /> Publish New Article
          </Link>
        </div>
      </div>

      {/* Analytics Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900 dark:text-white font-serif">
              {userStats?.totalArticles || userNews.length}
            </p>
            <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">Articles Published</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900 dark:text-white font-serif">
              {userStats?.totalViews || 0}
            </p>
            <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">Total Article Views</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900 dark:text-white font-serif">
              Active Contributor
            </p>
            <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">Account Status</p>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {actionSuccessMsg && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-500" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Dashboard Tabs Header */}
      <div className="flex border-b border-gray-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('articles')}
          className={`py-3 px-6 text-sm font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'articles'
              ? 'border-sky-600 text-sky-600 dark:text-sky-400'
              : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-700'
          }`}
        >
          <Newspaper className="w-4 h-4" /> My Published Articles ({userNews.length})
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`py-3 px-6 text-sm font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'border-sky-600 text-sky-600 dark:text-sky-400'
              : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-700'
          }`}
        >
          <User className="w-4 h-4" /> Edit User Information
        </button>
      </div>

      {/* TAB 1: MY ARTICLES MANAGEMENT (REQUIREMENT 7) */}
      {activeTab === 'articles' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
          {userNews.length === 0 ? (
            <div className="p-12 text-center space-y-4">
              <Newspaper className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-gray-800 dark:text-slate-200">No articles published yet</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 max-w-sm mx-auto">
                Share your first story with the world by creating a new article today.
              </p>
              <Link
                to="/create-news"
                className="inline-flex items-center gap-2 bg-sky-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow"
              >
                <PlusCircle className="w-4 h-4" /> Create First Article
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700 dark:text-slate-300">
                <thead className="bg-gray-50 dark:bg-slate-800/60 text-xs uppercase font-extrabold text-gray-500 dark:text-slate-400 border-b border-gray-200 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Article</th>
                    <th className="px-4 py-4">Category</th>
                    <th className="px-4 py-4">Views</th>
                    <th className="px-4 py-4">Published Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                  {userNews.map((article) => (
                    <tr key={article._id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/40 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-14 h-14 rounded-lg object-cover shrink-0"
                          />
                          <div>
                            <Link
                              to={`/news/${article._id}`}
                              className="font-bold text-gray-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 line-clamp-1"
                            >
                              {article.title}
                            </Link>
                            <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                              {article.summary}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-semibold">
                        <span className="flex items-center gap-1 text-xs">
                          <Eye className="w-3.5 h-3.5 text-gray-400" /> {article.views || 0}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-500 dark:text-slate-400">
                        {new Date(article.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingArticle(article);
                              setIsEditModalOpen(true);
                            }}
                            className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 hover:bg-sky-100 transition"
                            title="Edit Article"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(article._id, article.title)}
                            className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: EDIT USER INFORMATION (REQUIREMENT 6) */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-slate-800 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-serif uppercase">
              Update Profile Information
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Update your publicly visible reporter details and account password.
            </p>
          </div>

          {profileMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>{profileMsg}</span>
            </div>
          )}

          {profileError && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-700 dark:text-rose-300 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              <span>{profileError}</span>
            </div>
          )}

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-xl p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                Avatar Image URL
              </label>
              <input
                type="url"
                value={profileForm.avatar}
                onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-xl p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                Bio / Journalist Profile
              </label>
              <textarea
                rows={3}
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-xl p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                Change Password (Leave blank to keep current)
              </label>
              <input
                type="password"
                placeholder="New password..."
                value={profileForm.password}
                onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-xl p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={profileUpdating}
                className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow flex items-center gap-2 transition"
              >
                {profileUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
