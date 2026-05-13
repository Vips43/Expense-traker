import { create } from "zustand";
import { useAuthStore } from "./authStore";

export const useExpStore = create((set, get) => ({
  expense: [],
  totals: [],
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
      if (res.ok) {
        get().totalExp();
        get().getExpense();
      }
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
  addEarning: async (earning) => {
    const token = useAuthStore.getState().user?.token;
    if (!token) return console.error("No token found");
    try {
      const res = await fetch(`/api/earning`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(earning),
      });
      if (res.ok) {
        get().totalExp();
        get().getExpense();
      }
      const data = await res.json();

      set({ expense: data, loading: false, err: null });
    } catch (error) {
      console.error(error);
      set({ loading: false, err: error });
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
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const data = await res.json();

      set({ totals: data, loading: false, err: null });
    } catch (error) {
      console.error(error);
      set({ loading: false, err: error });
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
      console.log("deleted ", data);
      const updatedExpenses = expense.filter((item) => item._id !== id);

      set({ expense: updatedExpenses, loading: false, err: null });
    } catch (error) {
      set({ loading: false, err: error });
    }
  },
}));
