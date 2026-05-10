import { create } from "zustand";

export const useMyStore = create((set, get) => ({
  toggle: {},
  alert: "",

  setToggle: (key) => {
    set((state) => ({
      toggle: { ...state.toggle, [key]: !state.toggle[key] },
    }));
  },

  setAlert: (msg) => set({ alert: msg }),
}));
