// src/store/useStore.js
// Global State Management using Zustand - FIXED

import { create } from 'zustand';
import { contentAPI, chunkAPI, queryAPI, handleApiError } from '../services/api';

export const useStore = create((set, get) => ({
  // =========================================================================
  // CONTENT STATE
  // =========================================================================
  content: [],
  selectedContent: null,
  contentLoading: false,
  contentError: null,
  contentStats: null,

  // Fetch all content
  fetchContent: async (filters = {}) => {
    set({ contentLoading: true, contentError: null });
    try {
      const response = await contentAPI.list(filters);
      // Handle both direct array and paginated response
      const contentData = response.data.results || response.data;
      const stats = response.data.stats || null;
      
      set({
        content: Array.isArray(contentData) ? contentData : [],
        contentStats: stats,
      });
    } catch (error) {
      const errorData = handleApiError(error);
      set({ contentError: errorData.message });
      console.error('Fetch content error:', error);
    } finally {
      set({ contentLoading: false });
    }
  },

  // Fetch single content
  fetchContentDetail: async (id) => {
    set({ contentLoading: true, contentError: null });
    try {
      const response = await contentAPI.get(id);
      set({ selectedContent: response.data });
    } catch (error) {
      const errorData = handleApiError(error);
      set({ contentError: errorData.message });
      console.error('Fetch content detail error:', error);
    } finally {
      set({ contentLoading: false });
    }
  },

  // Create content (note or URL)
  createContent: async (data) => {
    set({ contentLoading: true, contentError: null });
    try {
      const response = await contentAPI.create(data);
      const newContent = response.data;
      
      // ✅ FIX: Ensure content is an array before spreading
      set((state) => {
        const currentContent = Array.isArray(state.content) ? state.content : [];
        return {
          content: [newContent, ...currentContent],
          selectedContent: newContent,
        };
      });
      
      return newContent;
    } catch (error) {
      const errorData = handleApiError(error);
      set({ contentError: errorData.message });
      console.error('Create content error:', error);
      throw error;
    } finally {
      set({ contentLoading: false });
    }
  },

  // Update content
  updateContent: async (id, data) => {
    try {
      const response = await contentAPI.update(id, data);
      set((state) => {
        const currentContent = Array.isArray(state.content) ? state.content : [];
        return {
          content: currentContent.map((item) => (item.id === id ? response.data : item)),
          selectedContent: response.data,
        };
      });
      return response.data;
    } catch (error) {
      const errorData = handleApiError(error);
      set({ contentError: errorData.message });
      console.error('Update content error:', error);
      throw error;
    }
  },

  // Delete content
  deleteContent: async (id) => {
    try {
      await contentAPI.delete(id);
      set((state) => {
        const currentContent = Array.isArray(state.content) ? state.content : [];
        return {
          content: currentContent.filter((item) => item.id !== id),
          selectedContent: state.selectedContent?.id === id ? null : state.selectedContent,
        };
      });
    } catch (error) {
      const errorData = handleApiError(error);
      set({ contentError: errorData.message });
      console.error('Delete content error:', error);
      throw error;
    }
  },

  // Fetch statistics
  fetchStats: async () => {
    try {
      const response = await contentAPI.getStats();
      set({ contentStats: response.data });
      return response.data;
    } catch (error) {
      console.error('Stats error:', error);
    }
  },

  // =========================================================================
  // CHUNK STATE
  // =========================================================================
  chunks: [],
  chunksLoading: false,
  chunksError: null,

  // Fetch chunks
  fetchChunks: async (contentId = null) => {
    set({ chunksLoading: true, chunksError: null });
    try {
      const response = await chunkAPI.list(contentId);
      const chunksData = response.data.results || response.data;
      set({ chunks: Array.isArray(chunksData) ? chunksData : [] });
      return chunksData;
    } catch (error) {
      const errorData = handleApiError(error);
      set({ chunksError: errorData.message });
      console.error('Fetch chunks error:', error);
    } finally {
      set({ chunksLoading: false });
    }
  },

  // =========================================================================
  // QUERY STATE
  // =========================================================================
  queryResult: null,
  queryLogs: [],
  queryLoading: false,
  queryError: null,
  logsLoading: false,
  queryStats: { total: 0, limit: 20, offset: 0 },

  // Ask a question
  askQuestion: async (question, contentId = null, topK = 5) => {
    set({ queryLoading: true, queryError: null });
    try {
      const response = await queryAPI.ask(question, contentId, topK);
      set({ queryResult: response.data });
      // Refresh logs after query
      const state = get();
      await state.fetchQueryLogs();
      return response.data;
    } catch (error) {
      const errorData = handleApiError(error);
      set({ queryError: errorData.message });
      console.error('Ask question error:', error);
      throw error;
    } finally {
      set({ queryLoading: false });
    }
  },

  // Fetch query logs
  fetchQueryLogs: async (limit = 20, offset = 0) => {
    set({ logsLoading: true, queryError: null });
    try {
      const response = await queryAPI.getLogs(limit, offset);
      const logsData = response.data.results || response.data;
      
      set({
        queryLogs: Array.isArray(logsData) ? logsData : [],
        queryStats: {
          total: response.data.count || response.data.total || logsData.length || 0,
          limit,
          offset,
        },
      });
      return response.data;
    } catch (error) {
      const errorData = handleApiError(error);
      set({ queryError: errorData.message });
      console.error('Fetch logs error:', error);
    } finally {
      set({ logsLoading: false });
    }
  },

  // Fetch single query log
  fetchQueryLog: async (id) => {
    try {
      const response = await queryAPI.getLog(id);
      return response.data;
    } catch (error) {
      console.error('Fetch log error:', error);
      throw error;
    }
  },

  // Clear query result
  clearQueryResult: () => set({ queryResult: null }),

  // =========================================================================
  // UI STATE
  // =========================================================================
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  // =========================================================================
  // UTILITY METHODS
  // =========================================================================

  // Clear all errors
  clearErrors: () => set({
    contentError: null,
    chunksError: null,
    queryError: null,
  }),

  // Reset all state
  resetStore: () => set({
    content: [],
    selectedContent: null,
    contentLoading: false,
    contentError: null,
    contentStats: null,
    chunks: [],
    chunksLoading: false,
    chunksError: null,
    queryResult: null,
    queryLogs: [],
    queryLoading: false,
    queryError: null,
    logsLoading: false,
    sidebarOpen: true,
  }),
}));

export default useStore;