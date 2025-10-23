import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeContext } from "../context/employeeContext";

export const useEmployeeAuth = () => {
  const { employee, loading, clearEmployee } = useContext(EmployeeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (employee) return;

    if (!employee) {
      clearEmployee();
      navigate("/login");
    }
  }, [user, loading, clearEmployee, navigate]);
};
