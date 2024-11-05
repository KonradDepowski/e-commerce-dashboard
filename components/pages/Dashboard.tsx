"use client";
import { invite } from "@/lib/actions/invite";
import { useAuth } from "@clerk/clerk-react";
import React from "react";

const Dashboard = () => {
  return (
    <div className="h-[200vh]">
      <button onClick={() => invite()}>Invite</button>
    </div>
  );
};

export default Dashboard;
