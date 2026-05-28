import React, { useState, useEffect } from "react";
import { useExpStore } from "../../store/expenseStore";
import Filter from "../Filter";

function TransactionHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { expense, removeExpense, loading, getExpense } = useExpStore();

  const allTransactions = expense?.allTransactions || [];
  const totalItems = expense?.totalItems || 0;
  const totalPages = expense?.totalPages || 1;

  useEffect(() => {
    if (getExpense) {
      getExpense(currentPage, itemsPerPage);
    }
  }, [currentPage, getExpense]);

  const handleRemoveTxns = (id, type) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      removeExpense(id, type);
    }
  };

  const getRowIndex = (index) => (currentPage - 1) * itemsPerPage + index + 1;

  console.log(expense)
  return (
    <section className="flex flex-col h-full">
      <div className="flex flex-col flex-1 min-h-0 mt-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-2 shrink-0">
          <h4 className="text-xl text-mist-300 font-semibold">
            Transaction History
          </h4>
          <Filter />
        </div>

        {totalItems > 0 && (
          <div className="grid grid-cols-12 gap-2 p-2 text-xs font-bold uppercase text-gray-500 border-b border-gray-800 shrink-0 bg-slate-950">
            <span className="col-span-1">#</span>
            <span className="col-span-4">Description</span>
            <span className="col-span-2">Type</span>
            <span className="col-span-3 text-right">Amount</span>
            <span className="col-span-2 text-right">Action</span>
          </div>
        )}

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 min-h-0 pr-1 current-scrollbar">
          {loading ? (
            <p className="text-center mt-10 text-gray-400">Loading...</p>
          ) : totalItems > 0 ? (
            allTransactions.map((ex, i) => (
              <div
                key={ex._id || i}
                className="grid grid-cols-12 gap-2 items-center border-b border-slate-800 p-3 hover:bg-slate-900/50 transition-colors"
              >
                <span className="col-span-1 text-gray-500 text-sm">
                  {getRowIndex(i)}
                </span>
                <span className="text-mist-400 col-span-4 capitalize font-medium truncate">
                  {ex.name}
                </span>
                <span className="col-span-2">
                  <span
                    className={`text-[10px] px-2 pb-0.5 rounded-full border ${
                      ex.type === "expense"
                        ? "text-red-400 border-red-900 bg-red-900/20"
                        : "text-emerald-400 border-emerald-900 bg-emerald-900/20"
                    }`}
                  >
                    {ex.type}
                  </span>
                </span>
                <span
                  className={`col-span-3 text-right font-bold ${
                    ex.type === "expense" ? "text-red-500" : "text-emerald-500"
                  }`}
                >
                  {ex.type === "expense" ? "-" : "+"}₹{ex.amount}
                </span>
                <div className="col-span-2 text-right">
                  <button
                    onClick={() => handleRemoveTxns(ex._id, ex.type)}
                    className="text-xs text-gray-500 hover:text-red-500 transition-colors underline underline-offset-4"
                  >
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

        {/* Pagination Toolbar */}
        {totalItems > 0 && totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-slate-800 bg-slate-950/50 text-sm mt-auto shrink-0">
            <span className="text-gray-400">
              Showing page{" "}
              <strong className="text-slate-200">{currentPage}</strong> of{" "}
              <strong className="text-slate-200">{totalPages}</strong>
            </span>
            <div className="inline-flex gap-2">
              <button
                disabled={currentPage === 1 || loading}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 transition-all text-xs font-semibold"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages || loading}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 transition-all text-xs font-semibold"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>


    </section>
  );
}

export default TransactionHistory;
