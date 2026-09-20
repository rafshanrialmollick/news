import { create } from "zustand";
import axios from "axios";

const API_URL = "/api";

export const useNewsStore = create((set, get) => ({
  top6News: [],
  allNews: [],
  singleNews: null,
  relatedNews: [],
  userNews: [],
  userStats: null,
  totalPages: 1,
  currentPage: 1,
  selectedCategory: "All",
  searchQuery: "",
  sortBy: "latest",
  loading: false,
  error: null,

  // Fetch Top 6 News for Home Page (Requirement 1)
  fetchTop6News: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/news/top6`);
      if (res.data.success) {
        set({ top6News: res.data.data, loading: false });
      }
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Fetch All News for News Page (Requirement 2)
  fetchAllNews: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const category = params.category ?? get().selectedCategory;
      const search = params.search ?? get().searchQuery;
      const sort = params.sort ?? get().sortBy;
      const page = params.page ?? 1;

      const res = await axios.get(`${API_URL}/news`, {
        params: { category, search, sort, page, limit: 12 },
      });

      if (res.data.success) {
        set({
          allNews: res.data.data,
          totalPages: res.data.totalPages,
          currentPage: res.data.page,
          selectedCategory: category,
          searchQuery: search,
          sortBy: sort,
          loading: false,
        });
      }
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Fetch Single News Article (Requirement 3)
  fetchSingleNews: async (id) => {
    set({ loading: true, singleNews: null, relatedNews: [], error: null });
    try {
      const res = await axios.get(`${API_URL}/news/${id}`);
      if (res.data.success) {
        set({
          singleNews: res.data.data,
          relatedNews: res.data.related || [],
          loading: false,
        });
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || "Article not found",
        loading: false,
      });
    }
  },

  // Create News Article (Requirement 5)
  createNews: async (newsData, token) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/news`, newsData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        set({ loading: false });
        return {
          success: true,
          message: res.data.message,
          data: res.data.data,
        };
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create article.";
      set({ error: msg, loading: false });
      return { success: false, message: msg };
    }
  },

  // Fetch User Dashboard News (Requirement 6 & 7)
  fetchUserDashboard: async (token) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/users/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        set({
          userNews: res.data.news,
          userStats: res.data.stats,
          loading: false,
        });
      }
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Update News Article (Requirement 7)
  updateNews: async (id, newsData, token) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.put(`${API_URL}/news/${id}`, newsData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        // Refresh user dashboard news list
        get().fetchUserDashboard(token);
        set({ loading: false });
        return { success: true, message: res.data.message };
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update article.";
      set({ error: msg, loading: false });
      return { success: false, message: msg };
    }
  },

  // Delete News Article (Requirement 7)
  deleteNews: async (id, token) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.delete(`${API_URL}/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        // Remove locally from state
        set((state) => ({
          userNews: state.userNews.filter((item) => item._id !== id),
          allNews: state.allNews.filter((item) => item._id !== id),
          loading: false,
        }));
        return { success: true, message: res.data.message };
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete article.";
      set({ error: msg, loading: false });
      return { success: false, message: msg };
    }
  },

  // Add Comment
  addComment: async (newsId, content, token) => {
    try {
      const res = await axios.post(
        `${API_URL}/news/${newsId}/comments`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (res.data.success) {
        set((state) => {
          if (state.singleNews && state.singleNews._id === newsId) {
            return {
              singleNews: {
                ...state.singleNews,
                comments: res.data.comments,
              },
            };
          }
          return {};
        });
        return { success: true, message: res.data.message };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Failed to add comment",
      };
    }
  },
}));
