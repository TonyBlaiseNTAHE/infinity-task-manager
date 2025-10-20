const express = require("express");
const { registerEmployee, loginUser, getUserProfile, updateUserProfile } = require("../controllers/authContoller");

const router = express.Router();
// Auth
router.post("/register", registerEmployee);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

module.exports = router;