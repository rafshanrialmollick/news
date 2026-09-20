import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  Newspaper,
  PlusCircle,
  User,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Search,
  Flame,
  LayoutDashboard,
} from "lucide-react";

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/news?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Newspaper className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase font-serif">
                Global
                <span className="text-sky-600 dark:text-sky-400">Pulse</span>
              </span>
              <span className="block text-[10px] tracking-widest text-gray-500 dark:text-slate-400 font-sans uppercase -mt-1">
                Independent Journalism
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center relative w-72"
          >
            <input
              type="text"
              placeholder="Search news & topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 border border-transparent dark:border-slate-700 transition"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5" />
          </form>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-gray-700 dark:text-slate-200">
            <Link
              to="/"
              className={`hover:text-sky-600 dark:hover:text-sky-400 transition-colors ${
                isActive("/") ? "text-sky-600 dark:text-sky-400 font-bold" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/news"
              className={`hover:text-sky-600 dark:hover:text-sky-400 transition-colors ${
                isActive("/news")
                  ? "text-sky-600 dark:text-sky-400 font-bold"
                  : ""
              }`}
            >
              All News
            </Link>
            <Link
              to="/contact"
              className={`hover:text-sky-600 dark:hover:text-sky-400 transition-colors ${
                isActive("/contact")
                  ? "text-sky-600 dark:text-sky-400 font-bold"
                  : ""
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Actions & Auth Controls */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
              title="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {/* Publish Article CTA */}
                <Link
                  to="/create-news"
                  className="hidden sm:flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow transition"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish Article</span>
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-sky-500 transition"
                  >
                    <img
                      src={
                        user?.avatar ||
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
                      }
                      alt={user?.name}
                      className="w-9 h-9 rounded-full object-cover border border-sky-500"
                    />
                  </button>

                  {isProfileMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 py-2 z-50"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-700">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-slate-400 truncate">
                          {user?.email}
                        </p>
                      </div>

                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                      >
                        <LayoutDashboard className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                        Dashboard & Profile
                      </Link>
                      <Link
                        to="/create-news"
                        className="flex sm:hidden items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                      >
                        <PlusCircle className="w-4 h-4 text-emerald-600" />
                        Publish Article
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="text-xs sm:text-sm font-semibold bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg shadow-sm transition"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          </form>

          <div className="flex flex-col space-y-3 font-semibold text-gray-800 dark:text-slate-200">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-sky-600"
            >
              Home
            </Link>
            <Link
              to="/news"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-sky-600"
            >
              All News
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-sky-600"
            >
              Contact Us
            </Link>

            {isAuthenticated && (
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-2 py-1.5 text-sky-600 font-bold"
              >
                My Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
