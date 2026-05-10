import Expense from "../model/expenseModel.js";

export const addExpense = async (req, res) => {
  const { type, amount, name } = req.body;
  try {
    const expense = await Expense.create({
      name,
      amount,
      type,
      user: req.user._id,
    });
    res.status(201).json(expense);
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "failed to add expense" });
  }
};

export const getExpense = async (req, res) => {
  try {
    const expense = await Expense.find({ user: req.user._id });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};
