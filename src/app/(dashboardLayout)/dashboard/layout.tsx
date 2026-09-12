import React, { ReactNode } from "react";
import Sidebar from "../../../shared/components/layout/Sidebar";
import DashboardHeader from "../../../shared/components/layout/DashboardHeader";
import PrivateRoute from "../../../privateRoute/PrivateRoute";

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <PrivateRoute>
      <div className="md:flex min-h-screen">
        <div className="md:w-[14%] hidden md:block">
          <Sidebar />
        </div>
        <div className="md:w-[86%] bg-gray-50 min-h-screen">
          <DashboardHeader />
          <main className="p-2 md:p-4">{children}</main>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default DashboardLayout;
