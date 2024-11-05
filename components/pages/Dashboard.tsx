"use client";
import { createInvitation } from "@/lib/actions/createInvitation";
import { useAuth } from "@clerk/clerk-react";
import React from "react";

const Dashboard = () => {
  const { userId } = useAuth();
  return (
    <div className="h-[200vh]">
      <button
        onClick={() => createInvitation(userId!, "depowskikonrad@gmail.com")}
      >
        Invite
      </button>
    </div>
  );
};

export default Dashboard;
