import express from 'express'
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import { createTask, deleteTask, getDashboardData, getEmployeeDashboardData, getTaskById, getTasks, updateTask, updateTaskChecklist, updateTaskStatus } from '../controllers/taskController.js';


const router = express.Router();


/* 
 * Task Management Routes: This router is for everything related to tasks
 */ 

router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getEmployeeDashboardData);
/* Get all tasks (Admin: all, Employee: assigned) */ 
router.get("/", protect, getTasks); 
/* Get task by ID */
router.get("/:id", protect, getTaskById);
/* Create a task (Admin only) */
router.post("/", protect, adminOnly, createTask);
/* update task datails */
router.put("/:id", protect, updateTask); 
/* Delete a task (Admin only) */
router.delete("/:id", protect, adminOnly, deleteTask); 
/* Update task status */
router.put("/:id/status", protect, updateTaskStatus); 
/* Update task checklist */
router.put("/:id/todo", protect, updateTaskChecklist);

export default router;