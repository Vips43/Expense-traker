import { create } from "zustand";

const BASE_URL = `/api`;
const loggedUser = JSON.parse(localStorage.getItem("user"));

export const useAuthStore = create((set, get) => ({
  // 1. State
  user: loggedUser || null, // Start as null to easily check if logged in
  err: null,
  loading: false,
  isAuthenticated: !!loggedUser,

  register: async (creds) => {
    console.log(creds);
    set({ loading: true });
    try {
      const res = await fetch(BASE_URL + "/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      });
      const data = await res.json();
      // console.log(data);
      set({ user: data, loading: false });
    } catch (error) {
      console.error("registration failed", error);
      set({ loading: false, err: error });
    }
  },

  login: async (creds) => {
    set({ loading: true, err: null });
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      });
      const data = await res.json();

      const user = {
        name: data.user.name,
        email: data.user.email,
        token: data.token,
      };
      // console.log(data);
      localStorage.setItem("user", JSON.stringify(user));
      set({ user: user, loading: false, isAuthenticated: true, err: null });
    } catch (error) {
      console.error("login failed", error.message);
      set({ loading: false, err: "Server error" });
    }
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, isAuthenticated: false });
  },
}));
