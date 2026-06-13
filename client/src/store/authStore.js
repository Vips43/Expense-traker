import { create } from "zustand";

const BASE_URL = `/api`;
const loggedUser = JSON.parse(localStorage.getItem("user"));

export const useAuthStore = create((set, get) => ({
  user: loggedUser || null,
  err: null,
  loading: false,
  msg: null,
  me: null,
  isAuthenticated: !!loggedUser,

  register: async (creds) => {
    set({ loading: true });
    try {
      const res = await fetch(BASE_URL + "/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      });
      const data = await res.json();
      set({ user: data, loading: false, msg: "Register successful" });
    } catch (error) {
      console.error("registration failed", error);
      set({ loading: false, err: "internal server error" });
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
        date: data.user.date,
        msg: data.msg,
      };

      localStorage.setItem("user", JSON.stringify(user));
      set({ user: user, loading: false, isAuthenticated: true, err: null });
    } catch (error) {
      console.error("login failed", error.message);
      set({ loading: false, err: "Server error" });
    }
  },
  
  getUser: async () => {
    const token = get().user?.token;
    if (!token) return console.error("No token found");
    try {
      set({ loading: true });
      const user = await fetch(`${BASE_URL}/api/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await user.json();
      set({ me: data, loading: false });
    } catch (error) {
      set({ loading: false, msg: "Server error" });
    }
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, isAuthenticated: false });
  },
}));
