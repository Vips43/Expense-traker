function Multichart({ expense }) {
  const labels = ["Jan", "Feb", "Mar", "Apr", "May"]; // Example generated array

  const chartJsData = {
    labels,
    datasets: [
      {
        label: "Earnings",
        data: labels.map((m) => getMonthlyValue(m, "earning")),
        borderColor: "rgb(16, 185, 129)", // Emerald Green Line
        backgroundColor: "rgba(16, 185, 129, 0.5)",
      },
      {
        label: "Expenses",
        data: labels.map((m) => getMonthlyValue(m, "expense")),
        borderColor: "rgb(239, 68, 68)", // Red Line
        backgroundColor: "rgba(239, 68, 68, 0.5)",
      },
    ],
  };
  
  return <div></div>;
}

export default Multichart;
