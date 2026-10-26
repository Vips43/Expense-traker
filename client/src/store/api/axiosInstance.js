import axios from "axios";
import { useAuthStore } from "../authStore";
import { useMyStore } from "../store";

const isNative = window.Capacitor?.isNativePlatform() || false;
const url = isNative ? "https://expense-traker-neon.vercel.app" : "/api";

const api = axios.create({
  baseURL: url,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

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
