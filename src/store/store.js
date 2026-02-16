

import { create } from 'zustand';
import { contentAPI, chunkAPI, queryAPI, handleApiError } from '../services/api';

export const useStore = create((set, get) => ({

  content: [],
  selectedContent: null,
  contentLoading: false,
  contentError: null,
  contentStats: null,

  fetchContent: async (filters = {}) => {
    set({ contentLoading: true, contentError: null });
    try {
      const response = await contentAPI.list(filters);
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

  createContent: async (data) => {
    set({ contentLoading: true, contentError: null });
    try {
      const response = await contentAPI.create(data);
      const newContent = response.data;
      
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

  fetchStats: async () => {
    try {
      const response = await contentAPI.getStats();
      set({ contentStats: response.data });
      return response.data;
    } catch (error) {
      console.error('Stats error:', error);
    }
  },


  chunks: [],
  chunksLoading: false,
  chunksError: null,

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


  queryResult: null,
  queryLogs: [],
  queryLoading: false,
  queryError: null,
  logsLoading: false,
  queryStats: { total: 0, limit: 20, offset: 0 },

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

  fetchQueryLog: async (id) => {
    try {
      const response = await queryAPI.getLog(id);
      return response.data;
    } catch (error) {
      console.error('Fetch log error:', error);
      throw error;
    }
  },

  clearQueryResult: () => set({ queryResult: null }),


  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),



  clearErrors: () => set({
    contentError: null,
    chunksError: null,
    queryError: null,
  }),

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