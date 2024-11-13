"use client";

import { UserProfile } from "@clerk/nextjs";
import { SignOutButton } from "@/components/buttons/SignOutButton";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import type { Theme } from "@clerk/types";

const Profile = () => {
  const { theme } = useTheme();

  const appearanceConfig: Theme | undefined =
    theme === "dark" ? { baseTheme: dark } : undefined;

  return (
    <section className="flex flex-row flex-wrap justify-center py-4 gap-5 w-full  ">
      <UserProfile routing="hash" appearance={appearanceConfig} />
      <div className="dark:bg-primary bg-white shadow-2xl w-[95%] min-h-[40vh] max-w-[40rem] p-4 xl:p-8 rounded-xl relative">
        <SignOutButton />
      </div>
    </section>
  );
};

export default Profile;
