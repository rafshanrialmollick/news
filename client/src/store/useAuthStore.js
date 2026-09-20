import { create } from 'zustand';
import axios from 'axios';

const API_URL = '/api';

export const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('news_portal_user')) || null,
  token: localStorage.getItem('news_portal_token') || null,
  isAuthenticated: !!localStorage.getItem('news_portal_token'),
  loading: false,
  error: null,

  // Register
  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/auth/register`, userData);
      if (res.data.success) {
        const { token, user } = res.data;
        localStorage.setItem('news_portal_token', token);
        localStorage.setItem('news_portal_user', JSON.stringify(user));
        set({ user, token, isAuthenticated: true, loading: false });
        return { success: true, message: res.data.message };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed.';
      set({ error: msg, loading: false });
      return { success: false, message: msg };
    }
  },

  // Login
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/auth/login`, credentials);
      if (res.data.success) {
        const { token, user } = res.data;
        localStorage.setItem('news_portal_token', token);
        localStorage.setItem('news_portal_user', JSON.stringify(user));
        set({ user, token, isAuthenticated: true, loading: false });
        return { success: true, message: res.data.message };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid email or password.';
      set({ error: msg, loading: false });
      return { success: false, message: msg };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('news_portal_token');
    localStorage.removeItem('news_portal_user');
    set({ user: null, token: null, isAuthenticated: false, error: null });
  },

  // Update Profile
  updateProfile: async (profileData) => {
    set({ loading: true, error: null });
    try {
      const token = get().token;
      const res = await axios.put(`${API_URL}/users/profile`, profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        const updatedUser = res.data.user;
        localStorage.setItem('news_portal_user', JSON.stringify(updatedUser));
        set({ user: updatedUser, loading: false });
        return { success: true, message: res.data.message };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Profile update failed.';
      set({ error: msg, loading: false });
      return { success: false, message: msg };
    }
  },
}));
