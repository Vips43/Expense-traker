import React from "react";
import { useMyStore } from "../store/store";
import Chartjs from "./Chartjs";
import { useExpStore } from "../store/expenseStore";
import { MdClose } from "react-icons/md";
import Multichart from "./charts/Multichart";

function Analytics() {
  const setToggle = useMyStore((state) => state.setToggle);
  const toggle = useMyStore((state) => state.toggle);
  const { totalExp, totals, expense } = useExpStore();

  // console.log(totals, expense)
  return (
    <section
      className={`absolute inset-0 z-50 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 ${
        !toggle.analytics ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onClick={() => setToggle("analytics")}
    >
      <div
        className={`min-w-full min-h-full bg-slate-600 border-r border-slate-800 p-5 flex flex-col justify-between shadow-2xl transition-transform duration-300 ${
          !toggle.analytics ? "translate-x-full" : "translate-x-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-center mb-5 p-2">
            <h2 className="text-2xl font-semibold">Analytics</h2>
            <div
              className="ml-auto w-fit text-2xl outline rounded-full text-zinc-400"
              onClick={() => setToggle("analytics")}
            >
              <MdClose />
            </div>
          </div>
          <Chartjs
            totalEarning={totals.totalEarn}
            totalExpense={totals.totalSpent}
            expense={expense}
          />
          <Multichart expense={expense}/>
        </div>
      </div>
    </section>
  );
}

export default Analytics;
