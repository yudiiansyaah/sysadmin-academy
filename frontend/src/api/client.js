import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// Courses API
export const courseAPI = {
  getCourses: (skip = 0, limit = 10) =>
    api.get(`/v1/courses?skip=${skip}&limit=${limit}`),
  
  getCourse: (id) =>
    api.get(`/v1/courses/${id}`),
  
  createCourse: (data) =>
    api.post('/v1/courses', data),
}

// Auth API
export const authAPI = {
  login: (username, password) =>
    api.post('/v1/auth/login', { username, password }),
  
  register: (data) =>
    api.post('/v1/auth/register', data),
}

export default api
