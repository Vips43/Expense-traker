import { Select, TextInput } from "flowbite-react";
import { HiTrash } from "react-icons/hi";

function AddExpenses() {
  return (
    <form action="">
      <div className="h-72 overflow-y-auto pr-2 flex flex-col gap-3 scrollbar-hide">
        {expenses.length === 0 ? (
          <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-700 rounded-2xl text-slate-500">
            No expenses added yet
          </div>
        ) : (
          expenses.map((expense, index) => (
            <div
              key={expense.id}
              className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 flex flex-col gap-3 relative group"
            >
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-5">
                  <TextInput
                    name={`item_${index}`}
                    placeholder="Item"
                    sizing="sm"
                  />
                </div>
                <div className="col-span-4">
                  <Select name={`src_${index}`} sizing="sm" required>
                    <option value="" disabled selected>
                      Source
                    </option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </Select>
                </div>
                <div className="col-span-3">
                  <TextInput
                    name={`amt_${index}`}
                    placeholder="Amount"
                    type="number"
                    sizing="sm"
                  />
                </div>
              </div>

              {/* Delete button positioned to the side */}
              <button
                type="button"
                onClick={() => handleRemove(expense.id)}
                className="absolute -right-2 -top-2 bg-red-500 p-1.5 rounded-full text-white hover:bg-red-600 transition-colors shadow-lg opacity-0 group-hover:opacity-100"
              >
                <HiTrash size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </form>
  );
}

export default AddExpenses;
