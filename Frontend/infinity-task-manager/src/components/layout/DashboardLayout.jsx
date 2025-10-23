import React from "react";
import Navbar from "./Navbar";
import { useContext } from "react";
import { EmployeeContext } from "../../context/employeeContext";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { employee } = useContext(EmployeeContext);
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar actiMenu={activeMenu} />
      {employee && (
        <div className="flex">
          <div className="max-[1000px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className="grow mx-5 py-6">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
