import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8888';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add a request interceptor to include the token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

export const courseService = {
  getCourses: () => api.get('/courses'),
  getCourseById: (id) => api.get(`/courses/${id}`),
  enroll: (id) => api.post(`/courses/${id}/enroll`),
  unenroll: (id) => api.delete(`/courses/${id}/unenroll`),
};

export const lessonService = {
  getLessons: (courseId) => api.get(`/courses/${courseId}/lessons`),
  getLessonById: (courseId, lessonId) => api.get(`/courses/${courseId}/lessons/${lessonId}`),
};

export default api;
