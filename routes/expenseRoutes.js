import e from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addExpense,
  getAllData,
  getExpense,
  getTotalExp,
  removeTxn,
} from "../controller/expenseController.js";
import { addEarning, filterTxns } from "../controller/earningController.js";

const router = e.Router();

router.post("/expense", protect, addExpense);
router.post("/earning", protect, addEarning);
router.get("/expense", protect, getExpense);
router.get("/totalExp", protect, getTotalExp);
router.post("/filter/:query", protect, filterTxns);
router.get("/allData", protect, getAllData);

router.delete("/txn/:id", protect, removeTxn);

export default router;
