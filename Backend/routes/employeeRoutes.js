import express from 'express'
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import { deleteEmployee, getEmployeeById, getEmployees } from '../controllers/employeeController.js';


const router = express.Router();

// employee Management route
router.get("/", protect, adminOnly, getEmployees);
router.get("/:id", protect, getEmployeeById);
router.delete("/:id", protect, adminOnly, deleteEmployee);

export default router;