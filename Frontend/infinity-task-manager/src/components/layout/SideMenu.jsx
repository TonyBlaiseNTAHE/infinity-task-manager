import React, { useState } from "react";
import { EmployeeContext } from "../../context/employeeContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";

const SideMenu = ({ activeMenu }) => {
  const { employee, clearEmployee } = useContext(EmployeeContext);

  const [sideMenuData, setSideMenuData] = useState([]);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };
  const handleLogout = () => {
    localStorage.clear();
    clearEmployee();
    navigate("/login");
  };

  useEffect(() => {
    if (employee) {
      setSideMenuData(
        employee?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
    return () => {};
  }, [employee]);
  return (
    <div className="w-64 h-[calc(100vh-61px) bg-white border-r border-gray-200/50 sticky top-[61px] z-20]">
      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        <div className="relative">
          <img
            src={employee?.profileImageUrl || ""}
            alt="Profile Image"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        </div>
        {employee?.role === "admin" && (
          <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1">
            Admin
          </div>
        )}

        <h5 className="text-gray-950 font-medium leading-6 mt-3">
          {employee?.name || ""}
        </h5>

        <p className="text-[12px] text-gray-500">{employee?.email || ""}</p>
        {sideMenuData.map((item, index) => (
          <button
            Key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] ${
              activeMenu == item.label
                ? "text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3;"
                : ""
            } py-3 px-6 mb-3 cursor-pointer`}
            onclick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
