import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { useMyStore } from "./store";
import api from "./api/axiosInstance";

export const useExpStore = create((set, get) => ({
  expense: [],
  totals: [],
  loading: false,
  err: null,
  success: false,

  setExpense: async (exp) => {
    const token = useAuthStore.getState().user?.token;
    if (!token) return console.error("No token found");

    set({ loading: true, err: null, success: false });
    try {
      const res = await fetch(`/api/expense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(exp),
      });
      if (res.status === 401) {
        useMyStore.getState().setAlert("Token Expired! logging out");
        useAuthStore.getState().logout();
        return;
      }
      if (res.ok) {
        get().totalExp();
        get().getExpense();
      }
      // const data = await res.json();
      set({ loading: false, err: null, success: true });
      setTimeout(() => {
        set({ success: false });
      }, 1500);
    } catch (error) {
      console.error(error);
      set({ loading: false, err: "internal server error", success: false });
    }
  },
  getExpense: async () => {
    const token = useAuthStore.getState().user?.token;
    if (!token) return useMyStore.getState().setAlert("invalid token!");

    set({ loading: true, err: null });
    try {
      const res = await fetch(`/api/expense`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        useMyStore.getState().setAlert("Token Expired! logging out");
        useAuthStore.getState().logout();
        return;
      }
      const data = await res.json();

      set({ expense: data, loading: false, err: null });
    } catch (error) {
      console.error(error);
      set({ loading: false, err: "internal server error" });
      useMyStore.getState().setAlert("");
    }
  },
  addEarning: async (earning) => {
    const token = useAuthStore.getState().user?.token;
    if (!token) return console.error("No token found");
    try {
      set({ loading: true, err: null, success: false });
      const res = await fetch(`/api/earning`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(earning),
      });
      if (res.status === 401) {
        useMyStore.getState().setAlert("Token Expired! logging out");
        useAuthStore.getState().logout();
        return;
      }
      if (res.ok) {
        get().totalExp();
        get().getExpense();
      }
      const data = await res.json();

      set({ expense: data, loading: false, err: null, success: true });
      setTimeout(() => {
        set({ success: false });
      }, 1500);
    } catch (error) {
      set({ loading: false, err: "internal server error", success: false });
    }
  },
  totalExp: async () => {
    const token = useAuthStore.getState().user?.token;
    if (!token) return console.error("No token found");
    try {
      set({ loading: true, err: null });
      const res = await fetch(`/api/totalExp`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        useMyStore.getState().setAlert("Token Expired! logging out");
        useAuthStore.getState().logout();
        return;
      }
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const data = await res.json();

      set({ totals: data, loading: false, err: null });
    } catch (error) {
      set({ loading: false, err: "internal server error" });
    }
  },
  removeExpense: async (id, type) => {
    const token = useAuthStore.getState().user?.token;
    if (!token) return console.error("No token found");
    try {
      set({ loading: true, err: null });
      const res = await fetch(`/api/txn/${id}?type=${type}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        get().totalExp();
        get().getExpense();
      }
      const data = await res.json();
      const updatedExpenses = expense.filter((item) => item._id !== id);

      set({ expense: updatedExpenses, loading: false, err: null });
    } catch (error) {
      set({ loading: false, err: "internal server error" });
    }
  },
  filterExpense: async (query) => {
    const token = useAuthStore.getState().user?.token;
    if (!token) return console.error("No token found");
    try {
      set({ loading: true, err: null });
      const res = await fetch(`/api/filter/${query}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      set({ expense: data, loading: false, err: null });
    } catch (error) {
      set({ loading: false, err: "Failed to filter" });
    }
  },
}));
