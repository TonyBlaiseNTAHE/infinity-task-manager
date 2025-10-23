import React, { useContext, useEffect, useState } from "react";
import { useEmployeeAuth } from "../../hooks/useEmployeeAuth";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { EmployeeContext } from "../../context/employeeContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import InfoCard from "../../components/Card/InfoCard";
const AdminDashBoard = () => {
  useEmployeeAuth();

  const { employee } = useContext(EmployeeContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState("");
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };
  useEffect(() => {
    getDashboardData();

    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="card my-5">
        <div>
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl"> Hi {employee?.name}</h2>
            <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3md:gap-6 mt-5">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0
            )}
            color="bg-primary"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashBoard;
