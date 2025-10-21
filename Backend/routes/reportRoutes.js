import express from 'express'
import { adminOnly, protect } from '../middlewares/authMiddleware';
import { exportEmployeesReport, exportTasksReport } from '../controllers/reportController';
const router = express.Router();


router.get("/export/tasks", protect, adminOnly, exportTasksReport);
router.get("/export/employees", protect, adminOnly, exportEmployeesReport);

export default router;