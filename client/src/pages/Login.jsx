import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Newspaper, Mail, Lock, AlertCircle, Loader2, LogIn } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const res = await login(formData);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-800 p-8 space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg">
            <Newspaper className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white font-serif uppercase">
            Welcome Back
          </h2>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            Sign in to access your news contributor dashboard & profile.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
            Sign In
          </button>
        </form>

        {/* Demo Credentials Tip */}
        <div className="p-3 bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900 rounded-xl text-[11px] text-sky-800 dark:text-sky-300">
          <p className="font-bold">Demo Account Available:</p>
          <p>Email: <code className="bg-sky-100 dark:bg-sky-900 px-1 py-0.5 rounded">eleanor@newsportal.com</code></p>
          <p>Password: <code className="bg-sky-100 dark:bg-sky-900 px-1 py-0.5 rounded">password123</code></p>
        </div>

        {/* Footer Navigation */}
        <p className="text-center text-xs text-gray-500 dark:text-slate-400">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-sky-600 dark:text-sky-400 hover:underline">
            Register for Free
          </Link>
        </p>

      </div>
    </div>
  );
};
