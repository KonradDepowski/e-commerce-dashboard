import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const SideBar = () => {
  const { orgRole } = auth();
  const admin = orgRole === "org:admin";

  return (
    <div className="p-3 flex-col  border-r-2 border-[var(--dark-600)] hidden md:flex w-[140px]  xl:w-[200px] gap-1">
      {admin && (
        <Link
          className="text-lg   hover:text-[var(--link-hover-gray)] "
          href="/dashboard"
        >
          Dashboard
        </Link>
      )}
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
      <Link
        className="  text-lg  hover:text-[var(--link-hover-gray)] "
        href="/dashboard/discounts"
      >
        Discounts
      </Link>
      {admin && (
        <Link
          className="text-lg   hover:text-[var(--link-hover-gray)] "
          href="/dashboard/users"
        >
          Users
        </Link>
      )}
    </div>
  );
};

export default SideBar;
