import { useAuthStore } from "../store/authStore";
import { useMyStore } from "../store/store";
import AddExp from "./AddExp";
import { ToggleButtons } from "../component/ToggleButtons";
import TransactonHistory from "../component/home/TransactonHistory";
import { useTotals } from "../hooks/useExpense";

function Home() {
  const user = useAuthStore((state) => state.user);
  const { toggle, setToggle } = useMyStore();

  const {
    data: totals,
    isPending: totalsPending,
    error: totalsError,
  } = useTotals();


  return (
    <div className="flex flex-col h-full overflow-hidden gap-4">
      <div className="shrink-0">
        <ToggleButtons setToggle={setToggle} />
        {toggle.expense && <AddExp label={`expense`} />}
        {toggle.earning && <AddExp label={`earning`} />}
      </div>

      <section className="flex flex-col flex-1 min-h-0">
        <div className="shrink-0">
          <h3 className="text-center text-mist-400 text-2xl font-bold capitalize"></h3>
          <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-xl grid grid-cols-2 mt-2 border border-gray-800">
            <div className="ml-auto order-2">
              <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                Total Earning
              </span>
              {totalsPending ? (
                <h3 className="skeleton-h3"></h3>
              ) : (
                <h3 className="text-green-400 text-3xl font-bold mt-1 tracking-tighter">
                  {totalsError ? "?????" : `₹${totals?.totalEarn || 0}`}
                </h3>
              )}
            </div>
            <div className="mr-auto order-1">
              <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                Total Expense
              </span>
              {totalsPending ? (
                <h3 className="skeleton-h3"></h3>
              ) : (
                <h3 className="text-green-400 text-3xl font-bold mt-1 tracking-tighter">
                  {totalsError ? "?????" : `₹${totals?.totalSpent || 0}`}
                </h3>
              )}
            </div>
          </div>
        </div>

        {/* Bounded Transaction Section */}
        <TransactonHistory />
      </section>
    </div>
  );
}

export default Home;
