import { useAuthStore } from "../store/authStore";
import { useMyStore } from "../store/store";
import AddExp from "./AddExp";
import { ToggleButtons } from "../component/ToggleButtons";
import { useTotals } from "../hooks/useExpense";
import { Card } from "flowbite-react";
import TransactionHistory from "../component/home/TransactonHistory";

function Home() {
  const user = useAuthStore((state) => state.user);
  const { toggle, setToggle } = useMyStore();
  const {
    data: totals,
    isPending: totalsPending,
    error: totalsError,
  } = useTotals();

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden gap-3 pb-2">
      {/* Top action buttons & forms */}
      <div className="shrink-0">
        <ToggleButtons setToggle={setToggle} />
        {toggle.expense && <AddExp label="expense" />}
        {toggle.earning && <AddExp label="earning" />}
      </div>

      {/* Summary Cards */}
      <div className="shrink-0 w-full max-w-xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <Card
            className="bg-gray-900 border-gray-800"
            theme={{ root: { children: "p-4" } }}
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Total Expense
            </p>
            {totalsPending ? (
              <div className="h-7 w-24 bg-gray-800 animate-pulse rounded mt-1" />
            ) : (
              <h3 className="text-xl font-bold text-red-400 tracking-tight mt-1">
                {totalsError ? "?????" : `₹${totals?.totalSpent || 0}`}
              </h3>
            )}
          </Card>

          <Card
            className="bg-gray-900 border-gray-800"
            theme={{ root: { children: "p-4 text-right" } }}
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Total Earning
            </p>
            {totalsPending ? (
              <div className="h-7 w-24 bg-gray-800 animate-pulse rounded mt-1 ml-auto" />
            ) : (
              <h3 className="text-xl font-bold text-green-400 tracking-tight mt-1">
                {totalsError ? "?????" : `₹${totals?.totalEarn || 0}`}
              </h3>
            )}
          </Card>
        </div>
      </div>

      {/* Transaction Section: fills all remaining space */}
      <section className="flex-1 min-h-0 overflow-hidden">
        <TransactionHistory />
      </section>
    </div>
  );
}

export default Home;
