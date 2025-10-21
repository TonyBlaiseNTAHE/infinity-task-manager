import Task from '../models/Task.js';
 /**
  * descr: Get all tasks (Admin: all, User: only assigned tasks)
  * @route: Get /api/tasks/
  * @access: Private
  */
 export const getTasks = async (req, res) => {
    try {
        const {status} = req.query;
        let filter = {};

        if (status){
            filter.status = status;
        }
        let tasks;

        if (req.employee.role === "admin"){
            tasks = await Task.find(filter).populate(
                "assignedTo",
                "name email profileImageUrl"
            );

        } else {
            tasks = await Task.find({ ...filter, assignedTo: req.employee._id }).populate(
                "assignedTo",
                "name email profileImageUrl"
            );
        }

        /**
         * Add completed todoChecklist count to each task
         */
        tasks = await Promise.all(
            tasks.map(async (task) => {
                const completedCount = task.todoChecklist.filter(
                    (item) => item.completed).length;
                    return { ...task._doc, completedTodoCount: completedCount};
                })
            );
      
    /**
     * Status summary counts
     */
    const allTasks = await Task.countDocuments(req.employee.role === "admin" ? {} : {assignedTo: req.employee._id});
    const pendingTasks = await Task.countDocuments({
        ...filter,
        status: "Pending",
        ...(req.employee.role !== "admin" && { assignedTo: req.employee._id}),
    });
    const inProgressTasks = await Task.countDocuments({
        ...filter,
        status: "In Progress",
        ...(req.employee.role !== "admin" && { assignedTo: req.employee._id}),
    });
    const completedTasks = await Task.countDocuments({
        ...filter,
        status: "Completed",
        ...(req.employee.role !== "admin" && { assignedTo: req.employee._id}),
    });
    res.json ({
        tasks,
        statusSummary: {
            all: allTasks,
            pendingTasks,
            inProgressTasks,
            completedTasks,
        },
    });
    } catch (error)
        {res.status(500).json({message: "Server Error", error: error.message});}
    }

 /**
  * descr: Get task By ID
  * @route: Get /api/tasks/:id
  * @access: Private
  */
 export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate("assignedTo", "name email profileImageUrl");

        if (!task) return res.status(404).json({ message: "Task not found"});

        res.json(task);
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
        const { title, description, priority, dueDate, assignedTo, attachments, todoChecklist} = req.body;

        if(!Array.isArray(assignedTo)){
            return res.status(400).json({message: "assignedTo must be an array of Employee IDs ."});
        }

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            createdBy: req.employee._id,
            todoChecklist,
            attachments,
        })
        res.status(201).json({ message: "Task created successfully", task});
        
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
        const task = await Task.findById(req.params.id);
        if(!task) return res.status(404).json({ message: "Task not found"});

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.priority = req.body.priority || task.priority;
        task.dueDate = req.body.dueDate || task.dueDate;
        task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
        task.attachments = req.body.attachments || task.attachments;

        if (req.body.assignedTo){
            if (!Array.isArray(req.body.assignedTo)){
                return res.status(400).json({ message: "assignedTo must be an array of employee IDs"});
            }
            task.assignedTo = req.body.assignedTo;
        }
        const updatedTask = await task.save();
        res.json( { message: "Task updated successfully", updatedTask})
        
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
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json( { message: "Task not found"});

        await task.deleteOne();
        res.json({ message: "Task deleted successfully"});
        
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
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found"});

        const isAssigned = task.assignedTo.some(
            (employeeId) => employeeId.toString() === req.employee._id.toString()
        );

        if (!isAssigned && req.employee.role !== "admin"){
            return res.status(403).json({ message: "Not authorized"});
        }
        task.status = req.body.status || task.status;

        if (task.status === "Completed"){
           task.todoChecklist.forEach((item) => (item.completed = true));
           task.progress = 100; 
        }
        await task.save();
        res.json({ message: "Task status updated", task});
        
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
        const { todoChecklist} = req.body;
        const task = await Task.findById(req.params.id);

        if(!task) return res.status(404).json({ message: "Task not found"});

        if (!task.assignedTo.includes(req.employee._id) && req.employee.role !== "admin"){
            return res.status(403).json({ message: "Not authorized to update checklist"});
        }

        /** Replace with updated checklist */
        task.todoChecklist = todoChecklist;
        /** Auto-update progress based on checklist completion */
        const completedCount = task.todoChecklist.filter(
            (item) => item.completed
        ).length;
        const totalItems = task.todoChecklist.length;
        task.progress = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

        /** Auto-mark task as completed if all items are checked */
        if (task.progress === 100){
            task.status = "Completed";
        } else if (task.progress > 0){
            task.status = "In Progress";
        } else {
            task.status = "Pending";
        }
        await task.save();
        const updatedTask = await Task.findById(req.params.id).populate(
            "assignedTo",
            "name email profileImageUrl"
        )
        
        res.json({ message: "Task checklist updated", task: updatedTask});
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
        /**
         * Fetch staistics
         */
        const totalTasks = await Task.countDocuments();
        const pendingTasks = await Task.countDocuments({ status: "Pending"});
        const completedTasks = await Task.countDocuments({ status: "Completed"});
        const overdueTasks = await Task.countDocuments({
            status: { $ne: "Completed"},
            dueDate: { $lt: new Date()},
        });

        /**
         * Ensure all possible statuses are included
         */
        const taskStatuses = ["Pending", "In Progress", "Completed"];
        const taskDistributionRaw = await Task.aggregate([
            {
                $group:{
                    _id: "$status",
                    count: { $sum: 1},
                },
            },
        ]);
        const taskDistribution = taskStatuses.reduce((acc, status) => {
            const formattedKey = status.replace(/\s+/g, "");
            acc[formattedKey] =
            taskDistributionRaw.find((item) => item._id === status)?.count || 0;
            return acc;
        }, {});
        taskDistribution['All'] = totalTasks;

        /** Ensure all priority levels are includes */
        const taskPriorities = ["Low", "Medium", "High"];
        const taskPriorityLevelsRaw = await Task.aggregate([
            {
                $group: {
                    _id: "$priority",
                    count: { $sum: 1},
                },
            },
        ]);
        const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
            acc[priority] = taskPriorityLevelsRaw.find((item) => item._id === priority)?.count || 0;
            return acc;
        }, {});

        /** Fetch recent 10 tasks */
        const recentTasks = await Task.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .select("title status priority dueDate createdAt");

        res.status(200).json({ statistics: {
            totalTasks,
            pendingTasks,
            completedTasks,
            overdueTasks,
        },
        charts: {
            taskDistribution,
            taskPriorityLevels,
        },
        recentTasks, 
    })

        
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
        const employeeId = req.employee._id; // Only fetch data for the logged-in employee

        // Fetch statistics for user-specific tasks
        const totalTasks = await Task.countDocuments({ assignedTo: employeeId});
        const pendingTasks = await Task.countDocuments({ assignedTo: employeeId, status: "Pending"});
        const completedTasks = await Task.countDocuments({ assignedTo: employeeId, status: "Completed"});
        const overdueTasks = await Task.countDocuments({
            assignedTo: employeeId,
            status: { $ne: "Completed"},
            dueDate: { $lt: new Date()},
        });

        // Task distribution by status
        const taskStatuses = ["Pending", "In Progress", "Completed"];
        const taskDistributionRaw = await Task.aggregate([
            { $match: { assignedTo: employeeId}},
            {$group: {_id: "$status", count: { $sum: 1}}},
        ]);

        const taskDistribution = taskStatuses.reduce((acc, status) => {
            const formattedKey = status.replace(/\s+/g, "");
            acc[formattedKey] = taskDistributionRaw.find((item) => item._id === status)?.count || 0;
            return acc;
        }, {});
        taskDistribution["All"] = totalTasks;

        /** Task distribution by priority */
        const taskPriorities = ["Low", "Medium", "High"];
        const taskPriorityLevelsRaw = await Task.aggregate([
           { $match: { assignedTo: employeeId}},
           { $group: {_id: "$priority", count: { $sum: 1}}}, 
        ]);

        const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
            acc[priority] = taskPriorityLevelsRaw.find((item) => item._id === priority)?.count || 0;
            return acc;
        }, {});
        /** Fetch recent 10 tasks for the logged-in employee */
        const recentTasks = await Task.find({ assignedTo: employeeId})
        .sort({createdAt: -1}).limit(10).select("title status priority dueDate createdAt");

        res.status(200).json({
            statistics:{
                totalTasks,
                pendingTasks,
                completedTasks,
                overdueTasks,
            },
            charts: {
                taskDistribution,
                taskPriorityLevels,

            },
            recentTasks,
        });

        
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
 }


