"use client";
import { RxHamburgerMenu } from "react-icons/rx";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { ThemeToggle } from "../theme/ThemeToggle";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth, useOrganizationList } from "@clerk/nextjs";

const NarrowNav = () => {
  const [openSheet, setOpenSheet] = useState<boolean>(false);
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
  const toogleSheetHandler = () => {
    setOpenSheet((prev) => !prev);
  };
  return (
    <div className="flex items-center gap-3 md:hidden ">
      <ThemeToggle />
      <Sheet onOpenChange={toogleSheetHandler} open={openSheet}>
        <SheetTrigger asChild>
          <RxHamburgerMenu size={24} />
        </SheetTrigger>
        <SheetContent className="bg-primary p-4 flex-col justify-center pt-20 border-0">
          <ul className="flex flex-col items-center gap-10 w-full text-[var(--color)]">
            {admin && (
              <li className=" w-full text-xl text-center font-bold uppercase ">
                <Link onClick={toogleSheetHandler} href="/dashboard">
                  Dashboard
                </Link>
              </li>
            )}
            <li className=" w-full text-xl text-center font-bold uppercase ">
              <Link onClick={toogleSheetHandler} href="/dashboard/products">
                Products
              </Link>
            </li>
            <li className="  w-full text-xl text-center font-bold uppercase ">
              <Link onClick={toogleSheetHandler} href="/dashboard/orders">
                Orders
              </Link>
            </li>
            <li className="  w-full text-xl text-center font-bold uppercase ">
              <Link onClick={toogleSheetHandler} href="/dashboard/discounts">
                Discounts
              </Link>
            </li>
            {admin && (
              <li className="  w-full text-xl text-center font-bold uppercase ">
                <Link onClick={toogleSheetHandler} href="/dashboard/users">
                  Users
                </Link>
              </li>
            )}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NarrowNav;
