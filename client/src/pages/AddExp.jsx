import { useId } from "react";
import { HiPlus, HiArrowLeft } from "react-icons/hi";
import { useExpStore } from "../store/expenseStore";

function AddExp() {
  const id = useId();
  const { setExpense, loading, err } = useExpStore();
  const typeArr = ["Food", "Bills", "Entertainment", "Transport", "Other"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const expData = Object.fromEntries(formData);

    console.log(expData);
    await setExpense(expData);
  };

  return (
    <section className="fixed inset-0 w-full h-dvh grid place-items-center bg-black/70">
      <form
        className="flex flex-col max-w-md w-full gap-3 p-5 rounded-3xl mx-auto bg-slate-900 text-slate-100 shadow-2xl border border-slate-700"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between border-b border-slate-700 pb-2">
          <button
            type="button"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <HiArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-semibold">New Expense</h2>
          <div className="w-6" /> {/* Spacer */}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label htmlFor={id + "-name"} className={"form-label"}>
              Expense Name
            </label>
            <input
              type="text"
              id={id + "-name"}
              name="name"
              className={"form-input"}
              placeholder="e.g. Grocery Shopping"
            />
          </div>

          <div>
            <label htmlFor={id + "-type"} className={"form-label"}>
              Type
            </label>
            <select name="type" id={id + "-type"} className={"form-input"}>
              {typeArr.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={id + "-amt"} className={"form-label"}>
              Amount
            </label>
            <input
              type="number"
              id={id + "-amt"}
              name="amount"
              className={"form-input"}
              placeholder="0.00"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-900/20"
        >
          <HiPlus /> {loading ? "Adding Expense..." : "Add Expense"}
        </button>
      </form>
    </section>
  );
}

export default AddExp;
