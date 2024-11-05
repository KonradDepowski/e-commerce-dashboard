import React from "react";
import { ThemeToggle } from "../theme/ThemeToggle";
import { SignOutButton } from "../buttons/SignOutButton";

const Header = () => {
  return (
    <div className="flex justify-between py-4 border-b-2 px-6">
      <h3 className="text-xl font-bold">Dashboard</h3>
      <div className="flex gap-4">
        <ThemeToggle />
        <div className="w-10 h-10 bg-red-500 rounded-[50%]"></div>
        <SignOutButton />
      </div>
    </div>
  );
};

export default Header;
