import React from "react";
import { useEmployeeAuth } from "../../hooks/useEmployeeAuth";

const EmployeeDashBoard = () => {
  useEmployeeAuth();
  return <div>EmployeeDashBoard</div>;
};

export default EmployeeDashBoard;
