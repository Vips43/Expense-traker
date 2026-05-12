import { Button } from "flowbite-react";
import { useAuthStore } from "../store/authStore";
import Expenses from "../component/Expenses";
import { HiPlus } from "react-icons/hi";
import { useExpStore } from "../store/expenseStore";
import { useEffect } from "react";
import { useMyStore } from "../store/store";
import AddExp from "./AddExp";

function Home() {
  const user = useAuthStore((state) => state.user);
  const {
    expense = [],
    getExpense,
    removeExpense,
    loading,
    err,
  } = useExpStore();
  const { toggle, setToggle } = useMyStore();
  const exp = user?.expenseReport;

  useEffect(() => {
    const data = async () => await getExpense();
    data();
  }, []);

  const totalSpent = exp?.items?.reduce((acc, curr) => {
    return acc + (curr.amount || 0);
  }, 0);
  const currentBalance = (exp?.totalPocket || 0) - totalSpent;
  console.log(expense);
  return (
    <div className="h-full">
      <div className="w-full flex items-center justify-between">
        <Button type="button" onClick={() => setToggle(`expense`)}>
          Add Expenses
        </Button>
        <Button type="button" onClick={() => setToggle("earning")}>
          Add Earning
        </Button>
      </div>
      {toggle.expense && <AddExp label={`expense`} />}
      {toggle.earning && <AddExp label={`earning`} />}
      <section>
        <div className="">
          <h3 className="text-center text-2xl font-bold capitalize">
            Hello, {user?.name}
          </h3>
          <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl flex flex-col items-center justify-center my-6 border border-gray-800">
            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">
              Current Balance
            </span>
            <h3 className="text-6xl font-bold mt-2 tracking-tighter">
              ₹{currentBalance || 0}
            </h3>
            {exp && (
              <div className="mt-6 px-4 py-2 bg-gray-800 rounded-full flex items-center gap-2 border border-gray-700">
                <span className="text-xs text-gray-400">Total: </span>
                <span className="text-xs font-bold text-green-400 capitalize">
                  {exp?.totalPocket}
                </span>
                |<span className="text-xs text-gray-400">Source: </span>
                <span className="text-xs font-bold text-green-400 capitalize">
                  {exp?.mainSource}
                </span>
              </div>
            )}
          </div>
          <div className="mt-8">
            <h4 className="text-xl font-semibold mb-4">Transaction History</h4>

            {/* Header for the list (Optional but recommended for clarity) */}
            {expense.length > 0 && (
              <div className="grid grid-cols-12 gap-2 p-2 text-xs font-bold uppercase text-gray-500 border-b border-gray-800">
                <span className="col-span-1">#</span>
                <span className="col-span-4">Description</span>
                <span className="col-span-2">Type</span>
                <span className="col-span-3 text-right">Amount</span>
                <span className="col-span-2 text-right">Action</span>
              </div>
            )}

            <div className="overflow-y-auto max-h-[400px] scrollbar-hide">
              {loading ? (
                "loading..."
              ) : expense.length > 0 ? (
                expense.map((ex, i) => (
                  <div
                    key={ex._id || i}
                    className="grid grid-cols-12 gap-2 items-center border-b border-slate-800 p-3 hover:bg-slate-900/50 transition-colors"
                  >
                    {/* Index */}
                    <span className="col-span-1 text-gray-500 text-sm">
                      {i + 1}
                    </span>

                    {/* Name */}
                    <span className="col-span-4 capitalize font-medium truncate">
                      {ex.name}
                    </span>

                    {/* Type Badge */}
                    <span className="col-span-2">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border ${
                          ex.type === "expense"
                            ? "text-red-400 border-red-900 bg-red-900/20"
                            : "text-emerald-400 border-emerald-900 bg-emerald-900/20"
                        }`}
                      >
                        {ex.type}
                      </span>
                    </span>

                    {/* Amount */}
                    <span
                      className={`col-span-3 text-right font-bold ${
                        ex.type === "expense"
                          ? "text-red-500"
                          : "text-emerald-500"
                      }`}
                    >
                      {ex.type === "expense" ? "-" : "+"}₹{ex.amount}
                    </span>

                    {/* Remove Action */}
                    <div className="col-span-2 text-right">
                      <button
                        onClick={() => removeExpense(ex._id, ex.type)}
                        className="text-xs text-gray-500 hover:text-red-500 transition-colors underline underline-offset-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 border-2 border-dashed border-slate-800 rounded-xl mt-4">
                  <p className="text-gray-500">No transactions found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
