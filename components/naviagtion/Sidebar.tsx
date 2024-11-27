"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

const SideBar = () => {
  const { orgRole } = useAuth();
  const admin = orgRole === "org:admin";

  return (
    <div className="p-3 flex-col border-r-2 border-[var(--dark-600)] hidden md:flex w-[140px] xl:w-[200px] gap-1">
      {admin && (
        <Link
          className="text-lg hover:text-[var(--dark-400)]"
          href="/dashboard"
        >
          Dashboard
        </Link>
      )}
      <Link
        className="text-lg hover:text-[var(--dark-400)]"
        href="/dashboard/products"
      >
        Products
      </Link>
      <Link
        className="text-lg hover:text-[var(--dark-400)]"
        href="/dashboard/orders"
      >
        Orders
      </Link>
      <Link
        className="text-lg hover:text-[var(--dark-400)]"
        href="/dashboard/discounts"
      >
        Discounts
      </Link>
      {admin && (
        <Link
          className="text-lg hover:text-[var(--dark-400)]"
          href="/dashboard/users"
        >
          Users
        </Link>
      )}
    </div>
  );
};

export default SideBar;
