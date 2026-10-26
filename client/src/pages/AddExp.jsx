import { useId } from "react";
import {
  Drawer,
  Button,
  Label,
  TextInput,
  Select,
  Radio,
  Spinner,
  DrawerHeader,
  DrawerItems,
} from "flowbite-react";
import { useMyStore } from "../store/store";
import toast from "react-hot-toast";
import { useAddEarning, useAddExpense } from "../hooks/useExpense";

function AddExp({ label }) {
  const id = useId();
  const { setToggle } = useMyStore();

  const { mutateAsync: setExpense, isPending: expMutPending } = useAddExpense();
  const { mutateAsync: addEarning, isPending: earMutPending } = useAddEarning();

  const isLoading = label === "expense" ? expMutPending : earMutPending;
  const categories = ["Food", "Bills", "Entertainment", "Transport", "Other"];

  const handleClose = () => setToggle(label);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const expData = Object.fromEntries(formData);

    if (expData.amount) expData.amount = Number(expData.amount);

    try {
      expData.type = label;

      if (label === "expense") {
        await setExpense(expData);
      } else if (label === "earning") {
        await addEarning(expData);
      } else {
        throw new Error("Invalid transaction type");
      }

      e.target.reset();
      toast.success("Successfully added");
      handleClose();
    } catch (error) {
      const errMsg =
        error?.response?.data?.msg || error.message || "Server error";
      toast.error(errMsg);
      handleClose();
    }
  };

  return (
    <Drawer
      open={true}
      onClose={handleClose}
      position="bottom"
      className={`${label === "expense"?"bg-red-950":"bg-green-950"} border-t border-gray-300 p-4 rounded-t-2xl max-w-lg mx-auto shadow-2xl max-h-[90dvh] overflow-y-auto transition-all duration-1000`}
    >
      {/* Pull handle bar indicator */}
      <div className="mx-auto w-12 h-1.5 bg-gray-400 rounded-full mb-3 cursor-pointer" />

      <DrawerHeader
        title={`Add ${label.charAt(0).toUpperCase() + label.slice(1)}`}
        titleIcon={() => null}
        className="border-b border-gray-100 pb-2 mb-4"
        theme={{
          inner: {
            title: "text-white text-base font-semibold",
          },
        }}
      />

      <DrawerItems>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Name Field */}
          <div>
            <div className="mb-1.5 block">
              <Label
                htmlFor={`${id}-name`}
                value={`${label === "expense" ? "Expense" : "Income"} Name`}
                className="text-gray-300 text-xs font-medium"
              />
            </div>
            <TextInput
              id={`${id}-name`}
              name="name"
              placeholder="e.g. Grocery Shopping"
              required
              color="gray"
            />
          </div>

          {/* Category & Amount Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="mb-1.5 block">
                <Label
                  htmlFor={`${id}-cat`}
                  value="Category"
                  className="text-gray-300 text-xs font-medium"
                />
              </div>
              {label === "expense" ? (
                <Select id={`${id}-cat`} name="category" required>
                  {categories.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              ) : (
                <TextInput
                  id={`${id}-cat`}
                  name="category"
                  placeholder="e.g. Salary"
                  required
                />
              )}
            </div>

            <div>
              <div className="mb-1.5 block">
                <Label
                  htmlFor={`${id}-amt`}
                  value="Amount (₹)"
                  className="text-gray-300 text-xs font-medium"
                />
              </div>
              <TextInput
                type="number"
                step="any"
                min="0"
                id={`${id}-amt`}
                name="amount"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Payment Mode */}
          <div>
            <div className="mb-2 block">
              <Label
                value="Payment Mode"
                className="text-gray-300 text-xs font-medium"
              />
            </div>
            <fieldset className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Radio
                  id={`${id}-offline`}
                  name="mode"
                  value="offline"
                  defaultChecked
                  className="text-cyan-600 focus:ring-cyan-600 bg-gray-800 border-gray-700 cursor-pointer"
                />
                <Label
                  htmlFor={`${id}-offline`}
                  className="text-gray-300 text-xs cursor-pointer font-normal"
                >
                  Offline
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id={`${id}-online`}
                  name="mode"
                  value="online"
                  className="text-cyan-600 focus:ring-cyan-600 bg-gray-800 border-gray-700 cursor-pointer"
                />
                <Label
                  htmlFor={`${id}-online`}
                  className="text-gray-300 text-xs cursor-pointer font-normal"
                >
                  Online
                </Label>
              </div>
            </fieldset>
          </div>

          {/* Submit Action */}
          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-4 border font-medium transition-colors ${
              label === "expense"
                ? "border-red-600 text-red-500 bg-red-950/20 hover:bg-red-600 hover:text-white focus:ring-red-800"
                : "border-emerald-600 text-emerald-400 bg-emerald-950/20 hover:bg-emerald-600 hover:text-white focus:ring-emerald-800"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner size="sm" />
                <span>Adding {label}...</span>
              </div>
            ) : (
              `Add ${label.charAt(0).toUpperCase() + label.slice(1)}`
            )}
          </Button>
        </form>
      </DrawerItems>
    </Drawer>
  );
}

export default AddExp;
