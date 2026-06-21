import { useId } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useExpStore } from "../store/expenseStore";
import { useMyStore } from "../store/store";
import toast from "react-hot-toast";

function AddExp({ label }) {
  const id = useId();

  const { setExpense, addEarning, loading, err, success } = useExpStore();
  const { setToggle } = useMyStore();
  const typeArr = ["Food", "Bills", "Entertainment", "Transport", "Other"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const expData = Object.fromEntries(formData);

    try {
      if (label === "expense") {
        await setExpense(expData);
      } else if (label === "earning") {
        await addEarning(expData);
      } else {
        throw new Error("Invalid transaction type");
      }
      e.target.reset();
      toast.success("Sucessfully added");
      setToggle(label);
    } catch (error) {
      toast.error(err || error.msg || "Server error");
      setToggle(label);
    }
  };
  err && console.log(err);
  return (
    <section className="fixed inset-0 w-full h-dvh grid bg-black/70 place-items-center z-50">
      <form
        className="flex flex-col max-w-md w-full gap-3 p-5 rounded-3xl mx-auto bg-slate-900 text-slate-100 shadow-2xl border border-slate-700"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between border-b border-slate-700 pb-2">
          <button
            type="button"
            className="text-slate-400 hover:text-white cursor-pointer transition-colors"
            onClick={() => setToggle(label)}
          >
            <HiArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-semibold">Add {label}</h2>
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

          {label === "expense" && (
            <div>
              <label htmlFor={id + "-cat"} className={"form-label"}>
                Category
              </label>
              <select name="category" id={id + "-cat"} className={"form-input"}>
                {typeArr.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          )}
          {label === "earning" && (
            <div>
              <label htmlFor={id + "-cat"} className="form-label">
                Category
              </label>
              <input
                type="text"
                name="category"
                id={id + "-cat"}
                className="form-input"
              />
            </div>
          )}

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
          <div className="flex items-center gap-4 text-sm text-gray-400 font-semibold">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="mode"
                id={id + "-online"}
                value="online"
              />
              <label htmlFor={id + "-online"} className="cursor-pointer">
                Online
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="mode"
                id={id + "-offline"}
                value="offline"
                defaultChecked
              />
              <label htmlFor={id + "-offline"} className="cursor-pointer">
                Offline
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
          disabled={loading}
        >
          {loading
            ? `Adding ${label}...`
            : success
              ? "Expense Added"
              : `Add ${label}`}
        </button>
      </form>
    </section>
  );
}

export default AddExp;
