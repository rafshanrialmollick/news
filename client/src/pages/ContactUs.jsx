import React, { useState } from "react";
import axios from "axios";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
  Globe,
  ShieldCheck,
} from "lucide-react";

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await axios.post("/api/contact", formData);
      if (res.data.success) {
        setSuccessMsg(res.data.message);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Failed to submit contact message.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
          Editorial & Reader Support
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white font-serif uppercase tracking-tight">
          Get in Touch
        </h1>
        <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
          Have a news tip, press release, feedback, or inquiry for our editorial
          team? We’d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form (2 Cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 dark:border-slate-800 pb-4">
            <MessageSquare className="w-6 h-6 text-sky-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-serif">
              Send a Direct Message
            </h2>
          </div>

          {successMsg && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-2xl text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 rounded-2xl text-xs flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-xl p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-xl p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                Subject / Topic
              </label>
              <input
                type="text"
                placeholder="e.g. News Tip / Editorial Inquiry"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-xl p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1">
                Message Content *
              </label>
              <textarea
                required
                rows={5}
                placeholder="Details of your inquiry or story submission..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white text-sm rounded-xl p-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg flex items-center gap-2 transition"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Send Message
            </button>
          </form>
        </div>

        {/* Global Bureaus Sidebar (1 Col) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-white font-serif uppercase border-b border-gray-100 dark:border-slate-800 pb-3">
              Press Headquarters
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    101 plaza Khulna
                  </p>
                  <p className="text-gray-500 dark:text-slate-400">
                    100 Global Press Plaza, Floor 14, Khulna
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    General Inquiries
                  </p>
                  <p className="text-gray-500 dark:text-slate-400">
                    contact@globalpulse.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    Press Desk Line
                  </p>
                  <p className="text-gray-500 dark:text-slate-400">
                    +8801955297619
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
