import React from "react";
import { ThemeToggle } from "../theme/ThemeToggle";
import NarrowNav from "./NarrowNav";
import Avatar from "../avatar/Avatar";

const Header = () => {
  return (
    <div className="flex justify-between items-center h-[80px] border-b-2 border-[var(--dark-600)] px-3">
      <h3 className="text-2xl font-bold text-[var(--green-main)] ">
        Dashboard
      </h3>
      <div className="gap-4 hidden md:flex px-3">
        <ThemeToggle />
        <Avatar />
      </div>
      <NarrowNav />
    </div>
  );
};

export default Header;
