import express from "express";
import { getUser, loginUser, registerUser } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user",protect, getUser)

export default router;
