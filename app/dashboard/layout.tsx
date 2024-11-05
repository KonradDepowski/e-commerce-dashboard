import Header from "@/components/naviagtion/Header";
import SideBar from "@/components/naviagtion/Sidebar";
import React, { PropsWithChildren } from "react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <main className="flex h-full">
        <SideBar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
