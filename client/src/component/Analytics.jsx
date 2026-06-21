import React, { useEffect } from "react";
import { useMyStore } from "../store/store";
import Chartjs from "./Chartjs";
import { useExpStore } from "../store/expenseStore";
import { MdClose } from "react-icons/md";
import Multichart from "./charts/Multichart";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

function Analytics() {
  const [state, setState] = useState({
    link: "",
    name: "",
    downloaded: false,
    generating: false,
    generated: false,
  });

  const user = useAuthStore((state) => state.user);
  const token = user?.token;
  const setToggle = useMyStore((state) => state.setToggle);
  const toggle = useMyStore((state) => state.toggle);
  const { chartData, charts } = useExpStore();

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

  const handleGen = async () => {
    try {
      setState({
        link: "",
        downloaded: false,
        generating: true,
        generated: false,
      });
      const res = await fetch(`/api/reports`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const disposition = res.headers.get("content-disposition");
      if (disposition && disposition.includes("filename=")) {
        const filename = disposition
          .split("filename=")[1]
          .split(";")[0]
          .replace(/['"]/g, "");
        console.log(filename);
        setState((prev) => ({ ...prev, name: filename }));
      }
      // let filename=`Report-${Date.now()}.xlsx`
      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      setState((prev) => ({
        ...prev,
        link: url,
        generating: false,
        generated: true,
      }));
      console.log(url);
    } catch (error) {
      setState({
        link: "",
        downloaded: false,
        generating: false,
        generated: false,
      });
      console.error("server error", error);
    }

    toast.success("report generated");
  };

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
              className="ml-auto w-fit text-2xl outline rounded-full text-zinc-50"
              onClick={() => setToggle("analytics")}
            >
              <MdClose />
            </div>
          </div>
          <div className="my-2 w-full p-2 bg-slate-700">
            <button
              className="outline w-full my-1 px-3 py-2 text-lg rounded-md leading-none"
              onClick={handleGen}
            >
              {state.generating
                ? "Generating..."
                : state.generated
                  ? "Report Generated 🧾"
                  : "Generate Report"}
            </button>
            {state?.link && !state?.downloaded && (
              <a
                href={state?.link}
                download={state.name}
                className="mx-auto px-2 py-1 my-2 block w-fit bg-blue-600 text-white rounded "
                onClick={() => setState((p) => ({ ...p, downloaded: true }))}
              >
                Download
              </a>
            )}
            {state?.downloaded && (
              <p className="w-fit mx-auto outline px-2 py-0.5 rounded bg-gray-200 mb-2 text-black ">
                Downloaded report ✔
              </p>
            )}
          </div>
          {/* charts */}
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
