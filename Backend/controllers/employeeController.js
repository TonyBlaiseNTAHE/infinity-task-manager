import Task from '../models/Task.js';
import Employee from '../models/Employee.js';
import bcrypt from 'bcryptjs'


//@desc   Get all users (Admin only)
// @route GET /api/users/
// @access  Private (Admin)

export const getEmployees = async(req, res) => {
    try {
        const employees = await Employee.find({ role: "member"}).select("-password");
        // Add task counts to each user
        const employeesWithTaskCounts = await Promise.all(employees.map(async (employee) => {
        const pendingTasks = await Task.countDocuments({assignedTo: employee._id, status: "Pending"});
        const inProgressTasks = await Task.countDocuments({assignedTo: employee._id, status: "In Progress"});
        const completedTasks = await Task.countDocuments({assignedTo: employee._id, status: "Completed"});
        return {
            ...employee._doc,
            pendingTasks,
            inProgressTasks,
            completedTasks
        };
        }));
        res.json(employeesWithTaskCounts);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message});
    }
}

// @desc Get Employee by Id
// @route GET /api/employee/:id
// @access Private (Admin)

export const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).select("-password");
        if (!employee) return res.status(404).json({ message: "User not found"});
        res.json(employee);
        
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message});
    }
}

// @desc Delete employee by Id
// @route DELETE /api/employee/:id
// @access Private (Admin)

export const deleteEmployee = async (req, res) => {
    try {

        
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message});
    }
}