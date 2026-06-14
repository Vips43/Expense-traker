import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  plugins,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Doughnut, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  plugins,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

function Multichart({ labels, values, lineChart }) {
  const apexOptions = { xaxis: { categories: labels } };
  const apexSeries = { name: "Expenses", data: values };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Amount (₹)",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const lineData = {
    labels: labels,
    datasets: [
      {
        label: "Amount",
        data: values,
        borderColor: "rgba(75,192,192,1",
        backgroundColor: "rgba(75,192,192,0.2",
        borderWidth: 2,
        color: "white",
        tension: 0.2,
        fill: true,
      },
    ],
  };
  const basePlugins = {
    legend: {
      position: "top",
      labels: { color: "#fff", font: { size: 14 } },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.label}: ₹${context.raw}`;
        },
      },
    },
  };
  const lineOptions = {
    responsive: true,
    plugins: basePlugins,
    scales: {
      x: {
        ticks: { color: "#fff", font: { size: 12 } },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
      y: {
        ticks: { color: "#fff", font: { size: 12 } },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#fff", font: { size: 14 } },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw} Amount`;
          },
        },
      },
    },
  };

  return (
    <div className="outline outline-slate-400 my-5 rounded-2xl bg-slate-500 p-5 ">
      <div style={{ maxWidth: "350px", margin: "0 auto" }}>
        <h2 className="text-center text-2xl text-slate-200 mb-2 font-bold underline">
          Expense chart
        </h2>
        <Doughnut data={data} options={pieOptions} />
      </div>
      <div>
        <h2 className="text-center text-2xl text-slate-200 mb-2 font-bold underline">
          Line chart
        </h2>
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
}

export default Multichart;
