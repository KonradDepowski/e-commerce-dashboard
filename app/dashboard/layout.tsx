import Header from "@/components/naviagtion/Header";
import SideBar from "@/components/naviagtion/Sidebar";
import React, { PropsWithChildren } from "react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen flex flex-col ">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
