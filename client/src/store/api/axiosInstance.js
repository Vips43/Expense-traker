import axios from "axios";
import { useAuthStore } from "../authStore";
import { useMyStore } from "../store";

const api = axios.create({
  baseURL: "/api",
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
