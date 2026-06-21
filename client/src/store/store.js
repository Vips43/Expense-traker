import { create } from "zustand";
import { useAuthStore } from "./authStore";

export const useMyStore = create((set, get) => ({
  toggle: {},
  alert: "",
  report: { expense: [], earning: [] },

  setToggle: (key) => {
    set((state) => ({
      toggle: { ...state.toggle, [key]: !state.toggle[key] },
    }));
  },

  setAlert: (msg) => set({ alert: msg }),
  getReports: async () => {
    const token = useAuthStore.getState().user?.token;
    try {
      const res = await fetch(`/api/reports`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      const expense = data.filter((d) => d.type === "expense");
      const earning = data.filter((d) => d.type === "earning");
      set({ loading: false, report: { expense, earning } });
      return { expense, earning };
    } catch (error) {
      set({ loading: false });
    }
  },
}));
