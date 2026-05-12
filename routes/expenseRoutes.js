import e from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addExpense,
  getExpense,
  removeTxn,
} from "../controller/expenseController.js";
import { addEarning } from "../controller/earningController.js";

const router = e.Router();

router.post("/expense", protect, addExpense);
router.post("/earning", protect, addEarning);
router.get("/expense", protect, getExpense);
router.delete("/txn/:id", protect, removeTxn);

export default router;
