import Earning from "../model/earningModel.js";
import Expense from "../model/expenseModel.js";

export const addEarning = async (req, res) => {
  const { amount, name, category, mode } = req.body;
  if (!amount || !name)
    return res.status(400).json({ msg: "no info provided!" });

  try {
    await Earning.create({
      name,
      category,
      amount,
      mode,
      type: "earning",
      user: req.user._id,
    });
    res.status(200).json({ msg: "earning added!" });
  } catch (error) {
    console.error("server error", error.message);
    return res.status(500).json({ msg: "server error!" });
  }
};

export const filterTxns = async (req, res) => {
  const { query } = req.params;
  try {
    let txns;
    if (query === "all") {
      txns = await Expense.find({ user: req.user._id });
    } else {
      const isMode = query === "online" || query === "offline";
      const filterCriteria = {
        user: req.user._id,
        ...(isMode ? { mode: query } : { category: query }),
      };

      txns = await Expense.find(filterCriteria);
    }
    if (!txns || txns.length === 0) {
      return res.status(404).json({ msg: "No transactions found!" });
    }

    res.status(200).json(txns);
  } catch (error) {
    return res.status(500).json({ msg: "server error!" });
  }
};

export const oldfilterTxns = async (req, res) => {
  try {
    const { query } = req.params; // This grabs "Bills", "Food", etc.

    const transactions = await Expense.find({
      user: req.user._id,
      category: query,
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};
