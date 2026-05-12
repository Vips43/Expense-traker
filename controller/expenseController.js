import Earning from "../model/earningModel.js";
import Expense from "../model/expenseModel.js";

export const addExpense = async (req, res) => {
  const { amount, name, mode, category } = req.body;
  try {
    const expense = await Expense.create({
      name,
      amount,
      mode,
      category,
      type: "expense",
      user: req.user._id,
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
    const allTransactions = [...expenses, ...earnings].sort(
      (a, b) => b.createdAt - a.createdAt,
    );

    res.status(200).json(allTransactions);
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

export const removeTxn = async (req, res) => {
  const { id } = req.params;
  const { type } = req.query;
  if (!id && !type)
    return res.status(400).json({ msg: "select valid trasaction" });
  try {
    let txn;
    if (type === "expense") txn = await Expense.findByIdAndDelete(id);
    else if (type === "earning") txn = await Earning.findByIdAndDelete(id);
    else return res.status(400).json({ msg: "Invalid transaction type" });

    if (!txn) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    res.status(200).json({ msg: "Transaction deleted", txn });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};
