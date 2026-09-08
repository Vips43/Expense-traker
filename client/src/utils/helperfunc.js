export function dateFormatter(value) {
  const fullDate = new Date(value);
  const time = fullDate.toLocaleTimeString();
  const date = fullDate.toLocaleDateString();
  return { date, time } || "N/A";
}
