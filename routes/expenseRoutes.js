import e from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addExpense, getExpense } from "../controller/expenseController.js";

const router = e.Router();

router.post("/expense", protect, addExpense);
router.get("/expense",protect, getExpense);

export default router;
 