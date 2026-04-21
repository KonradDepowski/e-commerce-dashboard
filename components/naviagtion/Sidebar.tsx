"use client";
import { useAuth, useOrganizationList } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useMemo } from "react";

const SideBar = () => {
  const { orgId, orgRole } = useAuth();
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: true,
  });

  useEffect(() => {
    if (!isLoaded) return;
    if (orgId) return;

    const memberships = userMemberships?.data ?? [];
    if (memberships.length === 1) {
      void setActive?.({ organization: memberships[0].organization.id });
    }
  }, [isLoaded, orgId, setActive, userMemberships?.data]);

  const admin = useMemo(() => {
    if (orgRole === "org:admin") return true;

    const memberships = userMemberships?.data ?? [];
    if (orgId) {
      return memberships.some(
        (m) => m.organization.id === orgId && m.role === "org:admin",
      );
    }
    return memberships.some((m) => m.role === "org:admin");
  }, [orgId, orgRole, userMemberships?.data]);

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
