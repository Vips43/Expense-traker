import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// 1. Register the Chart.js modules you need
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function Chartjs({ categories, totalEarning = 0, totalExpense = 0, expense }) {
  const keys = Object.keys(categories);
  const values = Object.values(categories);
  const data = {
    // labels: ["Total Earning", "Total Expense"],
    labels: keys,
    datasets: [
      {
        label: "Amount (₹)",
        // data: [totalEarning, totalExpense],
        data: values,
        backgroundColor: [
          "rgba(16, 185, 129, 0.2)", // Emerald-500
          "rgba(239, 68, 68, 0.2)", // Red-500
          "rgba(249, 115, 22, 0.2)", // Orange-500 (Distinct third color)
        ],
        borderColor: [
          "rgb(16, 185, 129)", // Emerald-500
          "rgb(239, 68, 68)", // Red-500
          "rgb(249, 115, 22)", // Orange-500
        ],
        borderWidth: 1,
        borderRadius: 6, // Rounded bars look modern
      },
    ],
  };

  // 3. Customize configurations (Axes, styling, grid lines)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hiding legend since labels make it clear
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(51, 65, 85, 0.2)", // Subtle slate grid lines
        },
        ticks: {
          color: "#94a3b8", // text-slate-400
          callback: (value) => `₹${value}`,
        },
      },
      x: {
        grid: {
          display: false, // Hide vertical lines for a cleaner look
        },
        ticks: {
          color: "#94a3b8",
        },
      },
    },
  };

  return (
    <div className="w-full h-64 bg-slate-950/40 border border-slate-800 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-slate-400 mb-4">
        Financial Overview
      </h3>
      <div className="h-48">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Chartjs;
