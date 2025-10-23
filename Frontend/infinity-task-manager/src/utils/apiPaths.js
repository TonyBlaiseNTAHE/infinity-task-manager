export const BASE_URL = "http://localhost:8000"


// utils/apiPaths.js
export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        GET_PROFILE: "/api/auth/profile"
    },

    USERS: {
        GET_ALL_EMPLOYEES: "/api/employees",
        GET_EMPLOYEE_BY_ID: (employeeId) => `/api/employees/${userId}`,
        CREATE_EMPLOYEE: "/api/employee",
        UPDATE_EMPLOYEE: (employeeId) => `/api/employees/${employeeId}`,
        DELETE_EMPLOYEE: (employeeId) => `/api/employees/${employeeId}`,
    },

    TASKS: {
        GET_DASHBOARD_DATA: "/api/tasks/dashboard-data",
        GET_USER_DASHBOARD_DATA: "/api/tasks/employee-dashboard-data",
        GET_ALL_TASKS: "/api/tasks",
        GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`,
        CREATE_TASK: "/api/tasks",
        UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`,
        DELETE_TASK: (taskId) => `/api/tasks/${taskId}`,

        UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`,
        UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`,
    },

    REPORTS: {
        EXPORT_TASKS: "/api/reports/export/tasks",
        EXPORT_EMPOLYEES: "/api/reports/export/employees",
    },
    
    IMAGE: {
        UPLOAD_IMAGE: "api/auth/upload-image",
    }
}