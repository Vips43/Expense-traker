import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      enum: ["Food", "Bills", "Entertainment", "Transport", "Other"],
      default: "Other",
    },
    amount: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
