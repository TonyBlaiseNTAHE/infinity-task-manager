import React, { useContext, useEffect, useState } from "react";
import { useEmployeeAuth } from "../../hooks/useEmployeeAuth";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { EmployeeContext } from "../../context/employeeContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import InfoCard from "../../components/Card/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";
import { LuArrowBigRight, LuArrowRight } from "react-icons/lu";
import TaskListTable from "../../components/TaskListTable";
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
  const onSeeMore = () => {
    navigate("/admin/tasks");
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
            label="Total Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0
            )}
            color="bg-primary"
          />
          <InfoCard
            label="Pending Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Pending || 0
            )}
            color="bg-violet-500"
          />
          <InfoCard
            label="In Progress Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.inProgress || 0
            )}
            color="bg-primary"
          />
          <InfoCard
            label="Completed Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Completed || 0
            )}
            color="bg-lime-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
        <div className="md:col-span-2">
          <div className="md:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg font-medium">Recent Tasks</h5>

                <button className="card-btn" onClick={onSeeMore}>
                  See All <LuArrowRight className="text-base" />
                </button>
              </div>

              <TaskListTable tableData={dashboardData?.recentTasks || []} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashBoard;
