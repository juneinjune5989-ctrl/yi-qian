import axios, { type AxiosInstance, type AxiosError } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL || ''}/api`,
  timeout: 120000,
});

instance.interceptors.request.use((config) => {
  config.headers['original-url'] = window.location.href;
  const token = new URLSearchParams(window.location.search).get('token') ?? '';
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ redirectUrl?: string }>) => {
    if (error.response?.status === 401) {
      const redirectUrl = error.response.data?.redirectUrl;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
