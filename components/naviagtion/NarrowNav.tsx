"use client";
import { RxHamburgerMenu } from "react-icons/rx";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { ThemeToggle } from "../theme/ThemeToggle";
import Link from "next/link";
import { useState } from "react";

const NarrowNav = () => {
  const [openSheet, setOpenSheet] = useState(false);
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
            <li className=" w-full text-xl text-center font-bold uppercase ">
              <Link onClick={toogleSheetHandler} href="/">
                Products
              </Link>
            </li>
            <li className="  w-full text-xl text-center font-bold uppercase ">
              <Link onClick={toogleSheetHandler} href="/shop">
                Orders
              </Link>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NarrowNav;
