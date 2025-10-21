import Task from '../models/Task.js';
 /**
  * descr: Get all tasks (Admin: all, User: only assigned tasks)
  * @route: Get /api/tasks/
  * @access: Private
  */
 export const getTasks = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
 }

 /**
  * descr: Get task By ID
  * @route: Get /api/tasks/:id
  * @access: Private
  */
 export const getTaskById = async (req, res){
    try {
        
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
 }
 /**
  * descr: Get a new task (Admin only)
  * @route: POST /api/tasks/
  * @access: Private
  */
 export const createTask = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
 }
 /**
  * descr: Update Task details
  * @route: PUT /api/tasks/:id
  * @access: Private
  */
 export const updateTask = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
 }
 /**
  * descr:  delete task(Admin only)
  * @route: DELETE /api/tasks/:id
  * @access: Private (Admin)
  */
 export const deleteTask = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
 }
 /**
  * descr:  update task status 
  * @route: PUT /api/tasks/:id/status
  * @access: Private
  */
 export const updateTaskStatus = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
 }
 /**
  * descr:  update task checklist 
  * @route: PUT /api/tasks/:id/todo
  * @access: Private
  */
 export const updateTaskChecklist = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
 }
 /**
  * descr:  Dashboard Data (Admin only) 
  * @route: GET /api/tasks/dashboard-data
  * @access: Private
  */
 export const getDashboardData = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
 }
  /**
  * descr:  Dashboard Data (Employee-specific) 
  * @route: GET /api/tasks/employee-dashboard-data
  * @access: Private
  */
 export const getEmployeeDashboardData = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
 }


