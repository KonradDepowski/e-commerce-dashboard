import Link from "next/link";
import React from "react";

const SideBar = () => {
  return (
    <div className="p-3 flex-col  border-r-2 border-[var(--dark-600)] hidden md:flex w-[140px]  xl:w-[200px] gap-1">
      <Link
        className="  text-lg  hover:text-[var(--link-hover-gray)] "
        href="/dashboard/products"
      >
        Products
      </Link>
      <Link
        className="text-lg   hover:text-[var(--link-hover-gray)] "
        href="/dashboard/orders"
      >
        Orders
      </Link>
    </div>
  );
};

export default SideBar;
