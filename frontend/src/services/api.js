import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://agriconnect-btyp.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to automatically add JWT token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth Endpoints
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  }
};

// Crops Endpoints
export const cropService = {
  getCrops: async (search = '') => {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    const response = await api.get(`/crops${query}`);
    return response.data;
  },
  getCropById: async (id) => {
    const response = await api.get(`/crops/${id}`);
    return response.data;
  },
  createCrop: async (cropData) => {
    const response = await api.post('/crops', cropData);
    return response.data;
  },
  updateCrop: async (id, cropData) => {
    const response = await api.put(`/crops/${id}`, cropData);
    return response.data;
  },
  deleteCrop: async (id) => {
    const response = await api.delete(`/crops/${id}`);
    return response.data;
  }
};

// Government Schemes Endpoints
export const schemeService = {
  getSchemes: async () => {
    const response = await api.get('/schemes');
    return response.data;
  },
  getSchemeById: async (id) => {
    const response = await api.get(`/schemes/${id}`);
    return response.data;
  },
  createScheme: async (schemeData) => {
    const response = await api.post('/schemes', schemeData);
    return response.data;
  },
  updateScheme: async (id, schemeData) => {
    const response = await api.put(`/schemes/${id}`, schemeData);
    return response.data;
  },
  deleteScheme: async (id) => {
    const response = await api.delete(`/schemes/${id}`);
    return response.data;
  }
};

// Agriculture Tips Endpoints
export const tipService = {
  getTips: async (category = '') => {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    const response = await api.get(`/tips${query}`);
    return response.data;
  },
  getTipById: async (id) => {
    const response = await api.get(`/tips/${id}`);
    return response.data;
  },
  createTip: async (tipData) => {
    const response = await api.post('/tips', tipData);
    return response.data;
  },
  updateTip: async (id, tipData) => {
    const response = await api.put(`/tips/${id}`, tipData);
    return response.data;
  },
  deleteTip: async (id) => {
    const response = await api.delete(`/tips/${id}`);
    return response.data;
  }
};

// Contact Form Endpoint
export const contactService = {
  submitContactMessage: async (contactData) => {
    const response = await api.post('/contact', contactData);
    return response.data;
  },
  getMessages: async () => {
    const response = await api.get('/contact');
    return response.data;
  }
};

export default api;
