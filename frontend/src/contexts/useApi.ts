
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.method === "post" || config.method === "put" || config.method === "patch") {
    config.headers["Content-Type"] ??= "application/json";
  }

  return config
});
