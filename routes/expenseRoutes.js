import e from "express";
import {
  addExpense,
  chartData,
  getAllData,
  getExpense,
  getTotalExp,
  removeTxn,
} from "../controller/expenseController.js";
import { addEarning, filterTxns } from "../controller/earningController.js";

const router = e.Router();

router.post("/expense", addExpense);
router.post("/earning", addEarning);
router.get("/expense/:value", getExpense);
router.get("/totalExp", getTotalExp);
router.get("/filter/:query", filterTxns);
router.get("/allData", getAllData);

router.get("/chartData", chartData);

router.delete("/txn/:id", removeTxn);

export default router;
