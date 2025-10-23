import React from "react";
import { useEmployeeAuth } from "../../hooks/useEmployeeAuth";

const AdminDashBoard = () => {
  useEmployeeAuth();
  return <div>Dashboard-admin</div>;
};

export default AdminDashBoard;
