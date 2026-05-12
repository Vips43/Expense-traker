import { create } from "zustand";

export const useMyStore = create((set, get) => ({
  toggle: {},

  setToggle: (key) => {
    set((state) => ({
      toggle: { ...state.toggle, [key]: !state.toggle[key] },
    }));
  },
}));
