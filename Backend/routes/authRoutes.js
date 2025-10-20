import  express from "express";

import {protect} from '../middlewares/authMiddleware.js'
import {
  registerEmployee,
  loginUser,
  getUserProfile,
  updateUserProfile
} from "../controllers/authController.js";


 const router = express.Router();
// Auth
router.post("/register", registerEmployee);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;
