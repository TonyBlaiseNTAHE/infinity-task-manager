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
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-[20]">
      {/* Top: centered profile area */}
      <div className="flex flex-col items-center pt-6 pb-4 border-b border-gray-100">
        <div className="relative">
          <img
            src={employee?.profileImageUrl || ""}
            alt="Profile Image"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        </div>
        {employee?.role === "admin" && (
          <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-2">
            Admin
          </div>
        )}

        <h5 className="text-gray-950 font-medium leading-6 mt-3 text-center">
          {employee?.name || ""}
        </h5>

        <p className="text-[12px] text-gray-500 text-center">
          {employee?.email || ""}
        </p>
      </div>

      {/* Bottom: scrollable menu */}
      <div className="px-4 py-4 overflow-y-auto h-[calc(100%-136px)]">
        {sideMenuData.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={`menu_${index}`}
              className={`w-full flex items-center gap-4 text-[15px] ${
                activeMenu == item.label
                  ? "text-primary bg-gradient-to-r from-blue-50 to-blue-100 border-r-3"
                  : ""
              } py-3 px-4 mb-3 cursor-pointer rounded-sm text-left`}
              onClick={() => handleClick(item.path)}
            >
              {Icon ? <Icon className="text-xl" /> : null}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
