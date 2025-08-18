import axios from 'axios';

const VITE_NODE_BASE_URL = import.meta.env.VITE_NODE_BASE_URL;
const VITE_NODE_API_URL = import.meta.env.VITE_NODE_API_URL;

const addAuthToken = (config) => {
  const token = sessionStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

const api = axios.create({
  baseURL: VITE_NODE_API_URL,
  withCredentials: true,
});
api.interceptors.request.use(addAuthToken);

// Use an interceptor to dynamically set the Authorization header
export const authApi = axios.create({
  baseURL: VITE_NODE_BASE_URL,
  withCredentials: true,
});
authApi.interceptors.request.use(addAuthToken);

export const apiRequest = async (endpoint, method, payload) => {
  try {
    const response = await api({
      url: endpoint,
      method: method,
      data: payload,
    });
    return { data: response.data, status: response.status, headers: response.headers };
  } catch (error) {
    // It's better to handle the error where you call apiRequest
    throw error;
  }
};