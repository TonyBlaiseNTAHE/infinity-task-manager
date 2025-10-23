import { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosinstance";

import { API_PATHS } from "../utils/apiPaths";
import { Children } from "react";

export const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [employee, setEmployee] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (employee) return;

    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(false);
      return;
    }
    const fetchEmployee = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setEmployee(response.data);
      } catch (error) {
        console.error("Employee not authenticated", error);
        clearEmployee();
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, []);

  const updateEmployee = (employeeData) => {
    setEmployee(employeeData);
    localStorage.setItem("token", employeeData.token);
    setLoading(false);
  };

  const clearEmployee = () => {
    setEmployee(null);
    localStorage.removeItem("token");
  };

  return (
    <EmployeeContext.Provider
      value={{ employee, loading, updateEmployee, clearEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
export default EmployeeProvider;
