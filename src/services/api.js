

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const contentAPI = {
  list: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.type) params.append('type', filters.type);
    if (filters.status) params.append('status', filters.status);
    return api.get(`/content/?${params}`);
  },

  get: (id) => api.get(`/content/${id}/`),

  create: (data) => {
    return api.post('/content/', data);
  },

  update: (id, data) => api.put(`/content/${id}/`, data),

  delete: (id) => api.delete(`/content/${id}/`),

  getStats: () => api.get('/content/stats/'),
};



export const chunkAPI = {
  list: (contentId = null) => {
    const params = contentId ? `?content_id=${contentId}` : '';
    return api.get(`/chunks/${params}`);
  },

  get: (id) => api.get(`/chunks/${id}/`),
};



export const queryAPI = {
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

  getLogs: (limit = 20, offset = 0) => {
    return api.get(`/query/logs/?limit=${limit}&offset=${offset}`);
  },

  getLog: (id) => api.get(`/query/logs/${id}/`),
};



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