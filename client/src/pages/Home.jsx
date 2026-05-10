import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Expenses from "../component/Expenses";
import { HiPlus } from "react-icons/hi";
import { useExpStore } from "../store/expenseStore";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { expense, getExpense, loading, err } = useExpStore();
  const exp = user?.expenseReport;

  useEffect(() => {
    const data = async () => await getExpense();
    data();
  }, []);

  const totalSpent = exp?.items?.reduce((acc, curr) => {
    return acc + (curr.amount || 0);
  }, 0);
  const currentBalance = (exp?.totalPocket || 0) - totalSpent;

  return (
    <div>
      <Button onClick={() => navigate(`/form`)}>Add Expenses</Button>

      <section>
        <div>
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
                <span className="text-xs text-gray-400">Total:</span>
                <span className="text-xs font-bold text-green-400 capitalize">
                  {exp?.totalPocket}
                </span>
                |<span className="text-xs text-gray-400">Source:</span>
                <span className="text-xs font-bold text-green-400 capitalize">
                  {exp?.mainSource}
                </span>
              </div>
            )}
          </div>
          <div>
            <h4 className="text-2xl font-semibold">Expense transactions</h4>
            <div className="overflow-auto scrollbar-hidden">
              <Expenses exp={exp?.items} />
            </div>
            {expense.map((ex, i) => (
              <p className="grid grid-cols-3 border-b border-gray-600">
                <span>
                  {i + 1} - {ex.name}
                </span>
                <span>{ex.type}</span>
                <span className="inline-block text-center">{ex.amount}</span>
              </p>
            ))}
            {/* )  (
            <p className="text-center my-10">There is no transactions yet</p> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
