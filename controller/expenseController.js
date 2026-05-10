import Earning from "../model/earningModel.js";
import Expense from "../model/expenseModel.js";
import User from "../model/userModel.js";

export const addExpense = async (req, res) => {
  const { amount, name, mode, category } = req.body;
  if (!amount || !name || !mode) {
    return res.status(400).json({ msg: "Please provide all required fields" });
  }
  try {
    const expense = await Expense.create({
      name,
      amount,
      mode,
      category,
      type: "expense",
      user: req.user._id,
    });
    await User.findByIdAndUpdate(req.user._id, {
      $push: { expense: expense._id },
    });

    res.status(201).json(expense);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "failed to add expense" });
  }
};

export const getExpense = async (req, res) => {
  try {
    const [expenses, earnings] = await Promise.all([
      Expense.find({ user: req.user._id }),
      Earning.find({ user: req.user._id }),
    ]);
    if (!expenses && !earnings)
      return res.status(200).json({ msg: "no expense or earning found" });
    const allTransactions = [...expenses, ...earnings].sort(
      (a, b) => b.createdAt - a.createdAt,
    );

    res.status(200).json(allTransactions);
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};
export const getTotalExp = async (req, res) => {
  try {
    const user = await User.findById(req?.user?._id).populate(
      "expense earning",
    );
    if (!user) return res.status(404).json({ msg: "no user found" });

    const totalSpent = user.expense.reduce(
      (acc, curr) => acc + (curr.amount || 0),
      0,
    );
    const totalEarn = user.earning.reduce(
      (acc, curr) => acc + (curr.amount || 0),
      0,
    );
    res.status(200).json({ totalSpent, totalEarn });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message, error });
  }
};

export const removeTxn = async (req, res) => {
  const { id } = req.params;
  const { type } = req.query;
  if (!id && !type)
    return res.status(400).json({ msg: "select valid trasaction" });
  try {
    let txn;
    if (type === "expense") txn = await Expense.findById(id);
    else if (type === "earning") txn = await Earning.findById(id);
    else return res.status(400).json({ msg: "Invalid transaction type" });

    if (!txn) return res.status(404).json({ msg: "Transaction not found" });

    console.log("userID: ", req.user?._id.toString());
    await txn.delete(req.user?._id.toString() || "system");

    res.status(200).json({ msg: "Transaction deleted", txn });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "server error" });
  }
};
