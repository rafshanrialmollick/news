import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Mail, Phone, MapPin, Send, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';

export const Footer = () => {
  const categories = ['Technology', 'World', 'Sports', 'Entertainment', 'Business', 'Health'];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white shadow-lg">
                <Newspaper className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white uppercase font-serif">
                Global<span className="text-sky-400">Pulse</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Delivering uncompromised, objective, real-time news coverage and deep investigative reports from across the globe.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-sky-600 text-slate-300 hover:text-white transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-sky-600 text-slate-300 hover:text-white transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-sky-600 text-slate-300 hover:text-white transition">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-sky-600 text-slate-300 hover:text-white transition">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-4 border-l-2 border-sky-500 pl-3">
              News Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/news?category=${cat}`}
                    className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                    {cat} News
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links & Contact */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-4 border-l-2 border-sky-500 pl-3">
              Editorial & Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/contact" className="hover:text-sky-400 transition">Contact Editorial Team</Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-sky-400 transition">Latest Breaking News</Link>
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-xs pt-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>100 Global Press Tower, Khulna</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-xs">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>editor@globalpulse.com</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-xs">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>+8801955297619</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-4 border-l-2 border-sky-500 pl-3">
              Daily Headlines Digest
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Get top investigative briefings directly to your inbox every morning.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to daily headlines digest!'); }} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 rounded-lg px-3 py-2.5 focus:outline-none focus:border-sky-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <Send className="w-3.5 h-3.5" /> Subscribe Free
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Global Pulse News Media Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Ethics Statement</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
