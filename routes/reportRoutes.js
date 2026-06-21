import express from 'express'
import { reports } from '../controller/report.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/reports", protect, reports);

export default router;