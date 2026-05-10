function Expenses({ exp }) {
  
  return (
    <div className="space-y-3 mt-4">
      {exp?.map((e, i) => {
        const accentColor =
          e?.source === "online"
            ? "border-amber-600/50 bg-amber-950/20"
            : "border-emerald-600/50 bg-emerald-950/20";
        const iconColor =
          e?.source === "online" ? "text-amber-500" : "text-emerald-500";

        return (
          <div
            key={i}
            className={`flex items-center justify-between p-4 rounded-2xl border ${accentColor} transition-all active:scale-[0.98]`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center bg-gray-900 border border-gray-800 ${iconColor}`}
              >
                {e?.source === "online" ? "🌐" : "💵"}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-100 capitalize">
                  {e?.item}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {e?.source}
                </span>
              </div>
            </div>
            <span className="text-lg font-bold">- ₹{e?.amount}</span>
          </div>
        );
      })}
    </div>
  );
}
export default Expenses;
