import Task from '../models/Task.js';
import Employee from '../models/Employee.js';
import excelJS from 'exceljs';


export const exportTasksReport = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: "Error exporting tasks", error: error.message});
        
    }
};

/**
 * @desc: Export employee-task report as an Excel file
 * @route: GET /api/reports/export/employee
 * @access: Private (Admin)
 */
export const exportEmployeesReport = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message });
    }
};


