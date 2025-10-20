import Employee from '../models/Employee';
import bcrypt from 'bcryptjs'
import jwt from 'jwt';


const generateToken = (userId) => {
    return jwt.sign({ id: userId}, process.env.JWT_SECRET, { expiresIn: "7d"});
}


// @desc  Register a new user
// @ route POST /api/auth/register
// @access Public

const registerEmployee = async(req, res) => {};

// @desc Login user
// @route POST /api/auth/login
// @access Public

const loginUser = async(req, res) => {};

// @desc Get user profile
// @route GET /api/auth/profile
// @access Private (Requires JWT)
const getUserProfile = async (req, res) => {};

// @desc update user profile
// @route PUT /api/auth/profile
// @access Private (Requires JWT)
const updateUserProfile = async (req, res) => {};

module.exports = { registerEmployee, loginUser, getUserProfile, updateUserProfile};