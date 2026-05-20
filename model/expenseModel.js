import mongoose from "mongoose";
// import MongooseDelete from "mongoose-delete";

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["expense"],
      default: "expense",
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: ["Food", "Bills", "Entertainment", "Transport", "Other"],
      default: "Other",
    },
    mode: { type: String, enum: ["online", "offline"], required: true },
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

// expenseSchema.plugin(MongooseDelete, {
//   deletedBy: true,
//   deletedByType: String,
//   overrideMethods: "all",
// });

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
