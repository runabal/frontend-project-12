import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1', 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const url = err.config?.url ?? '';
    if (status  === 401 && !url.includes('/login')) {
      localStorage.removeItem('token');
      window.location.assign('/login');
    }
    return Promise.reject(err);
  },
);

export default api;
