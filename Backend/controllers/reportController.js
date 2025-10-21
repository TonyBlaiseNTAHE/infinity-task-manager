import Task from '../models/Task.js';
import Employee from '../models/Employee.js';
import excelJS from 'exceljs';


export const exportTasksReport = async (req, res) => {
    try {
        const tasks = await Task.find().populate("assignedTo", "name email");

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Tasks Report");

        worksheet.columns = [
            {header: "Task ID", key: "_id", width: 25},
            {header: "Title", key: "title", width: 30},
            {header: "Description", key: "description", width: 50},
            {header: "Priority", key: "priority", width: 15},
            {header: "Status", key: "status", width: 20},
            {header: "Due Date", key: "dueDate", width: 20},
            { header: "Assigned To", key: "assignedTo", width: 30},

        ];
        tasks.forEach((task) => {
            const assignedTo = task.assignedTo.map((employee) => `${employee.name} (${employee.email})`).join(", ");
            worksheet.addRow({
                _id: task._id,
                title: task.title,
                descriptiom: task.description,
                priority: task.priority,
                status: task.status,
                dueDate: task.dueDate.toISOString().split("T")[0],
                assignedTo: assignedTo || "Unassigned",
            });
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="tasks_report.xlsx"'
        );
        return workbook.xlsx.write(res).then(() => {
            res.end();
        })
        
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
        const employees = await Employee.find().select("name email _id").lean();
        const employeeTasks = await Task.find().populate(
            "assignedTo",
            "name email _id"
        );
        const employeeTaskMap = {};
        employees.forEach((employee) => {
            employeeTaskMap(employees._id) = {
                name: employee.name,
                email: employee.email,
                taskCount: 0,
                pendingTasks: 0,
                inProgressTasks: 0,
                completedTasks: 0,

            };
        });
        employeeTasks.forEach((task) => {
            if (task.assignedTo) {
                task.assignedTo.forEach((assignedEmployee) => {
                    if (employeeTaskMap[assignedEmployee._id]){
                        employeeTaskMap[assignedEmployee._id].taskCount += 1;
                        if (task.status === "Pending") {
                            employeeTaskMap[assignedEmployee._id].pendingTasks += 1;
                        } else if (task.status === "In Progress") {
                            employeeTaskMap[assignedEmployee._id].inProgressTasks += 1;

                        } else if (task.status === "Completed"){
                            employeeTaskMap[assignedEmployee._id].completedTasks += 1;
                        }
                    }
                });
            }
        });

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("User Task Report");

        worksheet.columns = [
            { header: "User Name", key: "name", width: 30},
            { header: "Email", key: "email", width: 40},
            { header: "Total Tasks Assigned", key: "taskCount", width: 20},
            { header: "Pending Tasks", key: "pendingTasks", width: 20},
            { header: "In Progress", key: "inProgressTasks", width: 20},
            { header: "Completed Tasks", key: "completedTasks", width: 20},
        ];
        Object.values(employeeTaskMap).forEach((employee) => {
            worksheet.addRow(employee);
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="users_report.xlsx"'
        );

        return workbook.xlsx.write(res).then(() => {
            res.end();
        });         
        
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message });
    }
};


