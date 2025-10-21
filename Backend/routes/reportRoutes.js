import express from 'express'
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import { exportEmployeesReport, exportTasksReport } from '../controllers/reportController.js';
const router = express.Router();


router.get("/export/tasks", protect, adminOnly, exportTasksReport);
router.get("/export/employees", protect, adminOnly, exportEmployeesReport);

export default router;