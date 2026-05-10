import { create } from "zustand";
import { useAuthStore } from "./authStore";

export const useExpStore = create((set, get) => ({
  expense: [],
  loading: false,
  err: null,

  setExpense: async (exp) => {
    const token = useAuthStore.getState().user?.token;
    if (!token) return console.error("No token found");

    set({ loading: true, err: null });
    try {
      const res = await fetch(`/api/expense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(exp),
      });
      const data = await res.json();
      console.log(data);
      set({ loading: false, err: null });
    } catch (error) {
      console.error(error);
      set({ loading: false, err: error });
    }
  },
  getExpense: async () => {
    const token = useAuthStore.getState().user?.token;
    if (!token) return console.error("No token found");

    set({ loading: true, err: null });
    try {
      const res = await fetch(`/api/expense`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      set({ expense: data, loading: false, err: null });
    } catch (error) {
      console.error(error);
      set({ loading: false, err: error });
    }
  },
  removeExpense: async () => {},
}));
