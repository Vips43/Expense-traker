import express from "express";
import { getUser, loginUser, registerUser } from "../controller/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", getUser)

export default router;
