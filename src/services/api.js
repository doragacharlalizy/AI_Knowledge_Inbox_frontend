// src/services/api.js
// API Service - All backend integration

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================================================
// CONTENT ENDPOINTS
// ============================================================================

export const contentAPI = {
  // List all content
  list: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.type) params.append('type', filters.type);
    if (filters.status) params.append('status', filters.status);
    return api.get(`/content/?${params}`);
  },

  // Get single content
  get: (id) => api.get(`/content/${id}/`),

  // Create content (note or URL)
  create: (data) => {
    return api.post('/content/', data);
  },

  // Update content
  update: (id, data) => api.put(`/content/${id}/`, data),

  // Delete content
  delete: (id) => api.delete(`/content/${id}/`),

  // Get statistics
  getStats: () => api.get('/content/stats/'),
};

// ============================================================================
// CHUNK ENDPOINTS
// ============================================================================

export const chunkAPI = {
  // List all chunks
  list: (contentId = null) => {
    const params = contentId ? `?content_id=${contentId}` : '';
    return api.get(`/chunks/${params}`);
  },

  // Get single chunk
  get: (id) => api.get(`/chunks/${id}/`),
};

// ============================================================================
// QUERY ENDPOINTS
// ============================================================================

export const queryAPI = {
  // Ask a question
  ask: (question, contentId = null, topK = 5) => {
    const payload = {
      question,
      top_k: topK,
    };
    if (contentId) {
      payload.content_id = contentId;
    }
    return api.post('/query/ask/', payload);
  },

  // Get query logs
  getLogs: (limit = 20, offset = 0) => {
    return api.get(`/query/logs/?limit=${limit}&offset=${offset}`);
  },

  // Get single query log
  getLog: (id) => api.get(`/query/logs/${id}/`),
};

// ============================================================================
// ERROR HANDLING
// ============================================================================

export const handleApiError = (error) => {
  if (error.response) {
    return {
      status: error.response.status,
      message: error.response.data?.error || 'An error occurred',
      details: error.response.data?.details || '',
    };
  } else if (error.request) {
    return {
      status: 0,
      message: 'No response from server',
      details: 'Check if backend is running on http://localhost:8000',
    };
  } else {
    return {
      status: 0,
      message: error.message,
      details: '',
    };
  }
};

export default api;