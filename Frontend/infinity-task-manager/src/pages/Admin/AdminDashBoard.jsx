import React from "react";
import { useEmployeeAuth } from "../../hooks/useEmployeeAuth";
import DashboardLayout from "../../components/layout/DashboardLayout";

const AdminDashBoard = () => {
  useEmployeeAuth();
  return <DashboardLayout>Dashboard-admin</DashboardLayout>;
};

export default AdminDashBoard;
