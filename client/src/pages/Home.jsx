import { useAuthStore } from "../store/authStore";
import { useExpStore } from "../store/expenseStore";
import { useEffect } from "react";
import { useMyStore } from "../store/store";
import AddExp from "./AddExp";
import { ToggleButtons } from "../component/ToggleButtons";
import Filter from "../component/Filter";

function Home() {
  const user = useAuthStore((state) => state.user);
  const token = user?.token;
  const { toggle, setToggle } = useMyStore();
  const {
    expense = [],
    getExpense,
    removeExpense,
    loading,
    totalExp,
    totals,
  } = useExpStore();

  useEffect(() => {
    if (token) totalExp();
  }, [token, user, totalExp]);
  useEffect(() => {
    if (token) getExpense();
  }, [token]);

  return (
    // Take exactly 100% of the parent <main> height
    <div className="flex flex-col h-full max-h-full overflow-hidden gap-4">
      <div className="shrink-0">
        <ToggleButtons setToggle={setToggle} />
        {toggle.expense && <AddExp label={`expense`} />}
        {toggle.earning && <AddExp label={`earning`} />}
      </div>
      
      <section className="flex flex-col flex-1 min-h-0">
        <div className="shrink-0">
          <h3 className="text-center text-mist-400 text-2xl font-bold capitalize">
            Hello, {user?.name}
          </h3>
          <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-xl grid grid-cols-2 mt-2 border border-gray-800">
            <div className="ml-auto order-2">
              <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                Total Earning
              </span>
              <h3 className="text-green-400 text-3xl font-bold mt-1 tracking-tighter">
                ₹{totals?.totalEarn || 0}
              </h3>
            </div>
            <div className="mr-auto order-1">
              <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                Total Expense
              </span>
              <h3 className="text-3xl text-red-400 font-bold mt-1 tracking-tighter">
                ₹{totals?.totalSpent || 0}
              </h3>
            </div>
          </div>
        </div>

        {/* Bounded Transaction Section */}
        <div className="flex flex-col flex-1 min-h-0 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-2 shrink-0">
            <h4 className="text-xl text-mist-300 font-semibold">
              Transaction History
            </h4>
            <Filter />
          </div>

          {expense.length > 0 && (
            <div className="grid grid-cols-12 gap-2 p-2 text-xs font-bold uppercase text-gray-500 border-b border-gray-800 shrink-0 bg-slate-950">
              <span className="col-span-1">#</span>
              <span className="col-span-4">Description</span>
              <span className="col-span-2">Type</span>
              <span className="col-span-3 text-right">Amount</span>
              <span className="col-span-2 text-right">Action</span>
            </div>
          )}

          {/* This element now exclusively handles all vertical overflow scrolling */}
          <div className="overflow-y-auto flex-1 min-h-0 pr-1 current-scrollbar">
            {loading ? (
              <p className="text-center mt-10 text-gray-400">Loading...</p>
            ) : expense.length > 0 ? (
              expense.map((ex, i) => (
                <div
                  key={ex._id || i}
                  className="grid grid-cols-12 gap-2 items-center border-b border-slate-800 p-3 hover:bg-slate-900/50 transition-colors"
                >
                  <span className="col-span-1 text-gray-500 text-sm">{i + 1}</span>
                  <span className="text-mist-400 col-span-4 capitalize font-medium truncate">{ex.name}</span>
                  <span className="col-span-2">
                    <span className={`text-[10px] px-2 pb-0.5 rounded-full border ${ex.type === "expense" ? "text-red-400 border-red-900 bg-red-900/20" : "text-emerald-400 border-emerald-900 bg-emerald-900/20"}`}>
                      {ex.type}
                    </span>
                  </span>
                  <span className={`col-span-3 text-right font-bold ${ex.type === "expense" ? "text-red-500" : "text-emerald-500"}`}>
                    {ex.type === "expense" ? "-" : "+"}₹{ex.amount}
                  </span>
                  <div className="col-span-2 text-right">
                    <button onClick={() => removeExpense(ex._id, ex.type)} className="text-xs text-gray-500 hover:text-red-500 transition-colors underline underline-offset-4">
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 border-2 border-dashed border-slate-800 rounded-xl mt-2">
                <p className="text-gray-500">No transactions found</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;