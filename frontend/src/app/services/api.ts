import axios from "axios";

export const API_URL = "http://localhost:9999/api";

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  console.error('Response error:', {
    url: error.config?.url,
    status: error.response?.status,
    data: error.response?.data
  });

  return Promise.reject(error);
});
