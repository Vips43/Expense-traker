import React, { useEffect } from "react";
import { useMyStore } from "../store/store";
import Chartjs from "./Chartjs";
import { useExpStore } from "../store/expenseStore";
import { MdClose } from "react-icons/md";
import Multichart from "./charts/Multichart";

function Analytics() {
  const setToggle = useMyStore((state) => state.setToggle);
  const toggle = useMyStore((state) => state.toggle);
  const { totalExp, expense, totals, chartData, charts } = useExpStore();

  useEffect(() => {
    chartData();
  }, []);
  const categories = charts?.data?.categories || [];
  const labels = categories.map((c) => c._id ?? []);
  const values = categories.map((c) => c.totalSpent ?? []);

  const lineChart = categories.map((c) => ({
    name: c._d,
    amount: c.totalSpent,
  }));
  return (
    <section
      className={`absolute inset-0 z-50 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 ${
        !toggle.analytics ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onClick={() => setToggle("analytics")}
    >
      <div
        className={`w-full h-full bg-slate-600 overflow-hidden p-5 flex flex-col justify-between shadow-2xl transition-transform duration-300 ${
          !toggle.analytics ? "translate-x-full" : "translate-x-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full shrink-0">
          <div className="flex items-center mb-5 p-2">
            <h2 className="text-2xl font-semibold">Analytics</h2>

            <div
              className="ml-auto w-fit text-2xl outline rounded-full text-zinc-400"
              onClick={() => setToggle("analytics")}
            >
              <MdClose />
            </div>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hidden">
            <Chartjs values={values} labels={labels} />
            <Multichart labels={labels} values={values} lineChart={lineChart} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Analytics;
