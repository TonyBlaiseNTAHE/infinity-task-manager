// import Employee from '../models/Employee';
// import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import Employee from '../models/Employee.js';
import bcrypt from 'bcryptjs';


export const generateToken = (userId) => {
    return jwt.sign({ id: userId}, process.env.JWT_SECRET, { expiresIn: "7d"});
}


// @desc  Register a new user
// @ route POST /api/auth/register
// @access Public

export const registerEmployee = async(req, res) => {
    try {
        const {name, email, password, profileImageUrl, adminInviteToken } = req.body;

        // check if Employee already exists
        const employeeExists = await Employee.findOne({email});
        if (employeeExists) {
            return res.status(400).json({ message: "User already exists"});
        }

        // check user role
        let role = "member";
        if (adminInviteToken && adminInviteToken === process.env.ADMIN_TOKEN){
            role = "admin";
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const employee = await Employee.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
            role
        });
        // Return user data with JWT
        res.status(201).json({
            _id: employee._id,
            name: employee.name,
            email: employee.email,
            role: employee.role,
            profileImageUrl: employee.profileImageUrl,
            token: generateToken(employee._id),
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message});
    }
};

// @desc Login user
// @route POST /api/auth/login
// @access Public

export const loginUser = async(req, res) => {
    try {
        const { email, password} = req.body;

        const employee = await Employee.findOne({ email});
        if (!employee){
            return res.status(401).json({ message: "Invalid email or password" });
    
        }
        // compare password
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch){
            return res.status(401).json({ message: "Invalid email or password"});
        }
        // Return user data with JWT
        res.json({
            _id: user._id,
            name: employee.name,
            email: employee.email,
            role: employee.role,
            profileImageUrl: employee.profileImageUrl,
            token: generateToken(employee._id),

        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message});
    }
};

// @desc Get user profile
// @route GET /api/auth/profile
// @access Private (Requires JWT)
export const getUserProfile = async (req, res) => {};

// @desc update user profile
// @route PUT /api/auth/profile
// @access Private (Requires JWT)
export const updateUserProfile = async (req, res) => {};
