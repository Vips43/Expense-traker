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
    if (!req.user || !req.user._id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filterCriteria = { user: req.user._id };

    if (query !== "all") {
      const isMode = query === "online" || query === "offline";
      filterCriteria = {
        user: req.user._id,
        ...(isMode ? { mode: query } : { category: query }),
      };
    }
    const totalItems = await Expense.countDocuments(filterCriteria);
    const txns = await Expense.find(filterCriteria)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      allTransactions: txns || [],
      currentPage: page,
      totalItems,
      success: true,
      totalPages: Math.ceil(totalItems / limit) || 1,
    });
  } catch (error) {
    console.error("Filter Controller Error:", error);
    return res.status(500).json({ msg: "server error!" });
  }
};
