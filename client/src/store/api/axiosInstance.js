import axios from "axios";
import { useAuthStore } from "../authStore";
import { useMyStore } from "../store";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      useMyStore.getState().setAlert("Token Expired! Logged out");
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);

export default api;
