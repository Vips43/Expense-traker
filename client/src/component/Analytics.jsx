import React from "react";
import { useMyStore } from "../store/store";

function Analytics() {
  const setToggle = useMyStore((state) => state.setToggle);
  const toggle = useMyStore((state) => state.toggle);

  return (
    <section
      className={`absolute top-0 right-0 z-50 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 ${
        !toggle.analytics ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onClick={() => setToggle("analytics")}
    >
      <div
        className={`w-72 h-full bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between shadow-2xl transition-transform duration-300 ${
          !toggle.analytics ? "translate-x-full" : "translate-x-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
      </div>
    </section>
  );
}

export default Analytics;
