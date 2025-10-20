const express = require("express");

const router = express.Router();

import { registerEmployee, loginUser, getUserProfile, updateUserProfile} from '../controllers/authContoller.js';
// Auth
router.post("/register", registerEmployee);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

module.exports = router;